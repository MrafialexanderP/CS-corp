import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const coreValues = [
  {
    title: 'GLIDING FREELY',
    description: 'Embracing the boundless art of creative flight and freedom',
    image: '/gliding-freely.png',
  },
  {
    title: 'SEEING FAR AHEAD',
    description: 'A visionary spirit that keeps looking forward and beyond',
    image: '/seeing-far-ahead.png',
  },
  {
    title: 'TOGETHERNESS',
    description: 'United in purpose, stronger together in every endeavor',
    image: '/togetherness.png',
  }
];

const teamMembers = [
  {
    name: 'John Levene',
    role: 'CHIEF EXPERIENCE OFFICER',
    image: '/placeholder.svg',
  },
  {
    name: 'Michael Chen',
    role: 'CHIEF CREATIVE OFFICER',
    image: '/placeholder.svg',
  },
  {
    name: 'Sean Hendelman',
    role: 'CHIEF EXECUTIVE OFFICER, ACTIVE & PRO TRADING',
    image: '/placeholder.svg',
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-screen pt-20 overflow-hidden">
        {/* Blue Background */}
        <div 
          className="absolute inset-0 bg-[#1a5fcc]"
        />

        {/* Blur Orbs - Pink/Salmon circles at corners */}
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#e8b4a8]/60 rounded-full blur-[120px]" />
        <div className="absolute top-10 right-0 w-[350px] h-[350px] bg-[#e8b4a8]/50 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 left-0 w-[300px] h-[300px] bg-[#e8b4a8]/40 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-0 w-[280px] h-[280px] bg-[#e8b4a8]/45 rounded-full blur-[90px]" />
        <div className="absolute bottom-1/4 -left-10 w-[320px] h-[320px] bg-[#e8b4a8]/50 rounded-full blur-[110px]" />
        <div className="absolute -bottom-20 right-10 w-[380px] h-[380px] bg-[#e8b4a8]/55 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
          {/* WHO ARE WE Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-12">WHO ARE WE?</h1>
            
            {/* Camar/Seagull and Sakti/Mighty */}
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-left"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Camar/ <span className="italic font-normal">Seagull</span>
                </h2>
                <p className="text-white/80 text-sm">A creature of three Elements:</p>
                <p className="text-white/80 text-sm">Land, Sea, Air</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-right"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Sakti/ <span className="italic font-normal">Mighty</span>
                </h2>
                <p className="text-white/80 text-sm">The Powerful being</p>
              </motion.div>
            </div>

            {/* PRO and COM */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center items-center gap-8 md:gap-16 mb-8"
            >
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white">PRO</h3>
                <p className="text-white/70 text-xs">An acronym for Production</p>
              </div>
              <div className="w-px h-16 bg-white/30" />
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white">COM</h3>
                <p className="text-white/70 text-xs">An acronym for Communication</p>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/70 text-sm"
            >
              Created from <span className="font-semibold text-white">PT. CAMAR SAKTI</span>
            </motion.p>
          </motion.div>

          {/* Core Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Core Values of Camar Sakti
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] shadow-xl">
                    {/* Title Text - Blue italic at top center */}
                    <div className="absolute top-6 left-0 right-0 z-20 text-center">
                      <h3 className="text-vibrant-blue text-2xl md:text-3xl font-bold italic tracking-wide">
                        {value.title}
                      </h3>
                    </div>
                    
                    {/* Image */}
                    <img 
                      src={value.image} 
                      alt={value.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">VISION</h2>
            <p className="text-white/90 text-lg max-w-2xl">
              To become an <span className="text-coral font-semibold">Activation partner</span>, recognized 
              for boundless creativity and the ability to create deep and inspiring events.
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-right mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">MISSION</h2>
            <p className="text-white/90 text-lg max-w-2xl ml-auto">
              With the philosophy of the mighty seagull, <span className="text-coral font-semibold">Camar Sakti</span> is 
              ready to elevate every project to become a memorable experiences with the mightiness{' '}
              <span className="text-coral font-semibold">creativity</span> and{' '}
              <span className="text-coral font-semibold">excellence execution</span> through{' '}
              <span className="text-coral font-semibold">harmonious collaboration</span>.
            </p>
          </motion.div>

          {/* Meet Our Team Section - Inside same background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 pt-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Meet Our Business Leaders</h2>
            <p className="text-white/70">Driving Growth and Client Success</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 pb-16">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${index === 1 ? 'md:mt-16' : ''}`}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 group">
                  {/* Image */}
                  <div className="aspect-square bg-gray-200 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-white/70 text-sm uppercase tracking-wide">{member.role}</p>
                  </div>

                  {/* Open Bio Button */}
                  <div className="border-t border-white/20 px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
                    <span className="text-white text-sm">Open Bio</span>
                    <span className="text-white text-xl">+</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
