import React, { useEffect, useState } from "react";
import DogSearchFilterBar from "./DogSearchFilterBar";
import { Chip, ChipTypeStyles } from "../Chip";
import TagDisplay from "../TagDisplay";
import dateUtils from "@/utils/dateutils";
import { useRouter } from "next/router";
import LoadingAnimation from "../LoadingAnimation";
import { Toast } from "../Toast";
import Image from "next/image";

function DogCard({ className, dog, onClick }) {
  return (
    <button
      className={"bg-white shadow p-4 flex rounded-lg z-10 text-start " + (className || "")}
      onClick={onClick || (() => {})}
    >
      <div className="flex w-[225px] h-[225px] items-center justify-center rounded-lg bg-primary-gray overflow-hidden">
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
          {/* dog.recentLogs.map(log => log.tags).flat() */}
          {dog.recentLogs.map(log => log.tags).flat().map((tag, i) => (
            <div key={i} className="mb-2">
              <Chip key={tag} label={tag} type={ChipTypeStyles.Tag} />
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}

/**
 * @returns { React.ReactElement } The DogTable component
 */
export default function CardDogTable() {
  const [searchFilter, setSearchFilter] = useState("");
  const [data, setData] = useState();

  const [filters, setFilters] = useState({});

  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let search = {};
    if (filters) {
      Object.keys(filters)
        .filter(
          (category) => category && Object.values(filters[category]).length > 0
        )
        .forEach((category) => {
          search[category] = Object.values(filters[category]);
        });
    }

    search.name = searchFilter;

    fetch("/api/dogs/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(search),
    })
      .catch(() => {
        setLoading(false);
        Toast({ success: false, message: "Unable to pull dog data." });
        setData([]);
      })
      .then((res) => res.json())
      .then((data) => { setData(data); setLoading(false); } );
  }, [searchFilter, filters]);

  const dogs = data ? data.data : [];

  const tags = Object.keys(filters)
    .map((filterGroup) =>
      Object.keys(filters[filterGroup]).map((element) =>
        filterGroup[element] == null ? (
          <></>
        ) : (
          {
            group: filterGroup,
            label: filters[filterGroup][element],
            index: element,
            type: ChipTypeStyles.Tag,
          }
        )
      )
    )
    .flat(1);

  const removeTag = (group, index) => {
    const newFilters = { ...filters };

    delete newFilters[group][index];
    setFilters(newFilters);
  };
  return (
    <>
      {<LoadingAnimation animated={false} loadText={false} />}
      <div className="flex-grow flex-col space-y-6 mb-8">
        <DogSearchFilterBar
          filters={filters}
          setFilters={setFilters}
          setSearch={setSearchFilter}
          simplified={true}
        />

        <TagDisplay tags={tags} removeTag={removeTag} />

        <div className="grid grid-cols-2 gap-4">
          {dogs.map((dog) => <DogCard key={dog._id} dog={dog} onClick={() => router.push(`/dogs/${dog._id}`)} />)}
        </div>
      </div>
    </>
  );
}
