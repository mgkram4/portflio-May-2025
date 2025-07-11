"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, Github, Mail } from 'lucide-react';
import Link from 'next/link';
import Hero from './components/Hero';
import Skills from './components/Skills';

const allProjects = [
    {
        title: "BIO-SCAN: Real-Time Biometric Analysis",
        shortTitle: "BIO-SCAN",
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
        featured: true,
    },
    {
        title: "Perfect Pose: AI-Powered Fitness Coach",
        shortTitle: "Perfect Pose",
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
        featured: true,
    },
    {
        title: "Vista Pacific Capital - Financing Platform",
        shortTitle: "Fintech Platform",
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
        featured: true, // Let's feature this one for demonstration
    }
];


const ProjectCard = ({ 
  title, 
  category, 
  description, 
  githubUrl, 
  liveDemoUrl,
  techStack,
  featured = false 
}: { 
  title: string; 
  category: string; 
  description: string;
  githubUrl?: string; 
  liveDemoUrl?: string;
  techStack?: string[];
  featured?: boolean;
}) => (
  <motion.div 
    className={`glass-card glass-hover flex flex-col h-full overflow-hidden p-6 ${featured ? 'lg:col-span-2' : ''}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, transform: 'scale(1.02)' }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex-grow flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-xl text-foreground">{title}</h3>
        {featured && (
          <div className="bg-glass-surface border border-glass-border px-3 py-1 rounded-full text-xs font-medium text-accent -mt-1 -mr-1">
            Featured
          </div>
        )}
      </div>
      <p className="text-sm text-accent mb-4 font-medium">{category}</p>
      <p className="text-muted-foreground text-sm mb-6 flex-grow">{description}</p>
      
      {techStack && (
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span key={tech} className="bg-muted text-muted-foreground text-xs font-medium px-3 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
        <div className="flex gap-2">
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" 
              className="hover:bg-glass-hover rounded-full p-2 transition-colors">
              <Github size={18} className="text-muted-foreground" />
            </Link>
          )}
          {liveDemoUrl && (
            <Link href={liveDemoUrl} target="_blank" rel="noopener noreferrer" 
              className="hover:bg-glass-hover rounded-full p-2 transition-colors">
              <Eye size={18} className="text-muted-foreground" />
            </Link>
          )}
        </div>
        <Link href="/projects" className="text-accent hover:text-primary text-sm font-medium flex items-center gap-1 transition-colors duration-200">
          Details <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </motion.div>
);

const StatCard = ({ number, label, description }: { number: string; label: string; description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    whileHover={{ scale: 1.05 }}
    className="text-center glass-card glass-hover p-6 transition-all duration-300 hover:shadow-glow-md"
  >
    <div className="text-5xl font-bold text-gradient mb-2">{number}</div>
    <div className="font-semibold text-foreground mb-2">{label}</div>
    <div className="text-sm text-muted-foreground">{description}</div>
  </motion.div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />

      {/* Stats Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4"><span className="text-gradient">Impact &amp; Achievements</span></h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A proven track record of delivering results in AI research and software development.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard 
              number="94%" 
              label="Model Accuracy" 
              description="Achieved in pose estimation with a custom Transformer model" 
            />
            <StatCard 
              number="107%" 
              label="Lighthouse Score Gain" 
              description="From optimizing a legacy financial services platform" 
            />
            <StatCard 
              number="2" 
              label="Publications" 
              description="Accepted papers at IEEE ICHI 2025 and SAM'25" 
            />
            <StatCard 
              number="2x" 
              label="AI Awards" 
              description="Recognized for innovative LLM and Computer Vision projects" 
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8">
        <Skills />
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4"><span className="text-gradient">Featured Projects</span></h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A showcase of my latest work in AI/ML, web development, and research.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allProjects.filter(p => p.featured).map(project => (
              <ProjectCard
                key={project.title}
                title={project.title}
                category={project.category}
                description={project.shortDescription}
                githubUrl={project.githubUrl}
                liveDemoUrl={project.liveDemoUrl}
                featured={project.featured}
                techStack={project.techStack}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/projects">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-secondary/30"
              >
                View All Projects <ArrowRight size={20} className="inline -mt-1" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 sm:py-32 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold"><span className="text-gradient">Ready to Work Together?</span></h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
               I&apos;m actively seeking new opportunities in AI/ML engineering and full-stack development. 
               Let&apos;s discuss how I can contribute to your team&apos;s success.
             </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                >
                  <Mail size={20} />
                  Get In Touch
                </motion.button>
              </Link>
              
              <motion.a
                href="/placeholder-resume.pdf"
                download="Mark_Garcia_Resume.pdf"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto glass-card glass-hover px-8 py-3 font-semibold flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}