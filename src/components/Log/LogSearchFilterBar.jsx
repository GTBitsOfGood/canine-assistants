import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";
import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";
import { consts } from "@/utils/consts";

export default function LogSearchFilterBar({ filters, setFilters, setSearch, addLogFunction }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <div className="relative items-center flex w-3/4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
          <input
            type="search"
            className="w-full h-full rounded bg-foreground border border-neutral-300 text-neutral-700 text-lg p-2.5 pl-10 font-normal"
            placeholder="Search Logs..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => addLogFunction()} className="button-base primary-button flex gap-2">
          <div className="primary-button-plus-icon">{<PlusIcon />}</div>
          <div className="primary-button-text">Add a log</div>
        </button>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="text-neutral-700 text-sm font-medium">Filter by</div>

        <DropdownMenu
          selectedOptions={filters.topic}
          label="Topic"
          submitFilters={(newFilters) => {
            if (newFilters !== undefined) {
              setFilters({ ...filters, topic: newFilters });
            }
          }}
        >
          {consts.topicArray.map((topic, index) => (
            <DropdownMenuOption
              key={index}
              label={topic}
              name={topic.replaceAll(" ", "").toLowerCase()}
            />
          ))}
        </DropdownMenu>

        <DropdownMenu
          selectedOptions={filters.severity}
          label="Severity"
          submitFilters={(newFilters) => {
            if (
              newFilters !== undefined &&
              Object.keys(newFilters).length > 0
            ) {
              setFilters({ ...filters, severity: newFilters });
            }
          }}
        >
          {consts.concernArray.map((severity, index) => (
            <DropdownMenuOption
              key={index}
              label={severity}
              name={severity.replaceAll(" ", "").toLowerCase()}
            />
          ))}
        </DropdownMenu>

        <DropdownMenu
          selectedOptions={filters.tags}
          label="Tags"
          submitFilters={(newFilters) => {
            if (newFilters !== undefined) {
              setFilters({ ...filters, tags: newFilters });
            }
          }}
        >
          {consts.tagsArray.map((tag, index) => (
            <DropdownMenuOption
              key={index}
              label={tag}
              name={tag.replaceAll(" ", "").toLowerCase()}
            />
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
}
