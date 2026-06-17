import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import BeforeAfterSlider from '../../components/BeforeAfterSlider';

const Home = () => {
  // Placeholder images for the hero slider demo
  const heroBefore = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop"; // somewhat flat
  const heroAfter = "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop&sat=150&con=150"; // vivid

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent z-10" />
          <img src={heroAfter} alt="Hero Background" className="w-full h-full object-cover opacity-20" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gray/50 border border-brand-gold/20 backdrop-blur-md">
              <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
              <span className="text-sm font-medium tracking-wide text-brand-gold">Premium LUTs & Presets</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Transform <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Ordinary Photos</span><br/>
              Into Masterpieces.
            </h1>
            
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
              Elevate your photography with cinematic color grading. Browse our gallery of stunning before & after transformations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/gallery" className="px-8 py-4 rounded-full bg-brand-gold text-brand-black font-semibold tracking-wide hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group">
                Explore Gallery
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="px-8 py-4 rounded-full bg-transparent border border-brand-gold text-brand-gold font-semibold tracking-wide hover:bg-brand-gold/10 transition-all flex items-center justify-center">
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-tr from-brand-gold to-transparent rounded-2xl blur-xl opacity-30"></div>
            <div className="relative rounded-2xl overflow-hidden border border-brand-gray bg-brand-black shadow-2xl">
              <BeforeAfterSlider beforeImage={heroBefore} afterImage={heroAfter} title="Hero Transformation" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-brand-black border-t border-brand-gray/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Latest Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16">
            A curated selection of our most recent color grading projects across different styles.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder items for now until Gallery fetches from DB */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="group rounded-2xl overflow-hidden border border-brand-gray bg-[#080808] hover:border-brand-gold/30 transition-all duration-500">
                 <div className="aspect-[4/5] relative overflow-hidden">
                    <img src={`https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop&sat=${100 + i*20}`} alt={`Featured ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
                    <div className="absolute bottom-6 left-6 text-left">
                      <span className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-2 block">Cinematic Look</span>
                      <h3 className="text-xl font-semibold">Project {i}</h3>
                    </div>
                 </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16">
             <Link to="/gallery" className="inline-flex items-center gap-2 text-brand-gold hover:text-yellow-400 font-medium tracking-wide">
               View Full Gallery <ArrowRight className="w-5 h-5" />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
