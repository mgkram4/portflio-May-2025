"use client";
import { motion } from 'framer-motion';
import React from 'react';

export default function About() {
  const focusAreas = ["Machine Learning", "MLOps", "Full-Stack Development", "Cloud Infrastructure"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Slightly faster stagger
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
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-semibold text-center mb-12">About Me</motion.h2>
      <div className="max-w-4xl mx-auto md:flex md:space-x-12 items-center">
        <motion.div variants={itemVariants} className="md:w-1/3 mb-8 md:mb-0">
          {/* Placeholder for an image. Replace with actual <Image> component if an image is available */}
          <div className="w-full h-80 bg-gray-300 dark:bg-gray-700 rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-gray-500">Profile Image</span> 
            {/* Example using Next/Image if you have a public image e.g., /profile.jpg 
            <Image 
              src="/profile.jpg" 
              alt="Jane Doe" 
              width={300} 
              height={300} 
              className="rounded-xl object-cover"
            />
            */}
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="md:w-2/3">
          <motion.p variants={itemVariants} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Hi, Im Jane Doe, a passionate Full-Stack Machine Learning Engineer with [X] years of experience in designing, developing, and deploying intelligent applications. I specialize in bridging the gap between cutting-edge machine learning models and robust, scalable web services.
          </motion.p>
          <motion.p variants={itemVariants} className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            My mission is to build impactful AI-driven solutions that solve real-world problems. I thrive in dynamic environments where I can leverage my expertise in MLOps to automate workflows and ensure seamless model-to-production pipelines.
          </motion.p>
          <motion.h3 variants={itemVariants} className="text-xl font-semibold mb-4">Focus Areas:</motion.h3>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
            {focusAreas.map((area) => (
              <motion.span 
                key={area} 
                variants={itemVariants} // Individual items can also animate
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mr-2 mb-2 dark:bg-blue-900 dark:text-blue-200"
              >
                {area}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
} 