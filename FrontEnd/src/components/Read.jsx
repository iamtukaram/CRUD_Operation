import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, showUser } from '../features/userDetailSlice';
import ConfirmationModal from './ConfirmationModal'; // Update import
import { Link, useNavigate } from 'react-router-dom';
import CustomModal from './CustomModal';

function Read() {
  const [id, setId] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showPopUpCustom, setShowPopUpCustom] = useState(false);

  const { users, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const addBtn = () => {
    navigate('/create');
  };

  const handleDeleteConfirm = (id) => {
    dispatch(deleteUser(id));
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {showPopUp && (
        <ConfirmationModal
          id={id}
          showPopUp={showPopUp}
          setShowPopUp={setShowPopUp}
          onConfirm={handleDeleteConfirm}
        />
      )}
        {showPopUpCustom && (
       <CustomModal id={id} showPopUpCustom={showPopUpCustom} setShowPopUpCustom={setShowPopUpCustom} />
      )}
      <div className="container mt-3">
        <div className="table-responsive" style={{ margin: '70px 0px 0px 0px' }}>
          <div className="text-end mt-2 mb-2">
            <button onClick={addBtn} className="adduserbtn">
              Add User
            </button>
          </div>
          <table className="table table-striped table-bordered table-hover">
           
           
            <thead className="table-dark text-center">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Mobile</th>
                <th>Work</th>
                <th>Address</th>
                <th>Description</th>
                <th colSpan="3">Actions</th>
              </tr>
            </thead>


            <tbody>
              {users &&
                users.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.age}</td>
                    <td>{item.mobile}</td>
                    <td>{item.work}</td>
                    <td>{item.add}</td>
                    <td>{item.desc}</td>
                    <td>
                      <button
                        className="btn btn-info btn-sm me-2"
                        onClick={() => [setId(item.id), setShowPopUpCustom(true)]}
                      >
                        View
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => [setId(item.id), setShowPopUp(true)]}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to={`/edit/${item.id}`} className="btn btn-warning btn-sm">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Read;
