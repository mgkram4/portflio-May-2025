"use client";
import { motion } from 'framer-motion';
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
}

interface ProjectCardProps {
  project: Project;
  variants?: any; // Accept variants prop
}

// Placeholder icons (replace with actual SVGs or an icon library like Heroicons)
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
);
const ExternalLinkIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);
const DocumentIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2zM12 3v6h6"></path></svg>
);

export default function ProjectCard({ project, variants }: ProjectCardProps) {
  return (
    <motion.div 
      variants={variants}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-2xl"
      whileHover={{ y: -5 }}
    >
      {project.videoUrl ? (
        <div className="aspect-video rounded-t-lg overflow-hidden">
          <iframe 
            src={project.videoUrl}
            title={project.title}
            allowFullScreen 
            className="w-full h-full"
          />
        </div>
      ) : project.imageUrl ? (
        <div className="relative w-full h-56 rounded-t-lg overflow-hidden">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            layout="fill" 
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 flex items-center justify-center rounded-t-lg">
            <span className="text-gray-500">No Image/Video</span>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-primary dark:text-blue-400">{project.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 h-12 overflow-hidden">
          {project.shortDescription}
        </p>
        
        <div className="mb-4">
            <h4 className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-500 mb-1">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 5).map(tech => (
                    <span key={tech} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        {tech}
                    </span>
                ))}
                {project.techStack.length > 5 && (
                     <span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                        +{project.techStack.length - 5} more
                    </span>
                )}
            </div>
        </div>
      </div>

      {/* Overlay for detailed description and links, revealed on hover */}
      <div 
        className="absolute inset-0 flex flex-col p-6 text-white 
                   opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 
                   bg-black/80 backdrop-blur-sm rounded-lg overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <div className="text-sm mb-3 space-y-1 text-gray-200">
          <p><strong className="text-blue-300">Situation:</strong> {project.detailedDescription.situation}</p>
          <p><strong className="text-blue-300">Task:</strong> {project.detailedDescription.task}</p>
          <p><strong className="text-blue-300">Action:</strong> {project.detailedDescription.action}</p>
          <p><strong className="text-blue-300">Result:</strong> {project.detailedDescription.result}</p>
        </div>

        <div className="mt-auto flex items-center space-x-4 pt-4 border-t border-gray-600">
          {project.githubUrl && (
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
              <GitHubIcon className="w-6 h-6 hover:text-primary transition-colors"/>
            </Link>
          )}
          {project.liveDemoUrl && (
            <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
              <ExternalLinkIcon className="w-6 h-6 hover:text-green-400 transition-colors" />
            </Link>
          )}
          {project.paperUrl && (
            <Link href={project.paperUrl} target="_blank" rel="noopener noreferrer" aria-label="Research Paper or Document">
              <DocumentIcon className="w-6 h-6 hover:text-yellow-400 transition-colors" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
} 