import { useEffect, useState } from "react";
import TablePaginator from "./TablePagination";

/**
 * The main header for the table
 *
 * @param {{children: ReactNode}}
 * @returns {React.ReactElement} The TableHeader component
 */
function TableHeader({ children }) {
  return (
    <tr className="border-b border-gray-300 text-gray-400 text-sm text-left">
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
function TableColumn({ icon, subLabel, col, style }) {
  return (
    <th
      id={col.id}
      className={`${style} text-primary-text font-semibold py-3 px-5 gap-2`}
    >
      <div className="items-center inline-flex gap-3 justify-start p-1">
        <div className="h-4 w-4 relative">{icon}</div>
        <div className="flex-col items-center">
          {subLabel && (
            <div className="font-normal text-[.625rem] -mb-2">{subLabel}</div>
          )}
          <span className="text-sm">{col.label}</span>
        </div>
      </div>
    </th>
  );
}

function TableFooter({ elementsOnPage, rows, paginationFunctions }) {
  return (
    <div className="flex bg-white justify-between items-center px-6 py-4">
      <div className="text-sm font-medium">
        Showing {elementsOnPage} of {rows?.length ?? 0} Results
      </div>
      <div>
        <TablePaginator paginationFunctions={paginationFunctions} />
      </div>
    </div>
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
export default function Table({
  elementsPerPage,
  loading,
  cols,
  rows,
  filter,
  noElements,
  onRowClick,
}) {
  // CLamped between [1, maxPages]
  const [currentPage, setCurrentPage] = useState(0);
  const [currentElements, setCurrentElements] = useState([]);

  const pageAmount = Math.ceil(rows?.length / elementsPerPage);

  const incrementPage = () => {
    setCurrentPage(Math.min(pageAmount - 1, currentPage + 1));
  };

  const decrementPage = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };

  const gotoLastPage = () => {
    setCurrentPage(pageAmount - 1);
  };

  const gotoFirstPage = () => {
    setCurrentPage(0);
  };

  useEffect(() => {
    setCurrentPage(Math.max(Math.min(currentPage, pageAmount - 1), 0));
  }, [cols, currentPage, pageAmount]);

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

  const elementsToShow = rows
    ?.filter((row) => row.name.toUpperCase().includes(filter.toUpperCase()))
    ?.slice(
      currentPage * elementsPerPage,
      currentPage * elementsPerPage + elementsPerPage
    );

  return (
    <div className="shadow-xl rounded-lg text-md w-full text-left relative overflow-hidden">
      <table className="divide-y divide-gray-300 text-md w-full text-left relative overflow-hidden">
        <thead className="bg-foreground">
          <TableHeader>
            {cols.map((col) => (
              <TableColumn
                key={col.id}
                subLabel={col.subLabel}
                icon={col.icon}
                col={col}
                style={col.style}
              />
            ))}
          </TableHeader>
        </thead>
        <tbody>
          {loading
            ? Array(elementsPerPage)
                .fill(null)
                .map((x, i) => (
                  <tr key={i} className={`border-b ${i % 2 === 0 ? ALTERNATING_ROW_COLOR_1 : ALTERNATING_ROW_COLOR_2}`}>
                    {cols.map((col, i) => (
                      <td key={i}>
                        <div className="py-3 px-6 flex space-x-4 text-sm animate-pulse">
                          <div className="flex-1 py-1 space-y-6">
                            <div className="space-y-3">
                              <div className="grid grid-cols-1 gap-4">
                                <div className="rounded-full bg-slate-200 h-4 col-span-1"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))
            : elementsToShow.map((row, i) => {
                return (
                  <tr
                    key={i}
                    onClick={() => onRowClick(row, i * (currentPage + 1))}
                    className={`${
                      onRowClick ? "cursor-pointer hover:bg-gray-100" : ""
                    } text-gray-600 border-b ${
                      i % 2 === 0
                        ? ALTERNATING_ROW_COLOR_1
                        : ALTERNATING_ROW_COLOR_2
                    }`}
                  >
                    {cols.map((col, i) => {
                      return (
                        <td key={i}>
                          <div className="py-3 px-6 text-sm">
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
        <tfoot></tfoot>
      </table>
      <TableFooter
        elementsOnPage={elementsToShow ? elementsToShow.length : 0}
        rows={rows}
        paginationFunctions={{
          currentPage: currentPage,
          setPage: setCurrentPage,
          incrementPage: incrementPage,
          decrementPage: decrementPage,
          gotoLastPage: gotoLastPage,
          gotoFirstPage: gotoFirstPage,
        }}
      />

      {rows?.length == 0 && !loading && noElements}
    </div>
  );
}
