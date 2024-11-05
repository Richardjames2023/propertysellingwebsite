// ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard2';
import image1 from '../assets/pexels-binyaminmellish-1396132.jpg';
import image2 from '../assets/pexels-michaelgaultphotos-6422928.jpg';

const ProductList = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Mock product data
    const mockProducts = [
      {
        id: 1,
        name: '3 Bedroom Flat',
        description: 'This is the description for product 1',
        price: 29000000,
        image: image1,
      },
      {
        id: 2,
        name: '4 Bedroom',
        description: 'This is the description for product 2',
        price: 4500000,
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'This is the description for product 3',
        price: 4999,
        image: image2,
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'This is the description for product 4',
        price: 4999,
        image: 'https://via.placeholder.com/150',
      },
      // Add more products as needed
    ];

    // Simulate API data fetching with mock data
    setProducts(mockProducts);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart}  />
        ))}
      </div>
    </div>
  );
};

export default ProductList;