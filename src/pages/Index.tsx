import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import ServiceSection from "@/components/ServiceSection";
import ExperienceSection from "@/components/ExperienceSection";
import CSCOMSection from "@/components/CSCOMSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Handle hash navigation when page loads
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const navHeight = 80; // Height of fixed navbar
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - navHeight;

          // Small delay to ensure page is fully rendered
          setTimeout(() => {
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }, 100);
        }
      } else {
        // Jika tidak ada hash, scroll ke atas
        window.scrollTo(0, 0);
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    
    return () => {
      window.removeEventListener("hashchange", handleHashScroll);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ImpactSection />
      <ServiceSection />
      <ExperienceSection />
      <CSCOMSection />
      <ClientsSection />
      <Footer />
    </div>
  );
};

export default Index;
