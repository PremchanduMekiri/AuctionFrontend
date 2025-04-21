import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#8B8B5F] text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            Meta E Bid
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-gray-200 transition-colors">
              HOME
            </Link>
            <Link to="/services" className="hover:text-gray-200 transition-colors">
              SERVICES
            </Link>
            <Link to="/about" className="hover:text-gray-200 transition-colors">
              ABOUT
            </Link>
            <Link to="/auctions" className="hover:text-gray-200 transition-colors">
              AUCTIONS
            </Link>
            <Link to="/contact" className="hover:text-gray-200 transition-colors">
              CONTACT
            </Link>
            <Link to="/support" className="hover:text-gray-200 transition-colors">
              SUPPORT
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 