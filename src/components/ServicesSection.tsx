'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Sliders, Eye, Network, CheckCircle2 } from 'lucide-react';

export function ServicesSection() {
  const methodologies = [
    {
      step: '01',
      title: 'Leakage-Free Data Pipelines',
      tag: 'DATA INTEGRITY',
      badge: 'ColumnTransformer',
      description:
        'Every pipeline enforces strict train/validation/test isolation before any preprocessing touches the data — no scaler, encoder, or imputer ever sees information outside its designated fold.',
      bullets: [
        'Fold-isolated preprocessing across scaling, encoding, and imputation',
        'Automated validation and unit testing on every pipeline stage'
      ],
      icon: ShieldCheck,
      gradient: 'from-cyan-500/10 via-sky-500/5 to-transparent'
    },
    {
      step: '02',
      title: 'Bayesian Hyperparameter Optimization',
      tag: 'MODEL TUNING',
      badge: 'Optuna Framework',
      description:
        'Hyperparameters are tuned through automated multi-trial Bayesian search rather than manual guesswork, optimizing for the metric that actually matters to the problem — not just raw accuracy.',
      bullets: [
        'Cross-validated objective scoring to prevent overfitting',
        'Generalization gap tracked between train and validation splits'
      ],
      icon: Sliders,
      gradient: 'from-sky-500/10 via-blue-500/5 to-transparent'
    },
    {
      step: '03',
      title: 'SHAP Explainability & Business ROI',
      tag: 'INTERPRETABILITY',
      badge: 'Cost-Sensitive Modeling',
      description:
        'Every model ships with global and local feature attribution, so predictions can be explained — not just trusted. Decision thresholds are tuned against real cost-benefit tradeoffs instead of a fixed default.',
      bullets: [
        'Feature contribution and impact visualization',
        'Threshold tuning against business cost/benefit tradeoffs'
      ],
      icon: Eye,
      gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent'
    },
    {
      step: '04',
      title: 'Grounded RAG & Production Inference',
      tag: 'DEPLOYMENT',
      badge: 'ChromaDB & Claude API',
      description:
        'Retrieval pipelines are built for grounded, citeable answers — every response traces back to an exact source rather than a hallucinated guess, with a provider-agnostic architecture behind it.',
      bullets: [
        'Deterministic source citations on every generated answer',
        'Swappable cloud and local LLM backends'
      ],
      icon: Network,
      gradient: 'from-cyan-500/10 via-slate-500/5 to-transparent'
    }
  ];

  return (
    <section id="services" className="mb-32 scroll-mt-[var(--nav-height)]">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>PRODUCTION WORKFLOW & RIGOR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Engineering <span className="text-cyan-400">Methodology</span>
        </h2>
        <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
          The 4 core engineering standards applied across all machine learning pipelines, RAG systems, and data models.
        </p>
      </div>

      {/* 2x2 Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {methodologies.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-9 bg-[#121212]/80 backdrop-blur-xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_45px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              {/* Card Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Top Step & Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-black uppercase tracking-[0.25em] text-cyan-400 truncate">
                      {item.step} // {item.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10 whitespace-nowrap shrink-0">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Bullets */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {item.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
