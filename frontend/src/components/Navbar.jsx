import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Camera, Menu, X, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 bg-brand-black/90 backdrop-blur-md border-b border-brand-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group">
              <Camera className="w-8 h-8 text-brand-gold group-hover:scale-110 transition-transform" />
              <span className="font-bold text-xl tracking-wider text-brand-white">Galerio</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-brand-gold ${
                  location.pathname === link.path ? 'text-brand-gold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="relative group">
                <div className="flex items-center gap-4 border-l border-brand-gray pl-4 cursor-pointer">
                  <div className="flex items-center gap-2 text-brand-white">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold">
                      <User className="w-4 h-4 text-brand-gold" />
                    </div>
                    <span className="text-sm font-medium">{user.name}</span>
                  </div>
                </div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-brand-black border border-brand-gray rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden pt-1">
                  <Link to="/editor" className="block px-4 py-3 text-sm text-gray-300 hover:text-brand-gold hover:bg-brand-gray/50 border-b border-brand-gray/30">
                    Editor Dashboard
                  </Link>
                  <Link to="/upload" className="block px-4 py-3 text-sm text-gray-300 hover:text-brand-gold hover:bg-brand-gray/50 border-b border-brand-gray/30">
                    Add Work
                  </Link>
                  <Link to="/settings" className="block px-4 py-3 text-sm text-gray-300 hover:text-brand-gold hover:bg-brand-gray/50 border-b border-brand-gray/30">
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-red-400 hover:text-red-500 hover:bg-red-500/10 transition-colors flex items-center justify-between"
                  >
                    Logout <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="px-5 py-2 rounded-full bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-all text-sm font-medium">
                Editor Login
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-brand-gold">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-black border-b border-brand-gray absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path ? 'text-brand-gold bg-brand-gray/50' : 'text-gray-300 hover:text-brand-gold hover:bg-brand-gray/30'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="border-t border-brand-gray mt-4 pt-4 px-3">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold">
                    <User className="w-5 h-5 text-brand-gold" />
                  </div>
                  <div>
                    <p className="text-brand-white font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <Link to="/editor" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 text-sm text-gray-300 hover:text-brand-gold hover:bg-brand-gray/50 rounded">
                    Editor Dashboard
                  </Link>
                  <Link to="/upload" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 text-sm text-gray-300 hover:text-brand-gold hover:bg-brand-gray/50 rounded">
                    Add Work
                  </Link>
                  <Link to="/settings" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 text-sm text-gray-300 hover:text-brand-gold hover:bg-brand-gray/50 rounded">
                    Settings
                  </Link>
                </div>
                <button
                  onClick={() => { setIsOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center gap-2 text-center px-5 py-3 rounded border border-red-500 text-red-500 font-medium hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-4 px-5 py-3 rounded bg-brand-gold text-brand-black font-medium"
              >
                Client Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
