"use client";
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-foreground">Get In Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I&apos;m always excited to connect with new people. Whether you have a project idea, a question, or just want to say hello, feel free to reach out.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-foreground">Send a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">Name</label>
              <motion.input whileFocus={{ scale: 1.02 }} type="text" id="name" className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">Email</label>
              <motion.input whileFocus={{ scale: 1.02 }} type="email" id="email" className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">Message</label>
              <motion.textarea whileFocus={{ scale: 1.02 }} id="message" rows={5} className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"></motion.textarea>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-6 rounded-lg transition-colors duration-300">
              Send
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold mb-6 text-foreground">Connect with Me</h2>
          <motion.a whileHover={{ scale: 1.03, x: 5 }} href="mailto:mark.garcia4@laverne.edu" className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
            <Mail className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground">mark.garcia4@laverne.edu</p>
            </div>
          </motion.a>
          <motion.a whileHover={{ scale: 1.03, x: 5 }} href="https://www.linkedin.com/in/markgarcia4/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
            <Linkedin className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">LinkedIn</h3>
              <p className="text-muted-foreground">linkedin.com/in/markgarcia4</p>
            </div>
          </motion.a>
          <motion.a whileHover={{ scale: 1.03, x: 5 }} href="https://github.com/mgkram4" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:bg-muted transition-colors">
            <Github className="h-6 w-6 text-primary" />
            <div>
              <h3 className="font-semibold text-foreground">GitHub</h3>
              <p className="text-muted-foreground">github.com/mgkram4</p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 