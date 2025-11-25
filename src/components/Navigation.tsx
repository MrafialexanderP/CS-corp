const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <a href="#about" className="text-foreground hover:opacity-70 transition-opacity text-sm font-medium">
            about
          </a>
          <a href="#service" className="text-foreground hover:opacity-70 transition-opacity text-sm font-medium">
            service
          </a>
        </div>
        
        <a href="#" className="text-xl font-bold text-foreground">
          CS CORP
        </a>
        
        <div className="flex items-center gap-12">
          <a href="#client" className="text-foreground hover:opacity-70 transition-opacity text-sm font-medium">
            client
          </a>
          <a href="#contact" className="text-foreground hover:opacity-70 transition-opacity text-sm font-medium">
            contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
