//import DogTable from "@/components/Dog/DogTable";
//import CardDogTable from "@/components/Dog/CardDogTable";
import React, { useEffect, useState } from "react";
import DogSearchFilterBar from "@/components/Dog/DogSearchFilterBar";
import { ChipTypeStyles } from "@/components/Chip";
import TagDisplay from "@/components/TagDisplay";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Toast } from "@/components/Toast";
import DogTable from "@/components/Dog/DogTable";
import CardDogTable from "@/components/Dog/CardDogTable";

/**
 * The main page for displaying Dogs
 *
 * @returns {React.ReactElement} The Dogs page
 */

/**
 * @returns { React.ReactElement } The DogTable component
 */
export default function DogsPage() {
  const [searchFilter, setSearchFilter] = useState("");
  const [data, setData] = useState();

  const [filters, setFilters] = useState({});

  const [loading, setLoading] = useState(true);

  const [limitedAssociation, setLimitedAssociation] = useState(null);

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

  if (limitedAssociation === null && dogs.length > 0) {
    setLimitedAssociation(dogs[0].association === "Volunteer/Partner");
  }

  return (
    <div className={`pt-4 container mx-auto`}>
      <div className="sm:pt-5 text-gray-800 order-b border-gray-300 flex-grow">
        <div className="flex">
          {<LoadingAnimation animated={false} loadText={false} />}
          <div className="flex-grow flex-col space-y-6">
            <DogSearchFilterBar
              filters={filters}
              setFilters={setFilters}
              setSearch={setSearchFilter}
              simplified={limitedAssociation}
            />

            <TagDisplay tags={tags} removeTag={removeTag}  />

            {loading && <LoadingAnimation />}

            {!loading && limitedAssociation && <CardDogTable
                loading={loading}
                dogs={dogs}
            />}

            {!loading &&  !limitedAssociation && <DogTable
                loading={loading}
                dogs={dogs}
            />}
          </div>
        </div>
      </div>
    </div>
  );
}
