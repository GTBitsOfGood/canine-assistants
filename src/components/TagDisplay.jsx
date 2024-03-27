import { XMarkIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "./Chip";
import stringUtils from "@/utils/stringutils";
import { Tooltip } from 'react-tooltip'

export default function TagDisplay({ tags, removeTag }) {

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
        
        {tags.slice(0, 5).map((tag) => {
          return (
            <Chip
              key={tag.label}
              label={
                <div className="flex gap-2 items-center">
                  <span>
                    <strong>{stringUtils.toUpperEveryWord(tag.group).replace(/([A-Z])/g, ' $1').trim()}</strong>{" "}
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
        
        {tags.length > 5 && (
          <div className="flex flex-col justify-center">
          <span data-tooltip-id={tags.length}>+{tags.length - 5}</span>
          <Tooltip
            place = "bottom"
            content = {tags.slice(5).map((tag, i) => {
              if (i === tags.slice(5).length - 1) {
              return (tag.label)
              } else {
              return (tag.label + ", ")
              }
            })}
            id={tags.length}
            style={{ borderRadius: "1", color: "#121212", fontFamily: "Maven Pro", padding: "4px 7px", backgroundColor: "#FFF"}}
            border= "1px solid #D4D4D4"
          /></div>
        )}
        
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
        {tags.slice(0, 3).map((tag) => {
          return (
            
            
              <Chip
                key={tag.label}
                label={
                  <div className="flex gap-2 items-center">
                    <span>
                      <strong>{stringUtils.toUpperEveryWord(tag.group).replace(/([A-Z])/g, ' $1').trim()}</strong>{" "}
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
        {tags.length > 3 && (
          <div className="flex flex-col justify-center">
          <span data-tooltip-id={tags.length}>+{tags.length - 3}</span>
          <Tooltip
            place = "bottom"
            content = {tags.slice(3).map((tag, i) => {
              if (i === tags.slice(3).length - 1) {
              return (tag.label)
              } else {
              return (tag.label + ", ")
              }
            })}
            id={tags.length}
            style={{ borderRadius: "1", color: "#121212", fontFamily: "Maven Pro", padding: "4px 7px", backgroundColor: "#FFF"}}
            border= "1px solid #D4D4D4"
          /></div>
        )}
    </div>
    
   </div>
   </>
  );
}