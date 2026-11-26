import { Suspense } from "react";
import type { Metadata } from "next";

import { getJobs } from "@/lib/api/jobs-api";
import type { Job } from "@/types/job";
import { BrowseJobs } from "./_components/browse-jobs";
import { JobsSkeleton } from "./_components/jobs-skeleton";

export const metadata: Metadata = {
  title: "Browse Jobs | HireLoop",
};

export default function BrowseJobsPage(props: PageProps<"/jobs">) {
  return (
    <main className="min-h-screen bg-black px-4 pt-28 pb-16 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<JobsSkeleton />}>
          <JobsContent searchParams={props.searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function JobsContent({
  searchParams,
}: Pick<PageProps<"/jobs">, "searchParams">) {
  const params = await searchParams;
  const query = buildQuery(params);

  let jobs: Job[] = [];
  let error: string | null = null;

  try {
    jobs = await getJobs(query);
  } catch {
    error = "Could not load jobs. Make sure the API server is running.";
  }

  return <BrowseJobs jobs={jobs} error={error} />;
}

function buildQuery(params: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, item));
    } else if (value !== undefined) {
      query.set(key, value);
    }
  }

  return query.toString();
}
