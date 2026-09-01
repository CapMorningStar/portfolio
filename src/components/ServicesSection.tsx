'use client';

import React from 'react';
import { Sparkles, ShieldCheck, Sliders, Eye, Network, CheckCircle2, ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const methodologies = [
    {
      step: '01',
      title: 'Leakage-Free Data Pipelines',
      tag: 'DATA INTEGRITY',
      badge: 'ColumnTransformer',
      description:
        'Strict feature preprocessing isolated strictly to training folds. Zero data snooping across numerical scaling (StandardScaler) and categorical encoding (OneHotEncoder).',
      bullets: [
        'Stratified 70/15/15 train/validation/test isolation',
        'Automated data validation and unit testing'
      ],
      icon: ShieldCheck,
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent'
    },
    {
      step: '02',
      title: 'Bayesian Hyperparameter Optimization',
      tag: 'MODEL TUNING',
      badge: 'Optuna Framework',
      description:
        'Multi-trial automated Bayesian search over tree depths, learning rates, and regularization penalties, targeting ROC-AUC and PR-AUC optimization.',
      bullets: [
        '<3.5 point generalization gap verification',
        'Cross-validated objective scoring'
      ],
      icon: Sliders,
      gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent'
    },
    {
      step: '03',
      title: 'SHAP Explainability & Business ROI',
      tag: 'INTERPRETABILITY',
      badge: 'Cost-Sensitive Modeling',
      description:
        'Global and local feature attribution via TreeSHAP to diagnose predictions. Integration of cost-benefit matrices ($20 retention cost / $200 LTV) to guide real-world decisions.',
      bullets: [
        'Feature contribution impact plots',
        'Custom decision threshold tuning'
      ],
      icon: Eye,
      gradient: 'from-purple-500/10 via-indigo-500/5 to-transparent'
    },
    {
      step: '04',
      title: 'Grounded RAG & Production Inference',
      tag: 'DEPLOYMENT',
      badge: 'ChromaDB & Claude API',
      description:
        'End-to-end document intelligence with page-by-page overlapping chunking, local sentence embeddings, vector cosine retrieval, and swappable LLM provider interfaces.',
      bullets: [
        'Deterministic source and page citations',
        'Swappable Claude API & local Ollama backends'
      ],
      icon: Network,
      gradient: 'from-emerald-500/10 via-slate-500/5 to-transparent'
    }
  ];

  return (
    <section id="services" className="mb-32 scroll-mt-28">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>PRODUCTION WORKFLOW & RIGOR</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Engineering <span className="text-emerald-400">Methodology</span>
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
              className="group relative overflow-hidden rounded-[2.5rem] p-8 sm:p-9 bg-[#121212]/80 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1 shadow-[0_10px_45px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              {/* Card Ambient Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-40 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative z-10">
                {/* Top Step & Badge */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-black uppercase tracking-[0.25em] text-emerald-400">
                      {item.step} // {item.tag}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono font-bold text-gray-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    {item.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-emerald-300 transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Bullets */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {item.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
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
