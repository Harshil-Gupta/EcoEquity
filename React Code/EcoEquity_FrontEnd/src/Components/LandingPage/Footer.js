import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css'; // We'll create this stylesheet

function Footer() {
  return (
    <footer className="footer">
      <div className="social-icons">
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="#" className="icon">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
