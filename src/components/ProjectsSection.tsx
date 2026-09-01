'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData, ProjectItem } from '@/data/portfolioData';
import { ArrowUpRight, Github, Sparkles, CheckCircle, X, Layers, Filter } from 'lucide-react';

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const projects = portfolioData.projects;

  const categories = ['All', 'GenAI & LLMs', 'Machine Learning', 'Computer Vision', 'MLOps & Tools'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="mb-32 scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>PRODUCTION & RESEARCH PROJECTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Featured <span className="text-emerald-400">Projects</span>
        </h2>
        <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
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
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 scale-105'
                    : 'bg-[#141414] text-gray-400 border border-white/10 hover:border-emerald-500/40 hover:text-white'
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative overflow-hidden rounded-[2.2rem] bg-[#111111]/70 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between p-7 cursor-pointer hover:-translate-y-1 shadow-[0_10px_40px_rgba(0,0,0,0.4)]"
          >
            {/* Ambient Card Background Gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none`}
            />

            {/* Top Bar */}
            <div className="relative z-10 flex items-center justify-between mb-8">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-emerald-400 font-mono">
                {project.number} — {project.category}
              </span>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                {project.year}
              </span>
            </div>

            {/* Title & Description */}
            <div className="relative z-10 mb-8">
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-emerald-300 transition-colors leading-snug mb-3">
                {project.title}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Tags & Action Button */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex items-end justify-between gap-2">
              <div className="flex flex-wrap gap-1.5 max-w-[80%]">
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

              <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 group-hover:bg-emerald-500 group-hover:text-black flex items-center justify-center text-white transition-all">
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clean Rectangular Modal (No scrollbars, cancel button on top right, highest z-index) */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl"
          onClick={() => setSelectedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl rounded-[2rem] bg-[#121212] border border-white/15 p-6 sm:p-8 text-white shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Top Bar with Title & Top-Right Cancel Button */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em] text-emerald-400 block mb-1">
                  {selectedProject.number} // {selectedProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {selectedProject.title}
                </h3>
              </div>

              {/* Cancel Button on Top Right */}
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 hover:text-black flex items-center justify-center text-gray-300 transition-all shrink-0 border border-white/10 hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
              {selectedProject.description}
            </p>

            {/* Key Technical Highlights */}
            <div className="mb-4 p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
                Key Highlights
              </h4>
              <ul className="space-y-1.5">
                {selectedProject.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-snug">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/10">
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {selectedProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase bg-white/5 border border-white/10 text-emerald-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500 text-black font-black text-xs uppercase tracking-wider hover:bg-emerald-400 transition-all hover:scale-105 shadow-md shadow-emerald-500/20 shrink-0"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
