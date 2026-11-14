"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AuthShell } from "./auth-shell";
import { PasswordInput } from "./password-input";
import { SocialButtons } from "./social-buttons";
import { toast } from "../ui/toast";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const inputClass =
  "h-11 rounded-lg border-white/10 bg-white/[0.04] pl-10 text-sm text-white placeholder:text-white/35 focus-visible:border-indigo-500/60 focus-visible:ring-indigo-500/20 dark:bg-white/[0.04]";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      image: string;
      password: string;
      confirmPassword: string;
    };

    if (user.password !== user.confirmPassword) {
      toast.add({
        type: "Warning",
        title: "Password don't match",
        description:
          "Please make sure your password and confirm password are the same.",
      });
      return;
    }

    if (user.password.length < 8) {
      toast.add({
        type: "Warning",
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
      });
      return;
    }

    const hasUppercase = /[A-Z]/.test(user.password);

    if (!hasUppercase) {
      toast.add({
        type: "Warning",
        title: "Password must contain uppercase letter",
        description: "Password must contain at least one uppercase letter.",
      });
      return;
    }

    const hasLowerCase = /[a-z]/.test(user.password);

    if (!hasLowerCase) {
      toast.add({
        type: "Warning",
        title: "Weak password",
        description:
          "Your password must include at least one lowercase letter (a-z).",
      });
      return;
    }

    console.log("User data:", user);

    const { data, error } = await signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (error) {
      console.log(error);
      toast.add({
        type: "Warning",
        title: "Sign up failed",
        description:
          "An account with this email already exists. Please use a different email.",
      });
      return;
    }

    if (data) {
      toast.add({
        type: "Success",
        title: "Welcome!",
        description: "Your account has been created successfully.",
      });
      router.push("/");
    }

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
          <label htmlFor="image" className="text-xs font-medium text-white/70">
            Image URL
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-white/45" />
            <Input
              id="image"
              name="image"
              placeholder="Your image URL"
              autoComplete="image"
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
          <p className="text-[11px] text-white/40">
            {" "}
            8+ characters, with upper & lowercase.
          </p>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-xs font-medium text-white/70"
          >
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            minLength={8}
          />
          <p className="text-[11px] text-white/40">Re-enter your password.</p>
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
