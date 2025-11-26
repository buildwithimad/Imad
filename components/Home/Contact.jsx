'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Contact() {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [focusedField, setFocusedField] = useState(null);
    const [isCopied, setIsCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const pathname = usePathname();
    const isArabic = pathname?.startsWith("/ar");

    const handleCopy = () => {
        navigator.clipboard.writeText('kimad1728@gmail.com');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

   // REMOVE : React.FormEvent from the parameter
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');
    
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formState),
            });
    
            if (response.ok) {
                setSuccessMessage(isArabic ? 'تم استلام البيانات' : 'DATA TRANSMITTED SUCCESSFULLY');
                setFormState({ name: '', email: '', message: '' });
            } else {
                setErrorMessage(isArabic ? 'خطأ في الإرسال' : 'TRANSMISSION ERROR');
            }
        } catch (error) {
            setErrorMessage(isArabic ? 'خطأ في النظام' : 'SYSTEM ERROR');
        } finally {
            setIsLoading(false);
        }
    };

    const socialLinks = [
        { name: "GITHUB", url: "https://github.com/ImaadDev", id: "SYS_01" },
        { name: "LINKEDIN", url: "https://www.linkedin.com/in/imad-hussain-khan-76388b305", id: "NET_02" },
        { name: "FACEBOOK", url: "https://www.facebook.com/imad.hussain.khan.2025", id: "COM_03" },
        { name: "INSTAGRAM", url: "https://www.instagram.com/imaddeveloper?igsh=bXJ4MXB4bmo2djAy", id: "IMG_04" }
    ];

    return (
        <section className="min-h-screen bg-[#050505] text-white pt-20 pb-20 relative flex flex-col" id="contact">
            
            {/* 1. Section Header / Status Bar */}
            <div className="border-y border-zinc-800 bg-[#050505] relative z-10">
                <div className="max-w-[1800px] mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-cyan-500 animate-pulse"></div>
                        <span className="font-mono text-xs tracking-widest text-zinc-500">
                            {isArabic ? "النظام جاهز" : "SYSTEM_ONLINE // READY_TO_CONNECT"}
                        </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-600 hidden md:block">
                        SECURE_CHANNEL_V.2.0
                    </span>
                </div>
            </div>

            <div className="max-w-[1800px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 border-b border-zinc-800 min-h-[80vh]">
                
                {/* 2. LEFT COLUMN: Typography & Contact Info (5 cols) */}
                <div className="lg:col-span-5 border-r border-zinc-800 p-8 md:p-16 flex flex-col justify-between relative overflow-hidden group">
                    
                    {/* Background Interaction */}
                    <div className="absolute inset-0 bg-zinc-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out z-0"></div>

                    <div className="relative z-10">
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                            {isArabic ? "لنبدأ" : "LET'S"}<br />
                            <span className="text-transparent stroke-text-white hover:text-cyan-400 transition-colors duration-500">
                                {isArabic ? "العمل" : "BUILD"}
                            </span>
                        </h2>
                        <p className="font-mono text-sm text-zinc-400 max-w-xs leading-relaxed">
                            {isArabic 
                                ? "هل لديك فكرة معقدة؟ أنا متخصص في تحويل المفاهيم المجردة إلى كود عالي الأداء." 
                                : "Have a complex idea? I specialize in turning abstract concepts into high-performance code."}
                        </p>
                    </div>

                    <div className="relative z-10 mt-12 space-y-12">
                        {/* Email Block */}
                        <div>
                            <div className="font-mono text-[10px] text-cyan-500 mb-2 tracking-widest">
                                {isArabic ? "البريد الإلكتروني" : "TARGET_ADDRESS"}
                            </div>
                            <div 
                                onClick={handleCopy}
                                className="text-xl md:text-3xl font-bold cursor-pointer hover:opacity-50 transition-opacity flex items-center gap-3"
                            >
                                <span>kimad1728@gmail.com</span>
                                {isCopied && <span className="text-xs font-mono bg-cyan-500 text-black px-1">COPIED</span>}
                            </div>
                        </div>

                        {/* Social Grid */}
                        <div className="grid grid-cols-2 gap-px bg-zinc-800 border border-zinc-800">
                            {socialLinks.map((link) => (
                                <a 
                                    key={link.name} 
                                    href={link.url}
                                    className="bg-[#050505] p-4 hover:bg-white hover:text-black transition-colors duration-300 group/link"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-mono text-zinc-600 group-hover/link:text-black/50">{link.id}</span>
                                        <span className="text-xl group-hover/link:rotate-45 transition-transform duration-300">↗</span>
                                    </div>
                                    <div className="font-bold text-sm tracking-wider">{link.name}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. RIGHT COLUMN: The Terminal Form (7 cols) */}
                <div className="lg:col-span-7 bg-[#080808] relative">
                    
                    {/* Decorative Corner Marks */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-l border-t border-cyan-500/50"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r border-b border-cyan-500/50"></div>

                    <form onSubmit={handleSubmit} className="h-full flex flex-col">
                        
                        {/* Feedback Messages */}
                        <AnimatePresence>
                            {(successMessage || errorMessage) && (
                                <motion.div 
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className={`px-8 py-4 font-mono text-xs uppercase border-b border-zinc-800 ${successMessage ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}
                                >
                                    <span className="mr-4">STATUS_UPDATE:</span>
                                    {successMessage || errorMessage}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* INPUT 01: Name */}
                        <div className={`flex-1 border-b border-zinc-800 transition-colors duration-500 ${focusedField === 'name' ? 'bg-[#0a0a0a]' : ''}`}>
                            <div className="p-8 md:p-12 h-full flex flex-col justify-center relative group">
                                <label className={`font-mono text-xs uppercase mb-4 block transition-colors ${focusedField === 'name' ? 'text-cyan-400' : 'text-zinc-500'}`}>
                                    01 // {isArabic ? "الاسم" : "IDENTITY"}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formState.name}
                                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={isArabic ? "اسمك الكامل..." : "ENTER_FULL_NAME_"}
                                    className="w-full bg-transparent text-2xl md:text-4xl font-bold placeholder-zinc-800 text-white outline-none"
                                />
                                {/* Active Indicator Line */}
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ${focusedField === 'name' ? 'w-full' : 'w-0'}`}></div>
                            </div>
                        </div>

                        {/* INPUT 02: Email */}
                        <div className={`flex-1 border-b border-zinc-800 transition-colors duration-500 ${focusedField === 'email' ? 'bg-[#0a0a0a]' : ''}`}>
                            <div className="p-8 md:p-12 h-full flex flex-col justify-center relative group">
                                <label className={`font-mono text-xs uppercase mb-4 block transition-colors ${focusedField === 'email' ? 'text-cyan-400' : 'text-zinc-500'}`}>
                                    02 // {isArabic ? "البريد الإلكتروني" : "COORDINATES"}
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={isArabic ? "بريدك الإلكتروني..." : "ENTER_EMAIL_ADDRESS_"}
                                    className="w-full bg-transparent text-2xl md:text-4xl font-bold placeholder-zinc-800 text-white outline-none"
                                />
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ${focusedField === 'email' ? 'w-full' : 'w-0'}`}></div>
                            </div>
                        </div>

                        {/* INPUT 03: Message */}
                        <div className={`flex-[1.5] border-b border-zinc-800 transition-colors duration-500 ${focusedField === 'message' ? 'bg-[#0a0a0a]' : ''}`}>
                            <div className="p-8 md:p-12 h-full flex flex-col relative group">
                                <label className={`font-mono text-xs uppercase mb-4 block transition-colors ${focusedField === 'message' ? 'text-cyan-400' : 'text-zinc-500'}`}>
                                    03 // {isArabic ? "الرسالة" : "TRANSMISSION_DATA"}
                                </label>
                                <textarea
                                    required
                                    value={formState.message}
                                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder={isArabic ? "أكتب رسالتك هنا..." : "INPUT_MESSAGE_CONTENT..."}
                                    className="w-full h-full bg-transparent text-xl md:text-2xl font-medium placeholder-zinc-800 text-white outline-none resize-none leading-relaxed"
                                />
                                <div className={`absolute bottom-0 left-0 h-[2px] bg-cyan-400 transition-all duration-300 ${focusedField === 'message' ? 'w-full' : 'w-0'}`}></div>
                            </div>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="py-8 md:py-10 bg-white text-black font-black text-xl tracking-widest hover:bg-cyan-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading 
                                ? (isArabic ? "جاري المعالجة..." : "PROCESSING_REQUEST...") 
                                : (isArabic ? "إرسال" : "INITIALIZE_SEND")}
                        </button>
                    </form>
                </div>
            </div>
            
            {/* Custom Stroke Text Style */}
            <style jsx>{`
                .stroke-text-white {
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.3);
                }
                .stroke-text-white:hover {
                    -webkit-text-stroke: 0px;
                }
            `}</style>
        </section>
    );
}