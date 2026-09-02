'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Terminal, ArrowRight, Sparkles, Compass } from 'lucide-react';

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
    tag: 'SYSTEMS',
    text: 'MODELS & PIPELINES',
    subtitle: 'Production Machine Learning & Leakage-Free Architecture',
  },
  {
    step: '05',
    tag: 'READY',
    text: 'ENTER PORTFOLIO',
    subtitle: 'Production ML Pipelines & Applied AI Research',
  },
];

type IntroPhase = 'singularity' | 'compression' | 'detonation' | 'starlight_voyage' | 'matrix';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<IntroPhase>('singularity');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const explosionParticles = useRef<Particle[]>([]);
  const backgroundStars = useRef<{ x: number; y: number; z: number; speed: number; size: number }[]>([]);

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

  // Phase Sequencer: Singularity -> Compression -> Detonation -> Starlight Voyage -> Matrix
  useEffect(() => {
    if (!isVisible) return;
    document.body.style.overflow = 'hidden';

    // 1. Singularity -> Compression at 1.8s
    const t1 = setTimeout(() => {
      setPhase('compression');
    }, 1800);

    // 2. Compression -> Detonation (Big Bang explosion) at 2.3s
    const t2 = setTimeout(() => {
      setPhase('detonation');
      if (typeof window !== 'undefined') {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const colors = [
          '#00f0ff',
          '#38bdf8',
          '#818cf8',
          '#ffffff',
          '#22d3ee',
          '#c084fc',
          '#fbbf24',
          '#e0e7ff',
        ];
        const pCount = 480;
        const particles: Particle[] = [];

        for (let i = 0; i < pCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 26 + 4;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 4 + 1.2,
            alpha: 1,
            decay: Math.random() * 0.015 + 0.006,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        explosionParticles.current = particles;
      }
    }, 2300);

    // 3. Detonation -> Starlight Voyage (Stars shining for 2.2s) at 3.7s
    const t3 = setTimeout(() => {
      setPhase('starlight_voyage');
    }, 3700);

    // 4. Starlight Voyage -> Matrix (Name "KYAW SOE LWIN" emerges) at 5.9s
    const t4 = setTimeout(() => {
      setPhase('matrix');
    }, 5900);

    // Keydown skip listener
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  // Word Matrix Step Sequencer
  useEffect(() => {
    if (!isVisible || phase !== 'matrix') return;

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

    return () => clearInterval(interval);
  }, [isVisible, phase]);

  // Canvas Physics: Big Bang Explosion + 3D Warp Starfield
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

    // Initialize 3D background stars
    if (backgroundStars.current.length === 0) {
      backgroundStars.current = Array.from({ length: 260 }, () => ({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        speed: Math.random() * 1.8 + 0.8,
        size: Math.random() * 1.8 + 0.6,
      }));
    }

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#02000c';
      ctx.fillRect(0, 0, width, height);

      // 1. Render 3D Background Warp Starfield
      if (phase === 'detonation' || phase === 'starlight_voyage' || phase === 'matrix') {
        const starAcceleration = phase === 'starlight_voyage' ? 1.6 : 1;

        backgroundStars.current.forEach((star) => {
          star.z -= isExiting ? 28 : star.speed * starAcceleration;

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
            const size = Math.max(0.6, depthRatio * 2.8);
            const alpha = Math.min(1, depthRatio * 1.3);

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.fill();

            // Subtle electric cyan aura on close stars
            if (depthRatio > 0.7) {
              ctx.beginPath();
              ctx.arc(px, py, size * 2.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.4})`;
              ctx.fill();
            }
          }
        });
      }

      // 2. Render Explosive Big Bang Particles
      if (explosionParticles.current.length > 0) {
        explosionParticles.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.95; // realistic aerodynamic deceleration
          p.vy *= 0.95;
          p.alpha -= p.decay;

          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.shadowBlur = 15;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        });

        explosionParticles.current = explosionParticles.current.filter((p) => p.alpha > 0);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, phase, isExiting]);

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
      style={{ backgroundColor: '#02000c' }}
    >
      {/* 3D Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ================= 1. QUANTUM PROTON SINGULARITY ================= */}
      <AnimatePresence>
        {(phase === 'singularity' || phase === 'compression') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            {/* The Vibrating Quantum Singularity Particle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                phase === 'singularity'
                  ? {
                      scale: [0.85, 1.4, 1, 1.45, 0.9, 1.35],
                      opacity: [0.75, 1, 0.85, 1, 0.9, 1],
                      boxShadow: [
                        '0 0 35px #00f0ff, 0 0 70px #06b6d4, 0 0 110px #fff',
                        '0 0 80px #00f0ff, 0 0 150px #38bdf8, 0 0 200px #fff',
                        '0 0 45px #00f0ff, 0 0 90px #06b6d4, 0 0 130px #fff',
                      ],
                    }
                  : {
                      scale: [1.2, 0.08], // Compression before explosion
                      opacity: [1, 1],
                      boxShadow: '0 0 140px #ffffff, 0 0 220px #00f0ff',
                    }
              }
              transition={
                phase === 'singularity'
                  ? { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }
                  : { duration: 0.5, ease: [0.6, 0.05, -0.01, 0.9] }
              }
              className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_80px_#00f0ff]"
            >
              {/* Core Proton Core */}
              <div className="w-4 h-4 rounded-full bg-cyan-300 animate-ping" />

              {/* Coronal Light Ring 1 */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute -inset-5 rounded-full border-2 border-cyan-400/60 pointer-events-none"
              />

              {/* Coronal Light Ring 2 */}
              <motion.div
                animate={{ rotate: -360, scale: [1.15, 0.85, 1.15] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
                className="absolute -inset-9 rounded-full border border-cyan-300/40 border-dashed pointer-events-none"
              />
            </motion.div>

            {/* Monospace Telemetry */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: [0.4, 0.9, 0.4], y: 0 }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              className="mt-14 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.4em] text-cyan-400 font-bold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>
                {phase === 'singularity'
                  ? 'INITIALIZING QUANTUM SINGULARITY'
                  : 'CRITICAL MASS // DETONATING'}
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 2. THE BIG BANG COSMIC DETONATION ================= */}
      <AnimatePresence>
        {phase === 'detonation' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* Primary Shockwave Ring 1 (Cyan Supernova) */}
            <motion.div
              initial={{ scale: 0, opacity: 1, borderWidth: '10px' }}
              animate={{ scale: 32, opacity: 0, borderWidth: '1px' }}
              transition={{ duration: 1.1, ease: [0.1, 0.9, 0.2, 1] }}
              className="absolute w-24 h-24 rounded-full border-cyan-300 shadow-[0_0_140px_#00f0ff]"
            />

            {/* Secondary Shockwave Ring 2 (Violet Coronal Wave) */}
            <motion.div
              initial={{ scale: 0, opacity: 0.9, borderWidth: '14px' }}
              animate={{ scale: 25, opacity: 0, borderWidth: '2px' }}
              transition={{ duration: 1.3, delay: 0.08, ease: 'easeOut' }}
              className="absolute w-24 h-24 rounded-full border-purple-400 shadow-[0_0_100px_#c084fc]"
            />

            {/* Supernova Radiant Flare Core */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 8, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="w-48 h-48 rounded-full bg-gradient-to-r from-cyan-300 via-white to-purple-400 blur-3xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ================= 3. STARLIGHT COSMIC VOYAGE (Stars for ~2.2s) ================= */}
      <AnimatePresence>
        {phase === 'starlight_voyage' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-[0.35em] backdrop-blur-md"
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              <span>COSMOS EXPANDING · 3D SPACE INITIALIZED</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 4. GENESIS OF IDENTITY MATRIX ================= */}
      {phase === 'matrix' && (
        <>
          {/* TOP BAR */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-5xl flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono font-bold uppercase tracking-[0.25em] text-cyan-400 text-[11px]">
                GENESIS BOOT // V3.0
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <span className="text-cyan-400 font-black">{current.step}</span>
              <span className="text-gray-600">//</span>
              <span>05</span>
            </div>
          </motion.div>

          {/* CENTER: Identity & Credential Matrix (Single Clean Row Always) */}
          <div className="relative z-10 text-center max-w-5xl px-4 my-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 1.04 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center w-full"
              >
                {/* Tag Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-[0.35em] mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{current.tag}</span>
                </div>

                {/* Main Headline (Strictly 1 Single Row With Responsive Auto Sizing) */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-black uppercase tracking-tight text-white leading-none mb-4 drop-shadow-[0_15px_50px_rgba(0,0,0,1)] whitespace-nowrap overflow-hidden">
                  {current.text}
                </h1>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm md:text-base font-mono font-bold tracking-[0.2em] text-gray-300 uppercase mt-2 whitespace-nowrap">
                  <span className="text-cyan-400">&gt; </span>
                  {current.subtitle}
                </p>

                {/* Prominent Enter Button when ready */}
                {isFinalStep && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-8"
                  >
                    <div className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-cyan-400 text-black font-black text-xs uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:bg-cyan-300 hover:scale-105 transition-all">
                      <span>ENTER PORTFOLIO</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress Segmented Bar */}
            <div className="mt-12 flex justify-center items-center gap-2.5">
              {introSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    idx === currentIndex
                      ? 'w-12 bg-cyan-400 shadow-[0_0_12px_#06b6d4]'
                      : idx < currentIndex
                      ? 'w-4 bg-white/30'
                      : 'w-4 bg-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* BOTTOM BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10 text-[11px] font-mono text-gray-500 font-bold uppercase tracking-[0.25em]"
          >
            <div className="flex items-center gap-2 text-gray-400">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>INTERACTIVE TERMINAL READY</span>
            </div>

            <div className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10">
              <span>CLICK ANYWHERE TO ENTER</span>
              <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
