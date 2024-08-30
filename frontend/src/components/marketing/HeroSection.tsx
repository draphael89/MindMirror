import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold font-heading mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">
          Amplify Your Thoughts with AI
        </h1>
        <p className="text-xl mb-8">
          Transform your voice notes into polished essays that capture your unique style and ideas.
        </p>
        <Link to="/signup" className="btn btn-primary text-lg px-8 py-3 animate-pulse">
          Start Your Journey
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;