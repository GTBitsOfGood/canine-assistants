import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import DropdownMenu, { DropdownMenuOption } from "./DropdownMenu";
import { consts } from "@/utils/consts";

export default function DogSearchFilterBar({ filters, setFilters, setSearch }) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative grow justify-start items-center flex">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="w-4 h-4" />
        </div>
        <input
          type="search"
          className="w-full h-full rounded bg-foregrund border border-neutral-300 text-neutral-700 text-lg p-2.5 pl-10 font-normal"
          placeholder="Search Dogs..."
          required
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="text-neutral-700 text-sm font-medium">Filter by</div>

      <DropdownMenu
        selectedOptions={filters.location}
        label="Location"
        submitFilters={(newFilters) => {
          if (newFilters !== undefined) {
            setFilters({ ...filters, location: newFilters });
          }
        }}
      >
        {consts.locationArray.map((concern, index) => (
          <DropdownMenuOption
            key={index}
            label={concern}
            name={concern.replaceAll(" ", "").toLowerCase()}
          />
        ))}
      </DropdownMenu>

      <DropdownMenu
        selectedOptions={filters.medical}
        label="Medical Status"
        submitFilters={(newFilters) => {
          setFilters({ ...filters, medical: newFilters });
        }}
      >
        {consts.concernArray.map((concern, index) => (
          <DropdownMenuOption
            key={index}
            label={concern}
            name={concern.replaceAll(" ", "").toLowerCase()}
          />
        ))}
      </DropdownMenu>

      <DropdownMenu
        selectedOptions={filters.behavior}
        label="Behavior Status"
        submitFilters={(newFilters) => {
          if (newFilters !== undefined) {
            setFilters({ ...filters, behavior: newFilters });
          }
        }}
      >
        {consts.concernArray.map((concern, index) => (
          <DropdownMenuOption
            key={index}
            label={concern}
            name={concern.replaceAll(" ", "").toLowerCase()}
          />
        ))}
      </DropdownMenu>

      <DropdownMenu
        selectedOptions={filters.recentLogTags}
        label="Recent Log Tags"
        submitFilters={(newFilters) => {
          if (newFilters !== undefined) {
            setFilters({ ...filters, recentLogTags: newFilters });
          }
        }}
      >
        {consts.tagsArray.map((concern, index) => (
          <DropdownMenuOption
            key={index}
            label={concern}
            name={concern.replaceAll(" ", "").toLowerCase()}
          />
        ))}
      </DropdownMenu>

      <button className=" px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex">
        <div className="text-foreground h-4 w-4 relative">{<PlusIcon />}</div>
        <div className="text-foreground text-base font-medium">Add a dog</div>
      </button>
    </div>
  );
}
