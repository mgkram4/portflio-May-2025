"use client";

import { motion } from 'framer-motion';

const LayeredBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Deep space base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0F] via-[#0F0F1A] to-[#131318]" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -30, 30, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute -bottom-80 -right-40 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl"
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 40, -40, 0],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 10,
        }}
      />

      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Noise texture */}
      {/* You will need to create a noise.svg file or use a data URI */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-soft-light"
        style={{ backgroundImage: "url(/noise.svg)" }}
      />
    </div>
  );
};

export default LayeredBackground; 