
import React, { useState, useEffect, useRef } from 'react';
import { FiHome, FiUser, FiShoppingCart, FiSettings, FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
    const [contentHeight, setContentHeight] = useState(0);
  
    const navbarRef = useRef(null);
  
    // Function to calculate available height
    const calculateContentHeight = () => {
      const screenHeight = window.innerHeight;
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;
      const availableHeight = screenHeight - navbarHeight;
      setContentHeight(availableHeight);
    };
  
    useEffect(() => {
      calculateContentHeight();
  
      // Recalculate height when the window resizes
      window.addEventListener('resize', calculateContentHeight);
  
      // Cleanup listener on unmount
      return () => {
        window.removeEventListener('resize', calculateContentHeight);
      };
    }, []);
  return (
    <>


      {/* Main Content Area */}
      <div className="flex-1 p-6" style={{ height: contentHeight }}>
        <div className="text-3xl font-semibold mb-6">Welcome, [User Name]!</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Card */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-bold text-xl mb-2">Recent Activity</h2>
            <p className="text-gray-700">View your recent account activity here.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-bold text-xl mb-2">Profile Details</h2>
            <p className="text-gray-700">Update your profile details easily.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="font-bold text-xl mb-2">Settings</h2>
            <p className="text-gray-700">Adjust your account settings and preferences.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;