'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', id: 'home', href: '#home' },
    { label: 'Projects', id: 'projects', href: '#projects' },
    { label: 'Skills', id: 'skills', href: '#skills' },
    { label: 'Education', id: 'education', href: '#education' },
    { label: 'Methodology', id: 'services', href: '#services' },
    { label: 'Contact', id: 'contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ['home', 'projects', 'skills', 'education', 'services', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Pill Nav with Sliding Active Capsule */}
      <nav
        className={`hidden md:flex fixed top-7 left-1/2 -translate-x-1/2 z-50 items-center gap-1 p-1.5 rounded-full shadow-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[#121212]/90 backdrop-blur-2xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
            : 'bg-[#121212]/70 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.label}
              onClick={() => scrollTo(item.id)}
              className="relative px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-colors whitespace-nowrap z-10"
            >
              {/* Sliding Active Pill Capsule */}
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-full bg-white/15 border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] backdrop-blur-md -z-10"
                />
              )}

              <span className={isActive ? 'text-white font-black drop-shadow-sm' : 'text-gray-400 hover:text-gray-200'}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Contact/Hire Me Button */}
        <a
          href={`mailto:${portfolioData.personal.email}`}
          className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 hover:scale-105 transition-all shadow-md shadow-cyan-500/10"
        >
          <Sparkles className="w-3 h-3" />
          <span>Hire Me</span>
        </a>
      </nav>

      {/* Mobile Top Header */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-2xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            {portfolioData.personal.initials}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
            >
              Contact
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl w-9 h-9 transition bg-white/10 hover:bg-white/20 text-white"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="p-4 border-t border-white/10 flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.id)}
                className={`text-left px-4 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-colors ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white font-black'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
