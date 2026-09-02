'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Terminal, ArrowRight } from 'lucide-react';

const introSteps = [
  {
    step: '01',
    tag: 'WELCOME',
    text: 'KYAW SOE LWIN',
    subtitle: 'Data Science & Machine Learning Systems',
  },
  {
    step: '02',
    tag: 'EDUCATION',
    text: 'DATA SCIENCE @ UCSD',
    subtitle: 'University of California, San Diego · 4.0 GPA',
  },
  {
    step: '03',
    tag: 'SPECIALIZATION',
    text: 'AI & ML ENGINEER',
    subtitle: 'Generative AI · RAG · Computer Vision · Fine-Tuning',
  },
  {
    step: '04',
    tag: 'EXPERIENCE',
    text: 'SYSTEMS & MODELS',
    subtitle: 'Production Machine Learning & Leakage-Free Pipelines',
  },
  {
    step: '05',
    tag: 'READY',
    text: 'ENTER PORTFOLIO',
    subtitle: 'Production ML Pipelines & Applied AI Research',
  },
];

export function IntroOverlay() {
  // Default to true so there is ZERO flash of the main page on initial load
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Check if user already saw the intro in this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem('portfolio_intro_seen');
      if (hasSeen) {
        setIsVisible(false);
      }
    }
  }, []);

  const handleExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('portfolio_intro_seen', 'true');
    }
    setTimeout(() => {
      setIsVisible(false);
    }, 600);
  };

  // Warp starfield canvas background
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const numStars = 180;
    const stars = Array.from({ length: numStars }, () => ({
      x: (Math.random() - 0.5) * width * 2,
      y: (Math.random() - 0.5) * height * 2,
      z: Math.random() * width,
      speed: Math.random() * 1.5 + 0.8,
    }));

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#030014';
      ctx.fillRect(0, 0, width, height);
      ctx.shadowBlur = 0;

      stars.forEach((star) => {
        star.z -= isExiting ? 26 : star.speed;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 190 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthRatio = 1 - star.z / width;
          const size = Math.max(0.6, depthRatio * 2.5);
          const alpha = Math.min(1, depthRatio * 1.2);

          // Star Core
          ctx.beginPath();
          ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();

          // Subtle Cyan Edge
          if (depthRatio > 0.7) {
            ctx.beginPath();
            ctx.arc(px, py, size * 1.6, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.35})`;
            ctx.fill();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, isExiting]);

  // Paced transition: 2400ms per step
  useEffect(() => {
    if (!isVisible) return;
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < introSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 2400);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleExit();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const current = introSteps[currentIndex];
  const isFinalStep = currentIndex === introSteps.length - 1;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleExit}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-between p-8 sm:p-12 select-none cursor-pointer overflow-hidden transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{ backgroundColor: '#030014' }}
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* TOP BAR */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono font-bold uppercase tracking-[0.25em] text-cyan-400 text-[11px]">
            SYSTEM BOOT // V2.6
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
          <span className="text-cyan-400">{current.step}</span>
        </div>
      </div>

      {/* CENTER: Text Matrix */}
      <div className="relative z-10 text-center max-w-4xl px-4 my-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 25, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -25, scale: 1.02 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.35em] mb-6 backdrop-blur-md">
              <Zap className="w-3 h-3 text-cyan-400" />
              <span>{current.tag}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-4 drop-shadow-[0_10px_40px_rgba(0,0,0,0.9)]">
              {current.text}
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.25em] text-gray-300 uppercase mt-2">
              <span className="text-cyan-400">&gt; </span>
              {current.subtitle}
            </p>

            {/* Prominent Enter Button when ready */}
            {isFinalStep && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mt-8"
              >
                <div className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-cyan-500 text-black font-black text-xs uppercase tracking-[0.25em] shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:bg-cyan-400 hover:scale-105 transition-all">
                  <span>ENTER PORTFOLIO</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress Segmented Bar */}
        <div className="mt-10 flex justify-center items-center gap-2.5">
          {introSteps.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-400 ${
                idx === currentIndex
                  ? 'w-12 bg-cyan-400 shadow-[0_0_10px_#06b6d4]'
                  : idx < currentIndex
                  ? 'w-4 bg-white/30'
                  : 'w-4 bg-white/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-[11px] font-mono text-gray-500 font-bold uppercase tracking-[0.25em]">
        <div className="flex items-center gap-2 text-gray-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>INTERACTIVE TERMINAL READY</span>
        </div>

        <div className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10">
          <span>CLICK ANYWHERE TO START</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
