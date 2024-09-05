import React from 'react';

function Navbar() {

  return (
<nav className="navbar navbar-expand-lg position-fixed top-0 w-100 shadow-sm" style={{ backgroundColor: '#eee8e8' , zIndex: 999 }}>
<div className="container-fluid d-flex justify-content-center align-items-center">
    <h1 className="text-center m-0">User Management Task</h1>

  </div>
</nav>

  );
}

export default Navbar;
