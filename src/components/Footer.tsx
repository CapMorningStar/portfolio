'use client';

import React from 'react';
import { portfolioData } from '@/data/portfolioData';

export function Footer() {
  const { personal } = portfolioData;

  return (
    <footer className="py-12 border-t border-white/5 text-center text-xs text-gray-500 relative z-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-bold tracking-wider uppercase text-[11px] text-gray-400">
          &copy; {new Date().getFullYear()} {personal.name} · All rights reserved.
        </p>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">
          Data Science · Machine Learning · Generative AI
        </p>
      </div>
    </footer>
  );
}
