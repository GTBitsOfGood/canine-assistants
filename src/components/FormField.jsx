import Input from "./Input";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import ReactSelectDropdown from "./ReactSelectDropdown";
import DatePicker from "./DatePicker";
import { useEditDog } from "@/context/EditDogContext";

export default function FormField({
  label,
  keyLabel,
  className,
  showLabel = true,
}) {
  const { isEdit, errors, control, multiselects, dateFields, enums } =
    useEditDog();

  const nonEditingStyles =
    "outline-none border-none bg-transparent shadow-none appearance-none";
  const editingStyles = `w-full ml-1 ${
    errors && errors[keyLabel] && "border-red-500 border-2"
  } focus:outline-none`;

  const FormInput = () => {
    // splits for example (parents.0 = parents)

    const formattedKey = keyLabel.includes(".")
      ? keyLabel.split(".")[0]
      : keyLabel;

    const isSelect = enums.hasOwnProperty(formattedKey);
    const isMultiSelect = multiselects.includes(formattedKey);
    const isDateField = dateFields.includes(formattedKey);
    const isTimeOnly = label === "Birth Time";

    if (isSelect && isEdit) {
      return (
        <ReactSelectDropdown
          name={keyLabel}
          control={control}
          options={enums[formattedKey]}
          isMulti={isMultiSelect}
        />
      );
    } else if (isDateField && isEdit) {
      return (
        <DatePicker control={control} name={keyLabel} isTimeOnly={isTimeOnly} />
      );
    } else {
      return (
        <Input
          disabled={!isEdit}
          className={isEdit ? editingStyles : nonEditingStyles}
          control={control}
          name={keyLabel}
          label={label}
          formattedKey={formattedKey}
          isSelect={isSelect}
          isMultiSelect={isMultiSelect}
        />
      );
    }
  };

  return (
    <div>
      <div className="flex whitespace-nowrap items-center">
        {label && <label>{label + ": "}</label>}
        <div className="w-full">
          <FormInput />
        </div>
      </div>
      <div className="w-full">
        {errors && errors[keyLabel] && (
          <div className="flex items-center gap-x-2">
            <ExclamationCircleIcon className="w-4 h-4" />
            <p role="alert">Please enter a valid {label.toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  );
}
