import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-brand-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-bold text-3xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
                Galerio
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6 leading-relaxed">
              Elevating your photography with premium color grading. We transform ordinary moments into cinematic masterpieces.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-gray/80 transition-all">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-gray/80 transition-all">
                TW
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center text-gray-400 hover:text-brand-gold hover:bg-brand-gray/80 transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-brand-white font-semibold mb-6 tracking-wide uppercase text-sm">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/gallery" className="text-gray-400 hover:text-brand-gold transition-colors">Portfolio Gallery</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-brand-gold transition-colors">About the Editor</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-brand-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-brand-white font-semibold mb-6 tracking-wide uppercase text-sm">Legal</h3>
            <ul className="space-y-4">
              <li><Link to="/privacy" className="text-gray-400 hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-brand-gold transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-gray mt-12 pt-8 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Galerio. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Developed by <span className="text-brand-gold font-medium">Kunal Kolhe</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
