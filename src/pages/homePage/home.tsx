import { useRef, useState, useEffect } from "react";
import { WidgetSlider } from "../../components/widgetSlider/widgetSlider";
import {
  MessageCircle,
  Package,
  Sliders,
  TrendingUp,
  Plug,
  Sparkles
} from "lucide-react";
import "./home.css";
import Footer from "../../components/Footer/footer";
import { AnimatedSection } from "../../components/animate";

function Home() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeHeadline, setActiveHeadline] = useState(0);

  const headlines = [
    "Bring Your Game to the Home Screen",
    "Always Visible. Always Played.",
    "Boost Retention with Live Widgets"
  ];

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const headlineInterval = setInterval(() => {
      setActiveHeadline((prev) => (prev + 1) % headlines.length);
    }, 4000);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 200;

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

    handleScroll();

    return () => {
      clearInterval(headlineInterval);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="home">
      <AnimatedSection variant="fade">
        <header className="hero">
          <div className="container">
            <nav className="nav">
              <div className="logo">
                <img src="/images/tapplogo.png" alt="Tapp Logo" />
              </div>
              <button className="cta-button" onClick={scrollToFooter}>
                <span className="cta-text">Request a demo</span>
                <span className="cta-icon"><Sparkles size={13} /></span>

              </button>
            </nav>
            <div className="hero-grid">
              <div className="hero-content">
                <div className="headline-container">
                  <div className="rotating-logo">
                    <img src="/images/piclogo.svg" alt="Rotating Logo" className={`logo-spin headline-${activeHeadline}`} />
                    
                  </div>
                  <div className="rotating-logo2">
                    <img src="/images/piclogo.svg" alt="Rotating Logo" className={`logo-spin headline-${activeHeadline}`} />
                    
                  </div>
                  <div className="headline-rotator">
                    {headlines.map((headline, index) => (
                      <h3
                        key={index}
                        className={`headline ${index === activeHeadline ? 'active' : ''}`}
                      >
                        {headline}
                      </h3>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </AnimatedSection>

      <AnimatedSection variant="slide">
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

      <AnimatedSection variant="bounce">
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

      {showFloatingCTA && (
        <button className="floating-cta" onClick={scrollToFooter}>
          <span>Free demo</span>
        </button>
      )}

      <div ref={footerRef}></div>
      <Footer />
    </div>
  );
}

export default Home;