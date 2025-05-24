"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const skillsData = {
  "Languages": ["Python", "JavaScript/TypeScript", "SQL", "C++"],
  "Frameworks & Libraries": ["Next.js", "Node.js", "React", "FastAPI", "Express.js", "Tailwind CSS"],
  "ML/Data Science": ["TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Keras"],
  "Cloud & DevOps": ["AWS (EC2, S3, Lambda, SageMaker)", "Docker", "Kubernetes", "CI/CD (GitHub Actions)", "Terraform"],
  "Databases": ["PostgreSQL", "MongoDB", "Redis"],
  "Other Tools": ["Git & GitHub", "Jupyter Notebooks", "VS Code"]
};

const categories = Object.keys(skillsData);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Faster stagger for many items
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.4, // Slightly faster item animation
    },
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(categories[0]);

  return (
    <motion.section 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="py-16"
    >
      <motion.h2 variants={itemVariants} className="text-3xl font-semibold text-center mb-12">My Tech Stack</motion.h2>
      <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
        <ul role="tablist" className="flex flex-wrap border-b border-gray-300 dark:border-gray-700 overflow-x-auto">
          {categories.map(cat => (
            <motion.li variants={itemVariants} key={cat} className="-mb-px mr-1 last:mr-0 flex-auto text-center">
              <button 
                role="tab" 
                aria-selected={activeTab === cat}
                className={`text-sm font-medium px-5 py-3 block leading-normal 
                            ${activeTab === cat 
                              ? 'text-primary border-b-2 border-primary' 
                              : 'text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400'}
                          `}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            </motion.li>
          ))}
        </ul>
        <motion.div 
          key={activeTab} // Animate when tab changes
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {skillsData[activeTab as keyof typeof skillsData].map(item => (
              <motion.span 
                key={item} 
                variants={itemVariants} // Animate individual skills
                className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm px-3 py-2 rounded-md shadow-sm text-center"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
} 