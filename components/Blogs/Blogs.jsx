'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Clock, ArrowRight, Eye, Hash, Cpu, Mail } from 'lucide-react'; // Added Mail, Cpu, Hash for technical aesthetic
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// --- Utility Component for Section Animation ---
function AnimatedSection({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- Blog Card Component (The System Asset) ---
function BlogCard({ blog, index }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Unique Asset ID for the Brutalist style
  const assetId = `ASSET_${(index + 1).toString().padStart(2, '0')}`;
  
  // Custom motion for card entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5, 
        delay: index * 0.12, // Smoother stagger 
        ease: [0.42, 0, 0.58, 1] 
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative bg-black/80 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden cursor-pointer shadow-lg hover:shadow-cyan-400/20"
    >
        {/* Decorative Top Border Line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-cyan-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Featured Image */}
        {blog.images?.[0]?.asset?.url && (
          <div className="relative h-48 overflow-hidden border-b border-white/10">
            <Image
              src={blog.images[0].asset.url}
              alt={blog.title?.[isArabic ? 'ar' : 'en'] || 'Blog thumbnail'}
              fill
              className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Asset ID Overlay */}
            <div className="absolute bottom-0 right-0 bg-black/70 p-2 text-xs font-mono text-cyan-400 border-t border-l border-white/20">
                {assetId}
            </div>
          </div>
        )}

        <div className="relative p-6 sm:p-8">

          {/* Category Badge & Read Time */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-xs font-mono uppercase tracking-wider border border-cyan-400/20">
              {blog.categories?.[0]?.[isArabic ? 'ar' : 'en'] || 'ASSET_CLASS'}
            </span>
            <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{blog.readTime || 5} min</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <Link href={`${isArabic ? '/ar' : '/en'}/blogs/${blog.slug.current}`}>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors leading-tight tracking-tight">
              {blog.title?.[isArabic ? 'ar' : 'en'] || 'Untitled Blog'}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 font-mono">
            {blog.description?.[isArabic ? 'ar' : 'en'] || 'Processing Asset Description...'}
          </p>

          {/* Meta Information & Action */}
          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
              <Calendar size={12} className="text-cyan-400" />
              <span>{blog.publishedAt ? formatDate(blog.publishedAt) : 'RECENT_LOG'}</span>
            </div>

            <Link href={`${isArabic ? '/ar' : '/en'}/blogs/${blog.slug.current}`}>
              <motion.button
                whileHover={{ x: isArabic ? -5 : 5 }}
                className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors text-sm font-bold group/btn uppercase"
              >
                <span>{isArabic ? 'عرض السجل' : 'View Log'}</span>
                <ArrowRight size={14} className={`${isArabic ? 'rotate-180' : ''} group-hover/btn:translate-x-1 transition-transform`} />
              </motion.button>
            </Link>
          </div>
        </div>
    </motion.article>
  );
}

// --- Main Blogs Section ---
export default function Blogs({ blogs: initialBlogs = [] }) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");

  const blogs = initialBlogs;

  // Header Animation Variants
  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="min-h-screen w-full bg-[#050505] text-white py-24 px-4 relative overflow-hidden">

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div 
            variants={headerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-cyan-400" />
            <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
              // LIVE_ASSET_FEED
            </span>
            <div className="h-[2px] w-12 bg-cyan-400" />
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-4">
            {isArabic ? "سجلات" : "SYSTEM LOGS"}
          </h2>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-gray-600">
            {isArabic ? "المحترف" : "PROFESSIONAL ASSETS"}
          </h2>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mt-6 font-mono">
            {isArabic
              ? "تحليلات تقنية عميقة ومشاريع منتهية مقدمة في سجلات نظام عالية التخصص."
              : "In-depth technical analysis and completed projects presented as highly specialized system logs."
            }
          </p>
        </motion.div>

        {/* Blog Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogs.map((blog, index) => (
              <BlogCard key={blog._id} blog={blog} index={index} />
            ))}
          </div>
        ) : (
          <AnimatedSection delay={0.5} className="text-center py-20">
            <div className="max-w-md mx-auto p-8 border border-cyan-400/20 bg-black/70">
              <div className="w-20 h-20 mx-auto bg-cyan-400/10 border border-cyan-400 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Cpu size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-4 uppercase">
                {isArabic ? "المقالات قيد التحضير" : "ASSETS COMPILING"}
              </h3>
              <p className="text-gray-400 text-lg font-mono">
                {isArabic
                  ? "يتم تجميع المقالات التقنية الجديدة. يرجى مراجعة هذا القسم قريباً."
                  : "New technical assets are currently being compiled. Please check this feed again soon."
                }
              </p>
            </div>
          </AnimatedSection>
        )}

        {/* Load More / Newsletter Section (Simplified) */}
        <AnimatedSection delay={0.5} className="mt-24">
          <div className="text-center border-t-4 border-white/10 pt-16">
            <h3 className="text-3xl font-black mb-4 uppercase flex items-center justify-center gap-3">
               <Mail size={24} className="text-cyan-400" />
              {isArabic ? "تلقي التحديثات" : "RECEIVE SYSTEM UPDATES"}
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto font-mono">
              {isArabic
                ? "اشترك لتلقي تنبيهات عند نشر سجلات أو مشاريع جديدة."
                : "Subscribe to receive alerts when new logs or projects are published."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder={isArabic ? "إدخال البريد الإلكتروني" : "ENTER EMAIL ADDRESS"}
                className="flex-1 px-4 py-3 bg-white/5 border border-cyan-400/50 rounded-none text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors font-mono"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-cyan-400 text-black font-black uppercase rounded-none hover:bg-cyan-300 transition-colors whitespace-nowrap shadow-lg"
              >
                {isArabic ? "تفعيل" : "ACTIVATE"}
              </motion.button>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}