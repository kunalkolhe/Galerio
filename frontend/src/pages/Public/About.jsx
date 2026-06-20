import React from 'react';
import { Camera, Users, Star, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen bg-base">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-hero font-display text-primary mb-6">
            About Galerio.
          </h1>
          <p className="text-secondary text-lg leading-relaxed">
            We connect creators with elite editors to elevate visual storytelling.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          <div className="bg-surface-1 border border-surface-2 p-8 rounded-sm text-center cinematic-shadow group transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-display mb-3 text-primary">Premium Quality</h3>
            <p className="text-secondary text-sm">We vet our editors to ensure the highest standard of work.</p>
          </div>
          <div className="bg-surface-1 border border-surface-2 p-8 rounded-sm text-center cinematic-shadow group transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-display mb-3 text-primary">Community First</h3>
            <p className="text-secondary text-sm">A platform built by creators, for creators to foster collaboration.</p>
          </div>
          <div className="bg-surface-1 border border-surface-2 p-8 rounded-sm text-center cinematic-shadow group transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-display mb-3 text-primary">Global Reach</h3>
            <p className="text-secondary text-sm">Connect with talent from Tokyo to New York.</p>
          </div>
          <div className="bg-surface-1 border border-surface-2 p-8 rounded-sm text-center cinematic-shadow group transition-all">
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-xl font-display mb-3 text-primary">Creative Freedom</h3>
            <p className="text-secondary text-sm">Collaborate with specialists across every niche.</p>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-surface-1 border border-surface-2 rounded-sm p-12 lg:p-20 relative overflow-hidden cinematic-shadow">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"></div>
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-display mb-6 text-primary">Our Story</h2>
            <div className="space-y-6 text-secondary leading-relaxed">
              <p>
                Galerio was born from a simple problem: finding reliable, high-quality editors was too difficult. We wanted a place where the work spoke for itself—where you could literally see the 'Before and After' of an editor's capability before hiring them.
              </p>
              <p>
                Today, Galerio is a thriving ecosystem. We provide the tools for editors to showcase their portfolios securely, and the transparency clients need to make informed decisions.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
