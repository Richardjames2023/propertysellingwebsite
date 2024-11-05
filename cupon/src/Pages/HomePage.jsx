import React from "react";
import AboutUs from "../components/AboutUs";
//import CombinedPage from '../components/CombinedPage'
import FeaturedCategories from "../components/FeaturedCategories";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LocationSearch from "../components/LocationSearch";
import PopularProperties from "../components/PopularProperties";
import WhyChooseUs from "../components/WhyCooseUs";
// import PropertySearch from "../components/PropertySearch";
// import images from '../assets/images.json';

const images = [
  'pexels-stuthnagyniki-1694360.jpg',
  'pexels-binyaminmellish-1396132.jpg',
  'pexels-michaelgaultphotos-6422928.jpg',
  'pexels-nextvoyage-3051551.jpg',
];


const HomePage = () => {

  return (
    <div className="">
      <HeroSection/>
      <PopularProperties/>
      <WhyChooseUs/>
      <LocationSearch/>
      <FeaturedCategories/>
      <AboutUs/>
      <Footer/>
      {/* <CombinedPage /> */}
    </div>
  );
};

export default HomePage;