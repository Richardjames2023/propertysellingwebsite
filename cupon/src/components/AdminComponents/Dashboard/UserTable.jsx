import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash } from 'react-icons/fi';

const UserTable = ({ isSuperAdmin }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/auth/users');
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Delete a user (super admin only)
  const deleteUser = async (userId) => {
    if (!isSuperAdmin) {
      console.log('Only super admin can delete users');
      return;
    }
    try {
      await axios.delete(`http://localhost:4001/api/users/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-200">Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Email</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Phone</th>
            <th className="py-2 px-4 border-b-2 border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{`${user.first_name} ${user.last_name}`}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.phone}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <FiEdit 
                  className="text-blue-500 cursor-pointer" 
                  size={20} 
                  title="Edit User" 
                  onClick={() => {/* Open edit modal or navigate to edit page */}} 
                />
                {isSuperAdmin && (
                  <FiTrash 
                    className="text-red-500 cursor-pointer" 
                    size={20} 
                    title="Delete User" 
                    onClick={() => deleteUser(user.id)} 
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;