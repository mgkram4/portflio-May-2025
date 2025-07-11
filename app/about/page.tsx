"use client";
import { motion } from 'framer-motion';
import { Award, Briefcase, Download, GraduationCap, LucideProps, Star, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const achievements = [
  {
    icon: Trophy,
    title: "AI-Powered Biometric Systems",
    description: "Architected a real-time biometric analysis pipeline ('BIO-SCAN') using YOLOv8, MediaPipe, and SMPL-X, leading to a publication at IEEE ICHI 2025.",
  },
  {
    icon: Briefcase,
    title: "Advanced ML Model Development",
    description: "Engineered a Transformer model for pose estimation, boosting accuracy from a baseline of 29% to an impressive 94%.",
  },
  {
    icon: Star,
    title: "Full-Stack & Performance Optimization",
    description: "Led the modernization of a legacy finance portal, improving its Google Lighthouse score by 107% (from 45 to 93).",
  },
];

type TimelineItem = {
  icon: React.ComponentType<LucideProps>;
  date: string;
  title: string;
  company: string;
  description: string;
};

const timeline: TimelineItem[] = [
  {
    icon: GraduationCap,
    date: "Mar 2025 – Present",
    title: "Student Research Assistant",
    company: "University of La Verne",
    description: "Architected the ”BIO-SCAN” biometric pipeline using YOLOv8, MediaPipe, and more. Built an ensemble ML system and implemented real-time vitals monitoring.",
  },
  {
    icon: Award,
    date: "IEEE ICHI 2025",
    title: "Intelligent Perfect Pose and Health Analysis",
    company: "Publication",
    description: "Accepted as a Poster and Demo Abstract at IEEE ICHI 2025. The work will be published in the prestigious IEEE Xplore digital library.",
  },
  {
    icon: Users,
    date: "Jun 2024 – Apr 2025",
    title: "Chief Community Officer",
    company: "Google Developer Group",
    description: "Led the 'Perfect Pose' ML pipeline upgrade with a Transformer, increasing accuracy from 29% to 94%. Won 'Best Use of AI' for two distinct projects.",
  },
  {
    icon: Briefcase,
    date: "Aug 2024 – Mar 2025",
    title: "Full-Stack Developer",
    company: "Vista Pacific Capital",
    description: "Revamped a legacy financing portal, which resulted in improving the Lighthouse Score from 45 to 93 (a 107% gain) and cut FCP by 70%.",
  },
];

const education = [
  {
    institution: "University of La Verne",
    degree: "Master of Science, Data Analytics",
    period: "Aug 2024 – Aug 2025 (Exp.)",
  },
  {
    institution: "University of La Verne",
    degree: "Bachelor of Science, E-Commerce",
    period: "Aug 2021 – May 2024",
  },
];

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 sm:pt-32"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="text-center mb-24">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            <span className="text-gradient">About Me</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            I&apos;m a Full-Stack AI Engineer passionate about building intelligent systems that solve real-world problems. My expertise lies at the intersection of computer vision, machine learning, and scalable web development.
          </motion.p>
        </header>

        {/* Key Achievements */}
        <section className="mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16"><span className="text-gradient">Key Achievements</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 flex flex-col items-start"
              >
                <div className="bg-primary/10 p-3 rounded-lg mb-6">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground flex-grow">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Professional Journey */}
        <section className="mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16"><span className="text-gradient">Professional Journey</span></h2>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 bg-glass-border -translate-x-1/2" />
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                className="mb-12"
              >
                <div className="flex items-center w-full">
                  <div className="hidden sm:flex w-1/2">
                    {index % 2 === 0 && <TimelineCard item={item} />}
                  </div>
                  <div className="z-10 bg-background p-2 rounded-full border-2 border-primary">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="w-full sm:w-1/2 sm:pl-8 pl-8">
                     {index % 2 !== 0 && <TimelineCard item={item} />}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16"><span className="text-gradient">Education</span></h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {education.map((edu) => (
              <div key={edu.degree} className="glass-card p-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                        <GraduationCap className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-foreground">{edu.institution}</h3>
                        <p className="text-muted-foreground">{edu.degree}</p>
                    </div>
                </div>
                <p className="text-right text-sm font-medium text-accent">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-16">
          <h2 className="text-3xl font-bold mb-4">Interested in working together?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious team.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" passHref>
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
              >
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
          </div>
        </section>

      </div>
    </motion.div>
  );
};

const TimelineCard = ({ item }: { item: TimelineItem }) => (
    <div className="glass-card p-6">
      <p className="text-sm text-accent mb-2">{item.date}</p>
      <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{item.company}</p>
      <p className="text-sm text-muted-foreground">{item.description}</p>
    </div>
);


export default AboutPage; 