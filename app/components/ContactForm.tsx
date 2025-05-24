"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Animation variants (can be defined globally or passed as props if preferred)
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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic form data extraction (can be expanded)
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };
    console.log("Form data:", data);

    // Simulate form submission
    // Replace with actual submission logic (e.g., API call)
    // For now, just show a success message
    setSubmitted(true);
    // alert("Thanks for reaching out! Your message has been (simulated) sent.");
    // event.currentTarget.reset(); // Optionally reset form
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8 px-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg shadow-md"
      >
        <h3 className="text-2xl font-semibold text-green-700 dark:text-green-300 mb-3">Thank You!</h3>
        <p className="text-green-600 dark:text-green-400">Your message has been successfully (simulated) sent. I&apos;ll get back to you soon.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          required 
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          required 
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
        <textarea 
          name="message" 
          id="message" 
          rows={5} 
          required 
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary dark:bg-gray-700 dark:text-white transition-colors resize-none"
        ></textarea>
      </motion.div>
      <motion.div variants={itemVariants}>
        <button 
          type="submit" 
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-300"
        >
          Send Message
        </button>
      </motion.div>
    </motion.form>
  );
} 