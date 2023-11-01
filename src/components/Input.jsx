import React, { useEffect } from "react";
import { useController } from "react-hook-form";
import { useEditDog } from "@/context/EditDogContext";
import dateutils from "@/utils/dateutils";

const Input = React.forwardRef(
  (
    {
      className = "",
      name,
      control,
      isSelect,
      isMultiSelect,
      formattedKey,
      label,
      ...rest
    },
    ref
  ) => {
    const { enums, isEdit } = useEditDog();


    const { field } = useController({
      name,
      control,
    });


    if (formattedKey === "partner") {
      console.log(name, "name");
      console.log(formattedKey, "formatted");
      console.log(field, "fieldss");
    }

    const getDisplayValue = (val) => {
      if (isSelect && isMultiSelect && Array.isArray(val)) {
        return val
          .map(
            (indVal) =>
              enums[formattedKey].find((option) => option.value === indVal)
                ?.label || ""
          )
          .join(", ");
      } else if (isSelect && enums[formattedKey]) {
        const option = enums[formattedKey].find(
          (option) => option.value === val
        );
        return option ? option.label : "";
      } else {
        if (label === "Birth Time") {
          return dateutils.getTimeString(new Date(val));
        } else if (label === "Birth Date") {
          return dateutils.getDateString(new Date(val));
        } else {
          return val;
        }
      }
    };

    // if it is not defined, then it will show N/A!
    if (
      (field.value === undefined ||
        (Array.isArray(field.value) && field.value.length === 0)) &&
      !isEdit
    ) {
      return <span className={`text-neutral-700 pl-2 font-normal`}>N/A</span>;
    }

    return (
      <input
        {...field}
        value={getDisplayValue(field.value)}
        ref={ref}
        {...rest}
        className={`rounded bg-foreground border border-neutral-300 text-neutral-700 text-lg p-1 pl-2 font-normal ${className}`}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
