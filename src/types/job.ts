export type jobStatus = "active" | "expired";
// Everything the form collects, kept in one flat object.

export type JobStatus = "active" | "expired";

export type JobForm = {
  _id: string;
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: string;
  remote: boolean;
  location: string;
  deadline: string; // "2026-12-30"
  minSalary: string;
  maxSalary: string;
  frequency: string; // "per hour" | "per month" | "per year"
  responsibilities: string;
  qualifications: string;
  applicants: number;
  status: jobStatus;

  // ব্যাকএন্ড থেকে এলে দেখাবে (এখন ডেটায় নেই)
  applicantsCount?: number;
};

// A job as it comes back from the API.
export type Job = JobForm;

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
export const SALARY_FREQUENCIES = ["per hour", "per month", "per year"];
export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance",
  "Operations",
  "Other",
];
