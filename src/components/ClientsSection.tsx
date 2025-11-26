const clients = [
  "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg",
  "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg",
  "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg",
  "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg",
  "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg",
  "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg",
  "/placeholder.svg", "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"
];

const ClientsSection = () => {
  return (
    <section id="client" className="gradient-section py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-16">OUR CLIENTS</h2>
        
        <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-4 flex items-center justify-center aspect-square shadow-lg hover:scale-105 transition-transform"
            >
              <img src={client} alt={`Client ${index + 1}`} className="w-full h-full object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
