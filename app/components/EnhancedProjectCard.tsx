"use client";
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Define an interface for the project prop
interface Project {
  title: string;
  shortDescription: string;
  imageUrl?: string;
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
}

interface EnhancedProjectCardProps {
  project: Project;
}

export default function EnhancedProjectCard({ project }: EnhancedProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card flex flex-col h-full overflow-hidden"
    >
      <div className="relative h-48">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <span className="text-muted-foreground">No Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <span className="absolute top-4 left-4 bg-background/80 text-foreground text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm border border-border">
          {project.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{project.shortDescription}</p>

        <div className="mb-4">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-muted text-muted-foreground text-xs font-medium px-2.5 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border flex justify-end gap-2">
            {project.githubUrl && (
                <ActionButton href={project.githubUrl} icon={Github} label="GitHub" />
            )}
            {project.liveDemoUrl && (
                <ActionButton href={project.liveDemoUrl} icon={ExternalLink} label="Demo" />
            )}
            {project.paperUrl && (
                <ActionButton href={project.paperUrl} icon={FileText} label="Paper" />
            )}
        </div>

      </div>
    </motion.div>
  );
}

const ActionButton = ({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) => (
    <Link href={href} passHref target="_blank" rel="noopener noreferrer">
        <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-muted/70 border border-border text-muted-foreground hover:text-foreground transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <Icon size={16} />
            <span className="text-sm font-medium">{label}</span>
        </motion.div>
    </Link>
);