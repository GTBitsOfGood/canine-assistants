import React from 'react';

/**
 * A modal component that displays a confirmation dialog.
 *
 * @param {boolean} isOpen - Determines if the modal is currently open.
 * @param {Function} onClose - A callback function that is called when the modal should be closed.
 * @param {Function} onConfirm - A callback function that is called when the confirmation action is taken.
 * @param {string} message - The message to be displayed in the modal.
 * @returns {JSX.Element | null} The component renders a modal with the provided message and buttons to confirm or cancel.
 */
const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg max-w-sm mx-auto">
        <p className="text-center mb-4">{message}</p>
        <div className="flex justify-around">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition"
            onClick={onConfirm}
          >
            Confirm
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
