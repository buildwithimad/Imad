'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Lenis smooth scroll hook
const useLenis = () => {
  useEffect(() => {
    let lenis;
    const initLenis = async () => {
      try {
        const Lenis = (await import('@studio-freight/lenis')).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (e) {
        console.warn("Lenis not loaded", e);
      }
    };
    initLenis();
    return () => lenis?.destroy();
  }, []);
};

export default function ZoomHeroSection() {
  useLenis();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Text Zoom: Scales up smoothly
  const scale = useTransform(scrollYProgress, [0, 1], [1, 8]);

  // Text Opacity: Fades out smoothly with better timing
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.9, 1], [1, 0.8, 0.2, 0]);

  // Background Grid Opacity with smooth transition
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.05, 0.2, 0.4]);

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] min-h-[150vh]">
      
      {/* Continuous Background Grid - Matches About Section */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
            opacity: gridOpacity,
            backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)',
            backgroundSize: '40px 40px'
        }}
        transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* HERO TEXT LAYER */}
        <motion.div
          style={{ scale, opacity }}
          className="relative z-10 flex flex-col items-center justify-center pointer-events-none origin-center"
          transition={{ ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Decorative Top Tag */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-500 tracking-[0.5em]">
                PORTFOLIO_2025
            </div>

            {/* Main Title - Hollow/Stroke style for brutalist feel */}
            <h1 className="text-[25vw] md:text-[30vw] font-black leading-none select-none text-white mix-blend-difference tracking-tighter">
                IMAD
            </h1>

            {/* Decorative Bottom Tag */}
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 font-mono text-xs text-gray-500 tracking-[0.5em]">
                SCROLL_TO_ENTER
            </div>
        </motion.div>

      </div>
    </div>
  );
}