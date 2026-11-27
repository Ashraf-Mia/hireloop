import { Job, JobForm } from "@/types/job";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export async function getJobs(qurey = ""): Promise<JobForm[]> {
  const res = await fetch(`${API_URL}/jobs?${qurey}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load jobs");

  const data = await res.json();
  return Array.isArray(data) ? data : (data.jobs ?? []);
}

// Fetch a single job for the details page: GET /jobs/:id.
export async function getJob(id: string): Promise<Job> {
  const res = await fetch(`${API_URL}/jobs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load job");

  const data = await res.json();
  // Some APIs wrap the document (e.g. { job: {...} }), so unwrap it if needed.
  return data.job ?? data;
}

export async function deleteJob(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/jobs/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete job");
}
