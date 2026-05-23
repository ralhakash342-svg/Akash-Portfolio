'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code2, CheckCircle2, ChevronRight, Home } from 'lucide-react';
import { projects } from '../../data/projects';
import NextLink from 'next/link';

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  const project = projects.find(p => p.slug === params.slug);

  if (!mounted) return null;
  if (!project) return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <NextLink href="/" className="text-blue-400 hover:underline">Return Home</NextLink>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <NextLink href="/" className="flex items-center gap-2 group text-sm font-medium hover:text-blue-400 transition-colors">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </NextLink>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
                  {project.category}
                </span>
                <div className="h-px w-8 bg-blue-500/30" />
                <span className="text-xs text-white/40 uppercase tracking-widest">Featured Project</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                {project.title}
              </h1>
              <p className={`text-xl mb-8 leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
                {project.longDescription}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {project.tech.map(t => (
                  <span key={t} className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${isDark ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'}`}>
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  View Live <ExternalLink size={18} />
                </a>
                <a 
                  href={project.codeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`px-8 py-3 rounded-lg font-semibold border backdrop-blur-md transition-all hover:scale-105 flex items-center gap-2 ${isDark ? 'border-white/20 bg-white/5 hover:bg-white/10' : 'border-black/20 bg-black/5 hover:bg-black/10'}`}
                >
                  Source Code <Code2 size={18} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <CheckCircle2 className="text-blue-400" /> Key Features
              </h2>
              <ul className="space-y-4">
                {project.features.map(f => (
                  <li key={f} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className={isDark ? 'text-white/70' : 'text-black/70'}>{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
            >
              <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
              <div className="grid grid-cols-2 gap-4">
                {project.tech.map(t => (
                  <div key={t} className="flex items-center gap-2">
                    <ChevronRight size={14} className="text-blue-500" />
                    <span className={isDark ? 'text-white/60' : 'text-black/60'}>{t}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Next Project Footer */}
          <div className="mt-20 pt-20 border-t border-white/10 text-center">
            <h3 className="text-white/40 uppercase tracking-widest text-sm mb-8">View Other Projects</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {projects.filter(p => p.slug !== project.slug).map(p => (
                <NextLink 
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className={`px-6 py-3 rounded-xl border transition-all hover:scale-105 ${isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-black/10 bg-black/5 hover:bg-black/10'}`}
                >
                  {p.title}
                </NextLink>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className={`border-t py-12 px-4 ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
        <div className="max-w-6xl mx-auto text-center">
          <NextLink href="/" className="inline-block mb-6 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Dev.
          </NextLink>
          <p className={`text-sm tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
            © 2024 AKASH RALH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}

