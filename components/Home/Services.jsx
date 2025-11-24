'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Layers, Zap, Code, Terminal, Shield, Cpu, Globe, Database } from 'lucide-react';

const servicesData = [
    {
        id: "01",
        title: "FULL-STACK ARCHITECTURE",
        category: "System Design",
        icon: Layers,
        description: "End-to-end development of scalable web applications using MERN & Next.js. From database modeling to frontend implementation.",
        features: ["API Design (REST/GraphQL)", "Database Schema (SQL/NoSQL)", "Microservices Architecture"],
        visual: Code
    },
    {
        id: "02",
        title: "SAAS & DASHBOARDS",
        category: "Product Development",
        icon: Database,
        description: "Building sophisticated multi-tenant SaaS platforms with advanced analytics, RBAC, and real-time data visualization.",
        features: ["Role-Based Access Control", "Real-Time Data Feeds", "Custom Reporting Modules"],
        visual: Globe
    },
    {
        id: "03",
        title: "PERFORMANCE OPTIMIZATION",
        category: "DevOps & Speed",
        icon: Zap,
        description: "Enhancing application speed, reducing load times, and establishing robust CI/CD pipelines for automated releases.",
        features: ["CI/CD Pipelines", "AWS Infrastructure", "Query Optimization"],
        visual: Cpu
    },
];

export default function Services() {
    const [activeService, setActiveService] = useState(servicesData[0]);
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

    return (
        <section id="services" ref={containerRef} className="relative bg-[#0a0a0a] text-white min-h-[250vh]">

            {/* Sticky Zoom Header */}
            <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center z-10 pointer-events-none">
                <motion.div
                    style={{ scale, opacity }}
                    className="text-[15vw] font-black uppercase tracking-tighter text-white mix-blend-difference leading-none"
                >
                    SERVICES
                </motion.div>
            </div>

            {/* Main Content - Appears after zoom */}
            <motion.div
                style={{ opacity: contentOpacity, y: contentY }}
                className="relative z-20 max-w-7xl mx-auto px-4 -mt-[50vh] pb-24"
            >
                {/* Background Grid Lines */}
                <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto border-x border-white/10 hidden md:block">
                    <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/10"></div>
                    <div className="absolute right-1/3 top-0 bottom-0 w-px bg-white/10"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 relative z-10 bg-[#0a0a0a]/80 backdrop-blur-sm pt-12">

                    {/* LEFT COLUMN: Service Index */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-12 border-b border-white/20 pb-4">
                            <h2 className="text-sm font-mono text-gray-400 tracking-widest uppercase mb-2">// CAPABILITIES</h2>
                            <h3 className="text-4xl font-bold uppercase tracking-tight">Service Protocols</h3>
                        </div>

                        <div className="flex flex-col">
                            {servicesData.map((service) => (
                                <div
                                    key={service.id}
                                    onMouseEnter={() => setActiveService(service)}
                                    className={`group relative border-t border-white/20 transition-colors duration-200 ${activeService.id === service.id ? 'bg-white/5' : 'hover:bg-white/5'
                                        }`}
                                >
                                    {/* Active Indicator Line */}
                                    <div
                                        className={`absolute left-0 top-0 bottom-0 w-1 bg-cyan-400 transition-transform duration-300 origin-top ${activeService.id === service.id ? 'scale-y-100' : 'scale-y-0'
                                            }`}
                                    />

                                    {/* Header Section */}
                                    <div className="flex items-baseline justify-between px-6 py-8 cursor-pointer relative z-10">
                                        <div className="flex items-center gap-4">
                                            <span className={`font-mono text-sm transition-colors ${activeService.id === service.id ? 'text-cyan-400' : 'text-gray-500'}`}>
                                                {service.id}
                                            </span>
                                            <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                                                {service.title}
                                            </h4>
                                        </div>
                                        <service.icon size={20} className={`hidden md:block transition-colors ${activeService.id === service.id ? 'text-cyan-400' : 'text-gray-600'}`} />
                                    </div>

                                    {/* Expanded Details - Accordion */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: activeService.id === service.id ? 'auto' : 0,
                                            opacity: activeService.id === service.id ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden bg-black/20"
                                    >
                                        <div className="px-6 pb-8 pl-12">
                                            <p className="text-gray-400 text-sm mb-6 max-w-md font-mono leading-relaxed">
                                                {service.description}
                                            </p>

                                            {/* Feature Tags */}
                                            <div className="flex flex-col gap-2">
                                                {service.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-gray-300 uppercase">
                                                        <Terminal size={12} className="text-cyan-400" />
                                                        {feature}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                            <div className="border-t border-white/20"></div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Visual Preview - Sticky */}
                    <div className="hidden lg:flex flex-col justify-center h-[80vh] sticky top-20 pl-12">

                        {/* Visual Container */}
                        <div className="relative w-full aspect-square border border-white/20 p-2 bg-white/5">
                            {/* Tech Corner Markers */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 -mt-1 -ml-1 z-20"></div>
                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 -mt-1 -mr-1 z-20"></div>
                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 -mb-1 -ml-1 z-20"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 -mb-1 -mr-1 z-20"></div>

                            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                                <AnimatePresence mode='popLayout'>
                                    <motion.div
                                        key={activeService.id}
                                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, scale: 1.1, rotate: 10 }}
                                        transition={{ duration: 0.4 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        {/* Large Abstract Icon Representation */}
                                        <activeService.visual size={200} strokeWidth={0.5} className="text-white/10 absolute" />
                                        <activeService.visual size={100} strokeWidth={1} className="text-cyan-400 relative z-10 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Scanline Overlay */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none mix-blend-overlay"></div>
                            </div>
                        </div>

                        {/* Metadata Footer */}
                        <div className="mt-6 flex justify-between items-end font-mono text-xs uppercase tracking-wider">
                            <div>
                                <p className="text-gray-500">Service Category</p>
                                <p className="text-white text-lg">{activeService.category}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500">Status</p>
                                <p className="text-cyan-400 animate-pulse">AVAILABLE</p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </section>
    );
}