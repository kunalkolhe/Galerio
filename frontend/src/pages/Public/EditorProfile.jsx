import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { User, Loader2, Image as ImageIcon, Star, MapPin, Phone, Briefcase, DollarSign, MessageSquare, Video, Layers, Camera, Link } from 'lucide-react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

const EditorProfile = () => {
  const { id } = useParams();
  const [editor, setEditor] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [reviewsData, setReviewsData] = useState({ reviews: [], averageRating: 0, totalReviews: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  const API_BASE_URL = `http://${window.location.hostname}:5000`;
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchEditorData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/gallery/user/${id}`);
        if (!response.ok) {
          throw new Error('Editor not found');
        }
        const data = await response.json();
        setEditor(data.user);
        setGalleries(data.galleries);

        // Fetch reviews
        const reviewsResponse = await fetch(`${API_BASE_URL}/api/reviews/${id}`);
        if (reviewsResponse.ok) {
          const rData = await reviewsResponse.json();
          setReviewsData(rData);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEditorData();
  }, [id, API_BASE_URL]);

  const submitReview = async (e) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    setReviewError('');
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ editor_id: parseInt(id), rating, comment })
      });

      if (response.ok) {
        const newReview = await response.json();
        setReviewsData(prev => {
          const newReviewsList = [newReview, ...prev.reviews];
          const newAvg = (newReviewsList.reduce((acc, curr) => acc + curr.rating, 0) / newReviewsList.length).toFixed(1);
          return { reviews: newReviewsList, averageRating: newAvg, totalReviews: newReviewsList.length };
        });
        setComment('');
        setRating(5);
      } else {
        const errData = await response.json();
        setReviewError(errData.error || 'Failed to submit review');
      }
    } catch (err) {
      setReviewError('An error occurred while submitting.');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
      </div>
    );
  }

  if (error || !editor) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex justify-center items-center">
        <h2 className="text-2xl text-red-400">{error || 'Editor not found'}</h2>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editor Header */}
        <div className="bg-[#080808] border border-brand-gray rounded-3xl p-8 lg:p-12 mb-12 flex flex-col md:flex-row items-center md:items-start gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-brand-gold/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-brand-black flex items-center justify-center border-4 border-brand-gold shrink-0 relative z-10">
            <User className="w-16 h-16 lg:w-20 lg:h-20 text-brand-gold" />
          </div>
          
          <div className="text-center md:text-left flex-1 relative z-10 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-4">
              <div>
                <h1 className="text-4xl lg:text-5xl font-bold text-brand-white mb-2">{editor.name}</h1>
                <div className="flex items-center gap-2 justify-center md:justify-start text-brand-gold mb-4">
                  <Star className="w-5 h-5 fill-brand-gold" />
                  <span className="font-bold">{reviewsData.averageRating} / 5</span>
                  <span className="text-gray-500 text-sm">({reviewsData.totalReviews} reviews)</span>
                </div>
              </div>
              <div className="inline-block px-4 py-2 bg-brand-gold/10 text-brand-gold border border-brand-gold/30 rounded-full text-sm font-semibold tracking-wider">
                {editor.editor_type || 'Editor'}
              </div>
            </div>

            {editor.bio && (
              <p className="text-gray-300 max-w-3xl leading-relaxed mb-6">
                {editor.bio}
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mt-6 border-t border-brand-gray/50 pt-6">
              {editor.address && (
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                  <span>{editor.address}</span>
                </div>
              )}
              {editor.charges && (
                <div className="flex items-center gap-3 text-gray-400">
                  <DollarSign className="w-5 h-5 text-green-400 shrink-0" />
                  <span>{editor.charges}</span>
                </div>
              )}
              {editor.contact_phone && (
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0" />
                  <span>{editor.contact_phone}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-gray-400">
                <Briefcase className="w-5 h-5 text-purple-400 shrink-0" />
                <span>{galleries.length} Portfolio Projects</span>
              </div>
              
              {editor.instagram && (
                <a href={editor.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-pink-500 transition-colors">
                  <Camera className="w-5 h-5 shrink-0" />
                  <span>Instagram</span>
                </a>
              )}
              {editor.youtube && (
                <a href={editor.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors">
                  <Video className="w-5 h-5 shrink-0" />
                  <span>YouTube</span>
                </a>
              )}
              {editor.website && (
                <a href={editor.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-brand-gold transition-colors">
                  <Link className="w-5 h-5 shrink-0" />
                  <span>Portfolio Website</span>
                </a>
              )}
              {editor.other_link && (
                <a href={editor.other_link} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-400 hover:text-brand-gold transition-colors">
                  <Link className="w-5 h-5 shrink-0" />
                  <span>Other Link</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Editor's Work Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-brand-white mb-8 border-b border-brand-gray pb-4 flex items-center gap-3">
            <ImageIcon className="w-6 h-6 text-brand-gold" /> Portfolio
          </h2>

          {galleries.length === 0 ? (
            <div className="text-center py-20 bg-[#080808] rounded-xl border border-brand-gray">
              <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400">This editor hasn't uploaded any work yet.</p>
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-6 w-auto"
              columnClassName="pl-6 bg-clip-padding"
            >
              {galleries.map(item => (
                <div key={item.id} className="mb-6 rounded-xl overflow-hidden bg-[#080808] border border-brand-gray group hover:border-brand-gold/30 transition-colors">
                  
                  {item.work_type === 'Video' ? (
                    <div className="relative pt-[56.25%] w-full bg-black overflow-hidden group-hover:opacity-90 transition-opacity">
                      <video 
                        src={`${API_BASE_URL}${item.before_image}`} 
                        controls 
                        className="absolute top-0 left-0 w-full h-full object-contain"
                      />
                    </div>
                  ) : item.work_type === 'LUTs' ? (
                    <BeforeAfterSlider 
                      beforeImage={`${API_BASE_URL}${item.before_image}`} 
                      afterImage={`${API_BASE_URL}${item.after_image}`} 
                      title={item.title} 
                    />
                  ) : (
                    <div className="relative pt-[66%] w-full bg-black overflow-hidden">
                      <img 
                        src={`${API_BASE_URL}${item.before_image}`} 
                        alt={item.title}
                        className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-brand-white flex items-center gap-2">
                        {item.work_type === 'Video' ? <Video className="w-4 h-4 text-brand-gold" /> : 
                         item.work_type === 'LUTs' ? <Layers className="w-4 h-4 text-brand-gold" /> : 
                         <ImageIcon className="w-4 h-4 text-brand-gold" />}
                        {item.title}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-brand-gray text-brand-gold rounded">{item.work_category || 'Uncategorized'}</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{item.description || 'Custom Edit'}</p>
                    {item.price && <p className="text-brand-gold font-medium">{item.price}</p>}
                  </div>
                </div>
              ))}
            </Masonry>
          )}
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-2xl font-bold text-brand-white mb-8 border-b border-brand-gray pb-4 flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-brand-gold" /> Client Reviews
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-4">
              {reviewsData.reviews.length === 0 ? (
                <div className="p-8 bg-[#080808] border border-brand-gray rounded-2xl text-center">
                  <p className="text-gray-400">No reviews yet. Be the first to rate {editor.name}!</p>
                </div>
              ) : (
                reviewsData.reviews.map(review => (
                  <div key={review.id} className="p-6 bg-[#080808] border border-brand-gray rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-gray flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-brand-white">{review.client.name}</p>
                          <p className="text-xs text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-600'}`} />
                        ))}
                      </div>
                    </div>
                    {review.comment && <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>}
                  </div>
                ))
              )}
            </div>

            {/* Leave a Review Form */}
            <div className="lg:col-span-1">
              <div className="p-6 bg-[#080808] border border-brand-gray rounded-2xl sticky top-24">
                <h3 className="text-xl font-bold text-brand-white mb-6">Leave a Review</h3>
                
                {!isLoggedIn ? (
                  <p className="text-gray-400 text-sm text-center py-4">Please log in to leave a review.</p>
                ) : currentUser.id === parseInt(id) ? (
                  <p className="text-gray-400 text-sm text-center py-4">You cannot review your own profile.</p>
                ) : (
                  <form onSubmit={submitReview} className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star className={`w-8 h-8 ${star <= rating ? 'text-brand-gold fill-brand-gold' : 'text-gray-600'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400 block mb-2">Comment (Optional)</label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        className="w-full bg-brand-black border border-brand-gray rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-brand-gold resize-none"
                        placeholder="Describe your experience working with this editor..."
                      ></textarea>
                    </div>

                    {reviewError && <p className="text-red-400 text-sm">{reviewError}</p>}

                    <button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="w-full bg-brand-gold text-brand-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingReview ? <Loader2 className="w-5 h-5 animate-spin" /> : <Star className="w-5 h-5" />}
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorProfile;
