"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import EnhancedProjectCard from '../components/EnhancedProjectCard';

const allProjects = [
    {
        title: "BIO-SCAN: Real-Time Biometric Analysis",
        shortDescription: "An end-to-end pipeline for real-time biometric analysis using a suite of advanced computer vision models.",
        category: "AI/ML Research",
        imageUrl: "/images/ai-ml-default.svg",
        techStack: ["YOLOv8", "MediaPipe", "MiDaS", "SAM", "SMPL-X", "Python", "OpenCV"],
        detailedDescription: {
            situation: "The need for non-invasive, real-time health monitoring in sports and fitness contexts.",
            task: "Develop a comprehensive biometric pipeline capable of extracting vital signs and performing detailed pose analysis from video streams.",
            action: "Architected the 'BIO-SCAN' system, integrating YOLOv8 for detection, MediaPipe for landmarks, MiDaS for depth, and SMPL-X for 3D human model reconstruction. Implemented PPG signal extraction for vitals.",
            result: "The system formed the basis of a research paper accepted to IEEE ICHI 2025 and is part of a pending university patent.",
        },
        paperUrl: "#",
    },
    {
        title: "Perfect Pose: AI-Powered Fitness Coach",
        shortDescription: "An intelligent system providing real-time feedback on exercise form by upgrading a baseline model with a high-accuracy Transformer.",
        category: "AI/ML",
        imageUrl: "/images/pose-analysis.svg",
        githubUrl: "#",
        techStack: ["Transformers", "PyTorch", "OpenCV", "Flask", "REST API"],
        detailedDescription: {
            situation: "Existing pose estimation models for fitness applications lacked the required accuracy and real-time feedback capabilities.",
            task: "Improve the accuracy of a pose estimation pipeline for a community-led fitness application.",
            action: "Upgraded the ML pipeline with a custom Transformer architecture, featuring an 8-head attention mechanism.",
            result: "Increased model accuracy from a baseline of 29% to 94%, enabling precise, real-time feedback for users.",
        },
        liveDemoUrl: "#",
    },
    {
        title: "PenguinPal: LLM-Powered Email Dashboard",
        shortDescription: "An intelligent email dashboard that uses an LLM to automatically categorize, summarize, and draft replies for incoming emails.",
        category: "AI/ML",
        imageUrl: "/images/email-ai.svg",
        githubUrl: "#",
        techStack: ["Claude API", "Langchain", "Flask", "Next.js", "React"],
        detailedDescription: {
            situation: "Managing high volumes of email efficiently is a common challenge, requiring significant manual effort to sort and prioritize.",
            task: "Build an application to automate email management using the power of large language models.",
            action: "Developed a full-stack application using a Flask backend to interact with the Claude API via Langchain, and a Next.js frontend for the user dashboard.",
            result: "The project won 'Best Use of AI' at a competitive event, demonstrating a powerful and practical use-case for LLMs in productivity.",
        },
        liveDemoUrl: "#",
    },
    {
        title: "Farm Vision: Agricultural Intelligence Dashboard",
        shortDescription: "A data-driven dashboard for agricultural insights, combining computer vision and classical machine learning to predict crop health.",
        category: "AI/ML",
        imageUrl: "/images/farm-vision.svg",
        githubUrl: "https://github.com/mgkram4/Hack-4-Humanity-2025",
        liveDemoUrl: "https://devpost.com/software/farmer-vision",
        techStack: ["CNN", "XGBoost", "OpenCV", "Flask", "React"],
        detailedDescription: {
            situation: "Farmers need accessible tools to monitor crop health and predict potential issues without expensive, specialized hardware.",
            task: "Create a web-based dashboard that analyzes images of crops to provide actionable insights.",
            action: "Built a machine learning pipeline using a Convolutional Neural Network (CNN) for image feature extraction and an XGBoost model for classification and prediction.",
            result: "The project won 'Best Use of AI', showcasing an effective, low-cost solution for agricultural monitoring.",
        },
    },
    {
        title: "Vista Pacific Capital - Financing Platform",
        shortDescription: "A complete overhaul of a legacy financing portal, focusing on performance, user experience, and modern web technologies.",
        category: "Web Dev",
        imageUrl: "/images/finance-platform.svg",
        githubUrl: "https://github.com/mgkram4/Vista-Pacific-Capital",
        liveDemoUrl: "https://www.vistapacificcapital.com/",
        techStack: ["React", "Next.js", "Tailwind CSS", "Vercel", "Framer Motion"],
        detailedDescription: {
            situation: "The company's existing financing portal was slow, had a poor user experience, and was difficult to maintain.",
            task: "Revamp the entire frontend, optimize for performance, and implement new features like secure file uploads and PDF generation.",
            action: "Rebuilt the platform from the ground up using Next.js and Tailwind CSS. Implemented significant performance optimizations, reducing JS execution time and optimizing assets.",
            result: "Improved the Google Lighthouse Score from 45 to 93 (a 107% gain), cut FCP by 70%, and eliminated Total Blocking Time, resulting in a vastly improved user experience.",
        },
    }
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
    <div className="min-h-screen pt-24 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                >
                    <span className="text-gradient">My Projects</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg md:text-xl text-glass-secondary max-w-3xl mx-auto leading-relaxed"
                >
                    A curated collection of my work in AI/ML research, full-stack development, and data-driven applications.
                </motion.p>
            </header>

            <div className="flex justify-center mb-12">
                <div className="flex items-center gap-2 bg-dark-elevated p-2 rounded-full border border-glass-border">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveFilter(category)}
                        className={`relative px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                            activeFilter === category ? 'text-white' : 'text-glass-muted hover:text-glass-primary'
                        }`}
                    >
                    {activeFilter === category && (
                        <motion.div
                        layoutId="active-project-filter"
                        className="absolute inset-0 bg-primary rounded-full z-0"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                    )}
                    <span className="relative z-10">{category}</span>
                    </button>
                ))}
                </div>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                layout
            >
                <AnimatePresence>
                {filteredProjects.map((project) => (
                    <motion.div
                        key={project.title}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <EnhancedProjectCard
                            project={project}
                        />
                    </motion.div>
                ))}
                </AnimatePresence>
            </motion.div>
        </div>
    </div>
  );
};

export default ProjectsPage; 