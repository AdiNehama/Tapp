import React, { useState } from "react";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    console.log(`Changed: ${name} => ${value}`); // 🔍 בדיקת לוג

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agreeToMailingList) {
      setError("You must agree to join the mailing list.");
      return;
    }

    setError("");

    emailjs
      .send(
        "service_0ezklhs",
        "template_7v3kndh",
        formData,
        "Fkfih5ZdG7TdHdueW"
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
      <div className="footer-content">
        <div className="footer-headline">
          <h2 className="footer-top-title">Book a Demo</h2>
          <h3 className="footer-title">
            Ensure your game is always visible, always played.{" "}
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
                required
              />
              <label htmlFor="termsAccepted">
                I want to receive your newsletter
              </label>
            </div>

            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Book a Demo{" "}
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
