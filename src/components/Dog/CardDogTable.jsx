import React from "react";
import { Chip, ChipTypeStyles } from "../Chip";
import dateUtils from "@/utils/dateutils";
import { useRouter } from "next/router";
import Image from "next/image";

/**
 * @returns the CardDogTable component
 */
export default function CardDogTable({ loading, dogs }) {
  const router = useRouter();
  console.log(dogs);

  return dogs.length > 0 ? (
    <div className="grid grid-cols-2 gap-4">
      {dogs.map((dog) => <DogCard key={dog._id} dog={dog} onClick={() => router.push(`/dogs/${dog._id}`)} />)}
    </div>
  ) : (
    <div>
      No dogs were found
    </div>
  );
}

function DogCard({ className, dog, onClick }) {
  const tags = dog.recentLogs.map(log => log.tags).flat()

  return (
    <button
      className={"bg-white shadow p-4 flex rounded-lg z-10 text-start " + (className || "")}
      onClick={onClick || (() => {})}
    >
      <div className="flex w-[240px] h-[240px] items-center justify-center rounded-lg bg-primary-gray overflow-hidden">
        {dog.image && <Image alt={dog.name} width={350} height={350} src={dog.image} />}
      </div>
      <div className="pl-8 pr-4 py-4 flex-1 flex justify-between">
        <div className="flex flex-col">
          <div className="font-bold text-3xl pb-4">{dog.name}</div>
          {[
            ["Breed", dog.breed],
            ["Age", `${dateUtils.getAge(new Date(dog.dateOfBirth))} years`],
            ["Coat Color", dog.coatColor],
            ["Location", dog.location]
          ].map(([label, value], i) => (
            <div key={i} className="py-1">
              <label className="pr-2">{`${label}:`}</label>
              {value ?? "N/A"}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {tags.slice(0, 4).map((tag, i) => (
            <div key={i} className="mb-2">
              <Chip key={tag} label={tag} type={ChipTypeStyles.Tag} />
            </div>
          ))}
          {tags.length > 4 && "+1"}
        </div>
      </div>
    </button>
  );
}