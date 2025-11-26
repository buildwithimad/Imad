'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight, ArrowUpRight, Cpu, Mail, Terminal, FileText } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// --- Utility: Reveal Animation ---
function AnimatedSection({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- The Blog Card (System Asset) ---
function BlogCard({ blog, index }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  const assetId = `LOG_${(index + 1).toString().padStart(3, '0')}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-[#0a0a0a] border border-zinc-800 hover:border-cyan-500 transition-colors duration-300 flex flex-col h-full"
    >
        {/* Hover Overlay Effect */}
        <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Image Section */}
        <div className="relative h-56 w-full overflow-hidden border-b border-zinc-800">
          {blog.images?.[0]?.asset?.url ? (
            <Image
              src={blog.images[0].asset.url}
              alt={blog.title?.[isArabic ? 'ar' : 'en'] || 'Cover'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                <FileText className="text-zinc-700" size={40} />
            </div>
          )}
          
          {/* Tag Overlay */}
          <div className="absolute top-0 left-0 bg-black/80 backdrop-blur-sm px-3 py-1 border-r border-b border-zinc-800">
             <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-wider">
                {blog.categories?.[0]?.[isArabic ? 'ar' : 'en'] || 'SYS_NOTE'}
             </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
            
            {/* Metadata Header */}
            <div className="flex justify-between items-start mb-4 font-mono text-xs text-zinc-500">
                <span>{assetId}</span>
                <div className="flex items-center gap-2">
                    <Clock size={12} />
                    <span>{blog.readTime || "5"} MIN_READ</span>
                </div>
            </div>

            {/* Title */}
            <Link href={`${isArabic ? '/ar' : '/en'}/blogs/${blog.slug.current}`} className="block group/title">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight group-hover/title:text-cyan-400 transition-colors">
                    {blog.title?.[isArabic ? 'ar' : 'en'] || 'Untitled Log Entry'}
                </h3>
            </Link>

            {/* Excerpt */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow font-mono">
                {blog.description?.[isArabic ? 'ar' : 'en'] || 'No description data available for this asset.'}
            </p>

            {/* Footer Action */}
            <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-600 uppercase">
                    {blog.publishedAt ? formatDate(blog.publishedAt) : 'DATE_UNKNOWN'}
                </span>
                
                <Link href={`${isArabic ? '/ar' : '/en'}/blogs/${blog.slug.current}`}>
                    <div className="flex items-center gap-2 text-white group-hover:text-cyan-400 transition-colors text-xs font-bold uppercase tracking-widest cursor-pointer">
                        {isArabic ? "اقرأ الملف" : "ACCESS_FILE"}
                        <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </div>
                </Link>
            </div>
        </div>
    </motion.article>
  );
}

// --- Main Layout ---
export default function Blogs({ blogs = [] }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  return (
    <section className="min-h-screen w-full bg-[#050505] text-white py-24 relative overflow-hidden border-b border-zinc-800">

      {/* 1. Background Grid (Standardized) */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">

        {/* 2. Section Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-zinc-800 pb-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
                    <span className="font-mono text-cyan-500 text-xs tracking-widest uppercase">
                        // {isArabic ? "السجلات" : "SYSTEM_LOGS_DB"}
                    </span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
                    {isArabic ? "المعرفة" : "KNOWLEDGE"}<br/>
                    <span className="text-zinc-600 stroke-text-cyan">{isArabic ? "التقنية" : "BASE"}</span>
                </h2>
            </div>
            
            <p className="max-w-md text-zinc-400 font-mono text-sm leading-relaxed text-right md:text-left">
                {isArabic
                  ? "سجلات التطوير التقني، تحليلات النظام، والأفكار البرمجية. موثقة للرجوع إليها."
                  : "Technical development logs, system analysis, and programming insights. Documented for future reference."}
            </p>
        </AnimatedSection>

        {/* 3. The Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
            {blogs.map((blog, index) => (
              <BlogCard key={blog._id || index} blog={blog} index={index} />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="py-32 border border-zinc-800 bg-[#0a0a0a] flex flex-col items-center justify-center text-center">
            <Cpu size={48} className="text-zinc-700 mb-6" strokeWidth={1} />
            <h3 className="text-2xl font-black uppercase text-zinc-500 tracking-tight">
                {isArabic ? "جاري تجميع البيانات" : "DATA_COMPILATION_IN_PROGRESS"}
            </h3>
            <p className="text-zinc-600 font-mono text-sm mt-2">
                {isArabic ? "لا توجد سجلات حالياً." : "NO_ASSETS_FOUND_IN_QUERY"}
            </p>
          </div>
        )}

        {/* 4. Newsletter / Subscribe Terminal */}
        <AnimatedSection delay={0.2} className="mt-32">
          <div className="border border-zinc-800 bg-[#0a0a0a] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            <div className="flex-1 text-center lg:text-left lg:text-start">
                <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 flex items-center lg:justify-start justify-center gap-3">
                    <Terminal size={32} className="text-cyan-500" />
                    {isArabic ? "النشرة البريدية" : "JOIN_NETWORK"}
                </h3>
                <p className="text-zinc-400 font-mono text-sm max-w-lg">
                    {isArabic 
                        ? "احصل على أحدث السجلات التقنية مباشرة في صندوق الوارد الخاص بك." 
                        : "Receive high-priority transmission logs directly to your inbox."}
                </p>
            </div>

            <div className="w-full lg:w-auto flex-1 max-w-xl">
                <form className="flex flex-col sm:flex-row border border-zinc-700 p-1">
                    <div className="flex-1 relative bg-[#050505]">
                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                         <input 
                            type="email" 
                            placeholder={isArabic ? "عنوان البريد الإلكتروني..." : "ENTER_EMAIL_COORDINATES..."}
                            className="w-full h-full py-4 pl-12 pr-4 bg-transparent text-white font-mono text-sm outline-none placeholder-zinc-700"
                         />
                    </div>
                    <button className="bg-white text-black font-bold uppercase tracking-widest py-4 px-8 hover:bg-cyan-400 transition-colors duration-300">
                        {isArabic ? "إرسال" : "EXECUTE"}
                    </button>
                </form>
                <div className="flex justify-between mt-2 px-1">
                    <span className="text-[10px] font-mono text-zinc-600 uppercase">SECURE_SSL</span>
                    <span className="text-[10px] font-mono text-zinc-600 uppercase">ENCRYPTED</span>
                </div>
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}