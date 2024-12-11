// ProductList.js
import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard2';

const ProductList = ({ properties, cartProductIds, onAddToCart }) => {
 
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
                 <ProductCard
                 key={property.pid}
                 property={property}
                 cartProductIds={cartProductIds}
                 onAddToCart={onAddToCart}
               />
        ))}
      </div>
    </div>
  );
};

export default ProductList;