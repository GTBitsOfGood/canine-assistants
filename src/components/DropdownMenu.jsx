import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function DropdownMenu({ children }) {
  return (
    <button className="px-4 py-2.5 bg-white rounded border border-neutral-300 justify-start items-center gap-2 inline-flex">
      <div className="text-primary-text text-base font-medium">Location</div>
      <div className="w-4 h-4 relative">
        <ChevronDownIcon />
      </div>
    </button>
  );
}
