import { consts } from "@/utils/consts";
import { useRouter } from "next/router";
import Dog from "../../../server/db/models/Dog";
import mongoose from "mongoose";
import dbConnect from "../../../server/db/dbConnect";
import { redirect } from "next/dist/server/api-utils";
import { Inter } from "next/font/google";
import TabSection from "@/components/TabSection";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (context) => {
  try {
    const id = context.params.id;

    // TODO: Replace with API call as soon as it has been created in BE
    await dbConnect();

    let dog = await Dog.findById(id);

    dog = JSON.parse(JSON.stringify(dog));

    return { props: { dog } };
  } catch (err) {
    return {
      redirect: {
        destination: "/dogs",
        permanent: false,
      },
    };
  }
};

export default function IndividualDogPage({ dog }) {
  return (
    // Artificial spacing until nav is created
    <div className={`pt-64 ${inter.className} container mx-auto`}>
      <div className="pt-5 text-gray-800 border-t border-b border-gray-300 flex-grow">
        <div className="pl-3 flex">
          <div className="flex mr-24">
            <div className="text-gray-500 flex items-center text-3xl justify-left">
              {dog.name}
            </div>
          </div>

          <div className="text-gray-600 pt-1 text-lg mr-24">
            <div className="text-sm text-gray-400">LOCATION</div>

            <div>{dog.location}</div>
          </div>
          <div className="text-gray-600 text-lg mr-24">
            <div className="flex-col pt-1 items-center">
              <div className="text-sm text-gray-400">GENDER</div>
              <div>{dog.gender}</div>
            </div>
          </div>
          <div className="text-gray-600 text-lg mr-24">
            <div className="flex-col pt-1 items-center">
              <div className="text-sm text-gray-400">BREED</div>
              <div>{dog.breed}</div>
            </div>
          </div>
          <div className="text-gray-600 text-lg">
            <div className="flex-col pt-1 items-center">
              <div className="text-sm text-gray-400">DOB</div>
              <div>{new Date(dog.dateOfBirth).toLocaleDateString("en-US")}</div>
            </div>
          </div>
        </div>

        <TabSection defaultTab={"info"}>
          <div label="info">A</div>
          <div label="logs">B</div>
          <div label="relationships">C</div>
        </TabSection>
      </div>
    </div>
  );
}
