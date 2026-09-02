'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Zap, Terminal, ArrowRight, Sparkles } from 'lucide-react';

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

type IntroPhase = 'singularity' | 'compression' | 'detonation' | 'matrix';

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
  const backgroundStars = useRef<{ x: number; y: number; z: number; speed: number }[]>([]);

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

  // Phase Sequencer: Singularity -> Compression -> Detonation -> Matrix
  useEffect(() => {
    if (!isVisible) return;
    document.body.style.overflow = 'hidden';

    // 1. Singularity -> Compression at 1.8s
    const t1 = setTimeout(() => {
      setPhase('compression');
    }, 1800);

    // 2. Compression -> Detonation (Big Bang!) at 2.4s
    const t2 = setTimeout(() => {
      setPhase('detonation');
      // Spawn explosive particles at canvas center
      if (typeof window !== 'undefined') {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const colors = ['#00f0ff', '#38bdf8', '#818cf8', '#ffffff', '#22d3ee', '#c084fc'];
        const pCount = 380;
        const particles: Particle[] = [];

        for (let i = 0; i < pCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 22 + 4;
          particles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 3.5 + 1.2,
            alpha: 1,
            decay: Math.random() * 0.012 + 0.005,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
        explosionParticles.current = particles;
      }
    }, 2400);

    // 3. Detonation -> Matrix (Text emergence) at 3.3s
    const t3 = setTimeout(() => {
      setPhase('matrix');
    }, 3300);

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

  // Canvas Physics: Big Bang Explosion + Warp Starfield
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

    // Initialize background warp stars
    if (backgroundStars.current.length === 0) {
      backgroundStars.current = Array.from({ length: 220 }, () => ({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        speed: Math.random() * 1.5 + 0.8,
      }));
    }

    const cx = width / 2;
    const cy = height / 2;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#02000c';
      ctx.fillRect(0, 0, width, height);

      // 1. Render Background Warp Stars
      if (phase === 'matrix' || phase === 'detonation') {
        backgroundStars.current.forEach((star) => {
          star.z -= isExiting ? 28 : star.speed;

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

            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.fill();

            if (depthRatio > 0.75) {
              ctx.beginPath();
              ctx.arc(px, py, size * 1.8, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.35})`;
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
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.alpha -= p.decay;

          if (p.alpha > 0) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, p.alpha);
            ctx.shadowBlur = 12;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
          }
        });

        // Filter out dead particles
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

      {/* ================= PHASE 1 & 2: THE QUANTUM SINGULARITY & PROTON ================= */}
      <AnimatePresence>
        {(phase === 'singularity' || phase === 'compression') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            {/* The Vibrating Quantum Singularity Particle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                phase === 'singularity'
                  ? {
                      scale: [0.8, 1.35, 1, 1.4, 0.9, 1.3],
                      opacity: [0.7, 1, 0.8, 1, 0.9, 1],
                      boxShadow: [
                        '0 0 30px #00f0ff, 0 0 60px #06b6d4, 0 0 100px #fff',
                        '0 0 70px #00f0ff, 0 0 130px #38bdf8, 0 0 180px #fff',
                        '0 0 40px #00f0ff, 0 0 80px #06b6d4, 0 0 120px #fff',
                      ],
                    }
                  : {
                      scale: [1.2, 0.1],
                      opacity: [1, 1],
                      boxShadow: '0 0 120px #ffffff, 0 0 200px #00f0ff',
                    }
              }
              transition={
                phase === 'singularity'
                  ? { repeat: Infinity, duration: 1.4, ease: 'easeInOut' }
                  : { duration: 0.55, ease: [0.6, 0.05, -0.01, 0.9] }
              }
              className="relative w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-[0_0_80px_#00f0ff]"
            >
              {/* Core Proton Core */}
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-300 animate-ping" />

              {/* Orbital Light Ring 1 */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'linear' }}
                className="absolute -inset-4 rounded-full border border-cyan-400/60 pointer-events-none"
              />

              {/* Orbital Light Ring 2 (Perpendicular Axis) */}
              <motion.div
                animate={{ rotate: -360, scale: [1.1, 0.9, 1.1] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
                className="absolute -inset-8 rounded-full border border-cyan-300/30 border-dashed pointer-events-none"
              />
            </motion.div>

            {/* Singularity Monospace Telemetry */}
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
                  : 'CRITICAL MASS REACHED // DETONATING'}
              </span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= PHASE 3: BIG BANG RADIAL SHOCKWAVES ================= */}
      <AnimatePresence>
        {phase === 'detonation' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* Primary Shockwave 1 */}
            <motion.div
              initial={{ scale: 0, opacity: 1, borderWidth: '8px' }}
              animate={{ scale: 28, opacity: 0, borderWidth: '1px' }}
              transition={{ duration: 0.9, ease: [0.1, 0.9, 0.2, 1] }}
              className="absolute w-24 h-24 rounded-full border-cyan-300 shadow-[0_0_120px_#00f0ff]"
            />

            {/* Secondary Shockwave 2 */}
            <motion.div
              initial={{ scale: 0, opacity: 0.8, borderWidth: '12px' }}
              animate={{ scale: 22, opacity: 0, borderWidth: '2px' }}
              transition={{ duration: 1.1, delay: 0.1, ease: 'easeOut' }}
              className="absolute w-24 h-24 rounded-full border-purple-400 shadow-[0_0_90px_#c084fc]"
            />

            {/* Center Flash Glow */}
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-300 via-white to-purple-400 blur-2xl"
            />
          </div>
        )}
      </AnimatePresence>

      {/* ================= PHASE 4: HUD & REVELATION OF IDENTITY MATRIX ================= */}
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
