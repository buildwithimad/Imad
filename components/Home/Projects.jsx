'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Projects() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith("/ar");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
          if (data.length > 0) {
            setActiveProject(data[0]);
          }
        } else {
          // Fallback to static data if API fails
          console.warn('Failed to fetch projects from Sanity, using fallback data');
          const fallbackProjects = [
            {
              _id: '1',
              title: { en: "CREATIVEMARK ERP", ar: "إي آر بي كرياتيف مارك" },
              category: { en: "Business System", ar: "نظام أعمال" },
              year: "2025",
              stack: ["Next.js", "Node.js", "MongoDB"],
              description: {
                en: "Multi-role ERP with dashboards for Admin, Client, Employee, and Partner. Automated workflows for payments and verification, increasing efficiency by 35%.",
                ar: "نظام تخطيط موارد المؤسسات متعدد الأدوار مع لوحات تحكم للمسؤول، العميل، الموظف، والشريك. سير عمل آلي للمدفوعات والتحقق، مما زاد الكفاءة بنسبة 35%."
              },
              image: { asset: { url: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=2080&auto=format&fit=crop" } },
              links: { github: "#", live: "#" },
              order: 1
            },
            {
              _id: '2',
              title: { en: "SAAS DASHBOARD", ar: "لوحة تحكم SaaS" },
              category: { en: "Analytics / SaaS", ar: "تحليلات / SaaS" },
              year: "2024",
              stack: ["React.js", "Next.js", "MongoDB"],
              description: {
                en: "Analytics dashboard with real-time data, custom reporting, and RBAC. Improved system responsiveness by 30% using code splitting.",
                ar: "لوحة تحكم تحليلية ببيانات في الوقت الفعلي، تقارير مخصصة، وتحكم في الوصول حسب الدور (RBAC). تحسين استجابة النظام بنسبة 30% باستخدام تقسيم الكود."
              },
              image: { asset: { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" } },
              links: { github: "#", live: "#" },
              order: 2
            },
            {
              _id: '3',
              title: { en: "CREATIVE DIGITAL CMS", ar: "نظام إدارة المحتوى الرقمي الإبداعي" },
              category: { en: "CMS / Website", ar: "نظام إدارة محتوى / موقع" },
              year: "2024",
              stack: ["Next.js", "Sanity", "Tailwind"],
              description: {
                en: "Modern animated website with Sanity CMS integration. Features dynamic content management and custom API endpoints for fast data delivery.",
                ar: "موقع ويب حديث متحرك مع تكامل Sanity CMS. يتميز بإدارة محتوى ديناميكية ونقاط نهاية API مخصصة لتسليم البيانات بسرعة."
              },
              image: { asset: { url: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop" } },
              links: { github: "#", live: "#" },
              order: 3
            }
          ];
          setProjects(fallbackProjects);
          setActiveProject(fallbackProjects[0]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Fallback data
        const fallbackProjects = [];
        setProjects(fallbackProjects);
        if (fallbackProjects.length > 0) {
          setActiveProject(fallbackProjects[0]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="min-h-screen bg-[#0a0a0a] text-white py-24 px-4 relative">

      {/* Background Grid Lines - Pure CSS, Lightweight */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto border-x border-white/10 hidden md:block">
        <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10"></div>
        <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0">

        {/* LEFT COLUMN: Project Index */}
        <div className="flex flex-col justify-center">
          <div className="mb-12 border-b border-white/20 pb-4">
            <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-2">
              // {isArabic ? "أعمال مختارة" : "SELECTED WORKS"}
            </h2>
            <h3 className="text-4xl font-bold uppercase tracking-tight">
              {isArabic ? "أرشيف النظام" : "System Archive"}
            </h3>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          )}

          <div className="flex flex-col">
            {!loading && projects.map((project) => (
              <div
                key={project._id}
                onMouseEnter={() => setActiveProject(project)}
                className={`group relative border-t border-white/20 transition-colors duration-200 ${activeProject?._id === project._id ? 'bg-white/5' : 'hover:bg-white/5'
                  }`}
              >
                {/* Active Indicator Line - GPU Optimized */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 transition-transform duration-300 origin-top ${activeProject?._id === project._id ? 'scale-y-100' : 'scale-y-0'
                    }`}
                />

                {/* Header Section */}
                <div className="flex items-baseline justify-between px-6 py-8 cursor-pointer relative z-10">
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-sm transition-colors ${activeProject?._id === project._id ? 'text-cyan-400' : 'text-gray-500'}`}>
                      {String(project.order).padStart(2, '0')}
                    </span>
                    <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {project.title?.[isArabic ? 'ar' : 'en'] || project.title}
                    </h4>
                  </div>
                  <span className="hidden md:block font-mono text-xs text-gray-500">{project.year}</span>
                </div>

                {/* Expanded Details - Accordion */}
                <motion.div
                  initial={false}
                  animate={{
                    height: activeProject?._id === project._id ? 'auto' : 0,
                    opacity: activeProject?._id === project._id ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden bg-black/20"
                >
                  <div className="px-6 pb-8 pl-12">
                    <p className="text-gray-400 text-sm mb-6 max-w-md font-mono leading-relaxed">
                      {project.description?.[isArabic ? 'ar' : 'en'] || project.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex gap-2 flex-wrap mb-6">
                      {project.stack?.map((tech) => (
                        <span key={tech} className="text-[10px] font-bold border border-white/20 px-2 py-1 uppercase text-gray-300">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons - Sharp & Technical */}
                    <div className="flex gap-4">
                      {project.links?.github && (
                        <a href={project.links.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold uppercase hover:bg-cyan-400 transition-colors duration-200">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                          {isArabic ? "مستودع GitHub" : "GitHub Repo"}
                        </a>
                      )}
                      {project.links?.live && (
                        <a href={project.links.live} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white text-xs font-bold uppercase hover:bg-white/10 transition-colors duration-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                          {isArabic ? "عرض حي" : "Live Demo"}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
            {!loading && <div className="border-t border-white/20"></div>}
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Preview - Sticky */}
        <div className="hidden lg:flex flex-col justify-center h-[80vh] sticky top-20 pl-12">

          {/* Image Container - Responsive Design */}
          {activeProject && (
            <div className="relative w-full border border-white/20 p-2 bg-white/5">
              {/* Tech Corner Markers (CSS only, no heavy renders) */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 -mt-1 -ml-1 z-20"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 -mt-1 -mr-1 z-20"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 -mb-1 -ml-1 z-20"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 -mb-1 -mr-1 z-20"></div>

              <div className="relative w-full overflow-hidden bg-black">
                <AnimatePresence mode='popLayout'>
                  <motion.div
                    key={activeProject._id}
                    className="relative w-full"
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={activeProject.image?.asset?.url || activeProject.image}
                      alt={activeProject.title?.[isArabic ? 'ar' : 'en'] || activeProject.title}
                      width={800}
                      height={600}
                      className="w-full h-auto"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw"
                      priority={activeProject._id === projects[0]?._id}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+IRjWjBqO6O2mhP//Z"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Scanline Overlay (Lightweight) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay"></div>
              </div>
            </div>
          )}

          {/* Metadata Footer */}
          {activeProject && (
            <div className="mt-6 flex justify-between items-end font-mono text-xs uppercase tracking-wider">
              <div>
                <p className="text-gray-500">{isArabic ? "فئة المشروع" : "Project Category"}</p>
                <p className="text-white text-lg">
                  {activeProject.category?.[isArabic ? 'ar' : 'en'] || activeProject.category}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}