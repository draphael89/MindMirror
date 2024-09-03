import React from 'react';
import { motion } from 'framer-motion';
import { FocusCards } from '../ui/focus-cards';
import { BackgroundBeams } from '../ui/background-beams';
import { cn } from '../../lib/utils';

interface Essay {
  id: string;
  title: string;
  excerpt: string;
  tags: string[];
  complexity: number;
  src: string;
}

const essays: Essay[] = [
  {
    id: '1',
    title: 'The Future of AI in Education',
    excerpt: 'Exploring how artificial intelligence is reshaping the landscape of education...',
    tags: ['AI', 'Education', 'Technology'],
    complexity: 3,
    src: '/ai-essay-card.png',
  },
  {
    id: '2',
    title: 'Climate Change: A Global Perspective',
    excerpt: 'Analyzing the impacts of climate change on various ecosystems and societies...',
    tags: ['Climate', 'Environment', 'Global Issues'],
    complexity: 4,
    src: '/climate-essay-card.png',
  },
  {
    id: '3',
    title: 'The Ethics of Gene Editing',
    excerpt: 'Discussing the moral implications of CRISPR and other gene-editing technologies...',
    tags: ['Bioethics', 'Genetics', 'Science'],
    complexity: 5,
    src: '/helix-essay-card.png',
  },
];

const EssayCollection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className={cn(
      "relative py-20 overflow-hidden",
      "bg-gradient-to-b from-background-cosmic to-background-dark"
    )}>
      <BackgroundBeams className="absolute inset-0 z-0 opacity-30" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-heading font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light"
          >
            Explore Our Essay Collection
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-text-light/80 max-w-2xl mx-auto"
          >
            Dive into a world of thought-provoking essays crafted with AI assistance
          </motion.p>
        </motion.div>
        <FocusCards
          cards={essays.map((essay) => ({
            title: essay.title,
            src: essay.src,
            content: (
              <motion.div
                variants={itemVariants}
                className="flex flex-col justify-end h-full"
              >
                <h3 className="text-2xl font-semibold mb-2 text-white">{essay.title}</h3>
                <p className="text-white/80 mb-4 line-clamp-2">{essay.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {essay.tags.map((tag: string) => (
                    <span key={tag} className="bg-primary-light/20 text-primary-light px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/60 text-sm">
                    Complexity: {Array(essay.complexity).fill('★').join('')}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-primary-light hover:text-primary-dark transition-colors text-sm font-semibold bg-primary-light/10 hover:bg-primary-light/20 px-3 py-1 rounded-full"
                  >
                    Read More
                  </motion.button>
                </div>
              </motion.div>
            ),
          }))}
        />
      </div>
    </section>
  );
};

export default EssayCollection;