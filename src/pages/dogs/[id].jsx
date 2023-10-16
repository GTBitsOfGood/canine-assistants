import TabSection from "@/components/TabSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/router";
import dateutils from "@/utils/dateutils";
import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "@/components/Chip";
import Image from "next/image";
import maleicon from "../../../public/maleicon.svg";
import femaleicon from "../../../public/femaleicon.svg";
import dogplaceholdericon from "../../../public/dogplaceholdericon.svg";
import LogModal from "@/components/LogModal";

/**
 *
 * @returns {React.ReactElement} The individual Dog page
 */
export default function IndividualDogPage() {
  const [data, setData] = useState();
  const [ showLogModal, setShowLogModal ] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/dogs/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => setData(data));
    }
  }, [router.query]);

  if (!data || data === undefined || !data.success) {
    return <div>loading</div>;
  }

  const dog = data.data;

  const dogInformationSchema = {
    ["Birth"]: {
      ["Birth Time"]: "N/A",
      ["Color Color"]: "N/A",
      ["Supplemental Feeding"]: "N/A",
      ["Delivery Information"]: "N/A",
      ["Birth Order"]: "N/A",
    },
    ["Family"]: {
      ["Litter Size"]: "N/A",
      ["Litter Composition"]: "N/A",
      ["Father"]: "N/A",
      ["Mother"]: "N/A",
    },
    ["Maternal Demeanor"]: {
      ["Prior to Whelping"]: "N/A",
      ["During Whelping"]: "N/A",
      ["Subsequent to Whelping"]: "N/A",
    },
    ["Housing"]: {
      ["Housing"]: "N/A",
      ["Instructor"]: "N/A",
      ["Primary Caregiver(s)"]: "N/A",
      ["Primary Toileting Area"]: "N/A",
    },
    ["Feeding"]: {
      ["Amount"]: "N/A",
      ["First Meal"]: "N/A",
      ["Second Meal"]: "N/A",
      ["Third Meal"]: "N/A",
    },
    ["Grooming"]: {
      ["Last bath"]: "N/A",
    },
  };

  return (
    // Artificial spacing until nav is created
    <div className={`container mx-auto order-b border-gray-300`}>
      <Toaster />
      {showLogModal ? (
        <>
          <LogModal
            dogId={ dog._id }
            userId={ dog.instructors[0]._id }
            onClose={() => {
              setShowLogModal(false);
            }}
            onSubmit={(success) => {
              // TODO toast animation
              if (success) {
                toast.custom((t) => (
                  <div className={`h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-ca-green text-white text-lg font-normal
                    ${t.visible ? 'animate-enter' : 'animate-leave'}`}
                  >
                    <span className="font-bold">New log</span>&nbsp;<span>was successfully added.</span>
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
      ) : null }
      <div className="py-6 flex items-center">
        <ChevronLeftIcon className="w-4 mr-2" />
        <Link href="/dogs" className="text-lg text-secondary-text">
          Return to dashboard
        </Link>
      </div>

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
              <Image priority src={dogplaceholdericon} alt="Dog Placeholder" />
            </div>
            <div className="flex-col">
              <div className="flex justify-between">
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

              <div className="pt-6 pl-1 font-bold text-3xl">{dog.name}</div>
              <div className="flex space-x-16">
                <div className="flex-col pt-8 pl-1 text-lg space-y-2">
                  <div>
                    Birth Date:{" "}
                    {dateutils.getDateString(new Date(dog.dateOfBirth))}
                  </div>
                  <div>Sex: {dog.gender}</div>

                  <div>Breed: {dog.breed}</div>
                  <div>Coat Color: N/A</div>
                </div>

                <div className="flex-col pt-8 pl-1 text-lg space-y-2">
                  {dog.location === "Placed" ? (
                    <>
                      <div>Placement: N/A</div>
                      <div>Partner: N/A</div>
                      <div>Placement Camp: N/A</div>
                    </>
                  ) : (
                    <>
                      <div>Housing: N/A</div>
                      <div>Instructor: N/A</div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="grow flex gap-4 justify-end">
              <div className="flex justify-center space-x-2">
                <PencilSquareIcon className="h-5" />

                <div>Edit</div>
              </div>
              <div className="flex justify-center space-x-2">
                <TrashIcon className="h-5" />

                <div>Delete</div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 shadow-xl rounded-lg text-md w-full text-left relative overflow-hidden bg-foreground p-8">
        <TabSection defaultTab="information">
          <div label="information">
            <div className="w-2/3 grid grid-cols-3 gap-16">
              {Object.keys(dogInformationSchema).map((category) => (
                <div className="col" key={category}>
                  <div className="flex-col space-y-4 text-lg">
                    <div className="text-xl">
                      <strong>{category}</strong>
                    </div>

                    {Object.keys(dogInformationSchema[category]).map((col) => (
                      <div key={col}>
                        {col}: {dogInformationSchema[category][col]}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div label="logs">
            <button
              className="px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex"
              onClick={() => setShowLogModal(true)}
            >
              <div className="text-foreground text-base font-medium">
                + Add a log
              </div>
            </button>
          </div>
        </TabSection>
      </div>
    </div>
  );
}
