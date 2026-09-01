'use client';

import React, { useEffect, useRef } from 'react';

export function CursorFollower() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringRadius = 18;
    let targetRadius = 18;
    let isHovering = false;
    let isClicking = false;
    let animId: number;

    const syncSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    syncSize();
    window.addEventListener('resize', syncSize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (ringX < 0) {
        ringX = mouseX;
        ringY = mouseY;
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'A';
        isHovering = !!isClickable;
      }
    };

    const handleMouseDown = () => (isClicking = true);
    const handleMouseUp = () => (isClicking = false);
    const handleMouseLeave = () => {
      mouseX = -100;
      mouseY = -100;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (mouseX > 0 && mouseY > 0) {
        // Tight, instant response (0.45) - dot and circle stay locked together
        ringX += (mouseX - ringX) * 0.45;
        ringY += (mouseY - ringY) * 0.45;

        targetRadius = isHovering ? 25 : isClicking ? 13 : 18;
        ringRadius += (targetRadius - ringRadius) * 0.3;

        // 1. Draw Outer Glowing Emerald Ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovering
          ? 'rgba(52, 211, 153, 0.95)'
          : isClicking
          ? 'rgba(110, 231, 183, 1)'
          : 'rgba(16, 185, 129, 0.65)';
        ctx.lineWidth = isHovering ? 1.8 : 1.4;
        ctx.shadowColor = 'rgba(16, 185, 129, 0.5)';
        ctx.shadowBlur = isHovering ? 12 : 6;
        ctx.stroke();

        ctx.fillStyle = isHovering
          ? 'rgba(16, 185, 129, 0.12)'
          : isClicking
          ? 'rgba(16, 185, 129, 0.2)'
          : 'rgba(16, 185, 129, 0.04)';
        ctx.fill();
        ctx.restore();

        // 2. Draw Center Precision Pointer Dot (Dead Center in the Ring)
        ctx.save();
        ctx.beginPath();
        const dotSize = isHovering ? 4 : 2.5;
        ctx.arc(ringX, ringY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? '#ffffff' : '#34d399';
        ctx.shadowColor = isHovering ? '#ffffff' : '#10b981';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', syncSize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[99999]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
