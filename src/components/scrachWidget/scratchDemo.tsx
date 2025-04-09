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
  const [showScratchPointer, setShowScratchPointer] = useState(false);
  const [showCollectPointer, setShowCollectPointer] = useState(false);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const scratchPercentage = useRef(0);
  const lastPoint = useRef<Point | null>(null);
  const hasInitialized = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const isAutoScratchingRef = useRef(false);
  
  // Show pointer 3 seconds after scratch button appears
  useEffect(() => {
    if (!hasStartedScratching && !isScratched && !isRevealed) {
      const timer = setTimeout(() => {
        setShowScratchPointer(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setShowScratchPointer(false);
    }
  }, [hasStartedScratching, isScratched, isRevealed]);

  // Show pointer 3 seconds after collect button appears
  useEffect(() => {
    if (showCollect) {
      const timer = setTimeout(() => {
        setShowCollectPointer(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setShowCollectPointer(false);
    }
  }, [showCollect]);

  const prizeImages = [
    '/images/prize-1.webp',
    '/images/prize-2.webp',
    '/images/prize-3.webp',
    '/images/prize-4.webp',
    '/images/prize-5.webp',
    '/images/prize-6.webp',
    '/images/prize-7.webp',
    '/images/prize-8.webp',
    '/images/prize-9.webp',
    '/images/prize-10.webp',
    '/images/prize-11.webp',
    '/images/prize-12.webp'
  ];

  const randomPrizeImage = useRef(prizeImages[Math.floor(Math.random() * prizeImages.length)]);

  useEffect(() => {
    const initializeCanvas = () => {
      if (!overlayRef.current || hasInitialized.current) return;

      const canvas = overlayRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas size based on parent element
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }

      // Load and draw the scratch overlay image
      const scratchImage = new Image();
      scratchImage.src = '/images/scratch-image.webp';
      scratchImage.onload = () => {
        if (ctx && canvas) {
          ctx.drawImage(scratchImage, 0, 0, canvas.width, canvas.height);
          hasInitialized.current = true;
        }
      };
    };

    // Initialize canvas when component mounts
    initializeCanvas();

    // Re-initialize on window resize
    const handleResize = () => {
      hasInitialized.current = false;
      initializeCanvas();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      ctx.lineWidth = 27;
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
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      isAutoScratchingRef.current = false;
    }
  };

  const collectPrize = () => {
    setIsRevealed(true);
    setShowCollect(false);
    setShowImageOverlay(true);
  };
  const generateZigzagPath = (canvasWidth: number, canvasHeight: number): Point[] => {
    const path: Point[] = [];
    const zigzagWidth = canvasWidth * 0.3; // רוחב הזיגזג
    const centerX = canvasWidth / 2;
    const stepY = canvasHeight / 17; // גודל כל קפיצה כלפי מטה
    const offsetY = canvasHeight * 0.2; // מוריד את המסלול כולו ב-20% מגובה הכרטיס
    const left = centerX - zigzagWidth / 2;
    const right = centerX + zigzagWidth / 2;
    let currentY = offsetY; // מתחילים נמוך יותר
  
    while (currentY < canvasHeight) {
      path.push({ x: left, y: currentY });
      currentY += stepY;
      path.push({ x: right, y: currentY });
      currentY += stepY;
    }
  
    return path;
  };
  
  
const startAutoScratch = () => {
  if (!overlayRef.current || isRevealed || isAutoScratchingRef.current) return;

  isAutoScratchingRef.current = true;
  setHasStartedScratching(true);

  const canvas = overlayRef.current;
  const pathPoints = generateZigzagPath(canvas.width, canvas.height);

  lastPoint.current = pathPoints[0];
  let currentPointIndex = 0;
  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  const smoothScratch = (from: Point, to: Point, duration: number) => {
    const startTime = performance.now();
  
    const animate = (time: number) => {
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1); // משתנה בין 0 ל־1
  
      const currentX = lerp(from.x, to.x, t);
      const currentY = lerp(from.y, to.y, t);
  
      scratch({ x: currentX, y: currentY });
  
      if (t < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
  
    animationFrameRef.current = requestAnimationFrame(animate);
  };
  
  const scratchNextPoint = () => {
    if (!isAutoScratchingRef.current || currentPointIndex >= pathPoints.length || isRevealed || scratchPercentage.current > 80) {
      if (scratchPercentage.current > 70 && !isScratched) {
        setIsScratched(true);
        setShowCollect(true);
      }
      isAutoScratchingRef.current = false;
      return;
    }
  
    if (currentPointIndex > 0) {
      smoothScratch(pathPoints[currentPointIndex - 1], pathPoints[currentPointIndex], 200);
    } else {
      scratch(pathPoints[currentPointIndex]);
    }
  
    currentPointIndex++;
  
    setTimeout(() => {
      animationFrameRef.current = requestAnimationFrame(scratchNextPoint);
    }, 230);
  };
  

  scratchNextPoint();
};

  

  const handleAutoScratch = () => {
    if (!hasInitialized.current) {
      // נחכה עד שהקנבס יאותחל
      const waitForInit = setInterval(() => {
        if (hasInitialized.current) {
          clearInterval(waitForInit);
          startAutoScratch();
        }
      }, 100);

      // ניקוי אחרי 3 שניות אם לא הצלחנו
      setTimeout(() => clearInterval(waitForInit), 3000);
    } else {
      startAutoScratch();
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      isAutoScratchingRef.current = false;
    };
  }, []);

  return (
    <div className="scratch-card">
      <div className="scratch-background" />
      <SparklesBackground/>
      
      <div className="scratch-content">
        <span className="prize-amount">
          <img src={randomPrizeImage.current} alt="Prize" />
        </span>
      </div>

      {!isRevealed && (
        <canvas
          ref={overlayRef}
          className="scratch-overlay"
        />
      )}

      {!hasStartedScratching && !isScratched && !isRevealed && (
        <div>
        <div 
          className="scratch-text" 
          onClick={handleAutoScratch}
          style={{ cursor: 'pointer' }}
        >
          <img src="/images/scratch-button.webp" alt="Scratch here" />
   
        </div>
               {showScratchPointer && (
                <div className='pointer-container'>
                <img 
                  src="/images/finger.webp" 
                  alt="Click here" 
                  className="pointer-guide-scratch"
                />
                 </div>
              )}
               </div>
      )}

      {showCollect && (
        <>
          <div className="overlay" />
          <div className="collect-container">
            <div className="collect-button-wrapper" style={{ position: 'relative' }}>
              <img
                src="/images/collect-button.webp"
                alt="Collect"
                className="control-button collect"
                onClick={collectPrize}
              />
          
            </div>
            <div className="won-prize">
              <img
                src={randomPrizeImage.current}
                alt="Won Prize"
                className="won-prize-icon"
              />
            </div>
                {showCollectPointer && (
                                              <div className="collect-pointer">

                <img 
                  src="/images/finger.webp" 
                  alt="Click here" 
                  className="collect-pointer-guide "
                />
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
}
