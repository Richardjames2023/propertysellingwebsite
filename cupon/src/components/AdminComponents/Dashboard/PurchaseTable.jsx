import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle, FaTrash } from 'react-icons/fa';

const PurchaseTable = ({ isSuperAdmin }) => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  // Fetch all purchases
  const fetchPurchases = async () => {
    try {
      const response = await axios.get('http://localhost:4001/api/getAllCarts');
      setPurchases(response.data);
    } catch (error) {
      console.error('Error fetching purchases:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark purchase as completed
  const markAsCompleted = async (id) => {
    try {
      await axios.put(`/api/purchases/${id}/complete`);
      setPurchases(purchases.map(purchase => 
        purchase.id === id ? { ...purchase, status: 'Completed' } : purchase
      ));
    } catch (error) {
      console.error('Error marking purchase as completed:', error);
    }
  };

  // Cancel a purchase
  const cancelPurchase = async (id) => {
    try {
      await axios.put(`/api/purchases/${id}/cancel`);
      setPurchases(purchases.map(purchase => 
        purchase.id === id ? { ...purchase, status: 'Cancelled' } : purchase
      ));
    } catch (error) {
      console.error('Error canceling purchase:', error);
    }
  };

  // Delete purchase (super admin only)
  const handleDelete = async (id) => {
    if (!isSuperAdmin) {
      console.log('Only super admin can delete purchases');
      return;
    }
    try {
      await axios.delete(`/api/purchases/${id}`);
      setPurchases(purchases.filter((purchase) => purchase.id !== id));
    } catch (error) {
      console.error('Error deleting purchase:', error);
    }
  };

  if (loading) return <div className="text-center p-6">Loading purchased items...</div>;

  if (!purchases.length) return <div className="text-center p-6">No items in the cart.</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-3 px-6 text-left border-b">User ID</th>
            <th className="py-3 px-6 text-left border-b">Property ID</th>
            <th className="py-3 px-6 text-left border-b">Property Name</th>
            <th className="py-3 px-6 text-left border-b">Price</th>
            <th className="py-3 px-6 text-left border-b">Quantity</th>
            <th className="py-3 px-6 text-left border-b">Discount Percentage</th>
            <th className="py-3 px-6 text-left border-b">Added Date</th>
            <th className="py-3 px-6 text-left border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr 
              key={purchase.purchaseId} 
              className="hover:bg-gray-100 border-b transition duration-200 ease-in-out"
            > 
              <td className="py-3 px-6 text-left">{purchase.userId}</td>
              <td className="py-3 px-6 text-left">{purchase.propertyId}</td>
              <td className="py-3 px-6 text-left">{purchase.Property.name}</td>
              <td className="py-3 px-6 text-left">${purchase.Property.price}</td>
              <td className="py-3 px-6 text-left">{purchase.quantity_purchased}</td>
              <td className="py-3 px-6 text-left">{purchase.discount_percentage}%</td>
              <td className="py-3 px-6 text-left">
                {purchase.createdAt ? new Date(purchase.createdAt).toLocaleDateString() : 'N/A'}
              </td>
              <td className="py-2 px-4 flex space-x-2">
                {purchase.status !== 'Completed' && (
                  <FaCheckCircle
                    onClick={() => markAsCompleted(purchase.id)}
                    className="text-green-500 cursor-pointer"
                    title="Mark as Completed"
                  />
                )}
                {purchase.status !== 'Cancelled' && (
                  <FaTimesCircle
                    onClick={() => cancelPurchase(purchase.id)}
                    className="text-yellow-500 cursor-pointer"
                    title="Cancel Purchase"
                  />
                )}
                {isSuperAdmin && (
                  <FaTrash
                    onClick={() => handleDelete(purchase.id)}
                    className="text-red-500 cursor-pointer"
                    title="Delete Purchase"
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

export default PurchaseTable;
