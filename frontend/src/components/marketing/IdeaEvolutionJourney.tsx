import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Plant the Seed of Genius",
    description: "Forget typing, this isn't the Stone Age. Speak your raw, unfiltered thoughts and watch as our voice-to-text sorcery plants them deep in digital soil. It's not just recording; it's capturing the very essence of your cognitive chaos.",
    image: "/sticky-scroll/Step1.png"
  },
  {
    title: "AI Alchemy Nurtures Your Sprout",
    description: "Holy shit, watch it grow! Our neural networks don't just water your idea-seedling, they infuse it with cognitive steroids. Your nascent thought is evolving, mutating, becoming something that defies the laws of mental physics.",
    image: "/sticky-scroll/Step2.png"
  },
  {
    title: "Harvest Your Mind-Bending Creation",
    description: "Behold the fruit of your neural labor! A fully-formed, polished essay emerges, dripping with the nectar of your unique genius. It's not just words on a page; it's your consciousness, crystallized and ready to blow minds.",
    image: "/sticky-scroll/Step3.png"
  },
  {
    title: "Cultivate Your Cosmic Idea Garden",
    description: "You're not just writing essays; you're terraforming the landscape of thought itself. Each idea you plant and nurture adds to your ever-expanding universe of concepts. Welcome to your personal cognitive Eden, mortal.",
    image: "/sticky-scroll/Step4.png"
  }
];

const DesktopStep: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * index]);

  return (
    <motion.div 
      ref={ref}
      className={cn(
        "flex items-center justify-between mb-24",
        index % 2 === 0 ? "flex-row" : "flex-row-reverse"
      )}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <motion.div className="w-1/2 pr-8" style={{ y }}>
        <h3 className="text-2xl font-bold mb-4 text-primary-light">{step.title}</h3>
        <p className="text-lg text-text-light">{step.description}</p>
      </motion.div>
      <motion.div 
        className="w-1/2 relative overflow-hidden rounded-lg shadow-xl"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img src={step.image} alt={step.title} className="w-full h-auto" />
        <div className={cn(
          "absolute inset-0 opacity-30 transition-opacity duration-300",
          `bg-gradient-to-br from-primary-light to-secondary-light`
        )} />
      </motion.div>
    </motion.div>
  );
};

const MobileStep: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div 
      ref={ref}
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <div className="relative mb-4 overflow-hidden rounded-lg shadow-xl">
        <img src={step.image} alt={step.title} className="w-full h-auto" />
        <div className={cn(
          "absolute inset-0 opacity-30",
          `bg-gradient-to-br from-primary-light to-secondary-light`
        )} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-primary-light">{step.title}</h3>
      <p className="text-base text-text-light">{step.description}</p>
    </motion.div>
  );
};

const IdeaEvolutionJourney: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-background-cosmic overflow-hidden" aria-labelledby="idea-journey-title">
      <div className="container mx-auto px-4">
        <motion.h2 
          id="idea-journey-title"
          className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-text-accent-cyan animate-glow"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          From Thought-Seeds to Mind-Bending Idea Forests
        </motion.h2>
        <div className="hidden md:block">
          {steps.map((step, index) => (
            <DesktopStep key={index} step={step} index={index} />
          ))}
        </div>
        <div className="md:hidden">
          {steps.map((step, index) => (
            <MobileStep key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IdeaEvolutionJourney;