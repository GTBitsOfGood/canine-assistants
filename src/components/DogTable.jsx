import React, { useState } from "react";
import Table from "./Table";
import Link from "next/link";

/**
 * The specified columns for the DogTable
 */
const dogTableColumns = [
  { id: "name", label: "Name", customRender: (row, name) => {
    return (<Link href={`/dogs/${row["_id"]}`}>{name}</Link>)
  } },
  { id: "breed", label: "Breed" },
  { id: "dateOfBirth", label: "Date of Birth", type: "date" },
  { id: "location", label: "Location" },
  { id: "medical", label: "Medical Status" },
  { id: "behavior", label: "Behavioral Status" },
  // TODO: Due to requirement of User author, logs have been left out 
  // {
  //   id: "recentLogs",
  //   label: "Recent Log Tags",
  //   style: "flex justify-center",
  //   customRender: (logs) => {
  //     const tags = [].concat(...logs.map((log) => log.tags));

  //     return (
  //       <div className="flex justify-center space-x-3">
  //         {tags.map((tag, i) => (
  //           <div key={i} className="text-xs uppercase text-red-800">
  //             {tag}
  //           </div>
  //         ))}
  //       </div>
  //     );
  //   },
  // },
];

/**
 * 
 * @param {{[Array]}} dogs The dog data provided to the table
 * 
 * 
 * @returns { React.ReactElement } The DogTable component
 */
export default function DogTable({ dogs }) {
  const [searchFilter, setSearchFilter] = useState("");

  /**
   * Adjusts the search filter of the table when the search filter has changed
   * 
   * @param {React.FormEvent<HTMLInputElement>} e The event fired  
   */
  const onInputChange = (e) => {
    setSearchFilter(e.target.value);
  }

  return (
    <div className="flex-grow flex-col">
      <div className="pl-3 flex justify-between">
        <input
          className="rounded-md bg-gray-50 block mb-4 p-2 pl-4 w-1/2 border border-gray-300"
          placeholder="Search dogs by name..."
          onChange={onInputChange}
        />
      </div>

      <Table cols={dogTableColumns} rows={dogs} filter={searchFilter} noElements={<div className=" flex justify-center bg-white py-16 text-gray-500">No dogs were found.</div>}/>
      
    </div>
  );
}
