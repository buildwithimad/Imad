'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCE = [
  {
    role: { en: 'Full Stack Developer', ar: 'مطور ويب متكامل' },
    company: { en: 'Creativemark — Riyadh', ar: 'كرييتف مارك — الرياض' },
    period: { en: '2025 — Present', ar: '2025 — الحاضر' },
    summary: {
      en: 'Building scalable web platforms with a focus on performance and long-term maintainability.',
      ar: 'بناء منصات ويب قابلة للتوسع مع تركيز على الأداء والاستدامة.',
    },
  },
  {
    role: { en: 'Software Engineer', ar: 'مهندس برمجيات' },
    company: { en: 'Eccentric Technologies', ar: 'إكسنتريك تكنولوجيز' },
    period: { en: '2022 — 2024', ar: '2022 — 2024' },
    summary: {
      en: 'Delivered production-grade applications improving performance and developer velocity.',
      ar: 'تطوير تطبيقات بمستوى إنتاجي وتحسين سرعة التطوير.',
    },
  },
  {
    role: { en: 'Backend Developer', ar: 'مطور واجهات خلفية' },
    company: { en: 'Mazhar Enterprises', ar: 'مشاريع مظهر' },
    period: { en: '2020 — 2022', ar: '2020 — 2022' },
    summary: {
      en: 'Built secure APIs and modern interfaces for small-to-mid scale products.',
      ar: 'بناء واجهات حديثة وواجهات برمجة تطبيقات آمنة.',
    },
  },
];

export default function ExperienceSection() {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Line Drawing - Super slow and elegant
      gsap.utils.toArray('.draw-line').forEach((line) => {
        gsap.fromTo(line, 
          { scaleX: 0, transformOrigin: isArabic ? "right" : "left" },
          { 
            scaleX: 1, 
            duration: 2, 
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 95%",
            }
          }
        );
      });

      // 2. Kinetic Reveal - The "Rising" effect
      gsap.utils.toArray('.exp-row').forEach((row) => {
        const texts = row.querySelectorAll('.kinetic-text');
        gsap.fromTo(texts, 
          { y: "110%", rotate: 2 },
          { 
            y: "0%", 
            rotate: 0,
            duration: 1.5, 
            ease: "power4.out", 
            stagger: 0.05,
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isArabic]);

  return (
    <section ref={containerRef} className="bg-black text-white py-40 md:py-64 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        
        {/* Header - Minimalist Editorial Style */}
        <div className="mb-32 overflow-hidden">
          <p className="font-mono text-[10px] tracking-[0.6em] text-neutral-600 uppercase mb-4 group">
            <span className="kinetic-text inline-block">
              {isArabic ? 'الخبرة المهنية' : 'Work History'}
            </span>
          </p>
          <h2 className="text-[clamp(3rem,10vw,8rem)] font-light tracking-tighter leading-none italic">
            <span className="kinetic-text inline-block text-white">
              {isArabic ? 'التجارب' : 'Experience'}
            </span>
          </h2>
        </div>

        {/* List Section */}
        <div className="flex flex-col relative">
          {EXPERIENCE.map((item, i) => (
            <div key={i} className="exp-row group relative py-16 md:py-24">
              
              {/* Divider Line */}
              <div className="draw-line absolute top-0 left-0 right-0 h-[1px] bg-neutral-800 group-hover:bg-neutral-500 transition-colors duration-700" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                
                {/* 01. Column: Date */}
                <div className="md:col-span-2 overflow-hidden">
                  <span className="kinetic-text block font-mono text-[11px] text-neutral-500 pt-2 tracking-widest">
                    {item.period[isArabic ? 'ar' : 'en']}
                  </span>
                </div>

                {/* 02. Column: Title & Role */}
                <div className="md:col-span-6">
                  <div className="overflow-hidden mb-2">
                    <h3 className="kinetic-text text-3xl md:text-6xl font-medium tracking-tighter group-hover:italic transition-all duration-500">
                      {item.role[isArabic ? 'ar' : 'en']}
                    </h3>
                  </div>
                  <div className="overflow-hidden">
                    <p className="kinetic-text text-neutral-500 text-lg md:text-xl">
                      {item.company[isArabic ? 'ar' : 'en']}
                    </p>
                  </div>
                </div>

                {/* 03. Column: Summary */}
                <div className="md:col-span-4 overflow-hidden pt-2">
                  <p className="kinetic-text text-neutral-400 text-sm md:text-base leading-relaxed max-w-sm">
                    {item.summary[isArabic ? 'ar' : 'en']}
                  </p>
                </div>

              </div>

              {/* Hover Glow Layer - Subtle & No Shadows */}
              <div className="absolute inset-x-[-2rem] inset-y-0 bg-white/[0.02] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out pointer-events-none" />
            </div>
          ))}
          
          <div className="draw-line h-[1px] bg-neutral-800 w-full" />
        </div>

      </div>
    </section>
  );
}