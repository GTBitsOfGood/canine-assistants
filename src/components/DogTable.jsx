import React, { useState } from "react";
import Table from "./Table";
import Link from "next/link";
import SearchFilterBar from "./SearchFilterBar";
import {
  Bars3BottomLeftIcon,
  CalendarIcon,
  ClipboardIcon,
  FingerPrintIcon,
  MapPinIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import Chip from "./Chip";

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
  };

  /**
   * The specified columns for the DogTable
   */
  const dogTableColumns = [
    {
      id: "name",
      label: "Name",
      icon: <Bars3BottomLeftIcon />,
      customRender: (row, name) => {
        return <Link href={`/dogs/${row["_id"]}`}>{name}</Link>;
      },
    },
    { id: "breed", label: "Breed", icon: <FingerPrintIcon /> },
    { id: "dateOfBirth", label: "Age", type: "date", icon: <CalendarIcon /> },
    { id: "location", label: "Location", icon: <MapPinIcon /> },
    { id: "medical", label: "Medical Status", icon: <ClipboardIcon /> },
    { id: "behavior", label: "Behavioral Status", icon: <ClipboardIcon /> },
    { id: "other", label: "Other Status", icon: <ClipboardIcon /> },
    { id: "other", label: "Recent Log Tags", icon: <TagIcon /> },
    {
      id: "recentLogs",
      label: "Recent Log Tags",
      style: "flex justify-center",
      customRender: (rowData) => {
        const tags = [].concat(...rowData.recentLogs.map((log) => log.tags));

        return (
          <div className="flex justify-center space-x-3">
            {tags.map((tag, i) => (
              <Chip key={i} label={tag} type={"Tag"} />

              // <div key={i} className="text-xs uppercase text-red-800">
              //   {tag}
              // </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-grow flex-col">
      <SearchFilterBar />

      <Table
        cols={dogTableColumns}
        rows={dogs}
        filter={searchFilter}
        noElements={
          <div className=" flex justify-center bg-white py-16 text-gray-500">
            No dogs were found.
          </div>
        }
      />
    </div>
  );
}
