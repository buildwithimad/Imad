'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [isFocused, setIsFocused] = useState(null);
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('kimad1728@gmail.com');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const socialLinks = [
        { name: "GITHUB", url: "#", id: "GH-01" },
        { name: "LINKEDIN", url: "#", id: "LI-02" },
        { name: "TWITTER", url: "#", id: "X-03" },
        { name: "INSTAGRAM", url: "#", id: "IG-04" }
    ];

    return (
        <section className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 relative flex flex-col justify-between" id="contact">

            {/* Background Grid */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">

                {/* Header */}
                <div className="mb-16 border-b border-white/20 pb-8">

                    <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
                        Start a <br /> Project
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* LEFT: Contact Info & Socials */}
                    <div className="flex flex-col justify-between">

                        {/* The Email Interaction */}
                        <div className="mb-12">
                            <p className="font-mono text-xs text-gray-500 mb-4">DIRECT_FEED_CHANNEL</p>
                            <div className="relative group inline-block">
                                <h3
                                    onClick={handleCopy}
                                    className="text-3xl md:text-5xl font-bold cursor-pointer hover:text-cyan-400 transition-colors duration-300"
                                >
                                    kimad1728@gmail.com
                                </h3>

                                {/* Copy Feedback Tooltip */}
                                <AnimatePresence>
                                    {isCopied && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute -right-4 top-0 translate-x-full bg-cyan-400 text-black text-xs font-bold px-2 py-1 uppercase"
                                        >
                                            Copied!
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Underline Hover Effect */}
                                <div className="w-full h-0.5 bg-white/20 mt-2 group-hover:bg-cyan-400 transition-colors duration-300"></div>
                            </div>
                        </div>

                        {/* Social Network Grid */}
                        <div>
                            <p className="font-mono text-xs text-gray-500 mb-6">ESTABLISH_CONNECTION</p>
                            <div className="grid grid-cols-2 gap-4">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.url}
                                        className="border border-white/20 p-4 hover:bg-white hover:text-black transition-all duration-300 group relative overflow-hidden"
                                    >
                                        <div className="flex justify-between items-start relative z-10">
                                            <span className="font-bold text-sm tracking-wider">{link.name}</span>
                                            <svg className="w-3 h-3 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17"></path></svg>
                                        </div>
                                        <span className="font-mono text-[10px] text-gray-500 group-hover:text-black/60 mt-2 block relative z-10">{link.id}</span>

                                        {/* Hover Fill Effect */}
                                        <div className="absolute inset-0 bg-white transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out -z-0"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: The "Terminal" Form */}
                    <div className="bg-white/5 border border-white/10 p-8 md:p-12 backdrop-blur-sm">
                        <form className="space-y-12">

                            {/* Name Input */}
                            <div className="relative">
                                <label className={`absolute left-0 -top-6 font-mono text-xs transition-colors duration-300 ${isFocused === 'name' ? 'text-cyan-400' : 'text-gray-500'}`}>
                                    01 // ENTER NAME
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    onFocus={() => setIsFocused('name')}
                                    onBlur={() => setIsFocused(null)}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl font-bold text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300 placeholder-transparent"
                                    placeholder="John Doe"
                                    autoComplete="off"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="relative">
                                <label className={`absolute left-0 -top-6 font-mono text-xs transition-colors duration-300 ${isFocused === 'email' ? 'text-cyan-400' : 'text-gray-500'}`}>
                                    02 // ENTER EMAIL
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onFocus={() => setIsFocused('email')}
                                    onBlur={() => setIsFocused(null)}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl font-bold text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300 placeholder-transparent"
                                    placeholder="john@example.com"
                                    autoComplete="off"
                                />
                            </div>

                            {/* Message Input */}
                            <div className="relative">
                                <label className={`absolute left-0 -top-6 font-mono text-xs transition-colors duration-300 ${isFocused === 'message' ? 'text-cyan-400' : 'text-gray-500'}`}>
                                    03 // PROJECT DETAILS
                                </label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    onFocus={() => setIsFocused('message')}
                                    onBlur={() => setIsFocused(null)}
                                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl font-medium text-white focus:outline-none focus:border-cyan-400 transition-colors duration-300 placeholder-transparent resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-white text-black font-black uppercase tracking-widest py-6 border border-white hover:bg-transparent hover:text-white hover:border-cyan-400 transition-all duration-300 group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    Transmit Message
                                    <span className="w-2 h-2 bg-black group-hover:bg-cyan-400 transition-colors"></span>
                                </span>
                            </button>

                        </form>
                    </div>

                </div>
            </div>



        </section>
    );
}