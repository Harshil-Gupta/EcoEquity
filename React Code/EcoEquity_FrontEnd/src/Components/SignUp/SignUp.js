import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomNavbar from "../Navbar/CustomNavbar.js"

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
    agreeToTerms: false,
  });

  const [showTerms, setShowTerms] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8085/users/register";
      // Make an API POST request to your server for user registration
      const response = await axios.post(url, formData);

      // Check the response status and handle accordingly
      if (response.status === 200) {
        // Registration successful
        setSuccessMessage(response.data.message);
        setError(null);

        // Reset the form after successful submission
        setFormData({
          username: "",
          phone: "",
          email: "",
          password: "",
          agreeToTerms: false,
        });

        // Navigate to the login component when the form is valid
        navigate("/login");
      }
    } catch (error) {
      if (error.response.data.message == "username already exists") {
        setError("user name is already taken :(");
      } else if (error.response.data.message == "user email already exists") {
        setError("user email already registered with us");
      } else {
        setError("registratin failed");
      }
    }
  };

  const handleTermsClick = () => {
    setShowTerms(!showTerms);
  };

  return (
    <>
      <div className="FormContainer ">
        
        <div className="Container">
          <form onSubmit={handleSubmit} className="Form">
            <div className="FormTitleContainer">
              <div className="PaintStroke"></div>
              <div className="FormTitle">Registration</div>
            </div>

            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your 10 digits Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}" // This pattern enforces exactly 10 digits
              title="Please enter a 10-digit phone number"
            />

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address abc@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {/* Use a div to group the checkbox and label */}
            <div className="CheckboxContainer">
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  className="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  style={{ width: "22px", height: "22px", marginRight: "8px" }} // Add margin-right for space
                />
                <label htmlFor="agreeToTerms" className="CheckboxLabel">
                  I agree to the{" "}
                  <a
                    className="TermsLink"
                    onClick={handleTermsClick}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>

            <div>
              <button type="submit" style={{ padding: "11px" }}>
                Register
              </button>
            </div>
            {successMessage && (
              <p className="SuccessMessage">{successMessage}</p>
            )}
            {error && (
              <p className="ErrorMessage" style={{ color: "red" }}>
                {error}
              </p>
            )}
          </form>
        </div>
        {showTerms && (
          <div className="ModalBackdrop" onClick={handleTermsClick} style={{paddingTop:"100px"}}>
            <div className="Modal" onClick={(e) => e.stopPropagation()} >
              <button className="CloseButton" onClick={handleTermsClick} style={{paddingTop:"80px"}}>
                X
              </button>
              <div
                className="TermsText"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                <h1>Terms and Conditions</h1>

                <p>Effective Date: [13/10/2023]</p>

                <h2>1. Account Registration and Security</h2>
                <p>
                  1.1. To use the App, you must register for an account. You
                  agree to provide accurate and complete information during the
                  registration process.
                </p>
                <p>
                  1.2. You are responsible for maintaining the security and
                  confidentiality of your account credentials. You must
                  immediately notify us of any unauthorized access to or use of
                  your account.
                </p>

                <h2>2. Investment Services</h2>
                <p>
                  2.1. The App provides investment-related services, including
                  but not limited to [list key services]. These services are
                  subject to additional terms and conditions, which you must
                  review and accept before using them.
                </p>

                <h2>3. Risk Disclosure</h2>
                <p>
                  3.1. Investing involves risks, and past performance is not
                  indicative of future results. You acknowledge that you are
                  aware of and understand the risks associated with investments
                  and that you are solely responsible for your investment
                  decisions.
                </p>

                <h2>4. Privacy Policy</h2>
                <p>
                  4.1. Your use of the App is subject to our Privacy Policy,
                  which outlines how we collect, use, and disclose your personal
                  information. By using the App, you consent to the practices
                  described in the Privacy Policy.
                </p>

                <h2>5. User Conduct</h2>
                <p>
                  5.1. You agree to use the App in compliance with all
                  applicable laws and regulations. You must not:
                </p>
                <ul>
                  <li>Use the App for any unlawful or fraudulent purpose.</li>
                  <li>
                    Upload, post, or transmit any content that is harmful,
                    offensive, or violates the rights of others.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to the App or its
                    systems.
                  </li>
                </ul>

                <h2>6. Termination</h2>
                <p>
                  6.1. We reserve the right to terminate or suspend your access
                  to the App at our discretion, with or without notice, for any
                  reason, including if we believe you have violated these Terms.
                </p>

                <p>
                  This is a simplified representation of the terms and
                  conditions. For the complete and legally binding version,
                  please refer to the official document provided by [Your
                  Company Name].
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SignUp;
