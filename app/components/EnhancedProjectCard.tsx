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
          className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-primary to-accent rounded-full p-2 shadow-lg"
        >
          <StarIcon className="w-4 h-4 text-primary-foreground" />
        </motion.div>
      )}

      {/* Main card */}
      <motion.div
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
        className="relative h-full bg-gradient-to-br from-card/80 to-card/70 backdrop-blur-xl border border-border rounded-2xl overflow-hidden shadow-2xl"
        style={{
          transform: "translateZ(50px)"
        }}
      >
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
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
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
              <span className="text-muted-foreground text-lg">No Preview</span>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-background/50 backdrop-blur-sm text-foreground text-xs font-medium rounded-full border border-border">
              {project.category?.toUpperCase() || 'PROJECT'}
            </span>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          <motion.h3 
            className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300"
            style={{ transform: "translateZ(20px)" }}
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground text-sm leading-relaxed line-clamp-3"
            style={{ transform: "translateZ(10px)" }}
          >
            {project.shortDescription}
          </motion.p>
          
          {/* Tech stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
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
                  className="px-2 py-1 bg-gradient-to-r from-muted/50 to-card/50 text-muted-foreground text-xs rounded-md border border-border backdrop-blur-sm hover:from-primary/30 hover:to-accent/30 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="flex items-center justify-end space-x-3">
            {project.githubUrl && (
              <ActionButton 
                href={project.githubUrl} 
                icon={GitHubIcon}
                label="GitHub"
              />
            )}
            {project.liveDemoUrl && (
              <ActionButton 
                href={project.liveDemoUrl} 
                icon={ExternalLinkIcon}
                label="Demo"
                isPrimary
              />
            )}
            {project.paperUrl && (
              <ActionButton 
                href={project.paperUrl} 
                icon={DocumentIcon}
                label="Paper"
              />
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

interface ActionButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isPrimary?: boolean;
}

const ActionButton = ({ href, icon: Icon, label, isPrimary = false }: ActionButtonProps) => (
  <Link href={href} passHref>
    <motion.div
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group flex items-center justify-center space-x-2 rounded-full p-2.5 transition-all duration-300 ${
        isPrimary 
          ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50' 
          : 'bg-muted/50 text-muted-foreground backdrop-blur-sm border border-border hover:bg-muted'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-xs text-background opacity-0 transition-all group-hover:opacity-100">
        {label}
      </span>
    </motion.div>
  </Link>
); 