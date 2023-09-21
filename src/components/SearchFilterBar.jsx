import {
  AdjustmentsVerticalIcon,
  BeakerIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

export default function SearchFilterBar() {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="grow shrink basis-0 h-11 px-4 py-2.5 bg-foreground rounded border border-neutral-300 justify-start items-center gap-2 flex">
        <div className="w-4 h-4 bg-foreground relative">
          <MagnifyingGlassIcon />
        </div>
        <div className="text-neutral-700 text-lg font-normal">Search</div>
      </div>
      <div className="text-neutral-700 text-sm font-medium">Filter by</div>
      <div className="px-4 py-2.5 bg-white rounded border border-neutral-300 justify-start items-center gap-2 flex">
        <div className="text-primary-text text-base font-medium">Location</div>
        <div className="w-4 h-4 relative">
          <ChevronDownIcon />
        </div>
      </div>
      <div className="px-4 py-2.5 bg-white rounded border border-neutral-300 justify-start items-center gap-2 flex">
        <div className="text-primary-text text-base font-medium">
          Medical Status
        </div>
        <div className="w-4 h-4 relative">
          <ChevronDownIcon />
        </div>
      </div>

      <div className="px-4 py-2.5 bg-white rounded border border-neutral-300 justify-start items-center gap-2 flex">
        <div className="text-primary-text text-base font-medium">
          Behavior Status
        </div>
        <div className="w-4 h-4 relative">
          <ChevronDownIcon />
        </div>
      </div>

      <div className="px-4 py-2.5 bg-white rounded border border-neutral-300 justify-start items-center gap-2 flex">
        <div className="text-primary-text text-base font-medium">
          Recent Log Tags
        </div>
        <div className="w-4 h-4 relative">
          <ChevronDownIcon />
        </div>
      </div>

      <div className=" px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex">
        <div className="text-foreground h-4 w-4 relative">{<PlusIcon/>}</div>
        <div className="text-foreground text-base font-medium">Add a dog</div>
      </div>
    </div>
  );
}
