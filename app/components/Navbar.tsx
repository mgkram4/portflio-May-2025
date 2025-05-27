"use client";

import { Download, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsHexagonFill } from 'react-icons/bs';

const ModernNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      
      // Calculate scroll progress
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? Math.min(100, (scrollY / documentHeight) * 100) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient]);

  const navItems = [
    { name: 'Home', href: '/', id: 'home' },
    { name: 'About', href: '/about', id: 'about' },
    { name: 'Projects', href: '/projects', id: 'projects' },
    { name: 'Contact', href: '/contact', id: 'contact' },
  ];

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/80 backdrop-blur-xl border-b border-neutral-700/50 shadow-lg shadow-neutral-800/10' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-neutral-600 to-neutral-500 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500"></div>
              <Link 
                href="/"
                className="relative text-2xl font-bold bg-gradient-to-r from-neutral-300 to-neutral-100 bg-clip-text text-transparent hover:from-neutral-200 hover:to-white transition-all duration-300 flex items-center"
              >
                <BsHexagonFill className="h-8 w-8 text-neutral-400 group-hover:text-neutral-200 transition-all duration-300" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 group ${
                    isActiveRoute(item.href)
                      ? 'text-neutral-100'
                      : 'text-neutral-400 hover:text-neutral-100'
                  }`}
                >
                  {/* Active indicator */}
                  {isActiveRoute(item.href) && (
                    <div className="absolute inset-0 bg-neutral-700/30 rounded-full border border-neutral-600/40 backdrop-blur-sm"></div>
                  )}
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-neutral-700/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>

            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Social Links */}
              <div className="flex items-center space-x-2">
                {[
                  { icon: Github, href: "https://github.com/mgkram4", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mark-garcia-mg18/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:mark.garcia4@laverne.edu", label: "Email" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="relative p-2 text-neutral-500 hover:text-neutral-200 rounded-full transition-all duration-300 group hover:scale-110"
                    aria-label={label}
                  >
                    <div className="absolute inset-0 bg-neutral-700/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Icon size={18} className="relative z-10" />
                  </a>
                ))}
              </div>

              {/* Resume Download */}
              <a
                href="/placeholder-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative px-6 py-2 bg-gradient-to-r from-neutral-600 to-neutral-700 hover:from-neutral-500 hover:to-neutral-600 text-neutral-100 text-sm font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-neutral-700/25 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <Download size={16} />
                  <span>Resume</span>
                </div>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2 text-neutral-300 hover:text-white rounded-lg transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-neutral-700/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`md:hidden transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-black/95 backdrop-blur-xl border-t border-neutral-700/50 px-6 py-8">
            {/* Mobile Navigation Items */}
            <div className="space-y-1 mb-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-all duration-300 ${
                    isActiveRoute(item.href)
                      ? 'text-neutral-100 bg-neutral-700/40 border border-neutral-600/50'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Social Links */}
            <div className="border-t border-neutral-700/50 pt-6">
              <div className="flex justify-center space-x-6 mb-6">
                {[
                  { icon: Github, href: "https://github.com/mgkram4", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mark-garcia-mg18/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:mark.garcia4@laverne.edu", label: "Email" }
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-3 text-neutral-500 hover:text-neutral-200 rounded-full border border-neutral-700/50 hover:border-neutral-500/70 transition-all duration-300 hover:scale-105"
                    aria-label={label}
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="space-y-3">
                <a
                  href="/placeholder-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-4 py-3 bg-gradient-to-r from-neutral-600 to-neutral-700 hover:from-neutral-500 hover:to-neutral-600 text-neutral-100 font-medium rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Download size={18} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-neutral-800/50 z-40">
        <div 
          className="h-full bg-gradient-to-r from-neutral-500 to-neutral-300 transition-all duration-300 ease-out"
          style={{
            width: `${scrollProgress}%`
          }}
        />
      </div>
    </>
  );
};

export default ModernNavbar;