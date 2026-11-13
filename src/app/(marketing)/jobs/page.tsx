import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | HireLoop",
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black px-4 pt-32 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">Jobs</h1>
        {/* এখানে পেজের কনটেন্ট */}
      </div>
    </main>
  );
}
