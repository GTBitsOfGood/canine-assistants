import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";

import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import maleicon from "../../../../public/maleicon.svg";
import femaleicon from "../../../../public/femaleicon.svg";
import dogplaceholdericon from "../../../../public/dogplaceholdericon.svg";

import { Chip, ChipTypeStyles } from "@/components/Chip";
import LoadingAnimation from "@/components/LoadingAnimation";
import LogModal from "@/components/Log/LogModal";
import FormField from "@/components/Form/FormField";
import TabContainer from "@/components/Tab/TabContainer";

import { useEditDog } from "@/context/EditDogContext";
import DogEditingLayout from "@/layouts/DogEditingLayout";
import Layout from "@/layouts/Layout";

import stringUtils from "@/utils/stringutils";
import {
  dogInformationSchema,
  computeDefaultValues,
  newDog,
} from "@/utils/consts";
import { formTitleMap } from "@/utils/formUtils";
import ImageUpload from "@/components/ImageUpload";
import { Toast } from "@/components/Toast";

/**
 * Displays information about specific dog including Logs and Forms
 * @returns {React.ReactElement} The individual Dog page
 */
export default function IndividualDogPage() {
  const router = useRouter();
  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState("");

  const [showInfoTab, setShowInfoTab] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showLogTab, setShowLogTab] = useState(false);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});

  const [showFormTab, setShowFormTab] = useState(false);
  const [forms, setForms] = useState([]);
  const [showFormDropdown, setShowFormDropdown] = useState(false);

  const [fileParam, setFileParam] = useState(null);

  const [changeInLogs, setChangeInLogs] = useState(false);

  const [userRole, setUserRole] = useState(null);

  const logRef = useRef(null);

  let search = {};
  search.dog = router.query.id;

  /**
   * Searches logs using current search query and filters if filtering is requested.
   * Filtering logic is handled on the backend.
   * @param {boolean} filtered Whether to use current search query and filters.
   * Setting filtered = false also calls setLogs, which is useful for storing the total number of logs.
   */
  function searchLogs(filtered = true) {
    // Convert each filter to an array
    const filters = { ...appliedFilters };
    for (const key in filters) {
      if (filters[key] && typeof(filters[key]) == "object") {
        filters[key] = Object.values(filters[key]);
      }
    }

    fetch("/api/logs/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        filtered
          ? {...search, query: searchQuery, filters: filters} 
          : search
      ),
    })
      .catch((err) => {
        setFilteredLogs([]);
        if (!filtered || Object.keys(filters).length === 0) {
          setLogs([]);
        }
      })
      .then((res) => res.json())
      .then((data) => {
        const res = !data || data === undefined || !data.success
          ? []
          : data.data.reverse();
        setFilteredLogs(res);
        if (!filtered || Object.keys(filters).length === 0) {
          setLogs(res);
        }
      }
    );
  }
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "authenticated") {
      fetch(`/api/users/${session?.user._id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data?.data?.role);
        });
    }
  }, [session?.user, status]);

  useEffect(() => {
    if (data?.association === "Volunteer/Partner") {
      setShowInfoTab(false);
      setShowLogTab(true);
    } 
    console.log(data)
  }, [data])

  const { setIsEdit, isEdit, handleSubmit, reset, getValues, errors } =
    useEditDog();
  
  useEffect(() => {
    if (isEdit === true) {
      setShowFormTab(false)
      setShowLogTab(false)
    }
  }, [isEdit])

  // Fetches information about dog if exists and sets correct tabs and filters if needed
  useEffect(() => {
    
    setShowLogTab(router.query?.showLogTab);
    setShowFormTab(router.query?.showFormTab);

    if (router.query?.filteredTag) {
      setAppliedFilters({
        tags: [stringUtils.upperFirstLetter(router.query?.filteredTag)],
      });
    }

    if (router.query.id) {
      fetch(`/api/dogs/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data || data === undefined || !data.success) {
            router.push("/dogs");
            return;
          }
          setData(data);
          setFileParam(data.data.image);
          reset(computeDefaultValues(data.data));
        });
      
      // Initial log fetch
      searchLogs(false);
      setChangeInLogs(false);
      
    // If dog is being created
    } else if (router.route === "/dogs/new") {
      setData({ data: newDog, success: "201" });
      setIsEdit(true);
      reset(computeDefaultValues(newDog));
    }
  }, [router.query, reset, changeInLogs]);

  // Shows correct logs if filtered
  useEffect(() => {
    searchLogs();
    if (router.query?.showLogTab && logRef.current) {
      window.scrollTo(0, logRef.current.offsetTop);
    }
  }, [appliedFilters, searchQuery, router.query, changeInLogs, logRef.current]);

  // Fetches forms for the dog
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
          setForms(forms.data)
        });
    }
  }, [data]);

  if (!data || !data.success) {
    return <LoadingAnimation />;
  }

  const dog = data.data;

  const notify = (message, newDogName) => {
    if (message === "success") {
      Toast({ success: true, bold: newDogName, message: "was successfully updated." });
    } else if (message === "failure") {
      Toast({ success: false, message: "Unable to update dog, please try again." });
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
      method: router.route === "/dogs/new" ? "POST" : "PATCH",
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

      if (fileParam && fileParam != "") {
        const imageRes = await fetch("/api/images", {
          method: "POST",
          headers: {
            "Dog-Id": res.data._id
          },
          body: fileParam,
        }).then((res) => { return res.json() });

        if (!imageRes.success) {
          throw new Error(imageRes.data);
        } else {
          setFileParam(() => { return imageRes.data.imageUrl });
        }
      } else {
        if (router.route != "/dogs/new" && dog.image != "") {
          const deleteRes = await fetch(`/api/images/${res.data._id}`, {
            method: "DELETE",
          }).then((res) => { return res.json() });

          if (!deleteRes.success) {
            throw new Error(imageRes.data);
          } else {
            setFileParam(() => { return "" });
          }
        }
      }

      if (router.route === "/dogs/new") {
        router.push(`/dogs/${res.data._id}`);
      }

      notify("success", res.data.name ?? "Dog");
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
    <div className={`container mx-auto order-b border-gray-300`}>
      {/* Logic for the Log modal */}
      {showLogModal ? (
        <>
          <LogModal
            dogId={dog._id}
            userId={user._id}
            onClose={() => {
              setShowLogModal(false);
            }}
            onSubmit={(success) => {
              if (success) {
                // update logs to display
                searchLogs();
                Toast({ success: true, bold: "New Log", message: "was successfully added." });
              } else {
                Toast({ success: false, message: "There was a problem saving the log, please try again." });
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
        <div className="flex gap-8 ">
          <div className="flex w-[350px] h-[350px] items-center justify-center rounded-lg relative bg-primary-gray">
            {fileParam && fileParam != "" ? (
              isEdit ? (
                <ImageUpload preview={true} setFileParam={setFileParam} previewImage={fileParam} />
              ) : (
                <Image alt="Dog" width={350} height={350} src={fileParam} />
              )
            ) : (
              isEdit ? (
                <ImageUpload preview={false} setFileParam={setFileParam} />
              ) : (
                <Image
                  priority
                  src={dogplaceholdericon}
                  alt="Dog Placeholder"
                />
              )
            )}
          </div>
            <> 
              <div className="flex-col gap-4 inline-flex w-7/12">
                {/* Logic for showing information at top when not editing it */}
                {!isEdit && (
                  <>
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Chip
                          innerStyles={"shadow"}
                          label={dog.location}
                          type={
                            ChipTypeStyles[dog.location] || ChipTypeStyles.Tag
                          }
                        />
                        <div className="flex justify-center items-center space-x-2">
                          <Image
                            priority
                            src={dog.gender === "Male" ? maleicon : femaleicon}
                            alt="Male Dog"
                          />

                          <div>{dog.gender ?? "N/A"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="pl-1 font-bold text-3xl pb-4 pt-2">
                      {dog.name}
                    </div>
                  </>
                )}

                <div className="flex space-x-16">
                  <div className="flex-col pl-1 text-lg gap-4 inline-flex w-1/2">
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
                    <FormField label={"Weight (lbs)"} keyLabel={"weight"} />
                  </div>

                  <div className="flex-col pl-1 text-lg gap-4 inline-flex w-1/2">
                    {dog.location === "Placed" ? (
                      <>
                        <FormField label={"Location"} keyLabel={"location"} />
                        <FormField label={"Placement"} keyLabel={"placement"} />
                        <FormField
                          label={"Partner"}
                          keyLabel={"partner.user"}
                        />
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

              {/* Logic for showing Save and Cancel buttons or Edit and Delete buttons depending on if editing */}
              {isEdit ? (
                <div className="grow flex gap-4 justify-end items-center h-min">
                  <button
                    type="button"
                    className="flex justify-center space-x-2 h-min py-1 px-8 border-2 bg-white border-gray-200 rounded"
                    onClick={() => {
                      reset();
                      if (router.route === "/dogs/new") {
                        router.push("/dogs");
                      } else {
                        setIsEdit((isEdit) => !isEdit);
                      }
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
                  <div className="flex gap-4">

                  {(userRole === "Admin" || userRole === "Manager" || userRole === "Instructor/Caregiver") && 
                    <button
                      type="button"
                      className="flex justify-center items-center space-x-2 h-min"
                      onClick={() => setIsEdit((isEdit) => !isEdit)}
                    >
                      <PencilSquareIcon className="h-5" />
                      <div>Edit</div>
                    </button>
                    }

                    {(userRole === "Admin" || userRole === "Manager") && 
                    <div className="flex justify-center items-center space-x-2 h-min">
                      <TrashIcon className="h-5" />
                      <div>Delete</div>
                    </div>
                    }
                  </div>
                  
                </div>
              )}
            </>
          
        </div>

        <TabContainer
          logRef={logRef}
          showInfoTab={showInfoTab}
          showLogTab={showLogTab}
          setShowLogModal={setShowLogModal}
          logs={logs}
          dog={dog}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          setSearchQuery={setSearchQuery}
          showFormTab={showFormTab}
          showFormDropdown={showFormDropdown}
          setShowFormDropdown={setShowFormDropdown}
          formTitleMap={formTitleMap}
          forms={forms}
          tags={tags}
          removeTag={removeTag}
          filteredLogs={filteredLogs}
          dogInformationSchema={dogInformationSchema}
          isEdit = {isEdit}
          onEditLog={(success) => {

            if (success) {
              setChangeInLogs(true);
            }
          }}
          onDeleteLog={(success) => {

            if (success) {
              setChangeInLogs(true);
            }
          }}
        />
      </form>
    </div>
  );
}

IndividualDogPage.getLayout = function getLayout(page) {
  return (
    <Layout>
      <DogEditingLayout>{page}</DogEditingLayout>
    </Layout>
  );
};
