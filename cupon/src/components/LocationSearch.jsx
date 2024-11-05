import React from 'react';
import backgroundImage from '../assets/pexels-binyaminmellish-1396132.jpg';

const LocationSearch = () => {
  return (
    <section className="relative py-20 bg-cover bg-center text-white" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Properties in Your Desired Location</h2>
        <p className="text-lg mb-8 max-w-lg mx-auto">
          Discover properties based on your preferred location. Just enter your city or area and explore the best options we have to offer.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Enter city or area"
            className="w-full md:w-auto px-4 py-3 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition duration-300">
            Search Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default LocationSearch;