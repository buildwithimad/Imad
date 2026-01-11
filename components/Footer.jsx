'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();
    const isArabic = pathname?.startsWith("/ar");
const [time, setTime] = useState("");
    // Live Clock Logic (Client-side only)
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZoneName: 'short'
            }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GITHUB', href: 'https://github.com/buildwithimad' },
        { name: 'LINKEDIN', href: 'https://www.linkedin.com/in/imad-hussain-khan-76388b305' },
        { name: 'INSTAGRAM', href: 'https://www.instagram.com/devnexstudio' },
    ];

    return (
        <footer className="bg-[#050505] text-white border-t border-zinc-800 relative z-10 select-none overflow-hidden">
            
            {/* 1. THE BIG INTERACTIVE CALL TO ACTION */}
            <div className="border-b border-zinc-800">
                <a 
                    href="mailto:contact@imad.com" 
                    className="group block relative w-full overflow-hidden cursor-pointer"
                >
                    <div className="py-24 md:py-40 px-4 md:px-8 flex flex-col items-center justify-center transition-colors duration-500 group-hover:bg-zinc-900">
                        {/* Animated Text Container */}
                        <div className="relative overflow-hidden">
                            <motion.h2 
                                className="text-[12vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter text-center uppercase mix-blend-difference text-white"
                            >
                                {isArabic ? "لنعمل معاً" : "LET'S TALK"}
                            </motion.h2>
                            
                            {/* Arrow that appears on hover */}
                            <motion.div 
                                className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="stroke-cyan-400 w-12 h-12 md:w-24 md:h-24 rotate-45">
                                    <path d="M7 17L17 7M17 7H7M17 7V17" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
                                </svg>
                            </motion.div>
                        </div>
                        
                        <p className="mt-8 font-mono text-xs md:text-sm text-gray-500 tracking-widest uppercase group-hover:text-cyan-400 transition-colors">
                            {isArabic ? "ابدأ مشروعك القادم" : "Start your next project"}
                        </p>
                    </div>
                </a>
            </div>

            {/* 2. INFO GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
                
                {/* Col 1: Brand & Copyright */}
                <div className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[150px]">
                    <div className="font-black text-lg tracking-tight">
                        IMAD<span className="text-cyan-400">.</span>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono uppercase mt-auto">
                        © {currentYear} {isArabic ? "جميع الحقوق محفوظة" : "All Rights Reserved"}
                    </div>
                    <div className="mt-2">
                        <a
                            href={isArabic ? "/ar/privacy-policy" : "/en/privacy-policy"}
                            className="text-xs text-zinc-500 hover:text-cyan-400 transition-colors font-mono uppercase"
                        >
                            {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
                        </a>
                    </div>
                </div>

                {/* Col 2: Socials (Clean List) */}
                <div className="flex flex-col">
                    {socialLinks.map((link, i) => (
                        <a 
                            key={link.name}
                            href={link.href}
                            className={`
                                flex items-center justify-between px-6 md:px-8 py-4 md:py-6 
                                text-sm font-bold tracking-widest hover:bg-white hover:text-black 
                                transition-colors duration-300 border-b border-zinc-800 last:border-b-0
                            `}
                        >
                            <span>{link.name}</span>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="stroke-current" strokeWidth="2">
                                <path d="M7 17L17 7M17 7H7M17 7V17" />
                            </svg>
                        </a>
                    ))}
                </div>

                {/* Col 3: Local Time & Back to Top */}
                <div className="flex flex-col justify-between p-0">
                    {/* Time Display */}
                    <div className="p-6 md:p-8 border-b border-zinc-800 flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-500 uppercase">
                            {isArabic ? "التوقيت المحلي" : "Local Time"}
                        </span>
                        <span className="font-mono text-sm text-cyan-400">
                            {time || "--:--"}
                        </span>
                    </div>

                    {/* Scroll Top Button */}
                    <button 
                        onClick={scrollToTop}
                        className="flex-1 w-full flex items-center justify-center gap-3 hover:bg-cyan-400 hover:text-black transition-colors duration-300 group p-6 md:p-8"
                    >
                        <span className="text-xs font-bold tracking-widest uppercase">
                            {isArabic ? "العودة للأعلى" : "Back to Top"}
                        </span>
                        <span className="text-lg group-hover:-translate-y-1 transition-transform duration-300">↑</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}