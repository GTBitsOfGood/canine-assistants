import React, { useEffect, useState } from "react";
import Table from "./Table";
import Link from "next/link";
import DogSearchFilterBar from "./DogSearchFilterBar";
import {
  Bars3BottomLeftIcon,
  CalendarIcon,
  ClipboardIcon,
  FingerPrintIcon,
  MapPinIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "./Chip";
import TagDisplay from "./TagDisplay";
import dateUtils from "@/utils/dateutils";
import stringUtils from "@/utils/stringutils";
import { useRouter } from "next/router";
import { Router } from "react-router";
import { da } from "date-fns/locale";
import LoadingAnimation from "./LoadingAnimation";
import toast from "react-hot-toast";

/**
 * @returns { React.ReactElement } The DogTable component
 */
export default function DogTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [data, setData] = useState();

  const [filters, setFilters] = useState({});

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    let search = {};
    if (filters) {
      Object.keys(filters)
        .filter(
          (category) => category && Object.values(filters[category]).length > 0
        )
        .forEach((category) => {
          search[category] = Object.values(filters[category]);
        });
    }

    search.name = searchFilter;

    setLoading(true);

    fetch("/api/dogs/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .catch(() => {
        setLoading(false);
        toast.error("Unable to pull dog data.");
        setData([]);
      })
      .then((res) => { res.json(); setLoading(false); })
      .then((data) => setData(data));
  }, [searchFilter, filters]);

  const dogs = data ? data.data : [];

  /**
   * The specified columns for the DogTable
   */
  const dogTableColumns = [
    {
      id: "name",
      label: "Name",
      icon: <Bars3BottomLeftIcon />,
      customRender: (row, name) => {
        return <span>{name}</span>;
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
            {age} {age !== 1 ? "years" : "year"}
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
          <div className="flex justify-left gap-2">
            {rowData.recentLogs.map((log) =>
              log.tags.map((tag, i) => (
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
            )}
          </div>
        );
      },
    },
  ];

  const tags = Object.keys(filters)
    .map((filterGroup) =>
      Object.keys(filters[filterGroup]).map((element) =>
        filterGroup[element] == null ? (
          <></>
        ) : (
          {
            group: filterGroup,
            label: filters[filterGroup][element],
            index: element,
            type: ChipTypeStyles.Tag,
          }
        )
      )
    )
    .flat(1);

  const removeTag = (group, index) => {
    const newFilters = { ...filters };

    delete newFilters[group][index];
    setFilters(newFilters);
  };
  return (
    <>
      {loading && <LoadingAnimation />}
      <div className="flex-grow flex-col space-y-6 mb-8">
        <DogSearchFilterBar
          filters={filters}
          setFilters={setFilters}
          setSearch={setSearchFilter}
        />

        <TagDisplay tags={tags} removeTag={removeTag} />

        <Table
          loading={loading}
          cols={dogTableColumns}
          rows={dogs}
          filter={searchFilter}
          elementsPerPage={10}
          onRowClick={(row, rowIndex) => {
            router.push(`/dogs/${row["_id"]}`);
          }}
          noElements={
            <div className="flex justify-center bg-white py-16 text-gray-500">
              No dogs were found.
            </div>
          }
        />
      </div>
    </>
  );
}
