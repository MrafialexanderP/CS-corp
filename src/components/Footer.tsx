import { useState, useEffect } from 'react';
import { fetchSosmeds } from '@/lib/api-services';
import type { Sosmed } from '@/lib/api-constants';
import { getSocialIcon } from '@/lib/icon-helper';

const Footer = () => {
  const [sosmeds, setSosmeds] = useState<Sosmed[]>([]);

  useEffect(() => {
    const loadSosmeds = async () => {
      try {
        const data = await fetchSosmeds();
        setSosmeds(data);
      } catch (error) {
        console.error('Failed to load sosmeds:', error);
        setSosmeds([]);
      }
    };

    loadSosmeds();
  }, []);

  return (
    <footer id="contact" className="bg-black py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-gray-800">
          {/* Left - About (Takes more space) */}
          <div className="flex-1 w-full sm:w-auto">
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed text-justify">
              CSPRO & CSCOM is an abbreviation, where C is an acronym for Camar, S is an Acronym for Sakti, PRO is an acronym for Production & COM is an acronym for Communication. Created from PT. CAMAR SAKTI
            </p>
          </div>

          {/* Right - Navigation Links */}
          <div className="flex gap-4 sm:gap-6 md:gap-8 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-start">
            {/* About Column */}
            <div>
              <a href="/about" className="text-white hover:text-coral font-bold text-xs sm:text-sm transition-colors">
                About
              </a>
            </div>

            {/* Work Column with Links */}
            <div>
              <h3 className="text-white font-bold text-xs sm:text-sm leading-tight mb-4">Work</h3>
              <ul className="space-y-1 sm:space-y-2">
                <li>
                  <a href="/events" className="text-gray-400 hover:text-white transition-colors text-xs">
                    Events
                  </a>
                </li>
                <li>
                  <a href="/products" className="text-gray-400 hover:text-white transition-colors text-xs">
                    Production
                  </a>
                </li>
              </ul>
            </div>

            {/* Clients Column */}
            <div>
              <a href="/#clients" className="text-white hover:text-coral font-bold text-xs sm:text-sm transition-colors">
                Clients
              </a>
            </div>

            {/* Contact Column */}
            <div>
              <a href="/contact" className="text-white hover:text-coral font-bold text-xs sm:text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        
        
        {/* Bottom Section */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
          {/* Left - Brand */}
          <div className="text-center sm:text-left">
            <h2 className="text-white font-bold text-xl sm:text-2xl mb-1">CS CORP</h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              © 2025 CS CORP | PRIVACY POLICY
            </p>
          </div>

          {/* Right - Social Icons */}
          <div className="flex items-center gap-4">
            {sosmeds.map((sosmed) => {
              const IconComponent = getSocialIcon(sosmed.icon_class, sosmed.nama_sosmed);
              return (
                <a
                  key={sosmed.id}
                  href={sosmed.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-coral transition-colors"
                  aria-label={sosmed.nama_sosmed}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
