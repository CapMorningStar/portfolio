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

    const syncSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', syncSize);

    const numStars = 180;
    const stars = Array.from({ length: numStars }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.8 + 0.2,
      speedY: Math.random() * 0.35 + 0.08,
      speedX: (Math.random() - 0.5) * 0.15,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: 1,
    }));

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        // Natural twinkle
        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 1) {
          star.alpha = 1;
          star.twinkleDir = -1;
        } else if (star.alpha <= 0.15) {
          star.alpha = 0.15;
          star.twinkleDir = 1;
        }

        // Natural celestial upward drift
        star.y -= star.speedY;
        star.x += star.speedX;

        // ONLY suck in stars when the mouse is physically near them in space
        if (mouseX > 0 && mouseY > 0) {
          const dx = mouseX - star.x;
          const dy = mouseY - star.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const suctionRadius = 140;

          if (dist < suctionRadius) {
            // Gentle, smooth suction inward directly to mouse center
            const pullForce = (1 - dist / suctionRadius) * 1.8;
            star.x += (dx / dist) * pullForce;
            star.y += (dy / dist) * pullForce;

            // When a real star reaches the center of the cursor, it is absorbed
            if (dist < 4) {
              star.alpha = 0;
              star.y = height + 10;
              star.x = Math.random() * width;
              star.alpha = Math.random() * 0.8 + 0.2;
            }
          }
        }

        // Wrap around borders
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
        if (star.y > height) star.y = 0;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;

        // Draw outer emerald halo
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${star.alpha * 0.25})`;
        ctx.fill();

        // Draw core star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', syncSize);
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
