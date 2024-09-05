
import React from 'react';
import './CustomModal.css';
import { toast } from 'react-toastify';

function ConfirmationModal({ id, showPopUp, setShowPopUp, onConfirm }) {
  
    if (!showPopUp) return null;

  const handleConfirm = () => {
    onConfirm(id); 
    setShowPopUp(false);
    toast.success("Delete data successfully")
  };

  const handleCancel = () => {
    setShowPopUp(false);
   
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
      
        <h2>Confirm Delete</h2>
        <div className="modalContent text-center">
          <h5>Are you sure you want to delete this user?</h5>
        </div>
        <div className="text-center mt-4">
          <button className="btn btn-secondary mx-2 " onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-danger mx-2" onClick={handleConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
