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
import ToggleSwitch from "./ToggleSwitch"
import ConfirmationModal from './ConfirmationModal';

/**
 * @returns { React.ReactElement } The UserTable component
 */

export default function UserTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  const router = useRouter();  // Router to direct to user/[id] when specified user is pressed on

  useEffect(() => {  // Pull all user data
    fetch("/api/users")
    .catch(() => {
      setLoading(false);
      toast.error("Unable to pull user data.");
      setData([]);
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data?.data);
        setLoading(false);
      });
    
  }, []);

  useEffect(() => {  // Searching functionality
    const filtered = Array.isArray(users)
      ? users.filter(user =>
          user.name.toUpperCase().includes(searchFilter.toUpperCase())
        )
      : [];
    setFilteredData(filtered);
  }, [searchFilter, users]);

  const handleToggle = (userId, currentStatus) => {  // Active/Inactive toggle handling, opens confirmation modal
    if (currentStatus === "Active") {
      setUserToDeactivate(userId);
      setIsModalOpen(true);
    } else {
      updateUserStatus(userId, "Active");
    }
  };

  const updateUserStatus = async (userId, status) => {  // PATCH sent when active/inactive toggle pressed
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: status }),
      });
      if (!response.ok) throw new Error("Failed to update the user role");
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, role: status } : user
      );
      setUsers(updatedUsers);
      toast.success(`User ${status === "Active" ? "reactivated" : "deactivated"} successfully`);
    } catch (error) {
      console.error(error);
      toast.error(`Error updating user role: ${error.message}`);
    } finally {
      setIsModalOpen(false);
      setUserToDeactivate(null);
    }
  };

  const applyRole = async (role) => {  // PATCH sent when role is changed through dropdown menu
    if (role[0] !== "Admin" && role[1] !== "User") {
      toast.error("Invalid user ID or role");
      return;
    }
    const roleValue = role[0] == "Admin" ? role[0] : role[1];
    try {
      const response = await fetch(`/api/users/${selectedUser}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({role : roleValue}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the user role");
      }
      
      toast.success('User role updated successfully');
    } catch (error) {
      console.error(error);
      toast.error(`Error updating user role: ${error.message}`);
    }
  };

  /**
   * The specified columns for the UserTable
   */

  const userTableColumns = [
    {
      id: "name",
      label: "Name",
      icon: <Bars3BottomLeftIcon />,
      customRender: (rowData) => {
        return <span className="mx-3">{rowData.name}</span>;
      },
    },
    {
      id: "email",
      label: "Email",
      icon: <AtSymbolIcon />,
      customRender: (rowData) => {
        return <span>{rowData.email}</span>;
      },
    },
    {
      id: "accessLevel",
      label: "Access Level",
      icon: <IdentificationIcon />,
      customRender: (rowData) => {
        return (
          <DropdownMenu
            submitFilters={(selectedRole) => {
              applyRole(selectedRole)
              rowData.role=selectedRole[0] == "Admin" ? "Admin" : "User"
              window.location.reload();  // temporary fix: reload page whenever a role is assigned, to update role in UI
            }}
            label={rowData.role}
            props={{
              singleSelect: true,
              filterText: "Apply Role"
            }}
          >
            {consts.userAccessArray.map((roles, index) => (
              <DropdownMenuOption
                key={index}
                label={roles}
                name={roles}
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
      customRender: (rowData) => {
        return (
          <>
            <ToggleSwitch isActive={rowData.role !== "Inactive"} onToggle={() => handleToggle(rowData._id, rowData.role !== "Inactive" ? "Active" : "Inactive")} />
            <div className="mx-3">
              {rowData.role === "Inactive" ? "Inactive" : "Active"}
            </div>
          </>
        );
      },
    },
  ];
  
  return(
    <>
      <LoadingAnimation animated={!loading} loadText={loading} />
      <div className="flex-grow flex-col space-y-6 mb-8">
        <UserSearchBar setSearch={setSearchFilter} />

        <Table  // Data comes in as "users" state
          loading={loading}
          cols={userTableColumns}
          rows={users}
          filter={searchFilter}
          elementsPerPage={10}
          onRowClick={(row, rowIndex) => {
            setSelectedUser(row["_id"])
            //supposed to direct to users/[id] as well, but buggy with accessing dropdown or toggle features
          }}
          noElements={
            <div className="flex justify-center bg-white py-16 text-gray-500">
              No users were found.
            </div>
          }
        />
      </div>
      <ConfirmationModal  // Prompted when user intends to deactivate a row
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => updateUserStatus(userToDeactivate, "Inactive")}
        userName={selectedName}
        message={"Select “Confirm” to deactivate Akash and remove all access to the Canine Assistants platform. This action can only be undone by an administrator."} // change this later to specify which user
      />
    </>
  );
}