import React, { useState } from "react";
import { consts, logSchema } from "@/utils/consts";
import DropdownMenu, { DropdownMenuOption } from "./DropdownMenu";
import { Chip, ChipTypeStyles } from "./Chip";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

/**
 * TODO PARKER JAVADOCS 
 */
export default function LogModal({ dogId, userId }) {
  const [ logData, setLogData ] = useState({
    title: "",
    topicSet: {},
    severitySet: {},
    tagsSet: {},
    description: ""
  });
  const [ errors, setErrors ] = useState({
    title: false,
    topic: false,
    severity: false,
    description: false
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
    }

    const { success, error, data } = logSchema.safeParse(formattedData);

    if (success) {
      fetch("/api/logs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      })
      .then((res) => {
        // TODO PARKER close then id page needs react toast success
        // also show new log on log page
      })
      .catch((err) => {
        // TODO PARKER server error react toast
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
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <div className="fixed inset-0 bg-modal-background-gray opacity-60"></div>
      <div className="modal-shadow bg-secondary-background p-6 z-10">
        <h1>Add a log</h1>
        <label>Title*</label><br/>
        <input
          value={logData.title}
          onChange={(event) => {
            setLogData({ ...logData, title: event.target.value });
            setErrors({...errors, title: false })
          }}
          className={`rounded bg-foreground border ${errors.title ? 'border-error-red' : 'border-neutral-300'} text-neutral-700 text-lg p-2.5 pl-10 font-normal`}
        >
        </input>
        <br/>
        {errors.title ? (
          <div className="flex">
            <div className="w-4 align-baseline">
              <ExclamationCircleIcon />
            </div>
            Please enter a title
          </div>
        ) : null}

        <label>Tags*</label>
        <br/>

        <DropdownMenu
          label={"Topic*"}
          props={{ hideFilterButton: true, radioButtons: true, error: errors.topic }}
          selectedOptions={logData.topicSet}
          onFilterSelect={(data) => {
            console.log(data);
            if (data !== undefined) {
              setLogData({ ...logData, topicSet: data });
              setErrors({...errors, topic: false })
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
          <div className="flex">
            <div className="w-4 align-baseline">
              <ExclamationCircleIcon />
            </div>
            Please select a topic
          </div>
        ) : null}
        {Object.keys(logData.topicSet).length ? (
          <Chip
            label={Object.values(logData.topicSet)[0]}
            type={ChipTypeStyles["Tag"]}
          />
        ) : null}

        <DropdownMenu
          label={"Severity*"}
          props={{ hideFilterButton: true, radioButtons: true, error: errors.severity }}
          selectedOptions={logData.severitySet}
          onFilterSelect={(data) => {
            if (data !== undefined) {
              setLogData({ ...logData, severitySet: data });
              setErrors({...errors, severity: false })
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
          <div className="flex">
            <div className="w-4 align-baseline">
              <ExclamationCircleIcon />
            </div>
            Please select a severity
          </div>
        ) : null}
        {Object.keys(logData.severitySet).length ? (
          <Chip
            label={Object.values(logData.severitySet)[0]}
            type={ChipTypeStyles[Object.values(logData.severitySet)[0]]}
          />
        ) : null}

        <DropdownMenu
          label="Tags"
          props={{ hideFilterButton: true }}
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
        {Object.keys(logData.tagsSet).length ? (
          Object.values(logData.tagsSet).map((value, index) => {
            return (
              <Chip
                key={index}
                label={value}
                type={ChipTypeStyles["Tag"]}
              />
            )
          })
        ) : null}

        <br />
        <label>Log Description*</label><br/>
        <input
          value={logData.description}
          onChange={(event) => {
            setLogData({ ...logData, description: event.target.value });
            setErrors({...errors, description: false })
          }}
          className={`rounded bg-foreground border ${errors.description ? 'border-error-red' : 'border-neutral-300'} text-neutral-700 text-lg p-2.5 pl-10 font-normal`}
        >
        </input>
        {errors.description ? (
          <div className="flex">
            <div className="w-5 h-5 align-baseline">
              <ExclamationCircleIcon />
            </div>
            Please enter a description
          </div>
        ) : null}
        <br/>

        <button className="px-4 py-2.5 bg-secondary-gray rounded border border-primary-gray justify-start items-center gap-2 flex">
          <div className="text-primary-text text-base font-medium">
            Cancel
          </div>
        </button>
        <button onClick={() => saveLog(logData)} className="px-4 py-2.5 bg-ca-pink rounded border border-ca-pink-shade justify-start items-center gap-2 flex">
          <div className="text-foreground text-base font-medium">
            Save
          </div>
        </button>
      </div>
    </div>
  )
}