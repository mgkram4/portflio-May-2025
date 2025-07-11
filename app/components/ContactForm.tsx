"use client";
import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Animation variants (can be defined globally or passed as props if preferred)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Extract form data
      const formData = new FormData(event.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
        company: formData.get('company') as string || '', // Optional field
      };

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form
        event.currentTarget.reset();
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to send message. Please try again or contact me directly at mark.garcia4@laverne.edu');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-12 px-8 glass-card glass-hover border border-glow"
      >
        <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-glass-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-3xl font-bold text-glass-primary mb-4">Message Sent!</h3>
        <p className="text-glass-secondary text-lg mb-6">
          Thank you for reaching out. I&apos;ll get back to you within 24 hours.
        </p>
        <motion.button
          onClick={() => setSubmitted(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-glass-primary px-6 py-3 rounded-glass font-medium shadow-glow hover:shadow-glow transition-all duration-200"
        >
          Send Another Message
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto glass-card glass-hover p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <motion.div variants={itemVariants}>
          <label htmlFor="name" className="block text-sm font-medium text-glass-muted mb-2">
            Full Name *
          </label>
          <input 
            type="text" 
            name="name" 
            id="name" 
            required 
            className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted"
            placeholder="Your full name"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <label htmlFor="email" className="block text-sm font-medium text-glass-muted mb-2">
            Email Address *
          </label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            required 
            className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted"
            placeholder="your.email@example.com"
          />
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mb-6">
        <label htmlFor="company" className="block text-sm font-medium text-glass-muted mb-2">
          Company/Organization
        </label>
        <input 
          type="text" 
          name="company" 
          id="company" 
          className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted"
          placeholder="Your company or organization (optional)"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <label htmlFor="subject" className="block text-sm font-medium text-glass-muted mb-2">
          Subject *
        </label>
        <input 
          type="text" 
          name="subject" 
          id="subject" 
          required 
          className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted"
          placeholder="What would you like to discuss?"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-glass-muted mb-2">
          Message *
        </label>
        <textarea 
          name="message" 
          id="message" 
          rows={6} 
          required 
          className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted resize-none"
          placeholder="Tell me about your project, ideas, or how we can collaborate..."
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <motion.button 
          type="submit" 
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className="w-full flex justify-center items-center py-4 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:from-glass-base disabled:to-glass-base text-glass-primary font-medium rounded-glass transition-all duration-200 shadow-glow hover:shadow-glow disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-glass-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Message
            </>
          )}
        </motion.button>
      </motion.div>

      <motion.p variants={itemVariants} className="text-center text-glass-muted text-sm mt-4">
        * Required fields. I typically respond within 24 hours.
      </motion.p>
    </motion.form>
  );
} 