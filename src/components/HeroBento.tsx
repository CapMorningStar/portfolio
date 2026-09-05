'use client';

import React from 'react';
import Image from 'next/image';
import { portfolioData } from '@/data/portfolioData';
import { Sparkles, ArrowUpRight, Award, Brain, MapPin, Cpu, BookOpen, Quote } from 'lucide-react';

export function HeroBento() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="mb-24 scroll-mt-[var(--nav-height)]">
      {/* 2-Zone Master Grid: Left 8-Cols (Info Grid) + Right 4-Cols (Studio Portrait) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* ================= LEFT 8 COLUMNS: UNIFIED INFORMATION GRID ================= */}
        <div className="col-span-12 md:col-span-7 lg:col-span-8 flex flex-col gap-4">
          
          {/* CARD 1: TOP WIDE HERO IDENTITY BANNER */}
          <div
            onClick={() => scrollTo('education')}
            className="group relative rounded-[2.2rem] bg-[#111111]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-7 sm:p-8 flex flex-col justify-between overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* Subtle Watermark Initials */}
            <div className="absolute right-6 bottom-2 font-mono font-black text-6xl sm:text-7xl text-white/[0.03] select-none pointer-events-none tracking-tighter">
              {portfolioData.personal.initials}
            </div>

            {/* Top Bar: UC San Diego Data Science & 4.0 GPA */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>UC SAN DIEGO · DATA SCIENCE · CLASS OF 2028</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200 text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-wider">
                <span className="text-cyan-400">GPA</span>
                <span>4.0</span>
              </div>
            </div>

            {/* Main Headline Name */}
            <div className="relative z-10 my-4">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
                {portfolioData.personal.name}
              </h1>
            </div>

            {/* Sub-bar: Specialization & Quick Navigation Hint */}
            <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-300 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>AI &amp; ML SYSTEMS ENGINEER</span>
                <span className="text-gray-600 hidden sm:inline">//</span>
                <span className="text-gray-400 text-[11px] hidden sm:inline">PRODUCTION ML &amp; APPLIED RESEARCH</span>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 group-hover:text-white transition-colors">
                <span>View Academic Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>

          {/* ROW 2: TWO EQUAL-HEIGHT SYMMETRICAL CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 items-stretch">
            
            {/* CARD 3: CORE EXPERTISE */}
            <div
              onClick={() => scrollTo('skills')}
              className="group relative rounded-[2.2rem] bg-[#111111]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Brain className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    Core Expertise
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Body Text */}
              <p className="relative z-10 text-[11px] text-gray-300 leading-relaxed my-3">
                Demonstrated expertise in building <span className="text-cyan-300 font-bold">end-to-end Machine Learning pipelines</span>, <span className="text-cyan-300 font-bold">RAG architectures</span>, and <span className="text-cyan-300 font-bold">Computer Vision systems</span> backed by statistical rigor.
              </p>

              {/* Systems Breakdown */}
              <div className="relative z-10 space-y-1.5 py-2.5 border-y border-white/5 font-mono text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">RAG &amp; GenAI</span>
                  <span className="text-cyan-300 font-bold">Chroma · Claude API</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Tabular ML</span>
                  <span className="text-cyan-300 font-bold">XGBoost · Optuna · SHAP</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Deep Learning &amp; CV</span>
                  <span className="text-cyan-300 font-bold">PyTorch · OpenCV · CNNs</span>
                </div>
              </div>

              {/* 8 Tech Stack Pills */}
              <div className="relative z-10 grid grid-cols-4 gap-1.5 pt-3">
                {['Python', 'PyTorch', 'RAG', 'XGBoost', 'OpenCV', 'ChromaDB', 'Vertex AI', 'Docker'].map((tech) => (
                  <div
                    key={tech}
                    className="py-1 px-1 rounded-lg bg-white/5 border border-white/10 text-center text-[9px] font-mono font-bold uppercase text-gray-300 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors truncate"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 4: MINDSET, HONORS & ACADEMIC FOUNDATIONS */}
            <div
              onClick={() => scrollTo('education')}
              className="group relative rounded-[2.2rem] bg-[#111111]/90 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)] cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 blur-2xl rounded-full pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    Mindset &amp; Honors
                  </h3>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>

              {/* Body Text */}
              <p className="relative z-10 text-[11px] text-gray-300 leading-relaxed my-3">
                Excellence through discipline. <span className="text-white font-bold">Jack Kent Cooke Semifinalist (2026)</span> and recipient of the <span className="text-cyan-300 font-bold">Sterling Redman &amp; F.L. Griffin Scholarships</span>. Approaching machine learning with mathematical rigor.
              </p>

              {/* Academic Foundations Box */}
              <div className="relative z-10 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <div className="flex items-center gap-1.5 text-[9px] font-mono font-black uppercase text-cyan-400 tracking-wider mb-1">
                  <BookOpen className="w-3 h-3" />
                  <span>Academic Foundations</span>
                </div>
                <div className="text-[10px] font-mono text-gray-300">
                  <span className="text-gray-500">Core Focus: </span>
                  <span className="font-bold text-gray-200">DSA · Linear Algebra · Calc</span>
                </div>
              </div>

              {/* Vision Quote Footer */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-gray-400">
                <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                  <MapPin className="w-3 h-3" />
                  <span>SAN DIEGO, CA</span>
                </div>
                <span className="text-gray-500 uppercase tracking-wider">UC SAN DIEGO CAMPUS</span>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT 4 COLUMNS: STUDIO PORTRAIT CARD ================= */}
        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <div className="relative h-[650px] sm:h-[750px] md:h-full min-h-[580px] rounded-[2.2rem] overflow-hidden border border-white/10 group shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
            
            {/* Background Portrait Image */}
            <Image
              src="/profile.jpg"
              alt={portfolioData.personal.name}
              fill
              className="object-cover object-[center_top] group-hover:scale-105 transition-transform duration-700"
              priority
              sizes="(max-width: 1024px) 100vw, 33vw"
            />

            {/* Subtle Ambient Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </div>
        </div>

      </div>
    </section>
  );
}
