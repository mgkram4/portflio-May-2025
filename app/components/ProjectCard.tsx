"use client";
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Github, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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

interface ProjectCardProps {
  project: Project;
  variants?: {
    hidden: { opacity: number; y: number; scale: number };
    visible: { opacity: number; y: number; scale: number; transition: object };
  };
  index?: number;
}

// Function to infer image based on project title/category
const getInferredImage = (project: Project): string => {
  const title = project.title.toLowerCase();
  const category = project.category?.toLowerCase() || '';
  
  // Map projects to appropriate images
  if (title.includes('pose') || title.includes('health') || title.includes('sports')) {
    return '/images/pose-analysis.svg';
  }
  if (title.includes('farm') || title.includes('agricultural') || title.includes('agriculture')) {
    return '/images/farm-vision.svg';
  }
  if (title.includes('penguinpal') || title.includes('email')) {
    return '/images/email-ai.svg';
  }
  if (title.includes('vista') || title.includes('pacific') || title.includes('financing')) {
    return '/images/finance-platform.svg';
  }
  if (title.includes('phishing') || title.includes('security')) {
    return '/images/cybersecurity.svg';
  }
  if (category === 'ai-ml') {
    return '/images/ai-ml-default.svg';
  }
  if (category === 'web-dev') {
    return '/images/web-dev-default.svg';
  }
  if (category === 'research') {
    return '/images/research-default.svg';
  }
  if (category === 'security') {
    return '/images/security-default.svg';
  }
  
  // Default fallback
  return '/images/project-default.svg';
};

const TechBadge = ({ tech }: { tech: string }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    className="px-3 py-1 bg-neutral-700/50 backdrop-blur-sm text-neutral-300 text-xs font-medium rounded-full border border-neutral-600/50 hover:bg-neutral-600/70 hover:border-neutral-500 transition-all duration-300"
  >
    {tech}
  </motion.span>
);

interface ActionButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color?: "purple" | "blue" | "green" | "orange" | "grey";
}

const ActionButton = ({ href, icon: Icon, label, color = "grey" }: ActionButtonProps) => {
  const colorClasses = {
    purple: "from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500",
    blue: "from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500",
    green: "from-green-500 to-green-600 hover:from-green-400 hover:to-green-500",
    orange: "from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500",
    grey: "from-neutral-600 to-neutral-700 hover:from-neutral-500 hover:to-neutral-600 text-neutral-100"
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${colorClasses[color]} text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
      >
        <Icon className="w-4 h-4" />
        <span className="text-sm font-medium">{label}</span>
      </Link>
    </motion.div>
  );
};

export default function ProjectCard({ project, variants, index = 0 }: ProjectCardProps) {
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  // Use inferred image if no imageUrl is provided
  const displayImage = project.imageUrl || getInferredImage(project);

  return (
    <motion.div
      variants={variants || cardVariants}
      initial="hidden"
      animate="visible"
      className="group relative min-h-[420px] max-h-[450px]"
    >
      {/* Main Card */}
      <motion.div
        className="relative h-full bg-gradient-to-br from-neutral-800/80 to-neutral-900/70 backdrop-blur-xl border border-neutral-700 rounded-3xl overflow-hidden shadow-2xl"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-neutral-600/20 via-neutral-500/20 to-neutral-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 right-4 z-20 bg-gradient-to-r from-neutral-500 to-neutral-400 rounded-full p-2 shadow-lg"
          >
            <Star className="w-4 h-4 text-white" />
          </motion.div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <motion.span 
            className="px-3 py-1 bg-neutral-800/50 backdrop-blur-sm text-neutral-200 text-xs font-medium rounded-full border border-neutral-600"
            whileHover={{ scale: 1.05 }}
          >
            {project.category?.toUpperCase() || 'PROJECT'}
          </motion.span>
        </div>

        {/* Image/Video Section */}
        <div className="relative h-40 overflow-hidden">
          {project.videoUrl ? (
            <iframe 
              src={project.videoUrl}
              title={project.title}
              allowFullScreen 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="relative w-full h-full">
              <Image 
                src={displayImage} 
                alt={project.title} 
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3 relative z-10">
          <motion.h3 
            className="text-xl font-bold text-neutral-100 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neutral-300 group-hover:to-neutral-100 group-hover:bg-clip-text transition-all duration-300 line-clamp-2"
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-neutral-400 text-sm leading-relaxed line-clamp-2"
          >
            {project.shortDescription}
          </motion.p>
          
          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-neutral-500 tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
              {project.techStack.slice(0, 4).map((tech, _) => (
                <TechBadge key={tech} tech={tech} />
              ))}
              {project.techStack.length > 4 && (
                <span className="px-3 py-1 bg-neutral-700/30 text-neutral-400 text-xs rounded-full border border-neutral-600/50">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-3">
            <div className="flex space-x-2">
              {project.githubUrl && (
                <ActionButton 
                  href={project.githubUrl} 
                  icon={Github} 
                  label="Code" 
                  color="grey"
                />
              )}
              {project.liveDemoUrl && (
                <ActionButton 
                  href={project.liveDemoUrl} 
                  icon={ExternalLink} 
                  label="Demo" 
                  color="grey"
                />
              )}
            </div>
            
            {project.paperUrl && (
              <ActionButton 
                href={project.paperUrl} 
                icon={FileText} 
                label="Paper" 
                color="grey"
              />
            )}
          </div>
        </div>

        {/* Simple Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: "linear-gradient(45deg, transparent, rgba(100, 100, 100, 0.05), transparent, rgba(150, 150, 150, 0.05), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
} 