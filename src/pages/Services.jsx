import { useEffect, useState } from 'react'
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
const SERVICES_BASE_HEIGHT = 7800

function getServicesScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / SERVICES_BASE_WIDTH, 0.18), 1)
}

const highlightCards = [
  { icon: FaAward, label: '20+ Years of Experience' },
  { icon: FaShirt, label: '500+ Brands Served' },
  { icon: FaStar, label: 'Premium Quality Production' },
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
      'Pair quality garments with reliable print execution in one streamlined package. This service is ideal for launches, brand drops, company apparel, and ready-to-sell merchandise.',
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
    title: 'Established Experience',
    text: 'Operating since 2002, we bring years of industry knowledge and hands-on expertise to every project.',
    Icon: FaStar,
    iconClass: 'services-why-icon-star',
  },
  {
    title: 'Trusted by Brands',
    text: 'We have worked with respected local and national brands who continue to choose us for our reliability and results.',
    Icon: MdHandshake,
    iconClass: 'services-why-icon-handshake',
  },
  {
    title: 'Quality-Driven',
    text: 'Every project is handled with attention to detail and a commitment to high standards.',
    Icon: FaAward,
    iconClass: 'services-why-icon-award',
  },
  {
    title: 'Local Expertise',
    text: 'Based in Quezon City, we understand the local market while delivering professional-level service.',
    Icon: FaLocationDot,
    iconClass: 'services-why-icon-location',
  },
  {
    title: 'Client-Focused Approach',
    text: 'We value long-term partnerships and treat every project as a collaborative effort.',
    Icon: FaUsers,
    iconClass: 'services-why-icon-users',
  },
]

const trustedBrands = [
  { src: kushLogo, alt: 'KUSH brand logo' },
  { src: linyaLogo, alt: 'Linya Linya brand logo' },
  { src: dailyGrindLogo, alt: 'Daily Grind brand logo' },
  { src: teamMnlLogo, alt: 'Team MNL brand logo' },
]

function Services() {
  const [pageScale, setPageScale] = useState(() => getServicesScale())

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getServicesScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const section = params.get('section')

    if (section !== 'portfolio') {
      return
    }

    const id = window.requestAnimationFrame(() => {
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    return () => window.cancelAnimationFrame(id)
  }, [])

  const goToHome = () => {
    window.location.search = '?page=home'
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
            <div className="services-ellipse services-ellipse-left" aria-hidden="true" />
            <div className="services-ellipse services-ellipse-right" aria-hidden="true" />

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
                  We offer a comprehensive and fully integrated suite of apparel production services designed to
                  support brands at every stage of their journey, from concept development and design to manufacturing,
                  quality control, and final delivery. Our end-to-end solutions ensure efficiency, consistency, and
                  high-quality results, helping businesses streamline their production process, enhance product value,
                  and successfully bring their vision to market.
                </p>
              </div>

              <div className="services-highlight-grid" aria-label="Service highlights">
                {highlightCards.map(({ icon: Icon, label }) => (
                  <article key={label} className="services-highlight-card">
                    <div className="services-highlight-icon-wrap" aria-hidden="true">
                      <span className="services-highlight-icon-bg" />
                      <Icon className="services-highlight-icon" />
                    </div>
                    <h2 className="services-highlight-label">{label}</h2>
                  </article>
                ))}
              </div>

              <div className="services-hero-banner">
                <div className="services-hero-placeholder" aria-hidden="true">
                  <div className="services-hero-placeholder-copy">Video Placeholder</div>
                </div>
              </div>
            </section>

            <section className="services-what-we-do" aria-label="What we do">
              <div className="services-section-heading">
                <h2>What We Do</h2>
                <p>We offer a complete suite of apparel production services to support brands at every stage.</p>
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
                      <div className="services-row-placeholder" aria-hidden="true">
                        <div className="services-row-placeholder-copy">Image Placeholder</div>
                      </div>
                      <div className="services-watch-tag">
                        <FaPlay className="services-watch-icon" aria-hidden="true" />
                        <span>Watch Video</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="services-why" aria-label="Why choose us">
              <div className="services-section-heading services-section-heading-tight">
                <h2>Why Choose Us?</h2>
                <p>Experience. Quality. Trust.</p>
              </div>

              <div className="services-why-list">
                {whyChooseUs.map(({ title, text, Icon, iconClass }) => (
                  <article key={title} className="services-why-item">
                    <div className="services-why-left-card">
                      <div className="services-why-left-inner">
                        <span className="services-why-icon-wrap" aria-hidden="true">
                          <Icon className={`services-why-icon ${iconClass}`} />
                        </span>
                        <h3>{title}</h3>
                      </div>
                    </div>
                    <div className="services-why-right-card">
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="portfolio" className="services-trusted" aria-label="Trusted by brands">
              <div className="services-trusted-header">
                <h2 className="services-trusted-title">Trusted by Brands</h2>
                <p className="services-trusted-subtitle">Built on credibility and results.</p>
              </div>

              <div className="services-trusted-marquee" aria-label="Trusted brand logos">
                <div className="services-trusted-marquee-track">
                  <div className="services-trusted-marquee-segment">
                    {trustedBrands.map((brand) => (
                      <div key={brand.alt} className="services-brand-card">
                        <img src={brand.src} alt={brand.alt} className="services-brand-image" />
                      </div>
                    ))}
                  </div>
                  <div className="services-trusted-marquee-segment" aria-hidden="true">
                    {trustedBrands.map((brand) => (
                      <div key={`${brand.alt}-duplicate`} className="services-brand-card">
                        <img src={brand.src} alt="" className="services-brand-image" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

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
