import '../design/Homepage.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import hero1 from '../assets/Hero 1.jpg'
import hero2 from '../assets/Hero 2.jpg'
import hero3 from '../assets/Hero 3.jpg'
import hero4 from '../assets/Hero 4.jpg'
import hero5 from '../assets/Hero 5.jpg'
import hero6 from '../assets/Hero 6.jpg'
import hero7 from '../assets/Hero 7.jpg'
import wLogo from '../assets/w_logo.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useEffect, useState } from 'react'

// CSS import above ensures the stylesheet is bundled by Vite.

// Note: This page is built from the provided Figma CSS reference.
// Some background images referenced in the design are not present in `src/assets`,
// so placeholders are used where necessary.
function Homepage() {
  const [heroIndex, setHeroIndex] = useState(0)

  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7]

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)

    return () => window.clearInterval(id)
  }, [heroImages.length])

  return (
    <div className="homepage-page">
      {/* Decorative ellipses */}
      <div className="hp-ellipse hp-ellipse-107" aria-hidden="true" />
      <div className="hp-ellipse hp-ellipse-104" aria-hidden="true" />
      <div className="hp-ellipse hp-ellipse-105" aria-hidden="true" />
      <div className="hp-ellipse hp-ellipse-106" aria-hidden="true" />

      <Navbar logoSrc={logoCircleImg} />

      {/* Hero */}
      <section className="hp-hero">
        <div className="hp-hero-frame">
          <div className="hp-hero-coin-wrap">
            <img className="hp-hero-coin" src={wLogo} alt="" />
          </div>

          <div className="hp-hero-copy">
            <h1 className="hp-hero-title">Start your own</h1>
            <h1 className="hp-hero-title hp-hero-title-2">Clothing Line</h1>
            <p className="hp-hero-subtitle">
              From concept to production, we help emerging and established brands turn apparel ideas into
              thoughtfully crafted, market-ready collections that stand out.
            </p>

            <div className="hp-hero-cta-row">
              <button type="button" className="hp-cta hp-cta-primary">
                EXPLORE MORE
              </button>
              <button type="button" className="hp-cta hp-cta-outline">
                AVAIL NOW
              </button>
            </div>

            <div className="hp-hero-divider" aria-hidden="true" />

            <div className="hp-hero-stats" aria-label="Highlights">
              <div className="hp-hero-stat">
                <span className="hp-hero-stat-icon hp-hero-stat-icon-medal" aria-hidden="true" />
                <span className="hp-hero-stat-text">20+ Years of Experience</span>
              </div>
              <div className="hp-hero-stat">
                <span className="hp-hero-stat-icon hp-hero-stat-icon-shirt" aria-hidden="true" />
                <span className="hp-hero-stat-text">500+ Brands Served</span>
              </div>
              <div className="hp-hero-stat">
                <span className="hp-hero-stat-icon hp-hero-stat-icon-star" aria-hidden="true" />
                <span className="hp-hero-stat-text">Premium Quality Production</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hp-hero-image-wrap">
          <div className="hp-hero-stack hp-hero-stack-1" aria-hidden="true" />
          <div className="hp-hero-stack hp-hero-stack-2" aria-hidden="true" />
          <div className="hp-hero-stack hp-hero-stack-3" aria-hidden="true" />

          <img key={heroIndex} className="hp-hero-image" src={heroImages[heroIndex]} alt={`Hero ${heroIndex + 1}`} />
          <div className="hp-hero-image-shadow" aria-hidden="true" />

          <div className="hp-hero-vertical-dots" role="tablist" aria-label="Hero images">
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={idx === heroIndex ? 'hp-dot hp-dot-active' : 'hp-dot'}
                aria-label={`Show hero ${idx + 1}`}
                aria-selected={idx === heroIndex}
                onClick={() => setHeroIndex(idx)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Services heading */}
      <section className="hp-services">
        <div className="hp-services-top-line" />
        <h2 className="hp-services-title">OUR SERVICES</h2>
      </section>

      {/* Next section: Concept to Production */}
      <section className="hp-concept">
        <h3 className="hp-concept-title">Concept to Production</h3>
        <p className="hp-concept-subtitle">
          Everything you need to bring your apparel ideas to life, thoughtfully crafted through expert production,
          precision detailing, and a seamless end-to-end process.
        </p>
      </section>

      {/* Trusted by Brands (top only for now) */}
      <section className="hp-trusted">
        <h2 className="hp-trusted-title">Trusted by Brands</h2>
        <p className="hp-trusted-subtitle">Built on credibility and results.</p>
      </section>

      <Footer logoSrc={wLogo} />
    </div>
  )
}

export default Homepage

