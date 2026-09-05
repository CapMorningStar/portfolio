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
    let isOverWidget = false;
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
        // Proximity check: bottom-right corner where MorningStar widget lives
        const distFromRight = window.innerWidth - mouseX;
        const distFromBottom = window.innerHeight - mouseY;
        const isNearWidgetCorner = distFromRight <= 90 && distFromBottom <= 90;

        isOverWidget =
          isNearWidgetCorner ||
          !!(
            target.closest('button[aria-label="Open MorningStar AI"]') ||
            target.closest('[data-hide-custom-cursor]') ||
            target.closest('.fixed.bottom-6.right-6')
          );

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

    let cursorOpacity = 1;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const targetOpacity = isOverWidget ? 0 : 1;
      cursorOpacity += (targetOpacity - cursorOpacity) * 0.25;

      if (mouseX > 0 && mouseY > 0 && cursorOpacity > 0.01) {
        // Tight, responsive follow
        ringX += (mouseX - ringX) * 0.45;
        ringY += (mouseY - ringY) * 0.45;

        targetRadius = isHovering ? 25 : isClicking ? 13 : 18;
        ringRadius += (targetRadius - ringRadius) * 0.3;

        ctx.save();
        ctx.globalAlpha = cursorOpacity;

        // 1. Draw Outer Glowing Electric Cyan Ring
        ctx.save();
        ctx.beginPath();
        ctx.arc(ringX, ringY, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovering
          ? 'rgba(56, 189, 248, 0.95)'
          : isClicking
          ? 'rgba(125, 211, 252, 1)'
          : 'rgba(6, 182, 212, 0.65)';
        ctx.lineWidth = isHovering ? 1.8 : 1.4;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
        ctx.shadowBlur = isHovering ? 12 : 6;
        ctx.stroke();

        ctx.fillStyle = isHovering
          ? 'rgba(6, 182, 212, 0.15)'
          : isClicking
          ? 'rgba(6, 182, 212, 0.25)'
          : 'rgba(6, 182, 212, 0.04)';
        ctx.fill();
        ctx.restore();

        // 2. Draw Center Precision Pointer Dot (Electric Cyan)
        ctx.save();
        ctx.beginPath();
        const dotSize = isHovering ? 4 : 2.5;
        ctx.arc(ringX, ringY, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = isHovering ? '#ffffff' : '#22d3ee';
        ctx.shadowColor = isHovering ? '#ffffff' : '#06b6d4';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();

        ctx.restore(); // Restore globalAlpha
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
