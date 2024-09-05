import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../features/userDetailSlice';

function Edit() {
  const { id } = useParams();
  const [updateData, setUpdateData] = useState({});
  const [errors, setErrors] = useState({});
  const { users, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
   
  //api call
  useEffect(() => {
    if (id && users.length > 0) {
      const singleUser = users.find((ele) => ele.id === parseInt(id, 10));
      if (singleUser) {
        setUpdateData(singleUser);
      }
    }
  }, [id, users]);


  const handleChange = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  // Form validation function
  const validateForm = () => {
    let formErrors = {};
    if (!updateData.name) formErrors.name = 'Name is required';
    if (!updateData.email) formErrors.email = 'Email is required';
    if (!updateData.age) formErrors.age = 'Age is required';
    if (!updateData.mobile) formErrors.mobile = 'Mobile number is required';
    if (!updateData.work) formErrors.work = 'Work is required';
    if (!updateData.add) formErrors.add = 'Address is required';

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(updateUser(updateData));
      alert('Your data has been updated successfully');
      navigate('/'); 
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit} className='m-3'>
        <div className="row jumbotron box8 p-3">
          <div className="col-12 mb-4">
            <h2 className="text-center">Edit User</h2>
          </div>

          {/* Name Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="name">Name <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={updateData.name || ''}
              onChange={handleChange}
              placeholder="Enter your name."
            />
            {errors.name && <p className="text-danger">{errors.name}</p>}
          </div>

          {/* Email Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="email">Email <span style={{color:"red"}}>*</span></label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={updateData.email || ''}
              onChange={handleChange}
              placeholder="Enter your email."
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>

          {/* Age Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="age">Age <span style={{color:"red"}}>*</span></label>
            <input
              type="number"
              className="form-control"
              name="age"
              id="age"
              value={updateData.age || ''}
              onChange={handleChange}
              placeholder="Enter your age."
            />
            {errors.age && <p className="text-danger">{errors.age}</p>}
          </div>

          {/* Mobile Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="mobile">Mobile <span style={{color:"red"}}>*</span></label>
            <input
              type="tel"
              className="form-control"
              name="mobile"
              id="mobile"
              value={updateData.mobile || ''}
              onChange={handleChange}
              placeholder="Enter your mobile number."
            />
            {errors.mobile && <p className="text-danger">{errors.mobile}</p>}
          </div>

          {/* Work Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="work">Work <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              className="form-control"
              name="work"
              id="work"
              value={updateData.work || ''}
              onChange={handleChange}
              placeholder="Enter your work."
            />
            {errors.work && <p className="text-danger">{errors.work}</p>}
          </div>

          {/* Address Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="add">Address <span style={{color:"red"}}>*</span></label>
            <input
              type="text"
              className="form-control"
              name="add"
              id="add"
              value={updateData.add || ''}
              onChange={handleChange}
              placeholder="Enter your address."
            />
            {errors.add && <p className="text-danger">{errors.add}</p>}
          </div>

          {/* Description Field */}
          <div className="col-12 form-group mb-3">
            <label htmlFor="desc">Description</label>
            <textarea
              className="form-control"
              name="desc"
              id="desc"
              value={updateData.desc || ''}
              onChange={handleChange}
              rows="3"
              placeholder="Enter a description."
            ></textarea>
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="col-12 d-flex justify-content-center ">
            <button type="submit" className="adduserbtn mx-2">
              Submit
            </button>
            <button
              type="button"
              className="adduserbtn canceluserbtn mx-2"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
