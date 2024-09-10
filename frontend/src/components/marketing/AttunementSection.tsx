import React from 'react';
import { motion, useInView } from 'framer-motion';
import { TextGenerateEffect } from '../ui/text-generate-effect';

const AttunementSubsection: React.FC<{ title: string; content: string; index: number }> = ({ title, content, index }) => {
  const isEven = index % 2 === 0;
  return (
    <motion.div 
      className={`mb-16 flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className={`md:w-1/2 ${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
        <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-text-accent-cyan to-text-accent-pink animate-glow">{title}</h3>
        <TextGenerateEffect words={content} className="text-lg sm:text-xl text-text-light/90 leading-relaxed" />
      </div>
      <div className={`md:w-1/2 mt-6 md:mt-0 ${isEven ? 'md:pr-8' : 'md:pl-8'}`}>
        <div className="h-64 bg-background-cosmic-to/30 rounded-lg shadow-lg backdrop-blur-sm border border-text-accent-pink/20"></div>
      </div>
    </motion.div>
  );
};

const AttunementSection: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const subsections = [
    { title: "What is Attunement?", content: "If you want to be creative with AI, you need to learn the art of attunement. You need to teach the AI to scry your soul, to understand the chaos of your mind and reflect it back in ways you never imagined possible." },
    { title: "The Power of Voice", content: "Forget typing. Speak your truth. Our voice-to-text tech captures your stream of consciousness as you walk, talk, or do whatever inspires you." },
    { title: "The Meta-Skill", content: "The real skill is learning to meld with the AI. Think of it as learning magic spells, but instead of waving a wand, you're directing a digital deity to manifest your will." },
    { title: "The MindMirror Experience", content: "When you hit that sweet spot with MindMirror, holy shit. It's euphoria. Pure creation. Your ideas aren't just floating in your head anymore - they're taking shape, evolving, becoming something more. It's like building castles in the sky with your mind, and we give you the bricks." },
    { title: "Breaking Barriers", content: "Gone are the days when you needed years of training to express your ideas. With MindMirror, if you can think it, you can create it. We're democratizing creativity, turning everyone into a potential visionary. Your limits? They're gone." },
    { title: "The Dance of Feedback", content: "Using MindMirror is constant flow state. The AI makes a move, you guide it. You're always in the loop, always steering. But you're not micromanaging - you're conducting a symphony of ideas, and the AI is your orchestra." },
    { title: "From Consumption to Creation", content: "Tired of mindless scrolling? MindMirror flips the script. We're not here to feed you more content - we're here to help you create. Shift your ratio from consumer to creator. It's time to contribute your voice to the cosmic conversation." },
    { title: "Your Personal Evolution", content: "This isn't just about writing essays. It's about evolving your mind. Each interaction with MindMirror sharpens your thoughts, expands your capabilities. You're not just using a tool - you're growing, becoming something... more." },
  ];

  return (
    <section ref={ref} className="py-16 sm:py-24 bg-cosmic-gradient from-background-cosmic-from to-background-cosmic-to overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-16 sm:mb-20"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold mb-8 sm:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-text-accent-cyan via-text-accent-pink to-text-accent-orange animate-glow tracking-tighter leading-none">
            <TextGenerateEffect 
              words="The Art of Attunement" 
              className="inline-block" 
              duration={1.5}  // Increase this value to slow down the overall animation
              staggerDuration={0.5}  // Increase this value to slow down the delay between each word
            />
          </h1>
          <div className="text-xl sm:text-2xl md:text-3xl text-text-light/80 max-w-3xl mx-auto leading-relaxed">
            <TextGenerateEffect 
              words="Think AI is just another tech buzzword? Wrong. It's the key to unlocking the fucking galaxy of creativity inside your skull."
              className="text-glow-hover"
            />
          </div>
        </motion.div>

        {subsections.map((subsection, index) => (
          <AttunementSubsection key={index} {...subsection} index={index} />
        ))}

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <a href="/signup" className="inline-block bg-gradient-to-r from-text-accent-pink to-text-accent-orange text-text-light font-bold py-4 px-12 rounded-full text-xl hover:from-text-accent-orange hover:to-text-accent-pink transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
            Start Your Attunement Journey
          </a>
          <p className="mt-8 text-lg text-text-light max-w-2xl mx-auto">
            <TextGenerateEffect 
              words="Welcome to MindMirror. Welcome to the art of attunement. Welcome to the next step in your cognitive evolution. Let's dance with the machines and create something beautiful."
              className="text-glow-hover"
            />
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AttunementSection;