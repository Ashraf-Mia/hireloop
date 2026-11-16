"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Briefcase, RefreshCw } from "lucide-react";
import type { Job } from "@/types/job";
// import { deleteJob, getJobs } from "@/lib/jobs-api";
import { GRID_COLS, JobRow } from "./job-row";
import { DeleteJobDialog } from "./delete-job-dialog";
import { deleteJob, getJobs } from "@/lib/api/jobs-api";

const headers = [
  "Job Title & Dept",
  "Company & Location",
  "Type",
  "Compensation",
  "Applicants",
  "Status",
  "Deadline",
  "Actions",
];

function SkeletonRow() {
  return (
    <li className="flex animate-pulse items-center gap-4 border-b border-white/[0.06] px-5 py-5 last:border-b-0">
      <div className="size-10 rounded-lg bg-white/[0.06]" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-1/3 rounded bg-white/[0.06]" />
        <div className="h-3 w-1/5 rounded bg-white/[0.04]" />
      </div>
      <div className="hidden h-8 w-24 rounded-lg bg-white/[0.06] sm:block" />
    </li>
  );
}

export function ManageJobsTable() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [target, setTarget] = useState<Job | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  // Retry বাটনের জন্য: আগে state রিসেট করে তারপর লোড
  function retry() {
    setLoading(true);
    setError(null);
    fetchJobs();
  }

  async function fetchJobs() {
    try {
      setJobs(await getJobs());
    } catch {
      setError("Could not load jobs. Make sure the API server is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    getJobs()
      .then((data) => {
        if (!cancelled) setJobs(data);
      })
      .catch(() => {
        if (!cancelled)
          setError("Could not load jobs. Make sure the API server is running.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);
  function openDelete(job: Job) {
    setDeleteError(null);
    setTarget(job);
  }

  async function confirmDelete() {
    if (!target) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteJob(target._id);
      setJobs((prev) => prev.filter((j) => j._id !== target._id));
      setTarget(null);
    } catch {
      setDeleteError("Could not delete this job. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <>
      <div className="mt-8 rounded-2xl border border-white/10 bg-[#0d0d0d]">
        {/* Header (শুধু বড় স্ক্রিনে) */}
        <div
          className={`hidden gap-4 rounded-t-2xl border-b border-white/10 bg-black/40 px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-white/50 lg:grid ${GRID_COLS}`}
        >
          {headers.map((h, i) => (
            <span
              key={h}
              className={i === headers.length - 1 ? "text-right" : ""}
            >
              {h}
            </span>
          ))}
        </div>

        {loading ? (
          <ul>
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonRow key={i} />
            ))}
          </ul>
        ) : error ? (
          <div className="flex flex-col items-center gap-3 px-4 py-16 text-center">
            <AlertCircle className="size-8 text-red-400" />
            <p className="text-sm text-white/60">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm text-white/80 transition-colors hover:bg-white/10"
            >
              <RefreshCw className="size-4" />
              Retry
            </button>
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-3 px-4 py-16 text-center"
          >
            <Briefcase className="size-8 text-white/30" />
            <p className="text-sm text-white/60">No job posts yet.</p>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="inline-flex h-9 items-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
            >
              Create your first job
            </Link>
          </motion.div>
        ) : (
          <ul>
            <AnimatePresence initial={false}>
              {jobs.map((job) => (
                <JobRow key={job._id} job={job} onDelete={openDelete} />
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>

      <DeleteJobDialog
        job={target}
        loading={deleting}
        error={deleteError}
        onClose={() => setTarget(null)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
