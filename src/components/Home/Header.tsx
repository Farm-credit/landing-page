"use client";

import { useState } from "react";
import { Menu, X, Wallet } from "lucide-react";
import Link from "next/link";
import { useWallet } from "@/lib/stellar/WalletContext";
import { Button } from "@/components/atoms/Button";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Mission", href: "#mission" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { address, connect } = useWallet();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" aria-label="FarmCredit home" className="inline-flex">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-orange-500">Farm</span>
              <span className="text-lime-500">Credit</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-grey-950 hover:text-grey-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {address ? (
              <div className="flex items-center gap-2 px-4 py-2 bg-grey-100 rounded-full border border-grey-200">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-bold text-grey-950">
                  {address.slice(0, 4)}...{address.slice(-4)}
                </span>
                <Link 
                  href="/app"
                  className="ml-2 text-[10px] font-black uppercase tracking-widest text-lime-600 hover:text-lime-700"
                >
                  Dashboard
                </Link>
              </div>
            ) : (
              <Button 
                onClick={connect}
                variant="outline"
                className="h-11 px-6 rounded-full border-2 border-grey-950 text-grey-950 font-bold hover:bg-grey-50"
              >
                Connect Wallet
              </Button>
            )}

            <Link
              href="/app"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-grey-950 text-white text-sm font-semibold hover:bg-grey-800 transition-colors"
            >
              Launch App
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-grey-950"
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-grey-200 bg-white p-4 space-y-4">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm font-semibold text-grey-950 hover:text-grey-700"
              >
                {link.label}
              </a>
            ))}
          </div>
          <Link
            href="/app"
            className="inline-flex items-center justify-center w-full h-11 rounded-full bg-grey-950 text-white text-sm font-semibold"
          >
            Launch App
          </Link>
        </div>
      )}
    </header>
  );
}
