'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData, ProjectItem } from '@/data/portfolioData';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Github,
  Sparkles,
  CheckCircle2,
  RotateCw,
  X,
  Layers,
  Sparkle,
} from 'lucide-react';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalFlipped, setIsModalFlipped] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const projects = portfolioData.projects;

  const categories = ['All', 'GenAI & LLMs', 'Machine Learning', 'Computer Vision', 'MLOps & Tools'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const openProjectModal = (project: ProjectItem) => {
    setIsModalFlipped(false);
    setSelectedProject(project);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };

    if (selectedProject) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="mb-32 scroll-mt-28 select-none">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>PRODUCTION &amp; RESEARCH PROJECTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Featured <span className="text-cyan-400">Projects</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
          Production-grade LLM architectures, fine-tuning benchmarks, leakage-free tabular ML pipelines, and real-time computer vision engines.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {categories.map((cat) => {
            const count =
              cat === 'All'
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedProject(null);
                }}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20 scale-105 font-black'
                    : 'bg-[#141414] text-gray-400 border border-white/10 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-black/20 text-black font-bold' : 'bg-white/5 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => openProjectModal(project)}
            className="group relative overflow-hidden rounded-[2.2rem] bg-[#111111]/85 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between p-7 cursor-pointer hover:-translate-y-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            {/* Ambient Card Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none`}
            />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between mb-6">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-cyan-400 font-mono">
                {project.number} — {project.category}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                {project.year}
              </span>
            </div>

            {/* Title & Description */}
            <div className="relative z-10 mb-6">
              <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors leading-snug mb-3">
                {project.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tags & Action Button */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 rounded-lg text-[9px] font-bold text-gray-500 bg-white/5">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              {/* 3D Flip & Details Indicator */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all text-[10px] font-black uppercase tracking-wider shadow-sm shrink-0">
                <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                <span>Details</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating 3D Flippable Card in Front */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 [perspective:1600px]">
            {/* Clean Translucent Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Weightless Floating Animation Wrapper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              transition={{
                opacity: { duration: 0.3 },
                scale: { type: 'spring', stiffness: 320, damping: 26 },
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: 'easeInOut',
                },
              }}
              className="relative z-10 w-full max-w-3xl min-h-[500px] [perspective:1400px]"
            >
              {/* 3D Double-Sided Flipping Card */}
              <div
                className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ease-out ${
                  isModalFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* 1. FRONT SIDE OF FLOATING CARD (Overview & Quick Stats) */}
                <div className="w-full rounded-[2.5rem] bg-[#0c0c0c] border border-cyan-500/40 p-7 sm:p-10 text-white shadow-[0_30px_100px_rgba(0,0,0,1),0_0_60px_rgba(6,182,212,0.2)] [backface-visibility:hidden] relative overflow-hidden flex flex-col justify-between">
                  {/* Subtle Ambient Background Accent */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />

                  {/* Top Bar */}
                  <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                        <Layers className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-mono font-bold">
                          <span>{selectedProject.number}</span>
                          <span>//</span>
                          <span>{selectedProject.category}</span>
                          <span>//</span>
                          <span>{selectedProject.year}</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
                          {selectedProject.title}
                        </h3>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close dialog"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-black border border-white/10 flex items-center justify-center text-gray-200 transition-colors shrink-0 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Description */}
                  <div className="text-gray-200 text-xs sm:text-sm leading-relaxed mb-6 relative z-10 bg-[#161616] p-5 rounded-2xl border border-white/10 shadow-inner">
                    {selectedProject.description}
                  </div>

                  {/* Project Tag Grid */}
                  <div className="mb-6 p-4 rounded-2xl bg-[#141414] border border-white/5 relative z-10">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-gray-400 block mb-2.5">
                      Core Technologies &amp; Frameworks
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider bg-[#1f1f1f] border border-white/10 text-cyan-300 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: Flip to Architecture Details */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 relative z-10">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-4 py-2.5 rounded-full bg-[#181818] hover:bg-[#222222] border border-white/10 text-gray-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      Close
                    </button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsModalFlipped(true)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                    >
                      <RotateCw className="w-4 h-4 text-black" />
                      <span>Flip to Architecture Details ⟲</span>
                    </motion.button>
                  </div>
                </div>

                {/* 2. BACK SIDE OF FLOATING CARD (Architecture & Highlights) */}
                <div className="w-full rounded-[2.5rem] bg-[#0c0c0c] border border-cyan-500/50 p-7 sm:p-10 text-white shadow-[0_30px_100px_rgba(0,0,0,1),0_0_60px_rgba(6,182,212,0.25)] [transform:rotateY(180deg)] [backface-visibility:hidden] absolute inset-0 overflow-hidden flex flex-col justify-between">
                  {/* Subtle Ambient Background Accent */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />

                  {/* Top Bar on Back */}
                  <div className="flex items-start justify-between gap-4 mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-mono font-bold">
                          <span>ARCHITECTURE &amp; ENGINEERING SPECIFICATIONS</span>
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
                          {selectedProject.title}
                        </h3>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedProject(null)}
                      aria-label="Close dialog"
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-black border border-white/10 flex items-center justify-center text-gray-200 transition-colors shrink-0 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Architecture Highlights Panel */}
                  <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#141414] border border-cyan-500/30 space-y-3 relative z-10 shadow-inner">
                    <div className="flex items-center gap-2 text-[11px] font-mono font-black uppercase tracking-wider text-cyan-400 mb-1">
                      <Sparkle className="w-3.5 h-3.5 fill-cyan-400" />
                      <span>Deep Implementation Details</span>
                    </div>
                    <div className="space-y-3">
                      {selectedProject.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-100 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action: Flip Back to Overview + GitHub Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10 relative z-10">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsModalFlipped(false)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#181818] hover:bg-[#252525] border border-white/15 text-gray-200 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm"
                    >
                      <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                      <span>⟲ Flip Back to Overview</span>
                    </motion.button>

                    {selectedProject.github && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                      >
                        <Github className="w-4 h-4" />
                        <span>View Repository on GitHub</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
