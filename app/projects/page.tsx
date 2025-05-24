"use client";
import { motion } from 'framer-motion';
import React from 'react';
import ProjectCard from '../components/ProjectCard'; // Adjusted import path

// Sample Project Data (replace with your actual projects)
const projects = [
  {
    title: "Real-time NLP Dashboard",
    shortDescription: "Live social media sentiment analysis.",
    imageUrl: "/images/placeholder-project-1.jpg", // Replace with actual image path if available
    // videoUrl: "https://www.youtube.com/embed/VIDEO_ID_1",
    detailedDescription: {
      situation: "Needed real-time insights from social media streams for brand monitoring.",
      task: "Develop a dashboard with live NLP analysis for sentiment and topic extraction.",
      action: "Utilized WebSockets for real-time data ingestion, a fine-tuned BERT model for sentiment classification, and Topic Modeling (LDA) for identifying key themes. The frontend was built with React and D3.js for visualizations.",
      result: "Delivered a dashboard providing sub-second latency insights, improving brand engagement tracking by 40%."
    },
    techStack: ["React", "WebSockets", "Python", "BERT", "FastAPI", "D3.js", "AWS"],
    githubUrl: "https://github.com/yourusername/nlp-dashboard",
    liveDemoUrl: undefined, // or a link to a live demo
    paperUrl: undefined // or a link to a paper
  },
  {
    title: "Scalable MLOps Pipeline",
    shortDescription: "Automated ML model training and deployment.",
    imageUrl: "/images/placeholder-project-2.jpg", // Replace with actual image path
    detailedDescription: {
      situation: "Manual model retraining and deployment processes were slow and error-prone.",
      task: "Design and implement an end-to-end MLOps pipeline for automated training, versioning, and deployment of ML models.",
      action: "Leveraged Kubeflow and Kubernetes for orchestrating ML workflows, Docker for containerization, Jenkins for CI/CD, and Seldon Core for model serving. Implemented data and model versioning with DVC and MLflow.",
      result: "Reduced model deployment time from days to hours, and improved model performance monitoring and reproducibility."
    },
    techStack: ["Kubeflow", "Kubernetes", "Docker", "Jenkins", "MLflow", "Python", "Seldon Core"],
    githubUrl: "https://github.com/yourusername/mlops-pipeline",
    liveDemoUrl: undefined,
    paperUrl: undefined
  },
  // Add more projects here
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ProjectsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-16"
    >
      <motion.h1 variants={itemVariants} className="text-4xl font-bold text-center mb-4">My Projects</motion.h1>
      <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-400 text-center mb-12">
        Here are some of the projects Ive worked on. Hover over a card for more details.
      </motion.p>
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} variants={itemVariants} />
        ))}
      </motion.div>
    </motion.div>
  );
} 