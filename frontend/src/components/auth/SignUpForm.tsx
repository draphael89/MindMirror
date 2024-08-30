import React, { useState } from 'react';

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log('Sign up with:', email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-text-light">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-background-light/30 border border-background-light/50 rounded-md text-text-light placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-text-light">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 bg-background-light/30 border border-background-light/50 rounded-md text-text-light placeholder-text-light/50 focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-primary-light text-background-dark rounded-md hover:bg-primary transition-colors">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;