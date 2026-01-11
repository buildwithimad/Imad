'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';
import TextSplit from '@/components/Ui/TextSplit';

export default function CreativeHeroVideo() {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for supporting elements (Sub, lines, scroll indicator)
      // Note: Main text handles its own animation via TextSplit
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.5 },
        delay: 0.8, // Wait for the main text to start revealing
      });

      // 1. Subtitle - Fade Up
      tl.fromTo(
        '.hero-sub',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        0
      );

      // 2. Decorator Lines - Expand outwards
      tl.fromTo(
        '.hero-line',
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 0.5, duration: 1.4, ease: 'expo.out' },
        0.2
      );

      // 3. Scroll Indicator - Fade in
      tl.fromTo(
        '.scroll-indicator',
        { opacity: 0, y: -10 },
        { opacity: 0.6, y: 0, duration: 1 },
        1
      );

    }, containerRef);

    return () => ctx.revert();
  }, [isArabic]);

  // --- Content Configuration ---
  const content = {
    title: isArabic 
      ? "مرحباً، أنا أحل المشاكل بإبداع وأعشق بناء الويب." 
      : "Hi, I’m a creative problem-solver who loves building for the web.",
    sub: isArabic 
      ? "أحول الأفكار إلى تجارب يستمتع الناس باستخدامها..." 
      : "I turn ideas into experiences people enjoy using..."
  };

  return (
    <section 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505] text-white"
    >
      {/* --- 1. Background Video (Fixed Parallax) --- */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full grayscale object-cover opacity-60"
          poster="https://images.unsplash.com/photo-1480694313141-fce5e697ee25?q=80&w=2670&auto=format&fit=crop"
        >
          <source src="https://res.cloudinary.com/duapi9qtk/video/upload/v1767270816/14717649_1920_1080_24fps_online-video-cutter.com_1_nxrzye.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/70" />
      </div>

      {/* --- 2. Main Content Layer --- */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-5xl mx-auto">
        
        {/* Main Headline (Statement) */}
        {/* Adjusted font size to accommodate the longer sentence beautifully */}
        <TextSplit 
          as="h1"
          text={content.title}
          stagger={0.04} // Faster stagger for sentences
          className="font-sans font-semibold text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] tracking-tight text-white mix-blend-overlay md:mix-blend-normal max-w-4xl"
        />

        {/* Subtitle / Description */}
        <div className="hero-sub mt-8 md:mt-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <span className="hero-line hidden md:block h-[1px] w-12 bg-white/60 origin-right"></span>
          
          <p className="font-serif italic text-lg md:text-2xl text-neutral-300 font-light tracking-wide max-w-xl">
            {content.sub}
          </p>
          
          <span className="hero-line hidden md:block h-[1px] w-12 bg-white/60 origin-left"></span>
        </div>

      </div>

      {/* --- 3. Bottom Scroll Indicator --- */}
      <div className="scroll-indicator absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-pulse">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M7 13L12 18L17 13" />
            <path d="M7 6L12 11L17 6" />
          </svg>
        </div>
      </div>

    </section>
  );
}