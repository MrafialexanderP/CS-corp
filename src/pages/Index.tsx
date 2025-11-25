import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ImpactSection from "@/components/ImpactSection";
import ServiceSection from "@/components/ServiceSection";
import EventsSection from "@/components/EventsSection";
import ProductionsSection from "@/components/ProductionsSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ImpactSection />
      <ServiceSection />
      <EventsSection />
      <ProductionsSection />
      <ClientsSection />
      <Footer />
    </div>
  );
};

export default Index;
