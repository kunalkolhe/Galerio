import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Filter, Search, User, Video, Image as ImageIcon, Layers, Play, X, Maximize2 } from 'lucide-react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);

  const [items, setItems] = useState([]);
  const API_BASE_URL = `http://${window.location.hostname}:5000`;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/gallery`, { cache: 'no-store' })
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Failed to fetch gallery items', err));
  }, []);

  const categories = ['All', 'Portraits', 'Cityscape', 'Nature', 'Wedding'];

  const filteredItems = items.filter(item => {
    const itemCategory = item.category ? item.category.name : 'Uncategorized';
    const matchesCategory = activeCategory === 'All' || itemCategory === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-hero font-display text-primary mb-6">The Gallery.</h1>
            <p className="text-secondary text-lg leading-relaxed">Explore elite color grading and retouching work.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-accent/5 blur-xl group-focus-within:bg-accent/10 transition-colors rounded-full" />
              <div className="relative flex items-center bg-surface-1/80 backdrop-blur-md border border-surface-2 rounded-full px-4 py-3 shadow-xl">
                <Search className="w-5 h-5 text-secondary mr-3" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 bg-transparent border-none text-primary placeholder-secondary focus:outline-none text-sm font-medium tracking-wide"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories (Floating Glass Panel) */}
        <div className="inline-flex items-center gap-2 mb-16 overflow-x-auto p-2 bg-surface-1/50 backdrop-blur-xl border border-surface-2 rounded-full shadow-2xl scrollbar-hide max-w-full">
          <div className="pl-4 pr-2 py-2 flex items-center border-r border-surface-2/50">
            <Filter className="w-4 h-4 text-secondary shrink-0" />
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full whitespace-nowrap text-xs uppercase tracking-widest font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-accent text-white shadow-[0_0_20px_rgba(217,119,6,0.3)]' 
                  : 'bg-transparent text-secondary hover:text-primary hover:bg-surface-2'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-8 w-auto"
          columnClassName="pl-8 bg-clip-padding"
        >
          {filteredItems.map((item, index) => (
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
                variants={{
                  hover: { scale: 1.02, y: -4 }
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-xl overflow-hidden bg-surface-1 cinematic-shadow"
              >
                {/* Media Container with Inner Zoom */}
                <div 
                  className="relative w-full overflow-hidden bg-base"
                  onClick={() => {
                    // We now let the Maximize button handle the Lightbox for better UX,
                    // but we'll also allow clicking the image if it's not LUTs for convenience.
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
                        {item.work_type === 'Video' ? <Video className="w-5 h-5 text-accent" /> : 
                         item.work_type === 'LUTs' ? <Layers className="w-5 h-5 text-accent" /> : 
                         <ImageIcon className="w-5 h-5 text-accent" />}
                        <h3 className="text-2xl font-display text-primary leading-tight">
                          {item.title}
                        </h3>
                      </div>
                      
                      {item.creator && (
                        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-2 relative z-20">
                          <Link 
                            to={`/profile/${item.created_by}`} 
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-3 group/link hover:opacity-80 transition-opacity"
                          >
                            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center border border-accent/50 group-hover/link:bg-accent group-hover/link:border-accent transition-colors">
                              <User className="w-4 h-4 text-accent group-hover/link:text-white transition-colors" />
                            </div>
                            <span className="text-sm font-medium text-primary">{item.creator.name}</span>
                          </Link>
                          <span className="text-xs px-3 py-1 bg-surface-2/80 backdrop-blur-sm text-primary uppercase tracking-widest rounded-full border border-white/10">
                            {item.work_category || 'Uncategorized'}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </Masonry>
        
        {filteredItems.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <p className="text-xl text-secondary font-display italic">No projects found matching your vision.</p>
          </motion.div>
        )}

      </div>

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
    </div>
  );
};

export default Gallery;
