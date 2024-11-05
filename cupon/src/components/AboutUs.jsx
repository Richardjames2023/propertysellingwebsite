import React from 'react';
import { FaHome, FaUsers, FaShieldAlt } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">About Us</h2>
        <p className="text-gray-600 mb-4">
          We are dedicated to connecting people with their dream properties, providing unparalleled service, and ensuring a seamless experience.
        </p>
        <p className="text-gray-600 mb-8">
          Our platform offers a wide range of properties to suit every need, from residential homes to commercial spaces. With a team of experienced professionals, we strive to make the property buying and selling process as easy as possible.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <FaHome size={48} className="text-green-700 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Wide Range of Properties</h3>
            <p className="text-gray-600">
              Explore our extensive listings to find the perfect property that fits your lifestyle and budget.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <FaUsers size={48} className="text-green-700 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Client-Centric Approach</h3>
            <p className="text-gray-600">
              Our team is committed to understanding your needs and providing personalized service throughout your journey.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <FaShieldAlt size={48} className="text-green-700 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Trust and Security</h3>
            <p className="text-gray-600">
              We prioritize your safety and privacy, ensuring a secure environment for all transactions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;