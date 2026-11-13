"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: Props) {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-4 py-10 text-white">
      {/* উপরের বেগুনি গ্লো */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[900px] max-w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,91,255,0.55),rgba(70,55,200,0.2)_45%,transparent_70%)] blur-3xl"
      />

      {/* হালকা গ্রিড ব্যাকগ্রাউন্ড */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="HireLoop"
            width={120}
            height={34}
            priority
            className="h-8 w-auto"
          />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        className="mt-8 w-full max-w-md rounded-2xl border border-white/10 bg-gradient-to-b from-[#121212]/90 to-[#0a0a0a]/90 p-6 shadow-[0_0_60px_rgba(99,91,255,0.12)] backdrop-blur-md sm:p-8"
      >
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-white/55">{subtitle}</p>
        </div>

        <div className="mt-7">{children}</div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-6 text-sm text-white/55"
      >
        {footer}
      </motion.p>
    </main>
  );
}
