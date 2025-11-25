'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const pathname = usePathname();
    const isArabic = pathname?.startsWith("/ar");

    const testimonials = [
        {
            id: "01",
            client: isArabic ? "سارة جنكينز" : "Sarah Jenkins",
            role: isArabic ? "المدير التقني، فينتك فلو" : "CTO, FINTECH FLOW",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop",
            quote: isArabic
                ? "لم يقم عماد ببناء موقع ويب فحسب؛ بل صمم نظاماً قابلاً للتوسع. الاهتمام بالبنية المعيارية غيّر طريقة تعامل فريقنا مع التطوير."
                : "Imad didn't just build a website; he engineered a scalable system. The attention to modular architecture changed how our team approaches development.",
            location: isArabic ? "لندن، المملكة المتحدة" : "LONDON, UK",
            accessLevel: "LEVEL_5"
        },
        {
            id: "02",
            client: isArabic ? "ماركوس ثورن" : "Marcus Thorne",
            role: isArabic ? "المدير الإبداعي، أوربيتال" : "Creative Director, ORBITAL",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
            quote: isArabic
                ? "مزيج نادر من الرؤية الإبداعية والدقة التقنية. لقد ترجم مفاهيمنا ثلاثية الأبعاد المعقدة إلى تجربة متصفح سلسة."
                : "A rare combination of creative vision and technical precision. He translated our complex 3D concepts into a seamless browser experience.",
            location: isArabic ? "برلين، ألمانيا" : "BERLIN, DE",
            accessLevel: "ADMIN"
        },
        {
            id: "03",
            client: isArabic ? "إيلينا رودريغيز" : "Elena Rodriguez",
            role: isArabic ? "المؤسس، مختبرات إيثر" : "Founder, AETHER LABS",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1000&auto=format&fit=crop",
            quote: isArabic
                ? "كنا بحاجة إلى موقع يبدو وكأنه من عام 2030. الرسوم المتحركة سلسة للغاية، وزاد معدل التحويل بنسبة 40% بعد الإطلاق."
                : "We needed a site that looked like it was from 2030. The animations are buttery smooth, and conversion increased by 40% post-launch.",
            location: isArabic ? "طوكيو، اليابان" : "TOKYO, JP",
            accessLevel: "VIP_USER"
        }
    ];

    // Navigation Logic
    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    // Auto-Play Effect
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000); // Change slides every 5 seconds

        // Cleanup timer on unmount or when dependencies change (resetting the clock)
        return () => clearInterval(timer);
    }, [handleNext, isPaused, currentIndex]); // currentIndex dependency ensures timer resets on manual click

    return (
        <section className="min-h-screen bg-[#0a0a0a] text-white py-24 px-4 relative flex items-center justify-center overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-20 right-0 text-[20vw] font-black text-white/5 leading-none select-none pointer-events-none truncate">
                {isArabic ? "آراء العملاء" : "FEEDBACK"}
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">

                {/* Header */}
                <div className="flex justify-between items-end border-b border-white/20 pb-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-cyan-400 animate-pulse"></div>
                            <span className="font-mono text-xs text-cyan-400 tracking-widest">
                                {isArabic ? "نقل مشفر" : "ENCRYPTED_TRANSMISSION"}
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                            {isArabic ? "ملفات العملاء" : "Client Dossiers"}
                        </h2>
                    </div>

                    {/* Controls - Top Right for Desktop */}
                    <div className="hidden md:flex gap-0 border border-white/20">
                        <button
                            onClick={handlePrev}
                            className="px-6 py-4 hover:bg-white hover:text-black transition-colors border-r border-white/20 font-bold text-xs tracking-widest"
                        >
                            {isArabic ? "السجل السابق" : "PREV_LOG"}
                        </button>
                        <button
                            onClick={handleNext}
                            className="px-6 py-4 hover:bg-white hover:text-black transition-colors font-bold text-xs tracking-widest"
                        >
                            {isArabic ? "السجل التالي" : "NEXT_LOG"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 h-full items-center">

                    {/* LEFT: VISUAL IDENTITY CARD */}
                    <div className="lg:col-span-5 relative group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, filter: "grayscale(100%)" }}
                                animate={{ opacity: 1, scale: 1, filter: "grayscale(0%)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "grayscale(100%)" }}
                                transition={{ duration: 0.5, ease: "circOut" }}
                                className="relative w-full border border-white/20 bg-white/5 p-2"
                                style={{ aspectRatio: '4 / 5' }}
                            >
                                {/* Tech Corners */}
                                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 -mt-px -ml-px z-20"></div>
                                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 -mb-px -mr-px z-20"></div>

                                {/* The Image */}
                                <div className="relative w-full h-full overflow-hidden bg-black">
                                    <Image
                                        src={testimonials[currentIndex].image}
                                        alt={testimonials[currentIndex].client}
                                        fill
                                        className="object-cover opacity-90"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        priority={currentIndex === 0}
                                        placeholder="blur"
                                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                                    />

                                    {/* Scanning Line Animation */}
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 h-1 bg-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.5)] z-10"
                                        animate={{ top: ["0%", "100%", "0%"] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    />

                                    {/* Overlay Grid */}
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none mix-blend-overlay"></div>
                                </div>

                                {/* Meta Tag */}
                                <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm border border-white/20 px-3 py-1 z-20">
                                    <p className="font-mono text-[10px] text-cyan-400 tracking-widest">
                                        ID: {testimonials[currentIndex].accessLevel}
                                    </p>
                                </div>

                                {/* Auto-Play Progress Indicator (Visual Timer) */}
                                <motion.div
                                    key={`progress-${currentIndex}`}
                                    className="absolute bottom-0 left-0 h-1 bg-cyan-400 z-30"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                />

                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT: CONTENT STREAM */}
                    <div
                        className="lg:col-span-7 flex flex-col justify-center relative"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Audio Visualizer Effect */}
                                <div className="flex gap-1 h-8 items-end mb-8 opacity-50">
                                    {[...Array(10)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="w-1 bg-cyan-400"
                                            animate={{ height: ["20%", "100%", "40%"] }}
                                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                                        />
                                    ))}
                                </div>

                                <blockquote className="text-3xl md:text-5xl font-medium leading-tight mb-8">
                                    "{testimonials[currentIndex].quote}"
                                </blockquote>

                                <div className="flex items-start gap-8 border-t border-white/10 pt-8">
                                    <div className="flex-1">
                                        <h4 className="text-2xl font-black uppercase text-white mb-1">
                                            {testimonials[currentIndex].client}
                                        </h4>
                                        <p className="font-mono text-sm text-gray-400">
                                            {testimonials[currentIndex].role}
                                        </p>
                                    </div>

                                    <div className="text-right hidden sm:block">
                                        <p className="font-mono text-[10px] text-gray-500 uppercase mb-1">{isArabic ? "الموقع" : "Location"}</p>
                                        <p className="font-bold text-white uppercase tracking-wider">{testimonials[currentIndex].location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Mobile Controls */}
                        <div className="flex md:hidden gap-4 mt-8">
                            <button
                                onClick={handlePrev}
                                className="flex-1 py-4 border border-white/20 text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors"
                            >
                                {isArabic ? "السابق" : "Prev"}
                            </button>
                            <button
                                onClick={handleNext}
                                className="flex-1 py-4 border border-white/20 text-xs font-bold uppercase hover:bg-white hover:text-black transition-colors"
                            >
                                {isArabic ? "التالي" : "Next"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}