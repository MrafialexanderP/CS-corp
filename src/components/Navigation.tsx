import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);

      // Check background color at navbar position
      const navBar = document.querySelector('nav');
      if (navBar) {
        const bgColor = window.getComputedStyle(navBar.nextElementSibling || document.body).backgroundColor;
        // Simple check: if background is dark, use white text
        const rgb = bgColor.match(/\d+/g);
        if (rgb) {
          const brightness = (parseInt(rgb[0]) + parseInt(rgb[1]) + parseInt(rgb[2])) / 3;
          setIsDarkBackground(brightness < 128);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (!isHomePage) return;
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
            <div className="flex items-center gap-5">
              <Link 
                to="/about"
                className={`transition-colors text-sm font-bold ${
                  isDarkBackground ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                }`}
              >
                about
              </Link>
              {isHomePage ? (
                <a 
                  href="#service" 
                  onClick={(e) => handleNavClick(e, "#service")}
                  className={`transition-colors text-sm font-bold ${
                    isDarkBackground ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                  }`}
                >
                  service
                </a>
              ) : (
                <Link 
                  to="/#service"
                  className={`transition-colors text-sm font-bold ${
                    isDarkBackground ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                  }`}
                >
                  service
                </Link>
              )}
            </div>
            
            {/* Center Logo */}
            <Link 
              to="/" 
              className="px-4"
            >
              <img 
                src="/logocs.png" 
                alt="CS CORP Logo"
                className="h-8 w-auto"
              />
            </Link>
            
            {/* Right Links */}
            <div className="flex items-center gap-5">
              {/* Client Dropdown */}
              <div className="relative">
                <button
                  className={`transition-colors text-sm font-bold ${
                    isDarkBackground ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                  }`}
                  onClick={() => setOpenDropdown(openDropdown === "client" ? null : "client")}
                >
                  client
                </button>

                {/* Dropdown Menu */}
                {openDropdown === "client" && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="py-2">
                      <Link 
                        to="/products"
                        className="block px-6 py-3 text-black hover:bg-gray-100 transition-colors text-sm font-semibold"
                      >
                        → Our Products
                      </Link>
                      <Link 
                        to="/events"
                        className="block px-6 py-3 text-black hover:bg-gray-100 transition-colors text-sm font-semibold"
                      >
                        → Our Events
                      </Link>
                      {isHomePage ? (
                        <a 
                          href="#client" 
                          onClick={(e) => {
                            handleNavClick(e, "#client");
                            setOpenDropdown(null);
                          }}
                          className="block px-6 py-3 text-black hover:bg-gray-100 transition-colors text-sm font-semibold"
                        >
                          → Our Clients
                        </a>
                      ) : (
                        <Link 
                          to="/#client"
                          onClick={() => setOpenDropdown(null)}
                          className="block px-6 py-3 text-black hover:bg-gray-100 transition-colors text-sm font-semibold"
                        >
                          → Our Clients
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/contact"
                className={`transition-colors text-sm font-bold ${
                  isDarkBackground ? "text-white hover:text-gray-300" : "text-black hover:text-gray-700"
                }`}
              >
                contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
