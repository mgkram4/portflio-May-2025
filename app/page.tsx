"use client";

import { motion } from 'framer-motion';
import { Copy, Github, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

const ProjectCard = ({ shortTitle, title, category, githubUrl, liveDemoUrl }: { shortTitle: string; title: string; category: string; githubUrl?: string; liveDemoUrl?: string }) => (
    <motion.div 
        className="bg-card rounded-lg border border-border flex flex-col h-full overflow-hidden"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.5 }}
        variants={cardVariants}
    >
        <div className="h-48 bg-gradient-to-br from-primary to-accent flex items-center justify-center p-4">
            <h2 className="text-3xl font-bold text-primary-foreground text-center">{shortTitle}</h2>
        </div>
        <div className="p-6 flex-grow flex flex-col">
            <h3 className="font-semibold text-xl mb-1 flex-grow text-foreground">{title}</h3>
            <p className="text-sm text-primary mb-4">{category}</p>
            <div className="flex justify-end gap-4 mt-auto">
                {githubUrl && (
                    <Link href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Github />
                    </Link>
                )}
                {liveDemoUrl && (
                    <Link href={liveDemoUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                        <LinkIcon />
                    </Link>
                )}
            </div>
        </div>
    </motion.div>
);

export default function HomePage() {
  return (
    <div className="p-8 min-h-screen">
      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold text-foreground">Hello! I&apos;m Mark Garcia</h1>
        <h2 className="text-3xl font-semibold text-primary">AI/ML Engineer & Full-Stack Developer</h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          AI/ML Engineer and Full-Stack Developer specializing in computer vision, machine learning, and modern web applications.
        </p>
        <div className="mt-6 flex gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/about" className="rounded-full bg-primary px-6 py-2 font-semibold text-primary-foreground hover:bg-primary/90">
                About
            </Link>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            className="flex items-center gap-2 rounded-full border border-border px-6 py-2 font-semibold hover:bg-muted"
          >
            <Copy size={16} />
            Copy email
          </motion.button>
        </div>
      </motion.section>

      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ onscreen: { transition: { staggerChildren: 0.2 }}}}
      >
        <motion.h2 
            className="mb-8 text-3xl font-bold text-foreground"
            variants={cardVariants}
        >
            Selected Work
        </motion.h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <ProjectCard
              shortTitle="Pose Analysis"
              title="Intelligent Perfect Pose and Health Analysis"
              category="Research"
              githubUrl="#"
              liveDemoUrl="#"
            />
            <ProjectCard
              shortTitle="Fintech Platform"
              title="Vista Pacific Capital"
              category="Web Dev"
              githubUrl="https://github.com/mgkram4/Vista-Pacific-Capital"
              liveDemoUrl="https://www.vistapacificcapital.com/"
            />
        </div>
      </motion.section>
    </div>
  );
}