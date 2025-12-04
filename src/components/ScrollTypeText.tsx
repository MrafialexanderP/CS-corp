'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

interface ScrollTypeTextProps {
  text: string;
  className?: string;
  containerClassName?: string;
}

const ScrollTypeText = ({ text, className = '', containerClassName = '' }: ScrollTypeTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.3"] // Start when element is 80% from top, end at 30%
  });

  // Split text into words
  const words = text.split(' ');
  
  return (
    <div ref={containerRef} className={containerClassName}>
      <span className={className}>
        {words.map((word, index) => {
          // Calculate the progress range for each word
          const start = index / words.length;
          const end = (index + 1) / words.length;
          
          return (
            <Word 
              key={index} 
              word={word} 
              progress={scrollYProgress} 
              range={[start, end]}
              isLast={index === words.length - 1}
            />
          );
        })}
        <Cursor progress={scrollYProgress} totalWords={words.length} />
      </span>
    </div>
  );
};

interface WordProps {
  word: string;
  progress: any;
  range: [number, number];
  isLast: boolean;
}

const Word = ({ word, progress, range, isLast }: WordProps) => {
  // Word appears when scroll progress reaches its range
  const opacity = useTransform(progress, range, [0, 1]);
  const display = useTransform(progress, (p: number) => {
    return p >= range[0] ? 'inline' : 'none';
  });
  
  return (
    <motion.span
      style={{ opacity, display }}
      className="inline"
    >
      {word}{!isLast && ' '}
    </motion.span>
  );
};

interface CursorProps {
  progress: any;
  totalWords: number;
}

const Cursor = ({ progress, totalWords }: CursorProps) => {
  // Show cursor while typing (progress < 1)
  const opacity = useTransform(progress, [0, 0.99, 1], [1, 1, 0]);
  
  return (
    <motion.span
      style={{ opacity }}
      className="inline-block ml-1"
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    >
      |
    </motion.span>
  );
};

export default ScrollTypeText;
