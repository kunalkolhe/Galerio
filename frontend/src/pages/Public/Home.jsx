import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Video, Camera, Scissors, MonitorPlay } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="w-full overflow-hidden bg-base">
      
      {/* 1. Asymmetric Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-base z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-10 pr-0 lg:pr-8 pt-12 lg:pt-0">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-surface-2 bg-surface-1/50 backdrop-blur-md"
              >
                <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                <span className="text-xs font-medium tracking-widest uppercase text-secondary">The Global Editor Marketplace</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-6xl md:text-7xl lg:text-8xl font-display leading-[0.95] tracking-tight text-primary"
              >
                Connect With <br/> The World's <span className="text-accent italic font-medium">Best Editors</span>.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-xl text-secondary leading-relaxed max-w-xl font-medium"
              >
                Our vetted marketplace connects you with elite talent for any creative need.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col sm:flex-row gap-6 pt-4"
              >
                <Link to="/gallery" className="px-8 py-4 bg-surface-2 border border-surface-2 text-primary font-medium tracking-widest uppercase text-xs hover:text-accent hover:border-accent/50 transition-all flex items-center justify-center gap-3 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
                  Browse Portfolios
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/register" className="px-8 py-4 bg-transparent border border-surface-2 text-primary font-medium tracking-widest uppercase text-xs hover:text-accent hover:border-accent/50 hover:bg-surface-2 transition-all flex items-center justify-center">
                  Join as an Editor
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Media Bleed */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:col-span-5 relative h-[400px] lg:h-[700px] w-full lg:w-[150%] rounded-l-sm overflow-hidden cinematic-shadow border-y border-l border-surface-2 mt-12 lg:mt-0"
            >
              <div className="absolute inset-0 bg-surface-2">
                <img src="https://images.unsplash.com/photo-1621609764180-2ca554a9d6f2?auto=format&fit=crop&q=80" alt="Cinematic Edit" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-r from-base via-base/20 to-transparent opacity-80" />
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* 2. Featured Work / Services - Asymmetric Grid */}
      <section className="py-32 relative z-10 border-t border-surface-2 bg-surface-1">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-20 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-display text-primary mb-6">Find Your Perfect Match.</h2>
            <p className="text-xl text-secondary">Our marketplace spans every creative discipline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
            {/* Span 2 cols, tall (Color Grading) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:col-span-2 row-span-2 relative group overflow-hidden rounded-sm cinematic-shadow border border-surface-2"
            >
              <img src="https://images.unsplash.com/photo-1601506521937-0121a7fe2b6c?auto=format&fit=crop&q=80" alt="Color Grading" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-base via-base/40 to-transparent p-10 flex flex-col justify-end transition-opacity duration-500">
                <MonitorPlay className="w-8 h-8 text-accent mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                <h3 className="text-3xl font-display text-primary mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Color Grading</h3>
                <p className="text-secondary font-medium text-lg max-w-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">Cinematic color correction and look development for film and digital.</p>
              </div>
            </motion.div>

            {/* Span 1 col, square (Photo Retouching) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:col-span-1 row-span-1 relative group overflow-hidden rounded-sm cinematic-shadow border border-surface-2 bg-surface-2 hover:border-accent/30 transition-colors"
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <Camera className="w-8 h-8 text-accent transform scale-95 group-hover:scale-100 transition-transform duration-500" />
                <div>
                  <h3 className="text-2xl font-display text-primary mb-2">Photo Retouching</h3>
                  <p className="text-secondary text-sm leading-relaxed">Portrait, fashion, and product retouching by industry professionals.</p>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-1/4 translate-y-1/4">
                <Camera className="w-48 h-48 text-accent" />
              </div>
            </motion.div>

            {/* Span 1 col, square (Social Media) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:col-span-1 row-span-1 relative group overflow-hidden rounded-sm cinematic-shadow border border-surface-2 bg-base hover:border-accent/30 transition-colors"
            >
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                <Scissors className="w-8 h-8 text-accent transform scale-95 group-hover:scale-100 transition-transform duration-500" />
                <div>
                  <h3 className="text-2xl font-display text-primary mb-2">Social Media</h3>
                  <p className="text-secondary text-sm leading-relaxed">Fast-paced, engaging edits optimized for TikTok and Instagram Reels.</p>
                </div>
              </div>
              <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-1/4 translate-y-1/4">
                <Scissors className="w-48 h-48 text-accent" />
              </div>
            </motion.div>

            {/* Bottom Span (Video Editing) */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:col-span-3 row-span-1 relative group overflow-hidden rounded-sm cinematic-shadow border border-surface-2"
            >
              <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80" alt="Video Editing" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-40 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-gradient-to-r from-base via-base/80 to-transparent p-10 flex flex-col justify-center">
                <Video className="w-8 h-8 text-accent mb-4 transform translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-500" />
                <h3 className="text-3xl font-display text-primary mb-3">Video Editing</h3>
                <p className="text-secondary font-medium max-w-md">YouTube, commercials, and documentary editing tailored to your style.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. How it Works Section - Split Content/Visual */}
      <section className="py-32 bg-base border-t border-surface-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            
            {/* Left: Content Stack */}
            <div className="space-y-16">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-display text-primary leading-tight mb-6">How The Marketplace Works.</h2>
                <p className="text-xl text-secondary">A seamless process from discovery to final cut.</p>
              </div>

              <div className="space-y-12">
                {[
                  { num: '1', title: 'Browse Portfolios', desc: 'Explore our gallery to find an editor whose style matches your vision.' },
                  { num: '2', title: 'View Editor Profiles', desc: 'Click on any editor to see their full portfolio, rates, and contact info.' },
                  { num: '3', title: 'Connect & Hire', desc: 'Reach out directly to book your project. Secure, fast, and professional.' }
                ].map((step, idx) => (
                  <motion.div 
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex gap-8 group"
                  >
                    <div className="w-12 h-12 shrink-0 border border-surface-2 flex items-center justify-center text-accent font-display text-xl transition-all duration-500 group-hover:bg-accent group-hover:text-white shadow-[0_0_0_rgba(217,119,6,0)] group-hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]">{step.num}</div>
                    <div>
                      <h4 className="text-2xl font-display text-primary mb-3 group-hover:text-accent transition-colors duration-500">{step.title}</h4>
                      <p className="text-secondary leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Abstract Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1 }}
              className="relative h-[600px] lg:h-[800px] w-full rounded-sm overflow-hidden cinematic-shadow border border-surface-2 hidden md:block"
            >
               <div className="absolute inset-0 bg-surface-1">
                 {/* Abstract UI representation */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-surface-2/50 flex flex-col p-10 opacity-30 shadow-2xl bg-base">
                    <div className="w-1/3 h-2 bg-surface-2 mb-12" />
                    <div className="flex-1 border border-surface-2 mb-12 grid grid-cols-3 gap-6 p-6">
                       <div className="bg-surface-2/50 col-span-2 h-full" />
                       <div className="bg-surface-2/50 col-span-1 h-full" />
                    </div>
                    <div className="flex justify-between items-end">
                       <div className="w-1/4 h-8 bg-surface-2" />
                       <div className="w-1/4 h-12 border border-surface-2 bg-accent/20" />
                    </div>
                 </div>
               </div>
               <div className="absolute inset-0 bg-gradient-to-bl from-accent/5 via-transparent to-transparent mix-blend-overlay" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. CTA Section - Narrow Centered */}
      <section className="py-40 relative bg-surface-1 border-t border-surface-2 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-base/80 z-0" />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Star className="w-8 h-8 text-accent fill-accent mx-auto mb-10 drop-shadow-[0_0_15px_rgba(217,119,6,0.5)]" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-5xl md:text-7xl font-display text-primary mb-8 leading-tight"
          >
            Ready to elevate your content?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-xl text-secondary mb-16 font-medium"
          >
            Join thousands of creators who trust our marketplace for their editing needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link to="/gallery" className="px-10 py-5 bg-surface-2 border border-surface-2 text-primary font-medium tracking-widest uppercase text-xs hover:text-accent hover:border-accent/50 hover:bg-surface-2 transition-all inline-flex items-center gap-3 shadow-xl">
              Explore The Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
    </div>
  );
};

export default Home;
