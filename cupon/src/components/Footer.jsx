import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm">
              We are a leading property selling platform dedicated to helping you find your dream home.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#" className="text-sm hover:underline">Home</a></li>
              <li><a href="#" className="text-sm hover:underline">Properties</a></li>
              <li><a href="#" className="text-sm hover:underline">Categories</a></li>
              <li><a href="#" className="text-sm hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-sm">123 Main Street, City, Country</p>
            <p className="text-sm">Phone: (123) 456-7890</p>
            <p className="text-sm">Email: info@propertywebsite.com</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-700 py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">© 2024 Property Website. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;