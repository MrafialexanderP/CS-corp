import { Mail, Phone, Instagram, Youtube, Linkedin, User } from 'lucide-react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AnimatedSubmitButton from '../components/AnimatedSubmitButton';
import { sendContactEmail, validateContactForm } from '../lib/email';

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Validate form - check if all fields are filled
  const isFormValid = () => {
    const { isValid } = validateContactForm(formData);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if form is valid
    const { isValid, errors } = validateContactForm(formData);
    
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    setIsLoading(true);

    try {
      // Send email using utility function
      await sendContactEmail(formData);
      
      toast.success('✅ Message sent successfully! We will get back to you soon.');
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('❌ Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section with Orange to White Gradient Background */}
      <section className="relative pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #EF6C4E 0%, #ffffff 40%)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left Side - Contact Info */}
            <div className="text-black">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 italic leading-tight">
                Ready to Fly With Us?<br />
                Together. Get in Touch
              </h1>
              
              <button 
                className="px-8 py-3 rounded-full font-semibold text-white mb-6"
                style={{
                  background: 'linear-gradient(90deg, #EF6C4E 0%, #3C597F 100%)'
                }}
              >
                Get In Touch
              </button>

              <p className="text-sm sm:text-base leading-relaxed mb-6 text-black">
                Get in touch to discuss your event activation and production needs today.
              </p>

              {/* Address and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-base mb-2">Address:</h3>
                  <p className="text-sm">Jl. RE Martadinata No 5A</p>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">Phone:</h3>
                  <p className="text-sm">+62 081219420430</p>
                </div>
              </div>

              {/* Working Hours and Socials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-base mb-2">Working Hours:</h3>
                  <p className="text-sm">Mon - Fri: 9am - 6 pm</p>
                </div>

                <div>
                  <h3 className="font-bold text-base mb-2">Socials:</h3>
                  <div className="flex gap-3">
                    <a href="#" className="text-black hover:opacity-70 transition-opacity">
                      <Instagram size={20} />
                    </a>
                    <a href="#" className="text-black hover:opacity-70 transition-opacity">
                      <TikTokIcon />
                    </a>
                    <a href="#" className="text-black hover:opacity-70 transition-opacity">
                      <Youtube size={20} />
                    </a>
                    <a href="#" className="text-black hover:opacity-70 transition-opacity">
                      <Linkedin size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <a 
                  href="mailto:cscorp@gmail.com" 
                  className="text-2xl sm:text-3xl font-bold italic hover:opacity-80 transition-opacity inline-block"
                  style={{
                    background: 'linear-gradient(90deg, #EF6C4E 0%, #F89C7E 50%, #3C597F 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  cscorp@gmail.com
                </a>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Send Us A Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-black">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-coral transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-black">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-coral transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-black">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-coral transition-colors"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-black">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your main text here..."
                    rows={6}
                    className="w-full px-4 py-3 rounded-3xl border border-gray-300 focus:outline-none focus:border-coral transition-colors resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <AnimatedSubmitButton 
                  onClick={handleSubmit} 
                  disabled={!isFormValid()}
                  isLoading={isLoading}
                />
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Headquarters Section */}
      <section className="py-16 px-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #3C597F 100%)' }}>
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
      <Toaster position="top-right" />
    </div>
  );
};

export default Contact;
