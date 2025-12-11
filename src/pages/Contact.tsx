import { Mail, Phone, Clock, MapPin, Instagram, Youtube, Linkedin } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AnimatedButton from '../components/AnimatedButton';

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Blue and Orange Gradient Background */}
      <section className="relative pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6" style={{ background: 'linear-gradient(135deg, #3C597F 0%, rgba(95, 120, 155, 0.8) 25%, rgba(150, 110, 100, 0.8) 75%, #EF6C4E 100%)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left Side - CTA */}
            <div className="text-white">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 italic leading-tight">
                Ready to Fly With Us?<br />
                Together. Get in Touch
              </h1>
              <AnimatedButton />
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-4 sm:space-y-6 text-white">
              <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6">
                Get in touch to discuss your event activation and production needs today.
              </p>

              {/* Address */}
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Address:</h3>
                <p className="text-xs sm:text-sm">Jl. RE Martadinata No 5A</p>
              </div>

              {/* Phone and Working Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Phone:</h3>
                  <p className="text-xs sm:text-sm">+62 081219420430</p>
                </div>

                {/* Working Hours */}
                <div>
                  <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2">Working Hours:</h3>
                  <p className="text-xs sm:text-sm">Mon - Fri: 9am - 6 pm</p>
                </div>
              </div>

              {/* Socials */}
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-3">Socials:</h3>
                <div className="flex gap-2 sm:gap-3">
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <Instagram size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <TikTokIcon />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <Youtube size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a href="#" className="hover:opacity-80 transition-opacity">
                    <Linkedin size={18} className="sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>

              {/* Email */}
              <div>
                <a 
                  href="mailto:cscorp@gmail.com" 
                  className="text-2xl font-bold italic hover:opacity-80 transition-opacity inline-block"
                  style={{
                    background: 'linear-gradient(90deg, #EF6C4E 0%, #3C597F 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  cscorp@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Headquarters Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Visit Our{' '}
            <span 
              style={{ 
                background: 'linear-gradient(90deg, #EF6C4E 0%, #3C597F 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Headquarters
            </span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Jalan RE Martadinata No 5A, Ciputat, South Tangerang
          </p>

          {/* Google Maps Embed */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3686472891855!2d106.74468931476916!3d-6.345379995407834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee3e065d774d%3A0x5b4b4b4b4b4b4b4b!2sJl.%20RE%20Martadinata%20No.5A%2C%20Ciputat%2C%20South%20Tangerang!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CS Corp Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
