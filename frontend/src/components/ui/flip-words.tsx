"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
  words,
  durations,
  className,
  style,
}: {
  words: string[];
  durations: number[];
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const startAnimation = useCallback(() => {
    const nextIndex = (currentIndex + 1) % words.length;
    setCurrentWord(words[nextIndex]);
    setCurrentIndex(nextIndex);
    setIsAnimating(true);
  }, [currentIndex, words]);

  useEffect(() => {
    if (!isAnimating) {
      const timer = setTimeout(() => {
        startAnimation();
      }, durations[currentIndex]);
      return () => clearTimeout(timer);
    }
  }, [isAnimating, durations, currentIndex, startAnimation]);

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
        {currentWord.split(" ").map((word, wordIndex) => (
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
