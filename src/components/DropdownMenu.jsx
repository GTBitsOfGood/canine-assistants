import {
  CheckIcon,
  ChevronDownIcon,
  StopIcon as StopIconSolid,
} from "@heroicons/react/24/solid";
import { StopIcon as StopIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

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
 *                    radioButtons: Boolean - uses radio buttons instead of checkboxes when true }
 * @returns HTML dropdown menu component
 */
export default function DropdownMenu({
  label,
  options,
  selectedOptions,
  onFilterSelect,
  submitFilters,
  children,
  props
}) {
  const [extended, setExtended] = useState(false);

  const [enabledOptions, setEnabledOptions] = useState(selectedOptions || {});

  const toggleOption = (option, index) => {
    const newEnabledOptions = {...enabledOptions};

    if (newEnabledOptions[index] !== undefined) {
      delete newEnabledOptions[index];
    } else {
      newEnabledOptions[index] = option.props.label; 
    }

    if (props?.hideFilterButton) {
      onFilterSelect(newEnabledOptions);
    }

    setEnabledOptions(newEnabledOptions);
  };

  const handleSubmit = () => {
    submitFilters(enabledOptions);

    setExtended(false);
  }

  const handleChange = (event) => {
    onFilterSelect({ [event.key]: event.props.label });

    if (props?.radioButtons) {
      setExtended(false);
    }
  }

  return (
    <div className="relative">
      <button
        type="button"
        id="dropdownMenu"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        className={`px-4 py-2.5 m-0 p-0 box-border whitespace-nowrap top-[-1px] bg-white ${
          extended
            ? "border-t border-x rounded-t border-b-transparent"
            : " rounded"
        } border ${props?.error ? "border-error-red" : "border-neutral-300"}  items-center gap-2 flex w-48 justify-between`}
        onClick={() => {
          if (extended) {
            setExtended(false);
            
            setEnabledOptions(selectedOptions || []);
          } else {
            setExtended(true);
          }
        }}
      >
        <div className="text-primary-text text-base font-medium">{label}</div>
        <div className="w-4">
          <ChevronDownIcon />
        </div>
      </button>

      <div
        className={(extended ? "" : "hidden") + " absolute w-full z-50"}
        aria-labelledby="dropdownMenu"
      >
        {children.map((option, index) => {
          return (
            <div
              className={`w-full px-3 pb-2 whitespace-nowrap bg-white border-x border-neutral-300 justify-start items-center gap-2 inline-flex
              }`}
              href="#"
              key={index}
            >
              <button
                onClick={() => {
                  props?.radioButtons ? handleChange(option) : toggleOption(option, index)
                }}
                className="relative  p-0 m-0 flex items-center"
              >
                {/* TODO PARKER fix behavior for radio buttons */}
                {enabledOptions[index] !== undefined ? (
                  <>
                    {props?.radioButtons ? (
                      <>
                        {/* TODO PARKER fix colors */}
                        <svg height="20" width="20">
                          <circle cx="10" cy="10" r="8" stroke="gray" strokeWidth="2" fill="pink" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <StopIconSolid className="h-8 text-ca-pink" />
                        <CheckIcon className="pl-2 absolute h-4 text-foreground" />
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {props?.radioButtons ? (
                      <>
                        {/* TODO PARKER fix colors */}
                        <svg height="20" width="20">
                          <circle cx="10" cy="10" r="8" stroke="gray" strokeWidth="2" fill="white" />
                        </svg>
                      </>
                    ) : (
                      <>
                        <StopIconOutline className="h-8 text-primary-gray" />
                      </>
                    )}
                  </>
                )}
              </button>
              <div className="text-primary-text text-base font-medium">
                {option}
              </div>
            </div>
          );
        })}

        {props?.hideFilterButton ? null :
          (
            <div className="justify-center w-full px-3 pt-2 pb-4 whitespace-nowrap bg-white border-x border-b rounded-b border-neutral-300 justify-start items-center gap-2 inline-flex">
              <button onClick={() => handleSubmit()} className="bg-secondary-gray border border-primary-gray mx-1.5 rounded w-full pt-2 pb-2">
                Apply Filters
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
}
