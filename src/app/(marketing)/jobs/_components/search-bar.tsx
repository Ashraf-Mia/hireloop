import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();

  const handleSunmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const search = data.search;

    const params = new URLSearchParams();
    params.set("search", search as string);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSunmit}
      action="/jobs"
      method="get"
      className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d] p-4 sm:flex-row"
    >
      <label htmlFor="job-search" className="sr-only">
        Search by job title or keyword
      </label>

      <div className="relative flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-white/40" />
        <input
          id="job-search"
          name="search"
          type="search"
          placeholder="Search by job title, keywords..."
          className="h-11 w-full rounded-lg border border-white/10 bg-[#141414] pr-4 pl-11 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
        />
      </div>

      <button
        type="submit"
        className="h-11 rounded-lg bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
      >
        Search Jobs
      </button>
    </form>
  );
}
