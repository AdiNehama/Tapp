import './phone.css';
import { motion, AnimatePresence } from 'framer-motion';


import { ReactNode } from 'react';

interface PhoneMockupProps {
    children: ReactNode;
    showImageOverlay?: boolean;
  }
  export function PhoneMockup({ children, showImageOverlay }: PhoneMockupProps) {

  return (
    <div className="phone-mockup">
      <div className="phone-notch">
        <div className="phone-notch-indicator" />
      </div>
      <div className="phone-screen">
        <div className="phone-content">
          <div className="widget-container">
          {children}

          </div>
        </div>
      </div>

      {/* תצוגת התמונה על המסך */}
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
        src="/images/animals.png"
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
  );
}
