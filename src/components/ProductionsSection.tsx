import { Card } from "@/components/ui/card";

const productions = [
  {
    title: "Youtube Creator Collective",
    subtitle: "Booth Productions",
    image: "/placeholder.svg"
  },
  {
    title: "Astra Corporate Affairs Awards",
    subtitle: "Event by ASTRA",
    image: "/placeholder.svg"
  },
  {
    title: "Dulux",
    subtitle: "Booth at Kawan Lama Purwokerto",
    image: "/placeholder.svg"
  }
];

const ProductionsSection = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <button className="text-sm font-semibold hover:opacity-70 transition-opacity">
            click to see more →
          </button>
          <div className="bg-primary rounded-full px-8 py-4">
            <h2 className="text-2xl font-bold text-white">OUR PRODUCTIONS</h2>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {productions.map((production, index) => (
            <Card key={index} className="overflow-hidden bg-coral border-0 rounded-2xl shadow-lg">
              <div className="aspect-video bg-gray-200">
                <img src={production.image} alt={production.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-1">{production.title}</h3>
                <p className="text-white/90 text-sm">{production.subtitle}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductionsSection;
