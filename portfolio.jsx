'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, Github, Linkedin, Twitter, Mail, ExternalLink, Code2, Zap, Palette, Database, Cloud, CheckCircle2 } from 'lucide-react';

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [typingIndex, setTypingIndex] = useState(0);

  const roles = ['Full Stack Developer', 'React Specialist', 'Backend Engineer'];
  const currentRole = roles[Math.floor(typingIndex / 30) % roles.length];
  const displayRole = currentRole.slice(0, (typingIndex % 30));

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingIndex(prev => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack marketplace with real-time inventory, payment processing, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      image: '🛍️',
    },
    {
      title: 'AI SaaS Dashboard',
      description: 'Analytics platform with real-time data visualization and machine learning insights.',
      tech: ['Next.js', 'TypeScript', 'PostgreSQL', 'TensorFlow'],
      image: '📊',
    },
    {
      title: 'Chat Application',
      description: 'Real-time messaging app with WebSocket integration and end-to-end encryption.',
      tech: ['React', 'Socket.io', 'Express', 'Redis'],
      image: '💬',
    },
  ];

  const skills = [
    { category: 'Frontend', items: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools & DevOps', items: ['Docker', 'AWS', 'Git', 'GitHub', 'CI/CD'] },
  ];

  const stats = [
    { label: 'Projects Completed', value: '25+' },
    { label: 'Years Experience', value: '5+' },
    { label: 'Happy Clients', value: '40+' },
    { label: 'Technologies', value: '30+' },
  ];

  const services = [
    { icon: Code2, title: 'Frontend Development', description: 'Modern, responsive web applications with cutting-edge technologies.' },
    { icon: Database, title: 'Backend Development', description: 'Scalable APIs and databases designed for high performance.' },
    { icon: Zap, title: 'Full Stack Solutions', description: 'Complete web applications from frontend to backend.' },
    { icon: Palette, title: 'UI/UX Design', description: 'Beautiful, intuitive interfaces that users love.' },
    { icon: Cloud, title: 'Cloud & DevOps', description: 'Deployment, scaling, and infrastructure optimization.' },
    { icon: CheckCircle2, title: 'Performance Optimization', description: 'Speed and efficiency improvements for existing applications.' },
  ];

  const NavBar = () => (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl ${isDark ? 'bg-black/30 border-b border-white/10' : 'bg-white/30 border-b border-black/10'}`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className={`text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent`}>
          Dev.
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {['Hero', 'Services', 'Projects', 'Skills', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium transition-colors hover:text-blue-400 ${isDark ? 'text-white/70' : 'text-black/70'}`}>
              {item}
            </a>
          ))}
          <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg transition-colors ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'}`}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setIsDark(!isDark)} className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
            {isDark ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`p-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden border-t ${isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-white/50'}`}>
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4">
            {['Hero', 'Services', 'Projects', 'Skills', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`} onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" style={{ width: `${scrollProgress}%` }} />
    </nav>
  );

  const Hero = () => (
    <section id="hero" className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 ${isDark ? 'bg-gradient-to-br from-black via-slate-900 to-black' : 'bg-gradient-to-br from-white via-slate-50 to-white'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse ${isDark ? 'bg-blue-500' : 'bg-blue-300'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl animate-pulse ${isDark ? 'bg-purple-500' : 'bg-purple-300'}`} style={{ animationDelay: '2s' }} />
        <div className={`absolute top-1/2 right-1/3 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse ${isDark ? 'bg-pink-500' : 'bg-pink-300'}`} style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className={`mb-6 inline-block px-4 py-2 rounded-full backdrop-blur-md ${isDark ? 'bg-white/10 border border-white/20' : 'bg-black/10 border border-black/20'}`}>
          <p className={`text-sm font-medium ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>Welcome to my portfolio</p>
        </div>

        <h1 className={`text-6xl md:text-7xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>
          Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Alex Rivera</span>
        </h1>

        <div className="h-24 md:h-20 mb-8 flex items-center justify-center">
          <p className={`text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent`}>
            {displayRole}<span className="animate-pulse">|</span>
          </p>
        </div>

        <p className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ${isDark ? 'text-white/60' : 'text-black/60'}`}>
          I craft beautiful, scalable web applications that solve real problems. Specializing in modern frontend architecture, backend optimization, and full-stack solutions.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-16">
          <button className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
            View My Work
          </button>
          <button className={`px-8 py-3 rounded-lg font-semibold backdrop-blur-md transition-all hover:scale-105 ${isDark ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20' : 'bg-black/10 text-black border border-black/20 hover:bg-black/20'}`}>
            Get in Touch
          </button>
        </div>

        <div className="flex gap-4 justify-center mb-16">
          {[{ icon: Github, label: 'GitHub' }, { icon: Linkedin, label: 'LinkedIn' }, { icon: Twitter, label: 'Twitter' }, { icon: Mail, label: 'Email' }].map(({ icon: Icon, label }) => (
            <a key={label} href="#" className={`p-3 rounded-lg backdrop-blur-md transition-all hover:scale-110 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'}`}>
              <Icon size={20} />
            </a>
          ))}
        </div>

        <button onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })} className="animate-bounce">
          <ChevronDown size={32} className={isDark ? 'text-white/40' : 'text-black/40'} />
        </button>
      </div>
    </section>
  );

  const Services = () => (
    <section id="services" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            My <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>What I can build for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, description }) => (
            <div key={title} className={`p-8 rounded-2xl backdrop-blur-md transition-all hover:scale-105 hover:shadow-xl ${isDark ? 'bg-white/5 border border-white/10 hover:bg-white/10' : 'bg-black/5 border border-black/10 hover:bg-black/10'}`}>
              <Icon className="text-blue-400 mb-4" size={32} />
              <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h3>
              <p className={isDark ? 'text-white/60' : 'text-black/60'}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Projects = () => (
    <section id="projects" className={`py-20 px-4 ${isDark ? 'bg-gradient-to-b from-black to-slate-900' : 'bg-gradient-to-b from-white to-slate-50'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Featured <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>Showcasing my best work</p>
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map(({ title, description, tech, image }) => (
            <div key={title} className={`rounded-2xl overflow-hidden backdrop-blur-md transition-all hover:scale-105 hover:shadow-2xl group ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
              <div className={`text-6xl p-8 flex items-center justify-center h-48 ${isDark ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100 to-purple-100'}`}>
                {image}
              </div>
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-black'}`}>{title}</h3>
                <p className={`mb-4 ${isDark ? 'text-white/60' : 'text-black/60'}`}>{description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {tech.map(t => (
                    <span key={t} className={`px-3 py-1 rounded-full text-xs font-medium ${isDark ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-200 text-blue-700'}`}>
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={16} /> Live Demo
                  </button>
                  <button className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${isDark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-black/10 text-black hover:bg-black/20'}`}>
                    <Github size={16} /> Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Skills = () => (
    <section id="skills" className={`py-20 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Skills & <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Experience</span>
          </h2>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-16">
          {stats.map(({ label, value }) => (
            <div key={label} className={`p-6 rounded-xl backdrop-blur-md text-center ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{value}</div>
              <p className={`text-sm mt-2 ${isDark ? 'text-white/60' : 'text-black/60'}`}>{label}</p>
            </div>
          ))}
        </div>

        {/* Skills by category */}
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map(({ category, items }) => (
            <div key={category}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-black'}`}>{category}</h3>
              <div className="space-y-4">
                {items.map(skill => (
                  <div key={skill} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-sm font-medium ${isDark ? 'text-white/70' : 'text-black/70'}`}>{skill}</span>
                      <span className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>90%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-black/10'}`}>
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 group-hover:w-full w-0" style={{ width: '90%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Contact = () => (
    <section id="contact" className={`py-20 px-4 ${isDark ? 'bg-gradient-to-b from-slate-900 to-black' : 'bg-gradient-to-b from-slate-50 to-white'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className={`text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-black'}`}>
            Let's <span className="bg-gradient-to-r from-blue-400 to-pink-400 bg-clip-text text-transparent">Work Together</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-white/60' : 'text-black/60'}`}>Have a project in mind? Let's talk about it.</p>
        </div>

        <div className={`rounded-2xl p-8 md:p-12 backdrop-blur-md ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none transition-all focus:ring-2 ${isDark ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-blue-500' : 'bg-black/10 border border-black/20 text-black placeholder-black/50 focus:ring-blue-500'}`} />
              <input type="email" placeholder="Your Email" className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none transition-all focus:ring-2 ${isDark ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-blue-500' : 'bg-black/10 border border-black/20 text-black placeholder-black/50 focus:ring-blue-500'}`} />
            </div>
            <input type="text" placeholder="Subject" className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none transition-all focus:ring-2 ${isDark ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-blue-500' : 'bg-black/10 border border-black/20 text-black placeholder-black/50 focus:ring-blue-500'}`} />
            <textarea placeholder="Your Message" rows="6" className={`w-full px-4 py-3 rounded-lg backdrop-blur-md outline-none transition-all focus:ring-2 resize-none ${isDark ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-blue-500' : 'bg-black/10 border border-black/20 text-black placeholder-black/50 focus:ring-blue-500'}`} />
            <button type="submit" className="w-full px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105">
              Send Message
            </button>
          </form>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className={`p-6 rounded-xl text-center backdrop-blur-md ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
            <Mail className="mx-auto mb-3 text-blue-400" size={24} />
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>alex@example.com</p>
          </div>
          <div className={`p-6 rounded-xl text-center backdrop-blur-md ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
            <Linkedin className="mx-auto mb-3 text-blue-400" size={24} />
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>linkedin.com/in/alex</p>
          </div>
          <div className={`p-6 rounded-xl text-center backdrop-blur-md ${isDark ? 'bg-white/5 border border-white/10' : 'bg-black/5 border border-black/10'}`}>
            <Github className="mx-auto mb-3 text-blue-400" size={24} />
            <p className={`text-sm ${isDark ? 'text-white/60' : 'text-black/60'}`}>github.com/alex</p>
          </div>
        </div>
      </div>
    </section>
  );

  const Footer = () => (
    <footer className={`border-t py-8 px-4 ${isDark ? 'bg-black border-white/10' : 'bg-white border-black/10'}`}>
      <div className="max-w-6xl mx-auto text-center">
        <p className={`${isDark ? 'text-white/50' : 'text-black/50'}`}>
          © 2024 Alex Rivera. Crafted with passion and modern web technologies.
        </p>
      </div>
    </footer>
  );

  return (
    <div className={isDark ? 'bg-black text-white' : 'bg-white text-black'}>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }

        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }

        .animate-pulse {
          animation: pulse-glow 4s ease-in-out infinite;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Selection color */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
        }
      `}</style>

      <NavBar />
      <Hero />
      <Services />
      <Projects />
      <Skills />
      <Contact />
      <Footer />

      {/* Floating buttons */}
      {scrollProgress > 20 && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all hover:scale-110 z-40"
        >
          ↑
        </button>
      )}
    </div>
  );
}
