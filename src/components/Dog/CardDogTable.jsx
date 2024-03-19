import React from "react";
import { Chip, ChipTypeStyles } from "../Chip";
import dateUtils from "@/utils/dateutils";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState, useEffect } from 'react';
import { Tooltip } from "react-tooltip";
import dogplaceholdericon from "../../../public/dogplaceholdericon.svg";


/**
 * @returns the CardDogTable component
 */
export default function CardDogTable({ loading, dogs }) {
  const router = useRouter();

  return dogs.length > 0 ? (
    <div className="sm:grid flex sm:grid-cols-2 gap-4 sm:relative flex-col items-center">
      {dogs.map((dog) => <DogCard key={dog._id} dog={dog} onClick={() => router.push(`/dogs/${dog._id}`)} />)}
    </div>
  ) : (
    <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', marginTop: '40px' }}> {/* Adjust margin as needed */}
      No dogs were found
    </div>
  );
}

function DogCard({ className, dog, onClick }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the screen width is smaller than sm
    const isMobile = window.matchMedia('(max-width: 640px)').matches;
    setIsMobile(isMobile);
  }, []);
  const tags = dog.recentLogs.map(log => log.tags).flat()
  const maxTags = (isMobile ? 3 : 4);

  return (
    <button
      className={"z-10 bg-white shadow-md p-4 flex rounded-lg text-start sm:w-full w-11/12 sm:h-full h-[191px]" + (className || "")}
      onClick={onClick || (() => {})}
    >
      <div className="hidden sm:flex w-[240px] h-[240px] items-center justify-center rounded-lg bg-primary-gray overflow-hidden">
        {dog.image ? <Image alt={dog.name} width={350} height={350} src={dog.image} />
          : <Image width={200} height={200} src={dogplaceholdericon} alt="Dog Placeholder" />
        }
      </div>
      <div className="pl-1 py-0 sm:pl-8 pr-4 sm:py-4 flex-1 flex justify-between">
        <div className="flex flex-col">
          <div className="font-bold text-[22px] sm:text-[30px] sm:pb-4 pb-1">{dog.name}</div>
          {[
            ["Breed", dog.breed],
            ["Age", `${dateUtils.getAge(new Date(dog.dateOfBirth))} years`],
            ["Coat Color", dog.coatColor],
            ["Location", dog.location]
          ].map(([label, value], i) => (
            <div key={i} className="py-1 text-[12px] sm:text-[16px]">
              <label className="pr-2">{`${label}:`}</label>
              {value ?? "N/A"}
            </div>
          ))}
        </div>
        <div className="flex flex-col">
          {tags.length === 0 ? <></> : <div className="text-xs mt-6 my-2 sm:hidden font-medium">Recent Log Tags</div>}
          {tags.slice(0, (isMobile ? 3 : 4)).map((tag, i) => (
            <div key={i} className="mb-1 sm:mb-2">
              <Chip key={tag} label={tag} type={ChipTypeStyles.Tag} />
            </div>
          ))}
          {tags.length > (isMobile ? 3 : 4) && <>
            <Tooltip
              place="bottom"
              content={tags.slice(maxTags).join(", ")}
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