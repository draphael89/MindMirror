import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  card: {
    title: string;
    src: string;
    content: React.ReactNode;
  };
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

export const Card: React.FC<CardProps> = React.memo(
  ({ card, index, hovered, setHovered }) => {
    const controls = useAnimation();
    const cardRef = useRef<HTMLDivElement>(null);
    const y = useMotionValue(0);
    const scale = useTransform(y, [-100, 0, 100], [1.1, 1, 1.1]);

    useEffect(() => {
      const updateY = () => {
        if (cardRef.current) {
          const rect = cardRef.current.getBoundingClientRect();
          const scrollY = window.scrollY;
          const offsetY = rect.top + scrollY;
          const centerY = offsetY - window.innerHeight / 2 + rect.height / 2;
          y.set(centerY - scrollY);
        }
      };

      window.addEventListener("scroll", updateY);
      updateY();

      return () => window.removeEventListener("scroll", updateY);
    }, [y]);

    return (
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-lg relative overflow-hidden h-96 md:h-[32rem] w-full transition-all duration-300 ease-out",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
        style={{ scale }}
      >
        <motion.img
          src={card.src}
          alt={card.title}
          className="object-cover absolute inset-0 w-full h-full"
          initial={{ scale: 1 }}
          animate={controls}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end py-8 px-6",
            "transition-opacity duration-300"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered === index ? 1 : 0 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: hovered === index ? 0 : 20, opacity: hovered === index ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {card.content}
          </motion.div>
        </motion.div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

interface FocusCardsProps {
  cards: Array<{
    title: string;
    src: string;
    content: React.ReactNode;
  }>;
}

export const FocusCards: React.FC<FocusCardsProps> = ({ cards }) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
};
