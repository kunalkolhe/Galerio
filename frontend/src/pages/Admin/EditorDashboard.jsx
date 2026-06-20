import React, { useState, useEffect } from 'react';
import { Image as ImageIcon, Trash2, Loader2, Users, Eye, DollarSign, Star } from 'lucide-react';

const EditorDashboard = () => {
  const [myGalleries, setMyGalleries] = useState([]);
  const [isLoadingGalleries, setIsLoadingGalleries] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  const fetchMyGalleries = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5000`;
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

  const fetchMyReviews = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5000`;
        const response = await fetch(`${API_BASE_URL}/api/reviews/${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data.reviews || []);
        }
      }
    } catch (err) {
      console.error('Failed to fetch reviews', err);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchMyGalleries();
    fetchMyReviews();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5000`;
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        setMyGalleries(myGalleries.filter(g => g.id !== id));
      } else {
        alert('Failed to delete project');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting project');
    }
  };

  return (
    <div className="pt-32 pb-16 min-h-screen bg-base">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h1 className="text-4xl md:text-5xl font-display text-primary mb-4">Editor Dashboard</h1>
        <p className="text-secondary text-lg mb-10">Manage your portfolio and clients.</p>

        {/* Analytics & Clients Section (Mock Data) */}
        <div className="mt-8">
          <h2 className="text-3xl font-display text-primary mb-8 border-b border-surface-2 pb-4">Overview</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-surface-1 border border-surface-2 p-6 rounded-sm cinematic-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/30">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-secondary text-sm font-medium tracking-wide">Total Views</p>
                <p className="text-2xl font-display text-primary">1,248</p>
              </div>
            </div>
            
            <div className="bg-surface-1 border border-surface-2 p-6 rounded-sm cinematic-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/30">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-secondary text-sm font-medium tracking-wide">Client Bookings</p>
                <p className="text-2xl font-display text-primary">14</p>
              </div>
            </div>

            <div className="bg-surface-1 border border-surface-2 p-6 rounded-sm cinematic-shadow flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
                <DollarSign className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <p className="text-secondary text-sm font-medium tracking-wide">Sales</p>
                <p className="text-2xl font-display text-primary">$345.00</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-1 border border-surface-2 rounded-sm cinematic-shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-2 bg-surface-2/30">
              <h3 className="text-lg font-display tracking-wide text-primary">Recent Client Reviews</h3>
            </div>
            <div className="divide-y divide-surface-2/50">
              {isLoadingReviews ? (
                <div className="p-6 flex justify-center"><Loader2 className="w-6 h-6 text-accent animate-spin" /></div>
              ) : reviews.length === 0 ? (
                <div className="p-6 text-center text-secondary text-sm">You haven't received any reviews yet.</div>
              ) : (
                reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="px-6 py-5 hover:bg-surface-2/30 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-2 overflow-hidden border border-white/10 shrink-0 flex items-center justify-center">
                          {review.client?.profile_image ? (
                            <img src={`http://${window.location.hostname}:5000${review.client.profile_image}`} alt={review.client.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs font-bold text-secondary">{review.client?.name?.charAt(0) || 'U'}</span>
                          )}
                        </div>
                        <p className="text-primary font-medium tracking-wide">{review.client?.name || 'Anonymous Client'}</p>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'fill-accent text-accent' : 'text-surface-2'}`} />
                        ))}
                      </div>
                    </div>
                    {review.comment && (
                      <p className="text-sm text-secondary pl-11 line-clamp-2">{review.comment}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* My Galleries Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-display text-primary mb-8 border-b border-surface-2 pb-4">My Portfolio</h2>
          
          {isLoadingGalleries ? (
            <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>
          ) : myGalleries.length === 0 ? (
            <div className="text-center py-16 bg-surface-1 rounded-sm border border-surface-2 cinematic-shadow">
              <ImageIcon className="w-12 h-12 text-secondary mx-auto mb-4" />
              <p className="text-secondary tracking-wide">You haven't uploaded any projects yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myGalleries.map((gallery) => {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || `http://${window.location.hostname}:5000`;
                return (
                  <div key={gallery.id} className="bg-surface-1 border border-surface-2 rounded-sm overflow-hidden group cinematic-shadow">
                    <div className="relative h-56 w-full overflow-hidden">
                      <img src={`${API_BASE_URL}${gallery.after_image || gallery.before_image}`} alt={gallery.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-6">
                        <div className="flex justify-between items-end w-full">
                          <div>
                            <h3 className="text-primary font-display text-xl mb-1">{gallery.title}</h3>
                            <p className="text-accent font-medium text-sm tracking-wider uppercase">{gallery.price || 'Free'}</p>
                          </div>
                          <button 
                            onClick={() => handleDelete(gallery.id)}
                            className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-sm transition-colors border border-red-500/20 hover:border-red-500"
                            title="Delete Project"
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
