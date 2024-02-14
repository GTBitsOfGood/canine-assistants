import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import UserSearchBar from "./UserSearchBar";
import UserInviteModal from "./UserInviteModal";
import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";
import {
  Bars3BottomLeftIcon,
  IdentificationIcon,
  AtSymbolIcon,
  ClipboardIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import LoadingAnimation from "../LoadingAnimation";
import toast from "react-hot-toast";
import { consts } from "@/utils/consts";
import ToggleSwitch from "./ToggleSwitch"
import ConfirmCancelModal from "../ConfirmCancelModal";
import { set } from "mongoose";

/**
 * @returns { React.ReactElement } The UserTable component
 */

export default function UserTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [userToDeactivate, setUserToDeactivate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showChange, setShowChange] = useState(false);

  useEffect(() => {  // Pull all user data
    setShowChange(false)
    fetch("/api/users")
    .catch(() => {
      setLoading(false);
      toast.error("Unable to pull user data.");
      setData([]);
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data?.data.sort((a, b) => {
          
          const getPriority = (entry) => {
              if (entry.acceptedInvite && entry.isActive) return 1;
              if (!entry.acceptedInvite) return 2;
              if (entry.acceptedInvite && !entry.isActive) return 3;
              return 4; // Fallback
          };
      
          const priorityA = getPriority(a);
          const priorityB = getPriority(b);
      
          return priorityA - priorityB;
      });
      
  
        setUsers(sortedData);
        setLoading(false);
      });
    
  }, [showChange]);

  const handleToggle = (userId, currentStatus) => {  // Active/Inactive toggle handling, opens confirmation modal
    if (currentStatus === "Active") {
      setUserToDeactivate(userId);
      setShowModal(!showModal)
    } else {
      updateUserStatus(userId, true);
    }
  };

  const updateUserStatus = async (userId, status) => {  // PATCH sent when active/inactive toggle pressed
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: status }),
      });
      if (!response.ok) throw new Error("Failed to update the user role");
      const updatedUsers = users.map(user => 
        user._id === userId ? { ...user, isActive: status } : user
      );
      setUsers(updatedUsers);
    } catch (error) {
      toast.error(`Error updating user role: ${error.message}`);
    } finally {
      setShowModal(false)
      setUserToDeactivate(null);
    }
  };

  const applyRole = async (role) => {  // PATCH sent when role is changed through dropdown menu
    console.log(role, consts.userAccess)
    if (!consts.userAccess.hasOwnProperty(Object.values(role)[0])) {
      toast.error("Invalid user ID or role");
      return;
    }
    const roleValue = Object.values(role)[0]
    try {
      const response = await fetch(`/api/users/${selectedUserId}`, {
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
        return(
          <div className="w-32 break-words">
            <span>{rowData.name}</span>
          </div>
        );
      },
    },
    {
      id: "email",
      label: "Email",
      icon: <AtSymbolIcon />,
      customRender: (rowData) => {
        return(
          <div className="w-32 break-words">
            {rowData.email}
          </div>
        );
      },
    },
    {
      id: "accessLevel",
      label: "Access Level",
      icon: <IdentificationIcon />,
      customRender: (rowData) => {
        return (
          <div className="">
            <DropdownMenu
              submitFilters={(selectedRole) => {
                applyRole(selectedRole)
                rowData.role=consts.userAccess[selectedRole[0]]
                setShowChange(true)
              }}
              label={rowData.role}
              props={{
                singleSelect: true,
                filterText: "Apply Role"
              }}
            >
              {Object.values(consts.userAccess).map((role, index) => (
                <DropdownMenuOption
                  key={index}
                  label={role}
                  name={role}
                />
              ))}
            </DropdownMenu>
          </div>
            
        );
      },
    },
   {
      id: "status",
      label: "Status",
      icon: <ClipboardIcon />,
      customRender: (rowData) => {
        return rowData.acceptedInvite ? (
          <>
            <ToggleSwitch isActive={rowData.isActive} onToggle={() => handleToggle(rowData._id, rowData.isActive ? "Active" : "Inactive")} />
            <div className="mx-3">
              {rowData.isActive ? "Active" : "Inactive"}
            </div>
          </>
        ) : (
          <>
            <div className="w-32 break-words">
            Invite Pending
          </div>
          </>
        );
      },
      
    },
  ];
  
  return(
    <>
      {showInviteModal ? (
        <>
          <UserInviteModal
          onClose={() => {
            setShowInviteModal(false);
          }}
          onSubmit={(success, statusCode) => {
            if (success) {
              setShowChange(true)
              toast.custom((t) => (
                <div
                  className={`h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-ca-green text-white text-lg font-normal
                  ${t.visible ? "animate-enter" : "animate-leave"}`}
                >
                  <span>User was successfully invited.</span>
                </div>
              ));
            } else {
              if (statusCode === 409) {
                toast.custom(() => (
                    <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
                        A user with that email already exists.
                    </div>
                ));
            } else {
              toast.custom(() => (
                <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
                  There was a problem inviting the user, please try again.
                </div>
              ));
            }
            }
          }}
          />
        </>
      ) : null}

      <LoadingAnimation animated={false} loadText={false} />
      <div className="flex-grow flex-col space-y-6 mb-8">
      <div className="space-x-10 md:space-x-20 flex flex-row items-center">
            <div className="flex-grow" style={{ flexBasis: '70%' }}>
                <UserSearchBar setSearch={setSearchFilter} />
            </div>
            <div className="flex-grow" style={{ flexBasis: '20%' }}>
                <button
                    className="flex w-full px-4 py-1.5 height: 'fit-content justify-center items-center button-base primary-button flex gap-2"
                    onClick={() => setShowInviteModal(true)}
                >
                    <div className="primary-button-plus-icon">{<PlusIcon />}</div>
                    <div className="primary-button-text">Invite a User</div>
                </button>
            </div>
        </div>


        

        <Table  // Data comes in as "users" state
          loading={loading}
          cols={userTableColumns}
          rows={users}
          filter={searchFilter}
          elementsPerPage={10}
          onRowClick={(row, rowIndex) => {
            setSelectedUserId(row["_id"])
            setSelectedUserName(row["name"])
          }}
          noElements={
            <div className="flex justify-center bg-white py-16 text-gray-500">
              No users were found.
            </div>
          }
        />
      </div>
      {showModal
        ? ConfirmCancelModal(  // Prompted when user intends to deactivate a row
          `Deactivate ${selectedUserName}?`,
          `Select “Confirm” to deactivate ${selectedUserName} and remove all access to the Canine Assistants platform. This action can only be undone by an administrator.`,
          () => updateUserStatus(userToDeactivate, false),
          setShowModal,
          showModal
        )
      : ``}
    </>
  );
}