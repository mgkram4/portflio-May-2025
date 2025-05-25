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
    }, currentIndex * 100);

    return () => clearTimeout(timer);
  }, [currentIndex, text, isClient, shouldAnimate]);

  return (
    <span className="relative">
      {displayText}
      {isClient && shouldAnimate && currentIndex < text.length && (
        <motion.span
          className="inline-block w-0.5 h-8 bg-purple-400 ml-1"
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
  gradient: string;
}

const StatCard = ({ icon: Icon, value, label, delay, gradient }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
    className="group relative overflow-hidden"
  >
    <div className={`relative bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:border-white/20 transition-all duration-500 text-center h-full`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-3 right-3 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/30 rounded-full animate-ping" />
      </div>
      
      <div className="relative z-10">
        <div className="mb-3 relative">
          <Icon className="w-8 h-8 text-white mx-auto drop-shadow-lg" />
          <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="text-2xl font-black text-white mb-1 tracking-tight">{value}</div>
        <div className="text-xs text-white/70 font-medium uppercase tracking-widest">{label}</div>
      </div>
    </div>
  </motion.div>
);

export default function Hero() {
  const [isClient, setIsClient] = useState(false);
  const { scrollYProgress } = useScroll();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 300, damping: 30 });

  useEffect(() => {
    setIsClient(true);
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" suppressHydrationWarning>
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
          {/* Main Title */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div 
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 backdrop-blur-xl border border-purple-500/30 rounded-3xl text-purple-300 text-sm font-medium mb-6"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Available for new opportunities</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Mark
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Garcia
              </span>
            </h1>
          </motion.div>

          {/* Animated Role */}
          <motion.div variants={itemVariants} className="text-xl md:text-3xl lg:text-4xl font-light">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-xl border border-purple-500/20 rounded-3xl hover:border-purple-400/40 transition-all duration-500">
                <Brain className="w-8 h-8 text-purple-400" />
                <TypewriterText text="ML Engineer" delay={500} />
              </div>
              <span className="text-gray-500 hidden md:block text-2xl">×</span>
              <div className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-xl border border-blue-500/20 rounded-3xl hover:border-blue-400/40 transition-all duration-500">
                <Code className="w-8 h-8 text-blue-400" />
                <TypewriterText text="Full-Stack Dev" delay={2000} />
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div 
            variants={itemVariants}
            className="relative bg-gradient-to-r from-gray-900/40 via-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-8 max-w-5xl mx-auto"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Specializing in{' '}
              <span className="text-purple-400 font-semibold">computer vision</span> and{' '}
              <span className="text-blue-400 font-semibold">biometric analysis</span> with{' '}
              <span className="text-cyan-400 font-bold">63%+ accuracy improvements</span>.
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
              gradient="from-purple-600/20 to-purple-800/20"
            />
            <StatCard 
              icon={Code} 
              value="3+" 
              label="Publications" 
              delay={1.4} 
              gradient="from-blue-600/20 to-blue-800/20"
            />
            <StatCard 
              icon={Sparkles} 
              value="63%" 
              label="Accuracy Boost" 
              delay={1.6} 
              gradient="from-emerald-600/20 to-emerald-800/20"
            />
            <StatCard 
              icon={Github} 
              value="15+" 
              label="Repositories" 
              delay={1.8} 
              gradient="from-orange-600/20 to-orange-800/20"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button 
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-bold rounded-3xl transition-all duration-500 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 overflow-hidden"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <span className="relative flex items-center space-x-3 text-lg">
                <Link href="/projects">
                  <span>View My Work</span>
                </Link>
                
              </span>
            </motion.button>
            
            <motion.a 
              href="/placeholder-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-10 py-5 bg-gradient-to-br from-gray-900/40 to-gray-800/40 backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/50 text-purple-400 hover:text-purple-300 font-bold rounded-3xl transition-all duration-500 hover:bg-purple-500/10"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-3 text-lg">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </span>
            </motion.a>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: "https://github.com/mgkram4", label: "GitHub", gradient: "from-gray-900/40 to-gray-800/40", border: "border-gray-700/50", hover: "hover:border-purple-500/50 hover:bg-purple-500/10" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/mark-garcia-mg18/", label: "LinkedIn", gradient: "from-blue-900/40 to-blue-800/40", border: "border-blue-700/50", hover: "hover:border-blue-500/50 hover:bg-blue-500/10" },
              { icon: Mail, href: "mailto:mark.garcia4@laverne.edu", label: "Email", gradient: "from-purple-900/40 to-purple-800/40", border: "border-purple-700/50", hover: "hover:border-purple-500/50 hover:bg-purple-500/10" }
            ].map(({ icon: Icon, href, label, gradient, border, hover }, index) => (
              <motion.a 
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative p-4 bg-gradient-to-br ${gradient} backdrop-blur-xl border ${border} rounded-3xl ${hover} transition-all duration-500`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors relative z-10" />
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