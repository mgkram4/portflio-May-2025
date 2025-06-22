"use client";

import { motion } from 'framer-motion';
import { Calendar, Clock, ExternalLink, Tag } from 'lucide-react';
import Link from 'next/link';

const blogPosts = [
  {
    title: "The Future of Computer Vision in Biometric Analysis",
    excerpt: "Exploring how advanced pose estimation algorithms are revolutionizing contactless health monitoring and biometric identification systems.",
    date: "January 15, 2025",
    readTime: "8 min read",
    category: "AI Research",
    tags: ["Computer Vision", "Biometrics", "Health Tech"],
    published: true,
    featured: true,
    externalUrl: "#" // Replace with actual publication link
  },
  {
    title: "Building Production-Ready AI Pipelines: Lessons from Real-World Deployment",
    excerpt: "A comprehensive guide to deploying machine learning models at scale, covering everything from model optimization to monitoring in production.",
    date: "December 20, 2024",
    readTime: "12 min read",
    category: "Engineering",
    tags: ["MLOps", "Production", "Deployment"],
    published: true,
    featured: false,
    externalUrl: "#"
  },
  {
    title: "Optimizing React Applications: A 223% Performance Improvement Case Study",
    excerpt: "Deep dive into the techniques used to dramatically improve mobile performance in a financial services platform, with concrete metrics and implementation details.",
    date: "November 30, 2024",
    readTime: "15 min read",
    category: "Web Development",
    tags: ["React", "Performance", "Optimization"],
    published: true,
    featured: true,
    externalUrl: "#"
  },
  {
    title: "From Research to Product: Bridging the Gap in AI Development",
    excerpt: "How to transform cutting-edge research into practical applications that deliver real business value.",
    date: "October 25, 2024",
    readTime: "10 min read",
    category: "Product Development",
    tags: ["AI", "Product", "Strategy"],
    published: true,
    featured: false,
    externalUrl: "#"
  },
  {
    title: "Teaching AI: What I Learned from Training 100+ Developers",
    excerpt: "Insights from my experience as a STEM instructor and community leader on effective methods for teaching complex AI concepts.",
    date: "September 15, 2024",
    readTime: "7 min read",
    category: "Education",
    tags: ["Teaching", "AI Education", "Leadership"],
    published: true,
    featured: false,
    externalUrl: "#"
  }
];

const BlogCard = ({ post, featured = false }: { post: typeof blogPosts[0]; featured?: boolean }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, scale: 1.02 }}
    transition={{ duration: 0.5 }}
    className={`glass-card glass-hover overflow-hidden h-full flex flex-col ${
      featured ? 'md:col-span-2 lg:col-span-1' : ''
    }`}
  >
    {featured && (
      <div className="bg-gradient-to-r from-primary to-accent p-4 text-center">
        <span className="text-glass-primary font-semibold text-sm">Featured Article</span>
      </div>
    )}
    
    <div className="p-6 flex-grow flex flex-col">
      <div className="flex items-center gap-4 mb-4 text-sm text-glass-muted">
        <span className="glass-subtle text-accent px-3 py-1 rounded-glass text-xs font-medium">
          {post.category}
        </span>
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          {post.date}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={14} />
          {post.readTime}
        </div>
      </div>
      
      <h2 className="text-xl font-bold text-glass-primary mb-3 flex-grow">
        {post.title}
      </h2>
      
      <p className="text-glass-muted mb-4 line-clamp-3">
        {post.excerpt}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs glass-subtle text-glass-muted px-2 py-1 rounded-glass flex items-center gap-1"
          >
            <Tag size={10} />
            {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-auto">
        <Link
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-accent hover:text-secondary font-medium text-sm transition-colors"
        >
          Read Article <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  </motion.article>
);

const BlogPage = () => {
  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-4 text-gradient-primary">Blog & Articles</h1>
        <p className="text-lg text-glass-secondary max-w-2xl mx-auto">
          Insights on AI/ML, web development, and technology leadership. 
          Sharing knowledge from research, development, and teaching experiences.
        </p>
      </motion.div>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-8 text-gradient-primary"
          >
            Featured Articles
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <BlogCard key={post.title} post={post} featured={true} />
            ))}
          </div>
        </section>
      )}

      {/* All Articles */}
      <section>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8 text-gradient-primary"
        >
          All Articles
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 text-center glass-card glass-hover p-12 border border-glow"
      >
        <h3 className="text-2xl font-bold mb-4 text-glass-primary">Want to Collaborate?</h3>
        <p className="text-glass-muted mb-6 max-w-2xl mx-auto">
          I&apos;m always interested in discussing AI research, technical challenges, 
          and opportunities for collaboration. Let&apos;s connect!
        </p>
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-glass-primary px-8 py-3 rounded-glass font-semibold shadow-glow hover:shadow-glow transition-all duration-200"
          >
            Get In Touch
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
};

export default BlogPage; 