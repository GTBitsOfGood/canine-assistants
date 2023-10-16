import Input from "./Input";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

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
  return isEditing ? (
    <div className="flex whitespace-nowrap">
      {label && <label>{label + ": "}</label>}
      <div className="w-full">
        <Input
          type="text"
          {...(register && { ...register(keyLabel) })}
          disabled={value === "N/A"}
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
