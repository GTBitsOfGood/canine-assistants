import { XMarkIcon } from "@heroicons/react/24/solid";
import { Chip } from "./Chip";

export default function SearchTagDisplay({ tags }) {
  return (
    <div className="flex items-center gap-1">
      <div className="text-sm font-medium mr-1">
        Filters applied: {tags.length === 0 ? "None" : ""}
      </div>

      {tags.map((tag) => (
        <Chip
          key={tag.label}
          label={
            <div className="flex gap-2 items-center">
              <span>{tag.label}</span>
                <XMarkIcon className="h-3.5 w-3.5 mt-1" />
            </div>
          }
          type={tag.type}
        />
      ))}
    </div>
  );
}
