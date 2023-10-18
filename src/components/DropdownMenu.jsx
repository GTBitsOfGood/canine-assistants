import {
  CheckIcon,
  ChevronDownIcon,
  StopIcon as StopIconSolid,
} from "@heroicons/react/24/solid";
import { StopIcon as StopIconOutline } from "@heroicons/react/24/outline";
import { useState } from "react";

export function DropdownMenuOption({ name, label }) {
  return <>{label}</>;
}

export default function DropdownMenu({
  label,
  selectedOptions,
  submitFilters,
  children,
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

    setEnabledOptions(newEnabledOptions);
  };

  const handleSubmit = () => {
    submitFilters(enabledOptions);

    setExtended(false);

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
        } border border-neutral-300  items-center gap-2 flex w-48 justify-between`}
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
                onClick={() => toggleOption(option, index)}
                className="relative  p-0 m-0 flex items-center"
              >
                {enabledOptions[index] !== undefined ? (
                  <>
                    <StopIconSolid className=" h-8 text-ca-pink" />
                    <CheckIcon className="pl-2 absolute h-4 text-foreground" />
                  </>
                ) : (
                  <>
                    <StopIconOutline className=" h-8 text-primary-gray" />
                  </>
                )}
              </button>
              <div className="text-primary-text text-base font-medium">
                {option}
              </div>
            </div>
          );
        })}

        <div className="justify-center w-full px-3 pt-2 pb-4 whitespace-nowrap bg-white border-x border-b rounded-b border-neutral-300 justify-start items-center gap-2 inline-flex">
          <button onClick={() => handleSubmit()} className="bg-[#EBEBEB] border border-primary-gray mx-1.5 rounded w-full pt-2 pb-2">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
