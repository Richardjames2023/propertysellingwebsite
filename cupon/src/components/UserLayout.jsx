import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'

//creste a context for the sidebar state
const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

const UserLayout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SidebarContext.Provider value={{isOpen, toggleSidebar}}>
      <div className="flex h-screen overflow-y-auto bg-gray-100">
          <UserSidebar />
          <Outlet/>
      </div>
    </SidebarContext.Provider>
  )
}

export default UserLayout