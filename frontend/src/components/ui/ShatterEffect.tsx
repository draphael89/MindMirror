import React from 'react';
import { motion } from 'framer-motion';

const ShatterEffect: React.FC = () => {
  const shatterVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 1, ease: 'easeInOut' }
    }
  };

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
    >
      <motion.path
        d="M0,0 L100,0 100,100 0,100 Z"
        strokeWidth={0.5}
        stroke="#fff"
        fill="none"
        variants={shatterVariants}
        initial="hidden"
        animate="visible"
      />
    </motion.svg>
  );
};

export default ShatterEffect;