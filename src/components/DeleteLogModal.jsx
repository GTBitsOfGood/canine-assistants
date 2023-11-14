import React, { useEffect, useRef, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { consts, logSchema } from "@/utils/consts";
import DropdownMenu, { DropdownMenuOption } from "./DropdownMenu";
import { Chip, ChipTypeStyles } from "./Chip";

/**
 * Modal for deleting a log
 * @param {*} logId string id of log
 * @param {*} onClose function that is called when the modal needs to be closed
 * @param {*} onSubmit function that is called when the user tries to delete the log
 * @returns the modal component
 */
export default function DeleteLogModal({ logId, onClose, onSubmit }) {
  const [saving, setSaving] = useState(false);
  const modalRef = useRef(null);

  const deleteLog = () => {
      setSaving(true);
      fetch("/api/logs/" + logId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
        <div className="sm:hidden w-8 h-1 opacity-40 bg-zinc-500 rounded-[100px] mx-auto mb-[12px]" />
        <h1 className="mb-[3vh]"> Are you sure you want to delete this log?</h1>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-[2vw]">
          <button
            onClick={() => onClose()}
            className="w-full sm:w-32 h-10 px-4 py-2.5 bg-secondary-gray rounded border border-primary-gray justify-center items-center gap-2 flex"
          >
            <div className="text-primary-text text-sm font-medium">Cancel</div>
          </button>
          <button
            onClick={() => deleteLog()}
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
              Confirm
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
