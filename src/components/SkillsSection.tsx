'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import {
  Sparkles,
  Sliders,
  Eye,
  Network,
  GitMerge,
  Filter,
  Cpu,
  Layers,
} from 'lucide-react';
import {
  SiPython,
  SiPostgresql,
  SiPandas,
  SiNumpy,
  SiGnubash,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiOpencv,
  SiHuggingface,
  SiAnthropic,
  SiGooglecloud,
  SiDocker,
  SiKubernetes,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa6';

export function SkillsSection() {
  const { skillsData } = portfolioData;

  const renderOfficialLogo = (name: string) => {
    const iconClass = "w-6 h-6 transition-all duration-300";
    
    switch (name) {
      // Column 1: Programming & Data
      case 'Python':
        return <SiPython className={`${iconClass} text-[#3776AB] group-hover:scale-110`} />;
      case 'SQL':
        return <SiPostgresql className={`${iconClass} text-[#4169E1] group-hover:scale-110`} />;
      case 'Java':
        return <FaJava className={`${iconClass} text-[#E76F00] group-hover:scale-110`} />;
      case 'Bash / Linux':
        return <SiGnubash className={`${iconClass} text-[#4EAA25] group-hover:scale-110`} />;
      case 'Pandas':
        return <SiPandas className={`${iconClass} text-[#150458] dark:text-[#E70488] group-hover:scale-110`} />;
      case 'NumPy':
        return <SiNumpy className={`${iconClass} text-[#013243] dark:text-[#4DABCF] group-hover:scale-110`} />;
      case 'Feature Engineering':
        return <Cpu className={`${iconClass} text-cyan-400 group-hover:scale-110`} />;
      case 'Data Preprocessing':
        return <Filter className={`${iconClass} text-sky-400 group-hover:scale-110`} />;

      // Column 2: Machine Learning & Deep Learning
      case 'PyTorch':
        return <SiPytorch className={`${iconClass} text-[#EE4C2C] group-hover:scale-110`} />;
      case 'TensorFlow & Keras':
        return <SiTensorflow className={`${iconClass} text-[#FF6F00] group-hover:scale-110`} />;
      case 'Scikit-Learn':
        return <SiScikitlearn className={`${iconClass} text-[#F7931E] group-hover:scale-110`} />;
      case 'XGBoost':
        return (
          <div className="w-6 h-6 rounded-md bg-[#239547]/20 border border-[#239547]/40 flex items-center justify-center font-black text-[9px] text-[#2ecc71] group-hover:scale-110 transition-transform">
            XGB
          </div>
        );
      case 'Optuna (Bayesian)':
        return <Sliders className={`${iconClass} text-cyan-400 group-hover:scale-110`} />;
      case 'SHAP Explainability':
        return <Eye className={`${iconClass} text-indigo-400 group-hover:scale-110`} />;
      case 'OpenCV (Computer Vision)':
        return <SiOpencv className={`${iconClass} text-[#5C3EE8] group-hover:scale-110`} />;
      case 'CNNs (mini-XCEPTION)':
        return <Layers className={`${iconClass} text-cyan-400 group-hover:scale-110`} />;

      // Column 3: Generative AI, LLMs & Cloud
      case 'RAG Architecture':
        return <Network className={`${iconClass} text-cyan-400 group-hover:scale-110`} />;
      case 'Hugging Face':
        return <SiHuggingface className={`${iconClass} text-[#FFD21E] group-hover:scale-110`} />;
      case 'ChromaDB (Vector DB)':
        return (
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-mono font-black text-[9px] text-white group-hover:scale-110 transition-transform shadow-md shadow-cyan-500/20">
            C
          </div>
        );
      case 'PEFT / LoRA Fine-Tuning':
        return <GitMerge className={`${iconClass} text-purple-400 group-hover:scale-110`} />;
      case 'RLHF & Prompt Eng':
        return <Sparkles className={`${iconClass} text-amber-400 group-hover:scale-110`} />;
      case 'Anthropic Claude API':
        return <SiAnthropic className={`${iconClass} text-[#D97757] group-hover:scale-110`} />;
      case 'AWS & GCP (Vertex AI)':
        return (
          <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
            <FaAws className="w-4 h-4 text-[#FF9900]" />
            <SiGooglecloud className="w-4 h-4 text-[#4285F4]" />
          </div>
        );
      case 'Docker & Kubernetes (GKE)':
        return (
          <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
            <SiDocker className="w-4 h-4 text-[#2496ED]" />
            <SiKubernetes className="w-4 h-4 text-[#326CE5]" />
          </div>
        );

      default:
        return <Cpu className={`${iconClass} text-cyan-400`} />;
    }
  };

  return (
    <section id="skills" className="mb-32 scroll-mt-28">
      <div className="max-w-7xl mx-auto rounded-[2.8rem] p-7 sm:p-12 bg-[#141414]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>CORE COMPETENCIES & STACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Technical <span className="text-cyan-400">Skills</span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
            Industry-standard toolsets across machine learning frameworks, GenAI ecosystems, deep learning architectures, and cloud MLOps.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsData.map((category) => (
            <div
              key={category.title}
              className="rounded-[2.2rem] p-6 sm:p-8 bg-[#101010]/80 backdrop-blur-xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-black text-sm uppercase tracking-widest text-cyan-400 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 gap-3.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-[#181818]/80 border border-white/5 hover:border-cyan-500/40 hover:-translate-y-1 hover:bg-[#1f1f1f] transition-all duration-200 cursor-default"
                    >
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 mb-2.5 transition-all shadow-inner">
                        {renderOfficialLogo(skill.name)}
                      </div>
                      <span className="text-[11px] font-bold text-gray-300 group-hover:text-white transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
