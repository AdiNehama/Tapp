import { useRef, useState, useEffect } from 'react';
import { WidgetSlider } from '../src/components/widgetSlider/widgetSlider';
import { Sparkles, Gamepad2, Rocket, TrendingUp, Layers } from 'lucide-react';
import './App.css';
import Footer from "../src/components/Footer/footer";
import { AnimatedSection } from "./components/animate";
import PathTrail from "../src/components/pathTrail/pathTrail";

function App() {
  const footerRef = useRef<HTMLDivElement>(null);
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 568);

  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerHeight = 200; // כמה פיקסלים מהחלק העליון לפני שהכפתור יופיע

      if (scrollY > triggerHeight) {
        setShowFloatingCTA(true);
      } else {
        setShowFloatingCTA(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 568);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    
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
              <button className="cta-button" onClick={scrollToFooter}>Request a Demo</button>
            </nav>
            <div className="hero-grid">
              <div className="hero-content">
                <h3>Bring Your Game to the Home Screen. Always Visible. Always Played.</h3>
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
            <p className="section-description">Explore real use cases from top studios and see how our widgets drive retention, increase sessions, and keep players coming back.</p>
            <div className="showcase-content">
              {isMobile ? (
                <>
                  <WidgetSlider />
                  <div className="feature-list">
                    <div className="feature-item">
                      <h3><TrendingUp size={22} /> Higher Retention, More Revenue</h3>        
                      <p>Personalized widgets keep players coming back daily—boosting sessions, reducing churn, and increasing lifetime value effortlessly.</p>
                    </div>
                    <div className="feature-item">
                      <h3><Layers size={22} /> Seamless Integration</h3>          
                      <p>Our plug-and-play SDK integrates in minutes, and the no-code web platform gives you full control—so you can launch and manage campaigns without a developer.</p>   
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="feature-list">
                    <div className="feature-item">
                      <h3><TrendingUp size={22} /> Higher Retention, More Revenue</h3>        
                      <p>Personalized widgets keep players coming back daily—boosting sessions, reducing churn, and increasing lifetime value effortlessly.</p>
                    </div>
                    <div className="feature-item">
                      <h3><Layers size={22} /> Seamless Integration</h3>          
                      <p>Our plug-and-play SDK integrates in minutes, and the no-code web platform gives you full control—so you can launch and manage campaigns without a developer.</p>   
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
            <h2 className="section-title">How It Works?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <Gamepad2 className="benefit-icon purple" />
                <h3 className="benefit-title">Talk to Us & Define Your Use Case</h3>
                <p className="benefit-description">Share your game's needs, and we'll tailor the perfect widget strategy for you.</p>
              </div>
              <div className="benefit-card">
                <Sparkles className="benefit-icon blue" />
                <h3 className="benefit-title">Get a Ready-to-Use SDK</h3>
                <p className="benefit-description">We provide a fully developed SDK with your use case built-in—plug & play integration in minutes.</p>
              </div>
              <div className="benefit-card">
                <Rocket className="benefit-icon pink" />
                <h3 className="benefit-title">Manage Everything Remotely</h3>
                <p className="benefit-description">Control your widgets through our no-code web platform—adjust campaigns anytime without developer effort.</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Floating CTA Button */}
      {showFloatingCTA && (
        <button className="floating-cta" onClick={scrollToFooter}>
          <span>Get Your Free Demo</span>
        </button>
      )}

      <div ref={footerRef}></div>
      <Footer />
    </div>
  );
}

export default App;