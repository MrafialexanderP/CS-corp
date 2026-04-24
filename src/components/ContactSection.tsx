import { Mail, Phone, User } from 'lucide-react';
import { divIcon } from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'sonner';
import AnimatedSubmitButton from '@/components/AnimatedSubmitButton';
import { fetchContacts, fetchSosmeds, sendContactMessage } from '@/lib/api-services';
import type { Contact, Sosmed } from '@/lib/api-constants';
import { getSocialIcon } from '@/lib/icon-helper';
import { validateContactForm } from '@/lib/email';

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
    name: 'CScom',
    address: 'Jl. RE Martadinata No.11, Ciputat, Kec. Ciputat, Kota Tangerang Selatan, Banten 15411',
    position: [-6.3241244, 106.7463706],
    mapsUrl: 'https://maps.app.goo.gl/L724ptLLcCTntEku9',
  },
  {
    id: 2,
    name: 'CSPRO Production Workshop',
    address: 'Jl. Masjid Al Aqso No.99, Jabon Mekar, Parung, Bogor Regency, West Java 16330',
    position: [-6.4331130, 106.7098639],
    mapsUrl: 'https://maps.app.goo.gl/sRjw3R4MRzkf3MXJ7?g_st=iw',
  },
  {
    id: 3,
    name: 'CSCOM & CSPRO Digital Printing',
    address: 'Jl. RE Martadinata No.11, Ciputat, Kec. Ciputat, Kota Tangerang Selatan, Banten 15411',
    position: [-6.3241244, 106.7463706],
    mapsUrl: 'https://maps.app.goo.gl/L724ptLLcCTntEku9',
  },
  {
    id: 4,
    name: 'CSPRO Neon Box dan Huruf Timbul',
    address: 'Jl. Raya Bojongsari No.14, Bojongsari Lama, Kec. Bojongsari, Kota Depok, Jawa Barat 16516',
    position: [-6.4024789, 106.7420091],
    mapsUrl: 'https://maps.app.goo.gl/K5xgM5xPqR2JFmwH8',
  },
  {
    id: 5,
    name: 'CSPRO laser cutting',
    address: 'Jalan R.E. Martadinata No.50, RT 01/10 Ciputat - Depan Carefour Ciputat, Ciputat, South Tangerang City, Banten 15411',
    position: [-6.321092, 106.74601],
    mapsUrl: 'https://maps.app.goo.gl/dJcngTb8mQ6dYB6n8',
  },
  {
    id: 6,
    name: 'Percetakan CSPRO - Pondok Labu',
    address: 'Jl. Pd. Labu 1 No.28 3, RT.3/RW.7, Pd. Labu, Kec. Cilandak, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12450',
    position: [-6.3057383, 106.7938507],
    mapsUrl: 'https://maps.app.goo.gl/KZnGCf5VRCjnDvzDA',
  },
];

const mapCenter: [number, number] = [-6.3384, 106.7571];

const branchLogoIcon = divIcon({
  className: '',
  html: `
    <div style="
      width: 44px;
      height: 44px;
      border-radius: 9999px;
      background: #ffffff;
      border: 2px solid #2A3582;
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
  popupAnchor: [0, -36],
});

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [contactData, setContactData] = useState<Contact | null>(null);
  const [sosmeds, setSosmeds] = useState<Sosmed[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [contacts, sosmedsData] = await Promise.all([fetchContacts(), fetchSosmeds()]);

        if (contacts.length > 0) {
          setContactData(contacts[0]);
        }

        setSosmeds(sosmedsData);
      } catch (error) {
        console.error('Failed to load contact data:', error);
      }
    };

    void loadData();
  }, []);

  const isFormValid = () => {
    const { isValid } = validateContactForm(formData);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateContactForm(formData);
    if (!isValid) {
      const firstError = Object.values(errors)[0];
      toast.error(firstError);
      return;
    }

    setIsLoading(true);

    try {
      await sendContactMessage({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      toast.success('Message sent successfully! We will get back to you soon.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="bg-white">
      <div className="bg-[#EB670E] text-white py-3 sm:py-4 md:py-5 text-center">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold italic tracking-wide">CONTACT US</h2>
      </div>

      <section
        className="relative pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6"
        style={{ background: 'linear-gradient(180deg, #ffffff 40%)', backdropFilter: 'blur(10px)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-start">
            <div className="text-black">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 sm:mb-7 italic leading-tight">
                Ready to Fly With Us?<br />
                Together. Get in Touch
              </h3>

              <button
                className="px-10 py-3.5 rounded-full font-semibold text-white mb-7 text-lg sm:text-xl"
                style={{
                  background: 'linear-gradient(90deg, #EB670E 0%, #2A3582 80%)',
                }}
              >
                Get In Touch
              </button>

              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-7 text-black">
                Get in touch to discuss your event activation and production needs today.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2">Address:</h4>
                  <p className="text-base sm:text-lg">Jl. RE Martadinata No 5A</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2">Phone:</h4>
                  <p className="text-base sm:text-lg">
                    {contactData ? `+62 ${contactData.whatsapp}` : '+62 081219420430'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2">Working Hours:</h4>
                  <p className="text-base sm:text-lg">{contactData?.working_hours || 'Mon - Fri: 9am - 6 pm'}</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg sm:text-xl mb-2">Socials:</h4>
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
                    lineHeight: '1.2',
                  }}
                >
                  {contactData?.email || 'cscorp@gmail.com'}
                </a>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-black">Send Us A Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
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

                <AnimatedSubmitButton onClick={handleSubmit} disabled={!isFormValid()} isLoading={isLoading} />
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #2A3582 100%)' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-4">
            Visit Our{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #EB670E 0%, #2A3582 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Headquarters
            </span>
          </h3>

          <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
            <MapContainer center={mapCenter} zoom={11} scrollWheelZoom className="h-full w-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {branchLocations.map((branch) => (
                <Marker key={branch.id} position={branch.position} icon={branchLogoIcon}>
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
                        Open in Google Maps
                      </a>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactSection;
