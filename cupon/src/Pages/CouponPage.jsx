import React from 'react';
import { useLocation } from 'react-router-dom'; // to get user details from state
import CouponCard from '../components/CouponCard';

const CouponPage = () => {
  const location = useLocation();
  const { userDetails } = location.state; // Get user details from the form

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Pick a Card to Reveal Your Discount</h2>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((card, index) => (
          <CouponCard key={index} cardNumber={index + 1} userDetails={userDetails} />
        ))}
      </div>
    </div>
  );
};

export default CouponPage;