import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './phone.css';

interface PhoneMockupProps {
  children: ReactNode;
  showImageOverlay?: boolean;
}

export function PhoneMockup({ children, showImageOverlay }: PhoneMockupProps) {
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
              <div className="signal-bars">
              </div>
          
              <div className="battery">
<div className="battery-num">87</div>  
                <div className="battery-level"></div>
              </div>
            </div>
          </div>
          <div className="widget-container">
            {children}
          </div>
          {/* Home Bar */}
          <div className="home-bar" />
        </div>  {/* Image Overlay */}
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
              src="/images/animals.svg"
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
  );
}