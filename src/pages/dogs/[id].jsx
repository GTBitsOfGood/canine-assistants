import TabSection from "@/components/TabSection";
import Card from "@/components/Card";
import PetmateCard from "@/components/PetmateCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dateutils from "@/utils/dateutils";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "@/components/Chip";
import DogsPage from ".";
import Image from "next/image";

/**
 *
 * Represents a column with a label and value to display on the individual dog page
 *
 * @param {{label: string, value: string}}
 */
function DogColumnProperty({ label, value }) {
  return (
    <div className="text-gray-600 text-lg mr-24">
      <div className="flex-col pt-1 items-center">
        <div className="text-sm text-gray-400 uppercase">{label}</div>
        <div>{value}</div>
      </div>
    </div>
  );
}

/**
 *
 * @param {{ dog: Dog }}
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
              <svg
                width="250"
                height="250"
                viewBox="0 0 211 198"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M109.646 79.2071L171.438 101.295V191.4C171.438 193.151 170.743 194.829 169.506 196.067C168.27 197.305 166.593 198 164.844 198H138.469C136.72 198 135.043 197.305 133.806 196.067C132.57 194.829 131.875 193.151 131.875 191.4V145.203H65.9375V191.4C65.9375 193.151 65.2428 194.829 64.0062 196.067C62.7697 197.305 61.0925 198 59.3438 198H32.9688C31.22 198 29.5428 197.305 28.3063 196.067C27.0697 194.829 26.375 193.151 26.375 191.4V103.168C11.061 97.7025 0 83.1916 0 66.0079C0 62.5072 1.38939 59.1499 3.86253 56.6746C6.33566 54.1993 9.68996 52.8086 13.1875 52.8086C16.685 52.8086 20.0393 54.1993 22.5125 56.6746C24.9856 59.1499 26.375 62.5072 26.375 66.0079C26.3815 69.5065 27.773 72.86 30.2447 75.3339C32.7165 77.8078 36.067 79.2005 39.5625 79.2071H109.646ZM211 33.0098V46.209C211 53.2103 208.221 59.9249 203.275 64.8755C198.329 69.8262 191.62 72.6075 184.625 72.6075H171.438V87.2833L118.688 68.4291V6.6114C118.688 0.73362 125.784 -2.21145 129.942 1.9463L141.185 13.211H163.286C167.782 13.211 173.074 16.4778 175.081 20.5077L178.031 26.4102H204.406C206.155 26.4102 207.832 27.1055 209.069 28.3432C210.305 29.5809 211 31.2595 211 33.0098ZM164.844 33.0098C164.844 31.7045 164.457 30.4286 163.733 29.3433C163.008 28.258 161.978 27.4121 160.773 26.9126C159.568 26.4131 158.243 26.2824 156.964 26.537C155.685 26.7917 154.51 27.4202 153.588 28.3432C152.665 29.2662 152.037 30.4421 151.783 31.7223C151.529 33.0025 151.659 34.3295 152.158 35.5354C152.657 36.7413 153.502 37.772 154.587 38.4972C155.671 39.2224 156.946 39.6094 158.25 39.6094C159.999 39.6094 161.676 38.9141 162.912 37.6764C164.149 36.4388 164.844 34.7601 164.844 33.0098Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex-col">
              <div className="flex gap-4">
                <Chip
                  label={dog.location}
                  type={ChipTypeStyles[dog.location] || ChipTypeStyles.Tag}
                />
                <div className="pt-2 flex justify-center">Male</div>
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

                  <div>Placement Camp:</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 shadow-xl rounded-lg text-md w-full text-left relative overflow-hidden bg-foreground p-8">
        <TabSection defaultTab="information">
          <div label="information">
            <div className="grid grid-cols-3">
              <div className="row space-y-8">
                <div className="col">
                  <div className="flex-col space-y-4">
                    <div className="text-lg">
                      <strong>Birth</strong>
                    </div>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-col space-y-4">
                    <div className="text-lg">
                      <strong>Family</strong>
                    </div>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                  </div>
                </div>
              </div>
              <div className="row space-y-8">
                <div className="col">
                  <div className="flex-col space-y-4">
                    <div className="text-lg">
                      <strong>Maternal Demeanor</strong>
                    </div>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-col space-y-4">
                    <div className="text-lg">
                      <strong>Housing</strong>
                    </div>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                  </div>
                </div>
              </div>
              <div className="row space-y-8">
                <div className="col">
                  <div className="flex-col space-y-4">
                    <div className="text-xl">
                      <strong>Feeding</strong>
                    </div>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                  </div>
                </div>
                <div className="col">
                  <div className="flex-col space-y-4">
                    <div className="text-xl">
                      <strong>Grooming</strong>
                    </div>
                    <div>text</div>
                    <div>text</div>
                    <div>text</div>
                  </div>
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
