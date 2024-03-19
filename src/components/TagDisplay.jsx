import { XMarkIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "./Chip";
import stringUtils from "@/utils/stringutils";

export default function TagDisplay({ tags, removeTag }) {
  return (
    <div className="flex gap-1 flex-row flex-wrap w-screen sm:w-full pl-2">
      
      <div className="flex sm:w-full flex-row flex-center items-center flex-wrap gap-1">
      {removeTag ? (
        <div className="text-xs font-medium mx-1">
          Filters applied: {tags.length === 0 ? "None" : ""}
        </div>
      ) : (
        <></>
      )}
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
