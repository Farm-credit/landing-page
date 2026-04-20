export const NETWORK_CONFIG = {
  testnet: {
    network: "TESTNET",
    rpcUrl: "https://soroban-testnet.stellar.org",
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: process.env.NEXT_PUBLIC_CONTRACT_ID || "CBUXVRFKKHVAOVSDSSROQPU6YOVXRRE7I6HRAVRY3LI7FC2X7RVBND6T",
  },
  public: {
    network: "PUBLIC",
    rpcUrl: "https://horizon.stellar.org",
    networkPassphrase: "Public Global Stellar Network ; October 2015",
    contractId: "", // To be filled if deployed to mainnet
  },
} as const;

export const ACTIVE_NETWORK = process.env.NEXT_PUBLIC_NETWORK === "public" ? NETWORK_CONFIG.public : NETWORK_CONFIG.testnet;
