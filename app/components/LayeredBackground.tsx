"use client";

import { motion } from 'framer-motion';

const LayeredBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Dynamic theme-aware base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-base-secondary to-base-primary" />

      {/* Animated gradient orbs - theme aware */}
      <motion.div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-blob"
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
        className="absolute -bottom-80 -right-40 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl animation-delay-2000 animate-blob"
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
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl animation-delay-4000 animate-blob"
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -20, 20, 0],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 25,
        }}
      />

      {/* Grid overlay - theme aware */}
      <svg className="absolute inset-0 w-full h-full opacity-[var(--grid-opacity)] dark:opacity-30 light:opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path 
              d="M 40 0 L 0 0 0 40" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              className="text-glass-muted/20"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Noise texture - theme aware */}
      <div
        className="absolute inset-0 opacity-[var(--noise-opacity)] mix-blend-soft-light noise-overlay"
        style={{ backgroundImage: "url(/noise.svg)" }}
      />
    </div>
  );
};

export default LayeredBackground; 