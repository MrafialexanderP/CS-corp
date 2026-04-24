import { Mail, Phone, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { divIcon } from 'leaflet';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AnimatedSubmitButton from '../components/AnimatedSubmitButton';
import { sendContactEmail, validateContactForm } from '../lib/email';
import { fetchContacts, fetchSosmeds, sendContactMessage } from '../lib/api-services';
import type { Contact, Sosmed } from '../lib/api-constants';
import { getSocialIcon } from '../lib/icon-helper';

type BranchLocation = {
  id: number;
  name: string;
  address: string;
  position: [number, number];
  mapsUrl: string;
};

const branchLocations: BranchLocation[] = [
  {
    id: 1,
    name: 'CSCOM',
    address: 'Jl. RE Martadinata No.11, Ciputat, Kec. Ciputat, Kota Tangerang Selatan, Banten 15411',
    position: [-6.3241244, 106.7463706],
    mapsUrl: 'https://maps.app.goo.gl/L724ptLLcCTntEku9'
  },
  {
    id: 2,
    name: 'CSPRO PRODUCTION WORKSHOP',
    address: 'Jl. Masjid Al Aqso No.99, Jabon Mekar, Parung, Bogor Regency, West Java 16330',
    position: [-6.4331130, 106.7098639],
    mapsUrl: 'https://maps.app.goo.gl/sRjw3R4MRzkf3MXJ7?g_st=iw'
  },
  {
    id: 3,
    name: 'CSPRO DIGITAL PRINTING',
    address: 'Jl. RE Martadinata No.11, Ciputat, Kec. Ciputat, Kota Tangerang Selatan, Banten 15411',
    position: [-6.3241244, 106.7463706],
    mapsUrl: 'https://maps.app.goo.gl/L724ptLLcCTntEku9'
  },
  {
    id: 4,
    name: 'CSPRO OFFSET PRINTING - Pondok Labu',
    address: 'Alamat dummy Pondok Labu - ubah ke alamat asli Anda',
    position: [-6.3057, 106.7903],
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-6.3057,106.7903'
  },
  {
    id: 5,
    name: 'CSPRO BOOTH PRODUCTION - Bojongsari',
    address: 'Alamat dummy Bojongsari - ubah ke alamat asli Anda',
    position: [-6.3943, 106.7642],
    mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=-6.3943,106.7642'
  },
  {
    id: 6,
    name: 'PERCETAKAN CSPRO - Pondok Labu',
    address: 'Jl. Pd. Labu 1 No.28 3, RT.3/RW.7, Pd. Labu, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450',
    position: [-6.3057383, 106.7938507],
    mapsUrl: 'https://maps.app.goo.gl/KZnGCf5VRCjnDvzDA'
  }
];

const mapCenter: [number, number] = [-6.2894, 106.8054];

const branchLogoIcon = divIcon({
  className: '',
  html: `
    <div style="
      width: 44px;
      height: 44px;
      border-radius: 9999px;
      background: #ffffff;
      border: 2px solid #EB670E;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    ">
      <img
        src="/cscorp1.png"
        alt="CSCorp"
        style="width: 30px; height: 30px; object-fit: contain;"
      />
    </div>
  `,
  iconSize: [44, 44],
  iconAnchor: [22, 44],
  popupAnchor: [0, -36]
});

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState<Contact | null>(null);
  const [sosmeds, setSosmeds] = useState<Sosmed[]>([]);

  // Load contacts and sosmeds from API
  useEffect(() => {
    const loadData = async () => {
      try {
        const [contacts, sosmedsData] = await Promise.all([
          fetchContacts(),
          fetchSosmeds()
        ]);
        
        // Get first contact (usually only one)
        if (contacts.length > 0) {
          setContactData(contacts[0]);
        }
        
        setSosmeds(sosmedsData);
      } catch (error) {
        console.error('Failed to load contact data:', error);
      }
    };

    loadData();
  }, []);

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
      // Hit backend contact message endpoint
      await sendContactMessage({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message
      });
      
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
      <section className="relative pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #EB670E 0%, #ffffff 40%)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            {/* Left Side - Contact Info */}
            <div className="text-black">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 sm:mb-7 italic leading-tight">
                Ready to Fly With Us?<br />
                Together. Get in Touch
              </h1>
              
              <button 
                className="px-10 py-3.5 rounded-full font-semibold text-white mb-7 text-lg sm:text-xl"
                style={{
                  background: 'linear-gradient(90deg, #EB670E 0%, #2A3582 100%)'
                }}
              >
                Get In Touch
              </button>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-7 text-black">
                Get in touch to discuss your event activation and production needs today.
              </p>

              {/* Address and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Address:</h3>
                  <p className="text-base sm:text-lg">Jl. RE Martadinata No 5A</p>
                </div>

                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Phone:</h3>
                  <p className="text-base sm:text-lg">
                    {contactData ? `+62 ${contactData.whatsapp}` : '+62 081219420430'}
                  </p>
                </div>
              </div>

              {/* Working Hours and Socials */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Working Hours:</h3>
                  <p className="text-base sm:text-lg">
                    {contactData?.working_hours || 'Mon - Fri: 9am - 6 pm'}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-lg sm:text-xl mb-2">Socials:</h3>
                  <div className="flex gap-3 text-lg">
                    {sosmeds.map((sosmed) => {
                      const IconComponent = getSocialIcon(sosmed.icon_class, sosmed.nama_sosmed);
                      return (
                        <a
                          key={sosmed.id}
                          href={sosmed.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black hover:opacity-70 transition-opacity"
                          aria-label={sosmed.nama_sosmed}
                        >
                          <IconComponent className="w-5 h-5" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <a 
                  href={contactData ? `mailto:${contactData.email}` : 'mailto:cscorp@gmail.com'} 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold italic hover:opacity-80 transition-opacity inline-block pb-2"
                  style={{
                    background: 'linear-gradient(90deg, #EB670E 0%, #EB670E 50%, #2A3582 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    display: 'inline-block',
                    lineHeight: '1.2'
                  }}
                >
                  {contactData?.email || 'cscorp@gmail.com'}
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
      <section className="py-16 px-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #2A3582 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Visit Our{' '}
            <span 
              style={{ 
                background: 'linear-gradient(90deg, #EB670E 0%, #2A3582 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Headquarters
            </span>
          </h2>

          {/* Interactive Map with Branch Markers */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <MapContainer
              center={mapCenter}
              zoom={11}
              scrollWheelZoom
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {branchLocations.map((branch) => (
                <Marker
                  key={branch.id}
                  position={branch.position}
                  icon={branchLogoIcon}
                >
                  <Popup>
                    <div className="text-left min-w-[220px]">
                      <p className="font-bold text-[#B8352C] text-sm mb-1">{branch.name}</p>
                      <p className="text-xs text-gray-700 mb-2">{branch.address}</p>
                      <p className="text-xs text-[#2A3582]">
                        Koordinat: {branch.position[0]}, {branch.position[1]}
                      </p>
                      <a
                        href={branch.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 px-3 py-1.5 rounded-full text-xs font-semibold text-[#2A3582] bg-white hover:opacity-70 transition-colors border border-gray-300"
                      >
                        Get Direction
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
};

export default Contact;
