import  { useRef } from 'react';
import { WidgetSlider } from '../src/components/widgetSlider/widgetSlider';
import { ArrowRight, Sparkles, RefreshCcw, Zap, BarChart3, Gamepad2, Rocket, TrendingUp, Layers } from 'lucide-react';import './App.css';
import Footer from "../src/components/Footer/footer";
import {AnimatedSection} from "./components/animate"
import PathTrail from "../src/components/pathTrail/pathTrail"
function App() {
  const footerRef = useRef<HTMLDivElement>(null);
  
  const scrollToFooter = () => {
    if (footerRef.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              <p>Keep players engaged beyond the app and drive them back into the game with powerful widgets. </p>
{/*              
              <button className="hero-cta" onClick={scrollToFooter}>
                Get Your Own Widget Today <ArrowRight size={20} />
              </button> */}
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
          </div>
        </div>
      </section>
      </AnimatedSection>


      {/* How It Works Section */}
      <AnimatedSection>

      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works?</h2>
          <div className="steps-grid">
            <div className="step-card">
              <Gamepad2 className="step-icon" />
              <h3>Talk to Us & Define Your Use Case              </h3>
              <p>Share your game’s needs, and we’ll tailor the perfect widget strategy for you.</p>
            </div>
            <div className="step-card">
              <Sparkles className="step-icon" />
              <h3>Get a Ready-to-Use SDK</h3>
              <p>We provide a fully developed SDK with your use case built-in—plug & play integration in minutes.</p>
            </div>
            <div className="step-card">
              <Rocket className="step-icon" />
              <h3>Manage Everything Remotely</h3>
              <p>Control your widgets through our no-code web platform—adjust campaigns anytime without developer effort.</p>
            </div>
               
            <button className="request-button" onClick={scrollToFooter}>
                Request My Free Widget Demo <ArrowRight size={20} />
              </button>
          </div>
        </div>
      </section>
      </AnimatedSection>


      {/* Benefits Section */}
      <AnimatedSection>

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
      </AnimatedSection>


      {/* Floating CTA Button */}
      <button className="floating-cta" onClick={scrollToFooter}>
        <span>Get Your Free Demo </span>
      </button>

      <div ref={footerRef}></div>
      <Footer />
    </div>
  );
}

export default App;