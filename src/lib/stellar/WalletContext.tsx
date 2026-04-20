"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { isConnected, getAddress, signTransaction } from "@stellar/freighter-api";

interface WalletContextType {
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
  error: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (await isConnected()) {
        const { address: addr, error: addrError } = await getAddress();
        if (addrError) {
          setError(addrError);
        } else {
          setAddress(addr);
        }
      } else {
        setError("Freighter not found. Please install the extension.");
      }
    } catch (err) {
      setError("Failed to connect to Freighter.");
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
  }, []);

  // Sync on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (await isConnected()) {
        const { address: addr } = await getAddress();
        if (addr) setAddress(addr);
      }
    };
    checkConnection();
  }, []);

  return (
    <WalletContext.Provider value={{ address, connect, disconnect, isConnecting, error }}>
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
