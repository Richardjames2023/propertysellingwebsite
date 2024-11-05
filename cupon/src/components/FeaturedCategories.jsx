import React from 'react';
import Image from '../assets/pexels-nextvoyage-3051551.jpg'
import Image2 from '../assets/pexels-michaelgaultphotos-6422928.jpg'

const categories = [
  { title: 'Residential', image: Image },
  { title: 'Commercial', image: Image2 },
  { title: 'Land', image: Image },
  { title: 'Luxury', image: Image2 },
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Featured Categories</h2>
        <p className="text-lg mb-12">
          Explore our featured categories and find the perfect property for you.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <img src={category.image} alt={category.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity opacity-0 group-hover:opacity-100">
                <h3 className="text-white text-xl font-bold">{category.title}</h3>
              </div>
              <a href="#" className="absolute inset-0" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;