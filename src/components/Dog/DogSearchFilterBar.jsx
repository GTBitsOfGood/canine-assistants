import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";
import { consts } from "@/utils/consts";
import { useRouter } from "next/router";

export default function DogSearchFilterBar({ userRole, filters, setFilters, setSearch }) {
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
          placeholder="Search Dogs..."
          required
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="text-neutral-700 text-sm font-medium">Filter by</div>
      {userRole === "Manager" ? 
      <DropdownMenu
        selectedOptions={filters.ResolutionStatus}
        label="Resolve Status"
        submitFilters={(newFilters) => {
          if (newFilters !== undefined) {
            setFilters({ ...filters, ResolutionStatus: newFilters});
          }
        }}
      >
        {consts.resolveArray.map((concern, index) => (
          <DropdownMenuOption
            key={index}
            label={concern}
            name={concern.replaceAll(" ", "").toLowerCase()}
          />
        ))}
      </DropdownMenu>
      :
      <></>
        }

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
        label="Medical Concern"
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
        label="Behavior Concern"
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

      <div className="relative">
        <button
          type="button"
          onClick={() => router.push("/dogs/new")}
          className=" px-4 py-2.5 -mb-[1px] top-[-1px] bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex"
        >
          <div className="text-foreground h-4 w-4 relative">{<PlusIcon />}</div>
          <div className="text-foreground text-sm font-medium">
            Add Dog
          </div>
        </button>
      </div>
    </div>
  );
}
