import React from 'react';
import { Camera, Image as ImageIcon, Sparkles } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-white mb-6">About The Vision</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We are dedicated to elevating visual storytelling through professional color grading and high-end LUTs.
          </p>
        </div>

        <div className="bg-[#080808] border border-brand-gray rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-brand-gold">Our Philosophy</h2>
              <p className="text-gray-300 leading-relaxed">
                Color grading isn't just about making an image look pretty; it's about evoking emotion, establishing atmosphere, and telling a compelling story without words. 
              </p>
              <p className="text-gray-300 leading-relaxed">
                Every LUT in our gallery is meticulously crafted to ensure the highest quality results across a variety of lighting conditions and camera sensors. We believe in providing tools that empower creators to realize their true vision.
              </p>
            </div>
            <div className="bg-brand-black/50 rounded-2xl p-6 border border-brand-gray/50 flex items-center justify-center aspect-square">
               <Sparkles className="w-32 h-32 text-brand-gold/20" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#080808] border border-brand-gray rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Camera className="w-8 h-8 text-brand-gold" />
            </div>
            <h3 className="text-xl font-semibold text-brand-white mb-3">Professional Quality</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Designed for working professionals, our tools maintain image integrity while delivering stunning cinematic looks.
            </p>
          </div>
          
          <div className="bg-[#080808] border border-brand-gray rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-8 h-8 text-brand-gold" />
            </div>
            <h3 className="text-xl font-semibold text-brand-white mb-3">Versatile Application</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Whether you're shooting portraits, landscapes, or cinematic sequences, there's a look tailored for your scene.
            </p>
          </div>

          <div className="bg-[#080808] border border-brand-gray rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-brand-gold" />
            </div>
            <h3 className="text-xl font-semibold text-brand-white mb-3">Continuous Updates</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We frequently update our gallery with new, cutting-edge styles to keep your visuals ahead of the curve.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
