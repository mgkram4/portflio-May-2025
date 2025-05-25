"use client";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef } from 'react';

// Define an interface for the project prop
interface Project {
  title: string;
  shortDescription: string;
  imageUrl?: string;
  videoUrl?: string;
  detailedDescription: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  paperUrl?: string;
  category?: string;
  featured?: boolean;
}

interface EnhancedProjectCardProps {
  project: Project;
  index: number;
}

// Icon components
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const ExternalLinkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2zM12 3v6h6"></path>
  </svg>
);

const StarIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function EnhancedProjectCard({ project, index }: EnhancedProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values for advanced interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth interactions
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), {
    stiffness: 300,
    damping: 30
  });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((event.clientX - centerX) / (rect.width / 2));
    mouseY.set((event.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1 + 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const techStackVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1 + 0.8 + i * 0.05,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="group relative h-[500px] perspective-1000"
    >
      {/* Featured badge */}
      {project.featured && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 + 0.8 }}
          className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg"
        >
          <StarIcon className="w-4 h-4 text-white" />
        </motion.div>
      )}

      {/* Main card */}
      <motion.div
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        className="relative h-full bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl"
        style={{
          transform: "translateZ(50px)"
        }}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Image/Video section */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          {project.videoUrl ? (
            <iframe 
              src={project.videoUrl}
              title={project.title}
              allowFullScreen 
              className="w-full h-full object-cover"
            />
          ) : project.imageUrl ? (
            <div className="relative w-full h-full">
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
              <span className="text-gray-400 text-lg">No Preview</span>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-full border border-white/20">
              {project.category?.toUpperCase() || 'PROJECT'}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          <motion.h3 
            className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-300 text-sm leading-relaxed line-clamp-3"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.shortDescription}
          </motion.p>
          
          {/* Tech stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech, i) => (
                <motion.span
                  key={tech}
                  custom={i}
                  variants={techStackVariants}
                  initial="hidden"
                  animate="visible"
                  className="px-2 py-1 bg-gradient-to-r from-gray-700/50 to-gray-600/50 text-gray-300 text-xs rounded-md border border-gray-600/30 backdrop-blur-sm hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 bg-gray-700/30 text-gray-400 text-xs rounded-md">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Hover overlay */}
        <motion.div 
          variants={overlayVariants}
          initial="hidden"
          whileHover="visible"
          className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: "translateZ(30px)" }}
        >
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {project.title}
          </h3>
          
          <div className="flex-1 space-y-3 text-sm overflow-y-auto">
            <div>
              <span className="text-purple-400 font-semibold">Situation:</span>
              <p className="text-gray-300 mt-1">{project.detailedDescription.situation}</p>
            </div>
            <div>
              <span className="text-blue-400 font-semibold">Task:</span>
              <p className="text-gray-300 mt-1">{project.detailedDescription.task}</p>
            </div>
            <div>
              <span className="text-cyan-400 font-semibold">Action:</span>
              <p className="text-gray-300 mt-1">{project.detailedDescription.action}</p>
            </div>
            <div>
              <span className="text-green-400 font-semibold">Result:</span>
              <p className="text-gray-300 mt-1">{project.detailedDescription.result}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-700">
            {project.githubUrl && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200"
                >
                  <GitHubIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Code</span>
                </Link>
              </motion.div>
            )}
            
            {project.liveDemoUrl && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={project.liveDemoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg transition-all duration-200"
                >
                  <ExternalLinkIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Demo</span>
                </Link>
              </motion.div>
            )}
            
            {project.paperUrl && (
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  href={project.paperUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-lg transition-all duration-200"
                >
                  <DocumentIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Paper</span>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 