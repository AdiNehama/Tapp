import { useEffect, useState, useRef } from 'react';
import './scratchDemo.css';

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
  const sparkleCount = 20;
  return (
    <div className="sparkles-container">
      {Array.from({ length: sparkleCount }).map((_, i) => (
        <SparkleStar key={`star-${i}`} />
      ))}
    </div>
  );
};

interface Point {
  x: number;
  y: number;
}

export function ScratchCard({ setShowImageOverlay }: { setShowImageOverlay: (value: boolean) => void }) {
  const [isScratched, setIsScratched] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasStartedScratching, setHasStartedScratching] = useState(false);
  const [showCollect, setShowCollect] = useState(false);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const scratchPercentage = useRef(0);
  const isScratching = useRef(false);
  const lastPoint = useRef<Point | null>(null);
  const hasInitialized = useRef(false);

  const prizeImages = [
    '/images/prize-1.png',
    '/images/prize-2.png',
    '/images/prize-3.png',
    '/images/prize-4.png',
    '/images/prize-5.png',
    '/images/prize-6.png',
    '/images/prize-7.png',
    '/images/prize-8.png',
    '/images/prize-9.png',
    '/images/prize-10.png',
    '/images/prize-11.png',
    '/images/prize-12.png'
  ];

  const randomPrizeImage = useRef(prizeImages[Math.floor(Math.random() * prizeImages.length)]);

  const getPosition = (event: React.TouchEvent | React.MouseEvent): Point => {
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  useEffect(() => {
    if (!overlayRef.current || hasInitialized.current) return;

    const canvas = overlayRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    
    // Load and draw the scratch overlay image
    const scratchImage = new Image();
    scratchImage.src = '/images/scratch-image.png';
    scratchImage.onload = () => {
      ctx.drawImage(scratchImage, 0, 0, canvas.width, canvas.height);
      hasInitialized.current = true;
    };
  }, []);

  const scratch = (point: Point) => {
    if (!overlayRef.current || isRevealed) return;

    const ctx = overlayRef.current.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();

    if (lastPoint.current) {
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(point.x, point.y);
      ctx.lineWidth = 40;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    lastPoint.current = point;

    // Calculate scratch percentage
    const imageData = ctx.getImageData(0, 0, overlayRef.current.width, overlayRef.current.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] === 0) {
        transparentPixels++;
      }
    }

    scratchPercentage.current = (transparentPixels / (pixels.length / 4)) * 100;

    if (scratchPercentage.current > 80 && !isScratched) {
      setIsScratched(true);
      setShowCollect(true);
    }
  };

  const handleStart = (event: React.TouchEvent | React.MouseEvent) => {
    event.preventDefault();
    isScratching.current = true;
    setHasStartedScratching(true);
    const point = getPosition(event);
    lastPoint.current = point;
    scratch(point);
  };

  const handleMove = (event: React.TouchEvent | React.MouseEvent) => {
    event.preventDefault();
    if (!isScratching.current) return;
    const point = getPosition(event);
    scratch(point);
  };

  const handleEnd = () => {
    isScratching.current = false;
    lastPoint.current = null;
  };

  const collectPrize = () => {
    setIsRevealed(true);
    setShowCollect(false);
    setShowImageOverlay(true);
  };

  return (
    <div className="scratch-card">
      <div className="scratch-background" />
      <SparklesBackground/>
      
      {/* The prize content is always there but only visible after scratching */}
      <div className="scratch-content">
        <span className="prize-amount">
          <img src={randomPrizeImage.current} alt="Prize" />
        </span>
      </div>

      {/* This is the scratch overlay - it stays until collection */}
      {!isRevealed && (
        <canvas
          ref={overlayRef}
          className="scratch-overlay"
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      )}

      {/* Initial scratch instruction that disappears once scratching starts */}
      {!hasStartedScratching && !isScratched && !isRevealed && (
        <div className="scratch-text">
          <img src="/images/scratch-button.png" alt="Scratch here" />
        </div>
      )}

      {showCollect && (
        <>
          <div className="overlay" />
          <div className="collect-container">
            <img
              src="/images/collect-button.png"
              alt="Collect"
              className="control-button collect"
              onClick={collectPrize}
            />
            <div className="won-prize">
              <img
                src={randomPrizeImage.current}
                alt="Won Prize"
                className="won-prize-icon"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}