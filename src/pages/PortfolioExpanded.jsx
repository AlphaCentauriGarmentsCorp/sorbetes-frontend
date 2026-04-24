import { useEffect, useMemo, useState } from 'react'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import '../design/PortfolioExpanded.css'
import {
  portfolioExpandedDefaultSlug,
  portfolioExpandedItems,
} from '../data/portfolioItems.js'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import wLogo from '../assets/w_logo.png'

const PORTFOLIO_EXPANDED_BASE_WIDTH = 1920
const PORTFOLIO_EXPANDED_BASE_HEIGHT = 2154

function getPortfolioExpandedScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / PORTFOLIO_EXPANDED_BASE_WIDTH, 0.18), 1)
}

function getCurrentPortfolioItemSlug() {
  const params = new URLSearchParams(window.location.search)
  return params.get('item') || portfolioExpandedDefaultSlug
}

function PortfolioExpanded() {
  const [pageScale, setPageScale] = useState(() => getPortfolioExpandedScale())
  const [activeSlide, setActiveSlide] = useState(0)

  const item = useMemo(() => {
    const slug = getCurrentPortfolioItemSlug()
    return portfolioExpandedItems[slug] || portfolioExpandedItems[portfolioExpandedDefaultSlug]
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getPortfolioExpandedScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToArchive = () => {
    window.history.pushState({}, '', '?page=portfolio-archive')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const goToPreviousSlide = () => {
    setActiveSlide((current) => (current + 1) % item.gallery.length)
  }

  const goToNextSlide = () => {
    setActiveSlide((current) => (current - 1 + item.gallery.length) % item.gallery.length)
  }

  return (
    <div className="portfolio-expanded-shell">
      <div
        className="portfolio-expanded-scale-frame"
        style={{
          width: `${PORTFOLIO_EXPANDED_BASE_WIDTH * pageScale}px`,
          height: `${PORTFOLIO_EXPANDED_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="portfolio-expanded-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <div className="portfolio-expanded-page">
            <div className="portfolio-expanded-ellipse portfolio-expanded-ellipse-left" aria-hidden="true" />

            <Navbar logoSrc={logoCircleImg} currentPage="services" />

            <button
              type="button"
              className="portfolio-expanded-back-button"
              aria-label="Back to archive"
              onClick={goToArchive}
            >
              <IoChevronBack className="portfolio-expanded-back-icon" aria-hidden="true" />
            </button>

            <section className="portfolio-expanded-hero">
              <div className="portfolio-expanded-title-group">
                <h1 className="portfolio-expanded-title">{item.title}</h1>
                <p className="portfolio-expanded-subtitle">{item.subtitle}</p>
              </div>

              <img src={item.badge} alt="" className="portfolio-expanded-badge" />
            </section>

            <section className="portfolio-expanded-gallery" aria-label={`${item.title} gallery`}>
              <button
                type="button"
                className="portfolio-expanded-gallery-arrow portfolio-expanded-gallery-arrow-left"
                aria-label="Previous image"
                onClick={goToPreviousSlide}
              >
                <IoChevronBack aria-hidden="true" />
              </button>

              <button
                type="button"
                className="portfolio-expanded-gallery-arrow portfolio-expanded-gallery-arrow-right"
                aria-label="Next image"
                onClick={goToNextSlide}
              >
                <IoChevronForward aria-hidden="true" />
              </button>

              {item.gallery.map((image, index) => {
                let className = 'portfolio-expanded-gallery-item'

                if (index === activeSlide) {
                  className += ' portfolio-expanded-gallery-item-active'
                } else if (index === (activeSlide - 1 + item.gallery.length) % item.gallery.length) {
                  className += ' portfolio-expanded-gallery-item-prev'
                } else if (index === (activeSlide - 2 + item.gallery.length) % item.gallery.length) {
                  className += ' portfolio-expanded-gallery-item-prev-far'
                } else if (index === (activeSlide + 1) % item.gallery.length) {
                  className += ' portfolio-expanded-gallery-item-next'
                } else if (index === (activeSlide + 2) % item.gallery.length) {
                  className += ' portfolio-expanded-gallery-item-next-far'
                } else {
                  className += ' portfolio-expanded-gallery-item-hidden'
                }

                return (
                  <div key={image.id} className={className}>
                    <img src={image.src} alt={image.alt} className="portfolio-expanded-gallery-image" />
                  </div>
                )
              })}
            </section>

            <div className="portfolio-expanded-pagination" aria-label="Gallery pagination">
              {item.gallery.map((image, index) => (
                <button
                  key={`${image.id}-dot`}
                  type="button"
                  className={
                    index === activeSlide
                      ? 'portfolio-expanded-pagination-dot portfolio-expanded-pagination-dot-active'
                      : 'portfolio-expanded-pagination-dot'
                  }
                  aria-label={`View image ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>

            <section className="portfolio-expanded-details">
              <div className="portfolio-expanded-details-header">
                <span>Details:</span>
              </div>

              <div className="portfolio-expanded-details-grid">
                <div className="portfolio-expanded-details-labels">
                  {item.details.map((detail) => (
                    <p key={detail.label}>{detail.label}</p>
                  ))}
                </div>

                <div className="portfolio-expanded-details-values">
                  {item.details.map((detail) => (
                    <p key={detail.label}>{detail.value}</p>
                  ))}
                </div>
              </div>
            </section>

            <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PortfolioExpanded
