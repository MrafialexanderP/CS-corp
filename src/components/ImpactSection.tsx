import { motion, useScroll } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import TextType from "./TextType";

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

const ImpactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [typingStarted, setTypingStarted] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Start typing only after section is entered (scroll progress > small threshold)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (!typingStarted && latest > 0.02) {
        setTypingStarted(true);
        setIsLocked(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, typingStarted]);

  // Scroll lock logic - prevent scroll until typing complete
  useEffect(() => {
    if (!isLocked) return;

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inSection = rect.top <= 0 && rect.bottom > window.innerHeight;

      if (inSection && !typingComplete) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const inSection = rect.top <= 0 && rect.bottom > window.innerHeight;

      if (inSection && !typingComplete) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked, typingComplete]);

  // Unlock scroll after typing complete
  useEffect(() => {
    if (typingComplete) {
      setTimeout(() => {
        setIsLocked(false);
      }, 500);
    }
  }, [typingComplete]);

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

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
        <TextType
          text="We create impactful experiences and productions"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-coral"
          typingSpeed={120}
          showCursor={true}
          cursorCharacter="|"
          cursorClassName="text-coral"
          loop={false}
          startOnVisible={typingStarted}
          onSentenceComplete={handleTypingComplete}
        />
      </div>
      </div>
    </section>
  );
};

export default ImpactSection;
