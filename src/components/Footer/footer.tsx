import React, { useState, useEffect, useRef } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./footer.css";
import emailjs from "emailjs-com";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    agreeToMailingList: false,
  });

  const [error, setError] = useState("");
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    // Function to get responsive grid configuration
    const getGridConfig = (width: number) => {
      if (width < 480) {
        // Mobile
        return {
          cols: 6,
          rows: 8,
          baseSize: 16,
          sizeVariation: 4,
        };
      } else if (width < 768) {
        // Tablet
        return {
          cols: 8,
          rows: 10,
          baseSize: 18,
          sizeVariation: 6,
        };
      } else {
        // Desktop
        return {
          cols: 13,
          rows: 10,
          baseSize: 20,
          sizeVariation: 8,
        };
      }
    };

    // Get initial configuration
    const footerRect = footer.getBoundingClientRect();
    let gridConfig = getGridConfig(footerRect.width);
    const escapeRadius = Math.min(150, footerRect.width * 0.2); // Responsive escape radius
    const escapeSpeed = 5;

    const logos: Array<{
      element: HTMLImageElement;
      originalX: number;
      originalY: number;
      currentX: number;
      currentY: number;
      velocityX: number;
      velocityY: number;
      size: number;
    }> = [];

    // Function to create and position logos
    const createLogos = () => {
      // Remove existing logos
      logos.forEach((logo) => logo.element.remove());
      logos.length = 0;

      const totalWidth = footer.clientWidth;
      const totalHeight = footer.clientHeight;

      // Recalculate grid configuration based on current width
      gridConfig = getGridConfig(totalWidth);

      const cellWidth = totalWidth / gridConfig.cols;
      const cellHeight = totalHeight / gridConfig.rows;

      // Create grid positions
      const positions: Array<{ x: number; y: number; size: number }> = [];

      for (let row = 0; row < gridConfig.rows; row++) {
        for (let col = 0; col < gridConfig.cols; col++) {
          const baseX = col * cellWidth;
          const baseY = row * cellHeight;

          const x = baseX + Math.random() * cellWidth;
          const y = baseY + Math.random() * cellHeight;

          const size =
            gridConfig.baseSize + Math.random() * gridConfig.sizeVariation;

          if (x < totalWidth && y < totalHeight) {
            positions.push({ x, y, size });
          }
        }
      }

      // Shuffle and create logos
      positions
        .sort(() => Math.random() - 0.5)
        .forEach((position) => {
          const img = document.createElement("img");
          img.src = "/images/piclogo1.svg";
          img.style.position = "absolute";
          img.style.width = `${position.size}px`;
          img.style.height = `${position.size}px`;
          img.style.opacity = (Math.random() + 0.2).toString();
          img.style.pointerEvents = "none";
          img.style.transition = "transform 0.3s ease-out";

          const x = Math.max(
            0,
            Math.min(position.x, totalWidth - position.size)
          );
          const y = Math.max(
            0,
            Math.min(position.y, totalHeight - position.size)
          );

          img.style.left = `${x}px`;
          img.style.top = `${y}px`;
          footer.appendChild(img);

          logos.push({
            element: img,
            originalX: x,
            originalY: y,
            currentX: x,
            currentY: y,
            velocityX: 0,
            velocityY: 0,
            size: position.size,
          });
        });
    };

    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId: number;
    let resizeTimeout: NodeJS.Timeout;

    const updateLogoPositions = () => {
      const currentFooterRect = footer.getBoundingClientRect();

      logos.forEach((logo) => {
        const relativeMouseX = mouseX - currentFooterRect.left;
        const relativeMouseY = mouseY - currentFooterRect.top;

        const dx = relativeMouseX - (logo.currentX + logo.size / 2);
        const dy = relativeMouseY - (logo.currentY + logo.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < escapeRadius) {
          const angle = Math.atan2(dy, dx);
          const force = Math.pow((escapeRadius - distance) / escapeRadius, 2);

          logo.velocityX -= Math.cos(angle) * force * escapeSpeed;
          logo.velocityY -= Math.sin(angle) * force * escapeSpeed;
        }

        const springForce = 0.02;
        const dampening = 0.95;

        logo.velocityX += (logo.originalX - logo.currentX) * springForce;
        logo.velocityY += (logo.originalY - logo.currentY) * springForce;
        logo.velocityX *= dampening;
        logo.velocityY *= dampening;

        logo.currentX += logo.velocityX;
        logo.currentY += logo.velocityY;

        const padding = 5;
        logo.currentX = Math.max(
          padding,
          Math.min(logo.currentX, currentFooterRect.width - logo.size - padding)
        );
        logo.currentY = Math.max(
          padding,
          Math.min(
            logo.currentY,
            currentFooterRect.height - logo.size - padding
          )
        );

        logo.element.style.left = `${logo.currentX}px`;
        logo.element.style.top = `${logo.currentY}px`;

        const rotation =
          Math.atan2(logo.velocityY, logo.velocityX) * (180 / Math.PI);
        const rotationDamped =
          rotation *
          Math.min(
            1,
            Math.sqrt(
              logo.velocityX * logo.velocityX + logo.velocityY * logo.velocityY
            ) / 5
          );
        logo.element.style.transform = `rotate(${rotationDamped}deg)`;
      });

      animationFrameId = requestAnimationFrame(updateLogoPositions);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        createLogos();
      }, 150);
    };

    // Initial creation
    createLogos();

    // Event listeners
    footer.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    animationFrameId = requestAnimationFrame(updateLogoPositions);

    return () => {
      footer.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resizeTimeout);
      logos.forEach((logo) => logo.element.remove());
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (!formData.agreeToMailingList) {
    //   setError("You must agree to join the mailing list.");
    //   return;
    // }

    setError("");

    emailjs
      .send(
        "service_v7z25x8",
        "template_oaxumfr",
        formData,
        "HtFFe7u9CfbsTxN5w"
      )
      .then(
        () => {
          alert("Your demo request was sent successfully!");
          setFormData({
            name: "",
            email: "",
            agreeToMailingList: false,
          });
        },
        (error) => {
          alert("Error: " + error.text);
        }
      );
  };

  return (
    <footer className="footer-container">
      <div className="footer-content" ref={footerRef}>
        <div className="footer-headline">
          <h2 className="footer-top-title">Book a Demo</h2>
          <h3 className="footer-title">
            Ensure your game is always visible, always played.
          </h3>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="checkbox-container">
              <input
                type="checkbox"
                name="agreeToMailingList"
                checked={formData.agreeToMailingList}
                onChange={handleChange}
                
              />
              <label className="termsAccepted"    
              >
                I want to receive your newsletter
              </label>
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>

        <div className="contact-form-bottom">
          <div className="info-container">
            <div className="info-item">
              <FaMapMarkerAlt />
              <span>Tel-Aviv</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Tapp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
