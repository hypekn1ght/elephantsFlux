import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer id="footer-section" className="bg-neutral-bg-light py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <img 
                src="/elephantsLogoOnly.jpg" 
                alt="Elephants.inc Logo" 
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-gray-800">Elephants.inc</span>
            </div>
            <p className="text-gray-600">
              Payments reimagined for the digital age.
            </p>
          </div>

          <div className="space-y-4">
            {/* Placeholder for potential future links */}
          </div>

          <div className="space-y-4">
            {/* Placeholder for potential future links */}
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800">Legal</h4>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-600 hover:text-primary-accent transition-colors">Privacy</Link>
              <Link to="/terms" className="block text-gray-600 hover:text-primary-accent transition-colors">Terms</Link>
              <Link to="/disclosure" className="block text-gray-600 hover:text-primary-accent transition-colors">Risk Disclosure</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-bg pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Elephants.inc × fluxbeam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
