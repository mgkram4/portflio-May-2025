"use client";
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Brain, Code, Eye, Rocket, Target, Users } from 'lucide-react';
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
      className="group relative bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-xl border border-neutral-700/50 rounded-3xl p-8 hover:border-neutral-500/50 transition-all duration-500 overflow-hidden"
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
        <h3 className="text-2xl font-bold text-neutral-100 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-neutral-400 group-hover:to-neutral-200 group-hover:bg-clip-text transition-all duration-300">
          {title}
        </h3>
        <p className="text-neutral-300 leading-relaxed mb-6">{description}</p>
        
        {stats && (
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-neutral-300">
                  <CountUpNumber end={stat.value} delay={delay + 500 + index * 200} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-neutral-400">{stat.label}</div>
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
  isLast: boolean;
}

const TimelineItem = ({ year, title, description, index, isLast }: TimelineItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2, duration: 0.6 }}
    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} mb-12`}
  >
    <div className={`flex-1 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
      <div className="bg-gradient-to-br from-neutral-900/80 to-neutral-800/80 backdrop-blur-xl border border-neutral-700/50 rounded-2xl p-6 hover:border-neutral-500/30 transition-all duration-300">
        <div className="text-neutral-400 font-bold text-lg mb-2">{year}</div>
        <h4 className="text-xl font-semibold text-neutral-100 mb-3">{title}</h4>
        <p className="text-neutral-300">{description}</p>
      </div>
    </div>
    
    <div className="relative">
      <div className="w-4 h-4 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-full border-4 border-neutral-900"></div>
      {!isLast && <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-20 md:h-24 bg-gradient-to-b from-neutral-500 to-neutral-600"></div>}
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
      description: "Published researcher delivering end-to-end AI systems. Focus on computer vision and biometric analysis, achieving 63%+ accuracy improvements in pose estimation systems. Co-authored IEEE paper and drafted university patent for novel biometric estimation methods.",
      color: "from-neutral-500 to-neutral-600",
      delay: 0.2,
      stats: [
        { value: 1, suffix: "+", label: "IEEE Paper" },
        { value: 63, suffix: "%+", label: "Accuracy Gain" },
        { value: 1, suffix: "+", label: "Patent Drafted" }
      ]
    },
    {
      icon: Code,
      title: "Full-Stack Mastery",
      description: "End-to-end development expertise from AI model deployment (PyTorch/TensorFlow) to production-ready web applications (Next.js/FastAPI). Specialized in modern frameworks (Next.js 14, TypeScript, Tailwind), cloud technologies, and performance optimization (223% mobile performance boost, 65% load time reduction).",
      color: "from-neutral-600 to-neutral-700",
      delay: 0.4,
      stats: [
        { value: 15, suffix: "+", label: "Projects" },
        { value: 223, suffix: "%", label: "Mobile Perf. Boost" },
        { value: 65, suffix: "%", label: "Load Time Cut" }
      ]
    },
    {
      icon: Eye,
      title: "Computer Vision Pioneer",
      description: "Specialized in pose estimation (YOLOv8, MediaPipe, SAM), biometric analysis, and physiological sensing (contactless vital-sign extraction: heart-rate ±5 BPM). Led development of 'Perfect-Pose' real-time biometric pipeline (30 FPS), improving anthropometric accuracy by 63% (height ±5 cm, weight ±3 kg).",
      color: "from-neutral-700 to-neutral-800",
      delay: 0.6,
      stats: [
        { value: 5, suffix: "BPM", label: "HR Accuracy" },
        { value: 63, suffix: "%", label: "Pose Accuracy" },
        { value: 2, suffix: "+", label: "CV Innovations" }
      ]
    }
  ];

  const timeline = [
    {
      year: "Mar 2025 - Present",
      title: "Student Research Assistant - University of La Verne",
      description: "Led development of Perfect-Pose, a real-time biometric pipeline (30 FPS) improving anthropometric accuracy by 63%. Integrated YOLOv8, MediaPipe, SAM for height (±5cm) & weight (±3kg) estimation. Implemented contactless vital-sign extraction (HR ±5 BPM). Built Bayesian RL optimizer cutting hyper-parameter tuning time by 40%. Co-authored IEEE paper and drafted university patent."
    },
    {
      year: "2025",
      title: "IEEE ICHI Publication - Intelligent Perfect Pose",
      description: "Presented novel contactless vital-sign monitoring technique with significant accuracy improvements in biometric analysis. Pre-print DOI: xx/xxxx."
    },
    {
      year: "2025",
      title: "Farm Vision - Hack for Humanity Winner",
      description: "Developed a CNN + NASA POWER API disease-risk predictor achieving 91% accuracy and 100ms latency on FastAPI. Awarded 'Best use of AI/ML'."
    },
    {
      year: "Aug 2024 - Apr 2025",
      title: "Full-Stack Developer - Vista Pacific Capital",
      description: "Developed and shipped a responsive financial-services platform (Next.js 14, TypeScript, Tailwind). Improved mobile performance by 223% and load time by 65% via SSR & code-splitting. Integrated SendGrid for email, improving lead response by 40%. Automated CI/CD with GitHub Actions & Vercel (99.9% uptime)."
    },
    {
      year: "Jun 2024 - Apr 2025",
      title: "Chief Community Officer - Google Developer Group",
      description: "Directed a 7-person dev team releasing a Flutter + Flask healthcare app. Architected a CV pipeline for posture analysis (87% accuracy). Hosted 10 technical workshops for 100+ developers, participated in 3 hackathons, and contributed to one open-source project. Designed UI/UX in Figma."
    },
    {
      year: "Oct 2023 - Apr 2025",
      title: "STEM Instructor - Coding Minds Academy",
      description: "Taught ML, web-dev, and data-science curricula to 80+ students. Guided student projects (pose networks, Alpaca trading simulators); one team won a U17 hackathon. Built project-based modules with React front-end and Flask/ML back-end."
    },
    {
      year: "2024",
      title: "PenguinPal - Cerebral Beach Hacks Winner",
      description: "Award-winning AI-powered email summarizer using Claude API, featuring a secure OAuth stack and a Next.js dashboard."
    },
    {
      year: "Aug 2024 - Aug 2025",
      title: "M.S. Data Analytics - University of La Verne",
      description: "Pursuing advanced studies in data analytics, focusing on machine learning and statistical analysis, to deepen expertise in extracting insights from complex datasets."
    },
    {
      year: "Aug 2021 - May 2024",
      title: "B.S. E-Commerce - University of La Verne",
      description: "Graduated with a Bachelor of Science in E-Commerce, gaining a strong foundation in digital business, online marketing, and web technologies."
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-300 flex items-center justify-center">
        <div className="text-2xl">Loading About...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 overflow-x-hidden relative" suppressHydrationWarning>
      {threeLoaded && <HomeThreeBackground scrollY={scrollY} />}
      {!threeLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 z-0" />
      )}

      <motion.div 
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="relative z-10 pt-24 pb-16"
      >
        <section className="container mx-auto px-6 text-center mb-24 md:mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight"
          >
            <span className="block bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
              Mark Garcia: Innovator
            </span>
            <span className="block bg-gradient-to-r from-neutral-400 via-neutral-300 to-neutral-100 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl mt-2">
              AI Visionary & Builder
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg sm:text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed"
          >
            Driven by a passion for transformative technology, I architect intelligent systems that bridge the gap between human potential and computational power. My journey is one of relentless learning, innovation, and a commitment to creating impactful solutions.
          </motion.p>
        </section>

        <section className="container mx-auto px-6 mb-24 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 md:mb-20"
          >
            <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
              Key Achievements
            </span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <InteractiveCard key={index} {...achievement} delay={index * 0.2 + 0.3} />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 mb-24 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 md:mb-20"
          >
            <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
              My Journey
            </span>
          </motion.h2>
          <div className="relative">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-1 bg-neutral-700/50 rounded-full"></div>
            {timeline.map((item, index) => (
              <TimelineItem key={index} {...item} index={index} isLast={index === timeline.length - 1} />
            ))}
          </div>
        </section>
        
        <section className="container mx-auto px-6 mb-24 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 md:mb-20"
          >
            <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
              Core Values
            </span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Rocket, title: "Innovation", description: "Constantly exploring new frontiers in AI and technology.", color: "from-neutral-500 to-neutral-600" },
              { icon: Target, title: "Impact", description: "Focused on creating solutions that deliver tangible results.", color: "from-neutral-600 to-neutral-700" },
              { icon: Brain, title: "Learning", description: "Committed to continuous growth and knowledge acquisition.", color: "from-neutral-700 to-neutral-800" },
              { icon: Users, title: "Collaboration", description: "Believing in the power of teamwork to achieve greater outcomes.", color: "from-neutral-800 to-neutral-900" },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 + 0.4, duration: 0.6 }}
                className="bg-gradient-to-br from-neutral-800/60 to-neutral-900/60 backdrop-blur-md border border-neutral-700/50 rounded-2xl p-8 text-center hover:border-neutral-500/70 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-6 text-white`}>
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-100 mb-3">{value.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="container mx-auto px-6 mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-center mb-16 md:mb-20"
          >
            <span className="bg-gradient-to-r from-neutral-300 via-neutral-200 to-neutral-100 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </motion.h2>
          <Skills /> 
        </section>

      </motion.div>
    </div>
  );
} 