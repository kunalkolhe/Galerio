import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { User, Loader2, Image as ImageIcon, Star, MapPin, Phone, Briefcase, DollarSign, MessageSquare, Video, Layers, Camera, Link as LinkIcon, Play, Heart, X, Mail, Maximize2 } from 'lucide-react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import { motion, AnimatePresence } from 'framer-motion';

const EditorProfile = () => {
  const { id } = useParams();
  const [editor, setEditor] = useState(null);
  const [galleries, setGalleries] = useState([]);
  const [reviewsData, setReviewsData] = useState({ reviews: [], averageRating: 0, totalReviews: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  
  // Review form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  // Hire form state
  const [hireDetails, setHireDetails] = useState({ name: '', email: '', message: '' });
  const [isSubmittingHire, setIsSubmittingHire] = useState(false);
  const [hireStatus, setHireStatus] = useState('');

  const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
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

  const submitHireRequest = async (e) => {
    e.preventDefault();
    setIsSubmittingHire(true);
    setHireStatus('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/notifications/hire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          editor_id: parseInt(id), 
          content: hireDetails.message, 
          from_name: hireDetails.name, 
          from_email: hireDetails.email 
        })
      });

      if (response.ok) {
        setHireStatus('success');
        setHireDetails({ name: '', email: '', message: '' });
        setTimeout(() => {
          setShowHireModal(false);
          setHireStatus('');
        }, 3000);
      } else {
        const errData = await response.json();
        setHireStatus(`error: ${errData.error || 'Failed to send request'}`);
      }
    } catch (err) {
      setHireStatus('error: An error occurred while sending.');
    } finally {
      setIsSubmittingHire(false);
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  if (isLoading) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex justify-center items-center bg-base">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !editor) {
    return (
      <div className="pt-32 pb-16 min-h-screen flex justify-center items-center bg-base">
        <h2 className="text-2xl font-display text-primary">{error || 'Editor not found'}</h2>
      </div>
    );
  }

  return (
    <>
      <div className="pt-32 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Editor Feature Spread Header */}
        <div className="mb-24 relative">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-end mb-16 relative z-10 text-center md:text-left">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface-1 border border-surface-2 overflow-hidden shrink-0 cinematic-shadow flex items-center justify-center p-1 relative group">
               <div className="w-full h-full rounded-full bg-surface-2 flex items-center justify-center relative z-10 overflow-hidden">
                 {editor.profile_image ? (
                   <img src={`${API_BASE_URL}${editor.profile_image}`} alt={editor.name} className="w-full h-full object-cover" />
                 ) : (
                   <User className="w-12 h-12 text-secondary" />
                 )}
               </div>
            </div>
            
            <div className="flex-1 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h1 className="text-hero font-display text-primary leading-none tracking-tight capitalize">{editor.name}</h1>
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${isLiked ? 'bg-surface-2 border-accent/50 text-accent shadow-[0_0_15px_rgba(217,119,6,0.1)] scale-110' : 'bg-surface-1 border-surface-2 text-secondary hover:text-accent hover:border-accent/50'}`}
                  >
                    <Heart className={`w-5 h-5 transition-all duration-300 ${isLiked ? 'fill-accent' : ''}`} />
                  </button>
                  <button 
                    onClick={() => setShowHireModal(true)}
                    className="px-8 py-3.5 bg-accent text-base text-xs uppercase tracking-widest font-medium hover:bg-accent/90 transition-all cinematic-shadow flex items-center gap-2 rounded-sm"
                  >
                    <Briefcase className="w-4 h-4" /> Hire Me
                  </button>
                  <button 
                    onClick={() => setShowContactModal(true)}
                    className="px-6 py-3.5 bg-surface-2 border border-surface-2 text-primary text-xs uppercase tracking-widest font-medium hover:text-accent hover:border-accent/50 transition-all cinematic-shadow rounded-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs uppercase tracking-widest font-medium">
                <div className="flex items-center gap-2 px-4 py-2 rounded-sm bg-surface-1 border border-surface-2">
                  <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                  <span className="text-primary">{reviewsData.averageRating}</span>
                  <span className="text-secondary">({reviewsData.totalReviews} reviews)</span>
                </div>
                {editor.editor_type && (
                  <div className="px-4 py-2 rounded-sm bg-surface-1 border border-surface-2 text-secondary">
                    {editor.editor_type}
                  </div>
                )}
                <div className="px-4 py-2 rounded-sm bg-surface-1 border border-surface-2 text-secondary">
                  {galleries.length} Projects
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-surface-2 pt-16 mt-8 relative z-10">
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium tracking-widest uppercase text-secondary mb-6 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> About the Artist
              </h3>
              <p className="text-xl md:text-2xl text-primary/90 font-display leading-relaxed max-w-3xl">
                {editor.bio || "This artist prefers to let their work speak for itself."}
              </p>
            </div>
            
            <div id="contact-section" className="bg-surface-1 p-8 rounded-sm border border-surface-2">
              <h3 className="text-sm font-medium tracking-widest uppercase text-secondary mb-6">Details & Info</h3>
              <div className="space-y-4 text-sm text-primary font-medium tracking-wide">
                {editor.software_used && <p className="flex items-center gap-4"><Layers className="w-4 h-4 text-secondary" /> {editor.software_used}</p>}
                {editor.years_experience && <p className="flex items-center gap-4"><Briefcase className="w-4 h-4 text-secondary" /> {editor.years_experience} Experience</p>}
                {editor.address && <p className="flex items-center gap-4"><MapPin className="w-4 h-4 text-secondary" /> {editor.address}</p>}
                {editor.charges && <p className="flex items-center gap-4"><DollarSign className="w-4 h-4 text-secondary" /> {editor.charges}</p>}
                {editor.contact_phone && <p className="flex items-center gap-4"><Phone className="w-4 h-4 text-secondary" /> {editor.contact_phone}</p>}
                
                <div className="flex items-center gap-4 pt-6 mt-6 border-t border-surface-2">
                  {editor.instagram && <a href={editor.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center hover:bg-surface-3 hover:text-accent text-secondary transition-colors"><Camera className="w-4 h-4" /></a>}
                  {editor.youtube && <a href={editor.youtube} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center hover:bg-surface-3 hover:text-accent text-secondary transition-colors"><Video className="w-4 h-4" /></a>}
                  {editor.website && <a href={editor.website} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center hover:bg-surface-3 hover:text-accent text-secondary transition-colors"><LinkIcon className="w-4 h-4" /></a>}
                  {editor.other_link && <a href={editor.other_link} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center hover:bg-surface-3 hover:text-accent text-secondary transition-colors"><LinkIcon className="w-4 h-4" /></a>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor's Work Grid */}
        <div className="mb-32">
          <h2 className="text-4xl font-display text-primary mb-12 flex items-center gap-4">
            Selected Work
          </h2>

          {galleries.length === 0 ? (
            <div className="text-center py-20 bg-surface-1 border border-surface-2 rounded-sm cinematic-shadow">
              <p className="text-xl font-display italic text-secondary">Archive currently empty.</p>
            </div>
          ) : (
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="flex -ml-8 w-auto"
              columnClassName="pl-8 bg-clip-padding"
            >
              {galleries.map((item, index) => (
                <motion.div 
                  key={item.id} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: (index % 10) * 0.08, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  whileHover="hover"
                  className="mb-8 relative group cursor-pointer"
                >
                  <motion.div 
                    variants={{ hover: { scale: 1.02, y: -4 } }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="rounded-sm overflow-hidden bg-surface-1 cinematic-shadow border border-surface-2"
                  >
                    {/* Media Container with Inner Zoom */}
                    <div 
                      className="relative w-full overflow-hidden bg-base"
                      onClick={() => {
                        if (item.work_type !== 'LUTs') {
                          setSelectedMedia(item);
                        }
                      }}
                    >
                      <motion.div 
                        variants={{ hover: { scale: 1.05 } }} 
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="w-full h-full"
                      >
                        {item.work_type === 'Video' ? (
                          <div className="relative aspect-[4/5] w-full bg-black">
                            <video 
                              src={`${API_BASE_URL}${item.before_image}`} 
                              muted 
                              loop 
                              playsInline
                              onMouseEnter={(e) => e.target.play()}
                              onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                              className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-300 bg-black/20">
                              <div className="w-16 h-16 rounded-full bg-surface-1/50 backdrop-blur-sm flex items-center justify-center border border-white/10">
                                <Play className="w-6 h-6 text-white ml-1" />
                              </div>
                            </div>
                          </div>
                        ) : item.work_type === 'LUTs' ? (
                          <div className="relative aspect-[4/5] w-full">
                            <BeforeAfterSlider 
                              beforeImage={`${API_BASE_URL}${item.before_image}`} 
                              afterImage={`${API_BASE_URL}${item.after_image}`} 
                              title={item.title} 
                            />
                          </div>
                        ) : (
                          <div className="relative aspect-[4/5] w-full bg-surface-2">
                            <img 
                              src={`${API_BASE_URL}${item.before_image}`} 
                              alt={item.title}
                              className="absolute top-0 left-0 w-full h-full object-cover"
                            />
                          </div>
                        )}
                      </motion.div>

                      {/* Hover Overlay Gradient */}
                      <motion.div 
                        variants={{ hover: { opacity: 1 } }}
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-8 pointer-events-none"
                      >
                        <div className="flex justify-end transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-400 ease-out pointer-events-auto">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedMedia(item); }}
                            className="w-10 h-10 rounded-full bg-surface-1/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-accent hover:border-accent transition-colors shadow-xl"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-400 ease-out pointer-events-auto">
                          <div className="flex items-center gap-3 mb-3">
                            {item.work_type === 'Video' ? <Video className="w-5 h-5 text-primary" /> : 
                             item.work_type === 'LUTs' ? <Layers className="w-5 h-5 text-primary" /> : 
                             <ImageIcon className="w-5 h-5 text-primary" />}
                            <h3 className="text-2xl font-display text-primary leading-tight">
                              {item.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-surface-2 pt-4 mt-2">
                            <span className="text-xs px-3 py-1 bg-surface-2 text-primary uppercase tracking-widest rounded-sm border border-surface-2">
                              {item.work_category || 'Uncategorized'}
                            </span>
                            {item.price && <span className="text-secondary font-medium tracking-wide">{item.price}</span>}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </Masonry>
          )}
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-4xl font-display text-primary mb-16 flex items-center gap-4">
            Critical Reception
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
            
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-16">
              {reviewsData.reviews.length === 0 ? (
                <p className="text-secondary font-display italic text-xl">No published reviews currently.</p>
              ) : (
                reviewsData.reviews.map(review => (
                  <div key={review.id} className="border-l border-surface-2 pl-8 py-2 relative group">
                    <div className="absolute top-0 -left-[1px] w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-500 ease-out" />
                    {review.comment ? (
                      <p className="text-xl font-display text-primary/90 leading-relaxed mb-4">"{review.comment}"</p>
                    ) : (
                      <p className="text-xl font-display text-secondary italic mb-4">No comment provided.</p>
                    )}
                    <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-secondary">
                      <span className="text-primary">{review.client.name}</span>
                      <span>&bull;</span>
                      <span>{new Date(review.created_at).toLocaleDateString()}</span>
                      <span>&bull;</span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} className={`w-3.5 h-3.5 ${star <= review.rating ? 'text-accent fill-accent' : 'text-surface-2'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Leave a Review Form */}
            <div className="lg:col-span-1">
              <div className="bg-surface-1 p-8 rounded-sm border border-surface-2 sticky top-32 cinematic-shadow">
                <h3 className="font-display text-2xl text-primary mb-8">Publish a Review</h3>
                
                <form onSubmit={!isLoggedIn ? (e) => { e.preventDefault(); window.location.href='/login'; } : submitReview} className="space-y-6">
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-secondary block mb-4">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          disabled={isLoggedIn && currentUser.id === parseInt(id)}
                          className="focus:outline-none transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                        >
                          <Star className={`w-6 h-6 ${star <= rating ? 'text-accent fill-accent' : 'text-surface-2'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs uppercase tracking-widest font-medium text-secondary block mb-4">Comment (Optional)</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      disabled={isLoggedIn && currentUser.id === parseInt(id)}
                      rows="4"
                      className="w-full bg-base border border-surface-2 rounded-sm px-4 py-3 text-primary focus:outline-none focus:border-accent/50 transition-all resize-none text-sm leading-relaxed disabled:opacity-50"
                      placeholder="Detail your experience..."
                    ></textarea>
                  </div>

                  {reviewError && <p className="text-red-400 text-sm">{reviewError}</p>}
                  {isLoggedIn && currentUser.id === parseInt(id) && (
                    <p className="text-secondary text-sm italic">You cannot review your own profile.</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmittingReview || (isLoggedIn && currentUser.id === parseInt(id))}
                    className="w-full bg-surface-2 border border-surface-2 text-primary font-medium tracking-widest uppercase text-xs py-4 rounded-sm hover:text-accent hover:border-accent/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isSubmittingReview ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
                    {!isLoggedIn ? 'Login to Publish' : 'Publish Review'}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>

      {/* Contact Details Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-surface-1 border border-surface-2 p-8 md:p-12 rounded-sm cinematic-shadow max-w-2xl w-full z-10"
          >
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-6 right-6 text-secondary hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-display text-primary mb-8 border-b border-surface-2/50 pb-6">Contact <span className="capitalize">{editor.name}</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {editor.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-secondary font-medium mb-1">Email Address</p>
                      <a href={`mailto:${editor.email}`} className="text-base text-primary hover:text-accent transition-colors break-all">{editor.email}</a>
                    </div>
                  </div>
                )}
                
                {editor.contact_phone && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-secondary font-medium mb-1">Phone Number</p>
                      <a href={`tel:${editor.contact_phone}`} className="text-base text-primary hover:text-accent transition-colors">{editor.contact_phone}</a>
                    </div>
                  </div>
                )}
              </div>

              <div>
                {editor.address && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-sm bg-surface-2 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-secondary font-medium mb-1">Location</p>
                      <p className="text-base text-primary leading-relaxed">{editor.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(editor.instagram || editor.youtube || editor.website || editor.other_link) && (
              <div className="mt-8 pt-8 border-t border-surface-2">
                <p className="text-xs uppercase tracking-widest text-secondary font-medium mb-4">Social & Links</p>
                <div className="flex flex-wrap gap-4">
                  {editor.instagram && <a href={editor.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-surface-2 hover:border-accent/50 hover:text-accent text-primary rounded-sm transition-colors"><Camera className="w-4 h-4" /> Instagram</a>}
                  {editor.youtube && <a href={editor.youtube} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-surface-2 hover:border-accent/50 hover:text-accent text-primary rounded-sm transition-colors"><Video className="w-4 h-4" /> YouTube</a>}
                  {editor.website && <a href={editor.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-surface-2 hover:border-accent/50 hover:text-accent text-primary rounded-sm transition-colors"><LinkIcon className="w-4 h-4" /> Website</a>}
                  {editor.other_link && <a href={editor.other_link} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-surface-2 border border-surface-2 hover:border-accent/50 hover:text-accent text-primary rounded-sm transition-colors"><LinkIcon className="w-4 h-4" /> Other</a>}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Hire Me Modal */}
      {showHireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-base/80 backdrop-blur-sm"
            onClick={() => setShowHireModal(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-surface-1 border border-surface-2 p-8 md:p-12 rounded-sm cinematic-shadow max-w-2xl w-full z-10"
          >
            <button 
              onClick={() => setShowHireModal(false)}
              className="absolute top-6 right-6 text-secondary hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-3xl font-display text-primary mb-2">Hire <span className="capitalize">{editor.name}</span></h2>
            <p className="text-secondary mb-8">Send a project request directly to their inbox.</p>
            
            <form onSubmit={submitHireRequest} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-medium text-secondary block mb-3">Your Name</label>
                  <input 
                    type="text" required
                    value={hireDetails.name} onChange={(e) => setHireDetails({...hireDetails, name: e.target.value})}
                    className="w-full bg-base border border-surface-2 rounded-sm px-4 py-3 text-primary focus:outline-none focus:border-accent/50 transition-all text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-medium text-secondary block mb-3">Your Email</label>
                  <input 
                    type="email" required
                    value={hireDetails.email} onChange={(e) => setHireDetails({...hireDetails, email: e.target.value})}
                    className="w-full bg-base border border-surface-2 rounded-sm px-4 py-3 text-primary focus:outline-none focus:border-accent/50 transition-all text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-medium text-secondary block mb-3">Project Details & Budget</label>
                <textarea 
                  required rows="5"
                  value={hireDetails.message} onChange={(e) => setHireDetails({...hireDetails, message: e.target.value})}
                  className="w-full bg-base border border-surface-2 rounded-sm px-4 py-3 text-primary focus:outline-none focus:border-accent/50 transition-all resize-none text-sm"
                  placeholder="Describe your project, timeline, and estimated budget..."
                ></textarea>
              </div>

              {hireStatus && (
                <div className={`p-4 rounded-sm text-sm font-medium ${hireStatus === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {hireStatus === 'success' ? 'Request sent successfully! They will contact you via email.' : hireStatus.replace('error: ', '')}
                </div>
              )}

              <button 
                type="submit" disabled={isSubmittingHire}
                className="w-full bg-accent text-base tracking-widest uppercase text-xs font-medium py-4 rounded-sm hover:bg-accent/90 transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmittingHire ? <Loader2 className="w-4 h-4 animate-spin" /> : <Briefcase className="w-4 h-4" />}
                {isSubmittingHire ? 'Sending Request...' : 'Send Project Request'}
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
            onClick={() => setSelectedMedia(null)}
          >
            <button 
              className="absolute top-6 right-6 p-3 bg-surface-1/50 hover:bg-surface-2 rounded-full text-primary transition-colors backdrop-blur-md border border-white/10"
              onClick={() => setSelectedMedia(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.work_type === 'Video' ? (
                <video 
                  src={`${API_BASE_URL}${selectedMedia.before_image}`} 
                  controls 
                  autoPlay
                  className="max-w-full max-h-[85vh] rounded-sm shadow-2xl"
                />
              ) : selectedMedia.work_type === 'LUTs' ? (
                <div className="max-w-[95vw] rounded-sm shadow-2xl overflow-hidden flex justify-center items-center bg-black">
                  <BeforeAfterSlider 
                    beforeImage={`${API_BASE_URL}${selectedMedia.before_image}`} 
                    afterImage={`${API_BASE_URL}${selectedMedia.after_image}`} 
                    title={selectedMedia.title} 
                    isLightbox={true}
                  />
                </div>
              ) : (
                <img 
                  src={`${API_BASE_URL}${selectedMedia.before_image}`} 
                  alt={selectedMedia.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-sm shadow-2xl"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

export default EditorProfile;
