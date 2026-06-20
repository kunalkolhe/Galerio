import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, Loader2, User, LayoutDashboard, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const [role, setRole] = useState('CLIENT'); // Default to CLIENT
  const [name, setName] = useState('');
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
      const API_BASE_URL = `http://${window.location.hostname}:5000`;
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center px-6 bg-base">
      <div className="max-w-[380px] w-full">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-display text-primary mb-2 tracking-tight">Join.</h2>
          <p className="text-secondary text-sm tracking-wide">Submit your details to join Galerio.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-900/10 border-l-2 border-red-500 text-red-400 text-xs tracking-wide">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-medium text-secondary">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setRole('CLIENT')}
                className={`cursor-pointer p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${role === 'CLIENT' ? 'bg-surface-2 border-accent text-primary shadow-[0_0_15px_rgba(217,119,6,0.1)]' : 'bg-surface-1 border-surface-2 text-secondary hover:border-accent/50 hover:text-primary'}`}
              >
                <User className={`w-5 h-5 ${role === 'CLIENT' ? 'text-accent' : ''}`} />
                <span className="text-xs font-medium tracking-wide">Client</span>
              </div>
              <div
                onClick={() => setRole('EDITOR')}
                className={`cursor-pointer p-4 border rounded-sm flex flex-col items-center justify-center gap-2 transition-all ${role === 'EDITOR' ? 'bg-surface-2 border-accent text-primary shadow-[0_0_15px_rgba(217,119,6,0.1)]' : 'bg-surface-1 border-surface-2 text-secondary hover:border-accent/50 hover:text-primary'}`}
              >
                <LayoutDashboard className={`w-5 h-5 ${role === 'EDITOR' ? 'text-accent' : ''}`} />
                <span className="text-xs font-medium tracking-wide">Editor</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide text-primary">Full Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-2 border border-surface-2 rounded-sm px-4 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="John Doe"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide text-primary">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-2 border border-surface-2 rounded-sm px-4 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                placeholder="editor@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium tracking-wide text-primary">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-2 border border-surface-2 rounded-sm pl-4 pr-10 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all tracking-widest"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary transition-colors focus:outline-none"
                tabIndex="-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 py-3.5 bg-surface-1 border border-surface-2 text-primary font-medium tracking-widest uppercase text-[10px] hover:text-accent hover:border-accent/50 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(0,0,0,0.2)]"
          >
            {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <UserPlus className="w-3.5 h-3.5" />}
            {isLoading ? 'Processing...' : 'Request Access'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-secondary">
            Already have access?{' '}
            <Link to="/login" className="text-primary hover:text-accent transition-colors font-medium">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
