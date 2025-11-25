'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook, Hash, X } from 'lucide-react'; // Added Hash and X for mobile toggle

// --- Configuration ---
const SOCIAL_LINKS = [
  { icon: Github, nameEn: 'GITHUB', nameAr: 'جيت هاب', url: 'https://github.com/ImaadDev' },
  { icon: Linkedin, nameEn: 'LINKEDIN', nameAr: 'لينكد إن', url: 'https://www.linkedin.com/in/imad-hussain-khan-76388b305' },
  { icon: Instagram, nameEn: 'INSTAGRAM', nameAr: 'انستغرام', url: 'https://www.instagram.com/imaddeveloper?igsh=bXJ4MXB4bmo2djAy' },
  { icon: Facebook, nameEn: 'FACEBOOK', nameAr: 'فيسبوك', url: 'https://www.facebook.com/imad.hussain.khan.2025' },
];

export default function FixedSocialPanel({ isArabic = false }) {
  

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Stagger variants for mobile reveal
  const staggerVariants = {
    closed: { opacity: 0, scale: 0.5, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { opacity: 1, scale: 1, transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  };

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  const MobileLink = ({ link, index }) => (
    <motion.a
      key={link.nameEn}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      onClick={() => setIsMobileOpen(false)} // Close on click
      
      // Mobile link styling: sharp, colored
      className="flex items-center justify-center w-12 h-12 mb-2 bg-white text-black  transition-all duration-300 hover:bg-cyan-400 hover:text-white"
    >
      <link.icon size={20} />
    </motion.a>
  );


  // --- LARGE SCREEN DESIGN (Vertical Slide-Out Panel) ---
  const LargeScreenPanel = (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8, duration: 0.8 }}
      className="fixed bottom-0 right-0 z-30 hidden lg:block"
    >
      <div 
        className="flex flex-col border-t border-l border-white/20 bg-[#0a0a0a]/80 backdrop-blur-sm"
      >
        {SOCIAL_LINKS.map((link, index) => (
          <motion.a
            key={link.nameEn}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center h-16 w-16 text-white transition-all duration-300 overflow-hidden"
            style={{ 
              borderBottom: index < SOCIAL_LINKS.length - 1 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
            }}
            whileHover={{ backgroundColor: 'rgba(34, 211, 238, 0.1)', x: -5 }} 
          >
            <link.icon 
              size={24} 
              className="text-white opacity-80 transition-all duration-300 group-hover:text-cyan-400 group-hover:opacity-100 z-10"
            />
            
            <motion.span
              initial={{ x: isArabic ? 100 : 100 }}
              whileHover={{ x: isArabic ? -5 : -5 }} 
              className={`absolute top-1/2 -translate-y-1/2 p-2 
                          ${isArabic ? 'right-full mr-4 text-right' : 'left-full ml-4 text-left'}
                          font-mono text-xs uppercase whitespace-nowrap 
                          bg-cyan-400 text-black font-bold border border-black/20`}
              style={{ x: isArabic ? 100 : 100 }}
              transition={{ duration: 0.3 }}
            >
              {link[isArabic ? 'nameAr' : 'nameEn']}
            </motion.span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );


  // --- MOBILE SCREEN DESIGN (Collapsible Stack) ---
  const MobilePanel = (
    <div className="fixed bottom-6 right-6 z-40 block lg:hidden">
        
      {/* Revealed Links Stack */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="absolute bottom-full right-0 mb-4 flex flex-col items-end"
            variants={staggerVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {SOCIAL_LINKS.map((link, index) => (
              // Individual link is wrapped in motion.div for stagger
              <motion.div key={link.nameEn} variants={itemVariants}> 
                <MobileLink link={link} index={index} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button (Always Visible) */}
      <motion.button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        // Main button styling: sharp, prominent
        className={`relative flex items-center justify-center w-14 h-14 font-mono font-bold text-sm border-4 transition-all duration-300 
                    ${isMobileOpen 
                        ? 'bg-black text-black text-cyan-400  border-cyan-400/50 rotate-45' 
                        : 'bg-black text-cyan-400 border-cyan-400/50 hover:bg-cyan-400/10'}`
                    }
        whileHover={{ scale: 1.05 }}
      >
        {/* Animated Icon Swap */}
        <AnimatePresence mode="wait" initial={false}>
          {isMobileOpen ? (
            <motion.div key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Hash size={24} /> 
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );


  return (
    <>
      {/* Desktop/Tablet (LG) */}
      {LargeScreenPanel}

      {/* Mobile (SM/MD) */}
      {MobilePanel}
    </>
  );
}