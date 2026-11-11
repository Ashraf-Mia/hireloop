"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MenuIcon, XIcon } from "lucide-react"
import { cn } from "cn"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/company" },
  { label: "Pricing", href: "/pricing" },
]

const getStartedClassName = cn(
  buttonVariants({ size: "lg" }),
  "h-10 bg-brand px-6 text-brand-foreground hover:bg-brand/90"
)

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-4">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 rounded-2xl border border-white/5 bg-zinc-900 px-4 py-3 shadow-lg shadow-black/10 sm:px-6"
      >
        <Link href="/" className="shrink-0" aria-label="Hireloop home">
          <Image
            src="/images/logo.png"
            alt="Hireloop"
            width={154}
            height={44}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <span className="h-5 w-px bg-white/15" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <Link
              href="/sign-in"
              className="rounded-lg px-3 py-2 text-sm font-medium text-brand transition-colors hover:bg-white/5 hover:text-brand/80"
            >
              Sign In
            </Link>
            <Link href="/sign-up" className={getStartedClassName}>
              Get Started
            </Link>
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="text-zinc-100 hover:bg-white/10 hover:text-white lg:hidden"
              />
            }
          >
            <MenuIcon />
          </SheetTrigger>

          <SheetContent
            side="right"
            showCloseButton={false}
            className="border-white/10 bg-zinc-950 text-zinc-100"
          >
            <SheetHeader className="flex-row items-center justify-between">
              <SheetTitle className="text-white">Navigation</SheetTitle>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    aria-label="Close navigation menu"
                    className="text-zinc-400 hover:bg-white/10 hover:text-white"
                  />
                }
              >
                <XIcon />
              </SheetClose>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-zinc-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t border-white/10 p-4">
              <Link
                href="/sign-in"
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-center text-sm font-medium text-brand transition-colors hover:bg-white/5 hover:text-brand/80"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setOpen(false)}
                className={cn(getStartedClassName, "w-full")}
              >
                Get Started
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
