import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import './wheelWidget3.css';

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



export function WheelWidget3({ setShowImageOverlay }: { setShowImageOverlay: (value: boolean) => void }) {
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
    <div className="wheel-container">
      <div className="wheel-background3" />
      <SparklesBackground />
      <motion.div
        className="wheel"
        style={{ backgroundImage: 'url(/images/wheel3.webp)', rotate: rotation }}
        animate={{ rotate: rotation }}
        transition={{ duration: isSpinning ? 3 : 0 }}
      >
        {prizes.map((_, index) => (
          <div
            key={index}
            className="prize-segment"
            style={{
              transform: `rotate(${(360 / prizes.length) * index}deg)`,
            }}
          >
            <img
              src={`/images/prize-${index + 1}.webp`}
              alt={`Prize ${index + 1}`}
              className="prize-icon"
            />
          </div>
        ))}
      </motion.div>

      {!showCollect && (
        <>
        <img
          src="/images/spin-button3.webp"
          alt="Spin"
          className={`control-button spin ${isSpinning ? 'disabled' : ''}`}
          onClick={spinWheel}
        />
        {showSpinPointer && !isSpinning && (
          <div className="pointer-container">

          <img
            src="/images/finger.webp"
            alt="Click here"
            className="pointer-guide"
          />
          </div>

        )}
        </>
      )}

      
{showCollect && (
        <>
          <div className="overlay" />
          <div className="collect-container">
            <img
              src="/images/collect-button.webp"
              alt="Collect"
              className="control-button collect"
              onClick={collectPrize}
            />
            {wonPrizeIndex !== null && (
              <div className="won-prize">
                <img
                  src={`/images/prize-${wonPrizeIndex + 1}.webp`}
                  alt={`Won Prize ${wonPrizeIndex + 1}`}
                  className="won-prize-icon"
                />
              </div>
            )}
                 {showCollectPointer && (
                              <div className="collect-pointer">

              <img
              src="/images/finger.webp"
                alt="Click here"
                className="collect-pointer-guide"
              />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
