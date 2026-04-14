import '../design/Footer.css'

function Footer({ logoSrc }) {
  return (
    <footer className="hp-footer" aria-label="Footer">
      <div className="hp-footer-divider" aria-hidden="true" />

      <div className="hp-footer-brand">
        <div className="hp-footer-brand-row">
          <img className="hp-footer-logo" src={logoSrc} alt="" />
          <div className="hp-footer-brand-text">SORBETES</div>
        </div>
        <div className="hp-footer-location">Quezon City, Philippines</div>
      </div>

      <div className="hp-footer-contact">
        <div className="hp-footer-heading">Contact us</div>
        <div className="hp-footer-item">117 Mother Ignacia Ave., Quezon City, Philippines</div>
        <div className="hp-footer-item">sales@alphacentauri.ph</div>
        <div className="hp-footer-item">0961 442 7409</div>
      </div>

      <div className="hp-footer-hours">
        <div className="hp-footer-heading">Business Hours</div>
        <div className="hp-footer-item">Mon-Sat: 9:00AM-5:00PM</div>
        <div className="hp-footer-item">Sunday: Closed</div>
      </div>

      <div className="hp-footer-follow">
        <div className="hp-footer-heading">Follow us</div>
        <div className="hp-footer-social-row" aria-label="Social links">
          <a
            className="hp-footer-social hp-footer-social-facebook"
            href="https://www.facebook.com/SorbetesApparel"
            target="_blank"
            rel="noreferrer"
            aria-label="Facebook"
          />
          <a
            className="hp-footer-social hp-footer-social-instagram"
            href="https://www.instagram.com/sorbetesapparelstudio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          />
          <a
            className="hp-footer-social hp-footer-social-tiktok"
            href="https://www.tiktok.com/@sorbetesapparelstudio.ph"
            target="_blank"
            rel="noreferrer"
            aria-label="TikTok"
          />
        </div>
      </div>

      <div className="hp-footer-copy">
        <span className="hp-footer-copy-text">2002-2025 Sorbetes. All rights reserved.</span>
      </div>

      <div className="hp-footer-privacy" aria-label="Privacy and Terms">
        <a className="hp-footer-privacy-link" href="#">
          Privacy Policy
        </a>
        <span className="hp-footer-privacy-sep" aria-hidden="true">
          {' '}
          &amp;{' '}
        </span>
        <a className="hp-footer-privacy-link" href="#">
          Terms and Conditions
        </a>
      </div>
    </footer>
  )
}

export default Footer

