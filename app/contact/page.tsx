"use client";
import { motion } from 'framer-motion';
import { Calendar, Github, Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-gradient-primary">Let&apos;s Connect</h1>
        <p className="text-lg text-glass-secondary max-w-2xl mx-auto">
          Ready to discuss AI/ML projects, research collaborations, or new opportunities? 
          I&apos;d love to hear from you. Let&apos;s create something amazing together.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Quick Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <motion.a 
            href="mailto:mark.garcia4@laverne.edu"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card glass-hover p-6 text-center group"
          >
            <Mail className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-glass-primary mb-2">Email</h3>
            <p className="text-sm text-glass-muted">mark.garcia4@laverne.edu</p>
          </motion.a>

          <motion.a 
            href="https://www.linkedin.com/in/markgarcia4/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card glass-hover p-6 text-center group"
          >
            <Linkedin className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-glass-primary mb-2">LinkedIn</h3>
            <p className="text-sm text-glass-muted">Professional Network</p>
          </motion.a>

          <motion.a 
            href="https://github.com/mgkram4"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card glass-hover p-6 text-center group"
          >
            <Github className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-glass-primary mb-2">GitHub</h3>
            <p className="text-sm text-glass-muted">Code Portfolio</p>
          </motion.a>

          <motion.a 
            href="https://calendly.com/markgarcia" // Replace with actual scheduling link
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card glass-hover p-6 text-center group"
          >
            <Calendar className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-glass-primary mb-2">Schedule Call</h3>
            <p className="text-sm text-glass-muted">30min Meeting</p>
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card glass-hover p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-glass-primary">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-glass-muted mb-2">
                    Name *
                  </label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }} 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-glass-muted mb-2">
                    Email *
                  </label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }} 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-glass-muted mb-2">
                    Company/Organization
                  </label>
                  <motion.input 
                    whileFocus={{ scale: 1.02 }} 
                    type="text" 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-glass-muted mb-2">
                    Subject *
                  </label>
                  <motion.select
                    whileFocus={{ scale: 1.02 }}
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full glass-input px-4 py-3 text-glass-primary"
                  >
                    <option value="">Select a topic</option>
                    <option value="job-opportunity">Job Opportunity</option>
                    <option value="collaboration">Research Collaboration</option>
                    <option value="consulting">Consulting Project</option>
                    <option value="speaking">Speaking Engagement</option>
                    <option value="other">Other</option>
                  </motion.select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-glass-muted mb-2">
                  Message *
                </label>
                <motion.textarea 
                  whileFocus={{ scale: 1.02 }} 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full glass-input px-4 py-3 text-glass-primary placeholder-glass-muted resize-none"
                  placeholder="Tell me about your project, opportunity, or how I can help..."
                />
              </div>

              <motion.button 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
                type="submit" 
                disabled={isSubmitting}
                className={`w-full font-semibold py-3 px-6 rounded-glass transition-all duration-200 flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'glass-subtle text-glass-muted cursor-not-allowed' 
                    : 'bg-primary hover:shadow-glow text-glass-primary'
                }`}
              >
                <Send size={20} />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-card border border-glow bg-glass-base rounded-glass text-center"
                >
                  <span className="text-glow text-lg">✅</span>
                  <div className="text-glass-primary font-medium mt-2">Message sent successfully!</div>
                  <div className="text-glass-muted text-sm">I&apos;ll get back to you within 24 hours.</div>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 glass-card border border-secondary bg-glass-base rounded-glass text-center"
                >
                  <span className="text-secondary text-lg">❌</span>
                  <div className="text-glass-primary font-medium mt-2">Failed to send message</div>
                  <div className="text-glass-muted text-sm">
                    Please try again or contact me directly at{' '}
                    <a href="mailto:mark.garcia4@laverne.edu" className="text-accent hover:text-secondary transition-colors underline">
                      mark.garcia4@laverne.edu
                    </a>
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information & Availability */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Availability */}
            <div className="glass-card glass-hover p-8 border border-glow">
              <h3 className="text-xl font-bold mb-4 text-glass-primary">Current Availability</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-glow rounded-full animate-pulse"></div>
                  <span className="text-glass-primary font-medium">Available for new opportunities</span>
                </div>
                <p className="text-glass-muted">
                  Currently seeking full-time positions in AI/ML Engineering and Full-Stack Development. 
                  Also open to research collaborations and consulting projects.
                </p>
              </div>
            </div>

            {/* Response Time */}
            <div className="glass-card glass-hover p-6">
              <h3 className="text-lg font-semibold mb-4 text-glass-primary">Response Time</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-glass-muted">Email</span>
                  <span className="text-glass-primary font-medium">Within 24 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-glass-muted">LinkedIn</span>
                  <span className="text-glass-primary font-medium">Within 48 hours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-glass-muted">Urgent matters</span>
                  <span className="text-glass-primary font-medium">Same day</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="glass-card glass-hover p-6">
              <h3 className="text-lg font-semibold mb-4 text-glass-primary flex items-center gap-2">
                <MapPin size={20} />
                Location & Work Preferences
              </h3>
              <div className="space-y-3 text-glass-muted">
                <p>📍 Based in La Verne, CA (Los Angeles Area)</p>
                <p>🌐 Open to remote work worldwide</p>
                <p>✈️ Available for on-site collaboration</p>
                <p>🏢 Prefer hybrid/flexible arrangements</p>
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="glass-card glass-hover p-6">
              <h3 className="text-lg font-semibold mb-4 text-glass-primary">Areas of Interest</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-sm glass-subtle px-3 py-2 rounded-glass text-center text-glass-primary">Computer Vision</div>
                <div className="text-sm glass-subtle px-3 py-2 rounded-glass text-center text-glass-primary">ML Engineering</div>
                <div className="text-sm glass-subtle px-3 py-2 rounded-glass text-center text-glass-primary">Full-Stack Dev</div>
                <div className="text-sm glass-subtle px-3 py-2 rounded-glass text-center text-glass-primary">Research</div>
                <div className="text-sm glass-subtle px-3 py-2 rounded-glass text-center text-glass-primary">AI Ethics</div>
                <div className="text-sm glass-subtle px-3 py-2 rounded-glass text-center text-glass-primary">Tech Leadership</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 