import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isDarkBackground, setIsDarkBackground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isMobile = useIsMobile();

  useEffect(() => {
    // Define sections dengan background color-nya
    const sectionConfig: { [key: string]: { bgColor: string; isDark: boolean } } = {
      hero: { bgColor: "white", isDark: true },
      service: { bgColor: "#3C597F", isDark: true },
      impact: { bgColor: "white", isDark: false },
      events: { bgColor: "#F5F5F5", isDark: false },
      productions: { bgColor: "white", isDark: false },
      clients: { bgColor: "#F9FAFB", isDark: false },
    };

    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
      setAtTop(window.scrollY < 40);

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
      const navHeight = 80; // Height of fixed navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] px-6 py-4 overflow-visible" style={{ isolation: 'isolate', transform: 'translateZ(0)', willChange: 'auto', backfaceVisibility: 'hidden', pointerEvents: 'none' }}>
      <div className="max-w-5xl mx-auto overflow-visible pointer-events-auto">
        {isMobile ? (
          // Mobile Navigation - No blur background
          <>
            <div className="flex items-center justify-between px-2 py-2 w-full" style={{ position: 'relative', zIndex: 10, gap: '1rem', pointerEvents: 'auto' }}>
              {/* Mobile Logo */}
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
              >
                <img 
                  src="/logohitam.png" 
                  alt="CS CORP Logo"
                  className="h-20 w-auto"
                  style={{ opacity: atTop ? 0 : 1, transition: 'opacity 0.3s ease', pointerEvents: atTop ? 'none' : 'auto' }}
                />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`transition-colors duration-300 pointer-events-auto flex-shrink-0 ${
                  isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                }`}
                style={{
                  position: 'relative',
                  zIndex: 10,
                  minWidth: '32px',
                  minHeight: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: atTop ? 0 : 1,
                  pointerEvents: atTop ? 'none' : 'auto',
                  transition: 'opacity 0.3s ease'
                }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu Dropdown - Outside navbar container */}
            {mobileMenuOpen && (
              <div 
                className={`absolute top-20 left-6 right-6 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-40 ${
                  isDarkBackground ? "bg-white/20" : "bg-white/20"
                }`}
              >
                <div className="py-2">
                  <Link 
                    to="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold ${
                      isDarkBackground ? "text-white" : "text-black"
                    }`}
                  >
                    About
                  </Link>

                  {/* Mobile Work Dropdown */}
                  <button
                    onClick={() => setOpenDropdown(openDropdown === "work" ? null : "work")}
                    className={`w-full text-left px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold flex items-center justify-between ${
                      isDarkBackground ? "text-white" : "text-black"
                    }`}
                  >
                    <span>Work</span>
                    {openDropdown === "work" ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>

                  {openDropdown === "work" && (
                    <div>
                      <Link 
                        to="/events"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className={`block px-6 py-3 pl-12 hover:bg-white/20 transition-colors text-sm font-semibold ${
                          isDarkBackground ? "text-white" : "text-black"
                        }`}
                      >
                        Events
                      </Link>
                      <Link 
                        to="/products"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className={`block px-6 py-3 pl-12 hover:bg-white/20 transition-colors text-sm font-semibold ${
                          isDarkBackground ? "text-white" : "text-black"
                        }`}
                      >
                        Productions
                      </Link>
                    </div>
                  )}

                  {isHomePage ? (
                    <a 
                      href="#client" 
                      onClick={(e) => {
                        handleNavClick(e, "#client");
                        setMobileMenuOpen(false);
                      }}
                      className={`block px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold ${
                        isDarkBackground ? "text-white" : "text-black"
                      }`}
                    >
                      Clients
                    </a>
                  ) : (
                    <Link 
                      to="/#client"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold ${
                        isDarkBackground ? "text-white" : "text-black"
                      }`}
                    >
                      Clients
                    </Link>
                  )}

                  <Link 
                    to="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold ${
                      isDarkBackground ? "text-white" : "text-black"
                    }`}
                  >
                    Contact
                  </Link>
                </div>
              </div>
            )}
          </>
        ) : (
          // Desktop Navigation
          <div
            className={`relative rounded-full px-6 py-3 max-w-[960px] mx-auto backdrop-blur-md shadow-lg transition-all duration-300 ${
              isDarkBackground 
                ? "bg-white/10" 
                : "bg-white/20"
            }`}
            style={{
              opacity: atTop ? 0 : 1,
              pointerEvents: atTop ? 'none' : 'auto',
              transition: 'opacity 0.35s ease'
            }}
          >
            <div className="flex items-center justify-evenly">
              {/* About Link */}
              <Link 
                to="/about"
                className={`transition-colors duration-300 text-sm font-bold ${
                  isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                }`}
              >
                About
              </Link>
              
              {/* Work Dropdown */}
              <div className="relative">
                <button
                  className={`transition-colors duration-300 text-sm font-bold flex items-center gap-1 ${
                    isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                  }`}
                  onClick={() => setOpenDropdown(openDropdown === "work" ? null : "work")}
                >
                  Work
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
                        Events
                      </Link>
                      <Link 
                        to="/products"
                        onClick={() => setOpenDropdown(null)}
                        className={`block px-6 py-3 hover:bg-white/20 transition-colors text-sm font-semibold ${
                          isDarkBackground ? "text-white" : "text-black"
                        }`}
                      >
                        Productions
                      </Link>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Center Logo */}
              <Link 
                to="/" 
                className="flex-shrink-0"
              >
                <img 
                  src="/logohitam.png" 
                  alt="CS CORP Logo"
                  className="h-16 w-auto"
                />
              </Link>
              
              {/* Clients Link */}
              {isHomePage ? (
                <a 
                  href="#client" 
                  onClick={(e) => handleNavClick(e, "#client")}
                  className={`transition-colors duration-300 text-sm font-bold ${
                    isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                  }`}
                >
                  Clients
                </a>
              ) : (
                <Link 
                  to="/#client"
                  className={`transition-colors duration-300 text-sm font-bold ${
                    isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                  }`}
                >
                  Clients
                </Link>
              )}

              {/* Contact Link */}
              <Link 
                to="/contact"
                className={`transition-colors duration-300 text-sm font-bold ${
                  isDarkBackground ? "text-white hover:text-gray-200" : "text-black hover:text-gray-700"
                }`}
              >
                Contact
              </Link>
            </div>
            </div>
          )}
      </div>
    </nav>
  );
};

export default Navigation;
