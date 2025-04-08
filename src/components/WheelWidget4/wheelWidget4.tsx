import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './wheelWidget4.css';

const prizes = Array.from({ length: 12 });
const SparkleStar = () => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const randomizePosition = () => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      setPosition({ top, left });
    };

    const interval = setInterval(randomizePosition, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="sparkle-star"
      style={{ top: `${position.top}%`, left: `${position.left}%` }}
    />
  );
};

const SparklesBackground = () => {
  const sparkleCount = 40;
  return (
    <div className="sparkles-container">
      {Array.from({ length: sparkleCount }).map((_, i) => (
        <SparkleStar key={`star-${i}`} />
      ))}
    </div>
  );
};



export function WheelWidget4({ setShowImageOverlay }: { setShowImageOverlay: (value: boolean) => void }) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showCollect, setShowCollect] = useState(false);
  const [isWheelStopped, setIsWheelStopped] = useState(false);
  const [wonPrizeIndex, setWonPrizeIndex] = useState<number | null>(null);
  const rotationRef = useRef(rotation);
  const [showSpinPointer, setShowSpinPointer] = useState(false);
  const [showCollectPointer, setShowCollectPointer] = useState(false);
  const hasCollectedRef = useRef(false);
  const hasSpunRef = useRef(false);

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  
  useEffect(() => {
    if (!hasSpunRef.current) {
      const timer = setTimeout(() => {
        setShowSpinPointer(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (showCollect && !hasCollectedRef.current) {
      const timer = setTimeout(() => {
        setShowCollectPointer(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showCollect]);


  useEffect(() => {
    if (isWheelStopped) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.1);
    }, 10);

    return () => clearInterval(interval);
  }, [isWheelStopped]);

  const spinWheel = () => {
    if (isSpinning) return;
    
    hasSpunRef.current = true;

    setShowSpinPointer(false);


    setIsSpinning(true);
    setShowCollect(false);
    setIsWheelStopped(true);

    const spins = 5;
    const randomPrize = Math.floor(Math.random() * prizes.length);
    const baseRotation = spins * 360;
    const prizeRotation = (360 / prizes.length) * randomPrize;
    const newRotation = rotationRef.current + baseRotation + prizeRotation;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);

      const normalizedRotation = newRotation % 360;
      const segmentSize = 360 / prizes.length;
      const topPrizeIndex = Math.floor(((normalizedRotation + 15) % 360) / segmentSize);
      const actualIndex = (prizes.length - topPrizeIndex) % prizes.length;

      setWonPrizeIndex(actualIndex);
      setShowCollect(true);
    }, 3000);
  };

  const collectPrize = () => {
    setShowCollectPointer(false);

    setIsWheelStopped(false);
    setShowCollect(false);
    setWonPrizeIndex(null);
    setShowImageOverlay(true); // כאן אנחנו מבקשים להציג את התמונה
  };

  return (
    <div className="wheel-container-yahtzee">
      <div className="wheel-background4" />
      <SparklesBackground />
      <motion.div
        className="wheel4"
        style={{ backgroundImage: 'url(/images/wheel4.webp)', rotate: rotation }}
        animate={{ rotate: rotation }}
        transition={{ duration: isSpinning ? 3 : 0 }}
      >
        {prizes.map((_, index) => (
          <div
            key={index}
            className="prize-segment-yahtzee"
            style={{
              transform: `rotate(${(360 / prizes.length) * index}deg)`,
            }}
          >
          
          </div>
        ))}
      </motion.div>
  
        
      {!showCollect && (
        <>
         <img
          src="/images/point.webp"
          className="point"
        />
        <img
          src="/images/spin-button4.webp"
          alt="Spin"
          className={`control-button spin4 ${isSpinning ? 'disabled' : ''}`}
          onClick={spinWheel}
        />
        {showSpinPointer && !isSpinning && (
          <div className="pointer-container-yahtzee">

          <img
            src="/images/finger.svg"
            alt="Click here"
            className="pointer-guide-yahtzee"
          />
          </div>

        )}
        </>
      )}

      
{showCollect && (
        <>
          <div className="overlay-yahtzee" />
          <div className="collect-container-yahtzee">
            <img
              src="/images/claim-button.webp"
              alt="Collect"
              className="control-button collect-yahtzee"
              onClick={collectPrize}
            />
            {wonPrizeIndex !== null && (
              <div className="won-prize-yahtzee">
                <img
                  src={`/images/prize-yahtzee.webp`}
                  alt={`Won Prize`}
                  className="won-prize-icon-yahtzee"
                />
              </div>
            )}
                 {showCollectPointer && (
                              <div className="collect-pointer-yahtzee">

              <img
              src="/images/finger.svg"
                alt="Click here"
                className="collect-pointer-guide-yahtzee"
              />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
