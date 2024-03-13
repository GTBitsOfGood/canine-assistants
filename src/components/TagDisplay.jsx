import { XMarkIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "./Chip";
import stringUtils from "@/utils/stringutils";
import { useState, useEffect} from "react";

export default function TagDisplay({ tags, removeTag }) {

  const [showMore, setShowMore] = useState(false);
  const [tagCount, setTagCount] = useState(0);

  useEffect(() => {
    let tempTagCount = 0;
    tags.map((tag) => {
      if (tag.group == "tag") {
        tempTagCount += 1;
      }
    })
    setTagCount(tempTagCount - 1);
  });

  return (
    <>
    <div className="sm:flex items-center gap-1 flex-row hidden">
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
     <div className="flex  gap-2 flex-col items-start sm:hidden">
      {removeTag ? (
        <div className="text-sm font-medium mr-1">
          Filters applied: {tags.length === 0 ? "None" : ""}
        </div>
      ) : (
        <></>
      )}
      <div className="flex gap-2">
        {tags.map((tag) => {
          return (
            tag.group == "severity" || tag.group == "topic" ?
            
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
            : <></>
          );
        })}
    </div>
    <div>
        {tagCount <= 0 ?
        tags.map((tag) => {
          return (
            tag.group == "tag" ?
            
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
            : <>
              
            </>
          );
        })
      : <div className="gap-2 flex">

        <Chip
                key={tags[2].label}
                label={
                  <div className="flex gap-2 items-center">
                    <span>
                      <strong>{stringUtils.toUpperEveryWord(tags[2].group)}</strong>{" "}
                      {tags[2].label}
                    </span>
                    {removeTag ? (
                      <button onClick={() => removeTag(tags[2].group, tags[2].index)}>
                        <XMarkIcon className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                }
                type={
                  tags[2].group === "topic"
                    ? ChipTypeStyles.Topic
                    : ChipTypeStyles[tags[2].label.replace(/[0-9]/g, "")] ||
                      ChipTypeStyles.Tag
                }
              />
        {showMore ? 
          tags.map((tag) => {
            return (
              tag.group == "tag" && tags.indexOf(tag) != 2 ?
              
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
              : <>
                
              </>
            );
          }):
          <button
              className="font-bold"
              onClick={() => setShowMore(true)}
            >
              +{tagCount}
            </button>
        }
      </div>}
    </div>
   </div>
   </>
  );
}
