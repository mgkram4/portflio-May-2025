"use client";

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Brain, ChevronDown, Code, Download, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const FloatingOrb = ({ delay = 0, duration = 4, size = "w-4 h-4", left = 50, top = 50 }) => (
  <motion.div
    className={`${size} bg-gradient-to-r from-purple-400 to-blue-400 rounded-full absolute opacity-20`}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      left: `${left}%`,
      top: `${top}%`,
    }}
  />
);

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
}

const StatCard = ({ icon: Icon, value, label, delay }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative z-10">
      <Icon className="w-8 h-8 text-purple-400 mb-3" />
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  </motion.div>
);

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
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
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Deterministic positions and properties for floating orbs
  const orbConfigs = [
    { left: 10, top: 20, size: "w-4 h-4", duration: 4.2 },
    { left: 85, top: 15, size: "w-6 h-6", duration: 5.1 },
    { left: 25, top: 70, size: "w-4 h-4", duration: 4.8 },
    { left: 75, top: 80, size: "w-6 h-6", duration: 4.5 },
    { left: 50, top: 30, size: "w-4 h-4", duration: 5.3 },
    { left: 15, top: 85, size: "w-6 h-6", duration: 4.7 },
    { left: 90, top: 45, size: "w-4 h-4", duration: 4.9 },
    { left: 35, top: 10, size: "w-6 h-6", duration: 5.0 },
    { left: 65, top: 60, size: "w-4 h-4", duration: 4.4 },
    { left: 5, top: 50, size: "w-6 h-6", duration: 5.2 },
    { left: 80, top: 25, size: "w-4 h-4", duration: 4.6 },
    { left: 45, top: 90, size: "w-6 h-6", duration: 4.3 },
    { left: 70, top: 5, size: "w-4 h-4", duration: 5.4 },
    { left: 20, top: 40, size: "w-6 h-6", duration: 4.1 },
    { left: 95, top: 75, size: "w-4 h-4", duration: 4.8 }
  ];

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
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900/20" />
        
        {/* Floating Orbs */}
        {orbConfigs.map((config, i) => (
          <FloatingOrb 
            key={i} 
            delay={i * 0.5} 
            duration={config.duration}
            size={config.size}
            left={config.left}
            top={config.top}
          />
        ))}
        
        {/* Mesh Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{
            background: isClient 
              ? `radial-gradient(circle at ${50 + scrollY * 0.01}% ${50 + Math.sin(scrollY * 0.001) * 20}%, rgba(147, 51, 234, 0.4) 0%, transparent 70%)`
              : `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.4) 0%, transparent 70%)`,
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

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
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Available for new opportunities</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                Mark
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Garcia
              </span>
            </h1>
          </motion.div>

          {/* Animated Role */}
          <motion.div variants={itemVariants} className="text-2xl md:text-4xl lg:text-5xl font-light">
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-8 h-8 text-purple-400" />
                <TypewriterText text="ML Engineer" delay={500} />
              </div>
              <span className="text-gray-500 hidden md:block">×</span>
              <div className="flex items-center space-x-3">
                <Code className="w-8 h-8 text-blue-400" />
                <TypewriterText text="Full-Stack Dev" delay={2000} />
              </div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
          >
            Specializing in{' '}
            <span className="text-purple-400 font-semibold">computer vision</span> and{' '}
            <span className="text-blue-400 font-semibold">biometric analysis</span> with{' '}
            <span className="text-cyan-400 font-bold">63%+ accuracy improvements</span>.
            <br />
            Published researcher delivering end-to-end AI systems.
          </motion.p>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <StatCard icon={Brain} value="6+" label="AI Projects" delay={1.2} />
            <StatCard icon={Code} value="3+" label="Publications" delay={1.4} />
            <StatCard icon={Sparkles} value="63%" label="Accuracy Boost" delay={1.6} />
            <StatCard icon={Github} value="15+" label="Repositories" delay={1.8} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button 
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center space-x-2">
                <span>View My Work</span>
                <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button 
              className="group px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-purple-300 font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm hover:bg-purple-500/10"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center space-x-6"
          >
            {[
              { icon: Github, href: "https://github.com/mgkram4", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/markgarcia4", label: "LinkedIn" },
              { icon: Mail, href: "mailto:contact@markgarcia.dev", label: "Email" }
            ].map(({ icon: Icon, href, label }, index) => (
              <motion.a 
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 border border-gray-700/50 rounded-2xl hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Icon className="w-6 h-6 text-gray-400 group-hover:text-purple-400 transition-colors relative z-10" />
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
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2 text-purple-400"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}