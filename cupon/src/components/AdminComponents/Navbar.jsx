
import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-64 right-0 z-10">
      <span className="text-2xl font-semibold">Admin Staff's</span>
      <div className="flex items-center space-x-4">
        <span>Welcome, Admin</span>
        <button className="ml-4 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;