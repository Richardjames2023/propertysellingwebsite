import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const EntriesLayout = () => {
  const images = [
    'pexels-stuthnagyniki-1694360.jpg',
    'pexels-binyaminmellish-1396132.jpg',
    'pexels-michaelgaultphotos-6422928.jpg',
    'pexels-nextvoyage-3051551.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  const goToPreviousSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const goToNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  return (
    <div
      className="relative w-full h-screen text-white overflow-hidden"
      onMouseEnter={() => {
        setIsPaused(true);
        setShowArrows(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setShowArrows(false);
      }}
    >
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col justify-center items-center h-screen px-4 sm:px-8">
        {/* Outlet for child routes */}
        <Outlet />
      </div>

      <button
        onClick={goToPreviousSlide}
        className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 z-20 transition-opacity duration-300 ${
          showArrows ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Add your left arrow icon here */}
      </button>
      <button
        onClick={goToNextSlide}
        className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 z-20 transition-opacity duration-300 ${
          showArrows ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Add your right arrow icon here */}
      </button>
    </div>
  );
};

export default EntriesLayout;