'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import {
  Layers,
  Zap,
  Database,
  ArrowUpRight,
  Code2,
  Terminal,
  Cpu
} from 'lucide-react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  const services = [
    {
      title: isArabic ? 'تطوير الوجهات الأمامية' : 'Frontend Engineering',
      description: isArabic
        ? 'بناء واجهات غامرة باستخدام Next.js و GSAP مع تركيز على الأداء.'
        : 'High-performance, cinematic interfaces built with Next.js, Framer Motion, and GSAP.',
      icon: Code2,
      images: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200',
      ],
      speed: 8, // Slower for a more premium feel
    },
    {
      title: isArabic ? 'هندسة النظم الخلفية' : 'Backend & Architecture',
      description: isArabic
        ? 'تصميم قواعد بيانات وأنظمة سحابية قابلة للتوسع.'
        : 'Scalable server-side logic, PostgreSQL architecture, and secure API orchestration.',
      icon: Terminal,
      images: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?q=80&w=1200',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200',
      ],
      speed: 10,
    },
    {
      title: isArabic ? 'منتجات SaaS متكاملة' : 'Full-Stack SaaS',
      description: isArabic
        ? 'تحويل الأفكار إلى منتجات رقمية متكاملة وجاهزة للسوق.'
        : 'End-to-end product development from conceptual MVP to enterprise-grade deployment.',
      icon: Cpu,
      images: [
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
      ],
      speed: 12,
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ENTRY REVEAL */
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'expo.out', // Smoother easing
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      /* SEAMLESS IMAGE LOOPS */
      gsap.utils.toArray('.image-track').forEach((track, i) => {
        gsap.fromTo(
          track,
          { yPercent: 0 },
          {
            yPercent: -50,
            duration: services[i].speed,
            ease: 'none',
            repeat: -1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isArabic]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-40 overflow-hidden"
    >
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <p className="font-mono text-[10px] tracking-[0.5em] text-neutral-500 uppercase mb-6">
          {isArabic ? 'الخدمات' : 'Expertise'}
        </p>

        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.1] tracking-tight">
          {isArabic ? 'حلول تقنية متطورة' : 'Building digital\ninfrastructure.'}
        </h2>
      </div>

      {/* GRID */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, i) => {
          const Icon = service.icon;

          return (
            <div
              key={i}
              className="group service-card relative bg-[#080808] aspect-[3/4.2] overflow-hidden p-10 flex flex-col justify-between"
            >
              {/* IMAGE LOOP */}
              <div className="absolute inset-0 overflow-hidden opacity-60 group-hover:opacity-60 transition-opacity duration-700">
                <div className="image-track absolute inset-0 flex flex-col">
                  {[...service.images, ...service.images].map((src, idx) => (
                    <div key={idx} className="relative h-full w-full">
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  ))}
                </div>

                {/* VIGNETTE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* CONTENT */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex justify-between items-start">
                 
                  <span className="font-mono text-[10px] text-white/30 tracking-widest">
                    0{i + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-light tracking-tight mb-4">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed max-w-[24ch]">
                    {service.description}
                  </p>
                </div>

            
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}