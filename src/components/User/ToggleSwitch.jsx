import React from 'react';

/**
 * Active/Inactive toggle switch for User managment dashboard
 * @param {*} isActive state representing if the user is set to active or inactive
 * @param {*} onToggle action to be performed on toggle
 * @returns HTML toggle switch component
 */

const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={isActive}
          onChange={onToggle}
        />
        <div
          className={`block w-14 h-8 rounded-full transition-colors ${
            isActive ? 'bg-rose-800' : 'bg-gray-300'
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
            isActive ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
