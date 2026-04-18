import { useState } from 'react'
import '../design/Navbar.css'

function Navbar({ logoSrc, brand = 'SORBETES', currentPage = '' }) {
  const [activeNav, setActiveNav] = useState(null)

  const resolvedActiveNav = activeNav ?? currentPage

  const navigateTo = (search, { replace = false } = {}) => {
    if (replace) {
      window.history.replaceState({}, '', search)
    } else {
      window.history.pushState({}, '', search)
    }

    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const goToHome = (event) => {
    event.preventDefault()
    setActiveNav('home')
    navigateTo('?page=home')
  }

  const goToAuth = () => {
    navigateTo('?page=auth')
  }

  const goToOurStory = (event) => {
    event.preventDefault()
    setActiveNav('our-story')
    navigateTo('?page=our-story')
  }

  const goToServices = (event) => {
    event.preventDefault()
    setActiveNav('services')
    navigateTo('?page=services')
  }

  const goToGuide = (event) => {
    event.preventDefault()
    setActiveNav('guide')
    navigateTo('?page=guide')
  }

  const goToFabricPrintGuide = (event) => {
    event.preventDefault()
    setActiveNav('guide')
    navigateTo('?page=fabric-print-guide')
  }

  const goToPortfolio = (event) => {
    event.preventDefault()
    setActiveNav('services')

    if (currentPage === 'services') {
      navigateTo('?page=services&section=portfolio', { replace: true })
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }

    navigateTo('?page=services&section=portfolio')
  }

  return (
    <header className="hp-header">
      <a className="hp-header-left" href="?page=home" onClick={goToHome} aria-label="Go to homepage">
        <img className="hp-logo-circle" src={logoSrc} alt="" />
        <span className="hp-brand">{brand}</span>
      </a>

      <nav className="hp-header-center" aria-label="Primary">
        <a
          className={resolvedActiveNav === 'our-story' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
          href="?page=our-story"
          onClick={goToOurStory}
        >
          Our Story
        </a>

        <div className="hp-nav-dropdown">
          <button
            type="button"
            className={
              resolvedActiveNav === 'services'
                ? 'hp-nav-link hp-nav-button hp-nav-selected'
                : 'hp-nav-link hp-nav-button'
            }
            onClick={goToServices}
          >
            Services <span className="hp-nav-caret" aria-hidden="true" />
          </button>

          <div className="hp-nav-dropdown-menu" aria-label="Services menu">
            <a className="hp-nav-dropdown-link hp-nav-dropdown-link-active" href="?page=services" onClick={goToServices}>
              Our Services
            </a>
            <a className="hp-nav-dropdown-link" href="?page=services&section=portfolio" onClick={goToPortfolio}>
              Portfolio
            </a>
          </div>
        </div>

        <div className="hp-nav-dropdown">
          <button
            type="button"
            className={
              resolvedActiveNav === 'guide' ? 'hp-nav-link hp-nav-button hp-nav-selected' : 'hp-nav-link hp-nav-button'
            }
            onClick={goToGuide}
          >
            Guide <span className="hp-nav-caret" aria-hidden="true" />
          </button>

          <div className="hp-nav-dropdown-menu" aria-label="Guide menu">
            <a className="hp-nav-dropdown-link hp-nav-dropdown-link-active" href="?page=guide" onClick={goToGuide}>
              How to Order
            </a>
            <a
              className="hp-nav-dropdown-link"
              href="?page=fabric-print-guide"
              onClick={goToFabricPrintGuide}
            >
              Fabric Print Guide
            </a>
          </div>
        </div>

        <a
          className={resolvedActiveNav === 'founders-club' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
          href="#founders-club"
          onClick={() => setActiveNav('founders-club')}
        >
          Founder&apos;s Club
        </a>
        <a
          className={resolvedActiveNav === 'reviews' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
          href="#reviews"
          onClick={() => setActiveNav('reviews')}
        >
          Reviews
        </a>
        <a
          className={resolvedActiveNav === 'get-in-touch' ? 'hp-nav-link hp-nav-selected' : 'hp-nav-link'}
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

