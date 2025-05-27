import React from 'react';
import Navbar from "./components/Navbar";
import './globals.css';

export const metadata = {
  title: {
    default: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer',
    template: '%s | Mark Garcia'
  },
  description: 'AI/ML Engineer and Full-Stack Developer specializing in computer vision, machine learning, and modern web applications. Published IEEE researcher with expertise in PyTorch, React, and cloud technologies.',
  keywords: [
    'AI Engineer',
    'Machine Learning',
    'Computer Vision',
    'Full-Stack Developer',
    'PyTorch',
    'TensorFlow',
    'React',
    'Next.js',
    'Python',
    'TypeScript',
    'IEEE Research',
    'Pose Estimation',
    'Web Development',
    'Cloud Technologies',
    'FastAPI',
    'AWS',
    'Docker',
    'Kubernetes'
  ],
  authors: [{ name: 'Mark Garcia' }],
  creator: 'Mark Garcia',
  publisher: 'Mark Garcia',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://markgarcia.dev'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://markgarcia.dev', // Replace with your actual domain
    title: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer',
    description: 'AI/ML Engineer and Full-Stack Developer specializing in computer vision, machine learning, and modern web applications. Published IEEE researcher with expertise in PyTorch, React, and cloud technologies.',
    siteName: 'Mark Garcia Portfolio',
    images: [
      {
        url: '/images/og-image.jpg', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer',
    description: 'AI/ML Engineer and Full-Stack Developer specializing in computer vision, machine learning, and modern web applications.',
    creator: '@yourtwitterhandle', // Replace with your actual Twitter handle
    images: ['/images/og-image.jpg'], // Same image as OpenGraph
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code', // Add when you have Google Search Console
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

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
        
        {/* Additional SEO and Performance Meta Tags */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark light" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Additional structured data for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Mark Garcia",
              "jobTitle": "AI/ML Engineer & Full-Stack Developer",
              "description": "AI/ML Engineer and Full-Stack Developer specializing in computer vision, machine learning, and modern web applications.",
              "url": "https://markgarcia.dev", // Replace with your actual domain
              "sameAs": [
                "https://github.com/mgkram4",
                "https://linkedin.com/in/yourprofile", // Add your LinkedIn
                // Add other social profiles
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Computer Vision",
                "Full-Stack Development",
                "PyTorch",
                "TensorFlow",
                "React",
                "Next.js",
                "Python",
                "TypeScript"
              ],
              "alumniOf": {
                "@type": "Organization",
                "name": "Your University" // Add your university
              },
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance/Your Company" // Update as needed
              }
            })
          }}
        />
      </head>
      <body className="bg-neutral-900 text-neutral-200 dark:bg-black dark:text-neutral-300 transition-colors duration-300" suppressHydrationWarning>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
} 