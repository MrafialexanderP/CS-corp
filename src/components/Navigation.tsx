import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Define sections dengan background color-nya
    const sectionConfig: { [key: string]: { bgColor: string; isDark: boolean } } = {
      hero: { bgColor: "white", isDark: false },
      service: { bgColor: "#3C597F", isDark: true },
      impact: { bgColor: "white", isDark: false },
      events: { bgColor: "#F5F5F5", isDark: false },
      productions: { bgColor: "white", isDark: false },
      clients: { bgColor: "#F9FAFB", isDark: false },
    };

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);

      // Check which section is at the navbar position (80px dari top)
      const navHeight = 80;
      let currentSectionIsDark = false;

      for (const [sectionId, config] of Object.entries(sectionConfig)) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          // Jika section berada di posisi navbar (top 0-100px)
          if (rect.top <= navHeight && rect.bottom > navHeight) {
            currentSectionIsDark = config.isDark;
            break;
          }
        }
      }

      // Fallback: jika tidak ada section yang cocok, gunakan warna default
      if (scrolled === false) {
        currentSectionIsDark = false;
      }

      setIsDarkBackground(currentSectionIsDark);
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
        <div className={`relative rounded-full px-8 py-4 backdrop-blur-md shadow-lg transition-all duration-300 ${
          isDarkBackground 
            ? "bg-white/10" 
            : "bg-white/20"
        }`}>
          <div className="flex items-center justify-between">
            {/* Left Links */}
            <div className="flex items-center gap-5">
              <Link 
                to="/about"
                className={`transition-colors duration-300 text-sm font-bold ${
                  isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                }`}
              >
                about
              </Link>
              
              {/* Work Dropdown */}
              <div className="relative">
                <button
                  className={`transition-colors duration-300 text-sm font-bold flex items-center gap-1 ${
                    isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                  }`}
                  onClick={() => setOpenDropdown(openDropdown === "work" ? null : "work")}
                >
                  work
                  {openDropdown === "work" ? (
                    <ChevronUp size={16} className="transition-transform duration-200" />
                  ) : (
                    <ChevronDown size={16} className="transition-transform duration-200" />
                  )}
                </button>

                {/* Dropdown Menu */}
                {openDropdown === "work" && (
                  <div 
                    className={`absolute top-full left-0 mt-2 w-56 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 transition-colors ${
                      isDarkBackground ? "bg-white/20" : "bg-white/20"
                    }`}
                  >
                    <div className="py-2">
                      <Link 
                        to="/events"
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold ${
                          isDarkBackground ? "text-white" : "text-black"
                        }`}
                      >
                        → Events
                      </Link>
                      <Link 
                        to="/products"
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold ${
                          isDarkBackground ? "text-white" : "text-black"
                        }`}
                      >
                        → Productions
                      </Link>
                    </div>
                  </div>
                )}
              </div>
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
              {isHomePage ? (
                <a 
                  href="#client" 
                  onClick={(e) => handleNavClick(e, "#client")}
                  className={`transition-colors duration-300 text-sm font-bold ${
                    isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                  }`}
                >
                  clients
                </a>
              ) : (
                <Link 
                  to="/#client"
                  className={`transition-colors duration-300 text-sm font-bold ${
                    isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                  }`}
                >
                  clients
                </Link>
              )}

              <Link 
                to="/contact"
                className={`transition-colors duration-300 text-sm font-bold ${
                  isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
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
