"use client";

import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Globe, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

// --- CUSTOM HOOKS ---
const usePathnameSimulation = () => {
    const [pathname, setPathname] = useState('/');
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPathname(window.location.pathname || '/');
        }
    }, []);
    return pathname;
};

export default function ArchitecturalNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState("");
    const pathname = usePathnameSimulation();
    const isArabic = pathname.startsWith("/ar");
    
    const containerRef = useRef(null);
    const menuRef = useRef(null);

    // --- TIME LOGIC ---
    const updateTime = useCallback(() => {
        const now = new Date();
        setTime(now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, []);

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [updateTime]);

    // --- GSAP ANIMATIONS ---
    useEffect(() => {
        const ctx = gsap.context(() => {
            const clipEnd = isArabic ? 'circle(150% at 0% 0%)' : 'circle(150% at 100% 0%)';
            const clipStart = isArabic ? 'circle(0% at 0% 0%)' : 'circle(0% at 100% 0%)';

            if (isOpen) {
                gsap.to(menuRef.current, { clipPath: clipEnd, duration: 1.2, ease: 'expo.inOut' });
                gsap.fromTo('.menu-link-item',
                    { y: 150, rotate: 5 },
                    { y: 0, rotate: 0, stagger: 0.1, duration: 1.2, ease: 'power4.out', delay: 0.3 }
                );
                // Burger to X
                gsap.to('.burger-top', { rotation: 45, y: 4, duration: 0.4 });
                gsap.to('.burger-bot', { rotation: -45, y: -4, duration: 0.4 });
            } else {
                gsap.to(menuRef.current, { clipPath: clipStart, duration: 1, ease: 'expo.inOut' });
                gsap.to('.burger-top', { rotation: 0, y: 0, duration: 0.4 });
                gsap.to('.burger-bot', { rotation: 0, y: 0, duration: 0.4 });
            }
        }, containerRef);
        return () => ctx.revert();
    }, [isOpen, isArabic]);

    const navLinks = isArabic 
        ? [{ name: 'عني', h: '/ar/about' }, { name: 'المشاريع', h: '#projects' }, { name: 'مقالات', h: '/ar/blogs' }, { name: 'تواصل', h: '/ar/contact' }]
        : [{ name: 'ABOUT', h: '/en/about' }, { name: 'WORK', h: '#projects' }, { name: 'BLOGS', h: '/en/blogs' }, { name: 'CONTACT', h: '/en/contact' }];

    return (
        <div dir={isArabic ? 'rtl' : 'ltr'} className="text-white font-sans">
            
            {/* ================= 1. THE UI FRAME ================= */}
            <header ref={containerRef} className="fixed inset-0 z-50 pointer-events-none p-6 md:p-10 flex flex-col justify-between">
                
                {/* TOP ROW */}
                <div className="flex justify-between items-start">
         

<div className="pointer-events-auto">
    <a href="/" className="flex items-center gap-4 group">
        
        {/* LOGO CONTAINER */}
        <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-white/5 group-hover:border-white/20 transition-all duration-700 ease-expo">
            <Image
                src="/logo.png" // Replace with your actual path (svg, png, or webp)
                alt="Logo"
                fill
                className="object-contain p-1 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-expo"
                priority
            />
        </div>

    </a>
</div>

                    <div className="flex items-center gap-8 pointer-events-auto">
                        {/* Abstract Lang Toggle */}
                        <button onClick={() => window.location.href = isArabic ? '/en' : '/ar'} className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-500">
                             <span className="text-[9px] font-bold font-mono">{isArabic ? 'EN' : 'AR'}</span>
                        </button>

                        {/* Minimal Burger */}
                        <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 flex flex-col justify-center items-center gap-2 group relative">
                             <span className="burger-top w-8 h-[1px] bg-white transition-transform" />
                             <span className="burger-bot w-8 h-[1px] bg-white transition-transform" />
                        </button>
                    </div>
                </div>

             
            </header>

            {/* ================= 2. THE MENU OVERLAY ================= */}
            <div 
                ref={menuRef}
                className="fixed inset-0 z-40 bg-[#0a0a0a] flex items-center justify-center pointer-events-none"
                style={{ clipPath: isArabic ? 'circle(0% at 0% 0%)' : 'circle(0% at 100% 0%)' }}
            >
                {/* Background Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                <div className="container mx-auto px-10 flex flex-col pointer-events-auto">
                    <nav className="flex flex-col">
                        {navLinks.map((link, i) => (
                            <div key={i} className="overflow-hidden group py-2">
                                <a 
                                    href={link.h}
                                    onClick={() => setIsOpen(false)}
                                    className="menu-link-item block text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter text-outline group-hover:text-white transition-all duration-700"
                                >
                                    <span className="text-sm font-mono text-neutral-600 mr-4 ml-4 group-hover:text-cyan-400">0{i+1}</span>
                                    {link.name}
                                </a>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            <style jsx global>{`
                .text-outline {
                    -webkit-text-stroke: 1.5px rgba(255,255,255,0.15);
                    color: transparent;
                }
                @media (max-width: 768px) {
                    .text-outline { -webkit-text-stroke: 1px rgba(255,255,255,0.2); }
                }
            `}</style>
        </div>
    );
}