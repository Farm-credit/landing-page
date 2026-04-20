"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWallet } from "@/lib/stellar/WalletContext";
import { Button } from "@/components/atoms/Button";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Mission", href: "#mission" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { address, connect, disconnect } = useWallet();
  const isAppRoute = pathname === "/app" || pathname.startsWith("/app/");

  const handleAction = () => {
    if (address) {
      disconnect();
    } else {
      connect();
    }
  };

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


            {isAppRoute ? (
              <Button
                onClick={handleAction}
                className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-grey-950 text-white text-sm font-semibold hover:bg-grey-800 transition-colors"
              >
                {address ? "Sign Out" : "Sign In"}
              </Button>
            ) : (
              <Link
                href="/app"
                className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-grey-950 text-white text-sm font-semibold hover:bg-grey-800 transition-colors"
              >
                Launch App
              </Link>
            )}
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
          {isAppRoute ? (
            <Button
              onClick={() => {
                handleAction();
                setIsOpen(false);
              }}
              className="inline-flex items-center justify-center w-full h-11 rounded-full bg-grey-950 text-white text-sm font-semibold"
            >
              {address ? "Sign Out" : "Sign In"}
            </Button>
          ) : (
            <Link
              href="/app"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center justify-center w-full h-11 rounded-full bg-grey-950 text-white text-sm font-semibold"
            >
              Launch App
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
