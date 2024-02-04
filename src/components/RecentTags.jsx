import { Chip, ChipTypeStyles } from "./Chip"
import { Tooltip } from 'react-tooltip'

export default function RecentTags( data ) {
    const rowData = data.data
    let recentLogs = []
    const reversed = [...rowData.recentLogs].reverse()
    reversed.forEach((log) => {
        recentLogs = Array.from(new Set([...recentLogs, ...log.tags]))
    })

    return (
        <div className="flex justify-left gap-2">
            { recentLogs.map((tag, i) => i < 3 && (
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
              ))
            }
            { recentLogs.length > 3 ? 
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
               : 
              <></>
            }
        </div>
    )
}
