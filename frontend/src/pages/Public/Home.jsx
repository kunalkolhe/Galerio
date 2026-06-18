import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Video, Camera, Scissors, MonitorPlay, Users, Zap, CheckCircle2 } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

// A simple 3D Tilt Card component
const TiltCard = ({ children, className }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left - width / 2);
    mouseY.set(clientY - top - height / 2);
  }

  return (
    <motion.div
      className={`relative [perspective:1000px] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{
        rotateX: useMotionTemplate`${mouseY}deg`,
        rotateY: useMotionTemplate`${mouseX}deg`,
        transition: 'transform 0.15s ease-out'
      }}
    >
      <div className="w-full h-full transform-gpu bg-[#080808] border border-brand-gray rounded-2xl shadow-2xl p-8 hover:border-brand-gold/50 transition-colors">
        {children}
      </div>
    </motion.div>
  );
};

const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-brand-black">
      {/* 3D Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 via-brand-black to-brand-black z-10" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-gold/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gray/50 border border-brand-gold/20 backdrop-blur-md"
            >
              <Star className="w-4 h-4 text-brand-gold fill-brand-gold" />
              <span className="text-sm font-medium tracking-wide text-brand-gold">The Global Editor Marketplace</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Connect With The World's <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-200">Best Photo & Video Editors</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-400 leading-relaxed mx-auto max-w-2xl"
            >
              Whether you need cinematic video grading, wedding photo retouching, or commercial edits—our vetted marketplace connects you with elite talent.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <Link to="/gallery" className="px-8 py-4 rounded-full bg-brand-gold text-brand-black font-semibold tracking-wide hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Browse Editor Portfolios
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/register" className="px-8 py-4 rounded-full bg-transparent border border-brand-gold text-brand-gold font-semibold tracking-wide hover:bg-brand-gold/10 transition-all flex items-center justify-center">
                Join as an Editor
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Find Your Perfect Match</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Our marketplace spans every creative discipline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <TiltCard>
              <Camera className="w-10 h-10 text-brand-gold mb-6" />
              <h3 className="text-xl font-bold mb-3">Photo Retouching</h3>
              <p className="text-gray-400 text-sm">Portrait, fashion, and product retouching by industry professionals.</p>
            </TiltCard>
            <TiltCard>
              <Video className="w-10 h-10 text-brand-gold mb-6" />
              <h3 className="text-xl font-bold mb-3">Video Editing</h3>
              <p className="text-gray-400 text-sm">YouTube, commercials, and documentary editing tailored to your style.</p>
            </TiltCard>
            <TiltCard>
              <MonitorPlay className="w-10 h-10 text-brand-gold mb-6" />
              <h3 className="text-xl font-bold mb-3">Color Grading</h3>
              <p className="text-gray-400 text-sm">Cinematic color correction and look development for film and digital.</p>
            </TiltCard>
            <TiltCard>
              <Scissors className="w-10 h-10 text-brand-gold mb-6" />
              <h3 className="text-xl font-bold mb-3">Social Media</h3>
              <p className="text-gray-400 text-sm">Fast-paced, engaging edits optimized for TikTok and Instagram Reels.</p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-[#080808] border-y border-brand-gray/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold leading-tight mb-16">How The Marketplace Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-gold font-bold text-2xl">1</span>
              </div>
              <h4 className="text-xl font-bold">Browse Portfolios</h4>
              <p className="text-gray-400">Explore our massive gallery of transformations to find an editor whose style matches your vision.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-gold font-bold text-2xl">2</span>
              </div>
              <h4 className="text-xl font-bold">View Editor Profiles</h4>
              <p className="text-gray-400">Click on any editor to see their full portfolio, specialized services, rates, and contact information.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-gold font-bold text-2xl">3</span>
              </div>
              <h4 className="text-xl font-bold">Connect & Hire</h4>
              <p className="text-gray-400">Reach out directly to the editor to book your project. Secure, fast, and professional.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold/5"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6">Ready to elevate your content?</h2>
          <p className="text-xl text-gray-400 mb-10">Join thousands of creators who trust our marketplace for their editing needs.</p>
          <Link to="/gallery" className="px-10 py-5 rounded-full bg-brand-gold text-brand-black font-bold tracking-wide hover:bg-yellow-400 transition-all inline-block shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:scale-105">
            Explore The Gallery
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
