"use client";
import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

const ParticleEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);

  const createNewParticle = useCallback((width: number, startY: number): Particle => ({
    x: Math.random() * width,
    y: startY,
    vx: (Math.random() - 0.5) * 2,
    vy: Math.random() * 2 + 1,
    alpha: 0.5 + Math.random() * 0.5,
    color: lerpColor('#4B0082', '#1E90FF', Math.random()),
    size: 1 + Math.random() * 3
  }), []);

  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const createParticles = () => {
      const particles: Particle[] = [];
      for (let i = 0; i < 2000; i++) {
        particles.push(createNewParticle(canvas.width, canvas.height));
      }
      return particles;
    };

    particlesRef.current = createParticles();

    let pulseTimer = 0;
    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pulseTimer += 0.016; // Assuming 60fps
      const isPulsing = Math.sin(pulseTimer) > 0.7;

      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy + (isPulsing ? 1 : 0.5);

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -1;
        }
        if (particle.y > canvas.height) {
          Object.assign(particle, createNewParticle(canvas.width, 0));
        }

        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 100) {
          particle.vx += dx * 0.002;
          particle.vy += dy * 0.002;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha * (1 - scrollPosition / 2000);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [mousePosition, scrollPosition, createNewParticle]);

  useEffect(() => {
    if (canvasRef.current) {
      initializeParticles();
    }

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [initializeParticles]);

  const lerpColor = (a: string, b: string, t: number) => {
    const ah = parseInt(a.replace(/#/g, ''), 16);
    const ar = ah >> 16, ag = ah >> 8 & 0xff, ab = ah & 0xff;
    const bh = parseInt(b.replace(/#/g, ''), 16);
    const br = bh >> 16, bg = bh >> 8 & 0xff, bb = bh & 0xff;
    const rr = ar + t * (br - ar),
          rg = ag + t * (bg - ag),
          rb = ab + t * (bb - ab);
    return `#${((1 << 24) + (rr << 16) + (rg << 8) + rb | 0).toString(16).slice(1)}`;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};

export default ParticleEffect;