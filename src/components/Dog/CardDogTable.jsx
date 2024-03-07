import React from "react";
import { Chip, ChipTypeStyles } from "../Chip";
import dateUtils from "@/utils/dateutils";
import { useRouter } from "next/router";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import dogplaceholdericon from "../../../public/dogplaceholdericon.svg";


/**
 * @returns the CardDogTable component
 */
export default function CardDogTable({ loading, dogs }) {
  const router = useRouter();

  return dogs.length > 0 ? (
    <div className="grid grid-cols-2 gap-4 relative">
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
  const maxTags = 4;

  return (
    <button
      className={"bg-white shadow p-4 flex rounded-lg text-start " + (className || "")}
      onClick={onClick || (() => {})}
    >
      <div className="flex w-[240px] h-[240px] items-center justify-center rounded-lg bg-primary-gray overflow-hidden">
        {dog.image ? <Image alt={dog.name} width={350} height={350} src={dog.image} />
          : <Image width={200} height={200} src={dogplaceholdericon} alt="Dog Placeholder" />
        }
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
          {tags.length > maxTags && <>
            <Tooltip
              place="bottom"
              content={tags.slice(4).join(", ")}
              id={dog._id}
              style={{ borderRadius: "1", color: "#121212", fontFamily: "Maven Pro", padding: "4px 7px", backgroundColor: "#FFF" }}
              border="1px solid #D4D4D4"
            />
            <div className="self-start" data-tooltip-id={dog._id}>{`+${tags.length - maxTags}`}</div>
          </>}
        </div>
      </div>
    </button>
  );
}