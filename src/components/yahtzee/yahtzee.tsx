import { useState, useEffect } from "react";
import { WidgetSlider2 } from "../yahtzee/widgetSlider2";
import {
  ChevronRight,
  MessageCircle,
  Package,
  Sliders,
  TrendingUp,
  Plug,
} from "lucide-react";
import "../../pages/homePage/home.css";
import { AnimatedSection } from "../../components/animate";

function Home() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
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
                <img src="/images/tapplogo1.png" alt="Tapp Logo" />
              </div>
            </nav>
          </div>
        </header>
      </AnimatedSection>

      <AnimatedSection variant="slide">
        <section className="widget-showcase">
          <div className="container">
            <div className="showcase-content">
              {isMobile ? (
                <>
                  <div className="headline-container">
                    <h3 className="h3-static">
                      Bring Your Game to the Home Screen.
                    </h3>
                    <h4 className="h4-static">
                      Always Visible. Always Played.
                    </h4>
                  </div>
                  <WidgetSlider2 />
                </>
              ) : (
                <>
                  <div className="headline-container">
                    <h3 className="h3-static">
                      Bring Your Game to the Home Screen
                    </h3>
                    <h4 className="h4-static">
                      Always Visible. Always Played.
                    </h4>
                    <p className="description">
                      our widget gallery{" "}
                      <ChevronRight className="arrow-icon" size={20} />
                    </p>
                  </div>

                  <WidgetSlider2 />
                </>
              )}
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection variant="bounce">
           <section className="benefits">
             <div className="container">
               <h2 className="section-title">Why Tapp?</h2>
               <div className="features-wrapper">
     <div className="feature-card">
       <div className="icon-wrapper pink">
         <TrendingUp className="icon" />
       </div>
       <h3 className="feature-heading">Higher Retention</h3>
       <p className="feature-text">
         Widgets of your game draw players in, reducing churn and
         increasing lifetime value
       </p>
     </div>
   
     <div className="feature-card">
       <div className="icon-wrapper indigo">
         <Plug className="icon" />
       </div>
       <h3 className="feature-heading">Seamless Integration</h3>
       <p className="feature-text">
         Our plug-and-play SDK integrates in minutes.<br />
         No-code web platform that gives you full control to launch and manage campaigns without a developer
       </p>
     </div>
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
                <Sliders className="benefit-icon red" />
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
    </div>
  );
}

export default Home;
