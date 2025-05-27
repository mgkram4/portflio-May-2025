"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Award, Brain, Github, Sparkles, Star, TrendingUp, Zap } from 'lucide-react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';

// Dynamic import for 3D background to avoid SSR issues
const HomeThreeBackground = dynamic(() => import('./components/HomeThreeBackground'), {
  ssr: false,
  loading: () => null
});

const featuredProjects = [
  {
    title: "Farm Vision 🌾 - Agricultural Intelligence Platform",
    shortDescription: "Award-winning web app for agricultural monitoring, using AI for disease detection & yield prediction.",
    imageUrl: "/images/farm-vision.svg",
    detailedDescription: {
      situation: "Developed for Hack for Humanity 2025, aiming to provide a modern web application for agricultural monitoring and analysis.",
      task: "Combine weather data, soil metrics, AI-powered disease detection, and yield prediction into a unified, mobile-responsive dashboard.",
      action: "Built with HTML5, CSS3, Vanilla JavaScript (with Chart.js) on the frontend, and Python (FastAPI) on the backend. Utilized PyTorch and Scikit-learn for machine learning models.",
      result: "Winner of &apos;Best use of AI/ML&apos; at Hack for Humanity 2025. Placed 14th-42nd overall."
    },
    techStack: ["Python", "FastAPI", "PyTorch", "Scikit-learn", "AI/ML", "HTML5", "CSS3", "JavaScript", "Chart.js"],
    githubUrl: "https://github.com/mgkram4/Hack-4-Humanity-2025",
    liveDemoUrl: "https://devpost.com/software/farmer-vision?ref_content=my-projects-tab&ref_feature=my_projects",
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "Vista Pacific Capital - Equipment Financing Platform",
    shortDescription: "Web application for Vista Pacific Capital, facilitating equipment financing applications.",
    imageUrl: "/images/finance-platform.svg",
    detailedDescription: {
      situation: "Vista Pacific Capital required a modern online presence to streamline their application process.",
      task: "Develop a comprehensive web platform for financing applications ranging from $20,000 to $20 million.",
      action: "Built using TypeScript and modern web technologies with forms for application submission and financing product information.",
      result: "An operational online platform that enhances customer engagement and simplifies the financing workflow."
    },
    techStack: ["TypeScript", "React", "Next.js", "Financial Technology"],
    githubUrl: "https://github.com/mgkram4/Vista-Pacific-Capital",
    liveDemoUrl: "https://www.vistapacificcapital.com/",
    paperUrl: undefined,
    category: "web-dev",
    featured: true
  },
  {
    title: "Intelligent Perfect Pose and Health Analysis in Sports and Fitness",
    shortDescription: "Novel contactless vital-sign monitoring technique, using WebSockets, BERT, and React/D3.js. [IEEE ICHI]",
    imageUrl: "/images/pose-analysis.svg",
    detailedDescription: {
      situation: "Presented novel contactless vital-sign monitoring technique at IEEE ICHI; pre-print DOI: xx/xxxx.",
      task: "This was an IEEE Publication associated with IEEE ICHI.",
      action: "Utilized WebSockets for real-time data ingestion, a fine-tuned BERT model for sentiment classification, and Topic Modeling (LDA) for identifying key themes. The frontend was built with React and D3.js for visualizations.",
      result: "Delivered a dashboard providing sub-second latency insights, improving brand engagement tracking by 40%."
    },
    techStack: ["Contactless Vital-Sign Monitoring", "IEEE Publication", "WebSockets", "BERT", "Topic Modeling (LDA)", "React", "D3.js", "AI/ML"],
    githubUrl: undefined,
    liveDemoUrl: undefined,
    paperUrl: "#",
    category: "research",
    featured: true
  }
];

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
  delay: number;
  gradient: string;
}

const StatCard = ({ icon: Icon, value, label, delay, gradient }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      className="group relative overflow-hidden"
    >
      <div className={`relative bg-gradient-to-br ${gradient} backdrop-blur-xl border border-neutral-700/30 rounded-3xl p-8 hover:border-neutral-500/40 transition-all duration-500 text-center h-full`}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-800/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 bg-neutral-600/20 rounded-full animate-pulse" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-neutral-500/30 rounded-full animate-ping" />
        </div>
        
        <div className="relative z-10">
          <div className="mb-4 relative">
            <Icon className="w-12 h-12 text-neutral-100 mx-auto drop-shadow-lg" />
            <div className="absolute inset-0 bg-neutral-500/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="text-4xl font-black text-neutral-50 mb-2 tracking-tight">{value}</div>
          <div className="text-sm text-neutral-400 font-medium uppercase tracking-widest">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

interface SkillBadgeProps {
  skill: string;
  delay: number;
  variant?: "default" | "accent" | "highlight";
}

const SkillBadge = ({ skill, delay, variant = "default" }: SkillBadgeProps) => {
  const variants = {
    default: "from-neutral-700/30 to-neutral-600/30 border-neutral-500/40 text-neutral-300 hover:border-neutral-400/60 hover:bg-neutral-600/40",
    accent: "from-neutral-600/30 to-neutral-500/30 border-neutral-400/40 text-neutral-200 hover:border-neutral-300/60 hover:bg-neutral-500/40",
    highlight: "from-neutral-500/30 to-neutral-400/30 border-neutral-300/40 text-neutral-100 hover:border-neutral-200/60 hover:bg-neutral-400/40"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ scale: 1.1, y: -2 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 200 }}
      className={`px-6 py-3 bg-gradient-to-r ${variants[variant]} backdrop-blur-sm border rounded-full font-semibold text-sm transition-all duration-300 cursor-default shadow-lg hover:shadow-xl`}
    >
      {skill}
    </motion.div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
}

const FloatingElement = ({ children, delay = 0, duration = 3 }: FloatingElementProps) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
      rotate: [0, 1, -1, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

export default function HomePage() {
  const [sectionsAnimated, setSectionsAnimated] = useState({
    about: false,
    projects: false,
    expertise: false,
    cta: false
  });

  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load Three.js background after a short delay
    setThreeLoaded(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const skills: Array<{ name: string; variant: "default" | "accent" | "highlight" }> = [
    { name: "PyTorch", variant: "default" },
    { name: "TensorFlow", variant: "default" },
    { name: "Computer Vision", variant: "accent" },
    { name: "NLP", variant: "accent" },
    { name: "React", variant: "highlight" },
    { name: "Next.js", variant: "highlight" },
    { name: "Python", variant: "default" },
    { name: "TypeScript", variant: "highlight" },
    { name: "FastAPI", variant: "accent" },
    { name: "Kubernetes", variant: "default" },
    { name: "Docker", variant: "default" },
    { name: "AWS", variant: "accent" }
  ];

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-300 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 overflow-x-hidden relative" suppressHydrationWarning>
      {/* Three.js Background - Load after initial render */}
      {threeLoaded && <HomeThreeBackground scrollY={scrollY} />}
      
      {/* Fallback gradient background */}
      {!threeLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 z-0" />
      )}

      {/* Content */}
      <div className="relative z-10 pt-8">
        {/* Hero Section */}
        <Hero />

        {/* About Preview Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-neutral-700/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-neutral-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={sectionsAnimated.about ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setSectionsAnimated(prev => ({ ...prev, about: true }))}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center mb-20"
            >
              <FloatingElement delay={0.2}>
                <Sparkles className="w-8 h-8 text-neutral-400 mx-auto mb-6" />
              </FloatingElement>
              
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              
              <motion.p 
                initial={sectionsAnimated.about ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                As a Machine-Learning Engineer and Full-Stack Developer, I specialize in{' '}
                <span className="text-transparent bg-gradient-to-r from-neutral-300 to-neutral-200 bg-clip-text font-semibold">
                  computer vision and biometric analysis
                </span>, 
                delivering end-to-end AI systems and production web applications with a focus on real-world impact and innovation in vision-based physiological sensing.
              </motion.p>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <div className="flex flex-wrap justify-around gap-8 mb-20">
              <StatCard 
                icon={Brain} 
                value="6+" 
                label="AI Projects" 
                delay={0.1} 
                gradient="from-neutral-700/20 to-neutral-800/20"
              />
              <StatCard 
                icon={Award} 
                value="1+" 
                label="IEEE Publication" 
                delay={0.2} 
                gradient="from-neutral-700/20 to-neutral-800/20"
              />
              <StatCard 
                icon={TrendingUp} 
                value="63%+" 
                label="Accuracy Boost" 
                delay={0.3} 
                gradient="from-neutral-600/20 to-neutral-700/20"
              />
              <StatCard 
                icon={Github} 
                value="15+" 
                label="Repositories" 
                delay={0.4} 
                gradient="from-neutral-600/20 to-neutral-700/20"
              />
            </div>

            {/* Enhanced Skills Preview */}
            <motion.div
              initial={sectionsAnimated.about ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-neutral-300 to-neutral-200 bg-clip-text text-transparent">
                  Core Technologies
                </span>
              </h3>
              <p className="text-neutral-400 mb-12 text-lg">The tools and frameworks I use to bring ideas to life</p>
              
              <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto mb-12">
                {skills.map((skill, index) => (
                  <SkillBadge 
                    key={skill.name} 
                    skill={skill.name} 
                    variant={skill.variant}
                    delay={index * 0.1} 
                  />
                ))}
              </div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link 
                  href="/about"
                  className="w-full bg-gradient-to-b from-neutral-600 to-neutral-500 hover:from-neutral-500 hover:to-neutral-400 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden"  
                >
                  <div className="absolute  inset-0 bg-gradient-to-b from-neutral-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative  bg-gradient-to-b from-neutral-600 to-neutral-500 hover:from-neutral-500 hover:to-neutral-400 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden z-10 flex items-center space-x-3 text-lg">
                    <span className="m-4"> My Journey {'->'}</span>
                   
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Featured Projects Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[100px] animate-blob" />
            <div className="absolute top-10 right-20 w-80 h-80 bg-neutral-700/15 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 left-20 w-72 h-72 bg-neutral-600/15 rounded-full blur-3xl animate-pulse delay-500" />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={sectionsAnimated.projects ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setSectionsAnimated(prev => ({ ...prev, projects: true }))}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              <FloatingElement delay={0.3}>
                <Zap className="w-8 h-8 text-neutral-400 mx-auto mb-6" />
              </FloatingElement>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </h2>
              <motion.p 
                initial={sectionsAnimated.projects ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Innovative solutions spanning{' '}
                <span className="text-neutral-400 font-semibold">AI/ML</span>,{' '}
                <span className="text-neutral-300 font-semibold">Web Development</span>, and{' '}
                <span className="text-neutral-200 font-semibold">Research</span>
              </motion.p>

              {/* Enhanced Stats */}
              <motion.div
                initial={sectionsAnimated.projects ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center items-center gap-8 mt-16"
              >
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-neutral-400 group-hover:scale-110 transition-transform duration-300">
                    {featuredProjects.length}
                  </div>
                  <div className="text-sm text-neutral-400 uppercase tracking-wider font-medium">Featured</div>
                </div>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-600 to-transparent"></div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-neutral-300 group-hover:scale-110 transition-transform duration-300">3</div>
                  <div className="text-sm text-neutral-400 uppercase tracking-wider font-medium">Categories</div>
                </div>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-neutral-600 to-transparent"></div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-neutral-200 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm text-neutral-400 uppercase tracking-wider font-medium">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Featured Projects Grid */}
            <motion.div
              initial={sectionsAnimated.projects ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-20 place-items-center"
            >
              {featuredProjects.map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  index={index} 
                />
              ))}
            </motion.div>

            {/* Enhanced View All Projects Button */}
            <motion.div
              initial={sectionsAnimated.projects ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Link 
                  href="/projects"
               
                 className="w-full bg-gradient-to-b from-neutral-600 to-neutral-500 hover:from-neutral-500 hover:to-neutral-400 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden"  
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative bg-gradient-to-b from-neutral-600 to-neutral-500 hover:from-neutral-500 hover:to-neutral-400 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden z-10 flex items-center space-x-3 text-lg">
                    <span className="m-4">All Projects {'->'}</span>
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Expertise Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-neutral-700/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-neutral-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={sectionsAnimated.expertise ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setSectionsAnimated(prev => ({ ...prev, expertise: true }))}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              <FloatingElement delay={0.2}>
                <Brain className="w-8 h-8 text-neutral-400 mx-auto mb-6" />
              </FloatingElement>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
                  Core Expertise
                </span>
              </h2>
              <motion.p 
                initial={sectionsAnimated.expertise ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-lg md:text-xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed"
              >
                Specialized knowledge across cutting-edge technologies and methodologies
              </motion.p>
            </motion.div>

            <div className="mb-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <SkillBadge key={skill.name} skill={skill.name} delay={index * 0.07} variant={skill.variant} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <StatCard 
                icon={Zap} 
                value="5+" 
                label="Years of Experience" 
                delay={0.1}
                gradient="from-neutral-800/70 to-neutral-700/70"
              />
              <StatCard 
                icon={Award} 
                value="10+" 
                label="Projects Completed" 
                delay={0.2}
                gradient="from-neutral-700/70 to-neutral-600/70"
              />
              <StatCard 
                icon={Star} 
                value="15+" 
                label="Skills & Technologies" 
                delay={0.3}
                gradient="from-neutral-600/70 to-neutral-500/70"
              />
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action Section */}
        <section className="relative py-24 px-6 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/20 via-neutral-900/20 to-neutral-900/20" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-[100px] animate-blob" />
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={sectionsAnimated.cta ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setSectionsAnimated(prev => ({ ...prev, cta: true }))}
              transition={{ duration: 1 }}
              className="relative text-center bg-gradient-to-r from-neutral-900/40 via-neutral-900/40 to-neutral-900/40 rounded-3xl p-16 border border-neutral-500/30 backdrop-blur-xl overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-600/10 to-neutral-500/10 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neutral-500 via-neutral-400 to-neutral-300" />
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-neutral-500/20 rounded-full blur-xl animate-bounce" />
              <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-neutral-400/20 rounded-full blur-xl animate-bounce delay-1000" />
              
              <div className="relative z-10">
                <FloatingElement delay={0.5}>
                  <Zap className="w-20 h-20 text-neutral-400 mx-auto mb-8" />
                </FloatingElement>
                
                <h2 className="text-5xl md:text-6xl font-black mb-8">
                  <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
                    Ready to collaborate?
                  </span>
                </h2>
                
                <p className="text-lg md:text-xl text-neutral-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  I&apos;m passionate about building innovative solutions and always excited to discuss new opportunities, 
                  cutting-edge projects, and potential collaborations.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Link
                      href="/contact"
                      className="group relative bg-gradient-to-b from-neutral-600 to-neutral-500 hover:from-neutral-500 hover:to-neutral-400 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative bg-gradient-to-b from-neutral-600 to-neutral-500 hover:from-neutral-500 hover:to-neutral-400 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden z-10 flex items-center space-x-3 text-lg">
                        <span className="flex items-center space-x-3 px-12 py-5">
                          <span>Get In Touch</span>
                          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <a
                      href="https://github.com/mgkram4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative bg-gradient-to-b from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-neutral-800/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative bg-gradient-to-b from-neutral-700 to-neutral-800 hover:from-neutral-600 hover:to-neutral-700 text-neutral-100 font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-neutral-500/25 hover:shadow-neutral-500/40 overflow-hidden z-10 flex items-center space-x-3 text-lg">
                        <span className="flex items-center space-x-3 px-12 py-5">
                          <Github className="w-6 h-6" />
                          <span>View GitHub</span>
                        </span>
                      </span>
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
} 