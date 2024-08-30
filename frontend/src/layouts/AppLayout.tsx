import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { NewSidebar } from '../components/NewSidebar';
import { IconHome, IconInfoCircle } from '@tabler/icons-react'; // Import icons

const AppLayout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const links = [
    { href: '/', label: 'Home', icon: <IconHome size={24} /> },
    { href: '/about', label: 'About', icon: <IconInfoCircle size={24} /> },
  ];

  return (
    <div className="flex h-screen">
      <NewSidebar 
        open={open}
        setOpen={setOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        links={links}
      />
      <main className="flex-1 overflow-y-auto p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;