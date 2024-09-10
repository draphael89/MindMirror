import React from 'react';
import { motion } from 'framer-motion';

const LightningEffect: React.FC = () => {
  const lightningVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: 'spring', duration: 0.5, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
    >
      <motion.path
        d="M50,0 L60,40 40,60 60,100"
        stroke="#00ffff"
        strokeWidth={2}
        fill="none"
        variants={lightningVariants}
        initial="hidden"
        animate="visible"
      />
    </motion.svg>
  );
};

export default LightningEffect;