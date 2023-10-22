import TabSection from "@/components/TabSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dateutils from "@/utils/dateutils";
import { Form, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import stringUtils from "@/utils/stringutils";
import { dogInformationSchema, computeDefaultValues } from "@/utils/consts";
import toast from "react-hot-toast";

import {
  ChevronLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Chip, ChipTypeStyles } from "@/components/Chip";
import Image from "next/image";
import maleicon from "../../../public/maleicon.svg";
import femaleicon from "../../../public/femaleicon.svg";
import dogplaceholdericon from "../../../public/dogplaceholdericon.svg";
import FormField from "@/components/FormField";
import { dogSchema } from "@/utils/consts";
/**
 *
 * @returns {React.ReactElement} The individual Dog page
 */
export default function IndividualDogPage() {
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(dogSchema.partial()),
    defaultValues: computeDefaultValues(null),
  });

  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      fetch(`/api/dogs/${router.query.id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          reset(computeDefaultValues(data.data));
        });
    }
  }, [router.query, reset]);

  if (!data || data === undefined || !data.success) {
    return <div>loading</div>;
  }

  const dog = data.data;

  const notify = (message, newDogName) => {
    if (message === "success") {
      toast(
        <>
          <span>
            <strong>{newDogName}</strong> was successfully updated.
          </span>
        </>,
        {
          style: {
            color: "white",
            backgroundColor: "green",
          },
        }
      );
    } else if (message === "failure") {
      toast.error("Unable to update!");
    }
  };

  const onEditSubmit = async (data) => {
    console.log(data, "bruh");
    const dataFormatted = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => value !== "N/A")
    );

    console.log(dataFormatted, "weee");

    const requestBody = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataFormatted),
    };

    try {
      const res = await (
        await fetch(`/api/dogs/${router.query.id}`, requestBody)
      ).json();

      if (!res.success) {
        throw new Error(res.message);
      }

      notify("success", res.data.name);
      setData(res);
      reset(computeDefaultValues(res.data));
      setIsEdit(false);
    } catch (err) {
      reset();
      notify("failure");
      setIsEdit(false);
    }
  };

  console.log(dog)


  return (
    // Artificial spacing until nav is created
    <div className={`container mx-auto order-b border-gray-300`}>
      <div className="py-6 flex items-center">
        <ChevronLeftIcon className="w-4 mr-2" />
        <Link href="/dogs" className="text-lg text-secondary-text">
          Return to dashboard
        </Link>
      </div>

      <form onSubmit={handleSubmit(onEditSubmit)}>
        <div className="flex gap-8">
          {dog.image ? (
            <Image alt="Dog" width={300} height={300} src={dog.image} />
          ) : (
            <>
              <div
                className={
                  "w-[300px] h-[300px] bg-primary-gray flex items-center justify-center rounded-lg"
                }
              >
                <Image
                  priority
                  src={dogplaceholdericon}
                  alt="Dog Placeholder"
                />
              </div>
              <div className="flex-col">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-4">
                    <Chip
                      label={dog.location}
                      type={ChipTypeStyles[dog.location] || ChipTypeStyles.Tag}
                    />
                    <div className="flex justify-center items-center space-x-2">
                      <Image
                        priority
                        src={dog.gender === "Male" ? maleicon : femaleicon}
                        alt="Male Dog"
                      />

                      <div>Male</div>
                    </div>
                  </div>
                </div>

                {!isEdit && (
                  <div className="pt-6 pl-1 font-bold text-3xl">{dog.name}</div>
                )}

                <div className="flex space-x-16">
                  <div className="flex-col pt-8 pl-1 text-lg space-y-2">
                    {isEdit && (
                      <FormField
                        className="h-min pl-1 font-bold text-3xl"
                        label="Name"
                        keyLabel={"name"}
                        errors={errors}
                        isEditing={isEdit}
                        value={dog.name}
                        register={register}
                        showLabel={false}
                      />
                    )}

                    <FormField
                      isEditing={isEdit}
                      label={"Birth Date"}
                      errors={errors}
                      keyLabel={"dateOfBirth"}
                      register={register}
                    >
                      {dateutils.getDateString(new Date(dog.dateOfBirth))}
                    </FormField>
                    <FormField
                      isEditing={isEdit}
                      register={register}
                      label={"Sex"}
                      errors={errors}
                      keyLabel={"gender"}
                      value={dog.gender}
                    />
                    <FormField
                      isEditing={isEdit}
                      register={register}
                      label={"Breed"}
                      errors={errors}
                      keyLabel={"breed"}
                      value={dog.breed}
                    />
                    <FormField
                      isEditing={isEdit}
                      register={register}
                      label={"Coat Color"}
                      errors={errors}
                      keyLabel={"coatColor"}
                      value={dog.coatColor || "N/A"}
                    />
                  </div>

                  <div className="flex-col pt-8 pl-1 text-lg space-y-2">
                    {dog.location === "Placed" ? (
                      <>
                        <FormField
                          isEditing={isEdit}
                          register={register}
                          errors={errors}
                          label={"Placement"}
                          keyLabel={"placement"}
                          value={"N/A"}
                        />
                        <FormField
                          isEditing={isEdit}
                          register={register}
                          errors={errors}
                          label={"Partner"}
                          keyLabel={"partner"}
                          value={"N/A"}
                        />
                        <FormField
                          isEditing={isEdit}
                          register={register}
                          errors={errors}
                          label={"Placement Camp"}
                          keyLabel={"placementCamp"}
                          value={"N/A"}
                        />
                      </>
                    ) : (
                      <>
                        <FormField
                          isEditing={isEdit}
                          register={register}
                          errors={errors}
                          label={"Housing"}
                          keyLabel={"housing"}
                          value={"N/A"}
                        />
                        <FormField
                          isEditing={isEdit}
                          register={register}
                          errors={errors}
                          label={"Instructors"}
                          keyLabel={"instructors"}
                          value={"N/A"}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isEdit ? (
                <div className="grow flex gap-4 justify-end items-center h-min">
                  <button
                    type="button"
                    className="flex justify-center space-x-2 h-min py-1 px-8 border-2 bg-white border-gray-200 rounded"
                    onClick={() => {
                      setIsEdit((isEdit) => !isEdit);
                      reset();
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center space-x-2 h-min bg-pink-800 text-white py-1 px-9 border-2 rounded"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="grow flex gap-4 justify-end">
                  <button
                    type="button"
                    className="flex justify-center space-x-2 h-min"
                    onClick={() => setIsEdit((isEdit) => !isEdit)}
                  >
                    <PencilSquareIcon className="h-5" />
                    Edit
                  </button>
                  <div className="flex justify-center space-x-2">
                    <TrashIcon className="h-5" />

                    <div>Delete</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mt-8 shadow-xl rounded-lg text-md w-full text-left relative overflow-hidden bg-foreground p-8">
          <TabSection defaultTab="information">
            <div label="information">
              <div
                className={`${
                  isEdit ? "w-5/6" : "w-2/3"
                } grid grid-cols-3 gap-16`}
              >
                {Object.keys(dogInformationSchema).map((category) => (
                  <div className="col" key={category}>
                    <div className="flex-col space-y-4 text-lg">
                      <div className="text-xl">
                        <strong>{category}</strong>
                      </div>

                      {Object.keys(dogInformationSchema[category]).map(
                        (col) => (
                          <FormField
                            key={col}
                            keyLabel={stringUtils.toCamelCase(col)}
                            isEditing={isEdit}
                            errors={errors}
                            register={register}
                            label={col}
                            value={"N/A"}
                          />
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div label="logs">logs</div>
          </TabSection>
        </div>
      </form>
    </div>
  );
}
