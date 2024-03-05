import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import DogSearchFilterBar from "./DogSearchFilterBar";
import {
  Bars3BottomLeftIcon,
  CalendarIcon,
  ClipboardIcon,
  FingerPrintIcon,
  MapPinIcon,
  TagIcon,
} from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "../Chip";
import TagDisplay from "../TagDisplay";
import dateUtils from "@/utils/dateutils";
import stringUtils from "@/utils/stringutils";
import { useRouter } from "next/router";
import LoadingAnimation from "../LoadingAnimation";
import RecentTags from "../RecentTags"
import { Toast } from "../Toast";
import { useSession } from "next-auth/react";
import { Tooltip } from 'react-tooltip'


/**
 * @returns { React.ReactElement } The DogTable component
 */
export default function DogTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [data, setData] = useState();

  const [filters, setFilters] = useState({});

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const [userRole, setUserRole] = useState("");
  const { data: session } = useSession();
  const user = session?.user;

  const fetchUserInfo = async () => {  // to get around finnicky session roles
    try {
      const response = await fetch(`/api/users/${user?._id}`);
      if (response.ok) {
        const resolverData = await response.json();
        setUserRole(resolverData.data.role);
      } else {
        console.error("Failed to fetch resolver information");
      }
    } catch (error) {
      console.error("Error fetching resolver information:", error);
    }
  }

  const sortResolution = (data) => {
    if (!data || !data.data || !Array.isArray(data.data)) {
      return data;
    }
    data.data.sort((a, b) => b.hasUnresolved - a.hasUnresolved);
    return data;
  }

  useEffect(() => {
    fetchUserInfo();
  })

  
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

    fetch("/api/dogs/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .catch(() => {
        setLoading(false);
        Toast({ success: false, message: "Unable to pull dog data." });
        setData([]);
      })
      .then((res) => res.json())
      .then((data) => { setData(data); setLoading(false); } );
  }, [searchFilter, filters]);

  const dogs = data ? (userRole === "Manager" ? sortResolution(data).data : data.data) : [];

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
                  ? <div className="flex items-center">
                      <span data-tooltip-id={rowData._id + "R"} className="mr-2 text-red-600"> ● </span>
                      <Tooltip  
                        place = "bottom"
                        content = {"Unresolved Log"}
                        id={rowData._id + "R"}
                        style={{ borderRadius: "1", color: "#121212", fontFamily: "Maven Pro", padding: "4px 7px", backgroundColor: "#FFF"}}
                        border= "1px solid #D4D4D4"
                      />
                    </div>
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
          <RecentTags data = {rowData} />
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
      {<LoadingAnimation animated={false} loadText={false} />}
      <div className="flex-grow flex-col space-y-6 mb-8">
        <DogSearchFilterBar
          userRole={userRole}
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
