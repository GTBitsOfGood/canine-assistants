import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import ReactSelectDropdown from "@/components/ReactSelectDropdown";
import { useEditDog } from "@/context/EditDogContext";
import { computeDefaultValues } from "@/utils/consts";
import DatePicker from "@/components/DatePicker";
import dateutils from "@/utils/dateutils";

export default function Test() {
  const test = ["one", "two", "three"];
  const { enums } = useEditDog();
  const submitDropdown = (data) => {
    console.log(data);
  };

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      caregivers: [{ value: "65175368edf55fb45e6d971d", label: "doe" }],
      parents: ["svsd", "sdsvd"],
      birthDate: new Date(),
    },
  });

  console.log(enums["caregivers"]);

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <ReactSelectDropdown
          control={control}
          name={"parents.1"}
          options={enums["parents"]}
          isDisabled
        />

        <button>weee</button>
        <DatePicker
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          control={control}
          name={"birthDate"}
        />
      </form>
    </div>
  );
}
