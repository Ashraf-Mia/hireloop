"use client";

import { Checkbox } from "@/components/ui/checkbox";

export type FilterOption = {
  label: string;
  value: string;
  count: number;
};

type FilterGroupProps = {
  title: string;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function FilterGroup({
  title,
  options,
  selected,
  onToggle,
}: FilterGroupProps) {
  return (
    <section className="mt-5">
      <h3 className="text-sm font-medium text-white">{title}</h3>

      <div className="mt-3 flex flex-col gap-3">
        {options.map((option) => {
          const checked = selected.includes(option.value);

          return (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center justify-between gap-3"
            >
              <span className="flex items-center gap-3">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggle(option.value)}
                />
                <span className="text-sm text-white/70 transition-colors group-hover:text-white">
                  {option.label}
                </span>
              </span>

              <span className="text-xs tabular-nums text-white/40">
                {option.count.toLocaleString("en-US")}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}

type JobFiltersProps = {
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
};

export function JobFilters({ options, selected, onToggle }: JobFiltersProps) {
  return (
    <aside className="h-fit rounded-xl border border-white/10 bg-[#0d0d0d] p-5">
      <h2 className="text-lg font-semibold text-white">Filters</h2>

      <FilterGroup
        title="Job Type"
        options={options}
        selected={selected}
        onToggle={onToggle}
      />
    </aside>
  );
}
