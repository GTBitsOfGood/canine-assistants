import { Chip, ChipTypeStyles } from "./Chip"
import { Tooltip } from 'react-tooltip'
import stringUtils from "@/utils/stringutils";

export default function RecentTags({ data, tags }) {
    const rowData = data ? data : null;
    let recentLogs = [];

    if (data) {
      const reversed = [...rowData.recentLogs].reverse()
      reversed.forEach((log) => {
          recentLogs = Array.from(new Set([...recentLogs, ...log.tags]))
      })
    }

    return (
        <div className="flex justify-left gap-2 items-center">
          { tags ? (
            <>
            {tags.map((tag, i) => i < 5 && (
              <Chip
                key={tag.label}
                label={
                  <div className="flex gap-2 items-center">
                    <span>
                      <strong>{stringUtils.toUpperEveryWord(tag.group)}</strong>{" "}
                      {tag.label}
                    </span>
                  </div>
                }
                type={
                  tag.group === "topic"
                    ? ChipTypeStyles.Topic
                    : ChipTypeStyles[tag.label.replace(/[0-9]/g, "")] ||
                      ChipTypeStyles.Tag
                }
              />
            ))}
            {tags.length > 5 ?
              <div className="flex items-center">
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
                />
              </div>
              : null
            }
            </>
          ) : (
            <>
            {recentLogs.map((tag, i) => i < 3 && (
              <Chip
                link={
                  "dogs/" +
                  rowData._id +
                  "?showLogTab=true&filteredTag=" +
                  tag
                }
                key={i}
                label={tag}
                type={ChipTypeStyles.Tag}
              />
            ))}
            {recentLogs.length > 3 ?
              <div className="flex items-center">
                <span data-tooltip-id={rowData._id}>+{recentLogs.length - 3}</span>
                <Tooltip 
                  place = "bottom"
                  content = {recentLogs.slice(3).map((tag, i) => {
                    if (i === recentLogs.slice(3).length - 1) {
                    return (tag)
                    } else {
                    return (tag + ", ")
                    }
                  })}
                  id={rowData._id}
                  style={{ borderRadius: "1", color: "#121212", fontFamily: "Maven Pro", padding: "4px 7px", backgroundColor: "#FFF"}}
                  border= "1px solid #D4D4D4"
                />
              </div>
              : null
            }
            </>
          )}
        </div>
    )
}
