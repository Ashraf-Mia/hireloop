"use client";

import { useMemo, useState } from "react";
import { AlertCircle, Briefcase } from "lucide-react";

import { JOB_TYPES, type Job } from "@/types/job";
import { JobCard } from "./job-card";
import { JobFilters, type FilterOption } from "./job-filters";
import { Pagination } from "./pagination";
import { SearchBar } from "./search-bar";
import { SortSelect, type SortValue } from "./sort-select";

const JOBS_PER_PAGE = 6;

type BrowseJobsProps = {
  jobs: Job[];
  error?: string | null;
};

export function BrowseJobs({ jobs, error }: BrowseJobsProps) {
  const [search, setSearch] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sort, setSort] = useState<SortValue>("recent");
  const [page, setPage] = useState(1);

  const filterOptions: FilterOption[] = JOB_TYPES.map((type) => ({
    label: type,
    value: type,
    count: jobs.filter((job) => job.jobType === type).length,
  }));

  const sortedJobs = useMemo(() => sortJobs(jobs, sort), [jobs, sort]);
  const totalPages = Math.max(1, Math.ceil(sortedJobs.length / JOBS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const visibleJobs = sortedJobs.slice(
    (currentPage - 1) * JOBS_PER_PAGE,
    currentPage * JOBS_PER_PAGE,
  );

  function handleSearch() {
    setPage(1);
    // TODO: update the URL search params with `search`.
  }

  function toggleType(type: string) {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type],
    );
    setPage(1);
    // TODO: update the URL search params with `selectedTypes`.
  }

  function handleSort(value: SortValue) {
    setSort(value);
    setPage(1);
    // TODO: update the URL search params with the selected sort.
  }

  return (
    <div>
      <SearchBar
        value={search}
        onValueChange={setSearch}
        onSubmit={handleSearch}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <JobFilters
          options={filterOptions}
          selected={selectedTypes}
          onToggle={toggleType}
        />

        <section>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-lg font-semibold text-white sm:text-xl">
              Found {jobs.length.toLocaleString("en-US")} Professional Jobs
            </h1>

            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>Sort by:</span>
              <SortSelect value={sort} onValueChange={handleSort} />
            </div>
          </div>

          {error ? (
            <ErrorState message={error} />
          ) : visibleJobs.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="mt-5 flex flex-col gap-4">
              {visibleJobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          )}

          {!error && totalPages > 1 && (
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              className="mt-8"
            />
          )}
        </section>
      </div>
    </div>
  );
}

function sortJobs(jobs: Job[], sort: SortValue) {
  if (sort === "deadline") {
    return [...jobs].sort(
      (a, b) => deadlineValue(a) - deadlineValue(b),
    );
  }

  if (sort === "salary") {
    return [...jobs].sort(
      (a, b) => Number(b.maxSalary || 0) - Number(a.maxSalary || 0),
    );
  }

  return jobs;
}

function deadlineValue(job: Job) {
  const time = new Date(job.deadline).getTime();
  return Number.isNaN(time) ? Number.POSITIVE_INFINITY : time;
}

function ErrorState({ message }: { message: string }) {
  return (
    <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-16 text-center">
      <AlertCircle className="size-8 text-red-400" />
      <p className="text-sm text-white/60">{message}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-5 flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-16 text-center">
      <Briefcase className="size-8 text-white/30" />
      <p className="text-sm text-white/60">
        No jobs found. Try a different search or filter.
      </p>
    </div>
  );
}
