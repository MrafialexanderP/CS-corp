import { Card } from "@/components/ui/card";

const events = [
  {
    title: "K-Content BizWeek 2025 by KOCCA",
    date: "Jan 24th-30th 2025",
    image: "/placeholder.svg"
  },
  {
    title: "Shila Fun Run 2025",
    date: "Jan 7th 2025",
    image: "/placeholder.svg"
  },
  {
    title: "The New BMW X3 & BMW Z Grand Coupe Launch by BMW",
    date: "",
    image: "/placeholder.svg"
  }
];

const EventsSection = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div className="bg-coral rounded-full px-8 py-4">
            <h2 className="text-2xl font-bold text-white">OUR EVENTS</h2>
          </div>
          <button className="text-sm font-semibold hover:opacity-70 transition-opacity">
            click to see more →
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden bg-primary border-0 rounded-2xl shadow-lg">
              <div className="aspect-video bg-gray-200">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-white font-bold text-lg mb-2">{event.title}</h3>
                {event.date && <p className="text-white/80 text-sm">{event.date}</p>}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
