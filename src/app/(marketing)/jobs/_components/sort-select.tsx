"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortValue = "recent" | "deadline" | "salary";

const SORT_OPTIONS: { label: string; value: SortValue }[] = [
  { label: "Most Recent", value: "recent" },
  { label: "Deadline: Soonest", value: "deadline" },
  { label: "Salary: High to Low", value: "salary" },
];

type SortSelectProps = {
  value: SortValue;
  onValueChange: (value: SortValue) => void;
};

export function SortSelect({ value, onValueChange }: SortSelectProps) {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as SortValue)}
      items={SORT_OPTIONS}
    >
      <SelectTrigger
        aria-label="Sort jobs"
        className="w-[170px] border-white/10 bg-[#0d0d0d] text-sm text-white dark:bg-[#0d0d0d]"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {SORT_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
