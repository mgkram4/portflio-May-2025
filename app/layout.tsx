import React from 'react';
import Navbar from "./components/Navbar";
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // const themeInitializerScript = `
  //   (function() {
  //     try {
  //       var theme = localStorage.getItem('theme');
  //       if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  //         document.documentElement.classList.add('dark');
  //       } else {
  //         document.documentElement.classList.remove('dark');
  //       }
  //     } catch (e) { /* Ignore */ }
  //   })();
  // `;

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning={true}>
      <head>
        {/* <script dangerouslySetInnerHTML={{ __html: themeInitializerScript }} /> */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>My App</title>
      </head>
      <body className="bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
} 