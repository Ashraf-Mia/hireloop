import {
  Bookmark,
  Briefcase,
  Globe,
  MapPin,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { Job } from "@/types/job";
import { formatLocation, formatSalary, getCategoryMeta } from "@/lib/job-utils";
import { redirect } from "next/navigation";
// import Link from "next/link";

type JobCardProps = {
  job: Job;
};

export function JobCard({ job }: JobCardProps) {
  const meta = getCategoryMeta(job.category);
  const CategoryIcon = meta.icon;

  const handleviewDetail = () => {
    redirect(`/jobs/${job._id}`);
  };

  return (
    <article
      onClick={handleviewDetail}
      className="rounded-xl border border-white/10 bg-[#0d0d0d] p-5 transition-colors hover:border-white/20"
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] ${meta.text}`}
        >
          <CategoryIcon className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-lg font-semibold text-white">
            {job.jobTitle}
          </h2>
          <p className="mt-1 truncate text-sm text-white/50">
            {job.companyName} • {formatLocation(job)}
          </p>
        </div>

        <button
          type="button"
          aria-label={`Save ${job.jobTitle}`}
          className="rounded-md p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Bookmark className="size-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <JobTag icon={Wallet} label={formatSalary(job)} />
        <JobTag icon={Briefcase} label={job.jobType} />
        <JobTag
          icon={job.remote ? Globe : MapPin}
          label={job.remote ? "Remote" : "On-site"}
        />
        {job.category && (
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">
            {job.category}
          </span>
        )}
      </div>
    </article>
  );
}

function JobTag({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">
      <Icon className="size-3.5" />
      {label}
    </span>
  );
}
