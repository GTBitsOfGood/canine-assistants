import React, { useEffect, useRef, useState } from "react";
import { consts, logSchema } from "@/utils/consts";

/**
 * Modal for resolving a log
 * @param {*} log log object
 * @param {*} onClose function that is called when the log needs to be closed
 * @param {*} onSubmit function that is called when the user tries to save the log
 * @returns the modal component
 */
export default function ResolveLogModal({ log, onClose, onSubmit }) {
  const [logData, setLogData] = useState({
    title: "",
    topicSet: {},
    severitySet: {},
    tagsSet: {},
    description: "",
    resolved: log.resolved,
    resolver: log.resolver,
    resolution: log.resolution,
  });

  const [errors, setErrors] = useState({
    title: false,
    topic: false,
    severity: false,
    description: false,
  });

  const [saving, setSaving] = useState(false);
  const modalRef = useRef(null);
  const [retrievedLog, setRetrievedLog] = useState(false);
  
  // Updates the logData state with the log data from the database when editing
  useEffect(() => {
    if (log.resolved && !retrievedLog) {
          setLogData({log});
          setRetrievedLog(true);
    }

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

  const handleSubmit = (logData) => {
    resolveLog(logData)
  };

  const resolveLog = (logData) => {
    const formattedData = {
      resolved: true,
      resolution: logData.resolution,
    };

    setSaving(true);
    fetch("/api/logs/" + log._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    })
      .then((res) => {
        onSubmit(true, "add");
        onClose();
        setSaving(false);
      })
      .catch((err) => {
        setSaving(false);
        onSubmit(false);
      });
    
  };

  return (
    <>
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-10">
      <div
        onClick={() => onClose()}
        className="fixed inset-0 bg-modal-background-gray opacity-60"
      ></div>
      <div
        ref={modalRef}
        className="modal-shadow-mobile sm:modal-shadow bg-white sm:bg-secondary-background px-5 sm:px-12 py-4 sm:py-9 sm:w-auto max-h-[95vh] z-10 overflow-auto rounded-t-[50px] sm:rounded-t-none min-w-96"
      >

        <div className="sm:hidden w-8 h-1 opacity-40 bg-zinc-500 rounded-[100px] mx-auto mb-[12px]" />
        {log.resolved ? (<h1 className="mb-6"> Edit Resolved Log</h1>) : (<h1 className="mb-6"> Resolve Log</h1>)}
        
        <div>
          <h2 className="h-10 align-middle">
            Comments
          </h2>
          <div className="min-w-96 border-slate-950 mx-96" />
        </div>
        
        <div className="mb-6">
          <textarea
            value={logData.resolution}
            onChange={(event) => {
              setLogData({ ...logData, resolution: event.target.value });
              setErrors({ ...errors, description: false });
            }}
            className={`text-area textbox-base ${ errors.description ? "textbox-error" : "textbox-border" } w-full`}
          ></textarea>
        </div>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-[2vw]">
            <button
              type="button"
              onClick={onClose}
              className="button-base secondary-button flex w-full sm:w-32 h-10"
            >
            <div className="secondary-button-text" >
              Cancel
              </div>
          </button>
          <button
            onClick={() => handleSubmit(logData)}
            disabled={saving}
            className={`flex w-full sm:w-32 h-10 button-base ${
              saving
                ? " disabled-button"
                : " primary-button"
            }`}
          >
            <div
              className={`${ saving ? "disabled-button-text" : "primary-button-text" }`}
            >
              {log.resolved ? "Save" : "Resolve"}
            </div>
          </button>
        </div>
      </div>
    </div>

    </>
  );
  
}
