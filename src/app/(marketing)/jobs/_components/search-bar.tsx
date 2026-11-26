"use client";

import type { FormEvent } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type SearchBarProps = {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: () => void;
};

export function SearchBar({ value, onValueChange, onSubmit }: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 sm:flex-row"
    >
      <label htmlFor="job-search" className="sr-only">
        Search by job title or keyword
      </label>

      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40" />
        <Input
          id="job-search"
          type="text"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder="Search by job title, keywords..."
          className="h-11 rounded-lg border-white/10 bg-[#141414] pl-11 text-sm text-white placeholder:text-white/40 dark:bg-[#141414]"
        />
      </div>

      <Button
        type="submit"
        className="h-11 rounded-lg bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
      >
        Search Jobs
      </Button>
    </form>
  );
}
