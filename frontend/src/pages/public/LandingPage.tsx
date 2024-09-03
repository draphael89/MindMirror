import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import HeroSection from '../../components/marketing/HeroSection';
import Ascension from '../../components/marketing/Ascension';
import AttunementSection from '../../components/marketing/AttunementSection';
import IdeaEvolutionJourney from '../../components/marketing/IdeaEvolutionJourney';
import FeatureSection from '../../components/marketing/FeatureSection';
import CTASection from '../../components/marketing/CTASection';

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="bg-background-cosmic min-h-screen">
      <AnimatedSection>
        <HeroSection />
      </AnimatedSection>
      <AnimatedSection>
        <Ascension />
      </AnimatedSection>
      <AnimatedSection>
        <AttunementSection />
      </AnimatedSection>
      <AnimatedSection className="mt-16 md:mt-32">
        <IdeaEvolutionJourney />
      </AnimatedSection>
      <AnimatedSection className="mt-16 md:mt-32">
        <FeatureSection />
      </AnimatedSection>
      <AnimatedSection className="mt-16 md:mt-32">
        <CTASection />
      </AnimatedSection>
    </div>
  );
};

export default LandingPage;