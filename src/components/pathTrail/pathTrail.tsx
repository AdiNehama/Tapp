import { useEffect, useState } from "react";
import "./pathTrail.css";

const PathTrail = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollProgress = scrollTop / docHeight;
          setProgress(scrollProgress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <svg className="path-trail" viewBox="0 0 200 2000" preserveAspectRatio="none">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#111111" />
          <stop offset="100%" stopColor="#FF204E" />
        </linearGradient>
      </defs>

      <path
        className="path-bg"
        d="M100,0 C150,300 50,600 100,900 C150,1200 50,1500 100,1800"
        stroke="#ddd"
        strokeWidth="8"
        fill="none"
      />

      <path
        className="path-fill"
        d="M100,0 C150,300 50,600 100,900 C150,1200 50,1500 100,1800"
        stroke="url(#gradient)"
        strokeWidth="8"
        fill="none"
        strokeDasharray="2000"
        strokeDashoffset={2000 - progress * 2000}
      />

    </svg>
  );
};

export default PathTrail;
