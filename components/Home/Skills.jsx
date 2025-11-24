'use client';

import { motion } from 'framer-motion';
import {
    Cpu, Server, Database, Container, LayoutGrid,
    Lock, Cloud, Aperture, Smartphone, IterationCcw,
    Layers, Code, Shield, Globe, Terminal, Zap
} from 'lucide-react';

// Split skills into two logical rows for visual balance
const ROW_1 = [
    { name: "NEXT.JS", category: "FRAMEWORK", Icon: Cpu, color: "text-white" },
    { name: "REACT.JS", category: "LIBRARY", Icon: Code, color: "text-cyan-400" },
    { name: "TAILWIND", category: "STYLING", Icon: LayoutGrid, color: "text-teal-400" },
    { name: "TYPESCRIPT", category: "LANGUAGE", Icon: Terminal, color: "text-blue-400" },
    { name: "REACT NATIVE", category: "MOBILE", Icon: Smartphone, color: "text-purple-400" },
    { name: "FRAMER", category: "ANIMATION", Icon: Zap, color: "text-yellow-400" },
];

const ROW_2 = [
    { name: "NODE.JS", category: "RUNTIME", Icon: Server, color: "text-green-500" },
    { name: "MONGODB", category: "DATABASE", Icon: Database, color: "text-green-400" },
    { name: "DOCKER", category: "DEVOPS", Icon: Container, color: "text-blue-500" },
    { name: "AWS", category: "CLOUD", Icon: Cloud, color: "text-orange-400" },
    { name: "SECURITY", category: "AUTH", Icon: Lock, color: "text-red-400" },
    { name: "CI/CD", category: "PIPELINE", Icon: IterationCcw, color: "text-indigo-400" },
];

const SkillCard = ({ skill }) => (
    <div className="group relative mx-4">
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card Content */}
        <div className="relative flex items-center gap-6 px-8 py-6 bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-400/50 transition-colors duration-300 min-w-[280px]">

            {/* Icon Container */}
            <div className={`p-3 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 ${skill.color}`}>
                <skill.Icon size={40} strokeWidth={1.5} />
            </div>

            {/* Text Info */}
            <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                    {skill.name}
                </span>
                <span className="text-xs font-mono text-gray-500 tracking-widest uppercase">
                    {skill.category}
                </span>
            </div>

            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>
        </div>
    </div>
);

const MarqueeRow = ({ items, direction = "left", speed = 50 }) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap py-4 mask-linear-fade">
            <motion.div
                className="flex"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"]
                }}
                transition={{
                    duration: speed,
                    ease: "linear",
                    repeat: Infinity,
                }}
            >
                {[...items, ...items, ...items, ...items].map((skill, idx) => (
                    <SkillCard key={`${skill.name}-${idx}`} skill={skill} />
                ))}
            </motion.div>
        </div>
    );
};

export default function Skills() {
    return (
        <section className="min-h-[60vh] bg-[#050505] py-24 relative overflow-hidden flex flex-col justify-center">

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.03),transparent_70%)]" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 w-full mb-16 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="h-[1px] w-12 bg-cyan-400" />
                    <span className="font-mono text-cyan-400 text-sm tracking-widest">TECHNICAL_ARSENAL</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
                    Full Stack <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">
                        Capabilities
                    </span>
                </h2>
            </div>

            {/* Marquee Rows */}
            <div className="relative z-10 space-y-8">
                <MarqueeRow items={ROW_1} direction="left" speed={40} />
                <MarqueeRow items={ROW_2} direction="right" speed={45} />
            </div>

            {/* Gradient Overlay for Smooth Fade Edges */}
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

        </section>
    );
}