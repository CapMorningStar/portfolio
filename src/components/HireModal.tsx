'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { portfolioData } from '@/data/portfolioData';
import {
  X,
  FileText,
  Download,
  Mail,
  Phone,
  Linkedin,
  Github,
  Check,
  Copy,
  ArrowUpRight,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HireModal({ isOpen, onClose }: HireModalProps) {
  const { personal } = portfolioData;
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  // Reset transitioning state on open
  useEffect(() => {
    if (isOpen) {
      setIsTransitioning(false);
    }
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCopy = (text: string, label: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedItem(label);
      setTimeout(() => setCopiedItem(null), 2000);
    }
  };

  const handlePreview = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onClose();
      router.push('/resume');
    }, 220);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop Blur with Smooth Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container with Spring Physics & Cinematic Exit Dissolve */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30, filter: 'blur(10px)' }}
            animate={
              isTransitioning
                ? { opacity: 0, scale: 0.96, y: -20, filter: 'blur(10px)' }
                : { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
            }
            exit={{ opacity: 0, scale: 0.94, y: 20, filter: 'blur(8px)' }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl rounded-[2.5rem] bg-[#121212]/95 border border-white/15 p-7 sm:p-9 text-white shadow-[0_25px_90px_rgba(0,0,0,0.95)] overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 blur-3xl rounded-full -mr-20 -mt-20 pointer-events-none" />

            {/* Top Bar: Title & Close Button */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-mono font-bold">
                    <span>KYAW SOE LWIN</span>
                    <span>//</span>
                    <span>AI &amp; ML ENGINEER</span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mt-0.5">
                    Quick Connect &amp; Resume
                  </h3>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={onClose}
                aria-label="Close modal"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Candidate Summary Card */}
            <div className="p-4 rounded-2xl bg-[#181818]/90 border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">UC San Diego · Data Science</h4>
                  <p className="text-xs text-gray-400">4.0 GPA · Jack Kent Cooke Semifinalist</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-full border border-cyan-500/20 w-fit">
                Open to 2026 Roles
              </span>
            </div>

            {/* Action 1: Resume Section with Cinematic Button Feedback */}
            <div className="mb-6 p-5 rounded-2xl bg-[#181818]/90 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(6,182,212,0.08)]">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0 shadow-inner">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">Official Resume (PDF)</h4>
                  <p className="text-xs text-gray-400">ATS-Formatted · 1-Page Summary · 2026 Edition</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* 1. Cinematic Preview Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  onClick={handlePreview}
                  className="group px-4 py-2.5 rounded-full bg-white/5 hover:bg-cyan-500/10 border border-white/15 hover:border-cyan-500/40 text-xs font-bold text-gray-200 hover:text-white flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <span>Preview</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </motion.button>

                {/* 2. Cinematic Download Button */}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  href="/api/resume"
                  download="Kyaw_Soe_Lwin_AI_ML_Resume.pdf"
                  className="px-5 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download</span>
                </motion.a>
              </div>
            </div>

            {/* Action Grid: Direct Contact Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
              {/* Email Button */}
              <div className="p-3.5 rounded-xl bg-[#181818]/90 border border-white/5 flex items-center justify-between gap-2 hover:border-cyan-500/30 transition-colors">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex items-center gap-2.5 min-w-0 flex-1 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Direct Email</span>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-white truncate block">
                      {personal.email}
                    </span>
                  </div>
                </a>

                <button
                  onClick={() => handleCopy(personal.email, 'email')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-300 transition-colors shrink-0"
                  title="Copy Email"
                >
                  {copiedItem === 'email' ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Button */}
              <div className="p-3.5 rounded-xl bg-[#181818]/90 border border-white/5 flex items-center justify-between gap-2 hover:border-cyan-500/30 transition-colors">
                <a
                  href={`tel:${personal.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-2.5 min-w-0 flex-1 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">Direct Call</span>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-white truncate block">
                      {personal.phone}
                    </span>
                  </div>
                </a>

                <button
                  onClick={() => handleCopy(personal.phone, 'phone')}
                  className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-300 transition-colors shrink-0"
                  title="Copy Phone"
                >
                  {copiedItem === 'phone' ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* LinkedIn Button */}
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#181818]/90 border border-white/5 flex items-center justify-between gap-2 hover:border-cyan-500/30 group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">LinkedIn Profile</span>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-white block">
                      kyaw-soe-lwin
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* GitHub Button */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-xl bg-[#181818]/90 border border-white/5 flex items-center justify-between gap-2 hover:border-cyan-500/30 group transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block uppercase">GitHub Repos</span>
                    <span className="text-xs font-bold text-gray-200 group-hover:text-white block">
                      CapMorningStar
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>

            {/* Footer Status */}
            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>San Diego, CA (Pacific Time)</span>
              </span>
              <span className="text-cyan-400">Fast Response (&lt;24 hrs)</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
