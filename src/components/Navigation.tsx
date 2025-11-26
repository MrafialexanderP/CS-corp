import { useEffect, useState } from "react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-white/20 rounded-full px-8 py-4 backdrop-blur-md shadow-lg">
          <div className="flex items-center justify-between">
            {/* Left Links */}
            <div className="flex items-center gap-8">
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, "#about")}
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
              >
                about
              </a>
              <a 
                href="#service" 
                onClick={(e) => handleNavClick(e, "#service")}
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
              >
                service
              </a>
            </div>
            
            {/* Center Logo */}
            <a 
              href="#" 
              className="text-xl font-bold text-black px-4"
            >
              CS CORP
            </a>
            
            {/* Right Links */}
            <div className="flex items-center gap-8">
              <a 
                href="#client" 
                onClick={(e) => handleNavClick(e, "#client")}
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
              >
                client
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, "#contact")}
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
              >
                contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
