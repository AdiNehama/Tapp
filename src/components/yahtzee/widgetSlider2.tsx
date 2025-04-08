import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PhoneMockup2 } from "../yahtzee/phone2";
import { WheelWidget4 } from "../WheelWidget4/wheelWidget4";
import { ScratchCard2 } from "../scratchWidget2/scratchDemo2";

import "../widgetSlider/widgetSlider.css";

const widgets = [
  {
    id: 4,
    name: "Prize Wheel",
    component: ({
      setShowImageOverlay,
    }: {
      showImageOverlay: boolean;
      setShowImageOverlay: (value: boolean) => void;
    }) => <WheelWidget4 setShowImageOverlay={setShowImageOverlay} />,
    description: "Engage users with a daily spin wheel widget",
  },
  {
    id: 4,
    name: "Scratch Card",
    component: ({
      setShowImageOverlay,
    }: {
      showImageOverlay: boolean;
      setShowImageOverlay: (value: boolean) => void;
    }) => <ScratchCard2 setShowImageOverlay={setShowImageOverlay} />,
    description: "Engage users with a daily Scratch Card widget",
  },
];

export function WidgetSlider2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add resize listener to detect mobile view
  useState(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  useEffect(() => {
    if (showImageOverlay) {
      const timer = setTimeout(() => {
        paginate(1);
        setShowImageOverlay(false); // מאפס את הערך כדי למנוע דילוגים נוספים
      }, 2000); // 3 שניות

      return () => clearTimeout(timer); // מבטל את ה-Timer אם הקומפוננטה מתעדכנת לפני הזמן
    }
  }, [showImageOverlay]);
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? (isMobile ? 500 : 1000) : isMobile ? -500 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? (isMobile ? 500 : 1000) : isMobile ? -500 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setShowImageOverlay(false); // Reset overlay when changing slides
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = widgets.length - 1;
      if (nextIndex >= widgets.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setShowImageOverlay(false); // Reset overlay when clicking dots
    setCurrentIndex(index);
  };

  const CurrentWidget = widgets[currentIndex].component;

  return (
    <div className="widget-slider">
      <div className="slider-content">
        <button className="nav-button prev" onClick={() => paginate(-1)}>
          <ChevronLeft className="arror" size={isMobile ? 20 : 34} />
        </button>

        <div className="slider-container">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="slider-slide"
            >
              <PhoneMockup2
                showImageOverlay={showImageOverlay}
                paginate={paginate}
              >
                <CurrentWidget
                  showImageOverlay={showImageOverlay}
                  setShowImageOverlay={setShowImageOverlay}
                />
              </PhoneMockup2>
            </motion.div>
          </AnimatePresence>
        </div>

        <button className="nav-button next" onClick={() => paginate(1)}>
          <ChevronRight className="arror" size={isMobile ? 20 : 34} />
        </button>
      </div>

      <div className="widget-info">
        <h3>{widgets[currentIndex].name}</h3>
        <p>{widgets[currentIndex].description}</p>
      </div>

      <div className="slider-dots">
        {widgets.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
