"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Loader2, LogOut, Menu, User, X } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { UserAvatar, UserMenu, useSignOut } from "./user-menu";

const links = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const { handleSignOut, loading } = useSignOut();

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

            {isPending ? (
              // লোড হওয়ার সময় জায়গা ধরে রাখা, যাতে লেআউট লাফ না দেয়
              <div className="h-9 w-32" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <UserMenu user={user} />
                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-4 text-xs font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-60"
                >
                  {loading && <Loader2 className="size-3.5 animate-spin" />}
                  Sign out
                </button>
              </div>
            ) : (
              <>
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
              </>
            )}
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
                    onClick={() => setOpen(false)}
                    className="text-sm text-white/80"
                  >
                    {l.label}
                  </Link>
                ))}

                {isPending ? null : user ? (
                  <>
                    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                      <UserAvatar user={user} className="size-10 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                          {user.name || "User"}
                        </p>
                        <p className="truncate text-xs text-white/50">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <User className="size-4 text-white/50" />
                      Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3 text-sm text-white/80"
                    >
                      <LayoutDashboard className="size-4 text-white/50" />
                      Dashboard
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      disabled={loading}
                      className="flex items-center gap-3 text-left text-sm text-red-400 disabled:opacity-60"
                    >
                      {loading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <LogOut className="size-4" />
                      )}
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/sign-in"
                      onClick={() => setOpen(false)}
                      className="text-sm font-medium text-indigo-400"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      onClick={() => setOpen(false)}
                      className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-indigo-500 text-sm font-medium text-white hover:bg-indigo-400"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
