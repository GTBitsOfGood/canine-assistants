import useSWR from 'swr'

import DogTable from "@/components/DogTable";

const dogFetcher = (...args) => fetch(...args).then((res) => res.json())

/**
 * The main page for displaying Dogs
 *
 * @returns {React.ReactElement} The Dogs page
 */
export default function DogsPage() {
  const { _, data } = useSWR('/api/dogs', dogFetcher);

  if (!data) return <div>loading</div>
  if (!data.success) return <div>error</div>


  return (
    <div className={`pt-4 container mx-auto`}>
      <div className="pt-5 text-gray-800 order-b border-gray-300 flex-grow">
        <div className="flex">
          <DogTable dogs={data.data} />
        </div>
      </div>
    </div>
  );
}
