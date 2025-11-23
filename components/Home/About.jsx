'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

// Animation Variants
const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const reveal = {
  initial: { scaleY: 0 },
  animate: { scaleY: 1 },
  transition: { duration: 0.5, ease: "circOut" }
};

function AnimatedSection({ children, delay = 0 }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    {
      id: "01",
      title: "IDENTITY",
      subtitle: "Creative Developer",
      content: "I bridge the gap between logic and aesthetics. A full-stack developer obsessed with performance, structure, and digital architecture.",
      color: "text-cyan-400"
    },
    {
      id: "02",
      title: "STACK",
      subtitle: "The Arsenal",
      content: "React, Next.js, Three.js, WebGL. I don't just write code; I engineer performant ecosystems that scale without compromising design.",
      color: "text-purple-400"
    },
    {
      id: "03",
      title: "PHILOSOPHY",
      subtitle: "Form Follows Function",
      content: "Minimalism isn't about having less. It's about showing the essential. My approach removes the noise to let the user experience shine.",
      color: "text-emerald-400"
    },
    {
      id: "04",
      title: "CONTACT",
      subtitle: "Initiate Protocol",
      content: "Have a complex problem? I build elegant solutions. Let's align our grids and build the future of the web.",
      color: "text-orange-400"
    }
  ];

  // Auto-rotate sections
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % sections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <section className="min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col items-center justify-center relative px-4 py-20 selection:bg-white selection:text-black">
      
      {/* Background Grid Pattern - Pure CSS */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        
        {/* Header Section with decorative lines */}
        <div className="mb-12 md:mb-16 border-b border-white/20 pb-6 md:pb-8 flex flex-col md:flex-row justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 1.0,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none">
              ABOUT
            </h2>
            <motion.h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.6
              }}
            >
              MYSELF.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.8
            }}
            className="text-right mt-4 md:mt-0"
          >
            <p className="font-mono text-xs sm:text-sm text-gray-400">SYSTEM STATUS: ONLINE</p>
            <p className="font-mono text-xs sm:text-sm text-gray-400">LOCATION: WORLDWIDE</p>
          </motion.div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 border border-white/20 bg-black/50">

          {/* Left Column: Dynamic Content */}
          <div className="lg:col-span-7 p-6 sm:p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/20 relative min-h-[350px] sm:min-h-[400px] flex flex-col justify-between">
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className={`font-mono text-lg sm:text-xl ${sections[currentSection].color}`}>
                    // {sections[currentSection].id}
                  </span>
                  <span className="font-bold tracking-widest uppercase text-xs sm:text-sm border px-2 py-1 border-white/30 w-fit">
                    {sections[currentSection].title}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
                  {sections[currentSection].subtitle}
                </h3>

                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
                  {sections[currentSection].content}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Square Pagination */}
            <div className="flex space-x-0 mt-12">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSection(index)}
                  className={`h-2 flex-1 transition-all duration-300 ${
                    index === currentSection ? 'bg-white' : 'bg-white/10 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Stats & Skills */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Stats Grid */}
            <div className="grid grid-cols-2">
              {[
                { label: "PROJECTS", value: "50+" },
                { label: "EXP YRS", value: "03+" },
                { label: "CLIENTS", value: "25+" },
                { label: "COMMITS", value: "2k+" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="p-4 sm:p-6 md:p-8 border-b border-r border-white/20 last:border-r-0 even:border-r-0 hover:bg-white/5 transition-colors duration-300"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</h4>
                  <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Technical Proficiency */}
            <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
              <h4 className="font-mono text-xs sm:text-sm text-gray-500 uppercase mb-3 sm:mb-4 border-b border-white/10 pb-2">Core Competencies</h4>
              {[
                { skill: "React / Next.js", level: 95 },
                { skill: "WebGL / Three.js", level: 88 },
                { skill: "TypeScript", level: 92 }
              ].map((item, index) => (
                <div key={item.skill} className="group">
                  <div className="flex justify-between text-xs sm:text-sm mb-2 font-medium">
                    <span className="truncate mr-2">{item.skill}</span>
                    <span className="font-mono text-gray-400 flex-shrink-0">{item.level}%</span>
                  </div>
                  <div className="w-full h-3 sm:h-4 bg-white/10 relative overflow-hidden rounded-sm">
                    <motion.div
                      className="absolute top-0 left-0 h-full bg-white group-hover:bg-cyan-400 transition-colors duration-300 rounded-sm"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "circOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <motion.div
          className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center border-t border-white/20 pt-8 sm:pt-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.2
          }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.4
            }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight">Start a Collaboration</h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Available for freelance and contract work.</p>
          </motion.div>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start md:justify-end"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.6
            }}
            viewport={{ once: true }}
          >
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border border-white text-white font-bold uppercase tracking-wider transition-colors text-sm sm:text-base"
            >
              Contact Me
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#222" }}
              whileTap={{ scale: 0.98 }}
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-bold uppercase tracking-wider border border-white text-sm sm:text-base"
            >
              View Works
            </motion.button>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}