import { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import '../design/Portfolio.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import reeferLogo from '../assets/reefer-logo.png'
import kushLogo from '../assets/kush-logo.png'
import linyaLogo from '../assets/linya.jpg'
import dailyGrindLogo from '../assets/daily grind.jpg'
import teamMnlLogo from '../assets/teammnl.jpg'
import reeferImage from '../assets/reefer.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const PORTFOLIO_BASE_WIDTH = 1920
const PORTFOLIO_BASE_HEIGHT = 3262

const featuredBrands = [
  { src: kushLogo, alt: 'KUSH' },
  { src: linyaLogo, alt: 'Linya Linya' },
  { src: dailyGrindLogo, alt: 'Daily Grind' },
  { src: teamMnlLogo, alt: 'Team MNL' },
]

function getPortfolioScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / PORTFOLIO_BASE_WIDTH, 0.18), 1)
}

function Portfolio() {
  const [pageScale, setPageScale] = useState(() => getPortfolioScale())

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getPortfolioScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToHome = () => {
    window.history.pushState({}, '', '?page=home')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const goToCollection = () => {
    window.history.pushState({}, '', '?page=portfolio-archive')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  return (
    <div className="portfolio-shell">
      <div
        className="portfolio-scale-frame"
        style={{
          width: `${PORTFOLIO_BASE_WIDTH * pageScale}px`,
          height: `${PORTFOLIO_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="portfolio-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <div className="portfolio-page">
            <div className="portfolio-ellipse portfolio-ellipse-right" aria-hidden="true" />
            <div className="portfolio-ellipse portfolio-ellipse-left" aria-hidden="true" />

            <Navbar logoSrc={logoCircleImg} currentPage="services" />

            <button type="button" className="portfolio-back-button" aria-label="Back to homepage" onClick={goToHome}>
              <IoChevronBack className="portfolio-back-icon" aria-hidden="true" />
            </button>

            <section className="portfolio-hero">
              <div className="portfolio-title-block">
                <h1 className="portfolio-title">Portfolio</h1>
                <div className="portfolio-title-line" aria-hidden="true" />
              </div>

              <div className="portfolio-intro-card">
                <p className="portfolio-intro-text">
                  A showcase of apparel projects we&apos;ve brought to life, highlighting the quality, detail, and
                  production standards that define Sorbetes Apparel Studio. From fabric selection to final printing and
                  finishing, each project demonstrates the care, precision, and expertise we apply to every garment we
                  produce.
                </p>
              </div>
            </section>

            <section className="portfolio-featured-brands" aria-label="Featured brands">
              <p className="portfolio-featured-label">Featuring works from:</p>

              <div className="portfolio-brand-marquee">
                <div className="portfolio-brand-track">
                  <div className="portfolio-brand-segment">
                    {featuredBrands.map((brand) => (
                      <div key={brand.alt} className="portfolio-brand-card">
                        <img src={brand.src} alt={brand.alt} className="portfolio-brand-image" />
                      </div>
                    ))}
                  </div>

                  <div className="portfolio-brand-segment" aria-hidden="true">
                    {featuredBrands.map((brand) => (
                      <div key={`${brand.alt}-clone`} className="portfolio-brand-card">
                        <img src={brand.src} alt="" className="portfolio-brand-image" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="portfolio-collab">
              <div className="portfolio-collab-header">
                <h2 className="portfolio-collab-title">Collaborative Threads</h2>
                <p className="portfolio-collab-text">
                  Explore our full range of crafted pieces, from bold T-shirts to cozy hoodies, designed to elevate
                  your everyday style. Every item reflects the quality, detail, and creativity that define Sorbetes.
                </p>
              </div>

              <div className="portfolio-showcase-card">
                <div className="portfolio-showcase-copy">
                  <div className="portfolio-showcase-copy-stack">
                    <h3 className="portfolio-showcase-title">Sorbetes Archive</h3>
                    <p className="portfolio-showcase-description">
                      Crafted with care and attention to detail, every T-shirt, hoodie, and piece embodies the Sorbetes
                      standard of style and quality
                    </p>
                  </div>

                  <button type="button" className="portfolio-outline-button" onClick={goToCollection}>
                    View Collection
                  </button>
                </div>

                <div className="portfolio-showcase-media">
                  <div className="portfolio-showcase-layer portfolio-showcase-layer-1" aria-hidden="true" />
                  <div className="portfolio-showcase-layer portfolio-showcase-layer-2" aria-hidden="true" />
                  <div className="portfolio-showcase-layer portfolio-showcase-layer-3" aria-hidden="true" />
                  <div className="portfolio-showcase-layer portfolio-showcase-layer-4" aria-hidden="true" />
                  <div className="portfolio-showcase-image-frame">
                    <img src={reeferImage} alt="Reefer oversized T-shirt" className="portfolio-showcase-image" />
                  </div>
                  <img src={reeferLogo} alt="" className="portfolio-showcase-badge" />
                  <div className="portfolio-showcase-meta">
                    <h4>Reefer</h4>
                    <p>Silkscreen Printed Oversized T-shirt</p>
                  </div>
                </div>
              </div>

              <div className="portfolio-cta">
                <p className="portfolio-cta-text">Ready to create your own custom apparel? Let&apos;s make it happen</p>
                <button type="button" className="portfolio-cta-button">
                  AVAIL NOW
                </button>
              </div>
            </section>

            <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio
