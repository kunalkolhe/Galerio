import React, { useState, useRef, useEffect } from 'react';

const BeforeAfterSlider = ({ beforeImage, afterImage, title = '' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState('100%');
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current || !isDragging) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - left, width));
    const percent = Math.max(0, Math.min((x / width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [isDragging]);

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

  return (
    <div className="w-full relative overflow-hidden rounded-xl group cursor-ew-resize select-none" ref={containerRef} onMouseDown={() => setIsDragging(true)} onTouchStart={() => setIsDragging(true)}>
      {/* Before Image (Base) */}
      <img src={beforeImage} alt={`Before ${title}`} className="w-full h-auto object-cover pointer-events-none" />

      {/* After Image (Overlay) */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden pointer-events-none" style={{ width: `${sliderPosition}%` }}>
        <img src={afterImage} alt={`After ${title}`} className="absolute top-0 left-0 max-w-none h-full object-cover" style={{ width: containerWidth }} />
      </div>

      {/* Slider Line & Handle */}
      <div className="absolute top-0 bottom-0 w-1 bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.5)] pointer-events-none transition-opacity" style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-brand-black border-2 border-brand-gold rounded-full flex items-center justify-center shadow-lg">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <svg className="rotate-180 absolute" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ left: '10px' }}>
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </div>
      
      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 rounded text-sm pointer-events-none backdrop-blur-sm border border-white/10">Before</div>
      <div className="absolute top-4 right-4 bg-brand-gold/80 text-black px-3 py-1 rounded text-sm font-medium pointer-events-none backdrop-blur-sm border border-black/10">After</div>
    </div>
  );
};

export default BeforeAfterSlider;
