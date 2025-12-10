import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStack';
import ShowMoreButton from './ShowMoreButton';

const ExperienceSection = () => {
  return (
    <section className="relative bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="relative mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B8BA4] italic">
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
          <ScrollStackItem itemClassName="bg-[#6B8BA4] text-white h-64 flex items-center justify-between px-12 rounded-[30px]">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-4">Event Organizer</h3>
              <p className="text-white/90 text-lg max-w-md">
                Comprehensive planning and execution services for unforgettable events
              </p>
            </div>
            <div className="w-40 h-40 bg-white/10 rounded-lg flex items-center justify-center">
              <div className="w-32 h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold">
                LOGO
              </div>
            </div>
          </ScrollStackItem>

          {/* Brand Activation Card */}
          <ScrollStackItem itemClassName="bg-coral text-white h-64 flex items-center justify-between px-12 rounded-[30px]">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-4">Brand Activation</h3>
              <p className="text-white/90 text-lg max-w-md">
                Strategic campaigns that bring brands to life and engage audiences
              </p>
            </div>
            <div className="w-40 h-40 bg-white/10 rounded-lg flex items-center justify-center">
              <div className="w-32 h-32 bg-vibrant-blue rounded-lg flex items-center justify-center text-white font-bold">
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
