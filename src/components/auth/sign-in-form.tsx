"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AuthShell } from "./auth-shell";
import { PasswordInput } from "./password-input";
import { SocialButtons } from "./social-buttons";

export function SignInForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    // TODO: এখানে নিজের লগইন API / NextAuth / Firebase কল বসাও
    console.log({ email, password });

    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to continue your job search."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Sign up
          </Link>
        </>
      }
    >
      <SocialButtons />

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-xs font-medium text-white/70">
            Email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/45" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="h-11 rounded-lg border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-indigo-500/60 focus-visible:ring-indigo-500/20 dark:bg-white/[0.04]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-medium text-white/70"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-indigo-400 transition-colors hover:text-indigo-300"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
          />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 text-sm font-medium text-white shadow-[0_0_24px_rgba(99,102,241,0.45)] transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Signing in..." : "Sign in"}
        </motion.button>
      </form>
    </AuthShell>
  );
}
