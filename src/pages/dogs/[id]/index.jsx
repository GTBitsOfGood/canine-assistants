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
  const [userRole, setUserRole] = useState("");

  const [showInfoTab, setShowInfoTab] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showLogTab, setShowLogTab] = useState(false);
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [hasUnresolvedLogs, setHasUnresolvedLogs] = useState(false);

  const [showFormTab, setShowFormTab] = useState(false);
  const [forms, setForms] = useState([]);
  const [showFormDropdown, setShowFormDropdown] = useState(false);

  const [fileParam, setFileParam] = useState(null);

  const [changeInLogs, setChangeInLogs] = useState(false);
  const logRef = useRef(null);

  let search = {};
  search.dog = router.query.id;

  const { data: session } = useSession();
  const user = session?.user;

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

  useEffect(() => {
    fetchUserInfo();
  }, [])

  useEffect(() => {
    if (data?.association === "Volunteer/Partner") {
      setShowInfoTab(false);
      setShowLogTab(true);
    } 
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

  useEffect(() => {
    setHasUnresolvedLogs(false);
    if (logs) {
      logs?.forEach((log) => {
        if (!log.resolved) {
          setHasUnresolvedLogs(true);   
        }
      }
    );}
  }, [logs])

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
    <div className={`container mx-auto px-12 sm:px-auto justify-center order-b border-gray-300`}>
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
          Return to Dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit(onEditSubmit)}>
        <div className="flex gap-8 justify-center">
          <div className="sm:flex w-[350px] h-[350px] items-center justify-center rounded-lg relative bg-primary-gray hidden">
            {fileParam && fileParam != "" ? (
              isEdit ? (
                <ImageUpload preview={true}  setFileParam={setFileParam} previewImage={fileParam} />
              ) : (
              <div style={{ position: 'relative', width: '350px', height: '350px', borderRadius: '10px', overflow: 'hidden' }}>
                        <Image
                            alt="Dog"
                            layout="fill"
                            objectFit="cover"
                            src={fileParam}
                        />
                    </div>

            
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
              <div className="flex-col gap-4 inline-flex justify-center w-full sm:w-7/12">
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
                      <div className="sm:hidden justify-center items-center space-x-2 flex ">
                        <TrashIcon className="h-5" />
                        <div>Delete</div>
                      </div>
                    </div>

                    <div className="hidden pl-1 font-bold text-3xl pb-4 pt-2 sm:flex">
                      {dog.name}
                    </div>
                  </>
                )}
                
                <div className={!isEdit ? "flex pl-1 justify-center w-full font-bold text-3xl pb-4 pt-2 sm:hidden":"flex pl-1 w-full font-bold text-4xl pb-4 pt-2 sm:hidden"}>
                      {!isEdit? dog.name: "Edit Dog"}
                </div>
                {!isEdit && (
                <div className="flex items-center justify-center sm:hidden">
                  <div className=" flex  w-[350px] h-[350px] items-center justify-center rounded-lg relative bg-primary-gray sm:hidden">
                    {fileParam && fileParam != "" ? (
                      
                        <Image alt="Dog" width={350} height={350} src={fileParam} />
                      
                    ) : (
                      
                        <Image
                          priority
                          src={dogplaceholdericon}
                          alt="Dog Placeholder"
                        />
                      
                    )}
                  </div>
                </div>)}
                

                <div className="flex space-x-16">
                  <div className={!isEdit? "flex-col pl-1 text-lg sm:gap-4 gap-2 inline-flex w-1/2": "flex-col pl-1 text-lg sm:gap-4 gap-2 sm:inline-flex sm:w-1/2 w-full hidden"}>
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
                    <div className="flex-col inline-flex gap-2 sm:hidden">
                      {dog.location === "Placed" ? (
                        <>
                          <FormField label={"Location"} keyLabel={"location"} />
                          {!isEdit ? (
                            <>
                          {dog.partner && dog.partner.name ? (
                          <div className="">
                            Partner: {dog.partner.name}
                          </div>):
                          <div>Partner: N/A</div>}
                          {dog.placementCamp && dog.placementCamp.startDate && dog.placementCamp.endDate ? (
                          <div>
                            Placement Camp: {new Date(dog.placementCamp["startDate"]).toLocaleDateString()} - {new Date(dog.placementCamp["endDate"]).toLocaleDateString()}
                          </div>
                          ):
                          <div>Placement Camp: N/A</div>}
                          </>
                          ): (
                            <>
                            
                          </>
                          )}
                        </>
                      ) : (
                        <>
                          <FormField label={"Location"} keyLabel={"location"} />
                        </>
                      )}
                    </div>
                    
                  </div>
                  

                  <div className="hidden flex-col pl-1 text-lg gap-4 w-1/2 sm:inline-flex">
                    {dog.location === "Placed" ? (
                      <>
                        <FormField label={"Location"} keyLabel={"location"} />
                        
                          {!isEdit ? (
                            <>
                          {dog.partner && dog.partner.name ? (
                          <div className="">
                            Partner: {dog.partner.name}, {dog.partner.age}, {dog.partner.disability}
                          </div>)
                          : <div>Partner: N/A</div>}
                          {dog.placementCamp && dog.placementCamp.startDate && dog.placementCamp.endDate ? (
                          <div>
                            Placement Camp: {new Date(dog.placementCamp["startDate"]).toLocaleDateString()} - {new Date(dog.placementCamp["endDate"]).toLocaleDateString()}
                          </div>)
                          :<div>Placement Camp: N/A</div>}
                          </>
                          ): (
                            <>
                            <FormField
                            label={"Partner Name"}
                            keyLabel={"partner.name"}
                          />
                          <FormField
                            label={"Partner Age"}
                            keyLabel={"partner.age"}
                          />
                          <FormField
                            label={"Partner Disability"}
                            keyLabel={"partner.disability"}
                          />
                          <FormField
                          label={"Placement Camp Start"}
                          keyLabel={"placementCamp.startDate"}
                        />
                        <FormField
                          label={"Placement Camp End"}
                          keyLabel={"placementCamp.endDate"}
                        />
                          </>
                          )}
                      </>
                    ) : (
                      <>
                        <FormField label={"Location"} keyLabel={"location"} />
                      </>
                    )}
                  </div>
                </div>
                {isEdit && (
                    <div className="flex flex-col text-lg gap-4 w-full justify-start sm:hidden">
                          <div>
                            <div>Name</div>
                            <FormField label={"Name"} keyLabel={"name"} showLabel={false}/>
                          </div>
                          <div>
                            <div>Birth Date</div>
                            <FormField label={"Birth Date"} keyLabel={"dateOfBirth"} showLabel={false}/>
                          </div>
                          <div>
                            <div>Birth Time</div>
                            <FormField label={"Birth Time"} keyLabel={"dateOfBirth"} showLabel={false}/>
                          </div>
                          <div>
                            <div>Breed</div>
                            <FormField label={"Breed"} keyLabel={"breed"} showLabel={false}/>
                          </div>
                          <div>
                            <div>Photo</div>
                            <ImageUpload preview={false} setFileParam={setFileParam} />
                          </div>
                          <div className="flex w-full flex-row gap-4">
                            <div className="w-1/2">
                              <div>Sex</div>
                              <FormField label={"Sex"} keyLabel={"gender"} showLabel={false}/>
                            </div>
                            <div className="w-1/2">
                              <div>Current Location</div>
                              <FormField label={"Location"} keyLabel={"location"} showLabel={false}/>
                            </div>
                          </div>
                          <div className="h-min font-bold text-2xl">Birth Information</div>
                          <div>
                            <div>Coat Color</div>
                            <FormField label={"Coat Color"} keyLabel={"coatColor"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Collar Color</div>
                          <FormField label={"Collar Color"} keyLabel={"collarColor"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Delivery Information</div>
                          <FormField label={"Delivery Information"} keyLabel={"deliveryInformation"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Name of Mother</div>
                          <FormField label={"Mother"} keyLabel={"parents.1"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Name of Father</div>
                          <FormField label={"Father"} keyLabel={"parents.0"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Litter Size</div>
                          <FormField label={"Litter Size"} keyLabel={"litterSize"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Litter Composition</div>
                          <FormField label={"Litter Composition"} keyLabel={"litterComposition"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Birth Order</div>
                          <FormField label={"Birth Order"} keyLabel={"birthOrder"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Supplemental Feeding</div>
                          <FormField label={"Supplemental Feeding"} keyLabel={"supplementalFeeding"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Maternal Demeanor Prior to Whelping</div>
                          <FormField label={"Prior to Whelping"} keyLabel={"maternalDemeanor.0"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Maternal Demeanor During Whelping</div>
                          <FormField label={"During Whelping"} keyLabel={"maternalDemeanor.1"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Maternal Demeanor Subsequent to Whelping</div>
                          <FormField label={"Subqequent to Whelping"} keyLabel={"maternalDemeanor.2"} showLabel={false}/>
                          </div>
                          
                          <div className="h-min font-bold text-2xl">Care Information</div>
                          <div>
                          <div>Housing</div>
                          <FormField label={"Placement"} keyLabel={"housing.place"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Instructor</div>
                          <FormField label={"Instructor"} keyLabel={"instructors"} showLabel={false}/>
                          </div>
                          <div>
                          <div>{"Primary Caregiver(s)"}</div>
                          <FormField label={"Primary Caregiver(s)"} keyLabel={"caregivers"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Primary Toileting Area</div>
                          <FormField label={"Primary Toileting Area"} keyLabel={"toiletArea"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Feeding Amount</div>
                          <FormField label={"Amount"} keyLabel={"feeding.amount"} showLabel={false}/>
                          </div>
                          <div>
                          <div>First Meal</div>
                          <FormField label={"First Meal"} keyLabel={"feeding.firstmeal"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Second Meal</div>
                          <FormField label={"Second Meal"} keyLabel={"feeding.secondmeal"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Third Meal</div>
                          <FormField label={"Third Meal"} keyLabel={"feeding.thirdmeal"} showLabel={false}/>
                          </div>
                          <div>
                          <div>Last Bath</div>
                          <FormField label={"Last bath"} keyLabel={"grooming.lastBath"} showLabel={false}/>
                          </div>
                          <div className="invisible pb-8"></div>
                        
                    
                    </div>
                    )}
              </div>

              {/* Logic for showing Save and Cancel buttons or Edit and Delete buttons depending on if editing */}
              {isEdit ? (
                <>
                <div className="grow sm:flex gap-4 justify-end items-center h-min hidden">
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
                <div className="fixed w-full px-12 justify-center flex bottom-0 z-10 gap-4 sm:hidden">
                  <button
                    type="button"
                    className=" py-2 px-8 w-1/2 border-2 bg-white border-gray-200 rounded"
                    onClick={() => {
                      reset();
                      if (router.route === "/dogs/new") {
                        router.push("/dogs");
                      } else {
                        setIsEdit((isEdit) => !isEdit);
                      }
                    }}
                  >
                    Discard Changes
                  </button>
                  <button
                    className="flex w-1/2 justify-center bg-pink-800 text-white py-2 px-9 border-2 rounded"
                    type="submit"
                  >
                    Save Changes
                  </button>
                </div>
                </>
              ) : (
                <>
                
                
                <div className="grow sm:flex gap-4 justify-center hidden">
                  <div className="flex gap-4">
                    <button
                      type="button"
                      className="sm:flex justify-center items-center space-x-2 h-min hidden"
                      onClick={() => setIsEdit((isEdit) => !isEdit)}
                    >
                      <PencilSquareIcon className="h-5" />
                      <div>Edit</div>
                    </button>
                    <div className="flex justify-center items-center space-x-2 h-min">
                      <TrashIcon className="h-5" />
                      <div>Delete</div>
                    </div>
                  </div>
                </div>
                </>
              )}
            </>
          
        </div>
        <div className={!isEdit ?"flex w-full justify-center": "sm:flex hidden"}>
        <TabContainer
          logRef={logRef}
          showInfoTab={showInfoTab}
          showLogTab={showLogTab}
          setShowLogModal={setShowLogModal}
          showLogModal={showLogModal}
          logs={logs}
          dog={dog}
          role={userRole}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          setSearchQuery={setSearchQuery}
          hasUnresolvedLogs={hasUnresolvedLogs}
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
          setIsEdit={setIsEdit}
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
        /></div>
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
