import React from 'react';
import About from '../components/About'; // Adjusted import path
import Skills from '../components/Skills'; // Adjusted import path

// This is the About page
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <About />
      <Skills />
    </div>
  );
} 