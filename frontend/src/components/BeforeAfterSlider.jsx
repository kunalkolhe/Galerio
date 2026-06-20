import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MoveHorizontal } from 'lucide-react';

const BeforeAfterSlider = ({ beforeImage, afterImage, title = '', isLightbox = false }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState('100%');
  const containerRef = useRef(null);

  const rawPosition = useMotionValue(50);
  const sliderPosition = useSpring(rawPosition, { stiffness: 400, damping: 30 });

  // Expose the spring value as a string for inline styles
  const handleSliderChange = (e) => {
    const newPercent = parseFloat(e.target.value);
    rawPosition.set(newPercent);
  };

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(`${containerRef.current.offsetWidth}px`);
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setContainerWidth(`${entry.contentRect.width}px`);
        }
      });
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, []);

  // Expose the spring value as a string for inline styles
  const [percent, setPercent] = useState(50);
  
  useEffect(() => {
    return sliderPosition.onChange((v) => setPercent(v));
  }, [sliderPosition]);

  return (
    <div 
      className="w-full relative overflow-hidden group bg-surface-2" 
      ref={containerRef} 
    >
      {/* After Image (Base) */}
      <img src={afterImage} alt={`After ${title}`} className={isLightbox ? "max-h-[85vh] w-auto max-w-full object-contain pointer-events-none mx-auto" : "w-full h-full object-cover pointer-events-none absolute inset-0"} />
      <div className={isLightbox ? "hidden" : "invisible w-full pb-[125%]"} /> {/* Aspect ratio spacer for absolute img */}

      {/* Before Image (Overlay) */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none shadow-[5px_0_15px_rgba(0,0,0,0.5)]" 
        style={{ width: `${percent}%` }}
      >
        <img src={beforeImage} alt={`Before ${title}`} className="absolute top-0 left-0 max-w-none h-full object-cover" style={{ width: containerWidth }} />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-accent shadow-[0_0_15px_rgba(217,119,6,0.6)] pointer-events-none" 
        style={{ left: `${percent}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10">
          <motion.div 
            animate={{ scale: isDragging ? 0.9 : 1 }}
            className="w-full h-full bg-surface-1/90 backdrop-blur-md border border-surface-2 flex items-center justify-center rounded-full cinematic-shadow shadow-[0_0_20px_rgba(217,119,6,0.2)]"
          >
            <MoveHorizontal className="w-4 h-4 text-accent" />
          </motion.div>
        </div>
      </div>

      {/* Invisible Range Input */}
      <input
        type="range"
        min="0"
        max="100"
        step="0.1"
        value={percent}
        onChange={handleSliderChange}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0 z-10"
      />
      
      {/* Labels */}
      <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-primary px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase pointer-events-none border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Before
      </div>
      <div className="absolute top-6 right-6 bg-accent/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-medium tracking-widest uppercase pointer-events-none shadow-[0_0_15px_rgba(217,119,6,0.3)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        After
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
