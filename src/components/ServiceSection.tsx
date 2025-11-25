const ServiceSection = () => {
  return (
    <section className="relative">
      <div className="relative overflow-hidden">
        {/* Curved wave background */}
        <svg className="w-full h-32 md:h-40" viewBox="0 0 1440 200" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 0 L0 100 Q360 150 720 100 T1440 100 L1440 0 Z" fill="hsl(var(--primary))" />
        </svg>
        
        {/* Marquee text positioned on the wave */}
        <div className="absolute top-8 md:top-12 left-0 right-0 overflow-hidden">
          <div className="flex items-center justify-center">
            <div className="animate-marquee whitespace-nowrap">
              <span className="text-3xl md:text-4xl font-bold text-white mx-8">OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • OUR SERVICE • </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="text-gray-800">CS</span>
                <span className="text-coral">PROD</span>
              </h3>
            </div>
            
            <div className="space-y-3">
              {[
                'Event Organizer',
                'Production House',
                'Signage & Branding',
                'Paintings & Acrylic Media'
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-coral text-white px-6 py-4 rounded-xl font-semibold text-center"
                >
                  <span className="text-white mr-2">{index + 1}</span>
                  {service}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-2">
                <span className="text-gray-800">CS</span>
                <span className="text-coral">COM</span>
              </h3>
            </div>
            
            <div className="space-y-3">
              {[
                'Post Organizer',
                'Creative Agency',
                'MICE',
                'Social Media',
                'Entertainment'
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-coral text-white px-6 py-4 rounded-xl font-semibold text-center"
                >
                  <span className="text-white mr-2">{index + 1}</span>
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-coral-light py-6">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-white text-center text-sm font-semibold tracking-wider">
            PRINTING MACHINES • LASER CUTTING MACHINES • BOOTH PRODUCTION WORKSHOP
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
