"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";

// URL search-param names used by the filters.
const TYPE_PARAM = "jobType";
const CATEGORY_PARAM = "category";

type FilterOption = {
  label: string;
  value: string;
  count: number;
};

type FilterGroupProps = {
  title: string;
  name: string;
  options: FilterOption[];
  selected: string;
  onSelect: (value: string) => void;
};

function FilterGroup({
  title,
  name,
  options,
  selected,
  onSelect,
}: FilterGroupProps) {
  return (
    <section className="mt-5">
      <h3 className="text-sm font-medium text-white">{title}</h3>

      <div className="mt-3 flex flex-col gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="group flex cursor-pointer items-center justify-between gap-3"
          >
            <span className="flex items-center gap-3">
              <Checkbox
                name={name}
                value={option.value}
                checked={selected === option.value}
                onCheckedChange={() => onSelect(option.value)}
              />
              <span className="text-sm text-white/70 transition-colors group-hover:text-white">
                {option.label}
              </span>
            </span>

            <span className="text-xs tabular-nums text-white/40">
              {option.count.toLocaleString("en-US")}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

type JobFiltersProps = {
  typeOptions: FilterOption[];
  categoryOptions: FilterOption[];
  selectedType?: string;
  selectedCategory?: string;
  search?: string;
};

export function JobFilters({
  typeOptions,
  categoryOptions,
  selectedType = "",
  selectedCategory = "",
  search = "",
}: JobFiltersProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Only one option per group can be selected.
  const [type, setType] = useState(selectedType);
  const [category, setCategory] = useState(selectedCategory);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // Only the checked box of each group ends up in the URL.
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      if (value) {
        params.set(key, value as string);
      }
    }

    router.push(`/jobs?${params.toString()}`);
  };

  // Submit the form automatically whenever a selection changes.
  useEffect(() => {
    if (type === selectedType && category === selectedCategory) {
      return;
    }

    formRef.current?.requestSubmit();
  }, [type, category, selectedType, selectedCategory]);

  // Clicking the selected option again clears it.
  const selectType = (value: string) => {
    setType(type === value ? "" : value);
  };

  const selectCategory = (value: string) => {
    setCategory(category === value ? "" : value);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      action="/jobs"
      method="get"
      className="h-fit rounded-xl border border-white/10 bg-[#0d0d0d] p-5"
    >
      <h2 className="text-lg font-semibold text-white">Filters</h2>

      {/* Keep the search term when the filters change. */}
      <input type="hidden" name="search" defaultValue={search} />

      <FilterGroup
        title="Job Type"
        name={TYPE_PARAM}
        options={typeOptions}
        selected={type}
        onSelect={selectType}
      />

      <FilterGroup
        title="Category"
        name={CATEGORY_PARAM}
        options={categoryOptions}
        selected={category}
        onSelect={selectCategory}
      />
    </form>
  );
}
