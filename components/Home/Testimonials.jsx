'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { usePathname } from 'next/navigation';

export default function Testimonials() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const quoteRef = useRef(null);

  const [index, setIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);

  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/reviews');
        const data = res.ok ? await res.json() : [];
        setTestimonials(data);
      } catch {
        // Fallback for demo
        setTestimonials([
          {
            client: { en: 'Sarah Chen', ar: 'سارة تشين' },
            role: { en: 'Tech Lead @ Prisma', ar: 'قائدة تقنية' },
            quote: { en: 'Their architectural decisions saved us months of rework.', ar: 'قراراتهم المعمارية وفرت علينا شهورًا من العمل.' },
            image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1000'
          }
        ]);
      }
    };
    fetchTestimonials();
  }, []);

  /* ---------------- SUPER SMOOTH ANIMATION ---------------- */
  useEffect(() => {
    if (!testimonials.length) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      // Reset positions for a fresh start
      gsap.set([quoteRef.current, textRef.current], { yPercent: 100, opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.1, filter: 'grayscale(100%)' });

      tl.to(imageRef.current, {
        scale: 1,
        filter: 'grayscale(0%)',
        duration: 1.5,
      })
      .to(quoteRef.current, {
        yPercent: 0,
        opacity: 1,
      }, "-=1.2")
      .to(textRef.current, {
        yPercent: 0,
        opacity: 1,
        stagger: 0.1
      }, "-=1");

    }, containerRef);

    return () => ctx.revert();
  }, [index, testimonials]);

  if (!testimonials.length) return null;
  const t = testimonials[index];

  return (
    <section
      ref={containerRef}
      className="relative bg-[#050505] text-white py-32 md:py-64 px-6 overflow-hidden"
    >
      {/* Dynamic Background Counter */}
      <div className="absolute top-10 right-10 font-mono text-[15vw] leading-none opacity-[0.02] select-none pointer-events-none">
        0{index + 1}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header - Kinetic Reveal */}
        <div className="mb-24 overflow-hidden">
          <p className="font-mono text-[10px] tracking-[0.5em] text-cyan-500 uppercase mb-4">
            {isArabic ? 'آراء العملاء' : 'Testimonials'}
          </p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] font-light tracking-tighter">
            {isArabic ? 'شركاء النجاح' : 'Success Stories'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

          {/* IMAGE - Fractional Scale Effect */}
          <div className="lg:col-span-5 relative group">
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900 border border-white/5">
              <div ref={imageRef} className="relative h-full w-full will-change-transform">
                <Image
                  src={t.image?.asset?.url || t.image}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-8 h-px bg-white/20" />
              <div className="absolute top-4 left-4 h-8 w-px bg-white/20" />
            </div>
          </div>

          {/* TEXT - Masked Reveal */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden mb-12">
              <blockquote ref={quoteRef} className="text-2xl md:text-5xl font-light leading-[1.2] tracking-tight will-change-transform">
                “{t.quote?.[isArabic ? 'ar' : 'en']}”
              </blockquote>
            </div>

            <div className="flex flex-col gap-8">
              <div className="overflow-hidden">
                <div ref={textRef} className="border-l-2 border-cyan-500 pl-6 py-2">
                  <p className="text-xl font-medium tracking-tight">
                    {t.client?.[isArabic ? 'ar' : 'en']}
                  </p>
                  <p className="text-sm font-mono text-neutral-500 uppercase tracking-widest mt-1">
                    {t.role?.[isArabic ? 'ar' : 'en']}
                  </p>
                </div>
              </div>

              {/* Interaction UI */}
              <div className="flex items-center gap-12 mt-8">
                {/* Navigation */}
                <div className="flex gap-4">
                  <button
                    onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform">←</span>
                  </button>
                  <button
                    onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="hidden md:block flex-1 h-px bg-white/10 relative overflow-hidden">
                  <div 
                    className="absolute left-0 top-0 h-full bg-cyan-500 transition-all duration-1000 ease-expo"
                    style={{ width: `${((index + 1) / testimonials.length) * 100}%` }}
                  />
                </div>

                <div className="font-mono text-xs text-neutral-500 tracking-tighter">
                  {index + 1} / {testimonials.length}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Aesthetic Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}