"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaPinterest, FaLinkedinIn } from "react-icons/fa";

const columns = [
  {
    title: "Product",
    links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  },
  {
    title: "Navigations",
    links: ["Help center", "Career library", "Contact"],
  },
  {
    title: "Resources",
    links: ["Brand Guideline", "Newsroom"],
  },
];

const socials = [
  { icon: FaFacebookF, label: "Facebook" },
  { icon: FaPinterest, label: "Pinterest" },
  { icon: FaLinkedinIn, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 pb-8 pt-12 sm:px-6 sm:pt-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          {/* লোগো + বিবরণ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xs"
          >
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="HireLoop"
                width={110}
                height={32}
                className="h-7 w-auto"
              />
            </Link>
            <p className="mt-4 text-xs leading-relaxed text-white/50">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </motion.div>

          {/* লিংক কলাম */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-3 sm:gap-x-16">
            {columns.map((col, i) => (
              <motion.div
                key={col.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              >
                <h4 className="text-sm font-medium text-indigo-400">
                  {col.title}
                </h4>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <Link
                        href="#"
                        className="text-xs text-white/50 transition-colors hover:text-white"
                      >
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* নিচের বার */}
        <div className="mt-14 flex flex-col-reverse items-start gap-6 sm:mt-20 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ y: -3 }}
                className="flex size-8 items-center justify-center rounded-md bg-white/[0.06] text-white/70 transition-colors hover:bg-indigo-500/80 hover:text-white"
              >
                <Icon className="size-3.5" />
              </motion.a>
            ))}
          </div>

          <div className="flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:gap-6">
            <p className="text-white/40">Copyright 2024 — Programming Hero</p>
            <p className="text-white/80">
              <Link href="#" className="hover:text-white">
                Terms &amp; Policy
              </Link>{" "}
              -{" "}
              <Link href="#" className="hover:text-white">
                Privacy Guideline
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
