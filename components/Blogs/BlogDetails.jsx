'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowLeft, Share2, Bookmark, ThumbsUp, Code, Hash, Terminal, Facebook, Instagram, Twitter, MessageCircle, Copy } from 'lucide-react';
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
        staggerChildren: 0.1, 
      } 
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, 
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  // If no blog data, show not found state
  if (!blog) {
    return (
      <section className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
        {/* Simplified Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03),transparent_70%)]" />

        <div className="relative z-20 w-full max-w-4xl mx-auto text-center">

          {/* Back Button */}
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
            {/* STYLED ERROR ICON CONTAINER (Sharp Border) */}
            <motion.div variants={itemVariants} className="w-24 h-24 mx-auto bg-cyan-400/10 border-2 border-cyan-400/50 flex items-center justify-center">
              <Eye size={32} className="text-cyan-400 animate-pulse" />
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
                  whileHover={{ scale: 1.02, backgroundColor: '#22d3ee' }} // Cyan 400
                  className="px-6 py-3 bg-cyan-400 text-black font-bold uppercase border border-cyan-400 rounded-none transition-colors"
                >
                  {isArabic ? "البحث في السجلات" : "Search Logs"}
                </motion.button>
              </Link>

              <Link href={isArabic ? "/ar" : "/en"}>
                <motion.button
                  whileHover={{ scale: 1.02, borderColor: '#ffffff' }}
                  className="px-6 py-3 bg-transparent border border-white/20 text-white font-bold uppercase rounded-none transition-colors"
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
    return new Date(dateString).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  // Share functions
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = blog?.title?.[isArabic ? 'ar' : 'en'] || '';
  const shareText = blog?.description?.[isArabic ? 'ar' : 'en'] || '';
  const shareImage = blog?.images?.[0]?.asset?.url || blog?.images?.[0] || '';
  const contentImages = blog?.images?.slice(1) || []; // reserve first image for hero, rest get sprinkled through sections

  console.log('Share Image URL:', shareImage);

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&t=${encodeURIComponent(shareTitle)}&description=${encodeURIComponent(shareText)}${shareImage ? `&picture=${encodeURIComponent(shareImage)}` : ''}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToInstagram = () => {
    // Instagram doesn't have a direct share URL, so we'll copy to clipboard
    navigator.clipboard.writeText(`${shareTitle}\n\n${shareText}\n\n${currentUrl}`);
    // Could show a toast notification here
    alert(isArabic ? 'تم نسخ الرابط إلى الحافظة! يمكنك مشاركته على إنستغرام' : 'Link copied to clipboard! You can share it on Instagram');
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle}\n\n${shareText}\n\n${currentUrl}`)}`;
    window.open(url, '_blank');
  };

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert(isArabic ? 'تم نسخ الرابط إلى الحافظة!' : 'Link copied to clipboard!');
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

          {/* Header Section (Big Typography & HUD Metadata) */}
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
              className="md:w-2/5 text-right mt-4 md:mt-0 border-l border-white/20 pl-6 font-mono"
            >
              <motion.p variants={itemVariants} className="text-xs sm:text-sm text-gray-400">{isArabic ? "حالة النظام: متصل" : "SYSTEM STATUS: ONLINE"}</motion.p>
              <motion.p variants={itemVariants} className="text-xs sm:text-sm text-gray-400">{isArabic ? "الموقع: عالمي" : "LOCATION: WORLDWIDE"}</motion.p>
              <motion.p variants={itemVariants} className="text-xs sm:text-sm text-gray-400">SLUG: {slug || 'N/A'}</motion.p>
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

        {/* Featured Image */}
        {blog.images?.[0] && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-4xl lg:max-w-3xl mx-auto relative z-10 border-4 border-cyan-400/20"
            >
              <Image
                src={blog.images?.[0]?.asset?.url || blog.images?.[0]}
                alt={blog.title?.[isArabic ? 'ar' : 'en'] || 'Blog featured image'}
                width={blog.images?.[0]?.asset?.metadata?.dimensions?.width || 800}
                height={blog.images?.[0]?.asset?.metadata?.dimensions?.height || 400}
                className="w-full h-auto"
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

        <div 
            className="w-full max-w-4xl mx-auto relative z-10"
            dir={isArabic ? 'rtl' : 'ltr'} // Crucial for Arabic text flow
        >

          {/* Article Content Blocks */}
          <div className="mb-16">
            {blog.sections?.map((section, index) => {
              const imageIndex = Math.floor((index + 1) / 2) - 1; // after every 2 sections
              const sectionImage = imageIndex >= 0 ? contentImages?.[imageIndex] : null;

              return (
                <React.Fragment key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="mb-12 p-6 bg-black/50 border border-zinc-800"
                  >
                    <h2 className="text-2xl sm:text-3xl font-black text-cyan-400 mb-6 flex items-center gap-3">
                      <Hash size={24} />
                      {section.title?.[isArabic ? 'ar' : 'en']}
                    </h2>
                    <div className="prose prose-lg prose-invert max-w-none">
                      <div className="text-gray-300 leading-relaxed text-base sm:text-lg font-mono" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                        {section.content?.[isArabic ? 'ar' : 'en']?.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Drop in the next gallery image after every 2 sections, if available */}
                  {((index + 1) % 2 === 0) && sectionImage && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="mb-12 w-full max-w-4xl lg:max-w-3xl mx-auto"
                    >
                      <div className="border-4 border-cyan-400/30">
                        <Image
                          src={sectionImage?.asset?.url || sectionImage}
                          alt={`${blog.title?.[isArabic ? 'ar' : 'en'] || 'Blog image'} - ${index + 1}`}
                          width={sectionImage?.asset?.metadata?.dimensions?.width || 1200}
                          height={sectionImage?.asset?.metadata?.dimensions?.height || 675}
                          className="w-full h-auto"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 75vw"
                        />
                      </div>
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}

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
              <div className="text-gray-300 leading-relaxed text-base sm:text-lg font-mono" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
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
                whileHover={{ scale: 1.05, borderColor: '#22d3ee', backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-cyan-400 transition-all duration-300 rounded-none"
              >
                <ThumbsUp size={16} className="text-cyan-400" />
                <span className="text-sm font-mono font-medium">
                  {isArabic ? "إعجاب" : "LIKE"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: '#22d3ee', backgroundColor: 'rgba(34, 211, 238, 0.1)' }}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-cyan-400 transition-all duration-300 rounded-none"
              >
                <Bookmark size={16} className="text-cyan-400" />
                <span className="text-sm font-mono font-medium">
                  {isArabic ? "حفظ" : "SAVE"}
                </span>
              </motion.button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <motion.button
                onClick={shareToFacebook}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
                className="flex items-center gap-2 px-3 py-2 text-white border border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors rounded-none"
              >
                <Facebook size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-medium hidden sm:inline">
                  {isArabic ? "فيسبوك" : "FACEBOOK"}
                </span>
              </motion.button>

              <motion.button
                onClick={shareToInstagram}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
                className="flex items-center gap-2 px-3 py-2 text-white border border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors rounded-none"
              >
                <Instagram size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-medium hidden sm:inline">
                  {isArabic ? "إنستغرام" : "INSTAGRAM"}
                </span>
              </motion.button>

              <motion.button
                onClick={shareToWhatsApp}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
                className="flex items-center gap-2 px-3 py-2 text-white border border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors rounded-none"
              >
                <MessageCircle size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-medium hidden sm:inline">
                  {isArabic ? "واتساب" : "WHATSAPP"}
                </span>
              </motion.button>

              <motion.button
                onClick={shareToTwitter}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
                className="flex items-center gap-2 px-3 py-2 text-white border border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors rounded-none"
              >
                <Twitter size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-medium hidden sm:inline">
                  {isArabic ? "تويتر" : "TWITTER"}
                </span>
              </motion.button>

              <motion.button
                onClick={copyLink}
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34, 211, 238, 0.2)' }}
                className="flex items-center gap-2 px-3 py-2 text-white border border-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20 transition-colors rounded-none"
              >
                <Copy size={16} className="text-cyan-400" />
                <span className="text-xs font-mono font-medium hidden sm:inline">
                  {isArabic ? "نسخ" : "COPY"}
                </span>
              </motion.button>
            </div>
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
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-6 border border-white/10 hover:border-cyan-400 hover:bg-white/5 transition-all duration-300 font-mono rounded-none"
                  >
                    <h4 className="text-lg font-bold mb-2 text-cyan-400 flex items-center gap-2">
                      <Hash size={16} />
                      {relatedBlog.title?.[isArabic ? 'ar' : 'en'] || (isArabic ? 'مقال ذو صلة' : 'Related Asset')}
                    </h4>
                    <p className="text-gray-400 text-sm mb-4" style={{ direction: isArabic ? 'rtl' : 'ltr' }}>
                      {relatedBlog.description?.[isArabic ? 'ar' : 'en']?.substring(0, 100) || (isArabic ? 'وصف مختصر...' : 'Brief description...')}...
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {relatedBlog.readTime || 5} {isArabic ? 'دقيقة' : 'min read'}
                        </span>
                        <Link href={`/${language}/blogs/${relatedBlog.slug?.current || relatedBlog.slug}`} className="text-cyan-400 hover:text-white transition-colors uppercase">
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
      
      {/* Global CSS for text-stroke */}
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
