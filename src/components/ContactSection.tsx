'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Mail, Phone, MapPin, Send, Sparkles, Check, Copy, Github, Linkedin } from 'lucide-react';

export function ContactSection() {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="mb-28 scroll-mt-[var(--nav-height)]">
      <div className="max-w-4xl mx-auto rounded-[2.8rem] p-8 sm:p-12 bg-[#121212]/80 backdrop-blur-2xl border border-white/10 text-center relative overflow-hidden shadow-[0_10px_60px_rgba(0,0,0,0.6)]">
        {/* Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            <Sparkles className="w-3 h-3" />
            <span>LET&apos;S CONNECT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Get In <span className="text-cyan-400">Touch</span>
          </h2>

          <p className="text-gray-300 text-sm max-w-md mx-auto mb-10">
            Open to AI/ML engineering internships, research collaborations, and production machine learning roles.
          </p>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <a
              href={`mailto:${personal.email}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-cyan-400 text-black font-black text-xs uppercase tracking-widest hover:bg-cyan-300 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Email Directly</span>
            </a>

            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/20 border border-white/10 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
            </button>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-cyan-400 border border-white/10 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-cyan-400 border border-white/10 transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

          {/* Direct Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-white/10 text-xs">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Mail className="w-4 h-4 text-cyan-400" />
              <span>{personal.email}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{personal.phone}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>{personal.location}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
