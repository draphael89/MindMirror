import React from 'react';
import { motion } from 'framer-motion';

const MergingSilhouettesEffect: React.FC = () => {
  return (
    <div className="relative w-full h-64">
      <motion.div
        className="absolute left-1/4 top-1/2 w-32 h-32 bg-blue-500 rounded-full"
        animate={{
          x: [0, 50, 0],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute right-1/4 top-1/2 w-32 h-32 bg-red-500 rounded-full"
        animate={{
          x: [0, -50, 0],
          opacity: [1, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default MergingSilhouettesEffect;