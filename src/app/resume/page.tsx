'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, Sparkles, ExternalLink } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-300 hover:text-white transition-all hover:-translate-x-0.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>KYAW SOE LWIN // RESUME</span>
          </div>

          <a
            href="/resume.pdf"
            download="Kyaw_Soe_Lwin_AI_ML_Resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black uppercase tracking-wider transition-all shadow-md shadow-cyan-500/20 hover:scale-105"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </a>
        </div>
      </header>

      {/* Main Resume Viewer Body */}
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-6 flex flex-col">
        <div className="w-full flex-1 rounded-3xl overflow-hidden border border-white/10 bg-[#141414] shadow-2xl min-h-[85vh]">
          <iframe
            src="/resume.pdf#toolbar=1&navpanes=0"
            className="w-full h-full min-h-[85vh] border-0"
            title="Kyaw Soe Lwin AI/ML Resume"
          />
        </div>
      </main>
    </div>
  );
}
