import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

/**
 * UserSearchBar component to be used in user management page
 * @param {*} setSearch function to set search parameter
 * @returns HTML user search bar 
 */
export default function UserSearchBar({ setSearch }) {

  return (
    <div className="flex items-center gap-4">
      <div className="relative grow justify-start items-center flex">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </div>
        <input
          type="search"
          className="w-full h-full rounded bg-foreground border border-neutral-300 text-neutral-700 text-sm p-2.5 pl-10 font-normal"
          placeholder="Search users by name"
          required
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
