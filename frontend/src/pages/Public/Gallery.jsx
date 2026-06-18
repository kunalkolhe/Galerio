import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import { Filter, Search, User, Video, Image as ImageIcon, Layers } from 'lucide-react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-white mb-4">The Gallery</h1>
            <p className="text-gray-400 max-w-xl">Explore our extensive collection of color grading transformations. Slide to compare the before and after results.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-10 pr-4 py-2 bg-brand-gray/50 border border-brand-gray rounded-full text-brand-white focus:outline-none focus:border-brand-gold transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          <Filter className="w-5 h-5 text-brand-gold mr-2 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-gold text-brand-black' 
                  : 'bg-brand-gray border border-brand-gray hover:border-brand-gold text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          {filteredItems.map(item => (
            <div key={item.id} className="mb-6 rounded-xl overflow-hidden bg-[#080808] border border-brand-gray group flex flex-col">
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

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-brand-white flex items-center gap-2">
                    {item.work_type === 'Video' ? <Video className="w-4 h-4 text-brand-gold" /> : 
                     item.work_type === 'LUTs' ? <Layers className="w-4 h-4 text-brand-gold" /> : 
                     <ImageIcon className="w-4 h-4 text-brand-gold" />}
                    {item.title}
                  </h3>
                  <span className="text-xs px-2 py-1 bg-brand-gray text-brand-gold rounded">{item.work_category || 'Uncategorized'}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4 flex-1">{item.description || 'Custom Edit'}</p>
                
                {/* Editor Info & Profile Link */}
                {item.creator && (
                  <div className="pt-4 border-t border-brand-gray/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold">
                        <User className="w-3 h-3 text-brand-gold" />
                      </div>
                      <span className="text-xs text-gray-400">Edited by <span className="text-brand-white font-medium">{item.creator.name}</span></span>
                    </div>
                    <Link 
                      to={`/profile/${item.created_by}`}
                      className="text-xs font-semibold text-brand-gold hover:text-white transition-colors"
                    >
                      View Profile &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Masonry>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">No projects found matching your criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Gallery;
