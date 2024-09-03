import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { NewSidebar } from '../components/NewSidebar';
import { IconHome, IconInfoCircle } from '@tabler/icons-react';

const AppLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: '/', label: 'Home', icon: <IconHome size={24} /> },
    { href: '/about', label: 'About', icon: <IconInfoCircle size={24} /> },
  ];

  useEffect(() => {
    const logLayoutInfo = () => {
      if (mainRef.current && contentRef.current) {
        console.log('AppLayout - Main dimensions:', {
          width: mainRef.current.offsetWidth,
          height: mainRef.current.offsetHeight,
        });
        console.log('AppLayout - Main position:', mainRef.current.getBoundingClientRect());
        console.log('AppLayout - Main computed style:', window.getComputedStyle(mainRef.current));

        console.log('AppLayout - Content dimensions:', {
          width: contentRef.current.offsetWidth,
          height: contentRef.current.offsetHeight,
        });
        console.log('AppLayout - Content position:', contentRef.current.getBoundingClientRect());
        console.log('AppLayout - Content computed style:', window.getComputedStyle(contentRef.current));
      }
    };

    logLayoutInfo();
    window.addEventListener('resize', logLayoutInfo);
    return () => window.removeEventListener('resize', logLayoutInfo);
  }, []);

  return (
    <div className="flex h-screen w-full">
      <NewSidebar 
        open={open}
        setOpen={setOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        links={links}
      />
      <main ref={mainRef} className="flex-1 overflow-y-auto flex justify-center">
        <div ref={contentRef} className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;