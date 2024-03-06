import { Tooltip } from "react-tooltip";
export default function UnresolvedDot({ tooltip = true, placement = "bottom", rowId = null }) {
  return (
    <div className="flex items-center">
          <span data-tooltip-id={rowId + "R"} className="mr-2 text-red-600"> ● </span>
          {tooltip &&
              <Tooltip
                  place={placement}
                  content={"Unresolved Log"}
                  id={rowId + "R"}
                  style={{ borderRadius: "1", color: "#121212", fontFamily: "Maven Pro", padding: "4px 7px", backgroundColor: "#FFF" }}
                  border="1px solid #D4D4D4"
              />}
    </div>
  );
}