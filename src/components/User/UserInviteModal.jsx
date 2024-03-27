import React, { useEffect, useRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { consts, userInviteSchema } from "@/utils/consts";
import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";

/**
 * Modal for inviting a user
 * @param {*} userId string id of user inviting
 * @param {*} onClose  
 * @param {*} onSubmit 
 * @returns the modal component
 */
export default function UserInviteModal({ userRole, onClose, onSubmit }) {

  const [saving, setSaving] = useState(false);
  const [label, setLabel] = useState("Select Role");

  const [userRoleArray, setUserRoleArray] = useState(consts.userRoleArray)
  
  const modalRef = useRef(null);

  const [inviteData, setInviteData] = useState({
    email: "",
    roleSet: {},
  });

  const [errors, setErrors] = useState({
    email: false,
    role: false,
  });

  useEffect(() => {
    if (userRole === "Admin") {
      setUserRoleArray(consts.limitedUserRoleArray);
    }
  }, [userRole]);

  useEffect(() => {
    setLabel(Object.values(inviteData.roleSet)[0]);
  }, [inviteData.roleSet])

  useEffect(() => { 
    setLabel("Select Role");
  }, [])

  const handleSubmit = (invData) => {
    const formattedData = {
        name: "Invited User",
        email: invData.email.toLowerCase(),
        role: Object.values(inviteData.roleSet)[0],
        acceptedInvite: false,
        isActive: true,
    }

    const { success, error, data } = userInviteSchema.safeParse(formattedData);

    if (success) {
        setSaving(true);
        
        fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
          })
            .then((res) => {
                setSaving(false);
                const status = res.status;
                if (status === 200) {
                    onSubmit(true);
                    onClose();
                } else if (status === 409) {
                    onSubmit(false, 409);
                } else {
                    onSubmit(false);
                }    
            })
            .catch((err) => {
              setSaving(false);
              onSubmit(false);
            });
    } else {
      const errorsArray = error.format();
      const errorsObject = {};

      for (let err in errorsArray) {
        if (err != "_errors") {
          errorsObject[err] = true;
        }
      }

      setErrors({ ...errors, ...errorsObject });
    }
  }

  return (
    <>
    
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-10">

      <div
        onClick={() => onClose()}
        className="fixed inset-0 bg-modal-background-gray opacity-60"
      ></div>
      <div
        ref={modalRef}
        className="modal-shadow-mobile sm:modal-shadow bg-white sm:bg-secondary-background px-5 sm:px-12 py-4 sm:py-9 w-full sm:w-auto sm:max-h-[75vh] z-10 overflow-auto rounded-t-[50px] sm:rounded-t-none"

      >
        {/* TODO add behavior for dragging downwards to close the modal on mobile */}
        <div className="sm:hidden w-8 h-1 opacity-40 bg-zinc-500 rounded-[100px] mx-auto mb-[12px]" />
        <h1 className="mb-6"> Invite a user</h1>
        <h2 className="h-10 align-middle">
          Email of new user<span className="text-error-red">*</span>
        </h2>
        <div className="mb-6">
          <input
            onChange={(event) => {
              setInviteData({ ...inviteData, email: event.target.value });
              setErrors({ ...errors, title: false });
            }}
            className={`text-input textbox-base ${ errors.email ? "textbox-error" : "textbox-border" } w-full`}
          ></input>
          {errors.email ? (
            <div className="flex items-center gap-[5px] text-black text-lg font-normal">
              <div className="h-4 w-4 fill-slate-900">
                <ExclamationCircleIcon />
              </div>
              Please enter a valid email
            </div>
          ) : null}
        </div>

        <h2 className="h-10 align-middle">
          Access Level<span className="text-error-red">*</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-[3vw]">
          <div
            className={`flex ${
              errors.role ? "flex-col" : "flex-row"
            } sm:flex-col justify-between sm:justify-normal`}
          >
            <DropdownMenu
              label={label}
              props={{
                hideFilterButton: false,
                filterText: "Apply Role",
                singleSelect: true,
                requiredField: false,
                error: errors.role,
              }}
              submitFilters={(data) => {
                if (data !== undefined) {
                  setInviteData({ ...inviteData, roleSet: data });
                  setErrors({ ...errors, role: false });
                }
              }}
              selectedOptions={inviteData.roleSet}
              onFilterSelect={(data) => {
                if (data !== undefined) {
                  setInviteData({ ...inviteData, roleSet: data });
                  setErrors({ ...errors, role: false });
                }
              }}
            >
              {userRoleArray.map((role, index) => (
                <DropdownMenuOption
                  key={index}
                  label={role}
                  name={role.replaceAll(" ", "").toLowerCase()}
                />
              ))}
            </DropdownMenu>
            {errors.role ? (
              <div className="flex items-center gap-[5px] text-black text-lg font-normal">
                <div className="h-4 w-4 fill-slate-900">
                  <ExclamationCircleIcon />
                </div>
                Please select a role
              </div>
            ) : null}
          </div>

        

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-[2vw] mt-32">
            <button
              type="button"
              onClick={onClose}
              className="button-base secondary-button flex w-full sm:w-32 h-10"
            >
            <div className="secondary-button-text" >
              Cancel
              </div>
          </button>
          <button
            onClick={() => handleSubmit(inviteData)}
            disabled={saving}
            className={`flex w-full sm:w-32 h-10 button-base ${
              saving
                ? " disabled-button"
                : " primary-button"
            }`}
          >
            <div
              className={`${ saving ? "disabled-button-text" : "primary-button-text" }`}
            >
              Invite
            </div>
          </button>
        </div>
      </div>
    </div>
    </div>

    </>
  ); 
}
