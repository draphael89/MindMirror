import React from 'react';
import HeroSection from '../components/marketing/HeroSection';
import Ascension from '../components/marketing/Ascension';
import AttunementSection from '../components/marketing/AttunementSection';
// ... other imports

const LandingPage: React.FC = () => {
  return (
    <div className="bg-background-cosmic min-h-screen">
      <HeroSection />
      <Ascension />
      <AttunementSection />
      {/* ... other sections */}
    </div>
  );
};

export default LandingPage;