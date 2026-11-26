import { getJobs } from "@/lib/api/jobs-api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | HireLoop",
};

export default async function BrowseJobsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = await searchParams;
  const urlSearch = new URLSearchParams(search as Record<string, string>);
  const query = urlSearch.toString();
  console.log("search params", query);

  const jobs = await getJobs(query);
  return (
    <main className="min-h-screen bg-black px-4 pt-32 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Jobs</h1>
        {/* এখানে পেজের কনটেন্ট */}
        <ul>
          {jobs.map((jobs) => (
            <li key={jobs._id}>{jobs.jobTitle}</li>
          ))}
        </ul>
      </div>
    </main>
  );
}
