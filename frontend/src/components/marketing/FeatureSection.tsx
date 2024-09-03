import React from 'react';
import { IconMicrophone, IconBrain, IconPencil, IconRocket, Icon } from '@tabler/icons-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

// Update the type for the features array
const features: Array<{
  icon: Icon;
  title: string;
  description: string;
}> = [
  { icon: IconMicrophone, title: "Voice Note Capture", description: "Easily record your thoughts on the go" },
  { icon: IconBrain, title: "AI-Powered Analysis", description: "Advanced AI understands your unique style" },
  { icon: IconPencil, title: "Essay Generation", description: "Transform notes into well-structured essays" },
  { icon: IconRocket, title: "Style Amplification", description: "Enhance your writing while maintaining your voice" },
];

const FeatureSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.3], [50, 0]);

  return (
    <section className={cn(
      "w-full bg-gradient-to-b from-background-dark to-background-light",
      "relative overflow-hidden py-20"
    )}>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background-light opacity-30 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ opacity, y }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-heading font-bold mb-16 text-center bg-clip-text text-transparent bg-gradient-to-b from-text-light to-text-dark"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

interface FeatureCardProps {
  feature: {
    icon: Icon;
    title: string;
    description: string;
  };
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <motion.div 
      className="flex flex-col items-center text-center bg-white/5 rounded-lg p-6 sm:p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-neon"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <Icon className="text-4xl sm:text-5xl mb-4 sm:mb-6 text-primary" />
      <h3 className="text-xl sm:text-2xl font-heading font-semibold mb-2 sm:mb-4 text-text-light">{feature.title}</h3>
      <p className="text-sm sm:text-base text-text-dark">{feature.description}</p>
    </motion.div>
  );
};

export default FeatureSection;