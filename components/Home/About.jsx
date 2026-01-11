'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import TextSplit from '../Ui/TextSplit';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const ref = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-fade',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  const content = {
    headline: isArabic
      ? 'نصمم ونبني تجارب رقمية عالية الأداء.'
      : 'I design & build high-performance digital experiences.',
    body: isArabic
      ? 'نعمل عند تقاطع التصميم والتقنية، مع تركيز قوي على الأداء، الوضوح، وتجربة المستخدم. نبني منتجات رقمية تدوم.'
      : 'I operate at the intersection of design and technology, with a strong focus on performance, clarity, and user experience. I build digital products meant to last.',
  };

  return (
    <section
      ref={ref}
      className="relative py-40 bg-black text-white"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        
        {/* TEXT */}
        <div className="md:col-span-7">
          <TextSplit
          text='About'
          className="about-fade font-mono text-xs tracking-[0.3em] text-neutral-400 uppercase mb-8">
          </TextSplit>

          <TextSplit className="about-fade text-[clamp(2.8rem,5vw,4.8rem)] font-light leading-[1.05] tracking-tight mb-8"
            text={content.headline}
            >
          </TextSplit>

          <p className="about-fade text-lg text-neutral-400 max-w-xl leading-relaxed">
            {content.body}
          </p>
        </div>

        {/* IMAGE */}
        <div className="md:col-span-5">
          <div className="about-fade aspect-[3/4] w-full overflow-hidden">
            <img
              src="/imad1.jpeg"
              alt="Studio portrait"
              className="w-full h-full object-cover opacity-85"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
