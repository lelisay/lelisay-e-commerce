


import React from 'react';


const LogoutConfirmationModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className='text-cyan-800'>Are you sure you want to logout?</h2>
        <div className="modal-actions">
          <button onClick={onConfirm} className="confirm-button">Yes</button>
          <button onClick={onCancel} className="cancel-button">No</button>
        </div>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        .modal-actions {
          margin-top: 20px;
        }
        .confirm-button {
          background-color: red;
          color: white;
          padding: 10px 20px;
          margin-right: 10px;
          border: none;
          border-radius: 5px;
        }
        .cancel-button {
          background-color: gray;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default LogoutConfirmationModal;
