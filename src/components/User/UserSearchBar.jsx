import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { consts } from "@/utils/consts";
import { useRouter } from "next/router";

export default function UserSearchBar({ setSearch }) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-4">
      <div className="relative grow justify-start items-center flex">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </div>
        <input
          type="search"
          className="w-full h-full rounded bg-foreground border border-neutral-300 text-neutral-700 text-sm p-2.5 pl-10 font-normal"
          placeholder="Search Users..."
          required
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
