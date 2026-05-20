import { useState } from 'react'
import { FaCopyright, FaEnvelope, FaFacebookF, FaInstagram, FaPhone, FaTiktok } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import '../design/Footer.css'
import PolicyModal from './PolicyModal.jsx'

const SOCIAL_LINKS = [
  {
    href: 'https://www.facebook.com/SorbetesApparel',
    label: 'Facebook',
    className: 'hp-footer-social-link',
    icon: FaFacebookF,
  },
  {
    href: 'https://www.instagram.com/sorbetesapparelstudio/',
    label: 'Instagram',
    className: 'hp-footer-social-link',
    icon: FaInstagram,
  },
  {
    href: 'https://www.tiktok.com/@sorbetesapparelstudio.ph',
    label: 'TikTok',
    className: 'hp-footer-social-link',
    icon: FaTiktok,
  },
]

function Footer({ logoSrc }) {
  const [policyOpen, setPolicyOpen] = useState(false)

  return (
    <>
      <footer id="get-in-touch" className="hp-footer" aria-label="Footer">
        <div className="hp-footer-main">
        <div className="hp-footer-brand">
          <div className="hp-footer-brand-row">
            <img className="hp-footer-logo" src={logoSrc} alt="Sorbetes Logo" />
            <span className="hp-footer-brand-text">SORBETES</span>
          </div>
          <p className="hp-footer-location">Quezon City, Philippines</p>
        </div>

        <div className="hp-footer-section hp-footer-contact">
          <h3 className="hp-footer-heading">Contact us</h3>
          <ul className="hp-footer-contact-list">
            <li>
              <span className="hp-footer-icon-circle" aria-hidden="true">
                <FaLocationDot />
              </span>
              <span>117 Mother Ignacia Ave., Quezon City, Philippines</span>
            </li>
            <li>
              <span className="hp-footer-icon-circle" aria-hidden="true">
                <FaEnvelope />
              </span>
              <a href="mailto:sales@alphacentauri.ph">sales@alphacentauri.ph</a>
            </li>
            <li>
              <span className="hp-footer-icon-circle" aria-hidden="true">
                <FaPhone />
              </span>
              <a href="tel:+639614427409">0961 442 7409</a>
            </li>
          </ul>
        </div>

        <div className="hp-footer-section hp-footer-hours">
          <h3 className="hp-footer-heading">Business Hours</h3>
          <p>Mon-Sat: 9:00AM-5:00PM</p>
          <p>Sunday: Closed</p>
        </div>

        <div className="hp-footer-section hp-footer-follow">
          <h3 className="hp-footer-heading">Follow us</h3>
          <div className="hp-footer-social-row">
            {SOCIAL_LINKS.map(({ href, label, className, icon: Icon }) => (
              <a
                key={label}
                className={className}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open Sorbetes on ${label}`}
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        </div>

        <div className="hp-footer-divider" role="presentation" />

        <div className="hp-footer-bottom">
          <p className="hp-footer-copyright">
            <FaCopyright className="hp-footer-copyright-icon" aria-hidden="true" />
            <span>2002-2025 Sorbetes. All rights reserved.</span>
          </p>
          <button type="button" className="hp-footer-legal-link" onClick={() => setPolicyOpen(true)}>
            Privacy Policy &amp; Terms and Conditions
          </button>
        </div>
      </footer>
      {policyOpen ? <PolicyModal onClose={() => setPolicyOpen(false)} /> : null}
    </>
  )
}

export default Footer
