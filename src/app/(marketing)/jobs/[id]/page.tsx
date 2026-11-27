import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";

import { getJob } from "@/lib/api/jobs-api";
import type { Job } from "@/types/job";
import { JobDetailsSkeleton } from "@/components/jobDetails/job-details-skeleton";
import { JobDetails } from "@/components/jobDetails/job-details";
// import { JobDetails } from "../../../../components/jobDetails/job-details";
// import { JobDetailsSkeleton } from "../../../../components/jobDetails/job-details-skeleton";

export const metadata: Metadata = {
  title: "Job Details | HireLoop",
};

export default function JobDetailsPage(props: PageProps<"/jobs/[id]">) {
  return (
    // pt-28 pushes the content below the absolutely positioned navbar, the
    // same way the /jobs listing page does it. The marketing layout already
    // renders the Navbar above and the Footer below this page, so the details
    // page now sits between them instead of overlapping the navbar.
    <main className="min-h-screen bg-black px-4 pt-28 pb-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<JobDetailsSkeleton />}>
          <JobDetailsContent params={props.params} />
        </Suspense>
      </div>
    </main>
  );
}

async function JobDetailsContent({
  params,
}: Pick<PageProps<"/jobs/[id]">, "params">) {
  // Next.js 16 route params are async, so they must be awaited before use.
  const { id } = await params;

  let job: Job | null = null;
  let error: string | null = null;

  try {
    job = await getJob(id);
  } catch {
    error = "Could not load this job. Make sure the API server is running.";
  }

  if (error || !job) {
    return (
      <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d0d] px-4 py-16 text-center">
        <p className="text-sm text-white/60">{error ?? "Job not found."}</p>
        <Link
          href="/jobs"
          className="text-sm text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Back to jobs
        </Link>
      </div>
    );
  }

  return <JobDetails job={job} />;
}
