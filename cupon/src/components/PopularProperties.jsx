import React from 'react';
import Image from '../assets/pexels-nextvoyage-3051551.jpg'
import Image2 from '../assets/pexels-michaelgaultphotos-6422928.jpg'

const properties = [
  {
    id: 1,
    image: Image,
    location: 'Lekki, City ',
    price: '₦ 45,000,000',
    description: 'Luxurious 3-bedroom apartment in the heart of the city.',
  },
  {
    id: 2,
    image: Image2,
    location: 'Eko, Alantic',
    price: '₦ 25,000,000',
    description: 'Cozy 2-bedroom house in a quiet neighborhood.',
  },
  {
    id: 3,
    image: Image,
    location: 'Lekki, Phase 1',
    price: '₦ 60,000,000',
    description: 'Modern villa with stunning sea views.',
  },
  {
    id: 4,
    image: Image2,
    location: 'VI, City',
    price: '₦ 15,000,000',
    description: 'Spacious country home with a large garden.',
  },
];

const PopularProperties = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-800">Popular Properties</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Browse through some of the most sought-after properties currently available.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
            >
              <img src={property.image} alt={property.location} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{property.location}</h3>
                <p className="text-green-700 font-bold mb-4">{property.price}</p>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProperties;