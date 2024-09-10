"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

const DesktopTracingBeam = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const beamColor = useMotionValue("var(--primary-light)");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }

    const resizeObserver = new ResizeObserver(() => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]),
    { stiffness: 500, damping: 90 }
  );

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.33) {
        beamColor.set("var(--primary-light)");
      } else if (latest < 0.66) {
        beamColor.set("var(--secondary-light)");
      } else {
        beamColor.set("var(--accent-light)");
      }
    });
  }, [beamColor, scrollYProgress]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute left-[2%] top-3 bottom-3" style={{ zIndex: 0 }}>
        {!prefersReducedMotion && (
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="block"
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="url(#beamGradient)"
              strokeWidth="2"
              className="motion-reduce:hidden"
            />
            <motion.circle
              cx="1"
              cy={y1}
              r="4"
              fill={beamColor}
              className="animate-pulse-slow"
            />
            <defs>
              <motion.linearGradient id="beamGradient" gradientTransform="rotate(90)">
                <motion.stop offset="0%" stopColor={beamColor as unknown as string} stopOpacity="0.25" />
                <motion.stop offset="100%" stopColor={beamColor as unknown as string} stopOpacity="0" />
              </motion.linearGradient>
            </defs>
          </svg>
        )}
      </div>
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

const MobileProgressIndicator = ({ children }: { children: React.ReactNode }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary-light origin-left z-50"
        style={{ scaleX }}
      />
      {children}
    </div>
  );
};

export const TracingBeam = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? (
    <MobileProgressIndicator>{children}</MobileProgressIndicator>
  ) : (
    <DesktopTracingBeam className={className}>{children}</DesktopTracingBeam>
  );
};