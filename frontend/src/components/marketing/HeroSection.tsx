import React, { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { IconBrain, IconMicrophone, IconPencil } from '@tabler/icons-react';
import { CanvasRevealEffect } from '../ui/canvas-reveal-effect';
import { BackgroundBeams } from '../ui/background-beams';
import { FlipWords } from '../ui/flip-words';
import { useVisibilityChange } from '../../hooks/useVisibilityChange';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const isVisible = useVisibilityChange();

  const logPerformance = useCallback(() => {
    if (window.performance) {
      const perfEntries = window.performance.getEntriesByType("navigation");
      console.log("Navigation performance:", perfEntries[0]);
      
      const paintEntries = window.performance.getEntriesByType("paint");
      console.log("Paint performance:", paintEntries);
    }
  }, []);

  useEffect(() => {
    console.log("HeroSection mounted");
    if (isInView) {
      console.log("HeroSection in view, starting animation");
      controls.start("visible");
    }
    logPerformance();
    return () => {
      console.log("HeroSection unmounted");
    };
  }, [isInView, controls, logPerformance]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  const subheadingFlipWords = [
    "Transform your raw thoughts into mind-bending essays, and discover who you truly are.",
    "Alchemize your mental chaos into gold. Watch your half-baked ideas morph into mind-blowing manifestos.",
    "Amplify your mental mutterings into earth-shaking epiphanies. Evolve into the badass thought leader you were meant to be.",
    "Turn your mental shitstorm into a Category 5 hurricane of brilliance. Discover the fucking genius lurking in your brain-folds."
  ];

  return (
    <section ref={sectionRef} className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden px-4 sm:px-6 lg:px-8 bg-background-cosmic pb-8 sm:pb-12"> {/* Reduced bottom padding */}
      <CanvasRevealEffect 
        containerClassName="absolute inset-0 z-10" 
        color="#4B0082" 
        duration={2000} 
        cascadeCount={5}
      />
      <BackgroundBeams
        className="absolute inset-0 z-0 opacity-50"
      />
      <div ref={contentRef} className="w-full max-w-8xl mx-auto relative z-30">
        <motion.div
          className="flex flex-col items-center justify-center text-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-extrabold mb-6 sm:mb-8 text-text-accent-cyan animate-glow tracking-tighter leading-none"
          >
            Fuse Your Mind with AI
          </motion.h1>
          <motion.div 
            variants={itemVariants} 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-text-light max-w-3xl mx-auto leading-relaxed"
          >
            <FlipWords 
              words={subheadingFlipWords}
              durations={subheadingFlipWords.map(() => 20000)}  // 20 seconds for each subheading
              className="text-glow-hover"
              isActive={isVisible}
            />
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center w-full sm:w-auto mb-12 sm:mb-16"
          >
            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
              <Link to="/signup">
                <button className="relative inline-flex h-16 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-text-accent-pink focus:ring-offset-2 focus:ring-offset-background-cosmic">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background-cosmic px-6 py-2 text-lg font-bold text-text-light backdrop-blur-3xl">
                    EVOLVE NOW
                  </span>
                </button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 w-full max-w-5xl mx-auto"
          >
            {[
              { icon: <IconMicrophone className="w-10 h-10 sm:w-14 sm:h-14" />, text: "Thought Capture" },
              { icon: <IconBrain className="w-10 h-10 sm:w-14 sm:h-14" />, text: "Neural Alchemy" },
              { icon: <IconPencil className="w-10 h-10 sm:w-14 sm:h-14" />, text: "Idea Manifestation" }
            ].map((item, index) => (
              <motion.div key={index} className="flex flex-col items-center" variants={itemVariants}>
                <motion.div variants={iconVariants} className="text-4xl sm:text-5xl mb-3 sm:mb-4 text-text-accent-pink">
                  {item.icon}
                </motion.div>
                <p className="text-text-light font-semibold text-base sm:text-lg">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);