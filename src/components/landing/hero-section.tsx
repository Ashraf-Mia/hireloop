"use client";

import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  FileSearch,
  Building2,
  Users,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const trending = ["Product Designer", "AI Engineering", "Dev-ops Engineer"];

const stats = [
  { icon: FileSearch, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* ---------- Top content ---------- */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pt-28 text-center sm:px-6 sm:pt-36">
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur"
        >
          <Briefcase className="size-3.5 text-amber-500" />
          <span className="font-mono text-[10px] tracking-wider sm:text-xs">
            <span className="font-semibold text-white">50,000+</span>{" "}
            <span className="text-white/50">NEW JOBS THIS MONTH</span>
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          Find Your Dream Job Today
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
        >
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </motion.p>

        {/* Search bar */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-8 w-full max-w-2xl"
        >
          <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/50 p-2 backdrop-blur-md transition-colors focus-within:border-indigo-500/50 sm:flex-row sm:items-center sm:gap-0">
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="size-4 shrink-0 text-white/70" />
              <Input
                placeholder="Job title, skill or company"
                className="h-10 border-0 bg-transparent px-0 text-sm text-white shadow-none placeholder:text-white/40 focus-visible:ring-0 dark:bg-transparent"
              />
            </div>

            <span className="hidden h-6 w-px bg-white/15 sm:block" />

            <div className="flex flex-1 items-center gap-2 px-3">
              <MapPin className="size-4 shrink-0 text-white/70" />
              <Input
                placeholder="Location or Remote"
                className="h-10 border-0 bg-transparent px-0 text-sm text-white shadow-none placeholder:text-white/40 focus-visible:ring-0 dark:bg-transparent"
              />
            </div>

            <Button
              size="icon"
              className="h-10 w-full rounded-xl bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:bg-indigo-400 sm:w-10"
              aria-label="Search"
            >
              <Search className="size-4" />
            </Button>
          </div>
        </motion.div>

        {/* Trending */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-5 flex flex-wrap items-center justify-center gap-2"
        >
          <span className="text-xs text-white/50">Trending Position</span>
          {trending.map((t) => (
            <button
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-[11px] text-white/80 transition-all hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-white"
            >
              {t}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ---------- Globe + tagline ---------- */}
      <div className="relative mx-auto mt-2 w-full max-w-[1200px] sm:-mt-6 lg:-mt-16">
        {/* মোবাইলে ছবি একটু বড় (135%) আর মাঝখানে, বড় স্ক্রিনে 100% */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.3, ease: "easeOut" }}
          className="pointer-events-none relative -ml-[17.5%] w-[135%] sm:ml-0 sm:w-full"
        >
          {/* হালকা ভেসে থাকার অ্যানিমেশন */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* উপরের দিকে ফেড */}
            <div className="[mask-image:linear-gradient(to_bottom,transparent_0%,black_8%)]">
              {/* বাম-ডানে ফেড */}
              <div className="[mask-image:linear-gradient(to_right,transparent_0%,black_14%,black_86%,transparent_100%)]">
                {/* ছবির উপরের ৩৬% ফাঁকা অংশ কেটে ফেলা হয়েছে */}
                <div
                  className="relative w-full"
                  style={{ aspectRatio: "1440 / 1205" }}
                >
                  <Image
                    src="/images/globe.png"
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 1200px) 1200px, 135vw"
                    className="select-none object-cover object-bottom"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Tagline: পৃথিবীর কালো অংশের উপর */}
        <div className="absolute inset-x-0 bottom-[20%] px-4 sm:bottom-[18%] sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center text-xl font-medium leading-snug text-white/70 sm:text-3xl lg:text-4xl"
          >
            Assisting over{" "}
            <span className="text-white">15,000 job seekers</span> find their
            dream positions.
          </motion.h2>
        </div>
      </div>

      {/* ---------- Stats ---------- */}
      <div className="relative z-10 mx-auto -mt-4 max-w-6xl px-4 pb-16 sm:-mt-12 sm:px-6 lg:-mt-20">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex h-36 flex-col justify-between rounded-xl border border-white/10 bg-gradient-to-b from-[#121212] to-[#0a0a0a] p-4 transition-colors hover:border-indigo-500/40 sm:h-44 sm:p-5"
            >
              <s.icon className="size-4 text-white/80" />
              <div>
                <p className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-white/60 sm:text-sm">
                  {s.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
