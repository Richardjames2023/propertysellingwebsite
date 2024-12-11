import React, { useEffect, useState } from 'react';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'; // Import icons
import axios from 'axios';

const PropertyTable = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    name: '', description: '', location: '', price: '', quantity: '', available: '', imageUrl: ''
  });
  const [imageFile, setImageFile] = useState(null); // New state for image file
  const [editProperty, setEditProperty] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null); // New state for edit image file
  const [userId, setUserId] = useState(null);

  useEffect(()=>{
    const storedUserId = localStorage.getItem('userId');
    //console.log(storedUserId);
    if(storedUserId){
      setUserId(storedUserId);
    }
  },[])

  useEffect(() => {
    axios.get('http://localhost:4001/api/getProperties').then((response) => setProperties(response.data));
  }, []);

const handleAddProperty = () => {
  const formData = new FormData();
  formData.append('userId', userId); // Add userId to formData
  formData.append('name', newProperty.name);
  formData.append('description', newProperty.description);
  formData.append('location', newProperty.location);
  formData.append('price', parseFloat(newProperty.price)); // Convert price to float
  formData.append('quantity', newProperty.quantity);
  formData.append('available', newProperty.available);
  if (imageFile) formData.append('image', imageFile); // Append image file

  axios.post('http://localhost:4001/api/createProperties', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((response) => {
    setProperties([...properties, response.data]);
    setNewProperty({ name: '', description: '', location: '', price: '', quantity: '', available: '' });
    setImageFile(null); // Reset image file state
  });
};

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]); // Update image file state
  };

  const handleEditFileChange = (e) => {
    setEditImageFile(e.target.files[0]); // Update image file state for edit
  };

const handleUpdateProperty = (pid) => {
  console.log(pid);
    const formData = new FormData();
    formData.append('name', editProperty.name);
    formData.append('description', editProperty.description);
    formData.append('location', editProperty.location);
    formData.append('price', parseFloat(editProperty.price));
    formData.append('quantity', editProperty.quantity);
    formData.append('available', editProperty.available);
    if (editImageFile) {
      formData.append('image', editImageFile); // Append new image if provided
    } else {
      formData.append('imageUrl', editProperty.imageUrl); // Keep existing image URL if no new image
    }

    axios.put(`http://localhost:4001/api/updateProperty/${pid}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      const updatedProperties = properties.map((property) =>
        property.pid === pid ? response.data : property
      );
      setProperties(updatedProperties);
      setEditProperty(null);
      setEditImageFile(null); // Reset edit image file state
    });
  };


  const handleDeleteProperty = (pid) => {
    axios.delete(`http://localhost:4001/api/deleteProperty/${pid}`).then(() => {
      setProperties(properties.filter((property) => property.pid !== pid));
    });
  };

  const handleQuantityChange = (e) => {
    const quantity = Math.max(0, e.target.value);
    setNewProperty({ ...newProperty, quantity, available: quantity > 0 ? 'Yes' : 'No' });
  };

  return (
    <div >
      <h2 className="text-3xl font-semibold mb-6">Manage Properties</h2>

      {/* Add Property Form */}
      <div className="mb-6 grid grid-cols-2 gap-4 shad shadow-lg">
        <input
          type="text"
          value={newProperty.name}
          onChange={(e) => setNewProperty({ ...newProperty, name: e.target.value })}
          placeholder="Property Name"
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={newProperty.description}
          onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
          placeholder="Description"
          className="p-2 border rounded"
        />
          <select
            value={newProperty.location}
            onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
            className="p-2 border rounded w-full"
          >
            <option value="">Select Location</option>
            <option value="Abuja">Abuja</option>
            <option value="Lagos">Lagos</option>
          </select>
        <input
          type="number"
          inputMode="decimal" // Ensures decimal input on mobile
          value={newProperty.price}
          onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
          placeholder="Price"
          className="p-2 border rounded"
        />
          <input
            type="number"
            value={newProperty.quantity}
            onChange={handleQuantityChange}
            placeholder="Quantity"
            className="p-2 border rounded w-full"
          />
        {/* Other input fields */}
          <select
            value={newProperty.available}
            onChange={(e) => setNewProperty({ ...newProperty, available: e.target.value })}
            className="p-2 border rounded w-full"
            disabled
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        <input
          type="file"
          onChange={handleFileChange} // New file input for image
          className="p-2 border rounded"
        />
        <button onClick={handleAddProperty} className="bg-green-500 text-white p-2 rounded col-span-2">Add Property</button>
      </div>

      {/* Properties Table */}
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Location</th>
            <th className="px-4 py-2 border">Price</th>
            <th className="px-4 py-2 border">Quantity</th>
            <th className="px-4 py-2 border">Available</th>
            <th className="px-4 py-2 border">Image</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td className="px-4 py-2 border">{property.name}</td>
              <td className="px-4 py-2 border">{property.description}</td>
              <td className="px-4 py-2 border">{property.location}</td>
              <td className="px-4 py-2 border">${property.price}</td>
              <td className="px-4 py-2 border">{property.quantity}</td>
              <td className="px-4 py-2 border">{property.available}</td>
              <td className="px-4 py-2 border">
                <img src={property.imageUrl} alt={property.name} className="w-16 h-16 object-cover"/>
              </td>
              <td className="px-4 py-2 border">
                <td className="px-4 py-2 border flex justify-center items-center">
                <AiFillEdit
                  onClick={() => setEditProperty(property)}
                  className="text-yellow-500 cursor-pointer mx-2"
                  size={24}
                />
                <AiFillDelete
                  onClick={() => handleDeleteProperty(property.pid)}
                  className="text-red-500 cursor-pointer mx-2"
                  size={24}
                />
              </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Property Modal */}
      {editProperty && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <input
              type="text"
              value={editProperty.name}
              onChange={(e) => setEditProperty({ ...editProperty, name: e.target.value })}
              placeholder="Name"
              className="p-2 border rounded mb-4 w-full"
            />
            <textarea
              value={editProperty.description}
              onChange={(e) => setEditProperty({ ...editProperty, description: e.target.value })}
              placeholder="Description"
              className="p-2 border rounded mb-4 w-full"
            />
            <input
              type="text"
              value={editProperty.location}
              onChange={(e) => setEditProperty({ ...editProperty, location: e.target.value })}
              placeholder="Location"
              className="p-2 border rounded mb-4 w-full"
            />
            <input
              type="number"
              inputMode="decimal" // Ensures decimal input on mobile
              value={editProperty.price}
              onChange={(e) => setEditProperty({ ...editProperty, price: e.target.value })}
              placeholder="Price"
              className="p-2 border rounded mb-4 w-full"
            />
            <input
              type="number"
              value={editProperty.quantity}
              //onChange={(e) => setEditProperty({ ...editProperty, quantity: e.target.value })}
              onChange={handleQuantityChange}
              placeholder="Quantity"
              className="p-2 border rounded mb-4 w-full"
            />
            {/* Other input fields */}
            <select
              value={editProperty.available}
              //onChange={(e) => setEditProperty({ ...editProperty, available: e.target.value })}
              onChange={(e) => setNewProperty({ ...editProperty, available: e.target.value })}
              className="p-2 border rounded mb-4 w-full"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            <input
              type="file"
              onChange={handleEditFileChange} // New file input for edit image
              className="p-2 border rounded mb-4 w-full"
            />
            {editProperty.imageUrl && (
              <img src={editProperty.imageUrl} alt="Current" className="w-16 h-16 object-cover mb-4"/>
            )}
            <button
              onClick={() => handleUpdateProperty(editProperty.pid)}
              className="bg-blue-500 text-white p-2 rounded mr-4"
            >
              Save Changes
            </button>
            <button onClick={() => setEditProperty(null)} className="bg-gray-500 text-white p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyTable;