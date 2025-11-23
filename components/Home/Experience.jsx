'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const experienceData = [
  {
    id: 1,
    title: "Senior Creative Developer",
    company: "Aether Dynamics | REMOTE",
    dates: "2023 - Present",
    keyStack: ["Next.js", "Three.js", "TypeScript", "GSAP"],
    responsibilities: [
      "Led front-end architecture development for high-performance e-commerce platforms using Next.js and server components.",
      "Engineered complex 3D interactive experiences with WebGL and Three.js, achieving 60 FPS across target devices.",
      "Mentored junior developers on best practices for performance optimization and declarative animation (Framer Motion).",
      "Streamlined deployment pipelines using Docker and CI/CD tools, reducing build times by 30%."
    ]
  },
  {
    id: 2,
    title: "Full-Stack Engineer",
    company: "Nexus Digital Agency | NYC",
    dates: "2020 - 2023",
    keyStack: ["React", "Node.js", "PostgreSQL", "AWS"],
    responsibilities: [
      "Developed and maintained RESTful APIs for client data management using Node.js/Express.",
      "Implemented responsive, component-based UIs for 15+ client projects, ensuring strict adherence to WCAG accessibility standards.",
      "Managed deployment and infrastructure on AWS (EC2, S3, RDS)."
    ]
  },
  {
    id: 3,
    title: "Front-End Developer Intern",
    company: "Quantum Labs | BOSTON",
    dates: "2019 - 2020",
    keyStack: ["HTML", "CSS", "JavaScript", "jQuery"],
    responsibilities: [
      "Assisted in refactoring legacy JavaScript applications to modern ES6 syntax.",
      "Collaborated with the design team to translate Figma mockups into pixel-perfect, responsive CSS layouts.",
      "Participated in daily stand-ups and code reviews."
    ]
  }
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState(null);

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-24 px-4 relative">
      
      {/* Background Grid Lines (Vertical) */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto border-x border-white/10 hidden md:block">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-16 border-b border-white/20 pb-4">
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

      </div>
    </section>
  );
}