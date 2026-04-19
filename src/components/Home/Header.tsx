"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Our Mission", href: "#mission" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="/" aria-label="FarmCredit home" className="inline-flex">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-orange-500">Farm</span>
              <span className="text-lime-500">Credit</span>
            </span>
          </a>

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

          <a
            href="#donate"
            className="hidden md:inline-flex items-center justify-center h-11 px-7 rounded-full bg-grey-950 text-white text-sm font-semibold hover:bg-grey-800 transition-colors"
          >
            Donate
          </a>

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
        <div className="md:hidden border-t border-grey-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm font-semibold text-grey-950 hover:text-grey-700"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#donate"
              className="inline-flex items-center justify-center w-full h-11 rounded-full bg-grey-950 text-white text-sm font-semibold"
            >
              Donate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
