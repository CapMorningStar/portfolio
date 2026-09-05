'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { ArrowUpRight, Github, Sparkles, CheckCircle2, RotateCw, ArrowLeft } from 'lucide-react';

export function ProjectsSection() {
  // Independent flipped state per card
  const [flippedIds, setFlippedIds] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const projects = portfolioData.projects;

  const categories = ['All', 'GenAI & LLMs', 'Machine Learning', 'Computer Vision', 'MLOps & Tools'];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="projects" className="mb-32 scroll-mt-[var(--nav-height)] select-none">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>PRODUCTION &amp; RESEARCH PROJECTS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Featured <span className="text-cyan-400">Projects</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm mt-3 max-w-xl mx-auto px-4">
          Production-grade LLM architectures, fine-tuning benchmarks, leakage-free tabular ML pipelines, and real-time computer vision engines.
        </p>

        {/* Category Filter Pills (Touch-Optimized Horizontal Scroll on Mobile) */}
        <div className="flex flex-wrap justify-center gap-2 mt-8 px-2">
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

      {/* 3D Smooth In-Place Flippable Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const isFlipped = flippedIds.has(project.id);

          return (
            <div
              key={project.id}
              className="h-[390px] w-full [perspective:1400px]"
            >
              {/* 3D Flipping Card Container */}
              <div
                style={{
                  transformStyle: 'preserve-3d',
                  WebkitTransformStyle: 'preserve-3d',
                }}
                className={`relative w-full h-full duration-700 transition-transform ease-in-out ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* 1. FRONT OF CARD */}
                <div
                  onClick={() => toggleFlip(project.id)}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg) translateZ(1px)',
                  }}
                  className="absolute inset-0 w-full h-full rounded-[2.2rem] bg-[#111111]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-colors p-6 sm:p-7 flex flex-col justify-between cursor-pointer shadow-[0_10px_40px_rgba(0,0,0,0.5)] group overflow-hidden"
                >
                  {/* Ambient Card Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${project.gradient} opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Top Bar */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.25em] text-cyan-400 font-mono truncate max-w-[75%]">
                      {project.number} — {project.category}
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                      {project.year}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="relative z-10 my-auto py-2">
                    <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2.5">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-xs leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tags & Flip Button */}
                  <div className="relative z-10 pt-3.5 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5 max-w-[65%]">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400 truncate"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-lg text-[8px] sm:text-[9px] font-bold text-gray-500 bg-white/5">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Interactive Flip Hint Button */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow-sm shrink-0">
                      <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
                      <span>FLIP</span>
                    </div>
                  </div>
                </div>

                {/* 2. BACK OF CARD */}
                <div
                  onClick={() => toggleFlip(project.id)}
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg) translateZ(1px)',
                  }}
                  className="absolute inset-0 w-full h-full rounded-[2.2rem] bg-[#121212] border border-cyan-500/40 p-6 sm:p-7 flex flex-col justify-between shadow-[0_15px_50px_rgba(6,182,212,0.15)] overflow-hidden cursor-pointer group"
                >
                  {/* Subtle Glow Accent */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />

                  {/* Top Bar on Back */}
                  <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400">
                      // ARCHITECTURE &amp; HIGHLIGHTS
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFlip(project.id);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-cyan-400 hover:text-black text-gray-300 text-[8px] sm:text-[9px] font-bold uppercase transition-all cursor-pointer shadow-sm"
                    >
                      <ArrowLeft className="w-2.5 h-2.5 text-cyan-400 group-hover:text-black" />
                      <span>Flip Back</span>
                    </button>
                  </div>

                  {/* Key Highlights Bullet List */}
                  <div className="relative z-10 my-auto py-1 space-y-2 overflow-y-auto pr-1">
                    {project.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[10px] sm:text-[11px] text-gray-200 leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action */}
                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 max-w-[50%]">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-[#1a1a1a] text-cyan-300 border border-white/5 truncate"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-black text-[9px] sm:text-[10px] uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 hover:scale-105 shrink-0 cursor-pointer"
                      >
                        <Github className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        <span>GitHub</span>
                        <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
