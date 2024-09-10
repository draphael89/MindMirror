import React, { useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FlipWords } from '../ui/flip-words';
import { useVisibilityChange } from '../../hooks/useVisibilityChange';

interface TextItem {
  text: string;
  duration: number;
}

const calculateDuration = (text: string): number => {
  const minDuration = 1500; // 1.5 seconds
  const maxDuration = 5000; // 5 seconds
  const factor = 50; // 50ms per character
  return Math.max(minDuration, Math.min(text.length * factor, maxDuration));
};

const Ascension: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isVisible = useVisibilityChange();

  const logPerformance = useCallback(() => {
    if (window.performance) {
      const perfEntries = window.performance.getEntriesByType("navigation");
      console.log("Ascension - Navigation performance:", perfEntries[0]);
      
      const paintEntries = window.performance.getEntriesByType("paint");
      console.log("Ascension - Paint performance:", paintEntries);
    }
  }, []);

  useEffect(() => {
    console.log("Ascension mounted");
    logPerformance();
    return () => {
      console.log("Ascension unmounted");
    };
  }, [logPerformance]);

  const texts: TextItem[] = useMemo(() => [
    "Think AI is just another hype?",
    "Wrong.",
    "It's the key to unlocking the fucking galaxy of creativity inside your skull.",
    // ... (keep the rest of the texts)
  ].map(text => ({ text, duration: calculateDuration(text) })), []);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 bg-cosmic-gradient from-background-cosmic-from to-background-cosmic-to overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="flex items-center justify-center">
            <FlipWords 
              words={texts.map(item => item.text)}
              durations={texts.map(item => item.duration)}
              className="text-glow-hover max-w-full font-bold tracking-wide leading-relaxed text-text-light px-4 sm:px-6 space-x-2 space-y-4"
              style={{
                fontSize: 'clamp(1.25rem, 3.5vw + 0.5rem, 3.5rem)',
                lineHeight: '1.4',
                letterSpacing: '0.02em',
                wordSpacing: '0.2em',
              }}
              isActive={isVisible}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(Ascension);