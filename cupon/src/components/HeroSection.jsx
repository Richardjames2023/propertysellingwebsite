import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const HeroSection = () => {
    const images = [
        'pexels-stuthnagyniki-1694360.jpg',
        'pexels-binyaminmellish-1396132.jpg',
        'pexels-michaelgaultphotos-6422928.jpg',
        'pexels-nextvoyage-3051551.jpg',
      ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds for each slide
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Navigation functions
  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div
      className="relative w-full h-[710px] text-white overflow-hidden"
      onMouseEnter={() => {
        setIsPaused(true);
        setShowArrows(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setShowArrows(false);
      }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          Discover Your Dream Property Today!
        </h1>
        <p className="text-lg sm:text-xl mb-6 max-w-2xl">
          Exclusive properties at unbeatable prices across top locations.
        </p>
        
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
            <Link to='/products'>
            Browse Properties
            </Link>
          </button>
          <button className="bg-transparent border border-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-black transition duration-300">
            Contact Us
          </button>
        </div>
      </div>

      {/* Arrows for navigation with fade effect */}
      <button
        onClick={goToPreviousSlide}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 z-20 transition-opacity duration-300 ${
          showArrows ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <FaArrowLeft size={20} />
      </button>
      <button
        onClick={goToNextSlide}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 z-20 transition-opacity duration-300 ${
          showArrows ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
};

export default HeroSection;