import React, { useState, useEffect } from 'react';
import { User, Settings as SettingsIcon, Save, Loader2, Upload, Trash2, Camera, Lock } from 'lucide-react';

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
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordStatus, setPasswordStatus] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [userRole, setUserRole] = useState('CLIENT');

  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';

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
            setUserRole(data.role || 'CLIENT');
            if (data.profile_image) {
              setProfileImagePreview(`${API_BASE_URL}${data.profile_image}`);
            }
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

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
      setProfileImagePreview(URL.createObjectURL(e.target.files[0]));
      // Reset the remove flag if they choose a new image
      setProfile(prev => ({ ...prev, remove_profile_image: false }));
    }
  };

  const handleRemoveImage = () => {
    setProfileImageFile(null);
    setProfileImagePreview(null);
    setProfile(prev => ({ ...prev, remove_profile_image: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatus('');
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (profile[key] !== null && profile[key] !== undefined) {
          formData.append(key, profile[key]);
        }
      });
      if (profileImageFile) {
        formData.append('profile_image', profileImageFile);
      }

      const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}` 
        },
        body: formData
      });
      if (res.ok) {
        const updatedUser = await res.json();
        const lsUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...lsUser, name: updatedUser.name }));
        setStatus('Profile updated successfully!');
      } else {
        const errData = await res.json().catch(() => ({}));
        setStatus(`Failed to update profile: ${errData.error || res.statusText}`);
      }
    } catch (err) {
      setStatus(`Error updating profile: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus('New passwords do not match.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordStatus('New password must be at least 6 characters.');
      return;
    }

    setIsSavingPassword(true);
    setPasswordStatus('');
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/auth/password`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });
      if (res.ok) {
        setPasswordStatus('success');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => setPasswordStatus(''), 5000);
      } else {
        const errData = await res.json().catch(() => ({}));
        setPasswordStatus(`Error: ${errData.error || res.statusText}`);
      }
    } catch (err) {
      setPasswordStatus(`Error updating password: ${err.message}`);
    } finally {
      setIsSavingPassword(false);
    }
  };

  const inputClass = "w-full bg-surface-2 border border-surface-2 rounded-sm px-4 py-3 text-primary placeholder-secondary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all";

  if (isLoading) return <div className="pt-32 pb-16 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>;

  return (
    <div className="pt-32 pb-16 min-h-screen bg-base">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-4">
          <SettingsIcon className="w-8 h-8 text-accent" />
          <h1 className="text-4xl md:text-5xl font-display text-primary">Editor Settings</h1>
        </div>
        <p className="text-secondary text-lg mb-10">Update your public profile.</p>

        <div className="bg-surface-1 border border-surface-2 p-8 rounded-sm cinematic-shadow">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* DP Upload Section */}
            <div className="flex flex-col items-center gap-6 pb-8 border-b border-surface-2/50">
              <div className="w-32 h-32 rounded-full border border-surface-2 overflow-hidden bg-surface-2 flex items-center justify-center shrink-0 cinematic-shadow relative group">
                {profileImagePreview ? (
                  <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-secondary" />
                )}
                <div className="absolute inset-0 bg-base/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center pointer-events-auto gap-4">
                  <label className="cursor-pointer flex items-center gap-2 hover:text-accent text-white text-xs uppercase tracking-widest font-medium transition-colors">
                    <Camera className="w-4 h-4" /> Change
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {(profileImagePreview || profile.profile_image) && (
                    <button type="button" onClick={handleRemoveImage} className="flex items-center gap-2 hover:text-red-400 text-white text-xs uppercase tracking-widest font-medium transition-colors">
                      <Trash2 className="w-4 h-4" /> Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium tracking-wide text-primary">Profile Picture</p>
                <p className="text-xs text-secondary italic mt-1">Click image to change. Recommended: 500x500px</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-medium tracking-wide text-primary">Name *</label>
                <input 
                  type="text" name="name" value={profile.name} onChange={handleChange} required
                  className={inputClass}
                />
              </div>

              {userRole !== 'CLIENT' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-primary">Specialty *</label>
                  <select 
                    name="editor_type" value={profile.editor_type} onChange={handleChange} required
                    className={`${inputClass} appearance-none cursor-pointer [&>option]:bg-surface-2 [&>option]:text-primary`}
                  >
                    <option value="">Select your specialty</option>
                    <option value="Photo Editor">Photo Editor</option>
                    <option value="Video Editor">Video Editor</option>
                    <option value="Colorist">Colorist</option>
                    <option value="Retoucher">Retoucher</option>
                    <option value="Hybrid (Photo & Video)">Hybrid (Photo & Video)</option>
                  </select>
                </div>
              )}

              <div className="space-y-3">
                <label className="text-sm font-medium tracking-wide text-primary">Phone</label>
                <input 
                  type="text" name="contact_phone" value={profile.contact_phone} onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={inputClass}
                />
              </div>

              {userRole !== 'CLIENT' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-primary">Rate</label>
                  <input 
                    type="text" name="charges" value={profile.charges} onChange={handleChange}
                    placeholder="e.g. $50/hr or Starting at $100"
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium tracking-wide text-primary">Location</label>
              <input 
                type="text" name="address" value={profile.address} onChange={handleChange}
                placeholder="e.g. New York, USA"
                className={inputClass}
              />
            </div>
            {userRole !== 'CLIENT' && (
              <>
                <div className="space-y-3">
                  <label className="text-sm font-medium tracking-wide text-primary">Bio</label>
                  <textarea 
                    name="bio" value={profile.bio} onChange={handleChange} rows="4"
                    placeholder="Write a short bio."
                    className={inputClass}
                  />
                </div>

                <div className="pt-8 border-t border-surface-2">
                  <h3 className="text-2xl font-display text-primary mb-6">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-sm font-medium tracking-wide text-primary">Instagram</label>
                      <input 
                        type="url" name="instagram" value={profile.instagram} onChange={handleChange}
                        placeholder="https://instagram.com/..."
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium tracking-wide text-primary">YouTube</label>
                      <input 
                        type="url" name="youtube" value={profile.youtube} onChange={handleChange}
                        placeholder="https://youtube.com/..."
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium tracking-wide text-primary">Website</label>
                      <input 
                        type="url" name="website" value={profile.website} onChange={handleChange}
                        placeholder="https://myportfolio.com"
                        className={inputClass}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-sm font-medium tracking-wide text-primary">Other Link</label>
                      <input 
                        type="url" name="other_link" value={profile.other_link} onChange={handleChange}
                        placeholder="https://linktr.ee/..."
                        className={inputClass}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div className="pt-8 border-t border-surface-2">
              {status && (
                <div className={`p-4 rounded-sm text-sm font-medium ${status.includes('success') ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {status}
                </div>
              )}
            </div>

            <button 
              type="submit" disabled={isSaving}
              className="w-full md:w-auto px-8 py-4 bg-accent text-base tracking-widest uppercase text-sm font-medium rounded-sm hover:bg-accent/80 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="mt-8 bg-surface-1 border border-surface-2 p-8 rounded-sm cinematic-shadow">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-accent" />
            <h2 className="text-2xl font-display text-primary">Security Settings</h2>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div className="space-y-3 max-w-md">
              <label className="text-sm font-medium tracking-wide text-primary">Current Password</label>
              <input 
                type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} required
                className={inputClass}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
              <div className="space-y-3">
                <label className="text-sm font-medium tracking-wide text-primary">New Password</label>
                <input 
                  type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} required minLength={6}
                  className={inputClass}
                />
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium tracking-wide text-primary">Confirm New Password</label>
                <input 
                  type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} required minLength={6}
                  className={inputClass}
                />
              </div>
            </div>

            {passwordStatus && (
              <div className={`p-4 rounded-sm text-sm font-medium max-w-2xl ${passwordStatus === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                {passwordStatus === 'success' ? 'Password updated successfully!' : passwordStatus}
              </div>
            )}

            <button 
              type="submit" disabled={isSavingPassword}
              className="px-8 py-4 bg-surface-2 text-primary border border-surface-2 text-base tracking-widest uppercase text-sm font-medium rounded-sm hover:text-accent hover:border-accent/50 transition-colors flex items-center justify-center gap-3 disabled:opacity-50 mt-4"
            >
              {isSavingPassword ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSavingPassword ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Settings;
