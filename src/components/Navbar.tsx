'use client';

import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  onOpenHireModal?: () => void;
}

export function Navbar({ onOpenHireModal }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isClickScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Education', id: 'education' },
    { label: 'Methodology', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (isClickScrolling.current) return;

      const sectionIds = ['home', 'projects', 'skills', 'education', 'services', 'contact'];
      const scrollPos = window.scrollY + 260;

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

    isClickScrolling.current = true;
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }

    scrollTimeout.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 850);
  };

  const handleHireClick = () => {
    if (onOpenHireModal) {
      onOpenHireModal();
    } else {
      scrollTo('contact');
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
              className="relative px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-colors whitespace-nowrap z-10 select-none"
            >
              {/* Sliding Active Pill Capsule with Crisp Spring Physics */}
              {isActive && (
                <motion.div
                  layoutId="activeNavPill"
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 32,
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

        {/* High-Impact Hire Me Button (Opens Quick Connect & Resume Modal) */}
        <button
          onClick={handleHireClick}
          className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-cyan-400 text-black font-black hover:bg-cyan-300 hover:scale-105 transition-all shadow-lg shadow-cyan-500/25 cursor-pointer"
        >
          <Sparkles className="w-3 h-3 text-black" />
          <span>Hire Me</span>
        </button>
      </nav>

      {/* Mobile Top Header */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-2xl bg-[#121212]/90 backdrop-blur-xl border border-white/10 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400">
            {portfolioData.personal.initials}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleHireClick}
              className="px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-cyan-400 text-black font-black shadow-md shadow-cyan-500/20"
            >
              Hire Me
            </button>
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
