"use client";
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
    },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');

  useEffect(() => {
    setMounted(true);
    const root = window.document.documentElement;
    setCurrentTheme(root.classList.contains('dark') ? 'dark' : 'light');

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new MutationObserver(() => {
      setCurrentTheme(root.classList.contains('dark') ? 'dark' : 'light');
    });
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    }
  }, []);

  const toggleTheme = () => {
    const htmlEl = document.documentElement;
    if (htmlEl.classList.contains('dark')) {
      htmlEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`w-full fixed top-0 bg-white/70 backdrop-blur-sm dark:bg-gray-900/70 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md border-b border-gray-200 dark:border-gray-700' : 'shadow-none'}`}>
        <>
          <motion.nav 
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between"
          >
            <motion.div variants={navItemVariants}>
              <Link href="/" className="text-xl font-bold">YourName</Link>
            </motion.div>
            <motion.div variants={navContainerVariants} className="hidden md:flex space-x-6 items-center">
              <motion.div variants={navItemVariants}><Link href="/">Home</Link></motion.div>
              <motion.div variants={navItemVariants}><Link href="/about">About</Link></motion.div>
              <motion.div variants={navItemVariants}><Link href="/projects">Projects</Link></motion.div>
              <motion.div variants={navItemVariants}><Link href="/contact">Contact</Link></motion.div>
              <motion.button variants={navItemVariants} onClick={toggleTheme} className="ml-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
                {currentTheme === 'dark' ? '☀️' : '🌙'}
              </motion.button>
            </motion.div>
            {/* Mobile hamburger */}
            <motion.button variants={navItemVariants} className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </motion.button>
          </motion.nav>
          {/* Mobile menu panel */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div 
                variants={mobileMenuVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="md:hidden bg-white dark:bg-gray-800 px-4 py-2 space-y-2 shadow-lg rounded-b-lg"
              >
                <Link href="/" onClick={() => setMenuOpen(false)} className="block py-2">Home</Link>
                <Link href="/about" onClick={() => setMenuOpen(false)} className="block py-2">About</Link>
                <Link href="/projects" onClick={() => setMenuOpen(false)} className="block py-2">Projects</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="block py-2">Contact</Link>
                <button onClick={() => { toggleTheme(); setMenuOpen(false); }} className="w-full text-left mt-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Toggle Theme ({currentTheme === 'dark' ? 'Light' : 'Dark'})
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
    </motion.header>
  );
} 