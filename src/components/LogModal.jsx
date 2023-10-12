import React, { useState } from "react";
import { consts } from "@/utils/consts";
import DropdownMenu, { DropdownMenuOption } from "./DropdownMenu";
import { logSchema } from "@/utils/consts";

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

    // TODO PARKER manipulate data so that it's in the right form and use zod to error check before fetching
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
      // TODO PARKER error check validation
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
          }}
          className="rounded bg-foreground border border-neutral-300 text-neutral-700 text-lg p-2.5 pl-10 font-normal"
        >
        </input>
        <br/>

        <label>Tags*</label>
        <br/>

        <DropdownMenu
          label={"Topic*"}
          props={{ hideFilterButton: true, radioButtons: true }}
          selectedOptions={logData.topicSet}
          onFilterSelect={(data) => {
            console.log(data);
            if (data !== undefined) {
              setLogData({ ...logData, topicSet: data });
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

        <DropdownMenu
          label={"Severity*"}
          props={{ hideFilterButton: true, radioButtons: true }}
          selectedOptions={logData.severitySet}
          onFilterSelect={(data) => {
            if (data !== undefined) {
              setLogData({ ...logData, severitySet: data });
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

        <label>Log Description*</label><br/>
        <input
          value={logData.description}
          onChange={(event) => {
            setLogData({ ...logData, description: event.target.value });
          }}
          className="rounded bg-foreground border border-neutral-300 text-neutral-700 text-lg p-2.5 pl-10 font-normal"
        >
        </input>

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