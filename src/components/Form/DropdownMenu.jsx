import {
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  StopIcon as StopIconSolid,
} from "@heroicons/react/24/solid";
import { StopIcon as StopIconOutline } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import useClickOff from "@/hooks/useClickOff";
import CircleIcon from "../Icons/CircleIcon";

/**
 * Individual option for Dropdown menu component to be used with a map
 * @param {*} name option for internal use
 * @param {*} label option to be shown to the user
 * @returns an HTML component with the label
 */
export function DropdownMenuOption({ name, label }) {
  return <>{label}</>;
}

/**
 * Dropdown menu component with checkboxes to be used with DropdownMenuOptions
 * @param {*} label label when the dropdown menu is closed
 * @param {*} selectOptions options selected on open in form of dictionary with index as key
 * @param {*} onFilterSelect function called whenever an option is selected when filter button is hidden
 * @param {*} submitFilters function called when the filter button is pressed
 * @param {*} props { hideFilterButton: Boolean - hides filter button when true,
 *                    hideCheckboxes: Boolean - shows options with border instead of checkbox,
 *                    singleSelect: Boolean - only allows for one option to be selected,
 *                    selectedColor: String - either style from ChipTypeStyles or the word "concern"
 *                                            for the concern array ONLY when checkboxes are hidden
 *                    error: Boolean - shows error state when true,
 *                    requiredField: Boolean - when true adds red * after label }
 * @returns HTML dropdown menu component
 */
export default function DropdownMenu({
  label,
  selectedOptions,
  onFilterSelect,
  submitFilters,
  children,
  props,
}) {
  const [extended, setExtended] = useState(props?.extended);
  const [enabledOptions, setEnabledOptions] = useState(selectedOptions || {});
  const dropdownRef = useRef(null);
  const dropdownOptionRefs = useRef([]);

  useClickOff(
    dropdownRef,
    () => {
      closeMenu();
    },
    dropdownOptionRefs.current
  );

  const closeMenu = () => {
    setExtended(false);

    setEnabledOptions(selectedOptions || []);
  };

  const toggleOption = (option, index) => {
    let newEnabledOptions;

    if (props?.singleSelect) {
      newEnabledOptions = {};
    } else {
      newEnabledOptions = { ...enabledOptions };
    }

    if (newEnabledOptions[index] !== undefined) {
      delete newEnabledOptions[index];
    } else {
      newEnabledOptions[index] = option.props.label;
    }

    if (props?.hideFilterButton) {
      onFilterSelect(newEnabledOptions);
    }

    if (props?.singleSelect && props?.hideFilterButton) {
      setExtended(false);
    }

    if (props?.hideFilterButton) {
      onFilterSelect(newEnabledOptions);
    }

    setEnabledOptions(newEnabledOptions);
  };

  const handleSubmit = () => {
    submitFilters(enabledOptions);

    setExtended(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        id="dropdownMenu"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        className={`px-4 py-2.5 m-0 p-0 box-border whitespace-nowrap top-[-1px] bg-white ${
          extended
            ? "rounded-t border-b-transparent "
            : " rounded"
        } border -mb-[1px] ${
          props?.error ? "border-error-red" : "border-primary-gray"
        }  items-center gap-2 flex w-48 justify-between`}
        onClick={() => {
          if (extended) {
            closeMenu();
          } else {
            setExtended(true);
          }
        }}
      >
        <div className="text-primary-text text-sm font-medium">
          {label}
          {props?.requiredField ? (
            <span className="text-error-red">*</span>
          ) : null}
        </div>
        <div className="w-4">
          <ChevronDownIcon className="fill-primary-text" />
        </div>
      </button>

      <div
        className={(extended ? "" : "hidden") + " absolute w-full z-50"}
        aria-labelledby="dropdownMenu"
      >
        {children.map((option, index) => {
          return (
            <div
              ref={(ref) => {
                if (ref) dropdownOptionRefs.current[index] = ref;
              }}
              className={`w-full px-3 pb-4 whitespace-nowrap bg-white border-x border-primary-gray justify-start items-center gap-2 inline-flex`}
              href="#"
              key={index}
            >
              <button
                onClick={() => {
                  toggleOption(option, index);
                }}
                className="relative  p-0 m-0 flex items-center"
                type="button"
              >
                {enabledOptions[index] !== undefined ? (
                  <>
                    {props?.singleSelect ? (
                      <div className="w-5">
                        {/* <CircleIcon
                          className={"border-2 border-neutral-300"}
                          size={"1.25rem"}
                          color={""}
                        /> */}
                        <CheckCircleIcon className="text-ca-pink h-[1.5385rem] -ml-[0.15rem] " />
                      </div>
                    ) : (
                      // <CircleIcon
                      //   className={"border-2 border-neutral-300"}
                      //   size={"1.25rem"}
                      //   color={""}
                      // />
                      <div className="flex items-center justify-between mx-1.5 ">
                        {/* <StopIconOutline className=" h-8 text-primary-gray" /> */}
                        <CheckIcon className="pl-[0.14rem] absolute h-4 text-foreground"/>
                        <div className="w-5 h-5 px-2 py-1.5 bg-ca-pink rounded " />
                      </div>
                    )}
                  </>
                ) : props?.hideCheckboxes ? (
                  <div className="px-2 py-1.5 bg-white rounded-lg border border-primary-gray justify-center items-start">
                    <div className="text-primary-text text-sm font-medium">
                      {option}
                    </div>
                  </div>
                ) : (
                    props?.singleSelect ? (
                      <CircleIcon
                        className={"border-2 border-neutral-300"}
                        size={"1.25rem"}
                        color={""}
                      />
                    ) : (
                        <>
                        <div className="mx-1.5  w-5 h-5 px-2 py-1.5 bg-white rounded border-2 border-neutral-300" />
                      </>
                    )
                  
                )}
              </button>
              {props?.hideCheckboxes ? null : (
                <div className={`text-primary-text text-sm font-medium`}>
                  {option}
                </div>
              )}
            </div>
          );
        })}

        {props?.hideFilterButton ? (
          <div className="justify-center w-full pt-1 pb-4 whitespace-nowrap bg-white border-x border-b rounded-b border-neutral-300 items-center gap-2 inline-flex"></div>
        ) : (
          <div className="justify-center w-full px-3 pt-2 pb-4 whitespace-nowrap bg-white border-x border-b rounded-b border-neutral-300 items-center gap-2 inline-flex">
              <button
                type="button"
                onClick={() => handleSubmit()}
                className="bg-secondary-gray border border-primary-gray mx-1.5 rounded w-full pt-2 pb-2 font-medium"
            >
              {props?.filterText ? props.filterText : "Apply Filters"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
