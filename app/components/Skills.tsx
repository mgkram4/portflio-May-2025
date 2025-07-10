"use client";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const skillCategories = [
  {
    name: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "SQL", "C++", "Dart"]
  },
  {
    name: "ML & Vision",
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "Keras", "YOLOv8", "MediaPipe", "OpenCV", "Transformers", "CNNs", "LSTM", "MiDaS", "SAM", "SMPL-X"]
  },
  {
    name: "Web & DevOps",
    skills: ["Next.js", "React", "Flask", "FastAPI", "Flutter", "Node.js", "Git", "Vercel", "AWS", "GCP", "Firebase", "PostgreSQL", "Tailwind CSS", "Framer Motion"]
  },
  {
    name: "Data & LLMs",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Langchain", "OpenAI API", "LLaMA"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].name);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl lg:text-5xl font-bold mb-4"><span className="text-gradient">Technical Skills</span></h2>
        <p className="text-lg text-glass-muted max-w-3xl mx-auto">
          A versatile toolkit for building intelligent, high-performance applications.
        </p>
      </motion.div>

      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-2 bg-dark-elevated p-2 rounded-full border border-glass-border">
          {skillCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveTab(cat.name)}
              className={`relative px-4 sm:px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeTab === cat.name ? 'text-white' : 'text-glass-muted hover:text-glass-primary'
              }`}
            >
              {activeTab === cat.name && (
                <motion.div
                  layoutId="active-skill-tab"
                  className="absolute inset-0 bg-primary rounded-full z-0"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-8 md:p-12"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 text-center"
          >
            {skillCategories.find(cat => cat.name === activeTab)?.skills.map((skill) => (
              <motion.div
                key={skill}
                variants={itemVariants}
                className="bg-dark-elevated text-glass-secondary text-sm font-medium px-4 py-3 rounded-lg border border-transparent hover:border-glass-border transition-colors"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
} 