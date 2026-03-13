import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

// Blue diamond/star decoration component
const BlueDiamond = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none"
  >
    <defs>
      <filter id="blur" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
      </filter>
    </defs>
    <path 
      d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" 
      fill="#0A4AAC"
      filter="url(#blur)"
      opacity="0.9"
    />
    <path 
      d="M50 10 L60 40 L90 50 L60 60 L50 90 L40 60 L10 50 L40 40 Z" 
      fill="#0A4AAC"
    />
  </svg>
);

// Scroll-based text reveal component
interface ScrollRevealTextProps {
  lines: string[];
  className?: string;
}

interface CharData {
  char: string;
  start: number;
  end: number;
}

interface WordData {
  word: string;
  chars: CharData[];
}

interface LineData {
  words: WordData[];
}

const ScrollRevealText = ({ lines, className }: ScrollRevealTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"]
  });

  // Smooth the scroll progress for a more fluid animation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate total characters across all lines (including spaces)
  const totalChars = lines.reduce((acc, line) => acc + line.length, 0) + (lines.length - 1); // +1 for line breaks
  
  const processedLines: LineData[] = [];
  let charIndex = 0;
  
  lines.forEach((line, lineIndex) => {
    const words = line.split(" ");
    const lineWords: WordData[] = [];
    
    words.forEach((word) => {
      const wordChars: CharData[] = [];
      const chars = word.split("");
      
      chars.forEach((char) => {
        wordChars.push({
          char,
          start: charIndex / totalChars,
          end: (charIndex + 1) / totalChars,
        });
        charIndex++;
      });
      
      // Count the space
      charIndex++;
      
      lineWords.push({ word, chars: wordChars });
    });
    
    processedLines.push({ words: lineWords });
    
    // Add extra index for line break (if not last line)
    if (lineIndex < lines.length - 1) {
      charIndex++;
    }
  });

  return (
    <div ref={containerRef} className={[className, 'relative'].filter(Boolean).join(' ')}>
      {processedLines.map((lineData, lineIndex) => (
        <div key={lineIndex}>
          {lineData.words.map((wordData, wordIndex) => (
            <span key={wordIndex} style={{ marginRight: wordIndex < lineData.words.length - 1 ? "0.3em" : 0 }}>
              {wordData.chars.map((charData, charIdx) => (
                <ScrollRevealCharacter
                  key={charIdx}
                  char={charData.char}
                  progress={smoothProgress}
                  start={charData.start}
                  end={charData.end}
                />
              ))}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

// Individual character component
interface ScrollRevealCharacterProps {
  char: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}

const ScrollRevealCharacter = ({ char, progress, start, end }: ScrollRevealCharacterProps) => {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  
  return (
    <motion.span style={{ opacity }}>
      {char}
    </motion.span>
  );
};

const ImpactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} id="about" className="relative h-[100vh]">
      <div className="sticky top-0 h-screen bg-white px-4 sm:px-6 flex items-center justify-center overflow-hidden">
        {/* Blue Diamond Decorations */}
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 sm:top-16 left-4 sm:left-8 md:left-16"
      >
        <BlueDiamond className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute bottom-12 sm:bottom-20 right-4 sm:right-8 md:right-16"
      >
        <BlueDiamond className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
      </motion.div>

      <div className="max-w-4xl mx-auto text-left relative z-10">
        <ScrollRevealText
          lines={["We create impactful experiences", "and productionss"]}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-coral"
        />
      </div>
      </div>
    </section>
  );
};

export default ImpactSection;
