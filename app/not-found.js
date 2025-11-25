'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Home, Search, Cpu } from 'lucide-react';

export default function NotFound() {
    const pathname = usePathname();
    const isArabic = pathname?.startsWith("/ar");

    return (
        <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.2, 0.4],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
                {/* Error Code Display */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-[1px] w-12 bg-cyan-400" />
                        <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
                            {isArabic ? "خطأ في النظام" : "SYSTEM ERROR"}
                        </span>
                        <div className="h-[1px] w-12 bg-cyan-400" />
                    </div>

                    <motion.h1
                        className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        404
                    </motion.h1>

                    <motion.h2
                        className="text-4xl md:text-5xl font-black tracking-tighter mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        {isArabic ? "الصفحة غير موجودة" : "PAGE NOT FOUND"}
                    </motion.h2>

                    <motion.p
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-mono leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        {isArabic
                            ? "الوحدة المطلوبة غير متوفرة في النظام. يرجى التحقق من المسار أو العودة إلى الصفحة الرئيسية."
                            : "The requested module is unavailable in the system. Please verify the path or return to the main interface."
                        }
                    </motion.p>
                </motion.div>

                {/* Navigation Options */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
                >
                    {/* Back Button */}
                    <motion.button
                        onClick={() => window.history.back()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative bg-black/50 border border-white/10 hover:border-cyan-400/50 p-8 rounded-none transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <ArrowLeft size={32} className="text-cyan-400 group-hover:rotate-180 transition-transform duration-300" />
                            <div className="text-center">
                                <h3 className="font-bold text-lg uppercase tracking-wide mb-1">
                                    {isArabic ? "العودة" : "GO BACK"}
                                </h3>
                                <p className="font-mono text-xs text-gray-400 uppercase">
                                    {isArabic ? "الصفحة السابقة" : "Previous Page"}
                                </p>
                            </div>
                        </div>
                    </motion.button>

                    {/* Home Button */}
                    <Link href={isArabic ? "/ar" : "/en"}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative bg-black/50 border border-white/10 hover:border-cyan-400/50 p-8 rounded-none transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <Home size={32} className="text-cyan-400" />
                                <div className="text-center">
                                    <h3 className="font-bold text-lg uppercase tracking-wide mb-1">
                                        {isArabic ? "الرئيسية" : "HOME"}
                                    </h3>
                                    <p className="font-mono text-xs text-gray-400 uppercase">
                                        {isArabic ? "العودة للمنزل" : "Return Home"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Search/Projects Button */}
                    <Link href={isArabic ? "/ar#projects" : "/en#projects"}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative bg-black/50 border border-white/10 hover:border-cyan-400/50 p-8 rounded-none transition-all duration-300 overflow-hidden cursor-pointer"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <Search size={32} className="text-cyan-400" />
                                <div className="text-center">
                                    <h3 className="font-bold text-lg uppercase tracking-wide mb-1">
                                        {isArabic ? "استكشف" : "EXPLORE"}
                                    </h3>
                                    <p className="font-mono text-xs text-gray-400 uppercase">
                                        {isArabic ? "عرض الأعمال" : "View Projects"}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </motion.div>

                {/* System Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-black/50 border border-white/10 rounded-none">
                        <Cpu size={16} className="text-cyan-400" />
                        <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                            {isArabic ? "حالة النظام: متصل" : "System Status: Online"}
                        </span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}