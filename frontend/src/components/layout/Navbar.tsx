import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background-cosmic py-4 px-6">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-text-light">MindMirror</Link>
        <div>
          <Link to="/login" className="text-text-light mr-4">Login</Link>
          <Link to="/signup" className="bg-primary-light text-text-light px-4 py-2 rounded">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;