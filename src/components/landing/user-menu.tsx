"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Loader2, LogOut, User } from "lucide-react";
import { signOut } from "@/lib/auth-client";

type UserType = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export function UserAvatar({
  user,
  className = "size-9",
}: {
  user: UserType;
  className?: string;
}) {
  const initial = (user.name || user.email || "U").charAt(0).toUpperCase();

  return user.image ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={user.image}
      alt={user.name || "User"}
      referrerPolicy="no-referrer"
      className={`${className} rounded-full object-cover`}
    />
  ) : (
    <span
      className={`${className} flex items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white`}
    >
      {initial}
    </span>
  );
}

export function useSignOut() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
            router.refresh();
          },
        },
      });
    } finally {
      setLoading(false);
    }
  }

  return { handleSignOut, loading };
}

export function UserMenu({ user }: { user: UserType }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { handleSignOut, loading } = useSignOut();

  // বাইরে ক্লিক বা Esc চাপলে বন্ধ
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const items = [
    { label: "Profile", href: "/profile", icon: User },
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  ];

  return (
    <div ref={ref} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open user menu"
        aria-expanded={open}
        className="rounded-full ring-2 ring-white/10 transition-shadow hover:ring-indigo-400/60"
      >
        <UserAvatar user={user} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full z-50 mt-3 w-64 origin-top-right overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]/95 shadow-[0_10px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl"
          >
            {/* নাম ও ইমেইল */}
            <div className="flex items-center gap-3 border-b border-white/10 p-4">
              <UserAvatar user={user} className="size-10 shrink-0" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">
                  {user.name || "User"}
                </p>
                <p className="truncate text-xs text-white/50">{user.email}</p>
              </div>
            </div>

            {/* লিংক */}
            <div className="p-1.5">
              {items.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <Icon className="size-4 text-white/50" />
                  {label}
                </Link>
              ))}
            </div>

            {/* সাইন আউট */}
            <div className="border-t border-white/10 p-1.5">
              <button
                type="button"
                onClick={handleSignOut}
                disabled={loading}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
