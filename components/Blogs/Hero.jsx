'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useRef } from 'react';

export default function BlogsHero() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const containerRef = useRef(null);

  // Smooth Scroll Parallax (Low cost)
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);

  // Animation Constants
  const transition = { duration: 1.4, ease: [0.16, 1, 0.3, 1] };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center px-6 overflow-hidden"
    >
      {/* 1. Optimized Background (No Blurs) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px' 
          }}
        />
        {/* Subtle Static Gradients (Cheaper than animated blurs) */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,#00ffff05_0%,transparent_50%)]" />
      </div>

      <div className="w-full max-w-[1400px] mx-auto relative z-10">
        
        {/* Header Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <span className="font-mono text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
            {isArabic ? "موجز البيانات" : "System_Data_Stream"}
          </span>
        </motion.div>

        {/* 2. Masked Creative Typography */}
        <div className="text-center mb-16">
          <div className="overflow-hidden mb-[-1vw]">
            <motion.h1 
              style={{ y: y1 }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={transition}
              className="text-[15vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter"
            >
              {isArabic ? "المدونة" : "THE BLOGS"}
            </motion.h1>
          </div>

          <div className="overflow-hidden">
            <motion.h2 
              style={{ y: y2 }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ ...transition, delay: 0.1 }}
              className="text-[15vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter text-transparent"
            >
              {isArabic ? "التقنية" : "INSIGHTS"}
            </motion.h2>
          </div>
        </div>

        {/* 3. Refined Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="text-zinc-500 font-mono text-xs md:text-sm uppercase tracking-widest leading-relaxed mb-12">
            {isArabic
              ? "توثيق الرحلة البرمجية من خلال تحليل الأنظمة المعقدة."
              : "Documenting the engineering journey through deep system analysis."
            }
          </p>

        </motion.div>
      </div>

      {/* 4. Scroll Indicator HUD */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: 100 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-zinc-700 to-zinc-900"
      />
    </section>
  );
}