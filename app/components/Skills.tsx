"use client";
import { motion } from 'framer-motion';
import { useState } from 'react';

const skillCategories = [
  {
    CATEGORY_NAME: "Programming Languages",
    SKILLS_LIST: ["Python", "JavaScript", "TypeScript", "SQL", "C++", "MATLAB", "Dart"]
  },
  {
    CATEGORY_NAME: "ML/AI Frameworks",
    SKILLS_LIST: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "MediaPipe", "OpenCV", "YOLO", "SAM", "LangChain", "Hugging Face"]
  },
  {
    CATEGORY_NAME: "Computer Vision",
    SKILLS_LIST: ["Object Detection", "Image Segmentation", "Pose Estimation", "Facial Recognition", "Biometric Analysis", "Physiological Sensing"]
  },
  {
    CATEGORY_NAME: "Data Science",
    SKILLS_LIST: ["Pandas", "NumPy", "SciPy", "Matplotlib", "Seaborn", "Jupyter Notebooks", "Data Visualization", "Statistical Modeling", "Hypothesis Testing"]
  },
  {
    CATEGORY_NAME: "Web / DevOps",
    SKILLS_LIST: ["Next.js", "React", "FastAPI", "Flask", "Node.js", "HTML", "CSS", "Docker", "Kubernetes", "Google Cloud Platform (GCP)", "AWS", "Vercel", "Git", "GitHub Actions", "CI/CD"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].CATEGORY_NAME);

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-20"
    >
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient-primary">
            My Tech Stack
          </span>
        </h2>
        <p className="text-xl text-glass-secondary max-w-2xl mx-auto">
          A comprehensive toolkit spanning AI/ML, web development, and data science
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-12">
          {skillCategories.map((cat) => (
            <motion.button
              key={cat.CATEGORY_NAME}
              variants={itemVariants}
              onClick={() => setActiveTab(cat.CATEGORY_NAME)}
              className={`px-6 py-3 mx-2 mb-4 rounded-glass text-sm font-medium transition-all duration-200 ${
                activeTab === cat.CATEGORY_NAME
                  ? 'bg-primary text-glass-primary shadow-glow'
                  : 'glass-button text-glass-muted hover:text-glass-primary'
              }`}
            >
              {cat.CATEGORY_NAME}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card glass-hover p-8"
        >
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {skillCategories.find(cat => cat.CATEGORY_NAME === activeTab)?.SKILLS_LIST?.map((skill) => (
              <motion.div
                key={skill}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -2 }}
                className="glass-subtle glass-hover text-glass-primary text-sm px-4 py-3 rounded-glass transition-all duration-200 text-center font-medium"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Skills Summary */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 text-center"
        >
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="glass-card glass-hover p-6 transition-all duration-200">
              <div className="text-3xl font-bold text-accent mb-2">5+</div>
              <div className="text-glass-muted">Years of Experience</div>
            </div>
            <div className="glass-card glass-hover p-6 transition-all duration-200">
              <div className="text-3xl font-bold text-secondary mb-2">20+</div>
              <div className="text-glass-muted">Technologies Mastered</div>
            </div>
            <div className="glass-card glass-hover p-6 transition-all duration-200">
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-glass-muted">Projects Completed</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
} 