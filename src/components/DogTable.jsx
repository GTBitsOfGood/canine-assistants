import React, { useEffect, useState } from "react";
import Table from "./Table";
import useSWR from "swr";
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

const dogFetcher = (...args) => fetch(...args).then((res) => res.json());

/**
 *
 * @param {{[Array]}} dogs The dog data provided to the table
 *
 *
 * @returns { React.ReactElement } The DogTable component
 */
export default function DogTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [data, setData] = useState();

  const [filters, setFilters] = useState({});

  useEffect(() => {
    let search = {};


    if (filters) {
      Object.keys(filters).filter(category => category && Object.values(filters[category]).length > 0).forEach(category => {
        search[category] = Object.values(filters[category])
      })
    }

    search.name = searchFilter;


    // if (filters) {
    //   if (filters.location && Object.keys(filters.location).length > 0) search.location = Object.values(filters.location);
    //   if (filters.searchFilter && searchFilter.length > 0) search.name = searchFilter;
    //   if (filters.medical && Object.keys(filters.medical) > 0) search.medical = Object.values(filters.medical);
    //   if (filters.behavior && Object.keys(filters.behavior) > 0) search.behavior = Object.values(filters.behavior);
    //   if (filters.medical && Object.keys(filters.medical) > 0) search.medical = Object.values(filters.medical);
    // }
    
    console.log({search})

    fetch("/api/dogs/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [searchFilter, filters]);

  if (!data) return <div>loading</div>;

  console.log({data})

  if (!data.data) return <div>loading2</div>;

  const dogs = data.data;

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
        const age = getAge(new Date(rowData.dateOfBirth));

        return (
          <span>
            {age} {age > 1 ? "years" : "year"}
          </span>
        );
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
            {rowData.recentLogs.map((log) =>
              log.tags.map((tag, i) => (
                <Chip
                  link={rowData._id + "/" + log._id}
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
    .map((filterGroup, index) =>
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

  console.log({ filters });


  return (
    <div className="flex-grow flex-col space-y-6">
      <SearchFilterBar filters={filters} setFilters={setFilters} setSearch={setSearchFilter} />

      <SearchTagDisplay
        tags={tags}
        removeTag={removeTag}
        //   [
        //   {
        //     label: (
        //       <span>
        //         <strong>Feeding Change</strong>
        //       </span>
        //     ),
        //     type: ChipTypeStyles.Tag,
        //   },
        //   {
        //     label: (
        //       <span>
        //         <strong>Medical</strong>: High Concern
        //       </span>
        //     ),
        //     type: ChipTypeStyles.HighConcern,
        //   },
        //   {
        //     label: (
        //       <span>
        //         <strong>Medical</strong>: Some Concern
        //       </span>
        //     ),
        //     type: ChipTypeStyles.SomeConcern,
        //   },
        // ]}
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
