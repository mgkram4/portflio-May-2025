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
    className="px-3 py-1 bg-muted/50 backdrop-blur-sm text-muted-foreground text-xs font-medium rounded-full border border-border hover:bg-muted/70 hover:border-primary/20 transition-all duration-300"
  >
    {tech}
  </motion.span>
);

interface ActionButtonProps {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color?: "primary" | "secondary" | "default";
}

const ActionButton = ({ href, icon: Icon, label, color = "default" }: ActionButtonProps) => {
  const colorClasses = {
    primary: "from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground",
    secondary: "from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-secondary-foreground",
    default: "from-muted to-muted/80 hover:from-muted/90 hover:to-muted/70 text-foreground"
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
        className={`group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${colorClasses[color]} rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl`}
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
        className="relative h-full bg-gradient-to-br from-card/80 to-card/70 backdrop-blur-xl border border-border rounded-3xl overflow-hidden shadow-2xl"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Featured Badge */}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 right-4 z-20 bg-gradient-to-r from-primary to-accent rounded-full p-2 shadow-lg"
          >
            <Star className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20">
          <motion.span 
            className="px-3 py-1 bg-card/50 backdrop-blur-sm text-foreground text-xs font-medium rounded-full border border-border"
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
            className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text transition-all duration-300 line-clamp-2"
          >
            {project.title}
          </motion.h3>
          
          <motion.p 
            className="text-muted-foreground text-sm leading-relaxed line-clamp-2"
          >
            {project.shortDescription}
          </motion.p>
          
          {/* Tech Stack */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
              Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
              {project.techStack.slice(0, 4).map((tech, _) => (
                <TechBadge key={tech} tech={tech} />
              ))}
              {project.techStack.length > 4 && (
                <span className="px-3 py-1 bg-muted/30 text-muted-foreground text-xs rounded-full border border-border">
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
                  color="default"
                />
              )}
              {project.liveDemoUrl && (
                <ActionButton 
                  href={project.liveDemoUrl} 
                  icon={ExternalLink} 
                  label="Demo" 
                  color="primary"
                />
              )}
            </div>
            
            {project.paperUrl && (
              <ActionButton 
                href={project.paperUrl} 
                icon={FileText} 
                label="Paper" 
                color="secondary"
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