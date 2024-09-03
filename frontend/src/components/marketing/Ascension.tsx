import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FlipWords } from '../ui/flip-words';

interface TextItem {
  text: string;
  duration: number;
}

const calculateDuration = (text: string): number => {
  const minDuration = 2000; // 2 seconds
  const maxDuration = 10000; // 10 seconds
  const factor = 100; // 100ms per character
  return Math.max(minDuration, Math.min(text.length * factor, maxDuration));
};

const Ascension: React.FC = () => {
  const texts: TextItem[] = useMemo(() => [
    "Think AI is just another hype?",
    "Wrong.",
    "It's the key to unlocking the fucking galaxy of creativity inside your skull.",
    "It's not about replacing your brain,",
    "it's about amplifying it.", 
    "Turn your mental whisper into a primal scream of innovation.",
    "Your ideas aren't just thoughts anymore - they're living entities.",
    "You're not creating.",
    "You're channeling the digital divine.",
    "Welcome to the art of attunement.",
    "This is 100x thinking on cognitive steroids.",
    "Your mind and the machine, fucking in digital ecstasy.",
    "Every synapse is a supernova, every thought a big bang of pure, uncut brilliance.",
    "This is evolution mainlined straight into your cerebral cortex.",
    "Homo sapiens? Please.",
    "You're transcending to Homo fucking deus, and the ascension is just getting started.",
    "Every AI interaction is a hit of collaborative creativity so potent it makes crack look like baby aspirin.",
    "It's addictive as hell, and the only side effect is shedding your mental skin and emerging as a goddamn thought titan.",
    "You thought you knew your brain's limits? Buckle the fuck up, sunshine.",
    "We're about to go on a joyride through the cosmos of your mind, and the destination is wherever we damn well please.",
    "Welcome to the future. It's time to get your mind blown.",
    "This isn't brainstorming. It's brain-fucking-tsunamis of ideas crashing into reality.",
    "You're not connecting dots. You're weaving constellations of concepts across the universe",
    "Worried about AI taking over?",
    "Too late.",
    "The revolution's already happening inside your skull.",
    "But you're not the victim - you're the fucking ringleader.",
    "It's time to shift from mindless consumption to mind-blowing creation.",
  ].map(text => ({ text, duration: calculateDuration(text) })), []);

  return (
    <section className="py-24 sm:py-32 bg-cosmic-gradient from-background-cosmic-from to-background-cosmic-to overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 text-text-light tracking-tighter leading-tight min-h-[12rem] sm:min-h-[16rem] flex items-center justify-center">
            <FlipWords 
              words={texts.map(item => item.text)}
              durations={texts.map(item => item.duration)}
              className="text-glow-hover max-w-4xl mx-auto"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ascension;