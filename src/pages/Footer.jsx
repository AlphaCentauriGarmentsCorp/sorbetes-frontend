import "../design/Footer.css";

function Footer({ logoSrc }) {
  return (
    <footer className="hp-footer">
      <div className="hp-footer-container">
        <div className="hp-footer-brand">
          <div className="hp-footer-brand-row">
            <img className="hp-footer-logo" src={logoSrc} alt="Sorbetes Logo" />
            <span className="hp-footer-brand-text">SORBETES</span>
          </div>
          <p className="hp-footer-location">Quezon City, Philippines</p>
        </div>

        <div className="hp-footer-section">
          <h3 className="hp-footer-heading">Contact us</h3>
          <p>117 Mother Ignacia Ave., Quezon City, Philippines</p>
          <p>sales@alphacentauri.ph</p>
          <p>0961 442 7409</p>
        </div>

        <div className="hp-footer-section">
          <h3 className="hp-footer-heading">Business Hours</h3>
          <p>Mon-Sat: 9:00AM-5:00PM</p>
          <p>Sunday: Closed</p>
        </div>

     
      </div>

      <div className="hp-footer-divider"></div>

      <div className="hp-footer-bottom">
        <p>2002-2025 Sorbetes. All rights reserved.</p>
        <div>
          <a href="#">Privacy Policy</a>
          <span> & </span>
          <a href="#">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;