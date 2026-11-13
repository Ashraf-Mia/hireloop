"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-md sm:px-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="HireLoop"
              width={110}
              height={32}
              className="h-7 w-auto sm:h-8"
              priority
            />
          </Link>

          {/* Desktop */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-white/80 transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <span className="h-4 w-px bg-white/20" />
            <Link
              href="/sign-in"
              className="text-xs font-medium text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-500 px-5 text-xs font-medium text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] transition-colors hover:bg-indigo-400"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-white md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-4 pb-2 pt-5">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    href={l.href}
                    className="text-sm text-white/80"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link href="#" className="text-sm font-medium text-indigo-400">
                  Sign in
                </Link>
                <Button className="w-full bg-indigo-500 text-white hover:bg-indigo-400">
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
