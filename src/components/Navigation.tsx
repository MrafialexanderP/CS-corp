import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
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
            <div className="flex items-center gap-8">
              <Link 
                to="/about"
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
              >
                about
              </Link>
              {isHomePage ? (
                <a 
                  href="#service" 
                  onClick={(e) => handleNavClick(e, "#service")}
                  className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
                >
                  service
                </a>
              ) : (
                <Link 
                  to="/#service"
                  className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
                >
                  service
                </Link>
              )}
            </div>
            
            {/* Center Logo */}
            <Link 
              to="/" 
              className="text-xl font-bold text-black px-4"
            >
              CS CORP
            </Link>
            
            {/* Right Links */}
            <div className="flex items-center gap-8">
              {/* Client Dropdown */}
              <div className="relative group">
                <button
                  className="flex items-center gap-1 text-black hover:text-gray-700 transition-colors text-sm font-bold"
                  onMouseEnter={() => setOpenDropdown("client")}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  client
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                {openDropdown === "client" && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
                    onMouseEnter={() => setOpenDropdown("client")}
                    onMouseLeave={() => setOpenDropdown(null)}
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
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
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
