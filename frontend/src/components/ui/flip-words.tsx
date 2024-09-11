"use client";
import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FlipWordsProps {
  words: string[];
  durations: number[];
  className?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
  initialDelay?: number; // Add this prop
  onWordChange?: (index: number) => void;
}

export const FlipWords: React.FC<FlipWordsProps> = ({
  words,
  durations,
  className,
  style,
  isActive = true,
  initialDelay = 0,
  onWordChange,
}) => {
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const cycleWords = useCallback(() => {
    if (isActive && !isAnimating && hasStarted) {
      setIsAnimating(true);
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }
  }, [words.length, isActive, isAnimating, hasStarted]);

  useEffect(() => {
    if (!hasStarted) {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, initialDelay);
      return () => clearTimeout(timer);
    }

    const interval = setInterval(cycleWords, durations[index]);
    return () => clearInterval(interval);
  }, [cycleWords, durations, index, hasStarted, initialDelay]);

  const currentWord = words[index];

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % words.length;
          onWordChange?.(newIndex);
          return newIndex;
        });
      }, durations[index]);

      return () => clearTimeout(timer);
    }
  }, [index, durations, isActive, words.length, onWordChange]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -20,
          x: 20,
          filter: "blur(4px)",
          scale: 1.1,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left px-2",
          className
        )}
        style={style}
        key={currentWord}
      >
        {currentWord.split(" ").map((word: string, wordIndex: number) => (
          <motion.span
            key={word + wordIndex}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: wordIndex * 0.1,
              duration: 0.2,
            }}
            className="inline-block whitespace-nowrap mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
