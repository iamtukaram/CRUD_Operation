import React, { useState } from 'react';
import './Create.css';
import { useDispatch } from 'react-redux';
import { createUser } from '../features/userDetailSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Create() {
  const [users, setUsers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //get data from input
  const getUserData = (e) => {
    setUsers({ ...users, [e.target.name]: e.target.value });
  };

  //create user
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(users))
      .unwrap()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        if (error.error === "Email already exists") {
          alert("This email is already registered. Please use a different email.");
        } else if (error.error === "Mobile number already exists") {
          alert("This mobile number is already registered. Please use a different number.");
        } else {
          toast.error("smothing wrong");
        }
      });
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit} style={{margin : '80px 0px 0px 0px'}}>
        <div className="row jumbotron box8 m-3 p-3">
          
          <div className="col-12 mb-2">
            <h2 className="text-center">Create User</h2>
          </div>

          {/* Name Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="name">Name <span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              onChange={getUserData}
              placeholder="Enter your name."
              required
            />
          </div>

          {/* Email Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="email">Email <span style={{ color: "red" }}>*</span></label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              onChange={getUserData}
              placeholder="Enter your email."
              required
            />
          </div>

          {/* Age Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="age">Age <span style={{ color: "red" }}>*</span></label>
            <input
              type="number"
              className="form-control"
              name="age"
              id="age"
              onChange={getUserData}
              placeholder="Enter your age."
              required
            />
          </div>

          {/* Mobile Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="mobile">Mobile <span style={{ color: "red" }}>*</span></label>
            <input
              type="number"
              className="form-control"
              name="mobile"
              id="mobile"
              onChange={getUserData}
              placeholder="Enter your mobile number."
              required
            />
          </div>

          {/* Work Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="work">Work <span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              className="form-control"
              name="work"
              id="work"
              onChange={getUserData}
              placeholder="Enter your work."
              required
            />
          </div>

          {/* Address Field */}
          <div className="col-12 col-md-6 form-group mb-3">
            <label htmlFor="add">Address <span style={{ color: "red" }}>*</span></label>
            <input
              type="text"
              className="form-control"
              name="add"
              id="add"
              onChange={getUserData}
              placeholder="Enter your address."
              required
            />
          </div>

          {/* Description Field */}
          <div className="col-12 form-group mb-3">
            <label htmlFor="desc">Description</label>
            <textarea
              className="form-control"
              name="desc"
              id="desc"
              onChange={getUserData}
              rows="3"
              placeholder="Enter a description."
            ></textarea>
          </div>

          <div className="col-12 d-flex justify-content-center">
            <button type="submit" className="adduserbtn mx-2">Submit</button>
            <button type="button" className="adduserbtn canceluserbtn mx-2" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Create;
