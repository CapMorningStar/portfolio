'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import {
  Cpu,
  Quote,
  MapPin,
  Award,
  Sparkles,
  GraduationCap,
  ArrowUpRight,
} from 'lucide-react';

export function HeroBento() {
  const { personal, stats } = portfolioData;

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-28">
      {/* ================= COLUMN 1 (LEFT, 4 COLS) ================= */}
      <div className="md:col-span-4 flex flex-col gap-5">
        {/* CARD 1: Identity & Name (KSL Watermark) */}
        <div className="h-[270px] rounded-[2.5rem] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_10px_45px_rgba(0,0,0,0.4)] bg-[#111111]/70 backdrop-blur-xl border border-white/10 text-white group hover:border-emerald-500/40 transition-all duration-300">
          {/* Subtle Background Watermark: KSL */}
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -right-4 -bottom-10 text-[7.5rem] font-black leading-none text-white/[0.018] group-hover:text-emerald-500/[0.035] transition-colors tracking-tight"
          >
            {personal.initials}
          </span>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-emerald-400 font-black mb-4 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {personal.badge}
            </div>

            {/* One Row Full Name */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white whitespace-nowrap">
              KYAW SOE LWIN
            </h1>
          </div>

          {/* Clean Bottom Row */}
          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              <p className="text-xs font-bold text-gray-300 tracking-wider uppercase">
                Data Science & AI/ML
              </p>
            </div>
            
            <span className="text-[11px] font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              4.0 GPA
            </span>
          </div>
        </div>

        {/* CARD 4: Mindset & Honors */}
        <div className="h-[330px] rounded-[2.5rem] p-7 sm:p-8 flex flex-col justify-between shadow-[0_0_35px_rgba(255,255,255,0.04)] bg-[#111111]/70 backdrop-blur-xl border border-white/10 text-white group hover:border-emerald-500/30 transition-all">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">
                MINDSET & HONORS
              </h3>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              Excellence through discipline.{' '}
              <span className="text-white font-semibold">
                Jack Kent Cooke Semifinalist (2026)
              </span>{' '}
              and recipient of the{' '}
              <span className="text-emerald-400 font-semibold">
                Sterling Redman & F.L. Griffin Scholarships
              </span>
              . Approaching machine learning with mathematical rigor and continuous curiosity.
            </p>
          </div>

          {/* Academic Badge */}
          <div className="rounded-2xl p-4 bg-[#181818]/80 border border-white/10 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-emerald-400">
              <GraduationCap className="w-4 h-4" />
              <span className="text-[11px] font-black uppercase tracking-widest">
                UC San Diego · Data Science
              </span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-400 pt-1 border-t border-white/5">
              <span>Core Coursework</span>
              <span className="text-white font-bold text-[11px]">DSA · Linear Algebra · Calc</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COLUMN 2 (CENTER, 4 COLS) ================= */}
      {/* CARD 2: Heroic Tall Portrait Card (Height: 620px) */}
      <div className="md:col-span-4 h-[500px] md:h-[620px] rounded-[2.5rem] overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)] relative bg-[#141414]/90 backdrop-blur-xl border border-white/10 text-white flex flex-col justify-between group hover:border-emerald-500/40 transition-all duration-300">
        {/* Background Portrait Image */}
        <img
          src="/profile.jpg"
          alt="Kyaw Soe Lwin"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/35 pointer-events-none" />

        {/* Top Status Badges */}
        <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            AI/ML Engineer
          </span>
          <span className="text-[10px] font-mono font-bold text-gray-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
            2026
          </span>
        </div>

        {/* Bottom Metrics Bar */}
        <div className="relative z-10 p-6 sm:p-7">
          <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-center">
            {stats.slice(1, 4).map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-sm font-black text-emerald-400">{stat.value}</span>
                <span className="text-[8px] uppercase font-bold text-gray-400 tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= COLUMN 3 (RIGHT, 4 COLS) ================= */}
      <div className="md:col-span-4 flex flex-col gap-5">
        {/* CARD 3: CORE EXPERTISE (Height: 390px) */}
        <div className="h-[390px] rounded-[2.5rem] p-7 sm:p-8 flex flex-col justify-between shadow-[0_10px_35px_rgba(0,0,0,0.4)] bg-[#111111]/70 backdrop-blur-xl border border-white/10 text-white group hover:border-white/20 transition-all">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-white">
                CORE EXPERTISE
              </h3>
            </div>

            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
              Demonstrated expertise in building{' '}
              <span className="text-emerald-400 font-semibold">
                end-to-end Machine Learning pipelines, RAG architecture, Computer Vision, and Generative AI
              </span>
              , backed by statistical rigor and clean software architecture.
            </p>

            <div className="space-y-2 py-3 border-y border-white/10 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">RAG & GenAI</span>
                <span className="text-emerald-400 font-bold">Chroma · Claude API</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Tabular ML</span>
                <span className="text-emerald-400 font-bold">XGBoost · Optuna · SHAP</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Deep Learning & CV</span>
                <span className="text-emerald-400 font-bold">PyTorch · OpenCV · CNNs</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-2">
            {['Python', 'PyTorch', 'RAG', 'XGBoost', 'OpenCV', 'ChromaDB', 'Vertex AI', 'Docker'].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider bg-white/5 border border-white/10 text-gray-300 hover:border-emerald-500/40 hover:text-white transition-colors"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>

        {/* CARD 6: Location & Vision Quote Combined (Height: 210px) */}
        <div className="h-[210px] rounded-[2.5rem] p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden shadow-[0_0_35px_rgba(255,255,255,0.04)] bg-[#111111]/70 backdrop-blur-xl border border-white/10 text-white group hover:border-emerald-500/30 transition-all">
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/10 blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none" />

          {/* Quote & Philosophy Header */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                  San Diego, CA
                </span>
              </div>
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                {personal.coordinates}
              </span>
            </div>

            <p className="text-white text-xs sm:text-sm font-black leading-snug tracking-tight">
              “From raw data to grounded intelligence. Build models that solve real problems.”
            </p>
          </div>

          {/* Location Base Footer */}
          <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[10px] font-mono text-emerald-400 uppercase tracking-wider">
            <span>UC SAN DIEGO CAMPUS</span>
            <span>DATA SCIENCE &apos;28</span>
          </div>
        </div>
      </div>
    </section>
  );
}
