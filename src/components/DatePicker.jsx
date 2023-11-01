import React from "react";
import { useController } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dateutils from "@/utils/dateutils";

export default function DatePicker({
  name,
  control,
  isTimeOnly,
  selectsRange,
  ...rest
}) {
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="rounded bg-foreground border border-neutral-300 text-neutral-700 text-lg p-1 px-2 font-normal"
      onClick={onClick}
      type="button"
      ref={ref}
    >
      {value}
    </button>
  ));

  CustomInput.displayName = "CustomInput";

  const { field } = useController({
    name,
    control,
  });

  const { onBlur, onChange, ref } = field;

  const getProps = () => {
    // Common props that both date pickers share
    const commonProps = {
      ...rest,
      onBlur,
      onChange,
      ref,
      name,
      selected: field.value ? new Date(field.value) : null,
      dateFormat: "MMMM d, yyyy",
      customInput: <CustomInput />,
    };

    // Props specific to the time-only picker
    if (isTimeOnly) {
      return {
        ...commonProps,
        showTimeSelect: true,
        showTimeSelectOnly: true,
        timeIntervals: 15,
        timeCaption: "Time",
        dateFormat: "h:mm aa",
      };
    }


    // Props for the date picker when `isTimeOnly` is false
    return commonProps;
  };

  return <ReactDatePicker {...getProps()} />;
}
