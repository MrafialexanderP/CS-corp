import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
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
    if (!isHomePage) return; // Let Link handle navigation if not on home page
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
              <Link 
                to="/products"
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
              >
                products
              </Link>
              <Link 
                to="/events"
                className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
              >
                events
              </Link>
              {isHomePage ? (
                <a 
                  href="#client" 
                  onClick={(e) => handleNavClick(e, "#client")}
                  className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
                >
                  client
                </a>
              ) : (
                <Link 
                  to="/#client"
                  className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
                >
                  client
                </Link>
              )}
              {isHomePage ? (
                <a 
                  href="#contact" 
                  onClick={(e) => handleNavClick(e, "#contact")}
                  className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
                >
                  contact
                </a>
              ) : (
                <Link 
                  to="/#contact"
                  className="text-black hover:text-gray-700 transition-colors text-sm font-bold"
                >
                  contact
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
