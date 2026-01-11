'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Facebook,  } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const BottomHUD = () => {
  const socials = [
    { Icon: Github, href: "https://github.com/buildwithimad", label: "GH" },
    { Icon: Linkedin, href: "https://linkedin.com/in/imad-hussain-khan-76388b305", label: "LN" },
    { Icon: Instagram, href: "https://instagram.com/devnexstudio", label: "IG" },
    { Icon: Facebook, href: "https://facebook.com/devnexstudio", label: "FB" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none p-6 md:p-10 flex justify-between items-end">
      
      {/* 1. LEFT SIDE: SOCIAL STACK */}
      <div className="flex flex-col gap-6 pointer-events-auto">
        <div className="flex flex-col gap-6 items-center">
          {socials.map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (i * 0.1), duration: 0.8 }}
              className="group relative"
            >
              <social.Icon 
                size={18} 
                className="text-zinc-500 group-hover:text-white transition-colors duration-500" 
                strokeWidth={1.5}
              />
              {/* Tooltip on hover */}
              <span className="absolute left-10 top-1/2 -translate-y-1/2 text-[9px] font-mono tracking-widest text-white opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>
        {/* Architectural vertical line */}
        <motion.div 
           initial={{ height: 0 }} 
           animate={{ height: 40 }} 
           className="w-px bg-zinc-800"
           transition={{ delay: 1, duration: 1 }}
        />
      </div>

      {/* 2. RIGHT SIDE: MAGNETIC WHATSAPP */}
      <motion.div 
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 15, delay: 1.2 }}
        className="pointer-events-auto"
      >
        <a 
          href="https://wa.me/966573672733" // Replace with your number
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16"
        >
          {/* Pulsing Ring */}
          <div className="absolute inset-0 rounded-full border border-green-500/20 group-hover:scale-125 group-hover:opacity-0 transition-all duration-1000" />
          
          {/* Main Button */}
          <div className="absolute inset-0 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-green-600 group-hover:border-green-600 transition-all duration-500">
            <FaWhatsapp 
              size={24} 
              className="text-green-500 group-hover:text-white transition-colors duration-500" 
              strokeWidth={1.5}
            />
          </div>

          {/* Label that slides out */}
          <span className="absolute right-20 text-[10px] font-bold tracking-[0.3em] text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-500 whitespace-nowrap hidden md:block">
            WHATSAPP
          </span>
        </a>
      </motion.div>

    </div>
  );
};

export default BottomHUD;