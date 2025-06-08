"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
    Briefcase,
    ChevronDown,
    ChevronRight,
    Code,
    Download,
    Github,
    Home,
    Linkedin,
    Mail,
    Menu,
    Moon,
    Sun,
    User,
    X,
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
        className="fixed top-0 left-0 right-0 z-40 flex h-16 items-center justify-between bg-card/80 backdrop-blur-md px-4 md:hidden border-b border-border"
      >
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Mark Garcia</span>
        </Link>
        <motion.button onClick={toggleMobileMenu} className="text-foreground p-2" whileTap={{ scale: 0.9 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isMobileMenuOpen ? 'close' : 'open'}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed top-16 left-0 right-0 z-30 bg-card p-4 md:hidden shadow-lg border-b border-border"
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
        className={`fixed top-0 left-0 z-50 hidden h-full bg-card text-card-foreground md:flex md:flex-col border-r border-border`}
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
  <div className="flex items-center justify-between p-4 h-16 border-b border-border">
    <AnimatePresence>
    {isSidebarOpen && (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Code className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold text-foreground">Mark Garcia</span>
        </Link>
      </motion.div>
    )}
    </AnimatePresence>
    <motion.button onClick={toggleSidebar} className="p-2 text-foreground" whileTap={{ scale: 0.9 }}>
      {isSidebarOpen ? <ChevronDown /> : <ChevronRight />}
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
    <motion.div variants={navItemVariants} whileHover={{ x: isSidebarOpen ? 5 : 0 }} className="w-full">
      <Link
        href={href}
        onClick={onClick}
        className={`flex items-center p-3 rounded-lg transition-colors ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        } ${!isSidebarOpen && !isMobile ? "justify-center" : ""}`}
      >
        {icon}
        <AnimatePresence>
          {(isSidebarOpen || isMobile) && <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="ml-4 whitespace-nowrap">{children}</motion.span>}
        </AnimatePresence>
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
        <NavLink href="/about" icon={<User />} onClick={handleLinkClick} isSidebarOpen={isSidebarOpen} isMobile={isMobile}>About</NavLink>
        <NavLink href="/contact" icon={<Mail />} onClick={handleLinkClick} isSidebarOpen={isSidebarOpen} isMobile={isMobile}>Contact</NavLink>
        <motion.a 
          href="/resume.pdf" 
          download 
          onClick={handleLinkClick}
          variants={navItemVariants}
          whileHover={{ x: isSidebarOpen ? 5 : 0 }}
          className={`flex items-center p-3 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground ${!isSidebarOpen && !isMobile ? "justify-center" : ""}`}
        >
          <Download />
          <AnimatePresence>
            {(isSidebarOpen || isMobile) && <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="ml-4 whitespace-nowrap">Resume</motion.span>}
          </AnimatePresence>
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
    <div className="border-t border-border p-4">
      <motion.div 
        className="flex flex-col gap-4"
        initial="closed"
        animate={isSidebarOpen ? "open" : "closed"}
        variants={footerVariants}
      >
        <motion.div variants={footerItemVariants} className={`flex items-center ${!isSidebarOpen ? "justify-center" : ""}`}>
          <a
            href="https://github.com/mgkram4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github />
          </a>
          {isSidebarOpen && <a href="https://github.com/mgkram4" target="_blank" rel="noopener noreferrer" className="ml-4 text-muted-foreground hover:text-foreground">GitHub</a>}
        </motion.div>
        <motion.div variants={footerItemVariants} className={`flex items-center ${!isSidebarOpen ? "justify-center" : ""}`}>
          <a
            href="https://www.linkedin.com/in/markgarcia4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Linkedin />
          </a>
          {isSidebarOpen && <a href="https://www.linkedin.com/in/markgarcia4/" target="_blank" rel="noopener noreferrer" className="ml-4 text-muted-foreground hover:text-foreground">LinkedIn</a>}
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
            className="flex w-full items-center gap-2 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {theme === "light" ? <Moon /> : <Sun />}
            <AnimatePresence>
            {isSidebarOpen && <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
             className="ml-2 text-sm whitespace-nowrap">{theme === 'light' ? 'Dark' : 'Light'} Mode</motion.span>}
            </AnimatePresence>
          </button>
        </motion.div>
      </ClientOnly>
    </div>
  );
};

export default Navbar; 