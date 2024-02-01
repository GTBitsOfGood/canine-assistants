import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import UserSearchBar from "./UserSearchBar";
import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";
import {
  Bars3BottomLeftIcon,
  IdentificationIcon,
  AtSymbolIcon,
  ClipboardIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import LoadingAnimation from "../LoadingAnimation";
import toast from "react-hot-toast";
import { consts } from "@/utils/consts";

/**
 * @returns { React.ReactElement } The UserTable component
 */
export default function UserTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    fetch("/api/users")
    .catch(() => {
      setLoading(false);
      toast.error("Unable to pull user data.");
      setData([]);
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
        setLoading(false);
      });
    
  }, []);

  useEffect(() => {
    const filtered = Array.isArray(data)
      ? data.filter(user =>
          user.name.toUpperCase().includes(searchFilter.toUpperCase())
        )
      : [];
    setFilteredData(filtered);
  }, [searchFilter, data]);

  const users = data ? data.data : [];
  console.log(users)
  /**
   * The specified columns for the UserTable
   */

  const userTableColumns = [
    {
      id: "name",
      label: "Name",
      icon: <Bars3BottomLeftIcon />,
      customRender: (row, name) => {
        return <span>{name}</span>;
      },
    },
    {
      id: "email",
      label: "Email",
      icon: <AtSymbolIcon />,
      customRender: (row, name) => {
        return <span>{name}</span>;
      },
    },
    {
      id: "accessLevel",
      label: "Access Level",
      icon: <IdentificationIcon />,
      customRender: (rowData) => {
        return (
          <DropdownMenu
            label={rowData.role}
            singleSelect={true}
            props={{
              singleSelect: true
            }}
          >
            {consts.userRoleArray.map((concern, index) => (
              <DropdownMenuOption
                key={index}
                label={concern}
                name={concern.replaceAll(" ", "").toLowerCase()}
              />
            ))}
          </DropdownMenu>
        );
      },
    },
    {
      id: "status",
      label: "Status",
      icon: <ClipboardIcon />,
      customRender: (row, name) => <span>{name}</span>,
    },

    
  ];
  
  return(
    <>
      <LoadingAnimation animated={!loading} loadText={loading} />
      <div className="flex-grow flex-col space-y-6 mb-8">
        <UserSearchBar setSearch={setSearchFilter} />

        <Table
          loading={loading}
          cols={userTableColumns}
          rows={users}
          filter={searchFilter}
          elementsPerPage={10}
          onRowClick={(row, rowIndex) => {
           // router.push(`/users/${row["_id"]}`);
          }}
          noElements={
            <div className="flex justify-center bg-white py-16 text-gray-500">
              No users were found.
            </div>
          }
        />
      </div>
    </>
  );
}