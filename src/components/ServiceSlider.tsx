import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';

interface ServiceTab {
  id: string;
  number: string;
  title: string;
  verticalTitle: string;
  description: string;
  services: string[];
  bgColor: string;
  accentColor: string;
}

const ServiceSlider = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);

  const serviceTabs: ServiceTab[] = [
    {
      id: 'cspro',
      number: '01',
      title: 'CSPROD',
      verticalTitle: 'Production',
      description: 'We deliver comprehensive production services from concept to completion. Our team specializes in creating impactful brand experiences through quality craftsmanship and innovative solutions.',
      services: [
        'Event Contractor',
        'Promotional Items',
        'Signage & Branding',
        'Printings & Acrylic Media'
      ],
      bgColor: 'bg-vibrant-blue',
      accentColor: 'bg-coral'
    },
    {
      id: 'cscom',
      number: '02',
      title: 'CSCOM',
      verticalTitle: 'Communication',
      description: 'Strategic communication and event management solutions that connect brands with their audiences. We create memorable experiences that drive engagement and build lasting relationships.',
      services: [
        'Event Organizer',
        'Activation',
        'MICE',
        'Exhibition',
        'Entertainment'
      ],
      bgColor: 'bg-coral',
      accentColor: 'bg-vibrant-blue'
    }
  ];

  const handleTabClick = (index: number) => {
    setDirection(index > activeTab ? 1 : -1);
    setActiveTab(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const currentTab = serviceTabs[activeTab];

  return (
    <div className="relative w-full h-[600px] overflow-hidden">
      {/* Slides Container */}
      <div className="flex h-full">
        {/* Main Slider Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeTab}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 200, damping: 25 },
                opacity: { duration: 0.3 }
              }}
              className={`absolute inset-0 ${currentTab.bgColor}`}
            >
              {/* Grid Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`grid-${activeTab}`} width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${activeTab})`} />
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col md:flex-row items-start p-8 md:p-12 lg:p-16 gap-8">
                {/* Left side - Number and decorative */}
                <div className="flex flex-col items-start">
                  <motion.div 
                    className="text-white/30 text-7xl md:text-8xl lg:text-9xl font-bold leading-none"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {currentTab.number}
                  </motion.div>
                  
                  {/* Decorative circles */}
                  <div className="relative mt-8 hidden md:block">
                    <motion.div 
                      className={`w-32 h-32 lg:w-40 lg:h-40 rounded-full ${currentTab.accentColor} flex items-center justify-center`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30" />
                    </motion.div>
                    <motion.div 
                      className={`absolute -bottom-6 -right-6 w-16 h-16 rounded-full ${currentTab.accentColor} opacity-60`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </div>
                </div>

                {/* Right side - Info */}
                <div className="flex-1 flex flex-col justify-center max-w-2xl">
                  <motion.h3 
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    {currentTab.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-white/80 text-base lg:text-lg mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {currentTab.description}
                  </motion.p>

                  {/* Services List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {currentTab.services.map((service, serviceIndex) => (
                      <motion.div
                        key={service}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 + serviceIndex * 0.08 }}
                        className="bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-xl font-medium text-center border border-white/30 hover:bg-white/30 transition-colors"
                      >
                        {service}
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${currentTab.accentColor} text-white px-8 py-3 rounded-full font-semibold w-fit flex items-center gap-2 shadow-lg`}
                  >
                    Learn more
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {serviceTabs.map((_, index) => (
              <button
                key={index}
                className="h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer"
                style={{ width: 60 }}
                onClick={() => handleTabClick(index)}
              >
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: '0%' }}
                  animate={{ width: activeTab === index ? '100%' : '0%' }}
                  transition={{ duration: 0.4 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Tabs - Vertical navigation */}
        <div className="flex flex-shrink-0">
          {serviceTabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(index)}
              className={`relative w-20 md:w-24 h-full flex flex-col items-center justify-between py-8 transition-all duration-500 overflow-hidden ${
                activeTab === index 
                  ? 'text-white' 
                  : 'bg-white text-gray-800 hover:bg-gray-50'
              }`}
            >
              {/* Background color that slides in */}
              <motion.div
                className={`absolute inset-0 ${tab.bgColor}`}
                initial={false}
                animate={{ 
                  x: activeTab === index ? '0%' : '100%'
                }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />

              {/* Number */}
              <span 
                className={`relative z-10 text-2xl md:text-3xl font-bold transition-colors duration-300 ${
                  activeTab === index ? 'text-white' : 'text-vibrant-blue'
                }`}
              >
                {tab.number}
              </span>

              {/* Vertical Title */}
              <span 
                className={`relative z-10 text-sm md:text-base font-semibold tracking-widest transition-colors duration-300 ${
                  activeTab === index ? 'text-white' : 'text-gray-800'
                }`}
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {tab.verticalTitle}
              </span>

              {/* Plus Button */}
              <motion.div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  activeTab === index 
                    ? 'bg-white/20 text-white' 
                    : `${tab.accentColor} text-white`
                }`}
                animate={{ rotate: activeTab === index ? 45 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Plus size={24} />
              </motion.div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSlider;
