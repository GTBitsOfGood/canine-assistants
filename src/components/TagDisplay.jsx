import { XMarkIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "./Chip";
import stringUtils from "@/utils/stringutils";

export default function TagDisplay({ tags, removeTag }) {
  return (
    <div className="flex sm:items-center gap-1 sm:flex-row flex-col items-start">
      {removeTag ? (
        <div className="text-sm font-medium mr-1">
          Filters applied: {tags.length === 0 ? "None" : ""}
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-row flex-wrap gap-1">
        {tags.map((tag) => {
          return (
            <Chip
              key={tag.label}
              label={
                <div className="flex gap-2 items-center">
                  <span>
                    <strong>{stringUtils.toUpperEveryWord(tag.group)}</strong>{" "}
                    {tag.label}
                  </span>
                  {removeTag ? (
                    <button onClick={() => removeTag(tag.group, tag.index)}>
                      <XMarkIcon className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              }
              type={
                tag.group === "topic"
                  ? ChipTypeStyles.Topic
                  : ChipTypeStyles[tag.label.replace(/[0-9]/g, "")] ||
                    ChipTypeStyles.Tag
              }
            />
          );
        })}
      </div>
    </div>
  );
}
