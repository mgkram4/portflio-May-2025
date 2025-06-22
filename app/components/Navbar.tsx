"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    Briefcase,
    ChevronDown,
    ChevronRight,
    Download,
    Github,
    Home,
    Linkedin,
    Mail,
    Menu,
    Moon,
    PenTool,
    Sun,
    User,
    X
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from "react";
import ClientOnly from "./ClientOnly";

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: { y: -20, opacity: 0 },
};

const Navbar: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between glass-nav rounded-glass px-4 md:hidden"
      >
        <Link href="/" className="flex items-center gap-3 group">
          {/* Professional Mobile Logo */}
          <div className="relative w-8 h-8 glass-card p-0.5 group-hover:shadow-glow transition-all duration-200">
            <div className="w-full h-full rounded-glass bg-primary flex items-center justify-center">
              <span className="text-xs font-bold text-glass-primary">MG</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-glass-primary group-hover:text-accent transition-colors">Mark Garcia</span>
            <span className="text-xs text-glass-muted leading-none">AI/ML Engineer</span>
          </div>
        </Link>
        <motion.button 
          onClick={toggleMobileMenu} 
          className="glass-button p-2" 
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobileMenuOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} className="text-glass-primary" /> : <Menu size={24} className="text-glass-primary" />}
            </motion.div>
          </AnimatePresence>
        </motion.button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-16 left-0 right-0 z-30 glass-card p-4 md:hidden"
          >
            <NavContent setMobileMenuOpen={setMobileMenuOpen} isMobile={true} isSidebarOpen={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 z-50 hidden h-full glass-nav text-glass-primary md:flex md:flex-col`}
      >
        <SidebarHeader
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
           <NavContent setMobileMenuOpen={setMobileMenuOpen} isMobile={false} isSidebarOpen={isSidebarOpen}/>
        </div>
        <SidebarFooter isSidebarOpen={isSidebarOpen} />
      </motion.aside>

      {/* Main Content Offset */}
      <motion.div
        className="hidden md:block"
        initial={false}
        animate={{ width: isSidebarOpen ? 256 : 80 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </>
  );
};

interface SidebarHeaderProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}
const SidebarHeader: FC<SidebarHeaderProps> = ({ isSidebarOpen, toggleSidebar }) => (
  <div className="flex items-center justify-between p-4 h-16 border-b border-glass-border">
    <AnimatePresence>
    {isSidebarOpen && (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Link href="/" className="flex items-center gap-3 group">
          {/* Professional Sidebar Logo */}
          <div className="relative w-10 h-10 glass-card p-0.5 group-hover:shadow-glow transition-all duration-200">
            <div className="w-full h-full rounded-glass bg-primary flex items-center justify-center">
              <span className="text-sm font-bold text-glass-primary">MG</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-glass-primary group-hover:text-accent transition-colors">Mark Garcia</span>
            <span className="text-xs text-glass-muted leading-none">AI/ML Engineer</span>
          </div>
        </Link>
      </motion.div>
    )}
    </AnimatePresence>
    <motion.button 
      onClick={toggleSidebar} 
      className="glass-button p-2" 
      whileTap={{ scale: 0.9 }}
    >
      {isSidebarOpen ? <ChevronDown className="text-glass-primary" /> : <ChevronRight className="text-glass-primary" />}
    </motion.button>
  </div>
);

interface NavLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  onClick: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}
const NavLink: FC<NavLinkProps> = ({ href, icon, children, onClick, isSidebarOpen, isMobile }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <motion.div variants={navItemVariants} whileHover={{ x: 2 }} className="w-full">
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center gap-3 ${isSidebarOpen ? 'px-4 py-3 mx-2' : 'p-3 mx-1 justify-center'} rounded-glass transition-all duration-200 relative group ${
          isActive 
            ? 'glass-active' 
            : 'text-glass-muted hover:text-glass-primary glass-hover'
        }`}
      >
        <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-secondary group-hover:text-glass-primary'} transition-colors duration-200`}>
          {icon}
        </div>
        {(isSidebarOpen || isMobile) && (
          <motion.span
            initial={isMobile ? { opacity: 1 } : { opacity: 0, x: -10 }}
            animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
            className="font-medium text-sm"
          >
            {children}
          </motion.span>
        )}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className={`absolute ${isSidebarOpen ? 'right-2' : 'right-1'} w-1 h-6 bg-glow rounded-full shadow-glow`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
};

interface NavContentProps {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  isMobile: boolean;
  isSidebarOpen: boolean;
}
const NavContent: FC<NavContentProps> = ({ setMobileMenuOpen, isMobile, isSidebarOpen }) => {
    const handleLinkClick = () => {
        if(isMobile) {
            setMobileMenuOpen(false);
        }
    }
    return (
      <motion.nav 
        variants={navContainerVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex flex-col gap-2 p-4"
      >
        <NavLink href="/" icon={<Home />} onClick={handleLinkClick} isSidebarOpen={isSidebarOpen} isMobile={isMobile}>Home</NavLink>
        <NavLink href="/projects" icon={<Briefcase />} onClick={handleLinkClick} isSidebarOpen={isSidebarOpen} isMobile={isMobile}>Projects</NavLink>
        <NavLink href="/blog" icon={<PenTool />} onClick={handleLinkClick} isSidebarOpen={isSidebarOpen} isMobile={isMobile}>Blog</NavLink>
        <NavLink href="/about" icon={<User />} onClick={handleLinkClick} isSidebarOpen={isSidebarOpen} isMobile={isMobile}>About</NavLink>
        <NavLink href="/contact" icon={<Mail />} onClick={handleLinkClick} isSidebarOpen={isSidebarOpen} isMobile={isMobile}>Contact</NavLink>
        <motion.a 
          href="/resume.pdf" 
          download 
          onClick={handleLinkClick}
          variants={navItemVariants}
          whileHover={{ x: 2 }}
          className={`flex items-center gap-3 ${isSidebarOpen ? 'px-4 py-3 mx-2' : 'p-3 mx-1 justify-center'} rounded-glass transition-all duration-200 relative group text-glass-muted hover:text-glass-primary glass-hover`}
        >
          <div className="flex-shrink-0 text-secondary group-hover:text-glass-primary transition-colors duration-200">
            <Download />
          </div>
          {(isSidebarOpen || isMobile) && (
            <motion.span
              initial={isMobile ? { opacity: 1 } : { opacity: 0, x: -10 }}
              animate={isMobile ? { opacity: 1 } : { opacity: 1, x: 0 }}
              className="font-medium text-sm"
            >
              Resume
            </motion.span>
          )}
        </motion.a>
      </motion.nav>
    )
};

interface SidebarFooterProps {
  isSidebarOpen: boolean;
}
const SidebarFooter: FC<SidebarFooterProps> = ({ isSidebarOpen }) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const footerVariants = {
    open: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: {
      opacity: 0,
    },
  }

  const footerItemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  }

  return (
    <div className="border-t border-glass-border p-4">
      <motion.div 
        className={`flex flex-col ${isSidebarOpen ? 'gap-4' : 'gap-2'}`}
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={footerVariants}
      >
        <motion.div variants={footerItemVariants} className={`flex items-center ${!isSidebarOpen ? "justify-center mb-3" : "mb-3"}`}>
          <a
            href="https://github.com/mgkram4"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button p-2 hover:shadow-glow transition-all duration-200"
          >
            <Github className="text-glass-primary" />
          </a>
          {isSidebarOpen && <a href="https://github.com/mgkram4" target="_blank" rel="noopener noreferrer" className="ml-4 text-glass-muted hover:text-glass-primary transition-colors">GitHub</a>}
        </motion.div>
        <motion.div variants={footerItemVariants} className={`flex items-center ${!isSidebarOpen ? "justify-center mb-3" : "mb-3"}`}>
          <a
            href="https://www.linkedin.com/in/markgarcia4/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button p-2 hover:shadow-glow transition-all duration-200"
          >
            <Linkedin className="text-glass-primary" />
          </a>
          {isSidebarOpen && <a href="https://www.linkedin.com/in/markgarcia4/" target="_blank" rel="noopener noreferrer" className="ml-4 text-glass-muted hover:text-glass-primary transition-colors">LinkedIn</a>}
        </motion.div>
      </motion.div>
      <ClientOnly>
        <motion.div 
            className="mt-4 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: isSidebarOpen ? 0.5 : 0.2 }}
        >
          <button
            onClick={toggleTheme}
            className={`glass-button ${isSidebarOpen ? 'w-full flex items-center gap-2' : 'flex items-center justify-center'} p-2 hover:shadow-glow transition-all duration-200`}
          >
            {theme === "light" ? <Moon className="text-glass-primary" /> : <Sun className="text-glass-primary" />}
            <AnimatePresence>
            {isSidebarOpen && <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
             className="ml-2 text-sm whitespace-nowrap text-glass-primary">{theme === 'light' ? 'Dark' : 'Light'} Mode</motion.span>}
            </AnimatePresence>
          </button>
        </motion.div>
      </ClientOnly>
    </div>
  );
};

export default Navbar; 