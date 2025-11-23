'use client';

import { motion } from 'framer-motion';
import BackgroundVideo from '../BgVideo';

export default function CreativeHeroVideo() {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* 1. Video Layer with "Gritty" Filters */}
      <div className="absolute inset-0 z-0 opacity-60 mix-blend-luminosity">
         {/* Note: Ensure your BackgroundVideo component accepts a className 
            to fill the parent (w-full h-full object-cover).
            The mix-blend-luminosity makes the video Black & White automatically.
         */}
        <BackgroundVideo src="https://www.pexels.com/download/video/12875143/" />
      </div>

      {/* 2. Scanline Overlay (CRT Effect) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_4px,3px_100%]"></div>

      {/* 3. Grid Overlay */}
      <div 
        className="absolute inset-0 z-10 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
      ></div>

      {/* 4. Frame / HUD UI Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none p-4 sm:p-6 md:p-12 flex flex-col justify-between">
        {/* Top Bar */}
        <div className="flex justify-between items-start font-mono text-xs sm:text-sm text-white/70">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden sm:block"
          >
            REC ● 00:00:00:01
            <br />
            ISO 800 / F 2.8
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="text-right hidden sm:block"
          >
            RAW_FOOTAGE
            <br />
            [1920 x 1080]
          </motion.div>
          {/* Mobile version - simplified */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="sm:hidden w-full text-center"
          >
            <div className="text-xs">PORTFOLIO_2024</div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="flex justify-between items-end font-mono text-xs sm:text-sm text-white/70">
           <div className="w-12 sm:w-24 h-[1px] bg-white/50"></div>
           <div className="text-center px-2">SCROLL_DOWN</div>
           <div className="w-12 sm:w-24 h-[1px] bg-white/50"></div>
        </div>
      </div>

      {/* 5. Main Content - Using Blend Modes */}
      <div className="relative z-30 flex flex-col items-center px-4 sm:px-6">

        {/* Animated Bracket Container */}
        <motion.div
          className="relative px-4 sm:px-8 py-2 sm:py-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
        >
          {/* Brackets - Responsive sizing */}
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-l-2 border-white"></div>
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-t-2 border-r-2 border-white"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-l-2 border-white"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-b-2 border-r-2 border-white"></div>

          <motion.h1
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white mix-blend-difference select-none leading-none"
          >
            PORTFOLIO
          </motion.h1>
        </motion.div>

        {/* Subtitle with Tech Decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.0,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-4"
        >
          <span className="h-[1px] w-8 sm:w-12 bg-white"></span>
          <p className="font-mono text-xs sm:text-sm md:text-base text-white tracking-widest uppercase text-center">
            Creative Developer & Designer
          </p>
          <span className="h-[1px] w-8 sm:w-12 bg-white"></span>
        </motion.div>

      </div>
    </div>
  );
}