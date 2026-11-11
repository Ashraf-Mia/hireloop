"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="relative isolate overflow-hidden bg-black pt-10 text-white sm:pt-16">
      <div className="relative mx-auto min-h-[480px] w-full max-w-[1440px] sm:aspect-[1440/640] sm:min-h-0">
        {/* গ্রিড ডোম ছবি (নিচের দিকে কালোতে মিশে যায়) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0"
        >
          <Image
            src="/images/cta-bg.png"
            alt=""
            fill
            sizes="(min-width: 1440px) 1440px, 100vw"
            className="select-none object-cover object-top opacity-40 [mask-image:linear-gradient(to_bottom,black_30%,transparent_92%)]"
          />
        </motion.div>

        {/* ডোমের ভেতরের বেগুনি গ্লো */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          className="pointer-events-none absolute inset-0 [clip-path:ellipse(50%_100%_at_50%_100%)]"
          style={{
            background:
              "radial-gradient(ellipse 55% 75% at 50% 0%, rgba(99,91,255,0.95) 0%, rgba(70,55,200,0.45) 40%, transparent 75%)",
          }}
        />

        {/* কনটেন্ট */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-16 text-center sm:pt-24">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-md text-3xl font-medium leading-tight tracking-tight sm:max-w-xl sm:text-5xl"
          >
            Your next role is already looking for you
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="mt-4 max-w-xl text-sm text-white/70 sm:text-base"
          >
            Build a profile in three minutes. The matches start arriving
            tomorrow morning.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#"
                className="inline-flex h-11 items-center justify-center rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Create a free account
              </Link>
            </motion.div>

            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="#"
                className="inline-flex h-11 items-center justify-center rounded-lg border border-white/15 bg-black/40 px-5 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                View pricing
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
