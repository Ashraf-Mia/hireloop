"use client";

import { motion } from "framer-motion";
import { FaGoogle, FaGithub } from "react-icons/fa";

export function SocialButtons() {
  const items = [
    { icon: FaGoogle, label: "Google" },
    { icon: FaGithub, label: "GitHub" },
  ];

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ icon: Icon, label }) => (
          <motion.button
            key={label}
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] text-sm text-white/85 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.08]"
          >
            <Icon className="size-4" />
            {label}
          </motion.button>
        ))}
      </div>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-white/40">or continue with email</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>
    </>
  );
}
