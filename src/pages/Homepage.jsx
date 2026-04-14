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
import testimonialPortrait from '../assets/bam.jpg'
import kushLogo from '../assets/kush-logo.png'
import linyaLogo from '../assets/linya.jpg'
import dailyGrindLogo from '../assets/daily grind.jpg'
import teamMnlLogo from '../assets/teammnl.jpg'
import foundersCircleLogo from '../assets/Logo Sorbetes.jpg'
import testimonialQuoteMarks from '../assets/testimonial-quote-marks.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useEffect, useState } from 'react'
import { FaAward, FaLocationDot, FaPen, FaStar, FaUserGroup, FaUsers } from 'react-icons/fa6'
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import { MdHandshake } from 'react-icons/md'

const HOMEPAGE_BASE_WIDTH = 1920
const HOMEPAGE_BASE_HEIGHT = 9800

function getHomepageScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / HOMEPAGE_BASE_WIDTH, 0.18), 1)
}

function Homepage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [pageScale, setPageScale] = useState(() => getHomepageScale())

  const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7]
  const trustedBrands = [
    { src: kushLogo, alt: 'KUSH' },
    { src: linyaLogo, alt: 'Linya Linya' },
    { src: dailyGrindLogo, alt: 'Daily Grind' },
    { src: teamMnlLogo, alt: 'Team MNL' },
  ]

  useEffect(() => {
    const id = window.setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length)
    }, 3000)

    return () => window.clearInterval(id)
  }, [heroImages.length])

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getHomepageScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="homepage-shell">
      <div
        className="homepage-scale-frame"
        style={{
          width: `${HOMEPAGE_BASE_WIDTH * pageScale}px`,
          height: `${HOMEPAGE_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="homepage-scale-content" style={{ transform: `scale(${pageScale})` }}>
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

      {/* Testimonial / Founders Club (Group 831) */}
      <section className="hp-testimonial" aria-label="Client testimonial">
        <div className="hp-t-bg" aria-hidden="true" />

        <div className="hp-t-quote-mark" aria-hidden="true">
          <img className="hp-t-quote-img" src={testimonialQuoteMarks} alt="" />
        </div>

        <div className="hp-t-founders-visual" aria-hidden="true">
          <div className="hp-t-founders-stack">
            <div className="hp-t-founders-card">
              <div className="hp-t-founders-badge">
                <img className="hp-t-founders-badge-img" src={foundersCircleLogo} alt="" />
              </div>
              <span className="hp-t-founders-line hp-t-founders-the">THE</span>
              <span className="hp-t-founders-line hp-t-founders-founders">FOUNDERS</span>
              <span className="hp-t-founders-line hp-t-founders-club">CLUB</span>
            </div>
          </div>
        </div>

        <div className="hp-t-kush-logo">
          <img className="hp-t-kush-img" src={kushLogo} alt="KUSH" />
        </div>

        <div className="hp-t-frame">
          <p className="hp-t-body">
            Every so often a new company comes along and completely shifts an entire industry. Sorbetes did it for
            KUSH Co. and other local brand apparels SORBETES STUDIO helped us grow with its high quality prints using
            their advance technologies and outstanding services.
          </p>
          <div className="hp-t-highlight">
            <p className="hp-t-highlight-text">
              This manufacturing company officially receives the highest praise from KUSH CO.
            </p>
          </div>
        </div>

        <div className="hp-t-author">
          <div className="hp-t-author-text">
            <div className="hp-t-author-name">Bam Santiago</div>
            <div className="hp-t-author-role">Founder, KUSH CO.</div>
          </div>
          <div className="hp-t-author-social" aria-label="Social links">
            <a
              className="hp-t-social hp-t-social-fb"
              href="https://www.facebook.com/SorbetesApparel"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            />
            <a
              className="hp-t-social hp-t-social-ig"
              href="https://www.instagram.com/sorbetesapparelstudio/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            />
          </div>
        </div>

        <img className="hp-t-portrait" src={testimonialPortrait} alt="Bam Santiago, Founder of KUSH CO." />

        <button type="button" className="hp-t-nav hp-t-nav-prev" aria-label="Previous testimonial">
          <span className="hp-t-nav-icon" aria-hidden="true" />
        </button>
        <button type="button" className="hp-t-nav hp-t-nav-next" aria-label="Next testimonial">
          <span className="hp-t-nav-icon" aria-hidden="true" />
        </button>
      </section>

      {/* Services showcase */}
      <section className="hp-services-showcase" aria-label="Our services">
        <div className="hp-services-showcase-header">
          <div className="hp-services-top-line" />
          <h2 className="hp-services-title">OUR SERVICES</h2>
        </div>

        <div className="hp-services-showcase-intro">
          <h3 className="hp-services-heading">Concept to Production</h3>
          <p className="hp-services-intro-copy">
            Everything you need to bring your apparel ideas to life, thoughtfully crafted through expert production,
            precision detailing, and a seamless end-to-end process.
          </p>
        </div>

        <div className="hp-services-list">
          <article className="hp-service-row hp-service-row-right">
            <div className="hp-service-copy">
              <h4 className="hp-service-title">Custom Clothing Production</h4>
              <p className="hp-service-text">
                Bring your ideas to life with fully customized apparel tailored to your vision. From fabrics to
                finishes, we help you design and produce pieces that represent your brand&apos;s style.
              </p>
            </div>
            <div className="hp-service-media hp-service-placeholder">
              <div className="hp-service-watch">
                <span className="hp-service-watch-icon" aria-hidden="true" />
                <span className="hp-service-watch-text">Watch Video</span>
              </div>
              <span className="hp-service-placeholder-label">Image Placeholder</span>
            </div>
          </article>

          <article className="hp-service-row hp-service-row-left">
            <div className="hp-service-media hp-service-placeholder">
              <div className="hp-service-watch">
                <span className="hp-service-watch-icon" aria-hidden="true" />
                <span className="hp-service-watch-text">Watch Video</span>
              </div>
              <span className="hp-service-placeholder-label">Image Placeholder</span>
            </div>
            <div className="hp-service-copy hp-service-copy-right">
              <h4 className="hp-service-title">Shirt + Print Packages</h4>
              <p className="hp-service-text">
                Pair quality shirts with full customization and scaled production options. From style selection to
                print execution, we help you build ready-to-sell pieces for your brand or store.
              </p>
            </div>
          </article>

          <article className="hp-service-row hp-service-row-right">
            <div className="hp-service-copy">
              <h4 className="hp-service-title">Printing Services</h4>
              <p className="hp-service-text">
                We offer high-quality printing using durable ink and proven techniques like silkscreen printing, direct
                transfer, color details, and long-lasting prints on every garment.
              </p>
            </div>
            <div className="hp-service-media hp-service-placeholder">
              <div className="hp-service-watch">
                <span className="hp-service-watch-icon" aria-hidden="true" />
                <span className="hp-service-watch-text">Watch Video</span>
              </div>
              <span className="hp-service-placeholder-label">Image Placeholder</span>
            </div>
          </article>

          <article className="hp-service-row hp-service-row-left">
            <div className="hp-service-media hp-service-placeholder">
              <div className="hp-service-watch">
                <span className="hp-service-watch-icon" aria-hidden="true" />
                <span className="hp-service-watch-text">Watch Video</span>
              </div>
              <span className="hp-service-placeholder-label">Image Placeholder</span>
            </div>
            <div className="hp-service-copy hp-service-copy-right">
              <h4 className="hp-service-title">Cut &amp; Sew Garment Making</h4>
              <p className="hp-service-text">
                From fabric selection to final packaging, we handle the entire production process. This end-to-end
                service is ideal for brands looking for custom-made apparel from concept to completion.
              </p>
            </div>
          </article>

          <article className="hp-service-row hp-service-row-right">
            <div className="hp-service-copy">
              <h4 className="hp-service-title">Ready-Made Items</h4>
              <p className="hp-service-text">
                Choose from our collection of ready-made apparel, including shirts, hoodies, jackets, socks, shorts,
                and more, ready to print, brand, and merchandize.
              </p>
            </div>
            <div className="hp-service-media hp-service-placeholder">
              <div className="hp-service-watch">
                <span className="hp-service-watch-icon" aria-hidden="true" />
                <span className="hp-service-watch-text">Watch Video</span>
              </div>
              <span className="hp-service-placeholder-label">Image Placeholder</span>
            </div>
          </article>
        </div>

        <button type="button" className="hp-services-avail-button">
          AVAIL NOW
        </button>
      </section>

      {/* Why Choose Us */}
      <section className="hp-why" aria-label="Why choose us">
        <div className="hp-why-header-row">
          <h3 className="hp-why-title">Why Choose us?</h3>
          <p className="hp-why-subtitle">
            Decades of experience, uncompromising quality, and trust you can rely on, crafted to deliver exceptional
            results you can be proud of.
          </p>
        </div>

        <div className="hp-why-list">
          <article className="hp-why-item">
            <div className="hp-why-left-card">
              <div className="hp-why-left-inner">
                <span className="hp-why-icon hp-why-icon-star" aria-hidden="true">
                  <FaStar className="hp-why-icon-svg hp-why-icon-svg-star" />
                </span>
                <h4 className="hp-why-item-title">Established Experience</h4>
              </div>
            </div>
            <div className="hp-why-right-card">
              <p className="hp-why-item-text">
                Operating since 2002, we bring years of industry knowledge and hands-on expertise to every project.
              </p>
            </div>
          </article>

          <article className="hp-why-item">
            <div className="hp-why-left-card">
              <div className="hp-why-left-inner">
                <span className="hp-why-icon hp-why-icon-handshake" aria-hidden="true">
                  <MdHandshake className="hp-why-icon-svg hp-why-icon-svg-handshake" />
                </span>
                <h4 className="hp-why-item-title">Trusted by Brands</h4>
              </div>
            </div>
            <div className="hp-why-right-card">
              <p className="hp-why-item-text hp-why-item-text-double">
                We have worked with respected local and national brands who continue to choose us for our reliability
                and results.
              </p>
            </div>
          </article>

          <article className="hp-why-item">
            <div className="hp-why-left-card">
              <div className="hp-why-left-inner">
                <span className="hp-why-icon hp-why-icon-medal" aria-hidden="true">
                  <FaAward className="hp-why-icon-svg hp-why-icon-svg-medal" />
                </span>
                <h4 className="hp-why-item-title">Quality-Driven</h4>
              </div>
            </div>
            <div className="hp-why-right-card">
              <p className="hp-why-item-text">
                Every project is handled with attention to detail and a commitment to high standards.
              </p>
            </div>
          </article>

          <article className="hp-why-item">
            <div className="hp-why-left-card">
              <div className="hp-why-left-inner">
                <span className="hp-why-icon hp-why-icon-ph" aria-hidden="true">
                  <FaLocationDot className="hp-why-icon-svg hp-why-icon-svg-ph" />
                </span>
                <h4 className="hp-why-item-title">Local Expertise</h4>
              </div>
            </div>
            <div className="hp-why-right-card">
              <p className="hp-why-item-text">
                Based in Quezon City, we understand the local market while delivering professional-level service.
              </p>
            </div>
          </article>

          <article className="hp-why-item">
            <div className="hp-why-left-card">
              <div className="hp-why-left-inner">
                <span className="hp-why-icon hp-why-icon-people" aria-hidden="true">
                  <FaUsers className="hp-why-icon-svg hp-why-icon-svg-people" />
                </span>
                <h4 className="hp-why-item-title">Client-Focused Approach</h4>
              </div>
            </div>
            <div className="hp-why-right-card">
              <p className="hp-why-item-text">
                We value long-term partnerships and treat every project as a collaborative effort.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Request a Quote */}
      <section className="hp-quote" aria-label="Request a quote">
        <div className="hp-quote-header">
          <h3 className="hp-quote-title">Let&apos;s bring your projects to life</h3>
          <p className="hp-quote-subtitle">Receive a detailed quote with no commitment.</p>
        </div>

        <div className="hp-quote-options">
          <article className="hp-quote-card">
            <div className="hp-quote-card-inner">
              <div className="hp-quote-icon-wrap" aria-hidden="true">
                <FaUserGroup className="hp-quote-icon" />
              </div>
              <h4 className="hp-quote-card-title">Guided Walkthrough</h4>
              <p className="hp-quote-card-text">
                Follow our guided walkthrough to help you choose the right options step by step.
              </p>
            </div>
          </article>

          <article className="hp-quote-card">
            <div className="hp-quote-card-inner">
              <div className="hp-quote-icon-wrap" aria-hidden="true">
                <FaPen className="hp-quote-icon" />
              </div>
              <h4 className="hp-quote-card-title">Fill Form Directly</h4>
              <p className="hp-quote-card-text">
                Fill out the order form directly and proceed to pricing with your preferred garment and production
                specifications.
              </p>
            </div>
          </article>
        </div>

        <button type="button" className="hp-quote-button">
          Request a Quote
        </button>
      </section>

      {/* Trusted by Brands (top only for now) */}
      <section className="hp-trusted">
        <h2 className="hp-trusted-title">Trusted by Brands</h2>
        <p className="hp-trusted-subtitle">Built on credibility and results.</p>
        <div className="hp-trusted-marquee" aria-label="Trusted brand logos">
          <div className="hp-trusted-marquee-track">
            <div className="hp-trusted-marquee-segment">
              {trustedBrands.map((brand) => (
                <div key={brand.alt} className="hp-trusted-brand-card">
                  <img className="hp-trusted-brand-image" src={brand.src} alt={brand.alt} />
                </div>
              ))}
            </div>
            <div className="hp-trusted-marquee-segment" aria-hidden="true">
              {trustedBrands.map((brand) => (
                <div key={`${brand.alt}-duplicate`} className="hp-trusted-brand-card">
                  <img className="hp-trusted-brand-image" src={brand.src} alt="" />
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="hp-trusted-caption">...and the list goes on</p>
      </section>

      <section className="hp-follow" aria-label="Follow us">
        <div className="hp-follow-header">
          <h2 className="hp-follow-title">Follow us</h2>
          <p className="hp-follow-subtitle">See what we&apos;ve been working on.</p>
        </div>

        <div className="hp-follow-icons">
          <a
            className="hp-follow-circle hp-follow-circle-facebook"
            href="https://www.facebook.com/SorbetesApparel"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Sorbetes Apparel on Facebook"
          >
            <FaFacebookF className="hp-follow-icon hp-follow-icon-facebook" />
          </a>
          <a
            className="hp-follow-circle hp-follow-circle-instagram"
            href="https://www.instagram.com/sorbetesapparelstudio/"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Sorbetes Apparel Studio on Instagram"
          >
            <FaInstagram className="hp-follow-icon hp-follow-icon-instagram" />
          </a>
          <a
            className="hp-follow-circle hp-follow-circle-tiktok"
            href="https://www.tiktok.com/@sorbetesapparelstudio.ph"
            target="_blank"
            rel="noreferrer"
            aria-label="Open Sorbetes Apparel Studio on TikTok"
          >
            <FaTiktok className="hp-follow-icon hp-follow-icon-tiktok" />
          </a>
        </div>
      </section>

      <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage

