export type Job = {
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

  // ব্যাকএন্ড থেকে এলে দেখাবে (এখন ডেটায় নেই)
  applicantsCount?: number;
};

export type JobStatus = "active" | "expired";
