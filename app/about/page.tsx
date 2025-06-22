"use client";
import { motion } from 'framer-motion';
import { Award, BookOpen, Briefcase, Download, GraduationCap, Star, Target, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

const AboutPage = () => {
  const achievements = [
    {
      icon: Trophy,
      title: "AI Research Excellence",
      description: "Published researcher in computer vision and biometric analysis, achieving over 63% accuracy improvements in pose estimation systems.",
      metrics: "63% improvement in accuracy"
    },
    {
      icon: Briefcase,
      title: "Full-Stack Mastery",
      description: "Expert in developing end-to-end applications, from AI model deployment to production-ready web platforms using modern frameworks.",
      metrics: "223% performance improvement"
    },
    {
      icon: Users,
      title: "Community Leadership",
      description: "Directed development teams, hosted technical workshops, and drove community engagement as a Chief Community Officer.",
      metrics: "100+ developers trained"
    },
  ];

  const timeline = [
    {
      icon: GraduationCap,
      date: "Mar 2025 - Present",
      title: "Student Research Assistant - University of La Verne",
      description: "Leading development of a real-time biometric analysis pipeline, co-authoring an IEEE paper, and drafting a university patent.",
      category: "Research"
    },
    {
      icon: Trophy,
      date: "2025",
      title: "IEEE ICHI Publication",
      description: "Presented a novel contactless vital-sign monitoring technique, significantly improving biometric analysis accuracy.",
      category: "Research"
    },
    {
      icon: Briefcase,
      date: "Aug 2024 - Apr 2025",
      title: "Full-Stack Developer - Vista Pacific Capital",
      description: "Developed and shipped a high-performance financial services platform, improving mobile performance by 223% and reducing load times by 65%.",
      category: "Professional"
    },
    {
      icon: Users,
      date: "Jun 2024 - Apr 2025",
      title: "Chief Community Officer - Google Developer Group",
      description: "Directed a 7-person dev team, hosted 10+ technical workshops for 100+ developers, and architected a computer vision pipeline for posture analysis.",
      category: "Leadership"
    },
    {
      icon: GraduationCap,
      date: "Oct 2023 - Apr 2025",
      title: "STEM Instructor - Coding Minds Academy",
      description: "Taught machine learning and web development to over 80 students, guiding projects that led to a U17 hackathon victory.",
      category: "Education"
    }
  ];

  const education = [
    {
      institution: "University of La Verne",
      degree: "Bachelor of Science in Computer Science",
      period: "2023 - 2025",
      details: ["Focus: AI/ML and Software Engineering", "GPA: 3.8/4.0", "Research: Computer Vision & Biometric Analysis"]
    }
  ];

  const certifications = [
    { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
    { name: "Google Cloud Professional ML Engineer", issuer: "Google Cloud", year: "2024" },
    { name: "TensorFlow Developer Certificate", issuer: "TensorFlow", year: "2023" },
    { name: "React Advanced Patterns", issuer: "Meta", year: "2023" }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Constantly exploring cutting-edge technologies to solve real-world problems"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Believing that the best solutions come from diverse teams working together"
    },
    {
      icon: BookOpen,
      title: "Continuous Learning",
      description: "Committed to staying at the forefront of AI/ML and software development"
    },
    {
      icon: Star,
      title: "Excellence",
      description: "Delivering high-quality solutions that exceed expectations"
    }
  ];

  return (
    <div className="min-h-screen p-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 text-gradient-primary">About Mark Garcia</h1>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl text-glass-secondary mb-8 leading-relaxed">
            I am a passionate AI/ML Engineer and Full-Stack Developer with a proven track record of building innovative solutions 
            and leading technical communities. My work focuses on the intersection of computer vision, machine learning, and 
            user-centric web applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="bg-primary text-glass-primary px-8 py-3 rounded-glass font-semibold shadow-glow hover:shadow-glow transition-all duration-200"
              >
                Let&apos;s Connect
              </motion.button>
            </Link>
            <motion.a
              href="/placeholder-resume.pdf"
              download="Mark_Garcia_Resume.pdf"
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="glass-card glass-hover text-glass-primary px-8 py-3 rounded-glass font-semibold flex items-center gap-2 transition-all duration-200"
            >
              <Download size={20} />
              Download Resume
            </motion.a>
          </div>
        </div>
      </motion.div>

      {/* Key Achievements */}
      <section className="mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-gradient-primary"
        >
          Key Achievements
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="glass-card glass-hover p-8 relative overflow-hidden group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-glass" />
              <item.icon className="h-12 w-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-4 text-glass-primary">{item.title}</h3>
              <p className="text-glass-muted mb-4">{item.description}</p>
              <div className="glass-subtle text-accent px-4 py-2 rounded-glass text-sm font-semibold">
                {item.metrics}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Professional Journey */}
      <section className="mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-gradient-primary"
        >
          Professional Journey
        </motion.h2>
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-8 top-0 h-full w-0.5 bg-glass-border" />
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-12 pl-20 relative"
            >
              <div className="absolute left-0 top-2 flex h-16 w-16 items-center justify-center rounded-full glass-card border-4 border-primary shadow-glow">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <motion.div 
                className="glass-card glass-hover p-8"
                whileHover={{ x: 5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <p className="text-sm text-glass-muted font-medium">{item.date}</p>
                  <span className={`px-3 py-1 rounded-glass text-xs font-medium glass-subtle ${
                    item.category === 'Research' ? 'text-accent' :
                    item.category === 'Professional' ? 'text-glow' :
                    item.category === 'Leadership' ? 'text-secondary' :
                    'text-primary'
                  }`}>
                    {item.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-glass-primary mb-3">{item.title}</h3>
                <p className="text-glass-muted">{item.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-glass-primary flex items-center gap-3">
              <GraduationCap className="text-primary" />
              Education
            </h3>
            {education.map((edu, index) => (
              <div key={index} className="glass-card glass-hover p-6">
                <h4 className="text-xl font-semibold text-glass-primary mb-2">{edu.degree}</h4>
                <p className="text-accent font-medium mb-3">{edu.institution}</p>
                <p className="text-glass-muted text-sm mb-4">{edu.period}</p>
                <ul className="space-y-2">
                  {edu.details.map((detail, i) => (
                    <li key={i} className="text-glass-muted text-sm flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8 text-glass-primary flex items-center gap-3">
              <Award className="text-primary" />
              Certifications
            </h3>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <motion.div
                  key={cert.name}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card glass-hover p-4"
                >
                  <h4 className="font-semibold text-glass-primary">{cert.name}</h4>
                  <p className="text-accent text-sm">{cert.issuer}</p>
                  <span className="text-xs text-glass-muted">{cert.year}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center text-gradient-primary"
        >
          Core Values
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="glass-card glass-hover p-6 text-center"
            >
              <value.icon className="h-10 w-10 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-glass-primary mb-3">{value.title}</h3>
              <p className="text-glass-muted text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Personal Touch */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card glass-hover p-12 text-center max-w-4xl mx-auto border border-glow"
      >
        <h3 className="text-2xl font-bold mb-6 text-glass-primary">Beyond the Code</h3>
        <p className="text-glass-muted mb-8 leading-relaxed">
          When I&apos;m not developing AI models or building web applications, you&apos;ll find me exploring the latest research papers, 
          contributing to open-source projects, or mentoring the next generation of developers. I believe that technology should 
          serve humanity, and I&apos;m passionate about creating solutions that make a positive impact on people&apos;s lives.
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="glass-subtle px-4 py-2 rounded-glass text-glass-primary">🎓 Lifelong Learner</span>
          <span className="glass-subtle px-4 py-2 rounded-glass text-glass-primary">🚀 Innovation Enthusiast</span>
          <span className="glass-subtle px-4 py-2 rounded-glass text-glass-primary">🌟 Mentor</span>
          <span className="glass-subtle px-4 py-2 rounded-glass text-glass-primary">🔬 Research Advocate</span>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage; 