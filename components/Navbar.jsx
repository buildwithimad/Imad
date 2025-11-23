'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'EXPERIENCE', href: '#experience' },
  { name: 'CONTACT', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [time, setTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Update Time for that "System" feel
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
          scrolled || isOpen 
            ? 'bg-black/80 backdrop-blur-md border-white/20' 
            : 'bg-transparent border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* LOGO AREA */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-3 h-3 bg-white group-hover:bg-cyan-400 transition-colors duration-300"></div>
            <span className="text-xl font-black tracking-tighter text-white">IMAD</span>
            <span className="text-xs font-mono text-gray-500 hidden sm:block">_PF_V1.0</span>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="relative group block overflow-hidden"
              >
                <span className="text-xs font-bold text-gray-400 group-hover:text-white transition-colors duration-300 tracking-widest block relative z-10">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">{link.name}</span>
                  <span className="absolute top-0 left-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-cyan-400">
                    [{link.name}]
                  </span>
                </span>
              </a>
            ))}
          </div>

          {/* RIGHT SIDE: UTILITIES & CTA */}
          <div className="flex items-center gap-6">
            {/* Time Display */}
            <div className="hidden lg:flex flex-col text-right font-mono text-[10px] text-gray-400 leading-tight">
              <span>LOCAL_TIME</span>
              <span className="text-white">{time} UTC+3</span>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block px-5 py-2 border border-white text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              Let's Talk
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden flex flex-col gap-1.5 group p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              <motion.div 
                animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                className="w-8 h-0.5 bg-white origin-center"
              />
              <motion.div 
                animate={{ opacity: isOpen ? 0 : 1 }}
                className="w-8 h-0.5 bg-white"
              />
              <motion.div 
                animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
                className="w-8 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] pt-24 px-6 flex flex-col"
          >
            {/* Background Grid for Mobile */}
            <div className="absolute inset-0 pointer-events-none opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="flex flex-col gap-6 relative z-10 h-full justify-center">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="group flex items-baseline gap-4 border-b border-white/10 pb-4"
                >
                  <span className="font-mono text-xs text-cyan-400">0{index + 1}</span>
                  <span className="text-5xl font-black text-white tracking-tighter group-hover:pl-4 transition-all duration-300">
                    {link.name}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="pb-12 relative z-10 border-t border-white/20 pt-6 mt-auto flex justify-between items-end">
               <div>
                 <p className="text-gray-500 font-mono text-xs">CONTACT</p>
                 <p className="text-white text-lg font-bold">hello@imad.dev</p>
               </div>
               <div className="text-right">
                 <p className="text-gray-500 font-mono text-xs">SOCIALS</p>
                 <div className="flex gap-4 text-white mt-2">
                   <span>GH</span>
                   <span>LI</span>
                   <span>TW</span>
                 </div>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}