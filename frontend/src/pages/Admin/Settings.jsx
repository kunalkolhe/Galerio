import React, { useState, useEffect } from 'react';
import { User, Settings as SettingsIcon, Save, Loader2 } from 'lucide-react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    contact_phone: '',
    editor_type: '',
    charges: '',
    bio: '',
    instagram: '',
    youtube: '',
    website: '',
    other_link: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState('');

  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setProfile({
            name: data.name || '',
            address: data.address || '',
            contact_phone: data.contact_phone || '',
            editor_type: data.editor_type || '',
            charges: data.charges || '',
            bio: data.bio || '',
            instagram: data.instagram || '',
            youtube: data.youtube || '',
            website: data.website || '',
            other_link: data.other_link || ''
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [API_BASE_URL]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const updatedUser = await res.json();
        // Update local storage user name
        const lsUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...lsUser, name: updatedUser.name }));
        setStatus('Profile updated successfully!');
      } else {
        setStatus('Failed to update profile.');
      }
    } catch (err) {
      setStatus('Error updating profile.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="pt-32 pb-16 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-gold" /></div>;

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-8 h-8 text-brand-gold" />
          <h1 className="text-4xl font-bold text-brand-white">Editor Profile Settings</h1>
        </div>

        <div className="bg-[#080808] border border-brand-gray p-8 rounded-2xl">
          <p className="text-gray-400 mb-8">
            Complete your public profile so clients can find you and book your editing services.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-white">Full Name *</label>
                <input 
                  type="text" name="name" value={profile.name} onChange={handleChange} required
                  className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-white">Editor Type *</label>
                <select 
                  name="editor_type" value={profile.editor_type} onChange={handleChange} required
                  className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold appearance-none"
                >
                  <option value="">Select your specialty</option>
                  <option value="Photo Editor">Photo Editor</option>
                  <option value="Video Editor">Video Editor</option>
                  <option value="Colorist">Colorist</option>
                  <option value="Retoucher">Retoucher</option>
                  <option value="Hybrid (Photo & Video)">Hybrid (Photo & Video)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-white">Contact Phone</label>
                <input 
                  type="text" name="contact_phone" value={profile.contact_phone} onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-brand-white">Charges / Rates</label>
                <input 
                  type="text" name="charges" value={profile.charges} onChange={handleChange}
                  placeholder="e.g. $50/hr or Starting at $100"
                  className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Location / Address</label>
              <input 
                type="text" name="address" value={profile.address} onChange={handleChange}
                placeholder="City, Country (e.g. New York, USA)"
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-brand-white">Bio / About Me</label>
              <textarea 
                name="bio" value={profile.bio} onChange={handleChange} rows="4"
                placeholder="Tell clients about your experience, software you use (Premiere, Lightroom, DaVinci), and your unique style."
                className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
              />
            </div>

            <div className="pt-6 border-t border-brand-gray/50">
              <h3 className="text-xl font-bold text-brand-white mb-4">Social Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-white">Instagram URL</label>
                  <input 
                    type="url" name="instagram" value={profile.instagram} onChange={handleChange}
                    placeholder="https://instagram.com/..."
                    className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-white">YouTube URL</label>
                  <input 
                    type="url" name="youtube" value={profile.youtube} onChange={handleChange}
                    placeholder="https://youtube.com/..."
                    className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-white">Portfolio Website</label>
                  <input 
                    type="url" name="website" value={profile.website} onChange={handleChange}
                    placeholder="https://myportfolio.com"
                    className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-brand-white">Other Link</label>
                  <input 
                    type="url" name="other_link" value={profile.other_link} onChange={handleChange}
                    placeholder="https://linktr.ee/..."
                    className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold"
                  />
                </div>
              </div>
            </div>

            {status && (
              <div className={`p-4 rounded-lg text-sm ${status.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {status}
              </div>
            )}

            <button 
              type="submit" disabled={isSaving}
              className="w-full md:w-auto px-8 py-3 bg-brand-gold text-brand-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              {isSaving ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
