'use client';

import React, { useState, useEffect, useMemo, memo } from 'react';
import { 
  ChevronDown, Menu, X, Briefcase, Send, Mail, 
  ExternalLink, Code2, Zap, Palette, Database, Cloud, 
  CheckCircle, ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { projects as projectData } from './data/projects';
import NextLink from 'next/link';

// --- Types ---
interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  category: string;
  liveUrl: string;
  codeUrl: string;
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  items: Skill[];
}

interface Service {
  icon: any;
  title: string;
  description: string;
}

// --- Components ---

const Typewriter = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = texts[currentTextIndex];
      if (!isDeleting) {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        if (currentText === fullText) {
          setIsDeleting(true);
          setSpeed(2000); // Pause at the end
        } else {
          setSpeed(100);
        }
      } else {
        setCurrentText(fullText.slice(0, currentText.length - 1));
        setSpeed(50);
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setSpeed(500);
        }
      }
    };

    const timeout = setTimeout(handleTyping, speed);
    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, speed]);

  return (
    <span className="inline-block min-w-[300px] text-center">
      {currentText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-8 bg-blue-400 ml-1 align-middle"
      />
    </span>
  );
};

const NavBar = memo(({ 
  isDark, setIsDark, isMenuOpen, setIsMenuOpen
}: { 
  isDark: boolean; 
  setIsDark: (v: boolean) => void; 
  isMenuOpen: boolean; 
  setIsMenuOpen: (v: boolean) => void;
}) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl transition-all duration-500 ${isDark ? 'bg-black/30 border-b border-white/10' : 'bg-white/30 border-b border-black/10'}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent`}
        >
          Dev.
        </motion.div>

        <div className="hidden md:flex gap-8 items-center">
          {['Hero', 'Services', 'Projects', 'Skills', 'Contact'].map((item, i) => (
            <motion.a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 relative group ${isDark ? 'text-white/70' : 'text-black/70'}`}
            >
              {item}
              <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300`} />
            </motion.a>
          ))}
          <button 
            onClick={() => setIsDark(!isDark)} 
            className={`p-2 rounded-lg transition-all hover:scale-110 ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t overflow-hidden ${isDark ? 'border-white/10 bg-black/90' : 'border-black/10 bg-white/90'}`}
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
              {['Hero', 'Services', 'Projects', 'Skills', 'Contact'].map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`} onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-1 bg-white/5 w-full overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left" 
          style={{ scaleX }} 
        />
      </div>
    </nav>
  );
});

NavBar.displayName = 'NavBar';

const Hero = memo(({ isDark, roles }: { isDark: boolean; roles: string[] }) => (
  <section id="hero" className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 ${isDark ? 'bg-black' : 'bg-white'}`}>
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl transform-gpu ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`} 
      />
      <motion.div 
        animate={{ y: [0, -20, 0], scale: [1.1, 1, 1.1] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
        className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl transform-gpu ${isDark ? 'bg-purple-500' : 'bg-purple-300'}`} 
      />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mb-6 inline-block px-4 py-2 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 border border-white/20' : 'bg-black/10 border border-black/20'}`}
      >
        <p className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>✨ Welcome to my portfolio</p>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`text-6xl md:text-8xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}
      >
        Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Akash</span>
      </motion.h1>

      <div className="h-24 md:h-20 mb-8 flex items-center justify-center">
        <div className={`text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent`}>
          <Typewriter texts={roles} />
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}
      >
        I craft beautiful, scalable web applications that solve real problems. Specializing in modern frontend architecture, backend optimization, and full-stack solutions.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col md:flex-row gap-4 justify-center mb-16"
      >
        <button className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 flex items-center justify-center gap-2">
          View My Work <ArrowRight size={18} />
        </button>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className={`px-8 py-3 rounded-lg font-semibold backdrop-blur-md transition-all hover:scale-105 group ${isDark ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-black/10 text-black border border-black/20 hover:bg-black/20'}`}
        >
          Get in Touch <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>

      <div className="flex gap-4 justify-center mb-16">
        {[
          { icon: Send, label: 'WhatsApp', href: 'https://wa.me/919501512840' }, 
          { icon: Briefcase, label: 'LinkedIn', href: 'https://linkedin.com/in/akashralh' }, 
          { icon: Code2, label: 'GitHub', href: 'https://github.com/akashralh' }, 
          { icon: Mail, label: 'Email', href: 'mailto:akashralh@example.com' }
        ].map(({ icon: Icon, label, href }, i) => (
          <motion.a 
            key={label} 
            href={href} 
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.1 }}
            whileHover={{ scale: 1.2, y: -5 }}
            className={`p-3 rounded-lg backdrop-blur-md transition-all ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'}`}
          >
            <Icon size={20} />
          </motion.a>
        ))}
      </div>

      <motion.button 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => {
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
        }} 
        className="opacity-40 hover:opacity-100 transition-opacity"
      >
        <ChevronDown size={32} className={isDark ? 'text-white' : 'text-black'} />
      </motion.button>
    </div>
  </section>
));

Hero.displayName = 'Hero';

const Services = memo(({ isDark, services }: { isDark: boolean; services: Service[] }) => (
  <section id="services" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}
        >
          My <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
        </motion.h2>
        <p className={`text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>What I can build for you</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, description }, i) => (
          <motion.div 
            key={title} 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-2xl backdrop-blur-md transition-all border ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'}`}
          >
            <Icon className="text-blue-400 mb-4" size={32} />
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h3>
            <p className={isDark ? 'text-white/60' : 'text-black/60'}>{description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Services.displayName = 'Services';

const Projects = memo(({ 
  isDark, projects, hoveredProject, setHoveredProject 
}: { 
  isDark: boolean; 
  projects: Project[];
  hoveredProject: number | null;
  setHoveredProject: (v: number | null) => void;
}) => (
  <section id="projects" className={`py-20 px-4 ${isDark ? 'bg-gradient-to-b from-black to-slate-900' : 'bg-gradient-to-b from-white to-slate-50'}`}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}
        >
          Featured <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
        </motion.h2>
        <p className={`text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>Showcasing my best work</p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project, idx) => (
          <motion.div 
            key={project.title} 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="brutalist-border bg-black overflow-hidden group"
            onMouseEnter={() => setHoveredProject(idx)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <div className={`relative overflow-hidden h-64 transition-all duration-500 ${hoveredProject === idx ? 'scale-110' : ''}`}>
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>{project.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-200 text-blue-700'}`}>{project.category}</span>
              </div>
              <p className={`mb-4 text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map(t => (
                  <span key={t} className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-black/50'}`}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <NextLink 
                  href={`/projects/${project.slug}`}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ExternalLink size={14} /> View Details
                </NextLink>
                <a 
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all border ${isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-black/10 text-black hover:bg-black/5'} flex items-center justify-center gap-2`}
                >
                  <Code2 size={14} /> Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Projects.displayName = 'Projects';

const SkillBar = memo(({ name, level, isDark }: { name: string; level: number; isDark: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="mb-4" ref={ref}>
      <div className="flex justify-between items-center mb-1">
        <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>{name}</span>
        <span className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>{level}%</span>
      </div>
      <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${level}%` : 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
        />
      </div>
    </div>
  );
});

SkillBar.displayName = 'SkillBar';

const Skills = memo(({ isDark, skills, stats }: { isDark: boolean; skills: SkillCategory[]; stats: any[] }) => (
  <section id="skills" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}
        >
          Skills & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
        </motion.h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
        {stats.map(({ label, value, icon }, i) => (
          <motion.div 
            key={label} 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.9 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-xl backdrop-blur-md text-center border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
          >
            <div className="text-3xl mb-2">{icon}</div>
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{value}</div>
            <p className={`text-xs mt-2 uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-black/40'}`}>{label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {skills.map((cat, catIdx) => (
          <motion.div 
            key={cat.category}
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.1 }}
          >
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-white' : 'text-black'}`}>
              <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
              {cat.category}
            </h3>
            <div className="space-y-4">
              {cat.items.map((skill) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} isDark={isDark} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

Skills.displayName = 'Skills';

const Contact = memo(({ isDark }: { isDark: boolean }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappNumber = '919501512840';
    const messageText = `Hi, I'm ${formData.name}.\n\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    const encodedMessage = encodeURIComponent(messageText);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="contact" className={`py-20 px-4 ${isDark ? 'bg-gradient-to-b from-slate-900 to-black' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true }}
            className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}
          >
            Let's <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Work Together</span>
          </motion.h2>
          <p className={`text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>Have a project in mind? Let's talk about it.</p>
        </div>

        <motion.div 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className={`rounded-2xl p-8 md:p-12 backdrop-blur-md border ${isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Your Name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none border transition-all focus:ring-2 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder-white/30 focus:ring-blue-500' : 'bg-black/10 border-black/20 text-black placeholder-black/30 focus:ring-blue-500'}`} 
              />
              <input 
                type="email" 
                placeholder="Your Email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none border transition-all focus:ring-2 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder-white/30 focus:ring-blue-500' : 'bg-black/10 border-black/20 text-black placeholder-black/30 focus:ring-blue-500'}`} 
              />
            </div>
            <input 
              type="text" 
              placeholder="Subject" 
              required
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none border transition-all focus:ring-2 ${isDark ? 'bg-white/10 border-white/20 text-white placeholder-white/30 focus:ring-blue-500' : 'bg-black/10 border-black/20 text-black placeholder-black/30 focus:ring-blue-500'}`} 
            />
            <textarea 
              placeholder="Your Message" 
              rows={4} 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none border transition-all focus:ring-2 resize-none ${isDark ? 'bg-white/10 border-white/20 text-white placeholder-white/30 focus:ring-blue-500' : 'bg-black/10 border-black/20 text-black placeholder-black/30 focus:ring-blue-500'}`} 
            />
            <button type="submit" className="w-full px-8 py-4 rounded-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl transition-all hover:scale-[1.02]">
              Send Message <ArrowRight size={18} className="inline ml-2" />
            </button>
          </form>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16 text-center">
          {[
            { icon: Mail, value: 'akashralh@example.com', label: 'Email', href: 'mailto:akashralh@example.com' },
            { icon: Send, value: '+91 9501512840', label: 'WhatsApp', href: 'https://wa.me/919501512840' },
            { icon: Briefcase, value: 'linkedin.com/in/akashralh', label: 'LinkedIn', href: 'https://linkedin.com/in/akashralh' }
          ].map((item, i) => (
            <motion.a 
              key={item.label}
              href={item.href}
              target="_blank"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-6 rounded-xl border ${isDark ? 'bg-white/5 border-white/10 hover:bg-white/10' : 'bg-black/5 border-black/10 hover:bg-black/10'} transition-all`}
            >
              <item.icon className="mx-auto mb-3 text-blue-400" size={24} />
              <p className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-black/80'}`}>{item.value}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

const Footer = memo(({ isDark }: { isDark: boolean }) => (
  <footer className={`border-t py-12 px-4 ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
    <div className="max-w-6xl mx-auto text-center">
      <div className="mb-6 text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
        Dev.
      </div>
      <p className={`text-sm tracking-widest ${isDark ? 'text-white/30' : 'text-black/30'}`}>
        © 2024 AKASH RALH. ALL RIGHTS RESERVED.
      </p>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

// --- Main Page ---

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const roles = useMemo(() => ['Full Stack Developer', 'React Specialist', 'Cloud Architect'], []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  const { scrollYProgress } = useScroll();
  const showBackToTop = useTransform(scrollYProgress, (value) => value > 0.2);
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    return showBackToTop.on('change', (latest) => {
      setBackToTopVisible(latest);
    });
  }, [showBackToTop]);

  const projects = useMemo(() => projectData, []);

  const skills = useMemo(() => [
    { category: 'Frontend', items: [{ name: 'React.js', level: 95 }, { name: 'Next.js', level: 90 }, { name: 'TypeScript', level: 85 }, { name: 'Tailwind', level: 95 }] },
    { category: 'Backend', items: [{ name: 'Node.js', level: 90 }, { name: 'Express.js', level: 88 }, { name: 'PostgreSQL', level: 85 }, { name: 'GraphQL', level: 80 }] },
    { category: 'Tools', items: [{ name: 'Docker', level: 85 }, { name: 'AWS', level: 80 }, { name: 'Git', level: 95 }, { name: 'CI/CD', level: 85 }] },
  ], []);

  const stats = useMemo(() => [
    { label: 'Projects', value: '25+', icon: '🎯' },
    { label: 'Experience', value: '5+', icon: '⭐' },
    { label: 'Clients', value: '40+', icon: '😊' },
    { label: 'Tech Stack', value: '30+', icon: '🛠️' },
  ], []);

  const services = useMemo(() => [
    { icon: Code2, title: 'Frontend', description: 'Modern, responsive web apps with cutting-edge tech.' },
    { icon: Database, title: 'Backend', description: 'Scalable APIs and databases designed for performance.' },
    { icon: Zap, title: 'Full Stack', description: 'Complete web applications from frontend to backend.' },
    { icon: Palette, title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces that users love.' },
    { icon: Cloud, title: 'Cloud & DevOps', description: 'Deployment, scaling, and infra optimization.' },
    { icon: CheckCircle, title: 'Performance', description: 'Speed improvements for existing applications.' },
  ], []);

  if (!mounted) return null;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <NavBar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <main>
        <Hero isDark={isDark} roles={roles} />
        <Services isDark={isDark} services={services} />
        <Projects isDark={isDark} projects={projects} hoveredProject={hoveredProject} setHoveredProject={setHoveredProject} />
        <Skills isDark={isDark} skills={skills} stats={stats} />
        <Contact isDark={isDark} />
      </main>

      <Footer isDark={isDark} />

      <AnimatePresence>
        {backToTopVisible && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl z-40"
          >
            <ChevronDown size={24} className="rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
