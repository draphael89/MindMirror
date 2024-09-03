"use client";
import React, { useEffect, useMemo } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect: React.FC<{
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  staggerDuration?: number; // Add this line
}> = ({ words, className, filter = true, duration = 0.5, staggerDuration = 0.2 }) => { // Update this line
  const [scope, animate] = useAnimate();
  
  const wordsArray = useMemo(() => words.split(" "), [words]);

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(staggerDuration), // Update this line
      }
    );
  }, [scope, animate, filter, duration, staggerDuration, words]); // Update this line

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <React.Fragment key={`${word}-${idx}`}>
          <motion.span
            className="text-text-light opacity-0 inline-block"
            style={{
              filter: filter ? "blur(10px)" : "none",
            }}
          >
            {word}
          </motion.span>
          {" "}
        </React.Fragment>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="text-text-light text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
