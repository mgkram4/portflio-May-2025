"use client";
import { motion } from 'framer-motion';
import { ArrowRight, Award, Brain, Code, Eye, Github, Sparkles, Star, TrendingUp, Zap } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import Hero from './components/Hero';
import ProjectCard from './components/ProjectCard';

const featuredProjects = [
  {
    title: "Farm Vision 🌾 - Agricultural Intelligence Platform",
    shortDescription: "Award-winning web app for agricultural monitoring, using AI for disease detection & yield prediction.",
    imageUrl: "/images/farm-vision.svg",
    detailedDescription: {
      situation: "Developed for Hack for Humanity 2025, aiming to provide a modern web application for agricultural monitoring and analysis.",
      task: "Combine weather data, soil metrics, AI-powered disease detection, and yield prediction into a unified, mobile-responsive dashboard.",
      action: "Built with HTML5, CSS3, Vanilla JavaScript (with Chart.js) on the frontend, and Python (FastAPI) on the backend. Utilized PyTorch and Scikit-learn for machine learning models.",
      result: "Winner of 'Best use of AI/ML' at Hack for Humanity 2025. Placed 14th-42nd overall."
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

const StatCard = ({ icon: Icon, value, label, delay, gradient }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      className="group relative overflow-hidden"
    >
      <div className={`relative bg-gradient-to-br ${gradient} backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 text-center h-full`}>
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full animate-ping" />
        </div>
        
        <div className="relative z-10">
          <div className="mb-4 relative">
            <Icon className="w-12 h-12 text-white mx-auto drop-shadow-lg" />
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="text-4xl font-black text-white mb-2 tracking-tight">{value}</div>
          <div className="text-sm text-white/70 font-medium uppercase tracking-widest">{label}</div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillBadge = ({ skill, delay, variant = "default" }) => {
  const variants = {
    default: "from-purple-500/20 to-blue-500/20 border-purple-400/30 text-purple-200 hover:border-purple-300/50",
    accent: "from-emerald-500/20 to-cyan-500/20 border-emerald-400/30 text-emerald-200 hover:border-emerald-300/50",
    highlight: "from-orange-500/20 to-pink-500/20 border-orange-400/30 text-orange-200 hover:border-orange-300/50"
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

const FloatingElement = ({ children, delay = 0, duration = 3 }) => (
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

  const skills = [
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

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative" suppressHydrationWarning>
      {/* Fixed full-screen background */}
      <div className="fixed inset-0 w-full h-full bg-black">
        {/* Animated background grid */}
        <div className="absolute inset-0 w-full h-full opacity-[0.02]">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '50px 50px',
            }} 
          />
        </div>
        
        {/* Background gradient overlays */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-purple-900/5 to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-1/3 bg-gradient-to-t from-blue-900/5 to-transparent" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* About Preview Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
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
                <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-6" />
              </FloatingElement>
              
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  About Me
                </span>
              </h2>
              
              <motion.p 
                initial={sectionsAnimated.about ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl md:text-3xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light"
              >
                Driven by a passion for leveraging{' '}
                <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-semibold">
                  AI to solve real-world problems
                </span>, 
                I specialize in the intersection of machine learning and human-centric applications.
              </motion.p>
            </motion.div>

            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <StatCard 
                icon={Brain} 
                value="6+" 
                label="AI Projects" 
                delay={0.1} 
                gradient="from-purple-600/20 to-purple-800/20"
              />
              <StatCard 
                icon={Award} 
                value="3+" 
                label="Publications" 
                delay={0.2} 
                gradient="from-blue-600/20 to-blue-800/20"
              />
              <StatCard 
                icon={TrendingUp} 
                value="63%" 
                label="Accuracy Boost" 
                delay={0.3} 
                gradient="from-emerald-600/20 to-emerald-800/20"
              />
              <StatCard 
                icon={Github} 
                value="15+" 
                label="Repositories" 
                delay={0.4} 
                gradient="from-orange-600/20 to-orange-800/20"
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
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Core Technologies
                </span>
              </h3>
              <p className="text-gray-400 mb-12 text-lg">The tools and frameworks I use to bring ideas to life</p>
              
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
                  className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center space-x-3 text-lg">
                    <span>Discover My Journey</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Featured Projects Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
            <div className="absolute bottom-40 left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1500" />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={sectionsAnimated.projects ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setSectionsAnimated(prev => ({ ...prev, projects: true }))}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              <FloatingElement delay={0.5}>
                <Star className="w-10 h-10 text-yellow-400 mx-auto mb-8" />
              </FloatingElement>
              
              <h2 className="text-6xl md:text-8xl font-black mb-10 leading-tight">
                <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Featured
                </span>
                <br />
                <span className="text-white/90 text-5xl md:text-6xl font-light">
                  Projects
                </span>
              </h2>
              
              <motion.p 
                initial={sectionsAnimated.projects ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12"
              >
                Innovative solutions spanning{' '}
                <span className="text-purple-400 font-semibold">AI/ML</span>,{' '}
                <span className="text-blue-400 font-semibold">Web Development</span>, and{' '}
                <span className="text-cyan-400 font-semibold">Research</span>
              </motion.p>

              {/* Enhanced Stats */}
              <motion.div
                initial={sectionsAnimated.projects ? false : { opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap justify-center items-center gap-8 mt-16"
              >
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-purple-400 group-hover:scale-110 transition-transform duration-300">
                    {featuredProjects.length}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Featured</div>
                </div>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-blue-400 group-hover:scale-110 transition-transform duration-300">3</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Categories</div>
                </div>
                <div className="w-px h-16 bg-gradient-to-b from-transparent via-gray-600 to-transparent"></div>
                <div className="text-center group">
                  <div className="text-4xl md:text-5xl font-black text-cyan-400 group-hover:scale-110 transition-transform duration-300">100%</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider font-medium">Success Rate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Featured Projects Grid */}
            <motion.div
              initial={sectionsAnimated.projects ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={sectionsAnimated.projects ? false : { opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
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
                  className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-bold rounded-3xl transition-all duration-500 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 overflow-hidden text-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <span className="relative z-10 flex items-center space-x-3">
                    <span>Explore All Projects</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Expertise Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="container mx-auto max-w-7xl relative z-10">
            <motion.div
              initial={sectionsAnimated.expertise ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setSectionsAnimated(prev => ({ ...prev, expertise: true }))}
              transition={{ duration: 1 }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  My Expertise
                </span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Specialized knowledge across cutting-edge technologies and methodologies
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-10">
              <motion.div
                initial={sectionsAnimated.expertise ? false : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="group relative bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-10 hover:border-purple-400/40 transition-all duration-500 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
                
                <div className="relative z-10">
                  <FloatingElement delay={0.1}>
                    <Brain className="w-20 h-20 text-purple-400 mx-auto mb-8" />
                  </FloatingElement>
                  <h3 className="text-3xl font-bold text-white mb-6">AI Research</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Published researcher in IEEE conferences with focus on computer vision and biometric analysis. 
                    Achieved 63%+ accuracy improvements in pose estimation systems.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={sectionsAnimated.expertise ? false : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group relative bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-10 hover:border-blue-400/40 transition-all duration-500 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                
                <div className="relative z-10">
                  <FloatingElement delay={0.2}>
                    <Code className="w-20 h-20 text-blue-400 mx-auto mb-8" />
                  </FloatingElement>
                  <h3 className="text-3xl font-bold text-white mb-6">Full-Stack Development</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    End-to-end development expertise from AI model deployment to production-ready web applications. 
                    Specialized in modern frameworks and cloud technologies.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={sectionsAnimated.expertise ? false : { opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="group relative bg-gradient-to-br from-cyan-900/30 to-cyan-800/20 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-10 hover:border-cyan-400/40 transition-all duration-500 text-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-emerald-500" />
                
                <div className="relative z-10">
                  <FloatingElement delay={0.3}>
                    <Eye className="w-20 h-20 text-cyan-400 mx-auto mb-8" />
                  </FloatingElement>
                  <h3 className="text-3xl font-bold text-white mb-6">Computer Vision</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Specialized in pose estimation, biometric analysis, and physiological sensing. 
                    Leading innovation in contactless vital-sign monitoring.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={sectionsAnimated.cta ? false : { opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              onAnimationComplete={() => setSectionsAnimated(prev => ({ ...prev, cta: true }))}
              transition={{ duration: 1 }}
              className="relative text-center bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40 rounded-3xl p-20 border border-purple-500/30 backdrop-blur-xl overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-bounce" />
              <div className="absolute -bottom-10 -left-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-bounce delay-1000" />
              
              <div className="relative z-10">
                <FloatingElement delay={0.5}>
                  <Zap className="w-20 h-20 text-purple-400 mx-auto mb-8" />
                </FloatingElement>
                
                <h2 className="text-5xl md:text-6xl font-black mb-8">
                  <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Ready to collaborate?
                  </span>
                </h2>
                
                <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
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
                      className="relative px-12 py-5 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 text-white font-bold rounded-2xl transition-all duration-500 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 overflow-hidden text-lg"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10 flex items-center space-x-3">
                        <span>Get In Touch</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
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
                      className="px-12 py-5 bg-gray-800/50 hover:bg-gray-700/50 text-white font-bold rounded-2xl transition-all duration-500 border border-gray-600/50 backdrop-blur-sm hover:border-gray-500/50 text-lg"
                    >
                      <span className="flex items-center space-x-3">
                        <Github className="w-6 h-6" />
                        <span>View GitHub</span>
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