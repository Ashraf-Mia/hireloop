"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarDays,
  Globe,
  MapPin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Marketing",
  "Sales",
  "Customer Support",
  "Finance",
  "Operations",
  "Other",
];

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];

const SALARY_FREQUENCIES = ["per hour", "per month", "per year"];

// Everything the form collects, kept in one flat object.
type JobForm = {
  jobTitle: string;
  companyName: string;
  category: string;
  jobType: string;
  remote: boolean;
  location: string;
  deadline: string;
  minSalary: string;
  maxSalary: string;
  frequency: string;
  responsibilities: string;
  qualifications: string;
};

const initialForm: JobForm = {
  jobTitle: "",
  companyName: "",
  category: "",
  jobType: "Full-time",
  remote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per month",
  responsibilities: "",
  qualifications: "",
};

function Section({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <span className="size-2 rounded-full bg-brand" />
        {step}. {title}
      </h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

const NewJobPage = () => {
  const [form, setForm] = useState<JobForm>(initialForm);

  function update<K extends keyof JobForm>(key: K, value: JobForm[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Replace with your API call when the backend is ready.
    console.log("New job:", form);
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground">
            Manage Jobs / Create New Listing
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Post a New Job
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Fill in the position specifications to attract qualified talent
            across our network.
          </p>
        </div>

        <Button
          type="submit"
          form="new-job-form"
          className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90"
        >
          Publish Job
          <ArrowRight />
        </Button>
      </header>

      <form
        id="new-job-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-10"
      >
        <Section step={1} title="Basic Information">
          <Field>
            <FieldLabel htmlFor="jobTitle">
              Job Title <span className="text-brand">*</span>
            </FieldLabel>
            <Input
              id="jobTitle"
              value={form.jobTitle}
              onChange={(e) => update("jobTitle", e.target.value)}
              placeholder="Frontend Developer"
              required
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="companyName">
                Company Name <span className="text-brand">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <Building2 />
                </InputGroupAddon>
                <InputGroupInput
                  id="companyName"
                  value={form.companyName}
                  onChange={(e) => update("companyName", e.target.value)}
                  placeholder="HirePulse Network"
                  required
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="category">
                Job Category <span className="text-brand">*</span>
              </FieldLabel>
              <Select
                value={form.category}
                onValueChange={(value) => update("category", value ?? "")}
              >
                <SelectTrigger id="category" className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {JOB_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>

          <Field>
            <FieldLabel>
              Job Type <span className="text-brand">*</span>
            </FieldLabel>
            <ToggleGroup
              variant="outline"
              value={[form.jobType]}
              onValueChange={(value) => update("jobType", value[0] ?? "")}
              className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4"
            >
              {JOB_TYPES.map((type) => (
                <ToggleGroupItem
                  key={type}
                  value={type}
                  className="h-10 w-full aria-pressed:border-brand aria-pressed:bg-brand/10 aria-pressed:text-foreground"
                >
                  {type}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </Field>
        </Section>

        <Section step={2} title="Location, Compensation & Timeline">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-input bg-card/50 p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-8 shrink-0 place-items-center rounded-full border bg-muted/40">
                <Globe className="size-4 text-muted-foreground" />
              </span>
              <div>
                <p className="text-sm font-medium">
                  Remote Work Allowed (isRemote)
                </p>
                <p className="text-xs text-muted-foreground">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
            </div>
            <Switch
              id="remote"
              checked={form.remote}
              onCheckedChange={(checked) => update("remote", checked)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="location">
                Job Location (location) <span className="text-brand">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <MapPin />
                </InputGroupAddon>
                <InputGroupInput
                  id="location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="New York, USA"
                  required
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="deadline">
                Application Deadline (deadline){" "}
                <span className="text-brand">*</span>
              </FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <CalendarDays />
                </InputGroupAddon>
                <InputGroupInput
                  id="deadline"
                  type="date"
                  value={form.deadline}
                  onChange={(e) => update("deadline", e.target.value)}
                  required
                />
              </InputGroup>
            </Field>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="minSalary">Min Salary / Rate</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>€</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="minSalary"
                  type="number"
                  min={0}
                  value={form.minSalary}
                  onChange={(e) => update("minSalary", e.target.value)}
                  placeholder="25"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="maxSalary">Max Salary / Rate</FieldLabel>
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>€</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="maxSalary"
                  type="number"
                  min={0}
                  value={form.maxSalary}
                  onChange={(e) => update("maxSalary", e.target.value)}
                  placeholder="40"
                />
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
              <Select
                value={form.frequency}
                onValueChange={(value) => update("frequency", value ?? "")}
              >
                <SelectTrigger id="frequency" className="w-full">
                  <SelectValue placeholder="per hour" />
                </SelectTrigger>
                <SelectContent>
                  {SALARY_FREQUENCIES.map((frequency) => (
                    <SelectItem key={frequency} value={frequency}>
                      {frequency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
        </Section>

        <Section step={3} title="Responsibilities & Requirements">
          <Field>
            <FieldLabel htmlFor="responsibilities">
              Key Responsibilities <span className="text-brand">*</span>
            </FieldLabel>
            <Textarea
              id="responsibilities"
              rows={4}
              value={form.responsibilities}
              onChange={(e) => update("responsibilities", e.target.value)}
              placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences."
              required
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="qualifications">
              Qualifications & Requirements <span className="text-brand">*</span>
            </FieldLabel>
            <Textarea
              id="qualifications"
              rows={4}
              value={form.qualifications}
              onChange={(e) => update("qualifications", e.target.value)}
              placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures"
              required
            />
            <FieldDescription>
              One requirement per line works best.
            </FieldDescription>
          </Field>
        </Section>

        <div className="flex items-center justify-end gap-2">
          <Button type="submit" className="gap-2 bg-brand text-brand-foreground hover:bg-brand/90">
            Publish Job
            <Briefcase />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewJobPage;
