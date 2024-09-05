import React from 'react';
import './CustomModal.css';
import { useSelector } from 'react-redux';

function CustomModal({ id, setShowPopUpCustom }) {

  const allUser = useSelector((state) => state.app.users);



  // Get the single user based on the ID
  const singleUser = allUser.find((ele) => ele.id === id);


  // Early return if no user is found
  if (!singleUser) {
    return null; 
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        
        <h2>User Details</h2>
        <div className='modalContent'>
          <p><strong>ID:</strong> {singleUser.id}</p>
          <p><strong>Name:</strong> {singleUser.name}</p>
          <p><strong>Email:</strong> {singleUser.email}</p>
          <p><strong>Age:</strong> {singleUser.age}</p>
          <p><strong>Mobile:</strong> {singleUser.mobile}</p>
          <p><strong>Work:</strong> {singleUser.work}</p>
          <p><strong>Address:</strong> {singleUser.add}</p>
          <p><strong>Description:</strong> {singleUser.desc}</p>
         
        </div>
        <div className='text-center'> 
          <button className='closeButton' onClick={() => setShowPopUpCustom(false)}>
          Close
        </button></div>
      </div>
    </div>
  );
}

export default CustomModal;
