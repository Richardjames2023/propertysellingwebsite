import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit } from 'react-icons/fi';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user information from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Adjust endpoint as needed
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div className="text-center p-6">Loading profile...</div>;

  if (!userData) return <div className="text-center p-6">Error loading profile data</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 ml-64">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg transition-transform transform duration-300 ease-out hover:scale-105">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">User Profile</h2>
          <p className="text-gray-500">Manage your personal information</p>
        </div>

        {/* User Information */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">First Name:</span>
            <span className="text-gray-800">{userData.first_name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Last Name:</span>
            <span className="text-gray-800">{userData.last_name}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800">{userData.email}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Phone:</span>
            <span className="text-gray-800">{userData.phone}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-medium">Registered on:</span>
            <span className="text-gray-800">{new Date(userData.registrationDate).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="mt-6 flex justify-center">
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 transition duration-200 ease-in-out">
            <FiEdit className="mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;