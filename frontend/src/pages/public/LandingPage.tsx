import React from 'react';
import { StarsBackground } from '../../components/ui/stars-background';
import HeroSection from '../../components/marketing/HeroSection';
import FeatureSection from '../../components/marketing/FeatureSection';
import CTASection from '../../components/marketing/CTASection';

const LandingPage: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen bg-background-cosmic text-text-light overflow-x-hidden">
      <StarsBackground className="fixed inset-0 z-0" starDensity={200} />
      <div className="relative z-10 w-full min-h-screen">
        <HeroSection />
        <FeatureSection />
        <CTASection />
      </div>
    </div>
  );
};

export default LandingPage;