'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Briefcase, MapPin, Sparkles } from 'lucide-react';

export function ExperienceSection() {
  return (
    <section id="experience" className="mb-32 scroll-mt-[var(--nav-height)]">
      {/* Header — Uniform Centered Design System */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>CAREER &amp; INDUSTRY TRACK RECORD</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Professional <span className="text-cyan-400">Experience</span>
        </h2>
        <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto px-4">
          Applied data science, quantitative analytics, and public-interest engineering partnerships.
        </p>
      </div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {portfolioData.experience.map((exp, idx) => (
          <div
            key={idx}
            className="group relative rounded-[2.2rem] bg-[#111111]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-6 sm:p-8 overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 shadow-sm">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-wide">{exp.role}</h3>
                  <p className="text-xs sm:text-sm text-cyan-300 font-bold mt-0.5">
                    {exp.company} <span className="text-gray-500 font-normal">·</span> <span className="text-gray-300 font-medium">{exp.type}</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-gray-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400/80" /> {exp.location}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center text-[10px] sm:text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3.5 py-1.5 whitespace-nowrap shadow-sm">
                {exp.period}
              </span>
            </div>

            {/* Bullets */}
            <ul className="relative z-10 mt-5 space-y-2.5">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-xs sm:text-sm text-gray-300 leading-relaxed flex items-start gap-2.5">
                  <span className="text-cyan-400 mt-0.5 shrink-0 font-bold">▹</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            {/* Tools */}
            <div className="relative z-10 flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/5">
              {exp.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[10px] sm:text-[11px] font-mono text-gray-400 bg-white/5 border border-white/10 rounded-full px-3 py-1 hover:border-cyan-500/30 hover:text-cyan-300 transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
