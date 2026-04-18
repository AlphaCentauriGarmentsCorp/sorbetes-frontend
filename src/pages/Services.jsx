import { useEffect, useMemo, useState } from 'react'
import { FaAward, FaLocationDot, FaPlay, FaShirt, FaStar, FaUsers } from 'react-icons/fa6'
import { IoChevronBack } from 'react-icons/io5'
import { MdHandshake } from 'react-icons/md'
import '../design/Services.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import kushLogo from '../assets/kush-logo.png'
import linyaLogo from '../assets/linya.jpg'
import dailyGrindLogo from '../assets/daily grind.jpg'
import teamMnlLogo from '../assets/teammnl.jpg'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const SERVICES_BASE_WIDTH = 1920
const SERVICES_BASE_HEIGHT = 7901

const highlightCards = [
  { Icon: FaAward, label: '20+ Years of Experience' },
  { Icon: FaShirt, label: '500+ Brands Served' },
  { Icon: FaStar, label: 'Premium Quality Production' },
]

const serviceRows = [
  {
    title: 'Custom Clothing Production',
    description:
      'Bring your ideas to life with fully customized apparel tailored to your vision. From shirts to hoodies, we help you design and produce pieces that represent your brand or style.',
  },
  {
    title: 'Shirt + Print Packages',
    description:
      'Bring your ideas to life with fully customized apparel tailored to your vision. From shirts to hoodies, we help you design and produce pieces that represent your brand or style.',
    reverse: true,
  },
  {
    title: 'Printing Services',
    description:
      'We offer high-quality printing using durable inks and proven techniques like silkscreen printing. Expect vibrant colors, clean details, and long-lasting prints on every garment.',
  },
  {
    title: 'Cut & Sew Garment Making',
    description:
      'From fabric selection to final packaging, we handle the entire production process. This end-to-end service is ideal for brands looking for custom-made apparel from concept to completion.',
    reverse: true,
  },
  {
    title: 'Ready-Made Items',
    description:
      'Choose from our selection of ready-made apparel, including classic hoodies in various colors. Ideal for quick orders, reselling, or brand merchandise.',
  },
]

const whyChooseUs = [
  {
    Icon: FaStar,
    title: 'Established Experience',
    description: 'Operating since 2002, we bring years of industry knowledge and hands-on expertise to every project.',
    iconClass: 'services-why-icon-star',
  },
  {
    Icon: MdHandshake,
    title: 'Trusted by Brands',
    description: 'We have worked with respected local and national brands who continue to choose us for our reliability and results.',
    iconClass: 'services-why-icon-handshake',
  },
  {
    Icon: FaAward,
    title: 'Quality-Driven',
    description: 'Every project is handled with attention to detail and a commitment to high standards.',
    iconClass: 'services-why-icon-award',
  },
  {
    Icon: FaLocationDot,
    title: 'Local Expertise',
    description: 'Based in Quezon City, we understand the local market while delivering professional-level service.',
    iconClass: 'services-why-icon-location',
  },
  {
    Icon: FaUsers,
    title: 'Client-Focused Approach',
    description: 'We value long-term partnerships and treat every project as a collaborative effort.',
    iconClass: 'services-why-icon-users',
  },
]

const trustedBrands = [
  { src: kushLogo, alt: 'KUSH' },
  { src: linyaLogo, alt: 'Linya Linya' },
  { src: dailyGrindLogo, alt: 'Daily Grind' },
  { src: teamMnlLogo, alt: 'Team MNL' },
]

function getServicesScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / SERVICES_BASE_WIDTH, 0.18), 1)
}

function Services() {
  const [pageScale, setPageScale] = useState(() => getServicesScale())

  const marqueeBrands = useMemo(() => [...trustedBrands, ...trustedBrands], [])

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getServicesScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToHome = () => {
    window.history.pushState({}, '', '?page=home')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  return (
    <div className="services-shell">
      <div
        className="services-scale-frame"
        style={{
          width: `${SERVICES_BASE_WIDTH * pageScale}px`,
          height: `${SERVICES_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="services-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <div className="services-page">
            <div className="services-ellipse services-ellipse-right" aria-hidden="true" />
            <div className="services-ellipse services-ellipse-left" aria-hidden="true" />

            <Navbar logoSrc={logoCircleImg} currentPage="services" />

            <button type="button" className="services-back-button" aria-label="Back to homepage" onClick={goToHome}>
              <IoChevronBack className="services-back-icon" aria-hidden="true" />
            </button>

            <section className="services-hero">
              <div className="services-title-block">
                <h1 className="services-title">Our Services</h1>
                <div className="services-title-line" aria-hidden="true" />
              </div>

              <div className="services-intro-card">
                <p className="services-intro-text">
                  We offer a comprehensive and fully integrated suite of apparel production services designed to support
                  brands at every stage of their journey, from concept development and design to manufacturing, quality
                  control, and final delivery. Our end-to-end solutions ensure efficiency, consistency, and high-quality
                  results, helping businesses streamline their production process, enhance product value, and
                  successfully bring their vision to market.
                </p>
              </div>

              <div className="services-highlight-grid" aria-label="Service highlights">
                {highlightCards.map(({ Icon, label }) => (
                  <article key={label} className="services-highlight-card">
                    <div className="services-highlight-icon-wrap" aria-hidden="true">
                      <span className="services-highlight-icon-bg" />
                      <Icon className="services-highlight-icon" />
                    </div>
                    <p className="services-highlight-label">{label}</p>
                  </article>
                ))}
              </div>

              <div className="services-hero-banner" aria-label="Video placeholder">
                <div className="services-hero-placeholder" aria-hidden="true">
                  <span className="services-hero-placeholder-copy">Video Placeholder</span>
                </div>
                <button type="button" className="services-hero-play" aria-label="Play services video">
                  <FaPlay className="services-hero-play-icon" />
                </button>
              </div>
            </section>

            <section className="services-what-we-do">
              <div className="services-section-heading">
                <h2>What We Do</h2>
                <p>We offer a complete suite of apparel production services to support brands at every stage:</p>
              </div>

              <div className="services-row-list">
                {serviceRows.map((service) => (
                  <article
                    key={service.title}
                    className={service.reverse ? 'services-row services-row-reverse' : 'services-row'}
                  >
                    <div className={service.reverse ? 'services-row-copy services-row-copy-right' : 'services-row-copy'}>
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                    </div>

                    <div className="services-row-media">
                      <div className={service.reverse ? 'services-watch-tag services-watch-tag-left' : 'services-watch-tag'}>
                        <FaPlay className="services-watch-icon" aria-hidden="true" />
                        <span>Watch Video</span>
                      </div>
                      <div className="services-row-placeholder" aria-hidden="true">
                        <div className="services-row-placeholder-copy">Image Placeholder</div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="services-why">
              <div className="services-section-heading services-section-heading-tight">
                <h2>Why Choose Us?</h2>
                <p>Experience. Quality. Trust.</p>
              </div>

              <div className="services-why-list">
                {whyChooseUs.map(({ Icon, title, description, iconClass }) => (
                  <article key={title} className="services-why-item">
                    <div className="services-why-left-card">
                      <div className="services-why-left-inner">
                        <div className="services-why-icon-wrap">
                          <Icon className={`services-why-icon ${iconClass}`} aria-hidden="true" />
                        </div>
                        <h3>{title}</h3>
                      </div>
                    </div>

                    <div className="services-why-right-card">
                      <p>{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="portfolio" className="services-trusted">
              <div className="services-trusted-header">
                <h2 className="services-trusted-title">Trusted by Brands</h2>
                <p className="services-trusted-subtitle">
                  From rising labels to established names, we support brands at every stage.
                </p>
              </div>

              <div className="services-trusted-marquee" aria-label="Trusted brands marquee">
                <div className="services-trusted-marquee-track">
                  <div className="services-trusted-marquee-segment">
                    {marqueeBrands.map((brand, index) => (
                      <div key={`${brand.alt}-${index}`} className="services-brand-card">
                        <img className="services-brand-image" src={brand.src} alt={brand.alt} />
                      </div>
                    ))}
                  </div>

                  <div className="services-trusted-marquee-segment" aria-hidden="true">
                    {marqueeBrands.map((brand, index) => (
                      <div key={`${brand.alt}-clone-${index}`} className="services-brand-card">
                        <img className="services-brand-image" src={brand.src} alt="" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="services-trusted-more">...and the list goes on</p>

              <button type="button" className="services-avail-button">
                AVAIL NOW
              </button>
            </section>

            <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Services
