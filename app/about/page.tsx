"use client";
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Award, Brain, Code, Eye, Rocket, Target, Users, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import Skills from '../components/Skills';

// Dynamic import for 3D background
const HomeThreeBackground = dynamic(() => import('../components/HomeThreeBackground'), {
  ssr: false,
  loading: () => null
});

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const FloatingElement = ({ children, delay = 0, duration = 6 }: FloatingElementProps) => (
  <motion.div
    animate={{
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

interface CountUpNumberProps {
  end: number;
  duration?: number;
  delay?: number;
}

const CountUpNumber = ({ end, duration = 2, delay = 0 }: CountUpNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const increment = end / (duration * 60);
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(counter);
    }, delay);
    return () => clearTimeout(timer);
  }, [end, duration, delay]);

  return <span>{count}</span>;
};

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface InteractiveCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
  delay: number;
  stats?: Stat[];
}

const InteractiveCard = ({ icon: Icon, title, description, color, delay, stats }: InteractiveCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating icon */}
      <FloatingElement delay={delay}>
        <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
      </FloatingElement>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-sky-400 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed mb-6">{description}</p>
        
        {stats && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  <CountUpNumber end={stat.value} delay={delay + 500 + index * 200} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem = ({ year, title, description, index }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-12`}
  >
    <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
        <div className="text-blue-400 font-bold text-lg mb-2">{year}</div>
        <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
    
    <div className="relative">
      <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full border-4 border-gray-900"></div>
      {index < 2 && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-blue-500 to-sky-500"></div>}
    </div>
    
    <div className="flex-1"></div>
  </motion.div>
);

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });

  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setThreeLoaded(true); 
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const achievements = [
    {
      icon: Brain,
      title: "AI Research Excellence",
      description: "Published researcher in IEEE conferences with focus on computer vision and biometric analysis. Achieved 63%+ accuracy improvements in pose estimation systems.",
      color: "from-blue-500 to-sky-500",
      delay: 0.2,
      stats: [
        { value: 3, suffix: "+", label: "Publications" },
        { value: 63, suffix: "%", label: "Accuracy Boost" }
      ]
    },
    {
      icon: Code,
      title: "Full-Stack Mastery",
      description: "End-to-end development expertise from AI model deployment to production-ready web applications. Specialized in modern frameworks and cloud technologies.",
      color: "from-sky-500 to-cyan-500",
      delay: 0.4,
      stats: [
        { value: 15, suffix: "+", label: "Projects" },
        { value: 8, suffix: "+", label: "Technologies" }
      ]
    },
    {
      icon: Eye,
      title: "Computer Vision Pioneer",
      description: "Specialized in pose estimation, biometric analysis, and physiological sensing. Leading innovation in contactless vital-sign monitoring.",
      color: "from-cyan-500 to-green-500",
      delay: 0.6,
      stats: [
        { value: 5, suffix: "+", label: "CV Projects" },
        { value: 2, suffix: "+", label: "Patents Pending" }
      ]
    }
  ];

  const timeline = [
    {
      year: "2025",
      title: "IEEE ICHI Publication",
      description: "Published novel contactless vital-sign monitoring technique with significant accuracy improvements in biometric analysis."
    },
    {
      year: "2024",
      title: "Award-Winning Projects",
      description: "Winner of &apos;Best use of AI/ML&apos; at Hack for Humanity 2025 with Farm Vision agricultural intelligence platform."
    },
    {
      year: "2023",
      title: "Research & Development",
      description: "Focused on computer vision applications in sports and fitness, developing innovative pose estimation systems."
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative" suppressHydrationWarning>
      {/* Three.js Background */}
      {threeLoaded && <HomeThreeBackground scrollY={scrollY} />}
      
      {/* Fallback gradient background */}
      {!threeLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-blue-900/20 z-0" />
      )}

      {/* Hero Section */}
      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="relative z-10 pt-24 pb-16"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-sky-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4" />
              <span>Passionate about AI innovation</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-white via-sky-200 to-blue-200 bg-clip-text text-transparent">
                About
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
                Mark
              </span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            >
              Passionate about leveraging{' '}
              <span className="text-blue-400 font-semibold">AI to solve real-world problems</span>{' '}
              and create meaningful impact through{' '}
              <span className="text-sky-400 font-semibold">cutting-edge technology</span>.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Achievements */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              Core Expertise
            </span>
          </motion.h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <InteractiveCard key={index} {...achievement} />
            ))}
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
              My Journey
            </span>
          </motion.h2>
          
          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-900/20 via-sky-900/20 to-cyan-900/20 rounded-3xl p-12 border border-blue-500/20 backdrop-blur-xl relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-sky-600/5 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-sky-500 to-cyan-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex space-x-4">
                    <Target className="w-8 h-8 text-blue-400" />
                    <Rocket className="w-8 h-8 text-sky-400" />
                    <Users className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                    My Philosophy
                  </span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-300 leading-relaxed">
                  <div>
                    <p className="mb-6">
                      I believe that the intersection of{' '}
                      <span className="text-blue-400 font-semibold">artificial intelligence</span> and{' '}
                      <span className="text-sky-400 font-semibold">human-centric design</span>{' '}
                      holds the key to solving some of our most pressing challenges.
                    </p>
                    <p>
                      My work in computer vision and biometric analysis isn&apos;t just about pushing technological boundaries—it&apos;s about creating solutions that enhance human well-being and performance.
                    </p>
                  </div>
                  <div>
                    <p className="mb-6">
                      With a strong foundation in both{' '}
                      <span className="text-cyan-400 font-semibold">research</span> and{' '}
                      <span className="text-green-400 font-semibold">full-stack development</span>, 
                      I excel in transforming complex data into actionable insights and robust software solutions.
                    </p>
                    <p>
                      I&apos;m eager to apply my skills in environments that value research-driven development and cutting-edge technological solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <Skills />
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-blue-900/20 via-sky-900/20 to-cyan-900/20 rounded-3xl p-12 border border-blue-500/20 backdrop-blur-xl">
              <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 to-sky-400 bg-clip-text text-transparent">
                  Let&apos;s Build the Future Together
                </span>
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Interested in collaborating on innovative projects in machine learning and computer vision? Let&apos;s start a conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-blue-500/25"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-blue-500/50 hover:border-blue-400 text-blue-400 hover:text-blue-300 font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm hover:bg-blue-500/10"
                >
                  View Projects
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 