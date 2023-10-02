import TabSection from "@/components/TabSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dateutils from "@/utils/dateutils";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "@/components/Chip";
import Image from "next/image";
import maleicon from "../../../public/maleicon.svg";
import femaleicon from "../../../public/femaleicon.svg";
import dogplaceholdericon from "../../../public/dogplaceholdericon.svg";

/**
 *
 * @returns {React.ReactElement} The individual Dog page
 */
export default function IndividualDogPage() {
  const [data, setData] = useState();

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

  console.log({ dog });

  return (
    // Artificial spacing until nav is created
    <div className={`container mx-auto order-b border-gray-300`}>
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
                  <div>Placement: N/A</div>
                  <div>Partner: N/A</div>

                  <div>Placement Camp: N/A</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 shadow-xl rounded-lg text-md w-full text-left relative overflow-hidden bg-foreground p-8">
        <TabSection defaultTab="information">
          <div label="information">
            <div className="w-2/3 grid grid-cols-3 gap-16">
              <div className="col">
                <div className="flex-col space-y-4 text-lg">
                  <div className="text-xl">
                    <strong>Birth</strong>
                  </div>
                  <div>Birth Time: N/A</div>
                  <div>Collar Color: N/A</div>
                  <div>Supplemental Feeding: N/A</div>
                  <div>Delivery Information: N/A</div>
                  <div>Birth Order: N/A</div>
                </div>
              </div>
              <div className="col">
                <div className="flex-col space-y-4 text-lg">
                  <div className="text-xl">
                    <strong>Family</strong>
                  </div>
                  <div>Litter Size: N/A</div>
                  <div>Litter Composition: N/A</div>
                  <div>Father: N/A</div>
                  <div>Mother: N/A</div>
                </div>
              </div>
              <div className="col">
                <div className="flex-col space-y-4">
                  <div className="text-lg">
                    <strong>Maternal Demeanor</strong>
                  </div>
                  <div>Prior to Whelping</div>
                  <div>During Whelping</div>
                  <div>Subsequent to Whelping</div>
                </div>
              </div>
              <div className="col">
                <div className="flex-col space-y-4">
                  <div className="text-lg">
                    <strong>Housing</strong>
                  </div>
                  <div>Housing: N/A</div>
                  <div>Instructor: N/A</div>
                  <div>Primary Caregiver(s): N/A</div>
                  <div>Primary Toileting Area: N/A</div>
                </div>
              </div>
              <div className="col">
                <div className="flex-col space-y-4">
                  <div className="text-xl">
                    <strong>Feeding</strong>
                  </div>
                  <div>Amount: N/A</div>
                  <div>First Meal: N/A</div>
                  <div>Second Meal: N/A</div>
                  <div>Third Meal: N/A</div>
                </div>
              </div>
              <div className="col">
                <div className="flex-col space-y-4">
                  <div className="text-xl">
                    <strong>Grooming</strong>
                  </div>
                  <div>Last bath: N/A</div>
                </div>
              </div>
            </div>
          </div>
          <div label="logs">logs</div>
        </TabSection>
      </div>
    </div>
  );
}
