const HeroSection = () => {
  return (
    <section className="min-h-screen gradient-hero flex items-center justify-center pt-20 pb-32 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-7xl md:text-8xl font-bold text-white mb-16 tracking-wide">
          THE CS PHILOSOPHY
        </h1>
        
        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white mb-2">Camar/ <span className="italic">Seagull</span></h2>
            <p className="text-white/80 text-sm">A Symbol of Great Courage,</p>
            <p className="text-white/80 text-sm">Light, Self, up</p>
          </div>
          
          <div className="text-left">
            <h2 className="text-4xl font-bold text-white mb-2">Sakti/ <span className="italic">Mighty</span></h2>
            <p className="text-white/80 text-sm">The Power of being</p>
            <p className="text-white/80 text-sm">Robust</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
