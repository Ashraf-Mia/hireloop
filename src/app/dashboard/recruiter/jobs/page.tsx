import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";
import { ManageJobsTable } from "./_components/manage-jobs-table";

export const metadata: Metadata = {
  title: "Manage Jobs | HireLoop",
};

export default function ManageJobsPage() {
  return (
    <div className="p-4 text-white sm:p-6 lg:p-8">
      <nav className="flex items-center gap-2 text-xs text-white/50">
        <span>Manage Jobs</span>
        <ChevronRight className="size-3.5" />
        <span className="text-indigo-300">Job Listings &amp; Postings</span>
      </nav>

      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs/new"
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 text-sm font-medium text-white shadow-[0_0_24px_rgba(99,102,241,0.4)] transition-colors hover:bg-indigo-400"
        >
          <Plus className="size-4" />
          New Job Post
        </Link>
      </div>

      <ManageJobsTable />
    </div>
  );
}
