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
import { Chip, ChipTypeStyles } from "./Chip";
import SearchTagDisplay from "./SearchTagDisplay";

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

  // TEMPORAY until enum situation is figured out
  const chipTypeMapping = {
    ["No concern"]: ChipTypeStyles.NoConcern,
    ["Some concern"]: ChipTypeStyles.SomeConcern,
    ["High concern"]: ChipTypeStyles.HighConcern,
  };

  const getAge = (date) => {
    return new Date(Date.now() - date).getFullYear() - 1970;
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
    {
      id: "dateOfBirth",
      label: "Age",
      icon: <CalendarIcon />,
      customRender: (rowData) => {
        return <span>{getAge(new Date(rowData.dateOfBirth))} years</span>;
      },
    },
    {
      id: "location",
      label: "Location",
      icon: <MapPinIcon />,
      customRender: (rowData) => {
        return <Chip label={rowData.location} type={ChipTypeStyles.Facility} />;
      },
    },
    {
      id: "medical",
      label: "Medical Status",
      icon: <ClipboardIcon />,
      customRender: (rowData) => {
        return (
          <Chip
            label={rowData.medical}
            type={chipTypeMapping[rowData.medical]}
          />
        );
      },
    },
    {
      id: "behavior",
      label: "Behavioral Status",
      icon: <ClipboardIcon />,
      customRender: (rowData) => {
        return (
          <Chip
            label={rowData.behavior}
            type={chipTypeMapping[rowData.behavior]}
          />
        );
      },
    },
    {
      id: "other",
      label: "Other Status",
      icon: <ClipboardIcon />,
      customRender: (rowData) => {
        return (
          <Chip label={rowData.other} type={chipTypeMapping[rowData.other]} />
        );
      },
    },
    {
      id: "recentLogs",
      label: "Recent Log Tags",
      style: "flex justify-center",
      icon: <TagIcon />,
      customRender: (rowData) => {

        return (
          <div className="flex justify-left gap-2">
            {rowData.recentLogs.map((log) => (
              log.tags.map((tag, i) => (
                <Chip link={rowData._id + "/" + log._id} key={i} label={tag} type={ChipTypeStyles.Tag}/>
              ))
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex-grow flex-col space-y-6">
      <SearchFilterBar />

      <SearchTagDisplay
        tags={[
          {
            label: (
              <span>
                <strong>Feeding Change</strong>
              </span>
            ),
            type: ChipTypeStyles.Tag,
          },
          {
            label: (
              <span>
                <strong>Medical</strong>: High Concern
              </span>
            ),
            type: ChipTypeStyles.HighConcern,
          },
          {
            label: (
              <span>
                <strong>Medical</strong>: Some Concern
              </span>
            ),
            type: ChipTypeStyles.SomeConcern,
          },
        ]}
      />

      <Table
        cols={dogTableColumns}
        rows={dogs}
        filter={searchFilter}
        elementsPerPage={6}
        noElements={
          <div className=" flex justify-center bg-white py-16 text-gray-500">
            No dogs were found.
          </div>
        }
      />
    </div>
  );
}
