"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps {
  card: { src: string; title: string };
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ card, index, hovered, setHovered, children }) => {
  return (
    <motion.div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-lg relative bg-gray-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.img
        src={card.src}
        alt={card.title}
        className="object-cover absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className={cn(
          "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered === index ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

Card.displayName = "Card";

type Card = {
  title: string;
  src: string;
};

interface FocusCardsProps<T> {
  cards: T[];
  children: (card: T, index: number, hovered: number | null, setHovered: React.Dispatch<React.SetStateAction<number | null>>) => React.ReactNode;
}

export function FocusCards<T extends { title: string; src: string }>({ cards, children }: FocusCardsProps<T>) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <React.Fragment key={card.title}>
          {children(card, index, hovered, setHovered)}
        </React.Fragment>
      ))}
    </div>
  );
}
