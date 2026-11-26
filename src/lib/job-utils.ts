import {
  BadgeCheck,
  Briefcase,
  Cloud,
  Code2,
  Megaphone,
  PenTool,
  type LucideIcon,
} from "lucide-react";
import type { Job, JobStatus } from "@/types/job";

function endOfDay(deadline: string) {
  return new Date(`${deadline}T23:59:59`);
}

export function getJobStatus(deadline: string): JobStatus {
  return endOfDay(deadline).getTime() < Date.now() ? "expired" : "active";
}

export function formatDate(deadline: string) {
  const date = new Date(`${deadline}T00:00:00`);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function deadlineNote(deadline: string) {
  if (getJobStatus(deadline) === "expired") return "Closed";
  const days = Math.ceil(
    (endOfDay(deadline).getTime() - Date.now()) / 86400000,
  );
  return days <= 1 ? "Last day" : `${days} days left`;
}

function shortMoney(value: string) {
  const n = Number(value);
  if (isNaN(n)) return value;
  return n >= 1000 ? `${+(n / 1000).toFixed(1)}k` : `${n}`;
}

const frequencyShort: Record<string, string> = {
  "per hour": "hr",
  "per month": "mo",
  "per year": "yr",
};

export function formatSalary(job: Job) {
  if (!job.minSalary && !job.maxSalary) return "Salary not disclosed";

  const freq = frequencyShort[job.frequency] ?? job.frequency;
  const min = job.minSalary ? `$${shortMoney(job.minSalary)}` : "—";
  const max = job.maxSalary ? `$${shortMoney(job.maxSalary)}` : "—";
  return `${min} – ${max} / ${freq}`;
}

export function formatLocation(job: Job) {
  if (job.remote) return job.location ? `Remote (${job.location})` : "Remote";
  return job.location || "—";
}

export function getCategoryMeta(category: string): {
  icon: LucideIcon;
  text: string;
} {
  const c = category.toLowerCase();
  if (c.includes("design")) return { icon: PenTool, text: "text-orange-400" };
  if (c.includes("devops") || c.includes("infra"))
    return { icon: Cloud, text: "text-sky-400" };
  if (c.includes("market")) return { icon: Megaphone, text: "text-pink-400" };
  if (c.includes("quality") || c.includes("qa"))
    return { icon: BadgeCheck, text: "text-violet-300" };
  if (c.includes("engineer") || c.includes("tech"))
    return { icon: Code2, text: "text-indigo-400" };
  return { icon: Briefcase, text: "text-emerald-400" };
}
