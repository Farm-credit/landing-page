"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import {
  StellarWalletsKit,
  Networks,
} from "@creit.tech/stellar-wallets-kit";
import { defaultModules } from "@creit.tech/stellar-wallets-kit/modules/utils";

export type WalletId = string;

interface WalletContextType {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  selectedWalletId: string | null;
  network: Networks;
  signTransaction: (xdr: string) => Promise<string>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

function getDefaultNetwork(): Networks {
  const value = (process.env.NEXT_PUBLIC_NETWORK || "testnet")
    .trim()
    .toLowerCase();
  return value === "public" ? Networks.PUBLIC : Networks.TESTNET;
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState<WalletId | null>(null);
  const [network] = useState<Networks>(getDefaultNetwork());
  const [mounted, setMounted] = useState(false);
  const kitInitialized = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize kit and restore session
  useEffect(() => {
    if (!mounted || kitInitialized.current) return;

    StellarWalletsKit.init({
      modules: defaultModules(),
      network,
    });
    kitInitialized.current = true;

    // Restore session from localStorage
    const savedAddress = localStorage.getItem("fc_wallet_address");
    const savedWalletId = localStorage.getItem("fc_wallet_id");
    const savedNetwork = localStorage.getItem("fc_wallet_network");

    if (savedAddress && savedWalletId && savedNetwork === network) {
      setAddress(savedAddress);
      setSelectedWalletId(savedWalletId);
      try {
        StellarWalletsKit.setWallet(savedWalletId);
      } catch {
        // Wallet module not available, clear session
        localStorage.removeItem("fc_wallet_address");
        localStorage.removeItem("fc_wallet_id");
        localStorage.removeItem("fc_wallet_network");
      }
    }
  }, [network, mounted]);

  const disconnect = useCallback(async () => {
    setAddress(null);
    setSelectedWalletId(null);
    localStorage.removeItem("fc_wallet_address");
    localStorage.removeItem("fc_wallet_id");
    localStorage.removeItem("fc_wallet_network");
    try {
      StellarWalletsKit.disconnect();
    } catch {
      // kit may not be initialized
    }
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      // Opens the built-in wallet-selection auth modal
      const { address: addr } = await StellarWalletsKit.authModal();

      if (!addr) {
        throw new Error(
          "No address returned. Please ensure your wallet is unlocked and try again.",
        );
      }

      setAddress(addr);

      // Determine which wallet was selected (reading from the kit state isn't directly exposed,
      // so we store what we know)
      const walletId = "stellar-wallets-kit";
      setSelectedWalletId(walletId);
      localStorage.setItem("fc_wallet_address", addr);
      localStorage.setItem("fc_wallet_id", walletId);
      localStorage.setItem("fc_wallet_network", network);
    } catch (error: unknown) {
      // User closed modal or wallet error
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "message" in error
            ? String((error as { message: unknown }).message)
            : "Unknown connection error";

      // Don't throw for user-initiated close
      if (errorMessage.includes("closed the modal")) {
        return;
      }

      throw new Error(
        errorMessage.toLowerCase().includes("not installed")
          ? "Wallet extension is not detected. Please install it or ensure it's enabled."
          : errorMessage.toLowerCase().includes("user rejected") ||
              errorMessage.toLowerCase().includes("permission denied")
            ? "Connection request was rejected by the user."
            : `Failed to connect wallet: ${errorMessage}`,
      );
    } finally {
      setIsConnecting(false);
    }
  }, [network]);

  const signTransaction = useCallback(
    async (xdr: string) => {
      if (!address) throw new Error("Wallet not connected");
      try {
        const { signedTxXdr } = await StellarWalletsKit.signTransaction(xdr);
        return signedTxXdr;
      } catch (error) {
        console.error("Signing failed:", error);
        throw error;
      }
    },
    [address],
  );

  if (!mounted) {
    // Prevent SSR mismatch; render nothing until client side.
    return null;
  }

  return (
    <WalletContext.Provider
      value={{
        connect,
        disconnect,
        address,
        isConnected: !!address,
        isConnecting,
        selectedWalletId,
        network,
        signTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
