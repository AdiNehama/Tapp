import  { useRef } from 'react';
import { WidgetSlider } from '../src/components/widgetSlider/widgetSlider';
import { ArrowRight, Sparkles, RefreshCcw, Zap, BarChart3, CheckCircle2, Gamepad2, Rocket } from 'lucide-react';
import './App.css';
import Footer from "../src/components/Footer/footer";

function App() {
  const footerRef = useRef<HTMLDivElement>(null);
  
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app">
      {/* Hero Section */}
      <header className="hero">
        <div className="container">
          <nav className="nav">
            <div className="logo">Tapp</div>
            <button className="cta-button" onClick={scrollToFooter}>Request a Demo</button>
          </nav>
          <div className="hero-grid">
            <div className="hero-content">
              <h1>Transform Your Mobile Game with Interactive Home Screen Widgets!</h1>
              <p>
                Keep players engaged beyond the app and drive them back into the game with powerful widgets.
              </p>
             
              <button className="hero-cta" onClick={scrollToFooter}>
                Get Your Own Widget Today <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Widget Showcase Section */}
      <section className="widget-showcase">
        <div className="container">
          <h2 className="section-title">Our Widget Gallery</h2>
          <p className="section-description">Experience our interactive widgets in action</p>
          <div className="feature-list">
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Fully Interactive Demo – See widgets in action directly on the landing page</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Try It Yourself – Click on the widgets to experience how they work</span>
            </div>
            <div className="feature-item">
              <CheckCircle2 size={20} className="feature-icon" />
              <span>Compatible with All Mobile Games – Designed for Match-3, RPG, Strategy, and more</span>
            </div>
          </div>
          <WidgetSlider />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works?</h2>
          <div className="steps-grid">
            <div className="step-card">
              <Gamepad2 className="step-icon" />
              <h3>Step 1: Tell us about your game</h3>
              <p>We analyze your game mechanics and engagement loops to find the best widget opportunities.</p>
            </div>
            <div className="step-card">
              <Sparkles className="step-icon" />
              <h3>Step 2: We design and build a custom widget</h3>
              <p>Choose from pre-designed widgets or let us create one tailored to your game.</p>
            </div>
            <div className="step-card">
              <Rocket className="step-icon" />
              <h3>Step 3: Launch and boost retention</h3>
              <p>Your widget is ready to engage players and bring them back to your game seamlessly.</p>
            </div>
               
            <button className="request-button" onClick={scrollToFooter}>
                Request My Free Widget Demo <ArrowRight size={20} />
              </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Why Tapp?</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <BarChart3 className="benefit-icon purple" />
              <h3 className="benefit-title">Proven Results</h3>
              <p className="benefit-description">Proven to increase retention and engagement</p>
            </div>
            <div className="benefit-card">
              <Sparkles className="benefit-icon blue" />
              <h3 className="benefit-title">Custom Design</h3>
              <p className="benefit-description">Fully customized for your game</p>
            </div>
            <div className="benefit-card">
              <Zap className="benefit-icon pink" />
              <h3 className="benefit-title">Quick Launch</h3>
              <p className="benefit-description">Ready to deploy in just 48 hours</p>
            </div>
            <div className="benefit-card">
              <RefreshCcw className="benefit-icon indigo" />
              <h3 className="benefit-title">Easy Integration</h3>
              <p className="benefit-description">Seamless implementation with our SDK</p>
            </div>
          </div>
        </div>
      </section>

      <div ref={footerRef}></div>
      <Footer />
    </div>
  );
}

export default App;