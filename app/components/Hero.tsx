"use client";

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Brain, Code, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const TypewriterText = ({ text, delay = 0 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState(text); // Start with full text to prevent hydration mismatch
  const [currentIndex, setCurrentIndex] = useState(text.length); // Start at end
  const [isClient, setIsClient] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Start animation after a short delay to ensure hydration is complete
    const animationTimer = setTimeout(() => {
      setShouldAnimate(true);
      setDisplayText('');
      setCurrentIndex(0);
    }, delay + 100);

    return () => clearTimeout(animationTimer);
  }, [delay]);

  useEffect(() => {
    if (!isClient || !shouldAnimate) return;
    
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, currentIndex * 100); // Adjusted speed for modern feel, can be tweaked

    return () => clearTimeout(timer);
  }, [currentIndex, text, isClient, shouldAnimate]);

  return (
    <span className="relative">
      {displayText}
      {isClient && shouldAnimate && currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-8 bg-secondary ml-1"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </span>
  );
};

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  delay: number;
}

const StatCard = ({ icon: Icon, value, label, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    className="group relative overflow-hidden glass-float"
  >
    <div className={`relative glass-card glass-hover p-6 text-center h-full`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-glass-base to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-3 right-3 w-2 h-2 bg-primary opacity-30 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-accent opacity-40 rounded-full animate-ping" />
      </div>
      
      <div className="relative z-10">
        <div className="mb-3 relative">
          <Icon className="w-8 h-8 text-glass-primary mx-auto drop-shadow-lg" />
          <div className="absolute inset-0 bg-primary opacity-20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </div>
        <div className="text-2xl font-black text-glass-primary mb-1 tracking-tight">{value}</div>
        <div className="text-xs text-glass-muted font-medium uppercase tracking-widest">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default function Hero() {
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 30 });

  useEffect(() => {
    // setIsClient(true); // Removed as it's not used
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative min-h-screen mt-10 flex items-center justify-center overflow-hidden" suppressHydrationWarning>
      {/* Content */}
      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity, scale: smoothScale }}
        className="relative z-10 text-center max-w-7xl mx-auto px-6"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Professional Header with Profile Picture */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Profile Picture */}
            <motion.div 
              className="relative mx-auto w-32 h-32 md:w-40 md:h-40"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full rounded-full glass-card p-1 shadow-glow">
                <div className="w-full h-full rounded-full glass-subtle flex items-center justify-center overflow-hidden">
                  {/* Placeholder - replace with actual image later */}
                  <div className="w-full h-full bg-primary flex items-center justify-center">
                    <span className="text-4xl md:text-5xl font-bold text-glass-primary">MG</span>
                  </div>
                </div>
              </div>
              {/* Status indicator */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-glow border-4 border-glass-border rounded-full animate-pulse glow-pulse"></div>
            </motion.div>

            <motion.div 
              className="inline-flex items-center space-x-2 glass-card px-6 py-3 text-glass-primary text-sm font-medium mb-6 glass-hover"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-2 h-2 bg-glow rounded-full animate-pulse"></div>
              <span>🚀 Available for new opportunities • Open to relocation</span>
            </motion.div>
            
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                <span className="block text-gradient-primary">
                  Mark Garcia
                </span>
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-glass-secondary font-light leading-relaxed">
                  AI/ML Engineer & Full-Stack Developer
                </p>
                <p className="text-lg text-glass-muted mt-4 leading-relaxed">
                  Published IEEE researcher with proven expertise in computer vision and production-scale web applications
                </p>
              </div>
            </div>
          </motion.div>

          {/* Animated Role */}
          <motion.div variants={itemVariants} className="text-xl md:text-3xl lg:text-4xl font-light text-glass-primary">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-3 glass-card glass-hover px-8 py-4">
                <Brain className="w-8 h-8 text-primary" />
                <TypewriterText text="ML Engineer" delay={500} />
              </div>
              <span className="text-glass-muted hidden md:block text-2xl">×</span>
              <div className="flex items-center space-x-3 glass-card glass-hover px-8 py-4">
                <Code className="w-8 h-8 text-secondary" />
                <TypewriterText text="Full-Stack Dev" delay={2000} />
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div 
            variants={itemVariants}
            className="relative glass-card glass-hover p-8 max-w-5xl mx-auto"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-t-glass" />
            <p className="text-lg md:text-xl text-glass-primary leading-relaxed">
              Specializing in{' '}
              <span className="text-glass-primary font-semibold">computer vision</span> and{' '}
              <span className="text-glass-primary font-semibold">biometric analysis</span> with{' '}
              <span className="text-accent font-bold">63%+ accuracy improvements</span>.
              <br />
              Published researcher delivering end-to-end AI systems.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            <StatCard 
              icon={Brain} 
              value="6+" 
              label="AI Projects" 
              delay={1.2}
            />
            <StatCard 
              icon={Code} 
              value="3+" 
              label="Publications" 
              delay={1.4}
            />
            <StatCard 
              icon={Sparkles} 
              value="63%" 
              label="Accuracy Boost" 
              delay={1.6}
            />
            <StatCard 
              icon={Github} 
              value="15+" 
              label="Repositories" 
              delay={1.8}
            />
          </motion.div>

          {/* Professional CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <Link href="/contact" className="group relative px-10 py-5 bg-primary text-glass-primary font-bold rounded-glass transition-all duration-200 shadow-glow hover:shadow-glow overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-glass-base to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glass-base to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative flex items-center space-x-3 text-lg">
                  <Mail className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Schedule Interview</span>
                  <span className="opacity-70 group-hover:opacity-100 transition-opacity">→</span>
                </span>
              </Link>
            </motion.div>
            
            <motion.a 
              href="/placeholder-resume.pdf"
              download="Mark_Garcia_Resume.pdf"
              className="group glass-strong glass-hover px-10 py-5 text-glass-primary font-bold rounded-glass transition-all duration-200"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-3 text-lg">
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
                <span className="ml-2 text-xs glass-subtle px-2 py-1 rounded-glass text-glow">PDF</span>
              </span>
            </motion.a>

            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <Link href="/projects" className="group glass-button px-8 py-4 text-glass-muted hover:text-glass-primary font-semibold rounded-glass transition-all duration-200">
                <span className="flex items-center space-x-2">
                  <span>View Portfolio</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: "https://github.com/mgkram4", label: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mark-garcia-mg18/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:mark.garcia4@laverne.edu", label: "Email" }
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a 
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative glass-card glass-hover p-4 rounded-glass transition-all duration-200"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-glass-base to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-glass" />
                <Icon className="w-6 h-6 text-secondary group-hover:text-glass-primary transition-colors relative z-10" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
      
      </motion.div>
    </section>
  );
}