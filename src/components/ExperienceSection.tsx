import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ShowMoreButton from './ShowMoreButton';

const ExperienceSection = () => {
  return (
    <section className="relative bg-gray-50 py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="relative mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#6B8BA4] italic">
              Creating Impactful Experiences<br />
              & Harmonious Collaborations
            </h2>
          </motion.div>
          <div className="absolute top-0 right-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <ShowMoreButton />
            </motion.div>
          </div>
        </div>

        {/* ScrollStack Cards */}
        <ScrollStack
          className="min-h-screen"
          itemDistance={50}
          itemStackDistance={20}
          baseScale={0.95}
          useWindowScroll={true}
        >
          {/* Event Organizer Card */}
          <ScrollStackItem itemClassName="bg-[#6B8BA4] text-white h-56 sm:h-64 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Event Organizer</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Comprehensive planning and execution services for unforgettable events
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                LOGO
              </div>
            </div>
          </ScrollStackItem>

          {/* Brand Activation Card */}
          <ScrollStackItem itemClassName="bg-coral text-white h-56 sm:h-64 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-12 rounded-2xl sm:rounded-[30px]">
            <div className="flex-1 mb-6 sm:mb-0">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">Brand Activation</h3>
              <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-md">
                Strategic campaigns that bring brands to life and engage audiences
              </p>
            </div>
            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                LOGO
              </div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </section>
  );
};

export default ExperienceSection;
