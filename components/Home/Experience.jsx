'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experienceData = [
  {
    id: 1,
    title: "Full Stack Web Developer",
    company: "Creativemark | Riyadh, KSA",
    dates: "08/2025 - Present",
    keyStack: ["Next.js", "Node.js", "MongoDB", "Docker"],
    responsibilities: [
      "Built scalable dashboards using Next.js, Node.js, and MongoDB for 1K+ active users.",
      "Implemented JWT-based authentication and optimized MongoDB queries, reducing API response time by 25%.",
      "Automated deployments using Docker and GitHub Actions, significantly improving release cycle efficiency."
    ]
  },
  {
    id: 2,
    title: "Full Stack Web Developer",
    company: "Eccentric Technologies | Riyadh, KSA",
    dates: "08/2022 - 11/2024",
    keyStack: ["React.js", "Node.js", "Express", "Docker"],
    responsibilities: [
      "Developed web apps using React.js / Next.js, improving page load speed by 20%.",
      "Integrated REST APIs with Node.js & Express, increasing data reliability with 99% uptime.",
      "Used Docker, reducing deployment issues and manual errors by 30%.",
      "Built Tailwind CSS UI components, speeding up UI development by 35%."
    ]
  },
  {
    id: 3,
    title: "Full Stack Web Developer",
    company: "Mazhar Enterprises | Peshawar, PK",
    dates: "02/2020 - 06/2022",
    keyStack: ["React.js", "Node.js", "MongoDB", "Tailwind"],
    responsibilities: [
      "Delivered 10+ production-level web apps (React.js / Next.js) increasing user engagement by 30%.",
      "Built secure REST APIs using Node.js + MongoDB, maintaining 99.9% system uptime.",
      "Implemented code splitting & lazy loading, improving loading speed by 30%.",
      "Designed responsive UI with Tailwind CSS, reducing redesign revisions by 25%."
    ]
  }
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Zoom Effect Transforms
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.8, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.3, 0.4], [100, 0]);


  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="experience" ref={containerRef} className="relative bg-[#0a0a0a] text-white min-h-[250vh]">

      {/* Sticky Zoom Header */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          style={{ scale, opacity }}
          className="text-[15vw] font-black uppercase tracking-tighter text-white mix-blend-difference leading-none"
        >
          EXPERIENCE
        </motion.div>
      </div>

      {/* Main Content - Appears after zoom */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-20 max-w-4xl mx-auto px-4 -mt-[50vh] pb-24"
      >

        {/* Background Grid Lines (Vertical) */}
        <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto border-x border-white/10 hidden md:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
        </div>

        {/* Header Section */}
        <div className="mb-16 border-b border-white/20 pb-4 relative bg-[#0a0a0a]/80 backdrop-blur-sm">
          <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-2">// EXPERIENCE LOG</h2>
          <h3 className="text-5xl font-black uppercase tracking-tight">Career Data</h3>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">

          {/* Main Vertical Timeline Bar (The Data Feed Line) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 transform -translate-x-1/2"></div>

          {experienceData.map((job) => (
            <motion.div
              key={job.id}
              className="mb-12 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >

              {/* Timeline Marker (Sharp Square) */}
              <div className="absolute left-4 md:left-1/2 top-0 h-4 w-4 bg-cyan-400 transform -translate-x-1/2 -ml-2 border border-white z-20"></div>

              {/* Job Entry Container */}
              <div className={`pl-12 md:pl-0 ${job.id % 2 === 0 ? 'md:text-left md:pr-4' : 'md:text-right md:pl-4'}`}>

                {/* Title & Dates */}
                <div className={`flex flex-col mb-4 cursor-pointer ${job.id % 2 !== 0 ? 'md:items-end' : 'md:items-start'}`} onClick={() => toggleAccordion(job.id)}>
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-wider mb-1">{job.dates}</span>
                  <h4 className="text-3xl font-bold uppercase text-white hover:text-cyan-400 transition-colors duration-200">
                    {job.title}
                  </h4>
                  <p className="font-mono text-sm text-gray-400">{job.company}</p>
                </div>

                {/* Accordion Content */}
                <motion.div
                  initial={false}
                  animate={{ height: expandedId === job.id ? 'auto' : 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden bg-black/30 border border-white/10"
                >
                  <div className={`p-6 ${job.id % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>

                    {/* Key Stack Tags */}
                    <div className={`mb-4 flex gap-2 flex-wrap ${job.id % 2 !== 0 ? 'md:justify-end' : 'md:justify-start'}`}>
                      {job.keyStack.map((tech) => (
                        <span key={tech} className="text-xs font-bold border border-cyan-400 px-2 py-1 uppercase text-white">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Responsibilities List - Clean and Structured */}
                    <ul className={`text-sm text-gray-300 space-y-2 ${job.id % 2 !== 0 ? 'md:list-disc md:pl-5' : 'md:list-disc md:pl-5'}`}>
                      {job.responsibilities.map((res, index) => (
                        <li key={index} className="pl-2 border-l-2 border-white/20 hover:border-cyan-400 transition-colors duration-200">
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center border-t border-white/20 pt-8">
          <p className="font-mono text-xs text-gray-500 mb-4">END OF LOG_FILE_001</p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-cyan-400 text-white font-bold uppercase tracking-wider inline-block transition-colors hover:bg-cyan-400 hover:text-black"
          >
            Download Resume [PDF]
          </motion.a>
        </div>

      </motion.div>
    </section>
  );
}