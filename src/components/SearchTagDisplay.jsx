import { XMarkIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "./Chip";
import stringUtils from "@/utils/stringutils";

export default function SearchTagDisplay({ tags, removeTag }) {
  return (
    <div className="flex items-center gap-1">
      <div className="text-sm font-medium mr-1">
        Filters applied: {tags.length === 0 ? "None" : ""}
      </div>

      {tags.map((tag) => {
        return (
          <Chip
            key={tag.label}
            label={
              <div className="flex gap-2 items-center">
                <span>
                  <strong>{stringUtils.toUpperEveryWord(tag.group)}</strong>{" "}
                  {stringUtils.toUpperEveryWord(tag.label)}
                </span>
                <button onClick={() => removeTag(tag.group, tag.index)}>
                  <XMarkIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            }
            type={
              ChipTypeStyles[
                stringUtils.toUpperEveryWord(tag.label).replaceAll(" ", "")
              ] || ChipTypeStyles.Tag
            }
          />
        );
      })}
    </div>
  );
}
