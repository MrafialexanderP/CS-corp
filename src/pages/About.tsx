import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { fetchVisions, fetchStructurals } from '@/lib/api-services';
import type { Vision, Structural } from '@/lib/api-constants';
import { getImageUrl } from '@/lib/api-constants';
import { getSocialIcon } from '@/lib/icon-helper';

const coreValues = [
  {
    title: 'GLIDING FREELY',
    description: 'Breaking the boundaries of',
    highlight: 'creativity and innovation',
    suffix: 'in creating stunning events.',
    image: '/gliding-freely.png',
  },
  {
    title: 'SEEING FAR AHEAD',
    description: 'Possess a sharp vision and broad perspective in',
    highlight: 'understanding every detail',
    suffix: "of our clients' desires.",
    image: '/seeing-far-ahead.png',
  },
  {
    title: 'TOGETHERNESS',
    description: 'Create',
    highlight: 'harmonious collaboration',
    suffix: 'in every project.',
    image: '/togetherness.png',
  }
];

interface TeamMember {
  name: string;
  role: string;
  image: string;
  skills: string[];
  bio: string;
  sosmeds: Array<{
    name: string;
    url: string;
    iconClass: string;
  }>;
}

const About = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [visions, setVisions] = useState<Vision[]>([]);
  const [visionsLoading, setVisionsLoading] = useState(true);
  const [visionsError, setVisionsError] = useState<string | null>(null);
  const [membersLoading, setMembersLoading] = useState(true);
  const [membersError, setMembersError] = useState<string | null>(null);

  // Load visions
  useEffect(() => {
    const loadVisions = async () => {
      try {
        setVisionsLoading(true);
        const data = await fetchVisions();
        setVisions(Array.isArray(data) ? data : []);
        setVisionsError(null);
      } catch (err) {
        console.error('Failed to load visions:', err);
        setVisionsError('Failed to load visions');
        setVisions([]);
      } finally {
        setVisionsLoading(false);
      }
    };

    loadVisions();
  }, []);

  // Load structurals (team members)
  useEffect(() => {
    const loadStructurals = async () => {
      try {
        setMembersLoading(true);
        setMembersError(null);
        const data = await fetchStructurals();
        
        // Transform API data to TeamMember format
        const transformedMembers: TeamMember[] = data.map((structural: Structural) => {
          // Get all skills (pengalaman) - not just first 2
          const skills = (structural.skills || []).map(skill => skill.pengalaman);

          // Transform sosmeds
          const sosmeds = (structural.sosmeds || []).map(sosmed => ({
            name: sosmed.nama_sosmed,
            url: sosmed.url,
            iconClass: sosmed.icon_class,
          }));

          return {
            name: structural.nama,
            role: structural.jabatan,
            image: getImageUrl(structural.image, structural.image_url),
            skills: skills,
            bio: structural.deskripsi || '',
            sosmeds: sosmeds,
          };
        });

        setTeamMembers(transformedMembers);
      } catch (err) {
        console.error('Failed to load structurals:', err);
        setMembersError('Failed to load team members');
        setTeamMembers([]);
      } finally {
        setMembersLoading(false);
      }
    };

    loadStructurals();
  }, []);

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

        <div className="relative z-10 max-w-none mx-auto px-6 sm:px-8 py-12 sm:py-16">
          {/* WHO ARE WE Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 sm:mb-12">WHO ARE WE?</h1>
            
            {/* Camar/Seagull and Sakti/Mighty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 max-w-6xl w-full mx-auto px-2 md:px-6 mb-8 sm:mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center md:text-left md:justify-self-start"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                  Camar/ <span className="italic font-normal">Seagull</span>
                </h2>
                <p className="text-white/80 text-xs sm:text-sm leading-relaxed">A creature of three Elements:</p>
                <p className="text-white/80 text-xs sm:text-sm">Land, Sea, Air</p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center md:text-right md:justify-self-end"
              >
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">
                  Sakti/ <span className="italic font-normal">Mighty</span>
                </h2>
                <p className="text-white/80 text-xs sm:text-sm">The Powerful being</p>
              </motion.div>
            </div>

            {/* PRO and COM */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 lg:gap-24 mb-4 sm:mb-6"
            >
              <div className="text-center">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">PRO</h3>
                <p className="text-white/70 text-xs sm:text-sm">An acronym for Production</p>
              </div>
              <div className="hidden md:block w-1 h-14 md:h-20 bg-white/50" />
              <div className="text-center">
                <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">COM</h3>
                <p className="text-white/70 text-xs sm:text-sm">An acronym for Communication</p>
              </div>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-white/70 text-xs sm:text-sm"
            >
              Created from <span className="font-semibold text-white">PT. CAMAR SAKTI</span>
            </motion.p>
          </motion.div>

          {/* Core Values Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16 sm:mb-20"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
              Core Values of Camar Sakti
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-lg sm:rounded-2xl aspect-[3/4] shadow-xl">
                    {/* Title Text - Blue italic at top center */}
                    <div className="absolute top-3 sm:top-6 left-0 right-0 z-20 text-center px-2">
                      <h3 className="text-vibrant-blue text-lg sm:text-2xl md:text-3xl font-bold italic tracking-wide">
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
                  
                  {/* Description below image */}
                  <p className="text-white text-xs sm:text-sm font-bold italic mt-3 sm:mt-4 text-left px-2" style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', fontWeight: 700 }}>
                    {value.description}{' '}
                    <span className="text-white underline">{value.highlight}</span>{' '}
                    {value.suffix}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Vision and Mission Section - Centered Container */}
          <div className="max-w-5xl mx-auto space-y-16 sm:space-y-20 mb-16 sm:mb-20">
            {/* Vision Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 
                  bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #EF6C4E 0%, #ffffff 40%)'
                }}
              >
                VISION
              </motion.h2>
              {visionsError ? (
                <p className="text-red-300 text-sm sm:text-base">{visionsError}</p>
              ) : visionsLoading ? (
                <p className="text-white/70 text-sm sm:text-base">Loading vision...</p>
              ) : visions.length > 0 ? (
                <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed font-bold">
                  {visions[0].visi}
                </p>
              ) : (
                <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed font-bold">
                  To become an <span className="font-semibold">Activation partner</span>, recognized 
                  for boundless creativity and the ability to create deep and inspiring events.
                </p>
              )}
            </motion.div>

            {/* Mission Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-right"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8
                  bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(90deg, #ffffff 50%, #EF6C4E 100%)'
                }}
              >
                MISSION
              </motion.h2>
              {visionsError ? (
                <p className="text-red-300 text-sm sm:text-base">{visionsError}</p>
              ) : visionsLoading ? (
                <p className="text-white/70 text-sm sm:text-base">Loading mission...</p>
              ) : visions.length > 0 ? (
                <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed font-bold">
                  {visions[0].misi}
                </p>
              ) : (
                <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed font-bold">
                  With the philosophy of the mighty seagull, <span className="font-semibold">Camar Sakti</span> is 
                  ready to elevate every project to become a memorable experiences with the mightiness{' '}
                  <span className="font-semibold">creativity</span> and{' '}
                  <span className="font-semibold">excellence execution</span> through{' '}
                  <span className="font-semibold">harmonious collaboration</span>.
                </p>
              )}
            </motion.div>
          </div>

          {/* Meet Our Team Section - Inside same background */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16 pt-12 sm:pt-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-4">Meet Our Business Leaders</h2>
            <p className="text-white/70 text-sm sm:text-base">Driving Growth and Client Success</p>
          </motion.div>

          {membersLoading && (
            <div className="text-center py-12">
              <p className="text-white/70">Loading team members...</p>
            </div>
          )}
          {membersError && (
            <div className="text-center py-12">
              <p className="text-red-300">{membersError}</p>
            </div>
          )}
          {!membersLoading && !membersError && teamMembers.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-16 pb-12 sm:pb-16">
              {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${index === 1 ? 'md:mt-12' : ''} flex justify-center`}
              >
                {/* Profile Card */}
                <div 
                  onClick={() => setSelectedMember(member)}
                  className="relative w-full max-w-[320px] cursor-pointer group"
                >
                  <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Info with Gradient Background */}
                    <div 
                      className="p-6"
                      style={{
                        background: 'linear-gradient(135deg, #EF6C4E 0%, #F89C7E 100%)'
                      }}
                    >
                      <h3 className="text-xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-white/90 text-sm uppercase tracking-wide font-medium">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 pointer-events-auto"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="bg-white w-full max-h-[90vh] md:h-[90vh] rounded-t-3xl overflow-hidden shadow-2xl pointer-events-auto relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 md:top-6 right-4 md:right-6 z-20 w-10 md:w-12 h-10 md:h-12 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex-shrink-0"
              >
                <X className="w-5 md:w-6 h-5 md:h-6 text-gray-900" />
              </button>

              <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-auto">
                {/* Left - Image */}
                <div className="w-full md:w-1/2 h-72 sm:h-80 md:h-full bg-gray-100 flex-shrink-0 flex items-center justify-center overflow-hidden">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Right - Content */}
                <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-12 pb-16 md:pb-12 flex flex-col justify-center overflow-y-auto">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 md:mb-4 pt-4 md:pt-0">
                    {selectedMember.name}
                  </h2>
                  <p className="text-gray-900 text-xs sm:text-sm uppercase tracking-wider font-semibold mb-6 md:mb-8">
                    {selectedMember.role}
                  </p>

                  <div className="space-y-4 md:space-y-6 text-sm md:text-base pb-4 md:pb-0">
                    {/* Skills - Display all skills */}
                    {selectedMember.skills && selectedMember.skills.length > 0 && (
                      <>
                        {selectedMember.skills.map((skill, index) => (
                          <div 
                            key={index}
                            className={index < selectedMember.skills.length - 1 ? "border-b border-gray-200 pb-4" : ""}
                          >
                            <p className="text-gray-900 italic">
                              {skill}
                            </p>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Bio */}
                    <div>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedMember.bio}
                      </p>
                    </div>

                    {/* Social Media */}
                    {selectedMember.sosmeds && selectedMember.sosmeds.length > 0 && (
                      <div className="flex gap-3 md:gap-4 pt-4 md:pt-6">
                        {selectedMember.sosmeds.map((sosmed, idx) => {
                          const IconComponent = getSocialIcon(sosmed.iconClass, sosmed.name);
                          return (
                            <a
                              key={idx}
                              href={sosmed.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 sm:w-12 h-10 sm:h-12 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors flex-shrink-0"
                              aria-label={sosmed.name}
                            >
                              <IconComponent className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default About;
