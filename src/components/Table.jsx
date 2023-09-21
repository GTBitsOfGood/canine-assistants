import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React from "react";

/**
 * The main header for the table
 *
 * @param {{children: ReactNode}}
 * @returns {React.ReactElement} The TableHeader component
 */
function TableHeader({ children }) {
  return (
    <tr className="border-b border-gray-300 text-gray-400 text-xs text-left">
      {children}
    </tr>
  );
}

/**
 * The format for a column element within a row
 *
 * @param {{ col: string, style: string }}
 * @returns {React.ReactElement} The TableColumn component
 */
function TableColumn({ icon, col, style }) {
  return (
    <th id={col.id} className={`${style} text-primary-text font-semibold py-3 px-5 gap-2`}>
      <div className="items-center inline-flex gap-3 justify-start p-1">
        <div className="h-4 w-4 relative">
          {icon}
        </div>
        <span className="text-lg">{col.label}</span>
      </div>
    </th>
  );
}

// The alternating row styles
const ALTERNATING_ROW_COLOR_1 = "bg-white";
const ALTERNATING_ROW_COLOR_2 = "bg-neutral-50";

/**
 * Constructs a modular Table taking care of the boilerplate code
 *
 * @param {{ cols: [Array], rows: [Array], filter: string, noElements: React.ReactElement }}
 * @returns {React.ReactElement} The Table component
 */
export default function Table({ cols, rows, filter, noElements }) {
  const ids = cols.map((col) => col.id);

  /**
   * Formats each value in the table depending on settings provided
   *
   * @param {[Array]} row The row the column value sits on
   * @param {string} value The raw value passed to the column
   * @param {string} type The type
   * @param {(value: any) => any} [customRender] If applicable, a custom rendering method taking in the value
   * @returns {string} The output value to render
   */
  const formatColumnValue = (row, value, type, customRender) => {
    // Render dates with format mm/dd/yy
    if (type === "date") {
      return new Date(value).toLocaleDateString("en-US");
    }

    // Custom rendering support
    if (customRender) {
      return customRender(row, value);
    }

    return value;
  };

  return (
    <div className="shadow-xl rounded-sm text-md w-full text-left relative overflow-hidden">
      <table className="divide-y divide-gray-300 text-md w-full text-left relative overflow-hidden">
        <thead className="bg-foreground">
          <TableHeader>
            {cols.map((col) => (
              <TableColumn key={col.id} icon={col.icon} col={col} style={col.style} />
            ))}
          </TableHeader>
        </thead>
        <tbody>
          {rows
            .filter((row) =>
              row.name.toUpperCase().includes(filter.toUpperCase())
            )
            .map((row, i) => {
              return (
                <tr
                  key={i}
                  className={`text-gray-600 border-b ${
                    i % 2 === 0
                      ? ALTERNATING_ROW_COLOR_1
                      : ALTERNATING_ROW_COLOR_2
                  }`}
                >
                  {cols.map((col, i) => {
                    return (
                      <td key={i}>
                        <div className="py-3 px-6">
                          {formatColumnValue(
                            row,
                            row[col.id],
                            col.type,
                            col.customRender
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      {rows.length == 0 && noElements}
    </div>
  );
}
