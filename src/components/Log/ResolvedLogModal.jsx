import React, { useEffect, useRef, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

/**
 * Modal for displaying a resolved log.
 * @param {function} setShowResolvedModal - Function to control the visibility of the resolved log modal.
 * @param {function} setShowResolveModal - Function to control the visibility of the resolve modal.
 * @param {object} log - The log object containing information about the resolved log.
 * @param {function} onClose - Function called when the modal needs to be closed.
 * @returns {JSX.Element} - The modal component for displaying a resolved log.
 */
export default function ResolvedLogModal({  setShowResolvedModal, setShowResolveModal, log, onClose, role }) {

  const modalRef = useRef(null);
  const [resolver, setResolver] = useState(null);
  const updatedAt = new Date(log.updatedAt);
  
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
                  className={`flex justify-center items-center ${role === "Manager" ? "" : "hidden"}`}
                  onClick={handleEditResolveClick}
                >
                  <PencilSquareIcon className="h-5 mr-1" />
                  Edit
                </button>
            </div>
            <div className="text-neutral-800 flex flex-row mt-2">
              <p>Resolved By: {resolver ? resolver.name : "N/A"}</p>
              <p className="ml-4">Date: {updatedAt.toLocaleDateString()}</p>
              <p className="ml-4">Time: {updatedAt.toLocaleTimeString("en-US").split(':').slice(0, 2).join(':')} {updatedAt.toLocaleTimeString("en-US").split(' ')[1]}</p>
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
                className="primary-button-text"
              >
                Close
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
}
