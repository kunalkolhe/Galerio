import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-brand-gray pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Camera className="w-8 h-8 text-brand-gold" />
              <span className="font-bold text-2xl tracking-wider text-brand-white">LUX<span className="text-brand-gold">LUTs</span></span>
            </Link>
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
        
        <div className="border-t border-brand-gray pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} LUXLUTs Gallery. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with <span className="text-brand-gold">♥</span></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
