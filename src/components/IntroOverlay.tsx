'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Terminal, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

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
    text: 'END-TO-END ML SYSTEMS',
    subtitle: 'Feature Pipelines · Cross-Validation · Real-Time Inference',
  },
  {
    step: '05',
    tag: 'READY',
    text: 'EXPERIENCE THE WORK',
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

interface Shockwave {
  r: number;
  maxR: number;
  lineWidth: number;
  alpha: number;
  speed: number;
  color: string;
}

interface SupernovaFlash {
  r: number;
  maxR: number;
  alpha: number;
}

export function IntroOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<IntroPhase>('singularity');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const explosionParticles = useRef<Particle[]>([]);
  const shockwaves = useRef<Shockwave[]>([]);
  const supernovaFlash = useRef<SupernovaFlash | null>(null);
  const backgroundStars = useRef<{ x: number; y: number; z: number; speed: number; size: number }[]>([]);

  const handleExit = (e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.stopPropagation();
      if ('preventDefault' in e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
    }
    if (isExiting) return;
    setIsExiting(true);
    document.body.style.overflow = 'auto';

    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'auto';
    }, 650);
  };

  // Phase Sequencer: Singularity -> Compression -> Detonation -> Starlight Voyage -> Matrix
  useEffect(() => {
    if (!isVisible) {
      document.body.style.overflow = 'auto';
      return;
    }
    document.body.style.overflow = 'hidden';

    // 1. Slow Singularity glowing -> Compression at 2.1s
    const t1 = setTimeout(() => {
      setPhase('compression');
    }, 2100);

    // 2. Compression -> Detonation (BOOM!) at 2.6s
    const t2 = setTimeout(() => {
      setPhase('detonation');
      if (typeof window !== 'undefined') {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const maxRadius = Math.max(window.innerWidth, window.innerHeight) * 1.3;

        // A. Multi-Hue Particle Burst (450 Particles)
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
        const pCount = 450;
        const particles: Particle[] = [];

        for (let i = 0; i < pCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 24 + 3;
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

        // B. Radial Shockwave Rings
        shockwaves.current = [
          {
            r: 5,
            maxR: maxRadius,
            lineWidth: 8,
            alpha: 1,
            speed: 36,
            color: '0, 240, 255',
          },
          {
            r: 5,
            maxR: maxRadius * 0.85,
            lineWidth: 12,
            alpha: 0.9,
            speed: 26,
            color: '192, 132, 252',
          },
          {
            r: 5,
            maxR: maxRadius * 0.65,
            lineWidth: 6,
            alpha: 0.8,
            speed: 18,
            color: '255, 255, 255',
          },
        ];

        // C. Supernova Flash Bloom
        supernovaFlash.current = {
          r: 10,
          maxR: Math.min(window.innerWidth, window.innerHeight) * 0.75,
          alpha: 1,
        };
      }
    }, 2600);

    // 3. Detonation -> Starlight Voyage ("// BEYOND THE HORIZON") at 3.9s
    const t3 = setTimeout(() => {
      setPhase('starlight_voyage');
    }, 3900);

    // 4. Starlight Voyage -> Graceful Dissolve -> Matrix (Name emerges) at 6.6s
    const t4 = setTimeout(() => {
      setPhase('matrix');
    }, 6600);

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

  // Word Matrix Step Sequencer: Generous, Equal Reading Time (3.6s per step)
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
    }, 3600);

    return () => clearInterval(interval);
  }, [isVisible, phase]);

  // Canvas Physics: Pure GPU Big Bang Explosion + Shockwaves + 3D Warp Starfield
  useEffect(() => {
    if (!isVisible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth || 1200);
    let height = (canvas.height = window.innerHeight || 800);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 3D background stars
    if (backgroundStars.current.length === 0) {
      backgroundStars.current = Array.from({ length: 280 }, () => ({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        speed: Math.random() * 1.8 + 0.8,
        size: Math.random() * 1.8 + 0.6,
      }));
    }

    const render = () => {
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#02000c';
      ctx.fillRect(0, 0, width, height);

      // 1. Render 3D Background Warp Starfield
      if (phase === 'detonation' || phase === 'starlight_voyage' || phase === 'matrix') {
        const starAcceleration = isExiting ? 32 : phase === 'starlight_voyage' ? 1.6 : 1;

        backgroundStars.current.forEach((star) => {
          star.z -= star.speed * starAcceleration;

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

            if (depthRatio > 0.7) {
              ctx.beginPath();
              ctx.arc(px, py, size * 2.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 0.4})`;
              ctx.fill();
            }
          }
        });
      }

      // 2. Render Supernova Flash Radiant Bloom
      if (supernovaFlash.current && supernovaFlash.current.alpha > 0) {
        const sf = supernovaFlash.current;
        sf.r += (sf.maxR - sf.r) * 0.12;
        sf.alpha *= 0.92;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sf.r);
        grad.addColorStop(0, `rgba(255, 255, 255, ${sf.alpha * 0.95})`);
        grad.addColorStop(0.25, `rgba(0, 240, 255, ${sf.alpha * 0.75})`);
        grad.addColorStop(0.6, `rgba(192, 132, 252, ${sf.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(2, 0, 12, 0)');

        ctx.beginPath();
        ctx.arc(cx, cy, sf.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        if (sf.alpha <= 0.01) supernovaFlash.current = null;
      }

      // 3. Render High-Speed Radial Shockwave Rings
      if (shockwaves.current.length > 0) {
        shockwaves.current.forEach((sw) => {
          sw.r += sw.speed;
          const progress = sw.r / sw.maxR;
          sw.alpha = Math.max(0, 1 - progress);

          if (sw.alpha > 0 && sw.r < sw.maxR) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, sw.r, 0, Math.PI * 2);
            ctx.lineWidth = Math.max(1, sw.lineWidth * (1 - progress * 0.7));
            ctx.strokeStyle = `rgba(${sw.color}, ${sw.alpha})`;
            ctx.shadowBlur = 15;
            ctx.shadowColor = `rgba(${sw.color}, 0.8)`;
            ctx.stroke();
            ctx.restore();
          }
        });

        shockwaves.current = shockwaves.current.filter((sw) => sw.r < sw.maxR && sw.alpha > 0);
      }

      // 4. Render Explosive Big Bang Particles
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
            ctx.shadowBlur = 10;
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
      onClick={(e) => handleExit(e)}
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center select-none overflow-hidden transition-all duration-700 ease-out cursor-pointer ${
        isExiting
          ? 'opacity-0 scale-110 blur-sm pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
      style={{ backgroundColor: '#02000c' }}
    >
      {/* 3D Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* ================= 1. PURE QUANTUM PROTON SINGULARITY ================= */}
      <AnimatePresence>
        {(phase === 'singularity' || phase === 'compression') && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {/* The Vibrating Quantum Singularity Particle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={
                phase === 'singularity'
                  ? {
                      scale: [0.75, 1.4, 1.1, 1.45],
                      opacity: [0.6, 1, 0.85, 1],
                      boxShadow: [
                        '0 0 35px #00f0ff, 0 0 70px #06b6d4, 0 0 110px #fff',
                        '0 0 90px #00f0ff, 0 0 160px #38bdf8, 0 0 220px #fff',
                        '0 0 50px #00f0ff, 0 0 100px #06b6d4, 0 0 140px #fff',
                        '0 0 100px #00f0ff, 0 0 180px #38bdf8, 0 0 250px #fff',
                      ],
                    }
                  : {
                      scale: [1.45, 0.05],
                      opacity: [1, 1],
                      boxShadow: '0 0 160px #ffffff, 0 0 260px #00f0ff',
                    }
              }
              transition={
                phase === 'singularity'
                  ? { duration: 2.1, ease: 'easeInOut' }
                  : { duration: 0.5, ease: 'easeIn' }
              }
              className="relative w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_90px_#00f0ff]"
            >
              <div className="w-4 h-4 rounded-full bg-cyan-300 animate-ping" />

              {/* Coronal Light Ring 1 */}
              <motion.div
                animate={{ rotate: 360, scale: [1, 1.25, 1] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
                className="absolute -inset-5 rounded-full border-2 border-cyan-400/60 pointer-events-none"
              />

              {/* Coronal Light Ring 2 */}
              <motion.div
                animate={{ rotate: -360, scale: [1.2, 0.8, 1.2] }}
                transition={{ repeat: Infinity, duration: 2.0, ease: 'linear' }}
                className="absolute -inset-9 rounded-full border border-cyan-300/40 border-dashed pointer-events-none"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 2. STARLIGHT COSMIC VOYAGE (Smooth Dissolve of BEYOND THE HORIZON) ================= */}
      <AnimatePresence>
        {phase === 'starlight_voyage' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, filter: 'blur(8px)' }}
              animate={{
                opacity: [0, 1, 1, 0],
                scale: [0.92, 1, 1.02, 1.08],
                filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(10px)'],
              }}
              transition={{
                duration: 2.7,
                times: [0, 0.25, 0.7, 1],
                ease: 'easeInOut',
              }}
              className="flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-black uppercase tracking-[0.35em] backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.25)]"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>// BEYOND THE HORIZON</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= 3. MOBILE-ONLY TOP-RIGHT SKIP BUTTON (ONLY VISIBLE WHEN NAME POPS UP) ================= */}
      {phase === 'matrix' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="md:hidden fixed top-4 right-4 z-40 pointer-events-auto"
        >
          <button
            onClick={(e) => handleExit(e)}
            onTouchEnd={(e) => handleExit(e)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400 text-black font-black text-[10px] uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.6)] cursor-pointer active:scale-95 transition-transform"
          >
            <span>Skip</span>
            <ChevronRight className="w-3 h-3 text-black" />
          </button>
        </motion.div>
      )}

      {/* ================= 4. TRUE VIEWPORT-PINNED CORNER HUD (Desktop Only) ================= */}
      {phase === 'matrix' && (
        <>
          {/* Top-Left: Genesis Telemetry */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-8 left-8 z-30 hidden md:flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-cyan-400 pointer-events-none"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>GENESIS BOOT // V3.0</span>
          </motion.div>

          {/* Top-Right: Step Counter (Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed top-8 right-8 z-30 hidden md:flex items-center gap-1.5 font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md pointer-events-none shadow-sm"
          >
            <span className="text-cyan-400 font-black">{current.step}</span>
            <span className="text-gray-600">//</span>
            <span>05</span>
          </motion.div>

          {/* Bottom-Left: Terminal Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed bottom-8 left-8 z-30 hidden md:flex items-center gap-2 text-[11px] font-mono text-gray-400 font-bold uppercase tracking-[0.25em] pointer-events-none"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE TERMINAL READY</span>
          </motion.div>

          {/* Bottom-Right: Clean Skip Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed bottom-8 right-8 z-30 hidden md:flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-cyan-400 hover:text-white transition-colors bg-white/5 hover:bg-cyan-500/20 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-sm"
          >
            <span>CLICK TO SKIP</span>
            <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
          </motion.div>
        </>
      )}

      {/* ================= 5. CENTER: RESPONSIVE SINGLE-ROW IDENTITY MATRIX ================= */}
      {phase === 'matrix' && (
        <div className="relative z-20 text-center max-w-5xl px-4 sm:px-6 w-full flex flex-col items-center justify-center my-auto pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 35, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 1.04 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center w-full"
            >
              {/* Tag Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.15 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.2 sm:px-4 sm:py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] sm:tracking-[0.35em] mb-4 sm:mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>{current.tag}</span>
              </motion.div>

              {/* Main Headline (Responsive Auto Scaling) */}
              <motion.h1
                initial={{ opacity: 0, scale: 0.90, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-[4.2rem] font-black uppercase tracking-tight text-white leading-none mb-3 sm:mb-4 drop-shadow-[0_15px_50px_rgba(0,0,0,1)] whitespace-nowrap overflow-hidden"
              >
                {current.text}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.35 }}
                className="text-[10px] sm:text-xs md:text-sm font-mono font-bold tracking-[0.15em] sm:tracking-[0.2em] text-gray-300 uppercase mt-1 sm:mt-2 whitespace-nowrap"
              >
                <span className="text-cyan-400">&gt; </span>
                {current.subtitle}
              </motion.p>

              {/* Step 5 Clean Call to Action Button */}
              {isFinalStep && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-6 sm:mt-8 pointer-events-auto"
                >
                  <button
                    onClick={(e) => handleExit(e)}
                    className="inline-flex items-center gap-2.5 sm:gap-3 px-7 py-3.5 sm:px-9 sm:py-4 rounded-full bg-cyan-400 text-black font-black text-[10px] sm:text-xs uppercase tracking-[0.25em] shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:bg-cyan-300 hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>ENTER PORTFOLIO</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Progress Segmented Bar (Synced with 3.6s Timing) */}
          <div className="mt-8 sm:mt-12 flex justify-center items-center gap-2 sm:gap-2.5">
            {introSteps.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.2 sm:h-1.5 rounded-full transition-all duration-700 ${
                  idx === currentIndex
                    ? 'w-9 sm:w-12 bg-cyan-400 shadow-[0_0_12px_#06b6d4]'
                    : idx < currentIndex
                    ? 'w-3 sm:w-4 bg-white/30'
                    : 'w-3 sm:w-4 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
