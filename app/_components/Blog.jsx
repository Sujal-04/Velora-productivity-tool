'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

function Blog() {
  const posts = [
    {
      title: "10 Tips for Effective Team Collaboration",
      excerpt: "Learn how to maximize your team's productivity with these proven collaboration strategies.",
      image: "/images/blog-1.svg",
      date: "March 15, 2024",
      category: "Productivity",
      slug: "10-tips-for-effective-team-collaboration"
    },
    {
      title: "The Future of Remote Work",
      excerpt: "Discover how remote work is evolving and what it means for the future of collaboration.",
      image: "/images/blog-2.svg",
      date: "March 10, 2024",
      category: "Remote Work",
      slug: "future-of-remote-work"
    },
    {
      title: "Building a Strong Company Culture",
      excerpt: "Explore the key elements of creating and maintaining a positive company culture.",
      image: "/images/blog-3.svg",
      date: "March 5, 2024",
      category: "Culture",
      slug: "building-strong-company-culture"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Latest from Our Blog</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay up to date with the latest insights, tips, and trends in team collaboration and productivity.
          </p>
        </motion.div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post, index) => (
            <Link href={`/blog/${post.slug}`} key={index} className="group">
              <motion.article
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <motion.div 
                  className="relative h-48 w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="p-6">
                  <motion.div 
                    className="flex items-center gap-4 mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-sm text-primary font-medium">{post.category}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {post.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {post.excerpt}
                  </motion.p>
                </div>
              </motion.article>
            </Link>
          ))}
        </motion.div>
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            href="/blog"
            className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            View All Posts
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog 