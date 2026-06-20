import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogIn, Loader2, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5000`;
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save token and user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role and refresh window to update navbar state
      if (data.user.role === 'EDITOR' || data.user.role === 'ADMIN') {
        window.location.href = '/editor';
      } else {
        window.location.href = '/gallery';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-6 relative overflow-hidden bg-base">
      
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/4 translate-y-1/4 w-[800px] h-[800px] bg-surface-2/50 rounded-full blur-[150px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="max-w-[420px] w-full relative z-10"
      >
        <div className="bg-surface-1/40 backdrop-blur-2xl border border-white/5 p-8 md:p-10 rounded-2xl cinematic-shadow shadow-[0_8px_32px_rgba(0,0,0,0.8)]">
          <div className="mb-10 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl font-display text-primary mb-3 tracking-tight"
            >
              Access.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-secondary text-sm tracking-wide"
            >
              Enter your credentials to continue.
            </motion.p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs tracking-wide flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-medium tracking-wide text-primary/80">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="relative w-full bg-base/80 backdrop-blur-sm border border-white/5 rounded-lg px-4 py-3.5 text-primary placeholder-secondary/50 focus:outline-none focus:border-accent/50 focus:bg-surface-2 transition-all"
                  placeholder="editor@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-medium tracking-wide text-primary/80">Password</label>
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 blur-md rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="relative w-full bg-base/80 backdrop-blur-sm border border-white/5 rounded-lg pl-4 pr-12 py-3.5 text-primary placeholder-secondary/50 focus:outline-none focus:border-accent/50 focus:bg-surface-2 transition-all tracking-widest"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-secondary hover:text-primary hover:bg-white/5 rounded-full transition-all focus:outline-none z-10"
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 py-4 bg-surface-2 border border-surface-2 text-primary rounded-lg font-medium tracking-widest uppercase text-xs hover:text-accent hover:border-accent/50 hover:shadow-[0_0_20px_rgba(217,119,6,0.2)] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />} 
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </motion.button>
          </form>
        
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-xs text-secondary">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:text-accent transition-colors font-medium ml-1">
                Join Galerio
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
