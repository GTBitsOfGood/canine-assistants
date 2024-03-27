import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";

import dateutils from "@/utils/dateutils";

import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";
import FormField from "../Form/FormField";
import Log from "../Log/Log";
import LogSearchFilterBar from "../Log/LogSearchFilterBar";
import TabSection from "../Tab/TabSection";
import TagDisplay from "../TagDisplay";
import { useSession } from "next-auth/react";

/**
 * Displays information within each tab on the Individual Dog page including Logs and Forms
 * @param {*}
 */
export default function TabContainer({
  logRef,
  showInfoTab,
  setShowLogModal,
  showLogModal,
  showFormTab,
  showFormDropdown,
  setShowFormDropdown,
  forms,
  formTitleMap,
  role,
  dog,
  logs,
  dogInformationSchema,
  showLogTab,
  appliedFilters,
  setAppliedFilters,
  setSearchQuery,
  hasUnresolvedLogs,
  tags,
  removeTag,
  filteredLogs,
  isEdit,
  setIsEdit,
  onEditLog,
  onDeleteLog
}) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // remove later
  const { data: session, status } = useSession();
  useEffect(() => {
    if (!session || !session.user || status === "loading") {
      return;
    }
    setUser(session.user);
  }, [session, status])
  const [openTab, setOpenTab] = useState("Information");

  return (
    <div
      ref={logRef}
      className="mt-8 mb-8 shadow-xl rounded-lg text-md w-full text-left relative bg-foreground p-8"
    >
      {isEdit ? 
      <TabSection defaultTab={"information"} isEdit={isEdit} role={role} setOpenTab={setOpenTab}>
        <div label="information">
          <div className="w-full grid sm:grid-cols-3 grid-cols-1 gap-16">
            {Object.keys(dogInformationSchema).map((category) => (
              <div className="col" key={category}>
                <div className="flex-col space-y-4 text-lg">
                  <div className="text-xl">
                    <strong>{category}</strong>
                  </div>

                  {Object.keys(dogInformationSchema[category]).map((col) => {
                    const { key: formKey } =
                      dogInformationSchema[category][col];

                    return (
                      <FormField key={col} keyLabel={formKey} label={col} />
                    );
                  })}
                </div>
              </div>
              ))}
            </div>
          </div>
        </TabSection> :

      <TabSection defaultTab={ showLogTab ? "logs" : (showFormTab ? "forms" : "information") } setOpenTab={setOpenTab}>
        {showInfoTab ? <div label="information">
          <div className="w-full grid sm:grid-cols-3 grid-cols-1 sm:gap-16 gap-8">
            {Object.keys(dogInformationSchema).map((category) => (
              <div className="col" key={category}>
                <div className="flex-col space-y-4 text-lg">
                  <div className="text-xl">
                    <strong>{category}</strong>
                  </div>

                  {Object.keys(dogInformationSchema[category]).map((col) => {
                    const { key: formKey } =
                      dogInformationSchema[category][col];

                    return (
                      <FormField key={col} keyLabel={formKey} label={col} />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div> : undefined }

        <div label="logs" alertIcon={hasUnresolvedLogs}>  {/* make true a dynamic variable */}
          <div className="flex-grow flex-col space-y-4">
            <LogSearchFilterBar
              filters={appliedFilters}
              setFilters={setAppliedFilters}
              setSearch={setSearchQuery}
              addLogFunction={() => setShowLogModal(true)}
            />

            <TagDisplay tags={tags} removeTag={removeTag} />

            {/* TODO: move to static array, toggle hidden field */}
            {filteredLogs.map((log) => {
              return (
                <Log 
                  log={log} 
                  key={log._id} 
                  user={user} 
                  onEdit={(success) => {
                    onEditLog(success);
                  }}
                  onDelete={(success) => {
                    onDeleteLog(success);
                  }}
                />
              );
            })}

            <div className="flex justify-center">
              Displaying {filteredLogs.length} out of {logs.length}{" "}
              {logs.length == 1 ? "log" : "logs"}
            </div>
          </div>
        </div>
        

        <div label="forms" >
        
          <div className="flex justify-end">

            {showFormDropdown ? (
              <div className="sm:flex hidden">
              <DropdownMenu
                label={"Select Form Type"}
                props={{
                  singleSelect: true,
                  extended: true,
                  filterText: "Add Form",
                }}
                submitFilters={(type) => {
                  let formType;
                  if (type[0]) {
                    formType =
                      dog.location == "Placed"
                        ? "MonthlyPlaced"
                        : "MonthlyUnplaced";
                  } else {
                    formType = "VolunteerInteraction";
                  }
                  router.push(`${dog._id}/forms/new?type=${formType}`);
                }}
              >
                <DropdownMenuOption
                  index={0}
                  label={formTitleMap.MonthlyPlaced}
                  name={formTitleMap.MonthlyPlaced}
                />
                <DropdownMenuOption
                  index={1}
                  label={formTitleMap.VolunteerInteraction}
                  name={formTitleMap.VolunteerInteraction}
                />
              </DropdownMenu></div>
            ) : (
              <button
                type="button"
                className="px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade justify-center items-center sm:flex hidden"
                onClick={() => {
                  setShowFormDropdown(true);
                }}
              >
                <div className="text-foreground h-4 w-4 relative">
                  {<PlusIcon />}
                </div>
                <div className="text-foreground text-base font-medium">
                  Add Form
                </div>
              </button>
            )}
          </div>
          <div className="mb-9">
            {forms?.length ? (
              forms.map((form) => {
                return (
                  <button
                    key={form._id}
                    className="flex flex-col sm:flex-row justify-between text-start bg-secondary-background px-4 sm:px-6 py-4 rounded-lg gap-2 my-4 w-full hover:bg-primary-background"
                    type="button"
                    onClick={() => {
                      router.push(
                        `${dog._id}/forms/${form._id}?type=${form.type}`
                      );
                    }}
                  >
                    <div className="flex flex-row font-medium gap-2">
                      <DocumentIcon className="h-5 w-5 self-center" />
                      {formTitleMap[form.type]}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-x-4">
                      <span>Created by: {form.user.name}</span>
                      <span>
                        Last Updated:{" "}
                        {dateutils.displayDateAndTime(form.updatedAt)}
                      </span>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="flex justify-center align-bottom py-6">
                Displaying 0 out of 0 forms
              </div>
            )}
          </div>
        </div>
      </TabSection> }
      
        {openTab == "Forms" && !isEdit && showFormDropdown && (
          <div className="w-3/4 fixed bottom-40 flex z-10 justify-center sm:hidden">
          <DropdownMenu
            label={"Select Form Type"}
            props={{
              singleSelect: true,
              extended: true,
              filterText: "Add Form",
            }}
            submitFilters={(type) => {
              let formType;
              if (type[0]) {
                formType =
                  dog.location == "Placed"
                    ? "MonthlyPlaced"
                    : "MonthlyUnplaced";
              } else {
                formType = "VolunteerInteraction";
              }
              router.push(`${dog._id}/forms/new?type=${formType}`);
            }}
          >
            <DropdownMenuOption
              index={0}
              label={formTitleMap.MonthlyPlaced}
              name={formTitleMap.MonthlyPlaced}
            />
            <DropdownMenuOption
              index={1}
              label={formTitleMap.VolunteerInteraction}
              name={formTitleMap.VolunteerInteraction}
            />
          </DropdownMenu></div>
        )}
      {openTab === "Forms" && !isEdit && !showFormDropdown && (
        <div className="sm:hidden fixed bottom-5 start-8 end-8 justify-center">
      <button
        type="button"
        className="px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade w-full z-10 justify-center items-center flex"
        onClick={() => {
          setShowFormDropdown(true);
        }}
      >
        <div className="text-foreground text-base font-medium">
          Add Form
        </div>
      </button></div>)}
      {openTab === "Logs" && !isEdit && !showLogModal && (
        <div className="sm:hidden fixed bottom-5 start-8 end-8 justify-center">
      <button
        type="button"
        className="px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade w-full z-10 justify-center items-center flex"
        onClick={() => {
          setShowLogModal(true);
        }}
      >
        <div className="text-foreground text-base font-medium">
          {"Add Log"}
        </div>
      </button></div>)}
      {openTab === "Information" && !isEdit && (
        <div className="sm:hidden fixed bottom-5 start-8 end-8 justify-center">
      <button
        type="button"
        className="px-12 py-2.5 bg-ca-pink rounded border border-ca-pink-shade w-full z-10 justify-center items-center flex"
        onClick={() => {
          setIsEdit(true);
        }}
      >
        <div className="text-foreground text-base font-medium">
          {"Edit Information"}
        </div>
      </button></div>)}
    </div> 
  );
}
