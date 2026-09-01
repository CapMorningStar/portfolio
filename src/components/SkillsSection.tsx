'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';
import {
  Code,
  Database,
  Brain,
  Cpu,
  Layers,
  Sparkles,
  Terminal,
  Activity,
  Cloud,
  Lock,
  GitBranch,
  Workflow,
} from 'lucide-react';

export function SkillsSection() {
  const { skillsData } = portfolioData;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'python':
      case 'code':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'database':
        return <Database className="w-5 h-5 text-cyan-400" />;
      case 'terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'flame':
      case 'brain':
        return <Brain className="w-5 h-5 text-purple-400" />;
      case 'activity':
      case 'zap':
      case 'sliders':
        return <Activity className="w-5 h-5 text-amber-400" />;
      case 'cloud':
        return <Cloud className="w-5 h-5 text-blue-400" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section id="skills" className="mb-32 scroll-mt-28">
      <div className="max-w-7xl mx-auto rounded-[2.8rem] p-7 sm:p-12 bg-[#141414]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              <Sparkles className="w-3 h-3" />
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
              Technical <span className="text-emerald-400">Skills</span>
            </h2>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
            Rigorous foundations across programming languages, machine learning frameworks, GenAI tools, and cloud MLOps.
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
                <h3 className="font-black text-sm uppercase tracking-widest text-emerald-400 mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {category.title}
                </h3>

                <div className="grid grid-cols-2 gap-3.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-[#181818]/80 border border-white/5 hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-200"
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 group-hover:border-emerald-500/50 mb-2.5 transition-colors">
                        {getIcon(skill.iconName)}
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
