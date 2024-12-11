import React, { useState, useEffect } from 'react';
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';

const NavBar = () => {
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showPagesDropdown, setShowPagesDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close dropdowns and reset mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setShowPropertyDropdown(false);
        setShowPagesDropdown(false);
        setShowUserDropdown(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="bg-white relative pt-4 pb-4 shadow-[0px_12px_36px_rgba(105,124,170,0.08)] top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* <img src={} className="logo" alt="" /> */}
        <h1 className="text-black text-2xl">Lekki<span className="text-green-500 font-bold">Garden</span></h1>

        {/* Mobile Menu Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <AiOutlineClose size={24} color="black" /> : <AiOutlineMenu size={24} color="black" />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 padding-[20px]">
          <li className="text-black hover:text-blue-300">Home</li>
          <li 
            className="text-black hover:text-blue-300 relative cursor-pointer"
            onMouseEnter={() => setShowPropertyDropdown(true)}
            onMouseLeave={() => setShowPropertyDropdown(false)}
          >
            Property
            <MdKeyboardArrowDown 
              className={`inline transition-transform ${showPropertyDropdown ? 'rotate-180' : ''}`} 
            />
            {showPropertyDropdown && (
              <ul className="absolute left-0 top-full bg-white text-blue-600 w-48 shadow-md rounded">
                <li className="p-2 hover:bg-blue-100">Residential</li>
                <li className="p-2 hover:bg-blue-100">Commercial</li>
                <li className="p-2 hover:bg-blue-100">Industrial</li>
              </ul>
            )}
          </li>

          <li 
            className="text-black hover:text-blue-300 relative cursor-pointer"
            onMouseEnter={() => setShowPagesDropdown(true)}
            onMouseLeave={() => setShowPagesDropdown(false)}
          >
            Pages
            <MdKeyboardArrowDown 
              className={`inline transition-transform ${showPagesDropdown ? 'rotate-180' : ''}`} 
            />
            {showPagesDropdown && (
              <ul className="absolute left-0 top-full bg-white text-blue-600 w-48 shadow-md rounded">
                <li className="p-2 hover:bg-blue-100">About Us</li>
                <li className="p-2 hover:bg-blue-100">Services</li>
                <li className="p-2 hover:bg-blue-100">FAQs</li>
              </ul>
            )}
          </li>

          <li className="text-black hover:text-blue-300">Contact</li>
          <li className="text-black hover:text-blue-300">Gallery</li>
          <li 
            className="text-black hover:text-blue-300 relative cursor-pointer"
            onMouseEnter={() => setShowUserDropdown(true)}
            onMouseLeave={() => setShowUserDropdown(false)}
          >
            <AiOutlineUser size="24" />
            {showUserDropdown && (
              <ul className="absolute right-0 top-full bg-white text-blue-600 w-48 shadow-md rounded">
                <li className="p-2 hover:bg-blue-100">Profile</li>
                <li className="p-2 hover:bg-blue-100">Settings</li>
                <li className="p-2 hover:bg-blue-100">Logout</li>
              </ul>
            )}
          </li>
        </ul>


        {/* Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed top-16 inset-0 bg-black opacity-50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Mobile Menu */}
        <div
          className={`fixed top-16 left-0 w-64 bg-blue-600 text-black transform transition-transform ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:hidden`}
        >
          <ul className="flex flex-col p-4 space-y-4">
            <li className="hover:text-blue-300">Home</li>

            <li
              className="hover:text-blue-300 relative cursor-pointer"
              onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
              onMouseLeave={() => setShowPropertyDropdown(false)}
            >
              Property
              <MdKeyboardArrowDown 
                className={`inline transition-transform ml-1 ${showPropertyDropdown ? 'rotate-180' : ''}`} 
              />
              {showPropertyDropdown && (
                <ul className="mt-2 ml-4 text-blue-600 bg-white rounded shadow-lg">
                  <li className="p-2 hover:bg-blue-100">Residential</li>
                  <li className="p-2 hover:bg-blue-100">Commercial</li>
                  <li className="p-2 hover:bg-blue-100">Industrial</li>
                </ul>
              )}
            </li>

            <li
              className="hover:text-blue-300 relative cursor-pointer"
              onClick={() => setShowPagesDropdown(!showPagesDropdown)}
              onMouseLeave={() => setShowPagesDropdown(false)}
            >
              Pages
              <MdKeyboardArrowDown 
                className={`inline transition-transform ml-1 ${showPagesDropdown ? 'rotate-180' : ''}`} 
              />
              {showPagesDropdown && (
                <ul className="mt-2 ml-4 text-blue-600 bg-white rounded shadow-lg">
                  <li className="p-2 hover:bg-blue-100">About Us</li>
                  <li className="p-2 hover:bg-blue-100">Services</li>
                  <li className="p-2 hover:bg-blue-100">FAQs</li>
                </ul>
              )}
            </li>

            <li className="hover:text-blue-300">Contact</li>
            <li className="hover:text-blue-300">Gallery</li>

            <li
              className="hover:text-blue-300 relative cursor-pointer"
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              onMouseLeave={() => setShowUserDropdown(false)}
            >
              <AiOutlineUser size="24" />
              {showUserDropdown && (
                <ul className="mt-2 ml-4 text-blue-600 bg-white rounded shadow-lg">
                  <li className="p-2 hover:bg-blue-100">Profile</li>
                  <li className="p-2 hover:bg-blue-100">Settings</li>
                  <li className="p-2 hover:bg-blue-100">Logout</li>
                </ul>
              )}
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;