import { useRef, useState, useEffect } from "react";
import { WidgetSlider } from "../widgetSlider/widgetSlider";

import {
  MessageCircle,
  Package,
  Sliders,
  TrendingUp,
  Plug,
} from "lucide-react";
import "../../pages/homePage/home.css";
import Footer from "../Footer/footer";
import { AnimatedSection } from "../animate";
import PathTrail from "../pathTrail/pathTrail";

const preloadImages = () => {
  const imageUrls = [
    "/images/backgroundScratch.webp",
    "/images/scratch-image.webp",
    "/images/collect-button.webp",
    "/images/scratch-button.webp",
    "/images/background.webp",
    "/images/wheel.webp",
    "/images/spin-button.webp",
    "/images/background3.webp",
    "/images/wheel3.webp",
    "/images/spin-button3.webp",
    "/images/collect-button.webp",
    "/images/finger.svg",
    "/images/phone-bg.webp",
    "/images/apple-camera.svg",
    "/images/apple-store.svg",
    "/images/apple-phone.svg",
    "/images/apple-mail.svg",
    "/images/apple-clock.svg",
    ...Array.from({ length: 12 }).map((_, i) => `/images/prize-${i + 1}.webp`),
  ];

  imageUrls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

function Ecommerce() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    preloadImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 200; // Show button after scrolling 200px

      // Check if footer is in view to hide the button
      const footerInView =
        footerRef.current &&
        footerRef.current.getBoundingClientRect().top <= window.innerHeight;

      if (scrollY > triggerHeight && !footerInView) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <PathTrail />

      {/* Hero Section */}
      <AnimatedSection>
        <header className="hero">
          <div className="container">
            <nav className="nav">
              <div className="logo">
                <img src="/images/tapplogo.png" alt="Tapp Logo" />
              </div>
              <button className="cta-button" onClick={scrollToFooter}>
                Request a demo
              </button>
            </nav>
            <div className="hero-grid">
              <div className="hero-content">
                <h3>
                  Bring Your App to the Home Screen.
                  <br />
                  Always Visible. Always Engaged.
                </h3>
              </div>
            </div>
          </div>
        </header>
      </AnimatedSection>

      {/* Widget Showcase Section */}
      <AnimatedSection>
        <section className="widget-showcase">
          <div className="container">
            <h2 className="section-title">Our Widget Gallery</h2>
            <div className="showcase-content">
              {isMobile ? (
                <>
                  <WidgetSlider />
                  <div className="feature-list">
                    <div className="feature-item">
                      <h3>
                        <TrendingUp size={22} /> Higher Retention
                      </h3>
                      <p>
                        Widgets of your game draw players in, reducing churn and
                        increasing lifetime value.
                      </p>
                    </div>
                    <div className="feature-item">
                      <h3>
                        <Plug size={22} /> Seamless Integration
                      </h3>
                      <p>
                        Our plug-and-play SDK integrates in minutes. Our no-code
                        web platform gives you full control to launch and manage
                        campaigns without a developer.
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="feature-list">
                    <div className="feature-item">
                      <h3>
                        <TrendingUp size={22} /> Higher Retention
                      </h3>
                      <p>
                        Widgets of your game draw players in, reducing churn and
                        increasing lifetime value.
                      </p>
                    </div>
                    <div className="feature-item">
                      <h3>
                        <Plug size={22} /> Seamless Integration
                      </h3>
                      <p>
                        Our plug-and-play SDK integrates in minutes. Our no-code
                        web platform gives you full control to launch and manage
                        campaigns without a developer.
                      </p>
                    </div>
                  </div>
                  <WidgetSlider />
                </>
              )}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits Section */}
      <AnimatedSection>
        <section className="benefits">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <MessageCircle className="benefit-icon purple" />
                <h3 className="benefit-title">
                  Talk to Us & Define Your Use Case
                </h3>
                <p className="benefit-description">
                  Together, we'll select the optimal widgets for your game
                </p>
              </div>
              <div className="benefit-card">
                <Package className="benefit-icon blue" />
                <h3 className="benefit-title">Get a Plug-and-Play SDK</h3>
                <p className="benefit-description">
                  We develop a customized widget based on your use case
                </p>
              </div>
              <div className="benefit-card">
                <Sliders className="benefit-icon pink" />
                <h3 className="benefit-title">Manage Everything Remotely</h3>
                <p className="benefit-description">
                  Control your widgets through our no-code web platform, without
                  a developer
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <button className="floating-cta" onClick={scrollToFooter}>
          <span>Free demo</span>
        </button>
      )}

      {/* Footer */}
      <div ref={footerRef}></div>
      <Footer />
    </div>
  );
}

export default Ecommerce;
