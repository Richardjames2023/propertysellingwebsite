import React from 'react';
import { FaHandshake, FaShieldAlt, FaHome, FaThumbsUp } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaHandshake className="text-green-600 text-5xl mb-4" />,
    title: 'Trusted Partners',
    description: 'Work with highly vetted partners to ensure the best properties.',
  },
  {
    icon: <FaShieldAlt className="text-green-600 text-5xl mb-4" />,
    title: 'Secure Transactions',
    description: 'Our platform ensures safe and secure transactions for peace of mind.',
  },
  {
    icon: <FaHome className="text-green-600 text-5xl mb-4" />,
    title: 'Wide Property Selection',
    description: 'Choose from a wide range of property options suited to your needs.',
  },
  {
    icon: <FaThumbsUp className="text-green-600 text-5xl mb-4" />,
    title: 'Customer Satisfaction',
    description: 'Dedicated support team ensuring complete customer satisfaction.',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 text-green-800">Why Choose Us</h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover what sets us apart from other real estate platforms. Our commitment is to offer the best properties, secure transactions, and unparalleled service.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 bg-gray-50">
              {benefit.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;