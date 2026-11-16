"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Check,
  Copy,
  EllipsisVertical,
  Eye,
  Globe,
  MapPin,
  Pencil,
  Trash2,
  Users,
} from "lucide-react";
import type { Job } from "@/types/job";
import {
  deadlineNote,
  formatDate,
  formatLocation,
  formatSalary,
  getCategoryMeta,
  getJobStatus,
} from "@/lib/job-utils";

// হেডার আর রো দুটোতেই একই গ্রিড
export const GRID_COLS =
  "lg:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_96px_minmax(0,1.4fr)_minmax(0,1.3fr)_84px_minmax(0,1.2fr)_150px]";

function RowMenu({ job }: { job: Job }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function copyId() {
    try {
      await navigator.clipboard.writeText(job._id);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="More actions"
        className="flex size-8 items-center justify-center rounded-md text-white/60 transition-colors hover:bg-white/10 hover:text-white"
      >
        <EllipsisVertical className="size-4" />
      </button>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="absolute right-0 top-full z-30 mt-1 w-44 rounded-lg border border-white/10 bg-[#141414] p-1 shadow-xl"
        >
          <Link
            href={`/jobs/${job._id}`}
            className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <Eye className="size-4 text-white/50" />
            View job
          </Link>
          <button
            type="button"
            onClick={copyId}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            {copied ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4 text-white/50" />
            )}
            {copied ? "Copied" : "Copy job ID"}
          </button>
        </motion.div>
      )}
    </div>
  );
}

export function JobRow({
  job,
  onDelete,
}: {
  job: Job;
  onDelete: (job: Job) => void;
}) {
  const meta = getCategoryMeta(job.category);
  const Icon = meta.icon;
  const LocationIcon = job.remote ? Globe : MapPin;
  const status = getJobStatus(job.deadline);
  const applicants = job.applicantsCount ?? 0;

  return (
    <motion.li
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3 }}
      className={`grid grid-cols-2 gap-x-4 gap-y-4 border-b border-white/[0.06] px-4 py-4 transition-colors last:border-b-0 hover:bg-white/[0.02] sm:px-5 lg:items-center ${GRID_COLS}`}
    >
      {/* Title & category */}
      <div className="col-span-2 flex min-w-0 items-center gap-3 lg:col-span-1">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] ${meta.text}`}
        >
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-white">
            {job.jobTitle}
          </p>
          <p className={`truncate text-xs ${meta.text}`}>{job.category}</p>
        </div>
      </div>

      {/* Company & location */}
      <div className="col-span-2 min-w-0 lg:col-span-1">
        <p className="truncate text-sm text-white">{job.companyName}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/50">
          <LocationIcon className="size-3.5 shrink-0" />
          <span className="truncate">{formatLocation(job)}</span>
        </p>
      </div>

      {/* Type */}
      <div>
        <span className="inline-flex whitespace-nowrap rounded-full bg-white/[0.07] px-3 py-1 text-xs text-white/80">
          {job.jobType}
        </span>
      </div>

      {/* Compensation */}
      <p className="text-sm text-white">{formatSalary(job)}</p>

      {/* Applicants */}
      <p className="flex items-center gap-2 text-sm text-white/70">
        <Users className="size-4 shrink-0" />
        {applicants} Candidates
      </p>

      {/* Status */}
      <div>
        {status === "active" ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.07] px-2.5 py-1 text-xs text-white/50">
            <span className="size-1.5 rounded-full bg-white/40" />
            Expired
          </span>
        )}
      </div>

      {/* Deadline */}
      <div>
        <p className="mb-0.5 text-[10px] uppercase tracking-wider text-white/40 lg:hidden">
          Deadline
        </p>
        <p className="text-sm text-white">{formatDate(job.deadline)}</p>
        <p className="text-xs text-white/40">{deadlineNote(job.deadline)}</p>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex items-center gap-2 lg:col-span-1 lg:justify-end">
        <Link
          href={`/dashboard/recruiter/jobs/${job._id}/edit`}
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-indigo-500/20 px-3 text-xs font-medium text-indigo-200 transition-colors hover:bg-indigo-500/30"
        >
          <Pencil className="size-3.5" />
          Update
        </Link>
        <button
          type="button"
          onClick={() => onDelete(job)}
          aria-label={`Delete ${job.jobTitle}`}
          className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] text-white/60 transition-colors hover:bg-red-500/15 hover:text-red-400"
        >
          <Trash2 className="size-4" />
        </button>
        <RowMenu job={job} />
      </div>
    </motion.li>
  );
}
