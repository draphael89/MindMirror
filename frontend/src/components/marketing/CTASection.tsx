import React from 'react';
import { Link } from 'react-router-dom';
import { IconChevronRight, IconStar } from '@tabler/icons-react';
import { motion } from 'framer-motion';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-900 to-purple-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-5xl font-bold font-heading mb-8 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Amplify Your Ideas?
        </motion.h2>
        <motion.p 
          className="text-xl mb-12 text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Join MindMirror today and experience the future of personal writing and idea generation.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link 
            to="/signup" 
            className="btn btn-primary text-lg px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            Get Started Now <IconChevronRight size={24} className="ml-2" />
          </Link>
          <Link 
            to="/testimonials" 
            className="text-blue-300 hover:text-blue-200 transition-colors inline-flex items-center"
          >
            <IconStar size={24} className="mr-2" /> See What Others Are Saying
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;