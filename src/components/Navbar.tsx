'use client';

import React, { useState, useEffect } from 'react';
import { portfolioData } from '@/data/portfolioData';
import { Menu, X, Sparkles } from 'lucide-react';

export function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Methodology', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.substring(1));
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Pill Nav */}
      <nav
        className={`hidden md:flex fixed top-7 left-1/2 -translate-x-1/2 z-50 items-center gap-1.5 p-1.5 rounded-full shadow-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[#121212]/85 backdrop-blur-2xl border border-white/10 shadow-black/80'
            : 'bg-[#121212]/60 backdrop-blur-xl border border-white/5 shadow-black/40'
        }`}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1);
          return (
            <button
              key={item.label}
              onClick={() => scrollTo(item.href)}
              className={`px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? 'bg-white/10 text-white shadow-inner border border-white/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          );
        })}

        {/* Contact/Action Badge */}
        <a
          href={`mailto:${portfolioData.personal.email}`}
          className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
        >
          <Sparkles className="w-3 h-3" />
          <span>Hire Me</span>
        </a>
      </nav>

      {/* Mobile Top Header */}
      <nav className="md:hidden fixed top-4 left-4 right-4 z-50 rounded-2xl shadow-2xl bg-[#121212]/85 backdrop-blur-xl border border-white/10 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
            {portfolioData.personal.initials}
          </span>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${portfolioData.personal.email}`}
              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
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
                onClick={() => scrollTo(item.href)}
                className="text-left px-4 py-2.5 text-xs font-black uppercase tracking-[0.2em] text-gray-300 hover:text-white hover:bg-white/5 rounded-xl"
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
