import DogTable from "@/components/DogTable";

/**
 * The main page for displaying Dogs
 *
 * @returns {React.ReactElement} The Dogs page
 */
export default function DogsPage() {
  return (
    <div className={`pt-4 container mx-auto`}>
      <div className="pt-5 text-gray-800 order-b border-gray-300 flex-grow">
        <div className="flex">
          <DogTable/>
        </div>
      </div>
    </div>
  );
}
