"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AuthShell } from "./auth-shell";
import { PasswordInput } from "./password-input";
import { SocialButtons } from "./social-buttons";

const inputClass =
  "h-11 rounded-lg border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-indigo-500/60 focus-visible:ring-indigo-500/20 dark:bg-white/[0.04]";

export function SignUpForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.currentTarget);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };

    // TODO: এখানে নিজের রেজিস্ট্রেশন API কল বসাও
    console.log(payload);

    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Build a profile in three minutes."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Sign in
          </Link>
        </>
      }
    >
      <SocialButtons />

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="text-xs font-medium text-white/70">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/45" />
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              autoComplete="name"
              required
              className={inputClass}
            />
          </div>
        </div>

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
              className={inputClass}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium text-white/70"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            minLength={8}
          />
          <p className="text-[11px] text-white/40">At least 8 characters.</p>
        </div>

        <label className="flex items-start gap-2 text-xs text-white/55">
          <input
            type="checkbox"
            required
            className="mt-0.5 size-3.5 accent-indigo-500"
          />
          <span>
            I agree to the{" "}
            <Link href="#" className="text-indigo-400 hover:text-indigo-300">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-indigo-400 hover:text-indigo-300">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 text-sm font-medium text-white shadow-[0_0_24px_rgba(99,102,241,0.45)] transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
        </motion.button>
      </form>
    </AuthShell>
  );
}
