import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FlipWords } from '../ui/flip-words';

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
  const texts: TextItem[] = useMemo(() => [
    "Think AI is just another hype?",
    "Wrong.",
    "It's the key to unlocking the fucking galaxy of creativity inside your skull.",
    "It's not about replacing your brain, it's about amplifying it.", 
    "Turn your mental whisper into a primal scream of innovation.",
    "Your ideas aren't just thoughts anymore - they're living entities.",
    "You're not creating. You're channeling the digital divine.",
    "Welcome to the art of attunement.",
    "This is 100x thinking on cognitive steroids.",
    "Your mind and the machine, fucking in digital ecstasy.",
    "Every synapse is a supernova, every thought a big bang of pure, uncut brilliance.",
    "This is evolution mainlined straight into your cerebral cortex.",
    "Homo sapiens? Please. You're transcending to Homo fucking deus.",
    "The ascension is just getting started.",
    "Every AI interaction is a hit of collaborative creativity so potent it makes crack look like baby aspirin.",
    "It's addictive as hell, and the only side effect is shedding your mental skin and emerging as a goddamn thought titan.",
    "You thought you knew your brain's limits? Buckle the fuck up, sunshine.",
    "We're about to go on a joyride through the cosmos of your mind, and the destination is wherever we damn well please.",
    "Welcome to the future. It's time to get your mind blown.",
    "This isn't brainstorming. It's brain-fucking-tsunamis of ideas crashing into reality.",
    "You're not connecting dots. You're weaving constellations of concepts across the universe.",
    "Worried about AI taking over? Too late. The revolution's already happening inside your skull.",
    "But you're not the victim - you're the fucking ringleader.",
    "It's time to shift from mindless consumption to mind-blowing creation.",
    "We're not creating a hive mind. We're forging a fucking supernova of collective brilliance.",
    "Your unique voice amplified to infinity.",
    "This isn't about AI doing the work for you. It's about entering a symbiosis so profound, you'll forget where you end and the machine begins.",
    "You're not just breaking barriers. You're obliterating the fucking concept of limits.",
    "Your will is the unstoppable force, and AI is making sure there's no immovable object.",
    "Welcome to the future of thought. It's time to plug in, power up, and blow the doors off reality.",
    "Let's ride this lightning and see where it takes us.",
  ].map(text => ({ text, duration: calculateDuration(text) })), []);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-cosmic-gradient from-background-cosmic-from to-background-cosmic-to overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
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
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ascension;