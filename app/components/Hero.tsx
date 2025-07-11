"use client";

import { motion } from 'framer-motion';
import { Download, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-24 sm:py-32">
      {/* Background Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-96 h-96 bg-primary/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[40%] w-72 h-72 bg-accent/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-4xl mx-auto"
      >
        <motion.div variants={itemVariants}>
          <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 text-muted-foreground text-sm font-medium mb-8">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span>Available for new opportunities</span>
          </div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6"
        >
          <span className="text-gradient">Mark Garcia</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Full-Stack AI Engineer specializing in computer vision, real-time biometric systems, and building scalable, intelligent solutions from the ground up.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <Link href="/contact" passHref>
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
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex justify-center gap-6"
        >
          <a href="https://github.com/mgkram4" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com/in/mark-garcia-cs" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={24} />
          </a>
        </motion.div>
      </motion.div>

      {/* Adding blob animation styles to the component itself to avoid global scope issues */}
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: -2s;
        }
        .animation-delay-4000 {
          animation-delay: -4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </section>
  );
}