import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="relative z-50 px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/elephantsLogoOnly.jpg" 
              alt="Elephants.inc Logo" 
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-gray-800">Elephants.inc</span>
          </Link>
          <div className="hidden md:flex items-center space-x-1 text-black">
            <span>×</span>
            <div className="flex items-center space-x-2 ml-2">
              <div className="p-0.5 bg-black rounded-md">
                <img
                  src="/fluxbeam.png"
                  alt="fluxbeam Logo"
                  className="w-6 h-6 rounded object-cover"
                />
              </div>
              <span className="font-semibold">fluxbeam</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="/#features" className="text-gray-600 hover:text-primary-accent transition-colors">Features</a>
          <a href="/#footer-section" className="text-gray-600 hover:text-primary-accent transition-colors">About</a>
          {/* <Link to="/tracking" className="text-gray-600 hover:text-primary-accent transition-colors">Tracking</Link> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
