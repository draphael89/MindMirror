import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ExplosiveParticleEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const particles = Array.from({ length: 50 }, (_, i) => ({
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      scale: Math.random() * 0.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
    }));

    particles.forEach((particle, index) => {
      const element = document.createElement('div');
      element.className = 'absolute w-2 h-2 bg-white rounded-full';
      containerRef.current?.appendChild(element);

      motion.animate(element, {
        x: particle.x + 'vw',
        y: particle.y + 'vh',
        scale: particle.scale,
        opacity: [1, particle.opacity, 0],
      }, {
        duration: 1,
        ease: 'easeOut',
        delay: index * 0.02,
      });
    });

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
};

export default ExplosiveParticleEffect;