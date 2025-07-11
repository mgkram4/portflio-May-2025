"use client";
import { motion } from 'framer-motion';
import { Book, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

const publications = [
  {
    title: "Intelligent Perfect Pose and Health Analysis in Sports and Fitness",
    journal: "IEEE ICHI 2025",
    status: "Accepted as Poster and Demo Abstract",
    description: "To be published in IEEE Xplore and indexed in A&I databases.",
    link: "#", // Add actual link when available
    type: "Conference Paper",
  },
  {
    title: "Blockchain-Based Health System Development",
    journal: "SAM’25 – Springer RRP",
    status: "Accepted as Regular Research Paper",
    description: "To be indexed by Springer, Scopus, and DBLP.",
    link: "#", // Add actual link when available
    type: "Journal Article",
  },
];

const PublicationsPage = () => {
  return (
    <div className="min-h-screen pt-24 sm:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-16">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                >
                    <span className="text-gradient">Publications</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                >
                    A collection of my published research in peer-reviewed journals and conferences.
                </motion.p>
            </header>

            <div className="space-y-8">
                {publications.map((pub, index) => (
                <motion.div
                    key={pub.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="glass-card p-8"
                >
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Book className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                    <div className="flex-grow">
                        <p className="text-sm font-medium text-accent mb-2">{pub.journal} • {pub.type}</p>
                        <h2 className="text-2xl font-bold text-glass-primary mb-3">{pub.title}</h2>
                        <p className="text-glass-muted mb-4">{pub.description}</p>
                        <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-primary px-3 py-1 rounded-full bg-primary/10">{pub.status}</span>
                        {pub.link !== "#" && (
                            <Link
                                href={pub.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm font-medium text-glass-secondary hover:text-white transition-colors"
                            >
                                <LinkIcon size={16} />
                                View Publication
                            </Link>
                        )}
                        </div>
                    </div>
                    </div>
                </motion.div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default PublicationsPage; 