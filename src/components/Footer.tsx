const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-12 mb-6">
          <a href="#about" className="text-white hover:opacity-70 transition-opacity text-sm">
            about
          </a>
          <a href="#service" className="text-white hover:opacity-70 transition-opacity text-sm">
            service
          </a>
          <a href="#client" className="text-white hover:opacity-70 transition-opacity text-sm">
            client
          </a>
          <a href="#contact" className="text-white hover:opacity-70 transition-opacity text-sm">
            contact
          </a>
        </div>
        
        <p className="text-white/60 text-center text-sm">
          CSCOM 2025. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
