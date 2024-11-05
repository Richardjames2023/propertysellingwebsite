import React, { useState, useEffect } from "react";
import ProductPage from "../components/ProductPage";
import AddToCart from "../components/AddToCart";

const ParentComponent = ({ userLocation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const allProducts = [
    { id: 1, title: "Product 1", description: "Description 1", price: 100, location: "Abuja", imageUrl: "/images/product1.jpg" },
    { id: 2, title: "Product 2", description: "Description 2", price: 200, location: "Abuja", imageUrl: "/images/product2.jpg" },
    { id: 3, title: "Product 3", description: "Description 3", price: 300, location: "Lagos", imageUrl: "/images/product3.jpg" },
    { id: 4, title: "Product 4", description: "Description 4", price: 400, location: "Lagos", imageUrl: "/images/product4.jpg" },
  ];

  useEffect(() => {
    const productsForLocation = allProducts.filter(
      (product) => product.location.toLowerCase() === userLocation.toLowerCase()
    );
    setFilteredProducts(productsForLocation);
  }, [userLocation]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <div className="flex">
      <ProductPage products={filteredProducts} addToCart={addToCart} />
      <AddToCart cartItems={cartItems} />
    </div>
  );
};

export default ParentComponent;