"use client";
import { motion } from 'framer-motion';
import { Calendar, Github, Linkedin, Mail, Send } from 'lucide-react';
import { useState } from 'react';

const contactMethods = [
    {
        icon: Mail,
        title: "Email",
        value: "mark@markgarcia.dev",
        href: "mailto:mark@markgarcia.dev"
    },
    {
        icon: Linkedin,
        title: "LinkedIn",
        value: "in/mark-garcia-cs",
        href: "https://linkedin.com/in/mark-garcia-cs"
    },
    {
        icon: Github,
        title: "GitHub",
        value: "mgkram4",
        href: "https://github.com/mgkram4"
    },
    {
        icon: Calendar,
        title: "Schedule a Call",
        value: "30-min meeting",
        href: "https://calendly.com/mark-garcia-cs"
    },
]

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                >
                    <span className="text-gradient">Get In Touch</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                >
                    Ready to discuss AI/ML projects, research collaborations, or new opportunities? I&apos;d love to hear from you.
                </motion.p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                    <h2 className="text-3xl font-bold text-foreground mb-8">Contact Form</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <InputField id="name" label="Name" value={formData.name} onChange={handleChange} required />
                            <InputField id="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>
                        <InputField id="subject" label="Subject" value={formData.subject} onChange={handleChange} required />
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-glass-muted mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full glass-input"
                                placeholder="Tell me about your project..."
                            />
                        </div>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary hover:bg-secondary text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-secondary/30 flex items-center justify-center gap-2 disabled:opacity-50"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Send size={20} />
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.button>
                        
                        {submitStatus === 'success' && (
                            <p className="text-center text-green-400">Message sent successfully!</p>
                        )}
                        {submitStatus === 'error' && (
                            <p className="text-center text-red-400">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                    <h2 className="text-3xl font-bold text-glass-primary mb-8">Other Ways to Connect</h2>
                    <div className="space-y-6">
                        {contactMethods.map((method) => (
                            <a
                                key={method.title}
                                href={method.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="glass-card glass-hover flex items-center p-6 gap-6"
                            >
                                <div className="bg-primary/10 p-4 rounded-lg">
                                    <method.icon className="h-8 w-8 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-glass-primary">{method.title}</h3>
                                    <p className="text-glass-muted">{method.value}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    </div>
  );
};

interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField = ({ id, label, type = "text", value, onChange, required = false }: InputFieldProps) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-glass-muted mb-2">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-dark-elevated border border-glass-border rounded-lg p-3 text-glass-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
            placeholder={label}
        />
    </div>
);

export default ContactPage; 