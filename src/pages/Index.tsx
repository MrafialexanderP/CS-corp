import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import ServiceSection from "@/components/ServiceSection";
import CSCOMSection from "@/components/CSCOMSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ImpactSection />
      <ServiceSection />
      <CSCOMSection />
      <ClientsSection />
      <Footer />
    </div>
  );
};

export default Index;
