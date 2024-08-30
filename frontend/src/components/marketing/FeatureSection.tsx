import React from 'react';
import { IconMicrophone, IconBrain, IconPencil, IconRocket } from '@tabler/icons-react';

const FeatureSection: React.FC = () => {
  const features = [
    { icon: <IconMicrophone />, title: "Voice Note Capture", description: "Easily record your thoughts on the go" },
    { icon: <IconBrain />, title: "AI-Powered Analysis", description: "Advanced AI understands your unique style" },
    { icon: <IconPencil />, title: "Essay Generation", description: "Transform notes into well-structured essays" },
    { icon: <IconRocket />, title: "Style Amplification", description: "Enhance your writing while maintaining your voice" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold font-heading mb-12 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="text-4xl mb-4 text-primary-light">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-text-light/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;