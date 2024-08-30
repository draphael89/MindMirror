import React from 'react';
import { Link } from 'react-router-dom';
import { StarsBackground } from '../../components/ui/stars-background';
import SignUpForm from '../../components/auth/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-background-cosmic text-text-light overflow-hidden">
      <StarsBackground className="fixed inset-0 z-0" />
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="bg-background-light/20 p-8 rounded-lg backdrop-filter backdrop-blur-lg">
          <h1 className="text-3xl font-bold mb-6">Sign Up for MindMirror</h1>
          <SignUpForm />
          <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-primary-light hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;