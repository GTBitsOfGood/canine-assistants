import TabSection from "@/components/TabSection";
import Card from "@/components/Card";
import PetmateCard from "@/components/PetmateCard";
import Link from "next/link";
import { mocks } from "@/utils/consts";

export const getServerSideProps = async (context) => {
  try {
    const id = context.params.id;

    // Temporary mock until backend added:
    const dog = mocks.mockDogs.find((dog) => dog._id === id);

    if (!dog) {
      return {
        redirect: {
          destination: "/dogs",
          permanent: false,
        },
      };
    }

    // TODO: Replace with API call as soon as it has been created in BE
    // await dbConnect();

    // let dog = await Dog.findById(id);

    // dog = JSON.parse(JSON.stringify(dog));

    return { props: { dog } };
  } catch (err) {
    console.log({ err });

    return {
      redirect: {
        destination: "/dogs",
        permanent: false,
      },
    };
  }
};

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
export default function IndividualDogPage({ dog }) {
  return (
    // Artificial spacing until nav is created
    <div className={`container mx-auto`}>
      <Link href="/dogs" className="text-red-800">
      Go Back
      </Link>
      <div className="pt-5 text-gray-800 border-t border-b border-gray-300 flex-grow">
        <div className="pl-3 grid sm:grid-cols-2 grid-cols-1 gap-4 lg:grid-cols-8">
          <div className="flex mr-24 col-span-2 lg:col-span-1 lg:row-span-1">
            <div className="text-gray-500 flex items-center text-3xl">
              {dog.name}
            </div>
          </div>

          <DogColumnProperty label="location" value={dog.location}/>
          <DogColumnProperty label="gender" value={dog.gender}/>
          <DogColumnProperty label="role" value={dog.rolePlacedAs}/>
          <DogColumnProperty label="breed" value={dog.breed}/>
          <DogColumnProperty label="weight" value={dog.weight + "lb"}/>
          <DogColumnProperty label="dob" value={(Date.now() - new Date(dog.dateOfBirth)).getFullYear() - 1970}/>
        </div>

        <TabSection defaultTab={"info"}>
          <div label="info">
            <div className="pl-3 text-lg text-gray-500 border-b border-gray-300">
              Petmates
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 lg:space-y-0 sm:space-x-3">
              <Card label="Behavior">{dog.behavior}</Card>
              <Card label="Medical">{dog.medical}</Card>
              <Card label="Demeanor">{dog.demeanor}</Card>
              <Card label="Other">{dog.other}</Card>
            </div>

            <div className="pt-8 pl-3 text-lg text-gray-500 border-b border-gray-300">
              General
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 lg:space-y-0 sm:space-x-3">
              <Card label="Toilet Area">{dog.toiletArea}</Card>
              <Card label="Medical">{dog.medical}</Card>
              <Card label="Demeanor">{dog.demeanor}</Card>
              <Card label="Other">{dog.other}</Card>
            </div>
          </div>
          <div
            label="logs"
            className="flex flex-col sm:flex-row space-y-3 lg:space-y-0 sm:space-x-3"
          >
            <Card label="Demeanor">{dog.demeanor}</Card>
          </div>
          <div label="relationships">
            <div className="pl-3 text-lg text-gray-500 border-b border-gray-300">
              Petmates
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 lg:space-y-0 sm:space-x-3">
              {dog.petmates.length > 0 ? (
                dog.petmates.map((petmate, i) => (
                  <PetmateCard
                    animal={petmate.animal}
                    age={petmate.age}
                    gender={petmate.gender}
                    key={i}
                  />
                ))
              ) : (
                <div className="text-gray-500 pl-3 pt-6">
                  No petmates found.
                </div>
              )}
            </div>
          </div>
        </TabSection>
      </div>
    </div>
  );
}
