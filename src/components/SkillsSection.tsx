'use client';

import React from 'react';
import {
  Sparkles,
  Cpu,
  Brain,
  Database,
  Cloud,
  Layers,
  Terminal,
  Code2,
  Scan,
  GitBranch,
  Network,
} from 'lucide-react';

/* ================= AUTHENTIC TECHNOLOGY VECTOR ICONS ================= */

function IconPython({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M49 10 C32 10 33 17 33 17 L33 25 H50 V28 H24 C14 28 8 36 8 47 C8 58 14 62 18 62 H25 V54 C25 45 32 45 32 45 H49 C57 45 61 41 61 33 V18 C61 10 49 10 49 10 Z M41 16 A3 3 0 1 1 41 22 A3 3 0 1 1 41 16 Z" fill="#387EB8" />
      <path d="M51 90 C68 90 67 83 67 83 L67 75 H50 V72 H76 C86 72 92 64 92 53 C92 42 86 38 82 38 H75 V46 C75 55 68 55 68 55 H51 C43 55 39 59 39 67 V82 C39 90 51 90 51 90 Z M59 84 A3 3 0 1 1 59 78 A3 3 0 1 1 59 84 Z" fill="#FFE052" />
    </svg>
  );
}

function IconPyTorch({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M50 15 L53 23 L62 25 L56 32 L58 41 L50 36 L42 41 L44 32 L38 25 L47 23 Z" fill="#EE4C2C" />
      <path d="M72 35 A30 30 0 1 1 35 32 L42 39 A20 20 0 1 0 65 42 Z" fill="#EE4C2C" />
    </svg>
  );
}

function IconTensorFlow({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <polygon points="50,15 85,35 85,65 50,45" fill="#FF6F00" />
      <polygon points="50,15 15,35 15,65 50,45" fill="#FFA800" />
      <polygon points="50,55 85,75 50,95 15,75" fill="#E65100" />
    </svg>
  );
}

function IconXGBoost({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect width="100" height="100" rx="20" fill="#002D04" />
      <text x="50" y="65" textAnchor="middle" fill="#00DF00" fontSize="32" fontWeight="900" fontFamily="sans-serif">
        XGB
      </text>
    </svg>
  );
}

function IconScikitLearn({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="40" cy="50" r="26" fill="#F89939" opacity="0.85" />
      <circle cx="62" cy="50" r="26" fill="#3499CD" opacity="0.85" />
    </svg>
  );
}

function IconDocker({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect x="22" y="38" width="12" height="10" rx="2" fill="#2496ED" />
      <rect x="38" y="38" width="12" height="10" rx="2" fill="#2496ED" />
      <rect x="54" y="38" width="12" height="10" rx="2" fill="#2496ED" />
      <rect x="38" y="24" width="12" height="10" rx="2" fill="#2496ED" />
      <rect x="54" y="24" width="12" height="10" rx="2" fill="#2496ED" />
      <path d="M12 52 C14 48 30 48 40 52 C48 52 56 46 72 46 C84 46 90 56 90 64 C90 78 72 84 50 84 C24 84 10 74 12 52 Z" fill="#2496ED" />
    </svg>
  );
}

function IconClaude({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <rect width="100" height="100" rx="22" fill="#CC785C" />
      <text x="50" y="68" textAnchor="middle" fill="#FFFFFF" fontSize="48" fontWeight="900" fontFamily="sans-serif">
        AI
      </text>
    </svg>
  );
}

function IconHuggingFace({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="44" fill="#FFD21E" />
      <circle cx="36" cy="44" r="6" fill="#000000" />
      <circle cx="64" cy="44" r="6" fill="#000000" />
      <path d="M34 62 Q50 78 66 62" stroke="#000000" strokeWidth="5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function IconChromaDB({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="42" fill="#00D2FF" />
      <circle cx="64" cy="38" r="16" fill="#0A1128" />
    </svg>
  );
}

function IconPostgres({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="50" r="44" fill="#336791" />
      <path d="M30 40 Q50 20 70 40 Q80 70 50 82 Q20 70 30 40 Z" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

function IconGoogleCloud({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <path d="M38 65 L28 55 Q20 40 35 30 Q50 20 62 32 Q78 28 82 45 Q88 60 74 65 Z" fill="#4285F4" opacity="0.3" />
      <path d="M32 60 L24 50 A15 15 0 0 1 45 35 A22 22 0 0 1 72 40 A16 16 0 0 1 78 60 Z" stroke="#4285F4" strokeWidth="7" fill="none" />
      <circle cx="34" cy="52" r="5" fill="#EA4335" />
      <circle cx="50" cy="38" r="5" fill="#FBBC05" />
      <circle cx="66" cy="50" r="5" fill="#34A853" />
    </svg>
  );
}

function IconAWS({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <text x="50" y="46" textAnchor="middle" fill="#FFFFFF" fontSize="28" fontWeight="900" fontFamily="sans-serif">
        aws
      </text>
      <path d="M22 62 Q50 82 78 62" stroke="#FF9900" strokeWidth="7" strokeLinecap="round" fill="none" />
      <polygon points="76,56 84,65 72,68" fill="#FF9900" />
    </svg>
  );
}

function IconOpenCV({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <circle cx="50" cy="32" r="16" fill="#EE2C2C" />
      <circle cx="32" cy="66" r="16" fill="#1E88E5" />
      <circle cx="68" cy="66" r="16" fill="#00C853" />
      <circle cx="50" cy="32" r="7" fill="#0E1628" />
      <circle cx="32" cy="66" r="7" fill="#0E1628" />
      <circle cx="68" cy="66" r="7" fill="#0E1628" />
    </svg>
  );
}

function IconGeneric({ icon: Icon, color = "text-cyan-400" }: { icon: any; color?: string }) {
  return <Icon className={`w-7 h-7 ${color}`} />;
}

/* ================= 3 DOMAIN LANES SPECIFICATIONS ================= */

interface SkillItem {
  name: string;
  category: string;
  iconComponent: React.ReactNode;
}

const lane1GenAI: SkillItem[] = [
  { name: 'RAG Architecture', category: 'GenAI Systems', iconComponent: <IconGeneric icon={Network} color="text-cyan-400" /> },
  { name: 'Claude API', category: 'Anthropic LLMs', iconComponent: <IconClaude /> },
  { name: 'Hugging Face', category: 'Transformers', iconComponent: <IconHuggingFace /> },
  { name: 'PEFT / LoRA', category: 'Fine-Tuning', iconComponent: <IconGeneric icon={GitBranch} color="text-purple-400" /> },
  { name: 'ChromaDB', category: 'Vector Search', iconComponent: <IconChromaDB /> },
  { name: 'RLHF & Prompts', category: 'Alignment', iconComponent: <IconGeneric icon={Sparkles} color="text-amber-400" /> },
  { name: 'Vertex AI & GCP', category: 'Google Cloud', iconComponent: <IconGoogleCloud /> },
  { name: 'AWS Cloud', category: 'Infra & Deploy', iconComponent: <IconAWS /> },
];

const lane2DeepLearning: SkillItem[] = [
  { name: 'PyTorch', category: 'Deep Learning', iconComponent: <IconPyTorch /> },
  { name: 'TensorFlow & Keras', category: 'Neural Nets', iconComponent: <IconTensorFlow /> },
  { name: 'XGBoost', category: 'Gradient Boost', iconComponent: <IconXGBoost /> },
  { name: 'Scikit-Learn', category: 'Machine Learning', iconComponent: <IconScikitLearn /> },
  { name: 'Optuna', category: 'Bayesian HPO', iconComponent: <IconGeneric icon={Cpu} color="text-emerald-400" /> },
  { name: 'SHAP Analysis', category: 'Explainability', iconComponent: <IconGeneric icon={Scan} color="text-cyan-300" /> },
  { name: 'OpenCV', category: 'Computer Vision', iconComponent: <IconOpenCV /> },
  { name: 'CNNs & Vision', category: 'Deep Vision', iconComponent: <IconGeneric icon={Layers} color="text-indigo-400" /> },
];

const lane3DataScience: SkillItem[] = [
  { name: 'Python', category: 'Core Language', iconComponent: <IconPython /> },
  { name: 'SQL & PostgreSQL', category: 'Relational DB', iconComponent: <IconPostgres /> },
  { name: 'Pandas', category: 'Data Analysis', iconComponent: <IconGeneric icon={Database} color="text-pink-400" /> },
  { name: 'NumPy', category: 'Array Math', iconComponent: <IconGeneric icon={Code2} color="text-blue-400" /> },
  { name: 'Feature Eng', category: 'Pipelines', iconComponent: <IconGeneric icon={Cpu} color="text-cyan-400" /> },
  { name: 'Data Preprocessing', category: 'ETL Pipelines', iconComponent: <IconGeneric icon={Layers} color="text-teal-300" /> },
  { name: 'Linux / Bash', category: 'Environment', iconComponent: <IconGeneric icon={Terminal} color="text-emerald-400" /> },
  { name: 'Docker & Containers', category: 'Production MLOps', iconComponent: <IconDocker /> },
];

export function SkillsSection() {
  return (
    <section id="skills" className="mb-32 scroll-mt-28 relative overflow-hidden">
      
      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          <Sparkles className="w-3 h-3" />
          <span>CYBERNETIC TELEMETRY MATRIX</span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight">
          Skills &amp; <span className="text-cyan-400">Core Architecture</span>
        </h2>
        <p className="text-gray-400 text-sm mt-3 max-w-xl mx-auto">
          Active technical nodes across Generative AI, Machine Learning Systems, and Statistical Data Pipelines.
        </p>
      </div>

      {/* Main Cybernetic Circuit Container */}
      <div className="relative rounded-[2.5rem] bg-[#0c0c10]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        
        {/* PCB Ambient Circuit Trace Lines (SVG Background Grid) */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit-grid" width="140" height="140" patternUnits="userSpaceOnUse">
                <path d="M 0 70 L 40 70 L 70 40 L 140 40 M 70 40 L 70 0 M 70 140 L 70 100 L 100 70 L 140 70" fill="none" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1.2" />
                <circle cx="40" cy="70" r="3" fill="#00f0ff" />
                <circle cx="70" cy="40" r="3" fill="#00f0ff" />
                <circle cx="100" cy="70" r="3" fill="#00f0ff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit-grid)" />
          </svg>
        </div>

        {/* 3 Sequential Lanes Container */}
        <div className="space-y-10 relative z-10">

          {/* ================= LANE 1: AI, GENERATIVE LLMS & CLOUD ================= */}
          <div>
            {/* Clean Domain Header */}
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
                DOMAIN: AI, GENERATIVE LLMS &amp; CLOUD
              </span>
            </div>

            {/* Marquee Track (Drifting Right) */}
            <div className="relative w-full overflow-hidden group">
              <div className="flex gap-4 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
                {[...lane1GenAI, ...lane1GenAI].map((skill, idx) => (
                  <SkillCard key={`lane1-${idx}`} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* ================= LANE 2: DEEP LEARNING, MACHINE LEARNING & CV ================= */}
          <div>
            {/* Clean Domain Header */}
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-300">
                DOMAIN: DEEP LEARNING, MACHINE LEARNING &amp; CV
              </span>
            </div>

            {/* Marquee Track (Drifting Left) */}
            <div className="relative w-full overflow-hidden group">
              <div className="flex gap-4 w-max animate-marquee-left group-hover:[animation-play-state:paused]">
                {[...lane2DeepLearning, ...lane2DeepLearning].map((skill, idx) => (
                  <SkillCard key={`lane2-${idx}`} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* ================= LANE 3: DATA SCIENCE, PROGRAMMING & SYSTEMS ================= */}
          <div>
            {/* Clean Domain Header */}
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-[0.2em] text-cyan-300">
                DOMAIN: DATA SCIENCE, PROGRAMMING &amp; SYSTEMS
              </span>
            </div>

            {/* Marquee Track (Drifting Right) */}
            <div className="relative w-full overflow-hidden group">
              <div className="flex gap-4 w-max animate-marquee-right group-hover:[animation-play-state:paused]">
                {[...lane3DataScience, ...lane3DataScience].map((skill, idx) => (
                  <SkillCard key={`lane3-${idx}`} skill={skill} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Keyframes Injection for Smooth GPU Acceleration */}
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 34s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 34s linear infinite;
        }
      `}</style>
    </section>
  );
}

/* ================= REUSABLE CYBERNETIC SKILL CHIP CARD ================= */

function SkillCard({ skill }: { skill: SkillItem }) {
  return (
    <div className="group relative w-[170px] sm:w-[185px] h-[105px] rounded-2xl bg-[#141418]/85 border border-white/10 hover:border-cyan-400/60 p-3.5 flex flex-col justify-between backdrop-blur-md transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_25px_rgba(0,240,255,0.25)] select-none cursor-pointer overflow-hidden">
      
      {/* HUD Reticle Targeters on Hover */}
      <div className="absolute top-1.5 right-1.5 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <Scan className="w-3.5 h-3.5" />
      </div>

      {/* Top: Tech Icon */}
      <div className="flex items-center justify-between">
        <div className="p-1 rounded-lg bg-white/5 border border-white/10 group-hover:border-cyan-500/30 transition-colors">
          {skill.iconComponent}
        </div>
        <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-gray-500 group-hover:text-cyan-400 transition-colors">
          ACTIVE
        </span>
      </div>

      {/* Bottom: Tech Name & Category */}
      <div className="min-w-0">
        <h4 className="text-xs font-mono font-bold text-gray-100 uppercase tracking-tight group-hover:text-cyan-300 transition-colors truncate">
          {skill.name}
        </h4>
        <p className="text-[9px] font-mono text-gray-400 uppercase tracking-wider truncate mt-0.5">
          {skill.category}
        </p>
      </div>
    </div>
  );
}
