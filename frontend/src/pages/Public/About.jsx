import React from 'react';
import { Camera, Users, Star, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-6">
            About Galerio
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            We are the world's leading marketplace connecting visionary creators with elite photo and video editors. Our mission is to elevate visual storytelling globally.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="bg-[#080808] border border-brand-gray p-8 rounded-2xl text-center hover:border-brand-gold/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-brand-gold/10 flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-brand-gold" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-white">Premium Quality</h3>
            <p className="text-gray-400 text-sm">We vet our editors to ensure only the highest standard of color grading and retouching.</p>
          </div>
          <div className="bg-[#080808] border border-brand-gray p-8 rounded-2xl text-center hover:border-brand-gold/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-white">Community First</h3>
            <p className="text-gray-400 text-sm">A platform built by creators, for creators. We foster collaboration and growth.</p>
          </div>
          <div className="bg-[#080808] border border-brand-gray p-8 rounded-2xl text-center hover:border-brand-gold/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Globe className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-white">Global Reach</h3>
            <p className="text-gray-400 text-sm">Connect with talent from Tokyo to New York. The world is your editing studio.</p>
          </div>
          <div className="bg-[#080808] border border-brand-gray p-8 rounded-2xl text-center hover:border-brand-gold/50 transition-colors">
            <div className="w-16 h-16 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-brand-white">Creative Freedom</h3>
            <p className="text-gray-400 text-sm">Find your unique style by collaborating with specialists across every niche.</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-[#080808] border border-brand-gray rounded-3xl p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent"></div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                Galerio was born from a simple frustration: finding reliable, high-quality photo and video editors was too difficult. We wanted a place where the work spoke for itself—where you could literally see the 'Before and After' of an editor's capability before hiring them.
              </p>
              <p>
                Today, Galerio is a thriving ecosystem. We provide the tools for editors to showcase their portfolios securely, and the transparency clients need to make informed hiring decisions. 
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
