export function JobsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-[76px] rounded-2xl border border-white/10 bg-[#0d0d0d]" />

      <div className="mt-6 grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
        <div className="h-64 rounded-xl border border-white/10 bg-[#0d0d0d]" />

        <div>
          <div className="h-6 w-64 rounded bg-white/10" />
          <div className="mt-5 flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-32 rounded-xl border border-white/10 bg-[#0d0d0d]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
