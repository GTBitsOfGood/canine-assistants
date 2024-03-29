import Select from "react-select";
import { Controller, useController } from "react-hook-form";

const BORDER_FOCUS_GRAY = "#404040";

export default function ReactSelectDropdown({
  control,
  options,
  name,
  isMulti = false,
  isDisabled,
  isError = false,
  isSearchable = true,
  styles,
}) {
  const { field } = useController({
    name,
    control,
  });

  const getCurrValues = (field) => {
    if (isMulti) {
      return field.value?.map((indValue) =>
        options?.find((option) => option.value === indValue)
      );
    } else {
      return options?.find((option) => option.value === field.value);
    }
  };

  const changeVal = (field, val) => {

    if (isMulti) {
      field.onChange(val.map((indVal) => indVal.value));
    } else {
      field.onChange(val.value);
    }
  };
  return (
    <Select
      {...field}
      isMulti={isMulti}
      options={options}
      value={getCurrValues(field)} // Set the default value
      onChange={(val) => changeVal(field, val)}
      onBlur={() => field.onBlur()}
      isDisabled={isDisabled}
      isSearchable={true}
      menuPlacement={"auto"}
      styles={{
        control: (provided, state) => ({
          ...provided,
          borderColor: isError ? "red" : (state.isFocused ? BORDER_FOCUS_GRAY : provided.borderColor),
          boxShadow: (isError || state.isFocused) ? "none" : provided.boxShadow,
          "&:hover": {
            ...provided["&:hover"],
            borderColor: isError ? "red" : (state.isFocused ? BORDER_FOCUS_GRAY : provided.borderColor),
            boxShadow: (isError || state.isFocused) ? "none" : provided.boxShadow,
          },
        }),
        option: (provided, state) => ({
          ...provided,
          borderRadius: 0,
          marginTop: 0,
          backgroundColor: state.isSelected ? '#ebebeb' : 'white',
          color: '#121212',
          zIndex: 999999
        }),
        menu: base => ({
          ...base,
          borderRadius: 0,
          zIndex: 9999999
        }),
        menuList: base => ({
          ...base,
          padding: 0,
          zIndex: 9999999
        })
      }}
    />
  );
}
