"use client";

import { useState } from "react";
import { ArrowRight, DollarSign } from "lucide-react";
import { AppText } from "@/components/atoms/AppText";
import { cn } from "@/lib/utils";

type DonationType = "monthly" | "onetime";

const tabs: { value: DonationType; label: string }[] = [
  { value: "monthly", label: "Monthly Donation" },
  { value: "onetime", label: "One Time Donation" },
];

const amounts = [10, 25, 50, 100];

export function PaymentCard() {
  const [tab, setTab] = useState<DonationType>("onetime");
  const [amount, setAmount] = useState<number>(10);

  return (
    <div className="w-[360px] rounded-2xl bg-white shadow-2xl p-6 space-y-5">
      <AppText className="text-center text-sm font-medium text-grey-950">
        Plant change with us
      </AppText>

      <div className="grid grid-cols-2 rounded-full bg-grey-100 p-1">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTab(t.value)}
            aria-pressed={tab === t.value}
            className={cn(
              "h-10 rounded-full text-sm transition-colors",
              tab === t.value
                ? "bg-lime-400 font-semibold text-grey-950"
                : "font-medium text-grey-950 hover:bg-grey-200"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <AppText className="text-sm font-semibold text-grey-950">
          Choose Your Contribution Amount
        </AppText>
        <div className="grid grid-cols-4 gap-2">
          {amounts.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(a)}
              aria-pressed={amount === a}
              className={cn(
                "h-12 rounded-full text-sm transition-colors",
                amount === a
                  ? "bg-lime-400 border border-grey-950 font-semibold text-grey-950"
                  : "border border-grey-200 font-medium text-grey-950 hover:border-grey-400"
              )}
            >
              ${a}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-stretch h-14 rounded-lg border border-grey-200 overflow-hidden">
        <div className="flex items-center justify-center w-12 bg-grey-100 text-grey-500">
          <DollarSign size={18} />
        </div>
        <input
          type="text"
          placeholder="Enter Your Desired Amount"
          className="flex-1 px-3 text-sm text-grey-950 placeholder:text-grey-400 focus:outline-none"
        />
      </div>

      <input
        type="text"
        placeholder="Your Full Name"
        className="w-full h-14 rounded-lg border border-grey-200 px-3 text-sm text-grey-950 placeholder:text-grey-400 focus:outline-none focus:border-grey-400"
      />

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-grey-300 accent-lime-500"
        />
        <span className="text-xs text-grey-700">
          Hide your Name (Anonymous)
        </span>
      </label>

      <button className="inline-flex w-full items-center justify-center gap-2 h-12 rounded-full bg-lime-400 text-sm font-semibold text-grey-950 hover:bg-lime-300 transition-colors">
        Donate Now!
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
