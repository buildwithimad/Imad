"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const ScrollSection = ({ title, text, image, delay = 0, className = "" }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay } }
  };

  return (
    <section ref={ref} className={`w-full max-w-5xl mx-auto py-20 ${className}`}>
      <motion.h2
        variants={variants}
        initial="hidden"
        animate={controls}
        className="text-4xl font-semibold text-gray-900 mb-6"
      >
        {title}
      </motion.h2>
      <motion.p
        variants={variants}
        initial="hidden"
        animate={controls}
        className="text-lg text-gray-600 mb-8"
      >
        {text}
      </motion.p>
      {image && (
        <motion.div
          variants={variants}
          initial="hidden"
          animate={controls}
          className="mt-8"
        >
          {image}
        </motion.div>
      )}
    </section>
  );
};

export default ScrollSection;