'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const ROW_1 = ['Next.js', 'React', 'TypeScript', 'Tailwind', 'GSAP', 'React Native', 'Framer'];
const ROW_2 = ['Node.js', 'MongoDB', 'Docker', 'AWS', 'System Architecture', 'Cybersecurity'];

// --- ITEM COMPONENT (Handles Hover Effect) ---
const SkillItem = ({ text }) => {
  return (
    <div className="group relative flex items-center px-8 md:px-12 py-4">
      {/* 1. Outlined Text (Default) */}
      <span className="relative z-10 text-[clamp(4rem,9vw,8rem)] font-black leading-[0.8] tracking-tighter text-transparent transition-colors duration-500 group-hover:text-white"
            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>
        {text}
      </span>
      
      {/* 2. Glow Effect on Hover */}
      <div className="absolute inset-0 bg-cyan-500/0 blur-xl group-hover:bg-cyan-500/20 transition-colors duration-500" />
      
      {/* 3. Separator */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-2xl text-white/20">
        /
      </span>
    </div>
  );
};

// --- MARQUEE ROW COMPONENT ---
function MarqueeRow({ items, direction = 1, speed = 20, tilt = 0 }) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const el = trackRef.current;
      
      // 1. Infinite Scroll Animation
      // We calculate exact width to ensure seamless loop
      const width = el.scrollWidth / 2; // Divided by 2 because list is duplicated
      
      // Set initial position based on direction to prevent jump
      if (direction === 1) {
          gsap.set(el, { x: -width });
      }

      timelineRef.current = gsap.to(el, {
        x: direction === -1 ? -width : 0,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });

      // 2. Velocity Skew Effect (The "Smoothness" magic)
      // Skews the text based on scroll speed
      ScrollTrigger.create({
        trigger: containerRef.current,
        onUpdate: (self) => {
          const skew = self.getVelocity() / -300;
          // Clamp skew to avoid text becoming unreadable
          const clampedSkew = Math.max(-10, Math.min(10, skew));
          
          gsap.to(el, {
            skewX: clampedSkew,
            duration: 0.8,
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [direction, speed]);

  // Pause/Slow on Hover
  const handleEnter = () => gsap.to(timelineRef.current, { timeScale: 0.2, duration: 0.5 });
  const handleLeave = () => gsap.to(timelineRef.current, { timeScale: 1, duration: 0.5 });

  return (
    <div 
      ref={containerRef}
      className="overflow-hidden py-4 w-full"
      style={{ transform: `rotate(${tilt}deg)` }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={trackRef} className="flex w-max will-change-transform cursor-default select-none">
        {/* Triple duplication ensures no gaps on wide screens */}
        {[...items, ...items, ...items].map((item, i) => (
          <SkillItem key={`${item}-${i}`} text={item} />
        ))}
      </div>
    </div>
  );
}

// --- MAIN SECTION ---
export default function SkillsSection() {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      });

      tl.fromTo('.skill-label', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo('.skill-marquee', 
        { y: 100, opacity: 0, rotate: 5 }, 
        { y: 0, opacity: 1, rotate: 0, duration: 1.2, ease: 'power3.out', stagger: 0.2 }, 
        "-=0.8"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 md:py-48 bg-[#050505] text-white overflow-hidden flex flex-col justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />

     

      {/* Marquee Container */}
      <div className="flex flex-col gap-8 md:gap-0 relative z-10">
        
        {/* Row 1: Slight Tilt Up */}
        <div className="skill-marquee opacity-0">
          <MarqueeRow 
            items={ROW_1} 
            direction={-1} 
            speed={50} 
            tilt={-1.5} // Creative Tilt
          />
        </div>

        {/* Row 2: Slight Tilt Down */}
        <div className="skill-marquee opacity-0">
          <MarqueeRow 
            items={ROW_2} 
            direction={1} 
            speed={50} 
            tilt={1.5} // Creative Tilt
          />
        </div>

      </div>

      {/* Vignette Overlay for smooth fade out at edges */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

    </section>
  );
}