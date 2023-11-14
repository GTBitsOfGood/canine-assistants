import TabSection from "@/components/TabSection";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import stringUtils from "@/utils/stringutils";
import { dogInformationSchema, computeDefaultValues } from "@/utils/consts";

import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
  PlusIcon
} from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { Chip, ChipTypeStyles } from "@/components/Chip";
import Image from "next/image";
import maleicon from "../../../../public/maleicon.svg";
import femaleicon from "../../../../public/femaleicon.svg";
import dogplaceholdericon from "../../../../public/dogplaceholdericon.svg";
import LogSearchFilterBar from "@/components/LogSearchFilterBar";
import LogModal from "@/components/LogModal";
import TagDisplay from "@/components/TagDisplay";
import Log from "@/components/Log";

import FormField from "@/components/FormField";
import { useEditDog } from "@/context/EditDogContext";
import { formTitleMap } from "@/utils/formUtils";
import dateutils from "@/utils/dateutils";
import DropdownMenu, { DropdownMenuOption } from "@/components/DropdownMenu";

/**
 *
 * @returns {React.ReactElement} The individual Dog page
 */
export default function IndividualDogPage() {
  const [data, setData] = useState();
  const [showLogModal, setShowLogModal] = useState(false);
  const [ showLogTab, setShowLogTab ] = useState(false);
  const [ showFormTab, setShowFormTab ] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({});
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [ forms, setForms ] = useState([]);
  const [ showFormDropdown, setShowFormDropdown ] = useState(false);
  // const [ openFormDropdown, setOpenFormDropdown ] = useState(true);

  const router = useRouter();
  const logRef = useRef(null);

  let search = {};
  search.dog = router.query.id;

  const { setIsEdit, isEdit, handleSubmit, reset, getValues, errors } =
    useEditDog();

  useEffect(() => {
    setShowLogTab(router.query?.showLogTab);
    setShowFormTab(router.query?.showFormTab);
    if (router.query?.filteredTag) {
      setAppliedFilters({ tags: [ stringUtils.upperFirstLetter(router.query?.filteredTag) ]});
    }

    if (router.query.id) {
      fetch(`/api/dogs/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          reset(computeDefaultValues(data.data));
        });
      fetch("/api/logs/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(search),
      })
        .catch((err) => setLogs([]))
        .then((res) => res.json())
        .then((data) =>
          setLogs(
            !data || data === undefined || !data.success
              ? []
              : data.data.reverse()
          )
        );
    }
  }, [ router.query, reset ]);

  useEffect(() => {
    // filter logs by search query
    const searchQueryFilteredLogs = logs.filter(
      (log) =>
        log.title.toLowerCase().includes(searchQuery) ||
        log.description.toLowerCase().includes(searchQuery)
    );

    // if filters are applied, filter the log list further
    if (Object.keys(appliedFilters).length === 0) {
      setFilteredLogs(searchQueryFilteredLogs);
    } else {
      setFilteredLogs(
        searchQueryFilteredLogs.filter((log) => {
          return Object.keys(appliedFilters).reduce((acc, filterType) => {
            /* 
            note: a log can have multiple tags, so we check if ANY of the 
            applied tag filters match ANY of the log tags; for other types, it 
            must be an exact match.
            */
            return (
              acc ||
              (filterType == "tags"
                ? Object.values(appliedFilters[filterType]).includes(
                    ...log[filterType]
                  )
                : Object.values(appliedFilters[filterType]).includes(
                    log[filterType]
                  ))
            );
          }, false);
        })
      );
    }

    if (router.query?.showLogTab && logRef.current) {
      window.scrollTo(0, logRef.current.offsetTop);
    }
  }, [ logs, appliedFilters, searchQuery, router.query, logRef.current ]);

  useEffect(() => {
    if (data) {
      fetch("/api/forms/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dog: data.data._id }),
      })
        .catch((err) => setForms([]))
        .then((res) => res.json())
        .then((forms) => {
          setForms(forms.data);
        });
    }
  }, [ data ]);

  if (!data || !data.success) {
    return <div>loading</div>;
  }

  const dog = data.data;

  const notify = (message, newDogName) => {
    if (message === "success") {
      toast(
        <>
          <span>
            <strong>{newDogName}</strong> was successfully updated.
          </span>
        </>,
        {
          style: {
            color: "white",
            backgroundColor: "green",
          },
        }
      );
    } else if (message === "failure") {
      toast.error("Unable to update!");
    }
  };



  const onEditSubmit = async (data) => {
    // FORMAT DATA FIRST
    const removeUndefinedAndEmpty = (obj) => {
      Object.keys(obj).forEach((key) => {
        if (Array.isArray(obj[key])) {
          obj[key] = obj[key].filter((item) => item !== undefined);
          if (obj[key].length === 0) {
            delete obj[key];
          }
        } else if (obj[key] && typeof obj[key] === "object") {
          removeUndefinedAndEmpty(obj[key]); // recurse
        } else if (obj[key] === undefined) {
          delete obj[key];
        }
      });
      return obj;
    };

    data = removeUndefinedAndEmpty(data);


    const requestBody = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    try {
      const res = await (
        await fetch(`/api/dogs/${router.query.id}`, requestBody)
      ).json();

      if (!res.success) {
        throw new Error(res.message);
      }

      notify("success", res.data.name);
      setData(res);
      reset(computeDefaultValues(res.data));
      setIsEdit(false);
    } catch (err) {
      reset();
      notify("failure");
      setIsEdit(false);
    }
  };

  const tags = Object.keys(appliedFilters)
    .map((filterGroup, index) => {
      return Object.keys(appliedFilters[filterGroup]).map((element) => {
        return {
          group: filterGroup,
          label: appliedFilters[filterGroup][element],
          index: element,
          type:
            ChipTypeStyles[
              appliedFilters[filterGroup][element].replace(/[0-9]/g, "")
            ] || ChipTypeStyles.Tag,
        };
      });
    })
    .flat(1);

  const removeTag = (group, index) => {
    const newFilters = { ...appliedFilters };
    if (Object.keys(newFilters[group]).length <= 1) {
      delete newFilters[group];
    } else {
      delete newFilters[group][index];
    }

    setAppliedFilters(newFilters);
  };

  // TODO add listener for if user clicks out of dropdown menu to turn back into button

  return (
    // Artificial spacing until nav is created
    <div className={`container mx-auto order-b border-gray-300`}>
      {showLogModal ? (
        <>
          <LogModal
            dogId={dog._id}
            userId={dog.instructors[0]._id}
            onClose={() => {
              setShowLogModal(false);
            }}
            onSubmit={(success) => {
              // TODO toast animation
              if (success) {
                // update logs to display
                fetch("/api/logs/search", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(search),
                })
                  .catch((err) => setLogs([]))
                  .then((res) => res.json())
                  .then((data) =>
                    setLogs(
                      !data || data === undefined || !data.success
                        ? []
                        : data.data.reverse()
                    )
                  );

                toast.custom((t) => (
                  <div
                    className={`h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-ca-green text-white text-lg font-normal
                    ${t.visible ? "animate-enter" : "animate-leave"}`}
                  >
                    <span className="font-bold">New log</span>&nbsp;
                    <span>was successfully added.</span>
                  </div>
                ));
              } else {
                toast.custom(() => (
                  <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
                    There was a problem saving the log, please try again.
                  </div>
                ));
              }
            }}
          />
        </>
      ) : null}
      <div className="py-6 flex items-center">
        <ChevronLeftIcon className="w-4 mr-2" />
        <Link href="/dogs" className="text-lg text-secondary-text">
          Return to dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit(onEditSubmit)}>
        <div className="flex gap-8">
          {dog.image ? (
            <Image alt="Dog" width={300} height={300} src={dog.image} />
          ) : (
            <>
              <div
                className={
                  "w-[300px] h-[300px] bg-primary-gray flex items-center justify-center rounded-lg"
                }
              >
                <Image
                  priority
                  src={dogplaceholdericon}
                  alt="Dog Placeholder"
                />
              </div>
              <div className="flex-col">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-4">
                    <Chip
                      label={dog.location}
                      type={ChipTypeStyles[dog.location] || ChipTypeStyles.Tag}
                    />
                    <div className="flex justify-center items-center space-x-2">
                      <Image
                        priority
                        src={dog.gender === "Male" ? maleicon : femaleicon}
                        alt="Male Dog"
                      />

                      <div>Male</div>
                    </div>
                  </div>
                </div>

                {!isEdit && (
                  <div className="pt-6 pl-1 font-bold text-3xl">{dog.name}</div>
                )}

                <div className="flex space-x-16">
                  <div className="flex-col pt-8 pl-1 text-lg space-y-2">
                    {isEdit && (
                      <FormField
                        className="h-min pl-1 font-bold text-3xl"
                        label="Name"
                        keyLabel={"name"}
                        showLabel={false}
                      />
                    )}

                    <FormField label={"Birth Date"} keyLabel={"dateOfBirth"} />
                    <FormField label={"Sex"} keyLabel={"gender"} />
                    <FormField label={"Breed"} keyLabel={"breed"} />
                    <FormField label={"Coat Color"} keyLabel={"coatColor"} />
                  </div>

                  <div className="flex-col pt-8 pl-1 text-lg space-y-2">
                    {dog.location === "Placed" ? (
                      <>
                        <FormField label={"Placement"} keyLabel={"placement"} />
                        <FormField label={"Partner"} keyLabel={"partner.user"} />
                        <FormField
                          label={"Placement Camp"}
                          keyLabel={"placementCamp"}
                        />
                      </>
                    ) : (
                      <>
                        <FormField label={"Location"} keyLabel={"location"} />
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isEdit ? (
                <div className="grow flex gap-4 justify-end items-center h-min">
                  <button
                    type="button"
                    className="flex justify-center space-x-2 h-min py-1 px-8 border-2 bg-white border-gray-200 rounded"
                    onClick={() => {
                      setIsEdit((isEdit) => !isEdit);
                      reset();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center space-x-2 h-min bg-pink-800 text-white py-1 px-9 border-2 rounded"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="grow flex gap-4 justify-end">
                  <button
                    type="button"
                    className="flex justify-center space-x-2 h-min"
                    onClick={() => setIsEdit((isEdit) => !isEdit)}
                  >
                    <PencilSquareIcon className="h-5" />
                    Edit
                  </button>
                  <div className="flex justify-center space-x-2">
                    <TrashIcon className="h-5" />

                    <div>Delete</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div ref={logRef} className="mt-8 shadow-xl rounded-lg text-md w-full text-left relative overflow-hidden bg-foreground p-8">
          <TabSection defaultTab={showLogTab ? "logs" : (showFormTab ? "forms" : "information")}>
            <div label="information">
              <div className="w-full grid grid-cols-3 gap-16">
                {Object.keys(dogInformationSchema).map((category) => (
                  <div className="col" key={category}>
                    <div className="flex-col space-y-4 text-lg">
                      <div className="text-xl">
                        <strong>{category}</strong>
                      </div>

                      {Object.keys(dogInformationSchema[category]).map(
                        (col) => {
                          const { key: formKey } =
                            dogInformationSchema[category][col];

                          return (
                            <FormField
                              key={col}
                              keyLabel={formKey}
                              label={col}
                            />
                          );
                        }
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div label="logs">
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
                  return <Log log={log} key={log._id} />;
                })}
                <div className="flex justify-center">
                  Displaying {filteredLogs.length} out of {logs.length}{" "}
                  {logs.length == 1 ? "log" : "logs"}
                </div>
              </div>
            </div>
            <div label="forms">
              <div className="flex justify-end">
                {showFormDropdown ? (
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
                        formType = dog.location == "Placed" ? "MonthlyPlaced" : "MonthlyUnplaced";
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
                  </DropdownMenu>
                ) : (
                  <button
                    type="button"
                    className="px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex"
                    onClick={() => {
                      setShowFormDropdown(true);
                    }}
                  >
                    <div className="text-foreground h-4 w-4 relative">{<PlusIcon />}</div>
                    <div className="text-foreground text-base font-medium">Add Form</div>
                  </button>
                )}
              </div>
              {forms.map((form) => {
                return (
                  <button className="flex flex-col sm:flex-row justify-between text-start bg-secondary-background px-4 sm:px-6 py-4 rounded-lg gap-2 my-4 w-full hover:bg-primary-background"
                    onClick={() => {
                      router.push(`${dog._id}/forms/${form._id}?type=${form.type}`);
                    }}
                  >
                    <div className="flex flex-row font-medium gap-2">
                      <DocumentIcon className="h-5 w-5 self-center" />
                      {formTitleMap[form.type]}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-x-4">
                      <span>Created by: {form.user.name}</span>
                      <span>Last Updated: {dateutils.displayDateAndTime(form.updatedAt)}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </TabSection>
        </div>
      </form>
    </div>
  );
}
