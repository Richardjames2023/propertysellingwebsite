// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiHome, FiUsers, FiShoppingCart, FiSettings, FiLogOut } from 'react-icons/fi';

// const Sidebar = () => {
//   return (
//     <div className=" bg-gray-800 text-white w-64 p-4 flex flex-col">
//       <div className="mb-8 text-2xl font-semibold">Admin Dashboard</div>
//       <nav className="flex flex-col space-y-4">
//         <Link to="properties" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
//           <FiHome size={24} />
//           <span>Properties</span>
//         </Link>
//         <Link to="purchases" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
//           <FiShoppingCart size={24} />
//           <span>Purchases</span>
//         </Link>
//         <Link to="users" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
//           <FiUsers size={24} />
//           <span>Users</span>
//         </Link>
//         <Link to="settings" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
//           <FiSettings size={24} />
//           <span>Settings</span>
//         </Link>
//       </nav>
//       <button className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded mt-auto">
//         <FiLogOut size={24} />
//         <span>Logout</span>
//       </button>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiUsers, FiShoppingCart, FiSettings, FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 bg-gray-800 text-white w-64 h-screen p-4 flex flex-col">
      <div className="mb-8 text-2xl font-semibold">Admin Dashboard</div>
      <nav className="flex flex-col space-y-4">
        <Link to="properties" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FiHome size={24} />
          <span>Properties</span>
        </Link>
        <Link to="purchases" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FiShoppingCart size={24} />
          <span>Purchases</span>
        </Link>
        <Link to="users" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FiUsers size={24} />
          <span>Users</span>
        </Link>
        <Link to="settings" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FiSettings size={24} />
          <span>Settings</span>
        </Link>
      </nav>
      <button className="flex items-center space-x-2 hover:bg-red-600 p-2 rounded mt-auto">
        <FiLogOut size={24} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;