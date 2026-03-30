import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { trackVisitor } from "@/lib/visitor-tracking";
import Index from "./pages/Index";
import About from "./pages/About";
import OurEvents from "./pages/OurEvents";
import OurProducts from "./pages/OurProducts";
import Productions from "./pages/Productions";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const VisitorTrackingListener = () => {
  const location = useLocation();

  useEffect(() => {
    void trackVisitor(window.location.href);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <WhatsAppButton />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <VisitorTrackingListener />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<OurEvents />} />
          <Route path="/products" element={<OurProducts />} />
          <Route path="/productions" element={<Productions />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
