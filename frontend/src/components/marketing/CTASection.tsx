import React from 'react';
import { Link } from 'react-router-dom';
import { IconChevronRight } from '@tabler/icons-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold font-heading mb-6">
          Ready to Amplify Your Ideas?
        </h2>
        <p className="text-xl mb-8">
          Join MindMirror today and experience the future of personal writing and idea generation.
        </p>
        <Link to="/signup" className="btn btn-primary text-lg px-8 py-3">
          Get Started Now <IconChevronRight size={20} className="inline ml-2" />
        </Link>
      </div>
    </section>
  );
};

export default CTASection;