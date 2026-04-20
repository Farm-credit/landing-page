"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/lib/stellar/WalletContext";
import { carbonService } from "@/services/carbon.service";
import { AppText } from "@/components/atoms/AppText";
import { Button } from "@/components/atoms/Button";
import { toast } from "sonner";
import { Leaf, History, Award, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RetirePage() {
  const { address, connect, isConnecting } = useWallet();
  const [balance, setBalance] = useState<bigint>(0n);
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [certificates, setCertificates] = useState<any[]>([]);

  const fetchDetails = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const [bal, certs] = await Promise.all([
        carbonService.getBalance(address),
        carbonService.getCertificates(address),
      ]);
      setBalance(bal);
      setCertificates(certs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [address]);

  const handleRetire = async () => {
    if (!address || !amount || isNaN(Number(amount))) return;
    
    setIsSubmitting(true);
    const retireAmount = BigInt(Math.floor(Number(amount) * 10 ** 7)); // Assuming 7 decimals based on typical Soroban tokens
    
    try {
      const retireToast = toast.loading("Processing retirement...");
      
      await carbonService.retireCredits(address, retireAmount, async (tx) => {
        const result = await tx.signAndSend();
        return result;
      });

      toast.success("Carbon credits retired successfully! You've claimed a new Soulbound Certificate.", {
        id: retireToast,
      });
      setAmount("");
      fetchDetails();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Failed to retire credits. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-lime-100 rounded-full flex items-center justify-center mb-6">
          <Leaf className="text-lime-600" size={32} />
        </div>
        <AppText as="h1" className="text-3xl font-bold text-grey-950 mb-4">
          Connect Your Wallet
        </AppText>
        <AppText className="text-grey-600 max-w-sm mb-8">
          Please connect your Freighter wallet to view your carbon credit balance and claim your retirement certificates.
        </AppText>
        <Button 
          size="lg" 
          onClick={connect} 
          disabled={isConnecting}
          className="bg-lime-400 hover:bg-lime-500 text-grey-950 font-semibold rounded-full px-8"
        >
          {isConnecting ? <Loader2 className="animate-spin mr-2" /> : null}
          Connect Freighter
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Retirement Action */}
      <div className="lg:col-span-2 space-y-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-grey-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 text-lime-100 -mr-8 -mt-8 pointer-events-none">
            <Leaf size={160} />
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <span className="p-2 bg-lime-50 text-lime-600 rounded-lg">
                <Leaf size={20} />
              </span>
              <AppText className="text-sm font-bold tracking-wider text-grey-500 uppercase">
                Carbon Offset Portal
              </AppText>
            </div>

            <AppText as="h1" className="text-4xl font-extrabold text-grey-950 mb-4 leading-tight">
              Retire Your Credits. <br />
              <span className="text-lime-500">Claim Your Impact.</span>
            </AppText>

            <div className="flex items-end gap-2 mb-8">
              <AppText className="text-5xl font-black text-grey-950 tracking-tighter">
                {(Number(balance) / 10**7).toLocaleString()}
              </AppText>
              <AppText className="text-sm font-bold text-grey-500 mb-2 uppercase tracking-widest">
                Available Credits (TONS)
              </AppText>
            </div>

            <div className="max-w-md space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-grey-700 ml-1">Retirement Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full h-14 bg-grey-50 border border-grey-200 rounded-2xl px-5 text-lg font-bold text-grey-950 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-grey-400 bg-white px-2 py-1 rounded-md border border-grey-100">
                    CARBON-TONS
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleRetire}
                disabled={isSubmitting || !amount || Number(amount) <= 0}
                className="w-full h-14 bg-grey-950 text-white hover:bg-grey-800 rounded-2xl text-base font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <Award size={20} />}
                Retire Credits & Mint NFT
              </Button>
              <AppText className="text-[10px] text-center text-grey-400">
                Retiring credits is a permanent action. Credits will be burned and a non-transferable Soulbound NFT certificate will be issued to your wallet.
              </AppText>
            </div>
          </div>
        </div>

        {/* Impact History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <History size={18} className="text-grey-400" />
              <AppText className="text-sm font-bold text-grey-800 uppercase tracking-widest">Retirement History</AppText>
            </div>
            <AppText className="text-xs font-medium text-grey-500">{certificates.length} Certificates</AppText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <div key={cert.id} className="bg-white p-6 rounded-3xl border border-grey-100 hover:border-lime-200 transition-colors group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-grey-50 group-hover:bg-lime-50 rounded-2xl transition-colors">
                      <Award className="text-grey-400 group-hover:text-lime-600" size={24} />
                    </div>
                    <AppText className="text-[10px] font-bold text-grey-400">ID: #{cert.id.toString().padStart(4, '0')}</AppText>
                  </div>
                  <AppText className="text-sm font-bold text-grey-950 mb-1">{cert.project_name}</AppText>
                  <AppText className="text-[11px] text-grey-500 mb-4">{cert.location} • {cert.vintage}</AppText>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-grey-50">
                    <div className="flex flex-col">
                      <AppText className="text-lg font-black text-grey-950">{(Number(cert.amount) / 10**7).toLocaleString()}</AppText>
                      <AppText className="text-[9px] font-bold text-grey-400 uppercase tracking-widest">Tons Offset</AppText>
                    </div>
                    <a 
                      href={cert.metadata_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-full bg-grey-900 text-white flex items-center justify-center hover:bg-lime-500 transition-colors"
                    >
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-12 flex flex-col items-center justify-center bg-white rounded-3xl border border-dashed border-grey-200">
                <AppText className="text-sm font-medium text-grey-400">No retirement certificates found yet.</AppText>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar Info */}
      <div className="space-y-6">
        <div className="bg-teal-900 rounded-3xl p-6 text-white overflow-hidden relative">
           <div className="relative z-10">
             <AppText className="text-teal-300 text-xs font-bold uppercase tracking-widest mb-4">How it works</AppText>
             <div className="space-y-5">
               <div className="flex gap-4">
                 <div className="h-6 w-6 rounded-full bg-teal-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-teal-700">1</div>
                 <p className="text-xs text-teal-50 leading-relaxed uppercase font-bold">Select credits to retire from your balance.</p>
               </div>
               <div className="flex gap-4">
                 <div className="h-6 w-6 rounded-full bg-teal-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-teal-700">2</div>
                 <p className="text-xs text-teal-50 leading-relaxed uppercase font-bold">Sign the transaction with Freighter.</p>
               </div>
               <div className="flex gap-4">
                 <div className="h-6 w-6 rounded-full bg-teal-800 flex-shrink-0 flex items-center justify-center text-[10px] font-bold border border-teal-700">3</div>
                 <p className="text-xs text-teal-50 leading-relaxed uppercase font-bold">Claim your Soulbound NFT certificate instantly.</p>
               </div>
             </div>
           </div>
        </div>

        <div className="bg-lime-400 rounded-3xl p-6 overflow-hidden">
          <AppText className="text-grey-900 text-xs font-bold uppercase tracking-widest mb-4">Wallet Connected</AppText>
          <div className="flex items-center justify-between bg-white/30 backdrop-blur-sm rounded-2xl p-4 border border-white/40">
             <div className="flex flex-col">
               <AppText className="text-[10px] font-bold text-grey-800 uppercase tracking-wider">Address</AppText>
               <AppText className="text-xs font-bold text-grey-950 truncate w-32">{address.slice(0, 6)}...{address.slice(-6)}</AppText>
             </div>
             <div className="h-2 w-2 rounded-full bg-green-600 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
