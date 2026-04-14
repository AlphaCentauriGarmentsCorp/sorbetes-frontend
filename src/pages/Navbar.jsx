import { useState } from 'react'
import '../design/Navbar.css'

function Navbar({ logoSrc, brand = 'SORBETES' }) {
  const [activeNav, setActiveNav] = useState(null)
  const goToAuth = () => {
    window.location.search = '?page=auth'
  }

  return (
    <header className="hp-header">
      <div className="hp-header-left">
        <img className="hp-logo-circle" src={logoSrc} alt="" />
        <span className="hp-brand">{brand}</span>
      </div>

      <nav className="hp-header-center" aria-label="Primary">
        <a
          className={activeNav === 'our-story' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
          href="#our-story"
          onClick={() => setActiveNav('our-story')}
        >
          Our Story
        </a>

        <button
          type="button"
          className={activeNav === 'services' ? 'hp-nav-link hp-nav-button hp-nav-selected' : 'hp-nav-link hp-nav-button'}
          onClick={() => setActiveNav('services')}
        >
          Services <span className="hp-nav-caret" aria-hidden="true" />
        </button>

        <button
          type="button"
          className={activeNav === 'guide' ? 'hp-nav-link hp-nav-button hp-nav-selected' : 'hp-nav-link hp-nav-button'}
          onClick={() => setActiveNav('guide')}
        >
          Guide <span className="hp-nav-caret" aria-hidden="true" />
        </button>

        <a
          className={activeNav === 'founders-club' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
          href="#founders-club"
          onClick={() => setActiveNav('founders-club')}
        >
          Founder&apos;s Club
        </a>
        <a
          className={activeNav === 'reviews' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
          href="#reviews"
          onClick={() => setActiveNav('reviews')}
        >
          Reviews
        </a>
        <a
          className={activeNav === 'get-in-touch' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
          href="#get-in-touch"
          onClick={() => setActiveNav('get-in-touch')}
        >
          Get in Touch
        </a>
      </nav>

      <div className="hp-header-right">
        <button type="button" className="hp-login-btn" onClick={goToAuth}>
          Log in
        </button>
        <button type="button" className="hp-pricing-btn">
          Pricing
        </button>
      </div>
    </header>
  )
}

export default Navbar

