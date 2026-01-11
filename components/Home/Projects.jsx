'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ----------------------------------------
   PROJECT CARD
---------------------------------------- */
const ProjectCard = ({ project, index, total, isArabic }) => {
  return (
    <div
      className="project-card sticky top-0 w-full h-screen flex flex-col justify-end overflow-hidden border-t border-white/10 bg-[#050505] will-change-transform"
      style={{ zIndex: index + 1 }}
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {project.image?.asset?.url ? (
          <Image
            src={project.image.asset.url}
            alt={project.title?.[isArabic ? 'ar' : 'en']}
            fill
            className="object-cover opacity-60"
            priority={index === 0}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-neutral-900 to-black" />
        )}

        {/* Soft dark overlay (GPU safe) */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12 pb-12 md:pb-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Index */}
        <div className="md:col-span-1 hidden md:block">
          <span className="font-mono text-xs text-white/50 tracking-widest border border-white/20 rounded-full px-3 py-1">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>

        {/* Title & Description */}
        <div className="md:col-span-7">
          <h3 className="text-3xl md:text-6xl lg:text-7xl font-light leading-[0.9] tracking-tighter mb-6 text-white">
            {project.title?.[isArabic ? 'ar' : 'en']}
          </h3>
          <p className="text-lg md:text-xl text-neutral-300 max-w-xl leading-relaxed font-light line-clamp-3">
            {project.description?.[isArabic ? 'ar' : 'en']}
          </p>
        </div>

        {/* Tech + CTA */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end gap-8">
          <div className="flex flex-wrap gap-2 justify-end">
            {project.stack?.map((tech, i) => (
              <span
                key={i}
                className="text-[10px] font-mono border border-white/20 bg-black/30 px-3 py-1 rounded-full uppercase tracking-wider text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold tracking-wide transition-colors duration-300 hover:bg-neutral-200">
            <span>{isArabic ? 'عرض المشروع' : 'View Case'}</span>
            <ArrowUpRight
              size={20}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ----------------------------------------
   MAIN SECTION
---------------------------------------- */
export default function ProjectsSection() {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const [projects, setProjects] = useState([]);

  /* Fetch projects INSIDE component */
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = res.ok ? await res.json() : [];
        setProjects(data);
      } catch (err) {
        console.error('Failed to fetch projects');
      }
    };
    fetchProjects();
  }, []);

  /* GSAP stacking depth effect */
  useLayoutEffect(() => {
    if (!projects.length) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        const nextCard = cards[i + 1];

        gsap.to(card, {
          scale: 0.92,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: nextCard,
            start: 'top 85%',
            end: 'top 15%',
            scrub: 0.6,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section ref={containerRef} className="bg-black relative">
      {/* Header */}
      <div className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div>
           
            <h2 className="text-[clamp(3rem,6vw,5rem)] font-light text-white leading-[1] tracking-tighter">
              {isArabic ? 'الأرشيف' : 'Featured'} <br />
              <span className="text-neutral-500">
                {isArabic ? 'المشاريع' : 'Projects'}
              </span>
            </h2>
          </div>
          <div className="hidden md:block">
            <div className="w-px h-24 bg-gradient-to-b from-white to-transparent" />
          </div>
        </div>
      </div>

      {/* Stack */}
      <div className="relative w-full">
        {projects.length ? (
          projects.map((project, i) => (
            <ProjectCard
              key={project._id || i}
              project={project}
              index={i}
              total={projects.length}
              isArabic={isArabic}
            />
          ))
        ) : (
          <div className="h-screen flex items-center justify-center text-neutral-500 font-mono text-sm animate-pulse">
            LOADING ARCHIVE...
          </div>
        )}
      </div>
    </section>
  );
}
