import { Inter } from 'next/font/google';
import React from 'react';
import LayeredBackground from "./components/LayeredBackground";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./contexts/ThemeContext";
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata = {
  title: {
    default: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer | Computer Vision Researcher',
    template: '%s | Mark Garcia - AI/ML Engineer'
  },
  description: 'Mark Garcia is an AI/ML Engineer and Full-Stack Developer specializing in computer vision, biometric analysis, and production-scale web applications. Published IEEE researcher with expertise in PyTorch, React, Next.js, and cloud technologies. Currently pursuing Computer Science at University of La Verne.',
  keywords: [
    'Mark Garcia',
    'AI Engineer',
    'Machine Learning Engineer',
    'Computer Vision',
    'Biometric Analysis',
    'Full-Stack Developer',
    'IEEE Researcher',
    'PyTorch',
    'TensorFlow',
    'React',
    'Next.js',
    'Python',
    'TypeScript',
    'Pose Estimation',
    'Web Development',
    'Cloud Technologies',
    'FastAPI',
    'AWS',
    'Docker',
    'Vista Pacific Capital',
    'University of La Verne',
    'Google Developer Group',
    'STEM Instructor',
    'JavaScript',
    'Node.js',
    'PostgreSQL',
    'MongoDB',
    'Kubernetes',
    'DevOps',
    'MLOps',
    'Computer Science Student',
    'Software Engineering',
    'Artificial Intelligence',
    'Deep Learning',
    'Neural Networks',
    'OpenCV',
    'Scikit-learn',
    'Pandas',
    'NumPy',
    'Research Publication',
    'Tech Leadership'
  ],
  authors: [{ name: 'Mark Garcia', url: 'https://markgarcia.dev' }],
  creator: 'Mark Garcia',
  publisher: 'Mark Garcia',
  category: 'technology',
  classification: 'Portfolio Website',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://markgarcia.dev'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://markgarcia.dev',
    title: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer | Computer Vision Researcher',
    description: 'Published IEEE researcher and AI/ML Engineer specializing in computer vision, biometric analysis, and production-scale web applications. Expert in PyTorch, React, and modern cloud technologies.',
    siteName: 'Mark Garcia - AI/ML Engineer Portfolio',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer Portfolio',
        type: 'image/jpeg',
      },
      {
        url: '/images/og-image-square.jpg',
        width: 400,
        height: 400,
        alt: 'Mark Garcia - AI/ML Engineer Profile',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mgkram4',
    creator: '@mgkram4',
    title: 'Mark Garcia - AI/ML Engineer & Full-Stack Developer',
    description: 'Published IEEE researcher specializing in computer vision, biometric analysis, and production-scale web applications. Expert in AI/ML and modern web technologies.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_VERIFICATION,
    },
  },
  applicationName: 'Mark Garcia Portfolio',
  referrer: 'origin-when-cross-origin',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'Mark Garcia',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#1a1a2e',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#5F87D4' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a2e' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans scroll-smooth`} suppressHydrationWarning={true}>
      <head>
        <meta charSet="utf-8" />
        
        {/* Enhanced Favicon and App Icons */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Performance and Security Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* Enhanced structured data for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Person", "ProfilePage"],
              "name": "Mark Garcia",
              "givenName": "Mark",
              "familyName": "Garcia",
              "jobTitle": "AI/ML Engineer & Full-Stack Developer",
              "description": "Published IEEE researcher and AI/ML Engineer specializing in computer vision, biometric analysis, and production-scale web applications.",
              "url": "https://markgarcia.dev",
              "image": "https://markgarcia.dev/images/profile.jpg",
              "email": "mailto:mark@markgarcia.dev",
              "telephone": "+1-XXX-XXX-XXXX", // Add your phone if you want it public
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Los Angeles",
                "addressRegion": "CA",
                "addressCountry": "US"
              },
              "sameAs": [
                "https://www.linkedin.com/in/mark-a-garcia/",
                "https://github.com/mark-a-garcia",
                "https://twitter.com/mgkram4"
              ],
              "knowsAbout": [
                "Artificial Intelligence",
                "Machine Learning",
                "Computer Vision",
                "Biometric Analysis",
                "Full-Stack Development",
                "PyTorch",
                "TensorFlow",
                "React",
                "Next.js",
                "Python",
                "TypeScript",
                "IEEE Research",
                "Pose Estimation",
                "Cloud Technologies",
                "AWS",
                "Docker",
                "Kubernetes"
              ],
              "hasOccupation": {
                "@type": "Occupation",
                "name": "AI/ML Engineer",
                "occupationLocation": {
                  "@type": "Place",
                  "name": "Los Angeles, California"
                },
                "skills": ["Machine Learning", "Computer Vision", "Full-Stack Development", "Research"]
              },
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "University of La Verne",
                "url": "https://laverne.edu",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "La Verne",
                  "addressRegion": "CA",
                  "addressCountry": "US"
                }
              },
              "memberOf": [
                {
                  "@type": "Organization",
                  "name": "IEEE",
                  "url": "https://ieee.org"
                },
                {
                  "@type": "Organization", 
                  "name": "Google Developer Group",
                  "url": "https://developers.google.com/community/gdg"
                }
              ],
              "worksFor": [
                {
                  "@type": "Organization",
                  "name": "Vista Pacific Capital",
                  "url": "https://vistapacificcapital.com"
                },
                {
                  "@type": "EducationalOrganization",
                  "name": "University of La Verne",
                  "url": "https://laverne.edu"
                }
              ],
              "award": [
                "IEEE ICHI Publication",
                "University Research Assistant",
                "Chief Community Officer - Google Developer Group"
              ],
              "seeks": {
                "@type": "JobPosting",
                "title": "AI/ML Engineering Opportunities",
                "description": "Seeking challenging roles in AI/ML engineering, computer vision, and full-stack development"
              }
            })
          }}
        />

        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Mark Garcia - AI/ML Engineer Portfolio",
              "url": "https://markgarcia.dev",
              "description": "Professional portfolio of Mark Garcia, AI/ML Engineer and Full-Stack Developer",
              "author": {
                "@type": "Person",
                "name": "Mark Garcia"
              },
              "inLanguage": "en-US",
              "copyrightYear": "2025",
              "copyrightHolder": {
                "@type": "Person",
                "name": "Mark Garcia"
              }
            })
          }}
        />

        {/* Breadcrumb structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://markgarcia.dev"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "About",
                  "item": "https://markgarcia.dev/about"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Projects",
                  "item": "https://markgarcia.dev/projects"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Blog",
                  "item": "https://markgarcia.dev/blog"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Contact",
                  "item": "https://markgarcia.dev/contact"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LayeredBackground />
          <Navbar />
          <main className="relative z-10 mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
} 