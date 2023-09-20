import Card from "./Card";

/**
 * Represents a Petmate of a Dog, and displays its relevant information
 * 
 * @param {{animal: string, age: number, gender: string}} param0
 * @returns
 */
export default function PetmateCard({ animal, age, gender }) {
  return (
    <Card>
      <div className="text-2xl text-gray-500">{animal}</div>
      <div className="text-gray-500 pt-8">
        <div className="flex justify-between pt-4">
          <div className="text-gray-400">Gender</div>
          <div>{gender}</div>
          <div></div>
        </div>
        <div className="flex justify-between pt-3">
          <div className="text-gray-400">Age</div>
          <div>{age}</div>
          <div></div>
        </div>
      </div>
    </Card>
  );
}
