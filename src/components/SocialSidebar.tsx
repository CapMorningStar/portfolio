'use client';

import React, { useState } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Github, Linkedin, Mail, Phone, Check } from 'lucide-react';

export function SocialSidebar() {
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const socials = [
    {
      name: 'GitHub',
      value: 'github.com/CapMorningStar',
      href: portfolioData.personal.github,
      icon: Github,
      external: true,
      copyValue: portfolioData.personal.github,
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/kyaw-soe-lwin',
      href: portfolioData.personal.linkedin,
      icon: Linkedin,
      external: true,
      copyValue: portfolioData.personal.linkedin,
    },
    {
      name: 'Email',
      value: 'kylwin@ucsd.edu',
      href: 'mailto:kylwin@ucsd.edu',
      icon: Mail,
      external: false,
      copyValue: 'kylwin@ucsd.edu',
    },
    {
      name: 'Phone',
      value: '+1 650-609-8498',
      href: 'tel:+16506098498',
      icon: Phone,
      external: false,
      copyValue: '+1 650-609-8498',
    },
  ];

  const handleCopy = (name: string, copyVal: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(copyVal);
      setCopiedLabel(name);
      setTimeout(() => setCopiedLabel(null), 2200);
    }
  };

  return (
    <aside className="fixed top-1/2 -translate-y-1/2 left-4 sm:left-6 z-50 hidden lg:flex flex-col items-center gap-3 p-2.5 rounded-full shadow-2xl bg-[#121212]/85 backdrop-blur-2xl border border-white/10 text-white">
      {socials.map((social) => {
        const Icon = social.icon;
        const isCopied = copiedLabel === social.name;

        return (
          <div key={social.name} className="relative group flex items-center">
            <a
              href={social.href}
              target={social.external ? '_blank' : undefined}
              rel={social.external ? 'noopener noreferrer' : undefined}
              aria-label={social.name}
              onClick={() => {
                if (!social.external) {
                  handleCopy(social.name, social.copyValue);
                }
              }}
              className={`inline-flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 ${
                isCopied
                  ? 'bg-cyan-400 text-black border border-cyan-300 scale-105'
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-white/10 hover:border hover:border-cyan-500/30'
              }`}
            >
              {isCopied ? (
                <Check className="w-5 h-5 text-black animate-in zoom-in" />
              ) : (
                <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              )}
            </a>

            {/* Rich Hover/Tap Tooltip Pill */}
            <div className="pointer-events-none absolute left-full ml-3.5 px-3 py-1.5 bg-[#181818] text-white border border-white/15 rounded-xl opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-2xl flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-cyan-400">
                {isCopied ? '✓ Copied' : social.name}:
              </span>
              <span className="text-[10px] font-medium text-gray-200">
                {social.value}
              </span>
            </div>
          </div>
        );
      })}
    </aside>
  );
}
