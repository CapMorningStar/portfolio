'use client';

import React, { useEffect, useRef } from 'react';

export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isTabVisible = !document.hidden;

    const syncSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();

    let mouseX = -1000;
    let mouseY = -1000;
    let smoothMouseX = -1000;
    let smoothMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (smoothMouseX < 0) {
        smoothMouseX = mouseX;
        smoothMouseY = mouseY;
      }
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      smoothMouseX = -1000;
      smoothMouseY = -1000;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', syncSize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Lighter starfield: 95 delicate stars for clean aesthetics and high performance
    const numStars = 95;
    const stars = Array.from({ length: numStars }, () => {
      const baseAlpha = Math.random() * 0.7 + 0.25;
      const baseSize = Math.random() * 1.1 + 0.35;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        baseSize,
        size: baseSize,
        baseAlpha,
        alpha: baseAlpha,
        speedY: Math.random() * 0.3 + 0.06,
        speedX: (Math.random() - 0.5) * 0.12,
        twinkleSpeed: Math.random() * 0.015 + 0.004,
        twinkleDir: 1,
      };
    });

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Smoothly track mouse position to align with cursor follower ring (mouth of Casa)
      if (mouseX > 0 && mouseY > 0) {
        smoothMouseX += (mouseX - smoothMouseX) * 0.45;
        smoothMouseY += (mouseY - smoothMouseY) * 0.45;
      }

      stars.forEach((star) => {
        // Natural subtle twinkle
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= star.baseAlpha * 1.2) {
          star.alpha = star.baseAlpha * 1.2;
          star.twinkleDir = -1;
        } else if (star.alpha <= star.baseAlpha * 0.35) {
          star.alpha = star.baseAlpha * 0.35;
          star.twinkleDir = 1;
        }

        // Base upward cosmic drift
        star.y -= star.speedY;
        star.x += star.speedX;

        // Gentle, slow suction into the mouth of Casa (cursor ring)
        if (smoothMouseX > 0 && smoothMouseY > 0) {
          const dx = smoothMouseX - star.x;
          const dy = smoothMouseY - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const suctionRadius = 150;

          if (dist < suctionRadius) {
            const t = dist / suctionRadius;
            // Gentle, slower pull speed (0.46 max force vs previous fast 1.8)
            const pullForce = Math.pow(1 - t, 1.4) * 0.46;

            // Subtle curved drift into the mouth rather than a harsh direct snap
            const tangentX = -dy / (dist || 1);
            const tangentY = dx / (dist || 1);
            const swirlForce = (1 - t) * 0.28;

            star.x += (dx / (dist || 1)) * pullForce + tangentX * swirlForce;
            star.y += (dy / (dist || 1)) * pullForce + tangentY * swirlForce;

            // Smooth gradual absorption into the mouth of Casa (cursor ring ~18px)
            if (dist < 24) {
              const mouthFade = Math.max(0, (dist - 4) / 20);
              star.alpha = Math.min(star.alpha, star.baseAlpha * mouthFade);
              star.size = Math.max(0.1, star.baseSize * (0.35 + 0.65 * mouthFade));
            }

            // Once fully swallowed at center or faded out, respawn from the bottom
            if (dist <= 4 || star.alpha <= 0.02) {
              star.y = height + 10 + Math.random() * 20;
              star.x = Math.random() * width;
              star.alpha = star.baseAlpha;
              star.size = star.baseSize;
            }
          }
        }

        // Wrap around borders
        if (star.y < -5) {
          star.y = height + 5;
          star.x = Math.random() * width;
        }
        if (star.y > height + 30) star.y = -5;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        // Draw delicate outer Electric Cyan halo (lighter visual weight)
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${star.alpha * 0.2})`;
        ctx.fill();

        // Draw crisp core star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.9})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', syncSize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0a0a0a]/70 to-[#0a0a0a]" />
    </div>
  );
}
