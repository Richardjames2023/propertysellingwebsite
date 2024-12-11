import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiShoppingCart, FiSettings, FiLogOut } from 'react-icons/fi';
import { useSidebar } from '../components/UserLayout'; // import useSidebar hook
const UserSidebar = () => {
  const { isOpen, toggleSidebar } = useSidebar(); // Use context instead of local state
    const [contentHeight, setContentHeight] = useState(0);
    const navigate = useNavigate();
  
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
  
const handleLogout = () =>{
  const confirmLogout = window.confirm("Are you sure, you want to logout?");
  if(confirmLogout){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    navigate('/login');
  }
}
  return (
    <>
    {/* Sidebar */}
      {/* <div className={`flex flex-col bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} relative`}> */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} flex flex-col`}
      >
        {/* Sidebar Header */}
        <div ref={navbarRef} className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <span className="font-bold text-sm md:text-2xl animate-fadeIn">Dashboard</span>}
          <button onClick={toggleSidebar} className="text-xl">
            {isOpen ? '⇦' : '⇨'}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 flex-1 space-y-2">
          <Link to='/productpage' className={`flex items-center px-4 py-3 hover:bg-gray-700 transition ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
            <FiHome size={24} />
            {isOpen && <span className="ml-4">Home</span>}
          </Link>
          <Link to='/profile' className={`flex items-center px-4 py-3 hover:bg-gray-700 transition ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
            <FiUser size={24} />
            {isOpen && <span className="ml-4">Profile</span>}
          </Link>
          <Link to='/UserCart' className={`flex items-center px-4 py-3 hover:bg-gray-700 transition ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
            <FiShoppingCart size={24} />
            {isOpen && <span className="ml-4">Cart</span>}
          </Link>
          <a href="#settings" className={`flex items-center px-4 py-3 hover:bg-gray-700 transition ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
            <FiSettings size={24} />
            {isOpen && <span className="ml-4">Settings</span>}
          </a>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          <button onClick={handleLogout} className={`flex items-center w-full bg-red-500 py-2 rounded hover:bg-red-600 transition ${isOpen ? 'animate-fadeIn' : 'animate-fadeOut'}`}>
            <FiLogOut size={24} />
            {isOpen && <span className="ml-4">Logout</span>}
          </button>
        </div>
      </div>
    </>
  )
}

export default UserSidebar