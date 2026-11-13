import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up | HireLoop",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
