"use client";
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Award, Brain, Code, Eye, Rocket, Target, Users, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import Skills from '../components/Skills';

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
      className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
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
        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-gray-300 leading-relaxed mb-6">{description}</p>
        
        {stats && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-purple-400">
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
      <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
        <div className="text-purple-400 font-bold text-lg mb-2">{year}</div>
        <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
    
    <div className="relative">
      <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full border-4 border-gray-900"></div>
      {index < 2 && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-purple-500 to-blue-500"></div>}
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

  const achievements = [
    {
      icon: Brain,
      title: "AI Research Excellence",
      description: "Published researcher in IEEE conferences with focus on computer vision and biometric analysis. Achieved 63%+ accuracy improvements in pose estimation systems.",
      color: "from-purple-500 to-blue-500",
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
      color: "from-blue-500 to-cyan-500",
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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-purple-900/20" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full"
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

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
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <Zap className="w-4 h-4" />
              <span>Passionate about AI innovation</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                About
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
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
              <span className="text-purple-400 font-semibold">AI to solve real-world problems</span>{' '}
              and create meaningful impact through{' '}
              <span className="text-blue-400 font-semibold">cutting-edge technology</span>.
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
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
            <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-xl relative overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex space-x-4">
                    <Target className="w-8 h-8 text-purple-400" />
                    <Rocket className="w-8 h-8 text-blue-400" />
                    <Users className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-center mb-8">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    My Philosophy
                  </span>
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8 text-lg text-gray-300 leading-relaxed">
                  <div>
                    <p className="mb-6">
                      I believe that the intersection of{' '}
                      <span className="text-purple-400 font-semibold">artificial intelligence</span> and{' '}
                      <span className="text-blue-400 font-semibold">human-centric design</span>{' '}
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
            <div className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-xl">
              <Award className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
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
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-500/25"
                >
                  Get In Touch
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-purple-500/50 hover:border-purple-400 text-purple-400 hover:text-purple-300 font-semibold rounded-2xl transition-all duration-300 backdrop-blur-sm hover:bg-purple-500/10"
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