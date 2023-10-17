import Input from "./Input";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { dogLabelToKey } from "@/utils/consts";
import { dogSchema } from "@/utils/consts";
import schemautils from "@/utils/schemautils";

export default function FormField({
  isEditing,
  errors,
  label,
  keyLabel,
  className,
  value = "default",
  register,
  showLabel = true,
  children,
}) {
  const getInputType = () => {
    if (schemautils.getZodType(dogSchema, keyLabel) === "ZodNumber") {
      return "number"; // right now dealing with numbers is also a bit wierd (we won't modify either)
    } else if (schemautils.getZodType(dogSchema, keyLabel) === "ZodString") {
      return "text";
    } else if (schemautils.getZodType(dogSchema, keyLabel) === "ZodEnum") {
      return "text";
    } else if (schemautils.getZodType(dogSchema, keyLabel) === "ZodDate") {
      return "text";
    } else {
      return "complex"; // this is temporary!! (we handle this next sprint)
    }
  };

  return isEditing ? (
    <div className="flex whitespace-nowrap">
      {label && <label>{label + ": "}</label>}
      <div className="w-full">
        <Input
          type={getInputType() === "complex" ? "text" : getInputType()}
          {...(register && { ...register(dogLabelToKey[label] || keyLabel) })}
          disabled={getInputType() === "complex" || getInputType() === "number"}
          className={`w-full ml-1 ${
            errors && errors[keyLabel] && "border-red-500 border-2"
          } focus:outline-none`}
        />
        {errors && errors[keyLabel] && (
          <div className="flex items-center gap-x-2">
            <ExclamationCircleIcon className="w-4 h-4" />
            <p role="alert">Please enter a valid {label.toLowerCase()}</p>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div>
      {showLabel && label && <label>{label + ": "}</label>}
      <span className={className}>{children || value}</span>
    </div>
  );
}
