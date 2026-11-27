// Loading placeholder shown while the job details are being fetched.
// It mirrors the shape of the real page to avoid layout shift.
export function JobDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-32 rounded bg-white/10" />

      <div className="mt-4 h-28 rounded-2xl border border-white/10 bg-[#0d0d0d]" />

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-28 rounded-xl border border-white/10 bg-[#0d0d0d]"
          />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="h-96 rounded-xl border border-white/10 bg-[#0d0d0d]" />
        <div className="h-80 rounded-xl border border-white/10 bg-[#0d0d0d]" />
      </div>
    </div>
  );
}
