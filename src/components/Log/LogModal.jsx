import React, { useEffect, useRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { consts, logSchema } from "@/utils/consts";
import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";
import { Chip, ChipTypeStyles } from "../Chip";

/**
 * Modal for creating a new log
 * @param {*} dogId string id of dog associated with the log
 * @param {*} userId string id of user creating the log
 * @param {*} onClose function that is called when the log needs to be closed
 * @param {*} onSubmit function that is called when the user tries to save the log
 * @returns the modal component
 */
export default function LogModal({ dogId, userId, onClose, onSubmit }) {
  const [logData, setLogData] = useState({
    title: "",
    topicSet: {},
    severitySet: {},
    tagsSet: {},
    description: "",
  });

  const [errors, setErrors] = useState({
    title: false,
    topic: false,
    severity: false,
    description: false,
  });

  const [saving, setSaving] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      modalRef.current.scrollTop = modalRef.current.scrollHeight;
    };

    modalRef.current
      .querySelector("textarea")
      .addEventListener("click", scrollToBottom);

    return () => {
      document.removeEventListener("click", scrollToBottom);
    };
  });

  const saveLog = (logData) => {
    const formattedData = {
      title: logData.title,
      topic: Object.values(logData.topicSet)[0],
      severity: Object.values(logData.severitySet)[0],
      tags: Object.values(logData.tagsSet),
      description: logData.description,
      dog: dogId,
      author: userId,
    };

    const { success, error, data } = logSchema.safeParse(formattedData);

    if (success) {
      setSaving(true);
      fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })
        .then((res) => {
          onSubmit(true);
          onClose();
          setSaving(false);
        })
        .catch((err) => {
          setSaving(false);
          onSubmit(false);
        });
    } else {
      const errorsArray = error.format();
      const errorsObject = {};

      for (let err in errorsArray) {
        if (err != "_errors") {
          errorsObject[err] = true;
        }
      }

      setErrors({ ...errors, ...errorsObject });
    }
  };

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-10">
      <div
        onClick={() => onClose()}
        className="fixed inset-0 bg-modal-background-gray opacity-60"
      ></div>
      <div
        ref={modalRef}
        className="modal-shadow-mobile sm:modal-shadow bg-white sm:bg-secondary-background px-5 sm:px-12 py-4 sm:py-9 w-full sm:w-auto h-[90%] sm:h-auto sm:min-h-[70vh] sm:max-h-[95vh] z-10 overflow-auto rounded-t-[50px] sm:rounded-t-none"
      >
        {/* TODO add behavior for dragging downwards to close the modal on mobile */}
        <div className="sm:hidden w-8 h-1 opacity-40 bg-zinc-500 rounded-[100px] mx-auto mb-[12px]" />
        <h1 className="mb-[3vh]"> Add a log</h1>
        <h2 className="h-[5vh]">
          Title<span className="text-error-red">*</span>
        </h2>
        <div className="mb-[3vh]">
          <input
            value={logData.title}
            onChange={(event) => {
              setLogData({ ...logData, title: event.target.value });
              setErrors({ ...errors, title: false });
            }}
            className={`rounded bg-foreground border ${
              errors.title ? "border-error-red" : "border-primary-gray"
            } focus:border-primary-gray focus:border text-secondary-text text-lg font-normal w-full h-11 px-4 py-2.5`}
          ></input>
          {errors.title ? (
            <div className="flex items-center gap-[5px] text-black text-lg font-normal">
              <div className="h-4 w-4 fill-slate-900">
                <ExclamationCircleIcon />
              </div>
              Please enter a title
            </div>
          ) : null}
        </div>

        <h2 className="h-[5vh]">
          Tags<span className="text-error-red">*</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-[3vw]">
          <div
            className={`flex ${
              errors.topic ? "flex-col" : "flex-row"
            } sm:flex-col justify-between sm:justify-normal`}
          >
            <DropdownMenu
              label={"Topic"}
              props={{
                hideFilterButton: true,
                singleSelect: true,
                requiredField: true,
                selectedColor: ChipTypeStyles["Topic"],
                error: errors.topic,
              }}
              selectedOptions={logData.topicSet}
              onFilterSelect={(data) => {
                if (data !== undefined) {
                  setLogData({ ...logData, topicSet: data });
                  setErrors({ ...errors, topic: false });
                }
              }}
            >
              {consts.topicArray.map((topic, index) => (
                <DropdownMenuOption
                  key={index}
                  label={topic}
                  name={topic.replaceAll(" ", "").toLowerCase()}
                />
              ))}
            </DropdownMenu>
            {errors.topic ? (
              <div className="flex items-center gap-[5px] text-black text-lg font-normal">
                <div className="h-4 w-4 fill-slate-900">
                  <ExclamationCircleIcon />
                </div>
                Please select a topic
              </div>
            ) : null}
            {Object.keys(logData.topicSet).length ? (
              <div className="self-center sm:self-start sm:mt-[1vh]">
                <Chip
                  label={Object.values(logData.topicSet)[0]}
                  type={ChipTypeStyles["Topic"]}
                />
              </div>
            ) : null}
          </div>

          <div
            className={`flex ${
              errors.topic ? "flex-col" : "flex-row"
            } sm:flex-col justify-between sm:justify-normal`}
          >
            <DropdownMenu
              label={"Severity"}
              props={{
                hideFilterButton: true,
                singleSelect: true,
                requiredField: true,
                smallText: true,
                selectedColor: "concern",
                error: errors.severity,
              }}
              selectedOptions={logData.severitySet}
              onFilterSelect={(data) => {
                if (data !== undefined) {
                  setLogData({ ...logData, severitySet: data });
                  setErrors({ ...errors, severity: false });
                }
              }}
            >
              {consts.concernArray.map((concern, index) => (
                <DropdownMenuOption
                  key={index}
                  label={concern}
                  name={concern.replaceAll(" ", "").toLowerCase()}
                />
              ))}
            </DropdownMenu>
            {errors.severity ? (
              <div className="flex items-center gap-[5px] text-black text-lg font-normal">
                <div className="h-4 w-4 fill-slate-900">
                  <ExclamationCircleIcon />
                </div>
                Please select a severity
              </div>
            ) : null}
            {Object.keys(logData.severitySet).length ? (
              <div className="self-center sm:self-start sm:mt-[1vh]">
                <Chip
                  label={Object.values(logData.severitySet)[0]}
                  type={ChipTypeStyles[Object.values(logData.severitySet)[0]]}
                />
              </div>
            ) : null}
          </div>

          <div className="flex flex-row sm:flex-col justify-between sm:justify-normal">
            <DropdownMenu
              label="Tags"
              props={{
                hideFilterButton: true,
                selectedColor: ChipTypeStyles["Tag"],
              }}
              selectedOptions={logData.tagsSet}
              onFilterSelect={(data) => {
                if (data !== undefined) {
                  setLogData({ ...logData, tagsSet: data });
                }
              }}
            >
              {consts.tagsArray.map((tag, index) => (
                <DropdownMenuOption
                  key={index}
                  label={tag}
                  name={tag.replaceAll(" ", "").toLowerCase()}
                />
              ))}
            </DropdownMenu>
            <div className="flex flex-wrap justify-end sm:justify-start w-48 mt-[1vh] gap-[1vh] min-h-[8vh]">
              {Object.keys(logData.tagsSet).length
                ? Object.values(logData.tagsSet).map((value, index) => {
                    return (
                      <Chip
                        key={index}
                        label={value}
                        type={ChipTypeStyles["Tag"]}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>

        <h2 className="h-[5vh]">
          Log Description<span className="text-error-red">*</span>
        </h2>
        <div className="mb-[3vh]">
          <textarea
            value={logData.description}
            onChange={(event) => {
              setLogData({ ...logData, description: event.target.value });
              setErrors({ ...errors, description: false });
            }}
            className={`rounded bg-foreground border ${
              errors.description ? "border-error-red" : "border-primary-gray"
            } text-secondary-text text-lg font-normal w-full h-[25vh] min-h-[44px] max-h-[25vh] resize-none sm:resize-y px-4 py-2.5`}
          ></textarea>
          {errors.description ? (
            <div className="flex items-center gap-[5px] text-black text-lg font-normal">
              <div className="h-4 w-4 fill-slate-900">
                <ExclamationCircleIcon />
              </div>
              Please enter a description
            </div>
          ) : null}
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-[2vw]">
          <button
            onClick={() => onClose()}
            className="w-full sm:w-32 h-10 px-4 py-2.5 bg-secondary-gray rounded border border-primary-gray justify-center items-center gap-2 flex"
          >
            <div className="text-primary-text text-sm font-medium">Cancel</div>
          </button>
          <button
            onClick={() => saveLog(logData)}
            disabled={saving}
            className={`w-full sm:w-32 h-10 px-4 py-2.5 ${
              saving
                ? " bg-primary-gray border-tertiary-gray "
                : " bg-ca-pink border-ca-pink-shade "
            }  rounded border justify-center items-center gap-2 flex`}
          >
            <div
              className={`${
                saving ? "text-tertiary-gray " : "text-foreground "
              } text-base font-medium`}
            >
              Save
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
