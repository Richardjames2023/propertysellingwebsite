import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './AdminComponents/Sidebar'
import Navbar from './AdminComponents/Navbar'

const AdminLayout = () => {
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-64 bg-gray-100 h-screen overflow-y-auto pt-16">
        <Navbar />
        <div className="p-6">
        <Outlet/>
        </div>
        </div>
    </div>
  )
}

export default AdminLayout