import { ReactNode, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './phone.css';

interface PhoneMockupProps {
  children: ReactNode;
  showImageOverlay?: boolean;
}

const preloadImages = () => {
  const imageUrls = [
    '/images/animals.webp',
    '/images/phone-bg.webp',
    '/images/apple-clock.svg',
    '/images/apple-mail.svg',
    '/images/apple-phone.svg',
    '/images/apple-camera.svg',
    '/images/apple-store.svg',
    '/images/background.webp', 
    '/images/backgroundScratch.webp',
    '/images/scratch-image.webp',
    '/images/collect-button.webp',
    '/images/finger.svg',
     '/images/scratch-button.webp',
    ...Array.from({ length: 12 }).map((_, i) => `/images/prize-${i + 1}.webp`),
    '/images/background.webp', 
      '/images/wheel.webp',
      '/images/spin-button.webp',
      '/images/background3.webp', 
      '/images/wheel3.webp',
      '/images/spin-button3.webp',
  ];

  imageUrls.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

export function PhoneMockup({ children, showImageOverlay }: PhoneMockupProps) {

  useEffect(() => {
    preloadImages();
  }, []);

  return (
    <div className="phone-mockup">
      {/* Dynamic Island */}
      <div className="dynamic-island">
        <div className="dynamic-island-content">
          <div className="dynamic-island-camera" />
          <div className="dynamic-island-sensor" />
        </div>
      </div>

      {/* Side Buttons */}
      <div className="side-buttons">
        <div className="volume-up" />
        <div className="volume-down" />
        <div className="silent-switch" />
      </div>
      <div className="power-button" />

      {/* Screen Content */}
      <div className="phone-screen">
        <div className="phone-content">
          <div className="status-bar">
            <div className="status-bar-left">
              <span className="time">9:41</span>
            </div>
            <div className="status-bar-right">
              <div className="signal-bars" />
              <div className="battery">
                <div className="battery-num">87</div>
                <div className="battery-level"></div>
              </div>
            </div>
          </div>
          <div className="widget-container">
            {children}
            <div className="widget-label">Animals & Coins</div>

          </div>

          {/* App Icons */}
          <div className="app-icons">
            <div className="app-icon">
              <img src="/images/apple-phone.svg" alt="Phone" />
              <div className="icon-label">Phone</div>
            </div>
            <div className="app-icon">
              <img src="/images/apple-mail.svg" alt="Mail" />
              <div className="icon-label">Mail</div>
            </div>
            <div className="app-icon">
              <img src="/images/apple-clock.svg" alt="Clock" />
              <div className="icon-label">Clock</div>
            </div>
            <div className="app-icon">
              <img src="/images/apple-store.svg" alt="Store" />
              <div className="icon-label">App Store</div>
            </div>
            <div className="app-icon">
              <img src="/images/apple-camera.svg" alt="Camera" />
              <div className="icon-label">Camera</div>
            </div>
          </div>

          {/* Home Bar */}
          <div className="home-bar" />
             {/* Image Overlay */}
      <AnimatePresence>
        {showImageOverlay && (
          <motion.div
            className="image-overlay"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <motion.img
              src="/images/animals.webp"
              alt="Prize"
              className="overlay-image"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
        </div>
      </div>

   
  );
}
