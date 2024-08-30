import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface SidebarLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NewSidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  links: SidebarLink[];
}

// Separate component for SidebarLink
const SidebarLink: React.FC<{ link: SidebarLink }> = ({ link }) => (
  <Link
    to={link.href}
    className="flex items-center py-2 px-4 rounded-md transition-colors duration-200 text-text-light hover:bg-primary-light/20"
  >
    {link.icon}
    <span className="ml-2">{link.label}</span>
  </Link>
);

// Main NewSidebar component
export const NewSidebar: React.FC<NewSidebarProps> = ({
  open,
  setOpen,
  darkMode,
  setDarkMode,
  links,
}) => {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 bottom-0 z-40 w-60 bg-background-light dark:bg-background-dark shadow-lg"
        initial={{ x: -240 }}
        animate={{ x: open ? 0 : -180 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className="flex flex-col h-full p-4">
          <motion.h1 
            className="text-2xl font-heading font-bold mb-8 text-primary-light"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            MindMirror
          </motion.h1>
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
            >
              <SidebarLink link={link} />
            </motion.div>
          ))}
          <motion.div 
            className="mt-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="w-full px-4 py-2 bg-primary-light text-background-dark rounded-md hover:bg-primary transition-colors flex items-center justify-center"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </motion.div>
        </div>
      </motion.div>
      <button
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setOpen(!open)}
      >
        {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </button>
    </>
  );
};