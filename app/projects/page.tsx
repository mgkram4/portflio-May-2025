"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { Github, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const allProjects = [
    {
        shortTitle: "Pose Analysis",
        title: "Intelligent Perfect Pose and Health Analysis",
        category: "Research",
        imageUrl: "/images/pose-analysis.svg",
        githubUrl: "#",
        liveDemoUrl: "#",
    },
    {
        shortTitle: "Farm Vision",
        title: "Farm Vision - Agricultural Intelligence",
        category: "AI/ML",
        imageUrl: "/images/farm-vision.svg",
        githubUrl: "https://github.com/mgkram4/Hack-4-Humanity-2025",
        liveDemoUrl: "https://devpost.com/software/farmer-vision",
    },
    {
        shortTitle: "Fintech Platform",
        title: "Vista Pacific Capital - Financing Platform",
        category: "Web Dev",
        imageUrl: "/images/finance-platform.svg",
        githubUrl: "https://github.com/mgkram4/Vista-Pacific-Capital",
        liveDemoUrl: "https://www.vistapacificcapital.com/",
    },
    {
        shortTitle: "Phishing Detector",
        title: "AI Phishing Email Detector",
        category: "Security",
        imageUrl: "/images/phishing-detector.svg", // Placeholder
        githubUrl: "https://github.com/mgkram4/email-phishing-detecor",
        liveDemoUrl: "#",
    },
    {
        shortTitle: "NSFW Blocker",
        title: "NSFW Blocker Mobile App",
        category: "Mobile Dev",
        imageUrl: "/images/nsfw-blocker.svg", // Placeholder
        githubUrl: "https://github.com/mgkram4/NFSW-Blocker-Mobile",
        liveDemoUrl: "#",
    },
];

const ProjectsPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    const allCategories = allProjects.map(p => p.category);
    return ["All", ...Array.from(new Set(allCategories))];
  }, []);

  const filteredProjects = activeFilter === "All"
    ? allProjects
    : allProjects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-gradient-primary">My Projects</h1>
        <p className="text-lg text-glass-secondary max-w-2xl mx-auto">
          A collection of my work, from AI research and web development to security and mobile applications.
        </p>
      </motion.div>

      <div className="flex justify-center flex-wrap gap-4 mb-12">
        {categories.map(category => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            className={`px-6 py-2 rounded-glass font-semibold transition-all duration-200 ${
              activeFilter === category
                ? 'bg-primary text-glass-primary shadow-glow'
                : 'glass-button text-glass-muted hover:text-glass-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.title}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card glass-hover flex flex-col h-full overflow-hidden"
            whileHover={{ scale: 1.03, y: -5 }}
          >
            <div className="h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
                <h2 className="text-3xl font-bold text-glass-primary text-center">{project.shortTitle}</h2>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="font-semibold text-xl mb-1 flex-grow text-glass-primary">{project.title}</h3>
              <p className="text-sm text-accent mb-4">{project.category}</p>
              <div className="flex justify-end gap-4 mt-auto">
                {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-glass-muted hover:text-glass-primary transition-colors">
                        <Github />
                    </Link>
                )}
                {project.liveDemoUrl && (
                    <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="text-glass-muted hover:text-glass-primary transition-colors">
                        <LinkIcon />
                    </Link>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsPage; 