import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Jika ada hash, biarkan Index.tsx yang handle hash navigation
    if (hash) {
      return;
    }

    // Scroll ke atas ketika pathname berubah (navigasi ke halaman baru)
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;

