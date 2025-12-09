import ServiceSlider from './ServiceSlider';
import StatsAndCTA from './StatsAndCTA';

const ServiceSection = () => {
  return (
    <section id="service" className="relative bg-white">
      {/* Service Slider */}
      <ServiceSlider />
      
      {/* Stats Counter Section */}
      <StatsAndCTA />
    </section>
  );
};

export default ServiceSection;
