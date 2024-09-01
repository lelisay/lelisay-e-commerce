import React from 'react';

const LogoutConfirmationModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-5 rounded-lg text-center">
        <h2 className="text-cyan-800 dark:text-cyan-200">Are you sure you want to logout?</h2>
        <div className="mt-5 flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
