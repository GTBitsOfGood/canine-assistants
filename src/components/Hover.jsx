import React, { useState } from "react";

/**
 * Boilerplate component for all cards
 *
 * @param {{data: Array}} param0
 * @returns
 */
export default function Hover({ data }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="flex items-center" style={{position: "relative"}} onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
            <span>+{data.length}</span>
            {isHovered ? 
                <div style={{position: "absolute", display: "flex", flexGrow: "1", justify_content: "center", align_items: "center", border: "solid 1px #D4D4D4", opacity: "1", backgroundColor: "#FFF", border_radius: "1px", padding: "4px 7px", top: "100%", left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap"}}>
                    {data.map((tag, i) => {
                        if (i === data.length - 1) {
                        return (tag)
                        } else {
                        return (tag + ", ")
                        }
                    })}
                </div> : <></>
            }
      </div>
    );
  }