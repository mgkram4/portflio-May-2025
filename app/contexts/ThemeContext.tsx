"use client";

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setSystemTheme: () => void;
  isSystemTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedIsSystem = localStorage.getItem('isSystemTheme') !== 'false';
    
    setIsSystemTheme(savedIsSystem);
    
    if (savedIsSystem || !savedTheme) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    } else {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme class and save preference
  useEffect(() => {
    const root = document.documentElement;
    
    // Add no-transition class to prevent flash
    root.classList.add('no-transition');
    
    // Update theme
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    // Remove no-transition after a frame
    requestAnimationFrame(() => {
      root.classList.remove('no-transition');
    });
    
    // Save to localStorage
    if (!isSystemTheme) {
      localStorage.setItem('theme', theme);
    }
  }, [theme, isSystemTheme]);

  // Listen to system theme changes
  useEffect(() => {
    if (!isSystemTheme) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => setTheme(e.matches ? 'dark' : 'light');
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isSystemTheme]);

  const toggleTheme = () => {
    setIsSystemTheme(false);
    localStorage.setItem('isSystemTheme', 'false');
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const setSystemTheme = () => {
    setIsSystemTheme(true);
    localStorage.setItem('isSystemTheme', 'true');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setTheme(systemTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setSystemTheme, isSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 