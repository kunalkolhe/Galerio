import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

// Custom Outline Icons matching Lucide style
const Instagram = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Youtube = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Twitter = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-surface-1 pt-8 pb-4 border-t border-surface-2"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 mb-8">
          
          {/* Column 1: Logo & Tagline */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display font-medium text-3xl tracking-tight text-primary hover:text-accent transition-colors">
                Galerio.
              </span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-sm">
              Premium portfolio platform for elite editors and colorists.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-medium text-secondary mb-8">
              Explore
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-primary hover:text-accent transition-colors text-sm font-medium">Home</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-primary hover:text-accent transition-colors text-sm font-medium">Gallery</Link>
              </li>
              <li>
                <Link to="/about" className="text-primary hover:text-accent transition-colors text-sm font-medium">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary hover:text-accent transition-colors text-sm font-medium">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest font-medium text-secondary mb-8">
              Connect
            </h4>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-surface-2 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 hover:bg-surface-2 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-surface-2 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 hover:bg-surface-2 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-surface-2 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 hover:bg-surface-2 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="mailto:contact@galerio.com" className="w-10 h-10 rounded-full border border-surface-2 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/50 hover:bg-surface-2 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-surface-2 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary tracking-wide">
            &copy; {new Date().getFullYear()} Galerio. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
