"use client";
import React, { useRef, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface CanvasRevealEffectProps {
  containerClassName?: string;
  color?: string;
  duration?: number;
  cascadeCount?: number;
}

export const CanvasRevealEffect: React.FC<CanvasRevealEffectProps> = ({
  containerClassName,
  color = '#4B0082',
  duration = 1000,
  cascadeCount = 3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const completion = Math.min(progress / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = color;

      for (let i = 0; i < cascadeCount; i++) {
        const cascadeCompletion = Math.max(0, Math.min(1, completion * cascadeCount - i));
        const radius = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) * cascadeCompletion;
        const alpha = 1 - cascadeCompletion;

        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(75, 0, 130, ${alpha})`;
        ctx.fill();
      }

      if (completion < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [color, duration, cascadeCount]);

  return (
    <div className={cn("h-full relative w-full", containerClassName)}>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};
