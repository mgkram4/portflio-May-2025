"use client"; // Add client directive
import { motion } from 'framer-motion'; // Import motion
import dynamic from 'next/dynamic'; // Added dynamic import
import { useEffect, useState } from 'react'; // Added useEffect and useState
import ContactForm from '../components/ContactForm'; // Adjusted import path

// Dynamic import for HomeThreeBackground
const HomeThreeBackground = dynamic(() => import('../components/HomeThreeBackground'), {
  ssr: false,
  loading: () => null
});

// Dynamic import for SpinningShape
const SpinningShape = dynamic(() => import('../components/SpinningShape'), {
  ssr: false,
  loading: () => <div className="w-full h-full flex items-center justify-center text-neutral-400">Loading 3D Shape...</div>
});

// Animation variants
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
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

// This is the Contact page
export default function ContactPage() {
  const [scrollY, setScrollY] = useState(0); // Added scrollY state
  const [mounted, setMounted] = useState(false); // Added mounted state
  const [threeLoaded, setThreeLoaded] = useState(false); // Added threeLoaded state

  useEffect(() => { // Added useEffect for background loading and scroll
    setMounted(true);
    setThreeLoaded(true);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      description: "Drop me a line anytime",
      contact: "contact@markgarcia.dev",
      href: "mailto:contact@markgarcia.dev"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      description: "Based in",
      contact: "San Francisco, CA",
      href: "#"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Response Time",
      description: "Usually within",
      contact: "24 hours",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/markgarcia4",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      color: "hover:text-neutral-300"
    },
    {
      name: "GitHub",
      href: "https://github.com/mgkram4",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
      color: "hover:text-neutral-300"
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@MrMrkram18",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
        </svg>
      ),
      color: "hover:text-neutral-300"
    }
  ];

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-300 flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 overflow-x-hidden relative" suppressHydrationWarning> 
      {/* Three.js Background */}
      {threeLoaded && <HomeThreeBackground scrollY={scrollY} />}
      
      {/* Fallback gradient background */}
      {!threeLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 z-0" />
      )}

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h1>
            <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
              Ready to collaborate on your next project? Let&apos;s discuss how we can bring your ideas to life.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Contact Form (MOVED UP) */}
        <motion.div variants={cardVariants} className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                Send a Message
              </span>
            </h2>
            <p className="text-neutral-400">
              Have a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
            </p>
          </div>
          <ContactForm />
        </motion.div>

        {/* NEW Two-Column Layout for 3D Shape and "Let's Connect" */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20 items-start">
          {/* Left Column: Placeholder for Spinning 3D Shape */}
          <motion.div
            variants={cardVariants}
            className="relative min-h-[400px] lg:min-h-[500px] bg-gradient-to-br from-neutral-800/30 to-neutral-900/30 backdrop-blur-sm rounded-xl p-1 border border-neutral-700/50 flex items-center justify-center overflow-hidden"
          >
            <SpinningShape />
          </motion.div>

          {/* Right Column: "Let's Connect" Methods */}
          <motion.div variants={cardVariants} className="space-y-6"> {/* Removed max-w-xl mx-auto from previous centered version */}
            <h2 className="text-3xl font-bold mb-8">
              <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                Let&apos;s Connect
              </span>
            </h2>
            {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
            {contactMethods.map((method, _) => (
              <motion.div
                key={method.title}
                variants={itemVariants}
                className="bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/50 hover:border-neutral-500/50 transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-full flex items-center justify-center text-white">
                    {method.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-100">{method.title}</h3>
                    <p className="text-sm text-neutral-400">{method.description}</p>
                    {method.href.startsWith('mailto:') ? (
                      <a
                        href={method.href}
                        className="text-neutral-300 hover:text-neutral-100 transition-colors"
                      >
                        {method.contact}
                      </a>
                    ) : (
                      <span className="text-neutral-300">{method.contact}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Resume Download Section */}
        <motion.div 
          variants={cardVariants}
          className="relative z-10 bg-gradient-to-r from-neutral-900/20 to-neutral-800/20 rounded-2xl p-8 border border-neutral-500/20 mb-20"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
                Want to Learn More?
              </span>
            </h2>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto">
              Download my resume for a detailed overview of my experience, projects, and technical expertise.
            </p>
            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-neutral-600 to-neutral-700 hover:from-neutral-500 hover:to-neutral-600 text-neutral-100 font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-neutral-500/25"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </motion.a>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={cardVariants} className="relative z-10 text-center">
          <h3 className="text-2xl font-bold mb-8">
            <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
              Follow My Journey
            </span>
          </h3>
          <div className="flex justify-center space-x-8">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`p-4 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 backdrop-blur-sm rounded-full border border-neutral-700/50 hover:border-neutral-500/50 text-neutral-400 ${social.color} transition-all duration-300`}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 