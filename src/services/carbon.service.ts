import { Client, networks } from "@/lib/contracts/carbon_token/src";
import { ACTIVE_NETWORK } from "@/lib/stellar/network";

export class CarbonService {
  private client: Client;

  constructor() {
    this.client = new Client({
      ...networks.testnet,
      rpcUrl: ACTIVE_NETWORK.rpcUrl,
      allowHttp: true, // For development/testnet
    });
  }

  async getBalance(address: string): Promise<bigint> {
    try {
      const balance = await this.client.balance({ id: address });
      return balance.result;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return 0n;
    }
  }

  async getTotalRetired(): Promise<bigint> {
    try {
      const total = await this.client.total_retired();
      return total.result;
    } catch (error) {
      console.error("Error fetching total retired:", error);
      return 0n;
    }
  }

  async getCertificates(address: string) {
    try {
      const count = await this.client.certificate_count();
      const certificates = [];
      
      // Basic iteration for now - could be optimized by events or specific indexing
      for (let i = 1; i <= count.result; i++) {
        const cert = await this.client.get_certificate({ id: i });
        if (cert.result && cert.result.owner === address) {
          certificates.push(cert.result);
        }
      }
      return certificates;
    } catch (error) {
      console.error("Error fetching certificates:", error);
      return [];
    }
  }

  /**
   * Retires credits for the user.
   * Note: The actual signing happens via the wallet (Freighter).
   */
  async retireCredits(from: string, amount: bigint, signAndSend: (tx: any) => Promise<any>) {
    // Generate a unique report hash for this UI-triggered retirement
    // In a real app, this might come from a specific audit log
    const reportHash = Buffer.from(Date.now().toString()); 
    const methodology = "Verified Carbon Standard (VCS)";

    const tx = await this.client.retire({
      from,
      amount,
      _report_hash: reportHash,
      _methodology: methodology,
    }, {
      // @ts-ignore - publicKey is supported by underlying ContractClient but not always typed in generated bindings
      publicKey: from
    });

    return await signAndSend(tx);
  }

  /**
   * Mints test credits for the user.
   * Note: The caller must be authorized as a verifier in the contract.
   */
  async mintCredits(to: string, amount: bigint, signAndSend: (tx: any) => Promise<any>) {
    const reportHash = Buffer.from(Date.now().toString());
    
    // Using user address as both 'to' and 'verifier'
    const tx = await this.client.mint({
      verifier: to,
      to,
      amount,
      report_hash: reportHash,
    }, {
      // @ts-ignore
      publicKey: to
    });

    return await signAndSend(tx);
  }
}

export const carbonService = new CarbonService();
