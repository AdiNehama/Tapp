import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./footer.css";
import emailjs from "emailjs-com";

const Footer: React.FC = () => {
  const [formData, setFormData] = useState({
    name:"",
    companyName: "",
    email: "",
    link:"",
    mobile:"",
    gameName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            name:"",
            companyName: "",
            email: "",
            link:"",
            mobile:"",
            gameName: "",
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
            Transform your app's engagement with interactive home screen widgets.
          </h3>
        </div>

        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
            <div className="form-field">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-field">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company Name"
                  value={formData.companyName}
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
              
              <div className="form-field">
                <input
                  type="text"
                  name="link"
                  placeholder="Website Link"
                  value={formData.link}
                  onChange={handleChange}
                  required
                />

              </div> 
              <div className="form-field">
                <input
                  type="text"
                  name="gameName"
                  placeholder="Game Name"
                  value={formData.gameName}
                  onChange={handleChange}
                  required
                />
              </div> 
                
              <div className="form-field">
                <input
                  type="text"
                  name="mobile"
                  placeholder="Ios/Android/Both"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div> 
            

            </div>

         
            <button type="submit" className="submit-button">
            Send a request, and we'll get back to you!</button>
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
