"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, Github, Mail, Star } from 'lucide-react';
import Link from 'next/link';
import Hero from './components/Hero';
import Skills from './components/Skills';

const ProjectCard = ({ shortTitle, title, category, description, githubUrl, liveDemoUrl, featured = false }: { 
  shortTitle: string; 
  title: string; 
  category: string; 
  description: string;
  githubUrl?: string; 
  liveDemoUrl?: string;
  featured?: boolean;
}) => (
  <motion.div 
    className={`glass-card glass-hover flex flex-col h-full overflow-hidden ${featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.5 }}
  >
    <div className="h-48 bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-6 relative overflow-hidden">
      {featured && (
        <div className="absolute top-4 right-4 glass-subtle px-3 py-1 rounded-glass text-xs font-medium text-accent">
          Featured
        </div>
      )}
      <h2 className="text-3xl font-bold text-glass-primary text-center">{shortTitle}</h2>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="font-semibold text-xl mb-2 text-glass-primary">{title}</h3>
      <p className="text-sm text-accent mb-3 font-medium">{category}</p>
      <p className="text-glass-muted text-sm mb-4 flex-grow">{description}</p>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {githubUrl && (
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer" 
              className="glass-button p-2">
              <Github size={20} className="text-glass-primary" />
            </Link>
          )}
          {liveDemoUrl && (
            <Link href={liveDemoUrl} target="_blank" rel="noopener noreferrer" 
              className="glass-button p-2">
              <Eye size={20} className="text-glass-primary" />
            </Link>
          )}
        </div>
        <Link href="/projects" className="text-accent hover:text-secondary text-sm font-medium flex items-center gap-1 transition-colors duration-200">
          Learn More <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  </motion.div>
);

const TestimonialCard = ({ name, role, company, text, rating }: {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="glass-card glass-hover p-6 h-full transition-all duration-200"
  >
    <div className="flex mb-4">
      {[...Array(rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 text-glow fill-current" />
      ))}
    </div>
    <p className="text-glass-primary mb-4 italic">&ldquo;{text}&rdquo;</p>
    <div>
      <div className="font-semibold text-glass-primary">{name}</div>
      <div className="text-sm text-glass-muted">{role} at {company}</div>
    </div>
  </motion.div>
);

const StatCard = ({ number, label, description }: { number: string; label: string; description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.05 }}
    className="text-center glass-card glass-hover p-6 transition-all duration-200"
  >
    <div className="text-3xl font-bold text-accent mb-2">{number}</div>
    <div className="font-semibold text-glass-primary mb-1">{label}</div>
    <div className="text-sm text-glass-muted">{description}</div>
  </motion.div>
);

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-20 px-8 relative">
        <div className="absolute inset-0 bg-glass-blur backdrop-blur-glass-light"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient-primary">Impact & Achievements</h2>
            <p className="text-lg text-glass-secondary max-w-2xl mx-auto">
              Proven track record of delivering results in AI research and software development
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard 
              number="63%+" 
              label="Accuracy Improvement" 
              description="In biometric analysis systems" 
            />
            <StatCard 
              number="223%" 
              label="Performance Boost" 
              description="Mobile app optimization" 
            />
            <StatCard 
              number="100+" 
              label="Developers Taught" 
              description="Through workshops & courses" 
            />
            <StatCard 
              number="IEEE" 
              label="Published Research" 
              description="Computer vision & AI" 
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-8">
        <Skills />
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-8 relative">
        <div className="absolute inset-0 bg-glass-blur backdrop-blur-glass-light"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient-primary">Featured Projects</h2>
            <p className="text-lg text-glass-secondary max-w-2xl mx-auto">
              A showcase of my latest work in AI/ML, web development, and research
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ProjectCard
              shortTitle="Pose Analysis"
              title="Intelligent Perfect Pose and Health Analysis"
              category="AI Research"
              description="Advanced computer vision system for real-time pose estimation and biometric analysis, achieving 63%+ accuracy improvements over existing methods."
              githubUrl="#"
              liveDemoUrl="#"
              featured={true}
            />
            <ProjectCard
              shortTitle="Farm Vision"
              title="Agricultural Intelligence Platform"
              category="AI/ML"
              description="Award-winning agricultural AI system for crop monitoring and yield prediction using computer vision and machine learning."
              githubUrl="https://github.com/mgkram4/Hack-4-Humanity-2025"
              liveDemoUrl="https://devpost.com/software/farmer-vision"
            />
            <ProjectCard
              shortTitle="Vista Capital"
              title="Financial Services Platform"
              category="Full-Stack Web"
              description="High-performance fintech platform with 223% mobile performance improvement and 65% reduction in load times."
              githubUrl="https://github.com/mgkram4/Vista-Pacific-Capital"
              liveDemoUrl="https://www.vistapacificcapital.com/"
            />
          </div>

          <div className="text-center">
            <Link href="/projects">
              <motion.button 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="glass-strong glass-hover px-8 py-3 rounded-glass font-semibold flex items-center gap-2 mx-auto text-glass-primary transition-all duration-200"
              >
                View All Projects <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4 text-gradient-primary">What People Say</h2>
            <p className="text-lg text-glass-secondary max-w-2xl mx-auto">
              Feedback from colleagues, mentors, and collaborators
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Dr. Sarah Johnson"
              role="Research Supervisor"
              company="University of La Verne"
              text="Mark's work on biometric analysis has been exceptional. His innovative approach led to significant breakthroughs in our research."
              rating={5}
            />
            <TestimonialCard
              name="Alex Chen"
              role="CTO"
              company="Vista Pacific Capital"
              text="Mark delivered outstanding results, improving our platform's performance by over 200%. His technical expertise is remarkable."
              rating={5}
            />
            <TestimonialCard
              name="Maria Rodriguez"
              role="Student"
              company="Coding Minds Academy"
              text="Mark is an incredible instructor who made complex AI concepts accessible. His teaching helped our team win the hackathon!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-20 backdrop-blur-glass-heavy"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gradient-primary">Ready to Work Together?</h2>
            <p className="text-lg text-glass-secondary max-w-2xl mx-auto">
               I&apos;m actively seeking new opportunities in AI/ML engineering and full-stack development. 
               Let&apos;s discuss how I can contribute to your team&apos;s success.
             </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <motion.button 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="bg-primary text-glass-primary px-8 py-3 rounded-glass font-semibold flex items-center gap-2 shadow-glow hover:shadow-glow transition-all duration-200"
                >
                  <Mail size={20} />
                  Get In Touch
                </motion.button>
              </Link>
              
              <motion.a
                href="/placeholder-resume.pdf"
                download="Mark_Garcia_Resume.pdf"
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="glass-strong glass-hover text-glass-primary px-8 py-3 rounded-glass font-semibold flex items-center gap-2 transition-all duration-200"
              >
                <Download size={20} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}