"use client";
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy, Users } from 'lucide-react';

const AboutPage = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "AI Research Excellence",
      description: "Published researcher in computer vision and biometric analysis, achieving over 63% accuracy improvements in pose estimation systems.",
    },
    {
      icon: Briefcase,
      title: "Full-Stack Mastery",
      description: "Expert in developing end-to-end applications, from AI model deployment to production-ready web platforms using modern frameworks.",
    },
    {
      icon: Users,
      title: "Community Leadership",
      description: "Directed development teams, hosted technical workshops, and drove community engagement as a Chief Community Officer.",
    },
  ];

  const timeline = [
    {
      icon: GraduationCap,
      date: "Mar 2025 - Present",
      title: "Student Research Assistant - University of La Verne",
      description: "Leading development of a real-time biometric analysis pipeline, co-authoring an IEEE paper, and drafting a university patent.",
    },
    {
      icon: Trophy,
      date: "2025",
      title: "IEEE ICHI Publication",
      description: "Presented a novel contactless vital-sign monitoring technique, significantly improving biometric analysis accuracy.",
    },
    {
      icon: Briefcase,
      date: "Aug 2024 - Apr 2025",
      title: "Full-Stack Developer - Vista Pacific Capital",
      description: "Developed and shipped a high-performance financial services platform, improving mobile performance by 223% and reducing load times by 65%.",
    },
    {
      icon: Users,
      date: "Jun 2024 - Apr 2025",
      title: "Chief Community Officer - Google Developer Group",
      description: "Directed a 7-person dev team, hosted 10+ technical workshops for 100+ developers, and architected a computer vision pipeline for posture analysis.",
    },
    {
      icon: GraduationCap,
      date: "Oct 2023 - Apr 2025",
      title: "STEM Instructor - Coding Minds Academy",
      description: "Taught machine learning and web development to over 80 students, guiding projects that led to a U17 hackathon victory.",
    }
  ];

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl font-bold mb-4 text-foreground">About Me</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-12">
          I am a passionate AI/ML Engineer and Full-Stack Developer with a proven track record of building innovative solutions and leading technical communities. My work focuses on the intersection of computer vision, machine learning, and user-centric web applications.
        </p>
      </motion.div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-foreground">My Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-card p-6 rounded-lg border border-border"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <item.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-8 text-foreground">My Journey</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="mb-8 pl-12 relative"
            >
              <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <item.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <motion.div 
                className="bg-card p-6 rounded-lg border border-border"
                whileHover={{ x: 5 }}
              >
                <p className="text-sm text-muted-foreground mb-1">{item.date}</p>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 