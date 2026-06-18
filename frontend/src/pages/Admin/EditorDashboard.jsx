import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Trash2, Loader2, Users, Eye, DollarSign } from 'lucide-react';

const EditorDashboard = () => {
  const [myGalleries, setMyGalleries] = useState([]);
  const [isLoadingGalleries, setIsLoadingGalleries] = useState(true);

  const fetchMyGalleries = async () => {
    try {
      const API_BASE_URL = `http://${window.location.hostname}:5000`;
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/gallery/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setMyGalleries(data);
      }
    } catch (err) {
      console.error('Failed to fetch galleries', err);
    } finally {
      setIsLoadingGalleries(false);
    }
  };

  useEffect(() => {
    fetchMyGalleries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery?')) return;
    try {
      const API_BASE_URL = `http://${window.location.hostname}:5000`;
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMyGalleries(myGalleries.filter(g => g.id !== id));
      } else {
        alert('Failed to delete gallery');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting gallery');
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-brand-gold mb-2">Editor Dashboard</h1>
        <p className="text-gray-400 mb-8">Manage your portfolio, view analytics, and connect with clients.</p>

        {/* Analytics & Clients Section (Mock Data) */}
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-brand-white mb-8 border-b border-brand-gray pb-4">Overview & Clients</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#080808] border border-brand-gray p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Views</p>
                <p className="text-2xl font-bold text-brand-white">1,248</p>
              </div>
            </div>
            
            <div className="bg-[#080808] border border-brand-gray p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center border border-brand-gold/30">
                <Users className="w-6 h-6 text-brand-gold" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Client Bookings</p>
                <p className="text-2xl font-bold text-brand-white">14</p>
              </div>
            </div>

            <div className="bg-[#080808] border border-brand-gray p-6 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">LUT Sales</p>
                <p className="text-2xl font-bold text-brand-white">$345.00</p>
              </div>
            </div>
          </div>

          <div className="bg-[#080808] border border-brand-gray rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-brand-gray bg-brand-gray/10">
              <h3 className="text-lg font-semibold text-brand-white">Recent Client Activity</h3>
            </div>
            <div className="divide-y divide-brand-gray/50">
              {[
                { name: 'Sarah Jenkins', action: 'Purchased "Cinematic Teal"', date: '2 hours ago', price: '$25.00' },
                { name: 'Marcus Wong', action: 'Booked Portrait Editing', date: 'Yesterday', price: '$150.00' },
                { name: 'Emily Chen', action: 'Purchased "Wedding Airy"', date: '3 days ago', price: '$35.00' },
              ].map((client, i) => (
                <div key={i} className="px-6 py-4 flex justify-between items-center hover:bg-brand-gray/5 transition-colors">
                  <div>
                    <p className="text-brand-white font-medium">{client.name}</p>
                    <p className="text-sm text-gray-400">{client.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-brand-gold font-medium">{client.price}</p>
                    <p className="text-xs text-gray-500">{client.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Galleries Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-brand-white mb-8 border-b border-brand-gray pb-4">My Uploaded LUTs</h2>
          
          {isLoadingGalleries ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-brand-gold animate-spin" /></div>
          ) : myGalleries.length === 0 ? (
            <div className="text-center py-12 bg-brand-gray/10 rounded-2xl border border-brand-gray/50">
              <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">You haven't uploaded any LUTs yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myGalleries.map((gallery) => {
                const API_BASE_URL = `http://${window.location.hostname}:5000`;
                return (
                  <div key={gallery.id} className="bg-[#080808] border border-brand-gray rounded-xl overflow-hidden group">
                    <div className="relative h-48 w-full">
                      <img src={`${API_BASE_URL}${gallery.after_image}`} alt={gallery.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                        <div className="flex justify-between items-end w-full">
                          <div>
                            <h3 className="text-brand-white font-bold">{gallery.title}</h3>
                            <p className="text-brand-gold font-medium text-sm">{gallery.price || 'Free'}</p>
                          </div>
                          <button 
                            onClick={() => handleDelete(gallery.id)}
                            className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-colors"
                            title="Delete Gallery"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorDashboard;
