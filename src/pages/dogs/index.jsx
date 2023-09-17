import { Inter } from "next/font/google";
import DogTable from "@/components/DogTable";
import { mocks } from "@/utils/consts";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps = async (context) => {
  try {
    // await dbConnect();

    // Retrieve all dogs
    // const findResult = await Dog.find({})//.populate("recentLogs");

    // This snippet will be used as soon as backend access has been added
    // const dogs = findResult.map((document) => {
    //   return JSON.parse(JSON.stringify(document));
    // });

    return { props: { dogs: mocks.mockDogs } };
  } catch (err) {
    return { props: { dogs: undefined } };
  }
};

/**
 * The main page for displaying Dogs
 * 
 * - dogs: A list of Dog models
 * 
 * @param {{ dogs: [Array] }} 
 * @returns {React.ReactElement} The Dogs page
 */
export default function DogsPage({ dogs }) {
  return (
    <div className={`pt-32 ${inter.className} container mx-auto`}>
      <div className="pt-5 text-gray-800 order-b border-gray-300 flex-grow">
        <div className="flex">
          <DogTable dogs={dogs} />
        </div>
      </div>
    </div>
  );
}
