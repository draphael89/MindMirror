import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useViewportScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IconBrain, IconMicrophone, IconPencil, IconRocket, IconChevronRight, IconPlayerPlay } from '@tabler/icons-react';
import { StarsBackground } from './ui/stars-background';

const LandingPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { scrollYProgress } = useViewportScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-background-cosmic text-text-light relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div style={{ opacity }} className="fixed inset-0 z-0">
        <StarsBackground />
      </motion.div>
      <div className="relative z-10">
        {/* Header */}
        <header className="py-6 px-4 sm:px-6 lg:px-8 fixed top-0 left-0 right-0 z-50 bg-background-cosmic bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <motion.div 
              className="text-2xl font-bold font-heading"
              variants={itemVariants}
            >
              MindMirror
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/login" className="btn btn-primary">
                Get Started
              </Link>
            </motion.div>
          </nav>
        </header>

        <main className="pt-24">
          {/* Hero Section */}
          <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl sm:text-6xl font-bold font-heading mb-6 text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary-light">
                Amplify Your Thoughts with AI
              </h1>
              <p className="text-xl mb-8">
                Transform your voice notes into polished essays that capture your unique style and ideas.
              </p>
              <Link to="/signup" className="btn btn-primary text-lg px-8 py-3 animate-pulse">
                Start Your Journey
              </Link>
            </motion.div>
          </section>

          {/* Key Features Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-3xl font-bold font-heading mb-12 text-center"
                variants={itemVariants}
              >
                Key Features
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: <IconMicrophone />, title: "Voice Note Capture", description: "Easily record your thoughts on the go" },
                  { icon: <IconBrain />, title: "AI-Powered Analysis", description: "Advanced AI understands your unique style" },
                  { icon: <IconPencil />, title: "Essay Generation", description: "Transform notes into well-structured essays" },
                  { icon: <IconRocket />, title: "Style Amplification", description: "Enhance your writing while maintaining your voice" },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="text-4xl mb-4 text-primary-light">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-text-light/70">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Interactive Demo Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-3xl font-bold font-heading mb-12 text-center"
                variants={itemVariants}
              >
                See MindMirror in Action
              </motion.h2>
              <motion.div 
                className="bg-background-light/20 rounded-lg p-8"
                variants={itemVariants}
              >
                <div className="flex items-center mb-4">
                  <button 
                    className="btn btn-primary mr-4"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <IconPlayerPlay size={20} />
                    {isPlaying ? 'Stop' : 'Play'} Demo
                  </button>
                  <div className="text-text-light/70">
                    {isPlaying ? 'Listening to voice note...' : 'Click play to start the demo'}
                  </div>
                </div>
                <AnimatePresence>
                  {isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-background-light/10 rounded p-4"
                    >
                      <h3 className="text-xl font-semibold mb-2">Generated Essay:</h3>
                      <p className="text-text-light/90">
                        As the AI processes your voice note, a thoughtful and well-structured essay begins to take shape...
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background-light/10">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-3xl font-bold font-heading mb-12 text-center"
                variants={itemVariants}
              >
                How It Works
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { step: 1, title: "Record Your Thoughts", description: "Use our app to capture your ideas as voice notes" },
                  { step: 2, title: "AI Analysis", description: "Our AI processes and understands your unique style and content" },
                  { step: 3, title: "Essay Generation", description: "Receive a polished essay that amplifies your original ideas" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="text-4xl font-bold text-primary-light mb-4">{item.step}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-text-light/70">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={itemVariants}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl font-bold font-heading mb-6">
                Ready to Amplify Your Ideas?
              </h2>
              <p className="text-xl mb-8">
                Join MindMirror today and experience the future of personal writing and idea generation.
              </p>
              <Link to="/signup" className="btn btn-primary text-lg px-8 py-3">
                Get Started Now <IconChevronRight size={20} className="inline ml-2" />
              </Link>
            </motion.div>
          </section>
        </main>

        <footer className="py-8 px-4 sm:px-6 lg:px-8 text-center text-text-light/70 bg-background-cosmic bg-opacity-50 backdrop-filter backdrop-blur-lg">
          <p>&copy; 2023 MindMirror. All rights reserved.</p>
        </footer>
      </div>
    </motion.div>
  );
};

export default LandingPage;