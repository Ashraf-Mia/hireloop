"use client";
import Link from "next/link";
import {
  BadgeCheck,
  Bookmark,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  HeartPulse,
  Laptop,
  MapPin,
  PiggyBank,
  Plane,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { Job } from "@/types/job";
import {
  formatDate,
  formatLocation,
  formatSalary,
  getCategoryMeta,
} from "@/lib/job-utils";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

type JobDetailsProps = {
  job: Job;
};

// The responsibilities and qualifications textareas are free text, so this
// helper turns them into a clean list: one item per line, without the bullet
// characters a recruiter may have typed.
function toList(text: string) {
  return text
    .split("\n")
    .map((line) => line.replace(/^[\s•*-]+/, "").trim())
    .filter(Boolean);
}

export function JobDetails({ job }: JobDetailsProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleApplyNow = () => {
    if (!user) {
      router.push(`/sign-in?redirectTo=/jobs/${job._id}`);
    } else {
      // save the application to the database
      console.log("save the application to the database ");
    }
  };

  const meta = getCategoryMeta(job.category);
  const CategoryIcon = meta.icon;

  const responsibilities = toList(job.responsibilities);
  const requirements = toList(job.qualifications);

  // The jobs collection has no dedicated description column yet, so the
  // intro paragraph is composed from the fields that do exist.
  const description = `${job.companyName} is looking for a ${job.jobTitle} to join the team. This ${job.jobType.toLowerCase()} role sits in the ${job.category} space, and applications close on ${formatDate(job.deadline)}.`;

  return (
    <div>
      {/* Breadcrumb. It now renders below the navbar because the page
          wrapper adds top padding (see page.tsx). */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-white/40"
      >
        <Link href="/jobs" className="transition-colors hover:text-white">
          Jobs
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-white/70">Job Details</span>
      </nav>

      {/* Hero card: role, company and the primary actions. */}
      <section className="mt-4 rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-4">
            <span
              className={`flex size-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] ${meta.text}`}
            >
              <CategoryIcon className="size-6" />
            </span>

            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-white sm:text-2xl">
                {job.jobTitle}
              </h1>

              <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-white/60">{job.companyName}</span>
                <span className="size-1 rounded-full bg-white/30" />
                {/* Static trust badge from the design; the jobs data has no
                    verification flag yet. */}
                <span className="inline-flex items-center gap-1 text-emerald-400">
                  <BadgeCheck className="size-4" />
                  Verified Employer
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Save this job"
              className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <Bookmark className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleApplyNow}
              className="h-10 rounded-lg bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* Quick facts row. */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard
          icon={Wallet}
          label="Salary Range"
          value={formatSalary(job)}
        />
        <InfoCard icon={MapPin} label="Location" value={formatLocation(job)} />
        <InfoCard icon={Briefcase} label="Job Type" value={job.jobType} />
        {/* The design shows "Experience", but the jobs data has no such field,
            so the real application deadline is shown instead. */}
        <InfoCard
          icon={CalendarDays}
          label="Deadline"
          value={formatDate(job.deadline)}
        />
      </div>

      {/* Two-column layout: main content on the left, company card on the right. */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
        <div className="flex flex-col gap-4">
          <Card>
            <h2 className="text-base font-semibold text-white">
              Job Description
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              {description}
            </p>
          </Card>

          {/* Only render this card when the recruiter actually entered
              responsibilities. */}
          {responsibilities.length > 0 && (
            <Card>
              <h2 className="text-base font-semibold text-white">
                Responsibilities
              </h2>
              <ul className="mt-4 space-y-3">
                {responsibilities.map((item, index) => (
                  <li
                    key={`${index}-${item}`}
                    className="flex gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-white/30" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card>
            <h2 className="text-base font-semibold text-white">Requirements</h2>

            {/* Skill chips. They are built from real job fields so the section
                keeps the look of the design without hardcoded content. */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[job.category, job.jobType, job.remote ? "Remote" : "On-site"]
                .filter(Boolean)
                .map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/70"
                  >
                    {tag}
                  </span>
                ))}
            </div>

            {requirements.length > 0 && (
              <ul className="mt-4 space-y-3">
                {requirements.map((item, index) => (
                  <li
                    key={`${index}-${item}`}
                    className="flex gap-3 text-sm leading-relaxed text-white/60"
                  >
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-white/40" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <h2 className="text-base font-semibold text-white">Benefits</h2>

            {/* Placeholder benefits: the jobs collection does not store
                benefits yet. Replace these with job data once available. */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Benefit icon={HeartPulse} label="Full Health & Dental" />
              <Benefit icon={PiggyBank} label="Competitive 401k" />
              <Benefit icon={Laptop} label="Latest Hardware Stipend" />
              <Benefit icon={Plane} label="Unlimited PTO" />
            </div>
          </Card>
        </div>

        <aside className="flex flex-col gap-4">
          <Card>
            <h2 className="text-base font-semibold text-white">
              Company Overview
            </h2>

            {/* No company cover image in the data yet, so a subtle branded
                cover is used instead of a photo. */}
            <div className="mt-4 flex h-40 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.08] to-transparent">
              <Building2 className="size-10 text-white/15" />
            </div>

            <dl className="mt-4 divide-y divide-white/10 text-sm">
              <div className="flex items-center justify-between py-3">
                <dt className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                  Size
                </dt>
                {/* Placeholder: company size is not stored in the job data. */}
                <dd className="text-white/70">250 - 500 Employees</dd>
              </div>

              <div className="flex items-center justify-between py-3">
                <dt className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                  Industry
                </dt>
                <dd className="text-white/70">{job.category}</dd>
              </div>
            </dl>

            <button
              type="button"
              className="mt-2 h-10 w-full rounded-lg border border-white/10 text-sm text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              Visit Website
            </button>
          </Card>
        </aside>
      </div>
    </div>
  );
}

// Shared card shell so every section has the same dark surface and border.
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-xl border border-white/10 bg-[#0d0d0d] p-5 sm:p-6 ${className}`}
    >
      {children}
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d0d0d] p-4">
      <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
        <Icon className="size-4 text-white/60" />
      </span>
      <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-white/40">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function Benefit({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-white/70">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
        <Icon className="size-4 text-white/60" />
      </span>
      {label}
    </div>
  );
}
