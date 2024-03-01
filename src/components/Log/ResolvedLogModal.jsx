import React, { useEffect, useRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { consts, logSchema } from "@/utils/consts";
import DropdownMenu, { DropdownMenuOption } from "../Form/DropdownMenu";
import { Chip, ChipTypeStyles } from "../Chip";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

/**
 * Modal for resolving a log
 * @param {*} userId string id of user creating the log
 * @param {*} onClose function that is called when the log needs to be closed
 * @param {*} onSubmit function that is called when the user tries to save the log
 * @returns the modal component
 */
export default function ResolvedLogModal({ user, setShowResolvedModal, setShowResolveModal, log, onClose, onSubmit }) {
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
  const [resolver, setResolver] = useState(null);
  
  // Updates the logData state with the log data from the database when editing
  useEffect(() => {
    const fetchResolverInfo = async () => {
      try {
        const response = await fetch(`/api/users/${log.resolver}`);
        if (response.ok) {
          const resolverData = await response.json();
          setResolver(resolverData.data);
        } else {
          console.error("Failed to fetch resolver information");
        }
      } catch (error) {
        console.error("Error fetching resolver information:", error);
      }
    };

    // Check if log.resolver exists and make the API call
    if (log.resolver) {
      fetchResolverInfo();
    }
  }, [log.resolver]);

  const handleEditResolveClick = () => {
    setShowResolveModal(true);
    setShowResolvedModal(false)
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
        className="modal-shadow-mobile sm:modal-shadow bg-white sm:bg-secondary-background px-5 sm:px-12 py-4 sm:py-9 w-full sm:w-auto max-h-[95vh] z-10 overflow-auto rounded-t-[50px] sm:rounded-t-none"
      >

        <div className="sm:hidden w-8 h-1 opacity-40 bg-zinc-500 rounded-[100px] mx-auto mb-[12px]" />

        
        <div className="flex flex-col justify-between w-100vw">
          <div>
            <div className="flex flex-row justify-between">
              <h1>Resolved Log</h1>
              <button
                  type="button"
                  className="flex justify-center items-center ${}"
                  onClick={handleEditResolveClick}
                >
                  <PencilSquareIcon className="h-5 mr-1" />
                  Edit
                </button>
            </div>
            <div>
              <p>Resolved By: {resolver?.name}</p>
              <p></p>
              <p></p>
            </div>
          </div>
          
          
          <div>
            <div>
            <h2 className="h-10 align-middle mt-6">
              Comments:
            </h2>
            <div className="min-w-96 border-slate-950 mx-96" />
          </div>

            <div className="mb-6 max-w-screen-md min-w-96">
            <p style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{log.resolution}</p>
            </div>
          </div>
          

          <div className="flex flex-col-reverse sm:flex-row justify-end gap-[2vw]">
            <button
              type="button"
              onClick={onClose}
              className={`flex w-full sm:w-32 h-10 button-base primary-button`}
            >
              <div
                className={`${ saving ? "disabled-button-text" : "primary-button-text" }`}
              >
                Close
              </div>
            </button>
          </div>
        </div>
        


      </div>
    </div>

    </>
  );
  
}
