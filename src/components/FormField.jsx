export default function FormField({
  isEditing,
  label,
  className,
  value = "default",
  register,
  showLabel = true,
  children,
}) {
  return isEditing ? (
    <div>
      {label && <label>{label + ": "}</label>}
      <input
        type="text"
        defaultValue={children || value}
        {...(register && { ...register(label) })}
      />
    </div>
  ) : (
    <div>
      {showLabel && label && <label>{label + ": "}</label>}
      <span className={className}>{children || value}</span>
    </div>
  );
}
