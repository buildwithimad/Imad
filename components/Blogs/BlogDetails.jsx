'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowLeft, Share2, Bookmark, ThumbsUp, Code, Hash } from 'lucide-react'; // Added Code, Hash for technical aesthetic
import Link from 'next/link';
import Image from 'next/image';

const BlogDetails = ({ blog, relatedBlogs = [], language, slug }) => {
  const isArabic = language === 'ar';

  // --- Animation Variants (Simple and Efficient) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.1, // Small, quick stagger for smooth sequencing
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, // Subtle lift/fade-in
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // If no blog data, show not found state
  if (!blog) {
    return (
      <section className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
        {/* Simplified Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03),transparent_70%)]" />

        <div className="relative z-20 w-full max-w-4xl mx-auto text-center">

          {/* Back Button (Simplified motion) */}
          <div className="mb-8 text-left">
            <Link href={isArabic ? "/ar/blogs" : "/en/blogs"}>
              <motion.button
                whileHover={{ opacity: 0.8 }}
                className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors font-mono text-sm"
              >
                <ArrowLeft size={16} className={isArabic ? "rotate-180" : ""} />
                <span>{isArabic ? "العودة للمدونة" : "Back to Blog Feed"}</span>
              </motion.button>
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="w-24 h-24 mx-auto bg-cyan-400/10 border border-cyan-400/20 rounded-full flex items-center justify-center">
              <Eye size={32} className="text-cyan-400" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl font-black tracking-tighter">
              {isArabic ? "المقالة غير موجودة (404)" : "ASSET NOT FOUND (404)"}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-400 max-w-md mx-auto font-mono">
              {isArabic
                ? "عذراً، الوحدة المطلوبة غير متوفرة. يرجى مراجعة سجلات المدونة."
                : "ERROR: Requested module is unavailable. Please check blog logs."
              }
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link href={isArabic ? "/ar/blogs" : "/en/blogs"}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-6 py-3 bg-cyan-400 text-black font-bold uppercase rounded-none hover:bg-cyan-300 transition-colors"
                >
                  {isArabic ? "البحث في السجلات" : "Search Logs"}
                </motion.button>
              </Link>

              <Link href={isArabic ? "/ar" : "/en"}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="px-6 py-3 bg-transparent border border-white/20 text-white font-bold uppercase rounded-none hover:border-white/40 transition-colors"
                >
                  {isArabic ? "العودة للرئيسية" : "Go Home"}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    );
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative px-4 py-20">

        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        <div className="w-full max-w-6xl mx-auto relative z-10 pt-16">

          {/* Header Section (Simplified Motion, High Contrast) */}
          <div className="mb-16 border-b-4 border-cyan-400/50 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-end">
            
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="md:w-3/5">
              {/* Back Button */}
              <motion.div variants={itemVariants} className="mb-4">
                  <Link href={isArabic ? "/ar/blogs" : "/en/blogs"}>
                      <motion.button
                          whileHover={{ opacity: 0.8 }}
                          className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors font-mono text-sm"
                      >
                          <ArrowLeft size={16} className={isArabic ? "rotate-180" : ""} />
                          <span>{isArabic ? "عودة لسجل المدونة" : "Return to Blog Log"}</span>
                      </motion.button>
                  </Link>
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-cyan-400">
                {isArabic ? "سجل" : "SYSTEM LOG"}
              </motion.h2>
              <motion.h2
                variants={itemVariants}
                className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white text-stroke-black"
              >
                {isArabic ? "المقالة" : "ARTICLE ASSET"}
              </motion.h2>
            </motion.div>

            <motion.div
              variants={containerVariants} initial="hidden" animate="visible"
              className="md:w-2/5 text-right mt-4 md:mt-0 border-l border-white/20 pl-6"
            >
              <motion.p variants={itemVariants} className="font-mono text-xs sm:text-sm text-gray-400">{isArabic ? "حالة النظام: متصل" : "SYSTEM STATUS: ONLINE"}</motion.p>
              <motion.p variants={itemVariants} className="font-mono text-xs sm:text-sm text-gray-400">{isArabic ? "الموقع: عالمي" : "LOCATION: WORLDWIDE"}</motion.p>
              <motion.p variants={itemVariants} className="font-mono text-xs sm:text-sm text-gray-400">SLUG: {slug || 'N/A'}</motion.p>
            </motion.div>
          </div>

          {/* Article Header (Title & Meta) */}
          <motion.div
            variants={containerVariants} initial="hidden" animate="visible"
            className="text-center mb-16"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-cyan-400" />
              <Code size={18} className="text-cyan-400" />
              <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
                {blog.categories?.[0]?.[isArabic ? 'ar' : 'en'] || (isArabic ? "التصنيف" : "CATEGORY")}
              </span>
              <div className="h-[2px] w-8 bg-cyan-400" />
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
              {blog.title?.[isArabic ? 'ar' : 'en']}
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8 font-mono border-y border-white/10 py-3">
              {blog.description?.[isArabic ? 'ar' : 'en']}
            </motion.p>

            {/* Meta Information */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400 font-mono">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-cyan-400" />
                <span>{blog.publishedAt ? formatDate(blog.publishedAt) : (isArabic ? 'حديث' : 'Recent')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-cyan-400" />
                <span>{blog.readTime || 5} {isArabic ? "دقيقة قراءة" : "min read"}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Featured Image (moved below header for better flow) */}
        {blog.images[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-4xl mx-auto relative z-10 border-4 border-cyan-400/20"
              style={{ aspectRatio: '2 / 1', maxHeight: '500px' }}
            >
              <Image
                src={blog.images?.[0]?.asset?.url || blog.images?.[0]}
                alt={blog.title?.[isArabic ? 'ar' : 'en'] || 'Blog featured image'}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 75vw"
                priority
              />
            </motion.div>
          )}

      </section>

      {/* Article Content */}
      <section className="min-h-screen w-full bg-[#0a0a0a] text-white py-20 px-4 relative overflow-hidden">

        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03),transparent_70%)]" />

        <div className="w-full max-w-4xl mx-auto relative z-10">

          {/* Article Content */}
          <div className="mb-16">
            {blog.sections?.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.2 }} // Optimized viewport trigger
                className="mb-12 p-6 bg-black/50"
              >
                <h2 className="text-2xl sm:text-3xl font-black text-cyan-400 mb-6 flex items-center gap-3">
                  <Hash size={24} />
                  {section.title?.[isArabic ? 'ar' : 'en']}
                </h2>
                <div className="prose prose-lg prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed text-base sm:text-lg font-mono">
                    {section.content?.[isArabic ? 'ar' : 'en']?.split('\n\n').map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Fallback content if no sections */}
            {!blog.sections?.length && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="text-gray-300 leading-relaxed text-base sm:text-lg font-mono p-6 border border-white/10 bg-black/50"
              >
                 <h2 className="text-2xl sm:text-3xl font-black text-cyan-400 mb-6 flex items-center gap-3">
                    <Hash size={24} />
                    {isArabic ? "محتوى مؤقت" : "Temporary Content Load"}
                </h2>
                <p className="mb-4">
                  {isArabic
                    ? "هذا المقال يغطي موضوعاً تقنياً مهماً في مجال تطوير الويب. سنستعرض فيه المفاهيم الأساسية والممارسات الأفضل لتحقيق أداء أمثل في التطبيقات."
                    : "This article covers an important technical topic in web development. We will explore the fundamental concepts and best practices for achieving optimal performance in applications."
                  }
                </p>
                <p className="mb-4">
                  {isArabic
                    ? "تطوير الويب الحديث يتطلب فهماً عميقاً للتقنيات والأدوات المتاحة. هذا المقال سيوفر لك الإرشادات اللازمة لبناء تطبيقات ويب قوية وموثوقة."
                    : "Modern web development requires a deep understanding of available technologies and tools. This article will provide you with the necessary guidance to build robust and reliable web applications."
                  }
                </p>
              </motion.div>
            )}
          </div>

          {/* Conclusion */}
          {blog.conclusion?.[isArabic ? 'ar' : 'en'] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mb-16 p-8 border-4 border-cyan-400/50"
            >
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-6 flex items-center gap-3">
                <Code size={24} className="text-cyan-400" />
                {isArabic ? "الخاتمة: إغلاق السجل" : "CONCLUSION: LOG CLOSURE"}
              </h2>
              <div className="text-gray-300 leading-relaxed text-base sm:text-lg font-mono">
                {blog.conclusion[isArabic ? 'ar' : 'en'].split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Article Actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16 flex flex-wrap items-center justify-between gap-4 p-6 border-y border-white/20"
          >
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-cyan-400 transition-all duration-300"
              >
                <ThumbsUp size={16} className="text-cyan-400" />
                <span className="text-sm font-mono font-medium">
                  {isArabic ? "إعجاب" : "LIKE"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(34, 211, 238, 0.5)' }}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-cyan-400 transition-all duration-300"
              >
                <Bookmark size={16} className="text-cyan-400" />
                <span className="text-sm font-mono font-medium">
                  {isArabic ? "حفظ" : "SAVE"}
                </span>
              </motion.button>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 text-white border border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors"
            >
              <Share2 size={16} className="text-cyan-400" />
              <span className="text-sm font-mono font-medium">
                {isArabic ? "مشاركة الرابط" : "SHARE LINK"}
              </span>
            </motion.button>
          </motion.div>

          {/* Related Articles */}
          {relatedBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-black mb-8 border-b border-cyan-400/50 pb-2 flex items-center gap-2">
                <Terminal size={24} className="text-cyan-400" />
                {isArabic ? "مقالات ذات صلة" : "RELATED ASSETS"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedBlogs.slice(0, 2).map((relatedBlog, index) => (
                  <motion.article
                    key={relatedBlog._id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }} // Simple x offset for staggering
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 border border-white/10 hover:border-cyan-400 hover:bg-white/5 transition-all duration-300 font-mono"
                  >
                    <h4 className="text-lg font-bold mb-2 text-cyan-400 flex items-center gap-2">
                      <Hash size={16} />
                      {relatedBlog.title?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'مقال ذو صلة' : 'Related Asset')}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      {relatedBlog.description?.[isArabic ? 'ar' : 'en']?.substring(0, 100) || (isArabic ? 'وصف مختصر...' : 'Brief description...')}...
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {relatedBlog.readTime || 5} {isArabic ? 'دقيقة' : 'min read'}
                        </span>
                        <Link href={`/${language}/blogs/${relatedBlog.slug}`} className="text-cyan-400 hover:text-white transition-colors uppercase">
                            {isArabic ? "قراءة" : "VIEW LOG"}
                        </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Global CSS for text-stroke (re-applied for creativity) */}
      <style jsx global>{`
        .text-stroke-black {
          -webkit-text-stroke: 1px rgba(0,0,0,0.8);
          color: transparent;
        }
      `}</style>
    </>
  );
};

export default BlogDetails;