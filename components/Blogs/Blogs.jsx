'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, ArrowUpRight, Terminal, Mail, Cpu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// --- BLOG CARD COMPONENT ---
function BlogCard({ blog, index, isArabic }) {
  const cardRef = useRef(null);
  const assetId = `LOG_${(index + 1).toString().padStart(3, '0')}`;

  return (
    <div
      ref={cardRef}
      className="group relative bg-[#050505] overflow-hidden flex flex-col h-full will-change-transform transition-colors duration-500 hover:bg-[#0a0a0a]"
    >
      {/* 1. Kinetic Image Container */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20 group-hover:opacity-0 transition-opacity duration-700" />
        
        {blog.images?.[0]?.asset?.url && (
          <Image
            src={blog.images[0].asset.url}
            alt=""
            fill
            className="object-cover grayscale contrast-125 transition-all duration-1000 ease-expo group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-1"
          />
        )}
        
        <div className="absolute bottom-0 left-0 p-4 z-20">
          <span className="bg-cyan-500 text-black font-mono text-[9px] font-bold px-2 py-0.5 tracking-tighter">
            {blog.categories?.[0]?.[isArabic ? 'ar' : 'en'] || 'CORE_SYSTEM'}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-[10px] text-zinc-600 tracking-widest">{assetId}</span>
          <div className="h-px flex-grow mx-4 bg-zinc-900 group-hover:bg-cyan-900 transition-colors" />
          <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-500/50">
            <Clock size={10} />
            <span>{blog.readTime || "5"}M</span>
          </div>
        </div>

        <Link href={`${isArabic ? '/ar' : '/en'}/blogs/${blog.slug.current}`} className="block">
          <h3 className="text-2xl font-black tracking-tighter leading-tight text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
            {blog.title?.[isArabic ? 'ar' : 'en']}
          </h3>
        </Link>

        <p className="text-zinc-500 font-mono text-xs leading-relaxed mb-8 line-clamp-2">
          {blog.description?.[isArabic ? 'ar' : 'en']}
        </p>

        {/* 3. Action Footer */}
        <div className="mt-auto flex items-center justify-between group/action">
          <div className="flex flex-col">
            <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-tighter">Published_In</span>
            <span className="text-[10px] font-mono text-zinc-400">
               {new Date(blog.publishedAt).getFullYear()}.{new Date(blog.publishedAt).getMonth() + 1}
            </span>
          </div>

          <Link href={`${isArabic ? '/ar' : '/en'}/blogs/${blog.slug.current}`}>
            <div className="w-10 h-10 flex items-center justify-center group-hover:text-black transition-all duration-500 rotate-45 group-hover:rotate-0">
               <ArrowUpRight size={18} className="-rotate-45 group-hover:rotate-0 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* Subtle Scanner Line */}
      <div className="absolute left-0 top-0 w-[2px] h-0 bg-cyan-500 group-hover:h-full transition-all duration-700 ease-expo" />
    </div>
  );
}

// --- MAIN SECTION ---
export default function CreativeBlogs({ blogs = [] }) {
  const containerRef = useRef(null);
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the title letters with a kinetic pop
      gsap.from(".main-title span", {
        yPercent: 100,
        rotateX: -90,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: {
            trigger: ".main-title",
            start: "top 90%"
        }
      });

      // Liquid Border Reveal
      gsap.from(".blog-grid", {
        borderColor: "transparent",
        duration: 2,
        scrollTrigger: {
            trigger: ".blog-grid",
            start: "top 80%"
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-black text-white py-32 md:py-56 overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="max-w-[1500px] mx-auto px-6">
        
        {/* Header Section */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="main-title">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[1px] bg-cyan-500" />
              <span className="font-mono text-xs tracking-[0.4em] text-cyan-500 uppercase">System_Index</span>
            </div>
            <h2 className="text-[clamp(3rem,8vw,8rem)] font-black leading-[0.85] tracking-tighter">
              <span className="inline-block">{isArabic ? "سجلات" : "KNOWLEDGE"}</span><br/>
              <span className="inline-block text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                {isArabic ? "البيانات" : "TRANSFER"}
              </span>
            </h2>
          </div>

          <div className="max-w-xs font-mono text-[11px] text-zinc-500 leading-relaxed uppercase tracking-widest pl-6">
            {isArabic 
              ? "مزامنة المعرفة التقنية عبر الألياف البصرية. تحديثات دورية من قلب النظام."
              : "Synchronizing technical knowledge through fiber optics. Periodic updates from the system core."}
          </div>
        </header>

        {/* The Grid - Super Smooth CSS Grid */}
        <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2  gap-px">
          {blogs.map((blog, idx) => (
            <BlogCard key={blog._id || idx} blog={blog} index={idx} isArabic={isArabic} />
          ))}
        </div>

       

      </div>
    </section>
  );
}