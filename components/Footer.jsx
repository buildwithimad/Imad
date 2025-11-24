'use client';

import { motion } from 'framer-motion';

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const currentYear = new Date().getFullYear();

    const footerLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' }
    ];

    const socialLinks = [
        { name: 'GitHub', href: '#' },
        { name: 'LinkedIn', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Instagram', href: '#' }
    ];

    return (
        <footer className="bg-[#050505] text-white border-t border-white/10 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-10"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">

                    {/* Brand / Logo Area */}
                    <div className="md:col-span-2 flex flex-col justify-between">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6">
                                IMAD HUSSAIN KHAN<span className="text-cyan-400">.</span>
                            </h2>
                            <p className="text-gray-400 max-w-sm font-mono text-sm leading-relaxed">
                                Full Stack Developer specializing in MERN & Next.js.
                                Focused on performance, accessibility, and modern aesthetics.
                            </p>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div>
                        <h3 className="font-mono text-xs text-cyan-400 mb-6 tracking-wider">NAVIGATION</h3>
                        <ul className="space-y-4">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-bold tracking-wide flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-mono text-xs text-cyan-400 mb-6 tracking-wider">SOCIAL</h3>
                        <ul className="space-y-4">
                            {socialLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm font-bold tracking-wide flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-xs font-mono">
                        © {currentYear} IMAD HUSSAIN KHAN. ALL RIGHTS RESERVED.
                    </p>

                    <button
                        onClick={scrollToTop}
                        className="group flex items-center gap-2 text-xs font-bold tracking-widest hover:text-cyan-400 transition-colors duration-300"
                    >
                        BACK TO TOP
                        <motion.span
                            animate={{ y: [0, -4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        >
                            ↑
                        </motion.span>
                    </button>
                </div>
            </div>
        </footer>
    );
}
