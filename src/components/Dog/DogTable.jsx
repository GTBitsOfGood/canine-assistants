import React from "react";
import Table from "../Table/Table";
import {
  Bars3BottomLeftIcon,
  CalendarIcon,
  ClipboardIcon,
  FingerPrintIcon,
  MapPinIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "../Chip";
import dateUtils from "@/utils/dateutils";
import stringUtils from "@/utils/stringutils";
import { useRouter } from "next/router";
import RecentTags from "../RecentTags"
import UnresolvedDot from "../Log/UnresolvedDot";

/**
 * @returns { React.ReactElement } The DogTable component
 */
export default function DogTable({ loading, dogs, userRole }) {
  const router = useRouter();

  /**
   * The specified columns for the DogTable
   */
  const dogTableColumns = [
    {
      id: "name",
      label: "Name",
      icon: <Bars3BottomLeftIcon />,
      customRender: (rowData) => {
        return <span className="flex flex-row"> 
          {rowData.hasUnresolved > 0 && userRole === "Manager"
            ? <UnresolvedDot rowId={rowData._id} />
            : <div className="mx-2"> </div>}
          {rowData.name}
        </span>;
      },
    },
    { id: "breed", label: "Breed", icon: <FingerPrintIcon /> },
    {
      id: "dateOfBirth",
      label: "Age",
      icon: <CalendarIcon />,
      customRender: (rowData) => {
        const age = dateUtils.getAge(new Date(rowData.dateOfBirth));

        return (
          <span>
            {age}
          </span>
        );
      },
    },
    {
      id: "location",
      label: "Location",
      icon: <MapPinIcon />,
      customRender: (rowData) => {
        return <span>{rowData.location}</span>;
      },
    },
    {
      id: "medical",
      label: "Medical",
      subLabel: "Concern",
      icon: <ClipboardIcon />,
      customRender: (rowData) => {
        return (
          <Chip
            label={rowData.medical}
            type={ChipTypeStyles[stringUtils.toUpperEveryWord(rowData.medical)]}
          />
        );
      },
    },
    {
      id: "behavior",
      label: "Behavioral",
      subLabel: "Concern",
      icon: <ClipboardIcon />,
      customRender: (rowData) => {
        return (
          <Chip
            label={rowData.behavior}
            type={
              ChipTypeStyles[stringUtils.toUpperEveryWord(rowData.behavior)]
            }
          />
        );
      },
    },
    {
      id: "other",
      label: "Other",
      subLabel: "Concern",
      icon: <ClipboardIcon />,
      customRender: (rowData) => {
        return (
          <Chip
            label={rowData.other}
            styles={"justify-center"}
            type={ChipTypeStyles[stringUtils.toUpperEveryWord(rowData.other)]}
          />
        );
      },
    },
    {
      id: "recentLogs",
      label: "Recent Log Tags",
      style: "",
      icon: <TagIcon />,
      customRender: (rowData) => {
        return (
          <RecentTags data = {rowData} />
        );
      },
    },
  ];

  if (dogs.length == 0) {
    return (
      <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginTop: '40px' }}>
        No dogs were found
      </div>
    );
  }

  return (
    <Table
      loading={loading}
      cols={dogTableColumns}
      rows={dogs}
      filter={""}
      onRowClick={(row, rowIndex) => {
        router.push(`/dogs/${row["_id"]}`);
      }}
      noElements={
        <div className="flex justify-center bg-white py-16 text-gray-500">
          No dogs were found.
        </div>
      }
    />
  );
}