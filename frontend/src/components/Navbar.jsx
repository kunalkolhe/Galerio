import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Camera, Menu, X, User, LogOut, LayoutDashboard, PlusCircle, Settings, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (user && (user.role === 'EDITOR' || user.role === 'ADMIN')) {
        try {
          const token = localStorage.getItem('token');
          const res = await fetch(`${API_BASE_URL}/api/notifications`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            const unread = data.filter(n => !n.is_read).length;
            setUnreadCount(unread);
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchNotifications();
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [user, API_BASE_URL]);

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
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-500 ${
      scrolled ? 'bg-base/70 backdrop-blur-xl border-b border-surface-2 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between h-24 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="font-display font-medium text-2xl tracking-tight text-primary transition-colors group-hover:text-accent">
                Galerio.
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-12">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-widest font-medium transition-colors ${
                  location.pathname === link.path ? 'text-primary' : 'text-secondary hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="relative group">
                <div className="flex items-center gap-4 cursor-pointer">
                  <div className="flex items-center gap-3 text-primary transition-colors hover:text-accent">
                    <span className="text-sm font-medium">{user.name}</span>
                    <div className="w-8 h-8 rounded-full bg-surface-2 flex items-center justify-center">
                      <User className="w-4 h-4 text-secondary" />
                    </div>
                  </div>
                </div>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-4 w-56 bg-surface-1 border border-surface-2 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 overflow-hidden rounded-sm">
                  {(user.role?.toUpperCase() === 'EDITOR' || user.role?.toUpperCase() === 'ADMIN') && (
                    <>
                      <Link to="/notifications" className="px-5 py-4 text-sm text-secondary hover:text-primary hover:bg-surface-2 transition-colors flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="w-4 h-4" /> Inbox
                        </div>
                        {unreadCount > 0 && (
                          <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
                        )}
                      </Link>
                      <Link to="/editor" className="px-5 py-4 text-sm text-secondary hover:text-primary hover:bg-surface-2 transition-colors flex items-center gap-3">
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link to="/upload" className="px-5 py-4 text-sm text-secondary hover:text-primary hover:bg-surface-2 transition-colors flex items-center gap-3">
                        <PlusCircle className="w-4 h-4" /> Add Work
                      </Link>
                    </>
                  )}
                  <Link to="/settings" className="px-5 py-4 text-sm text-secondary hover:text-primary hover:bg-surface-2 transition-colors flex items-center gap-3">
                    <Settings className="w-4 h-4" /> Settings
                  </Link>
                  <div className="border-t border-surface-2"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-4 text-sm text-secondary hover:text-accent hover:bg-surface-2 transition-colors flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }}>
                <Link to="/register" className="px-6 py-3 bg-surface-1 border border-surface-2 text-primary hover:text-accent hover:border-accent/50 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] transition-all duration-300 text-xs uppercase tracking-widest font-medium">
                  Get Started
                </Link>
              </motion.div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-secondary hover:text-primary transition-colors">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-surface-1 border-b border-surface-2 absolute w-full shadow-2xl"
          >
            <div className="px-6 py-8 space-y-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg font-display tracking-wide ${
                    location.pathname === link.path ? 'text-accent' : 'text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user ? (
                <div className="border-t border-surface-2 pt-6 mt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center">
                      <User className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="text-primary font-display text-lg">{user.name}</p>
                      <p className="text-sm text-secondary">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {(user.role?.toUpperCase() === 'EDITOR' || user.role?.toUpperCase() === 'ADMIN') && (
                      <>
                        <Link to="/notifications" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-sm flex items-center justify-between text-secondary hover:text-primary hover:bg-surface-2 transition-colors">
                          <div className="flex items-center gap-3"><Bell className="w-4 h-4"/> Inbox</div>
                          {unreadCount > 0 && <span className="bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>}
                        </Link>
                        <Link to="/editor" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-sm flex items-center gap-3 text-secondary hover:text-primary hover:bg-surface-2 transition-colors"><LayoutDashboard className="w-4 h-4"/> Dashboard</Link>
                        <Link to="/upload" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-sm flex items-center gap-3 text-secondary hover:text-primary hover:bg-surface-2 transition-colors"><PlusCircle className="w-4 h-4"/> Add Work</Link>
                      </>
                    )}
                    <Link to="/settings" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-sm flex items-center gap-3 text-secondary hover:text-primary hover:bg-surface-2 transition-colors"><Settings className="w-4 h-4"/> Settings</Link>
                  </div>
                  <div className="border-t border-surface-2 pt-4">
                    <button
                      onClick={() => { setIsOpen(false); handleLogout(); }}
                      className="w-full flex items-center justify-center gap-3 text-center px-5 py-4 border border-surface-2 text-secondary hover:text-accent hover:border-accent/50 transition-colors uppercase text-xs tracking-widest font-medium"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center mt-6 px-5 py-4 bg-surface-2 text-primary hover:text-accent border border-surface-2 transition-colors uppercase text-xs tracking-widest font-medium"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
