"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import HeroThreeBackground from './HeroThreeBackground';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 text-gray-800 dark:text-white overflow-hidden">
      <HeroThreeBackground />
      
      <motion.div 
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Jane Doe
        </motion.h1>
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl mb-8"
        >
          Full-Stack ML Engineer
        </motion.p>
        <motion.p 
          variants={itemVariants}
          className="text-lg text-gray-200 dark:text-gray-300 mb-12 max-w-2xl"
        >
          Building intelligent applications from model to frontend.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link href="/projects">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
            >
              View My Work
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
} 