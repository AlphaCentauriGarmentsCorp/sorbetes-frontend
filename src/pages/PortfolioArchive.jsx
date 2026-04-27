import { useEffect, useState } from 'react'
import { BsFunnelFill } from 'react-icons/bs'
import { IoChevronBack, IoChevronDown } from 'react-icons/io5'
import '../design/PortfolioArchive.css'
import { portfolioArchiveItems } from '../data/portfolioItems.js'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const PORTFOLIO_ARCHIVE_BASE_WIDTH = 1920
const PORTFOLIO_ARCHIVE_BASE_HEIGHT = 2849

const archiveTabs = ['All', 'T-shirts', 'Hoodies', 'Others']
const archiveFilters = [
  { id: 'size', label: 'Size', options: ['Small', 'Medium', 'Large', 'XL', '2XL', '3XL', 'All'] },
  { id: 'fit', label: 'Fit', options: ['Standard', 'Oversized', 'Boxy', 'All'] },
  {
    id: 'print-method',
    label: 'Print Method',
    options: ['Silkscreen', 'Sublimation', 'DTF', 'All'],
  },
  { id: 'fabric', label: 'Fabric', options: ['Heavyweight', 'Premium', 'All'] },
  { id: 'neckline', label: 'Neckline', options: ['Standard', 'Pro Club', 'All'] },
  { id: 'color', label: 'Color', options: ['Light', 'Dark', 'All'] },
]

function getPortfolioArchiveScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / PORTFOLIO_ARCHIVE_BASE_WIDTH, 0.18), 1)
}

function PortfolioArchive() {
  const [pageScale, setPageScale] = useState(() => getPortfolioArchiveScale())
  const [openFilterId, setOpenFilterId] = useState(null)
  const [selectedFilters, setSelectedFilters] = useState(() =>
    Object.fromEntries(archiveFilters.map((filter) => [filter.id, ''])),
  )

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getPortfolioArchiveScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!event.target.closest('.portfolio-archive-filter-control')) {
        setOpenFilterId(null)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)

    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [])

  const goToPortfolio = () => {
    window.history.pushState({}, '', '?page=portfolio')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const clearAllFilters = () => {
    setSelectedFilters(Object.fromEntries(archiveFilters.map((filter) => [filter.id, ''])))
    setOpenFilterId(null)
  }

  const goToExpandedItem = (slug) => {
    window.history.pushState({}, '', `?page=portfolio-expanded&item=${encodeURIComponent(slug)}`)
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  return (
    <div className="portfolio-archive-shell">
      <div
        className="portfolio-archive-scale-frame"
        style={{
          width: `${PORTFOLIO_ARCHIVE_BASE_WIDTH * pageScale}px`,
          height: `${PORTFOLIO_ARCHIVE_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="portfolio-archive-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <div className="portfolio-archive-page">
            <div className="portfolio-archive-ellipse portfolio-archive-ellipse-right" aria-hidden="true" />

            <Navbar logoSrc={logoCircleImg} currentPage="services" />

            <button
              type="button"
              className="portfolio-archive-back-button"
              aria-label="Back to portfolio"
              onClick={goToPortfolio}
            >
              <IoChevronBack className="portfolio-archive-back-icon" aria-hidden="true" />
            </button>

            <section className="portfolio-archive-hero">
              <div className="portfolio-archive-title-block">
                <h1 className="portfolio-archive-title">Sorbetes Archive</h1>
                <div className="portfolio-archive-title-line" aria-hidden="true" />
              </div>

              <div className="portfolio-archive-intro-card">
                <p className="portfolio-archive-intro-text">
                  A showcase of apparel projects we&apos;ve brought to life, highlighting the quality, detail, and
                  production standards that define Sorbetes Apparel Studio. From fabric selection to final printing and
                  finishing, each project demonstrates the care, precision, and expertise we apply to every garment we
                  produce.
                </p>
              </div>
            </section>

            <section className="portfolio-archive-toolbar">
              <div className="portfolio-archive-tabs" role="tablist" aria-label="Portfolio categories">
                {archiveTabs.map((tab, index) => (
                  <button
                    key={tab}
                    type="button"
                    className={
                      index === 0
                        ? 'portfolio-archive-tab portfolio-archive-tab-active'
                        : 'portfolio-archive-tab'
                    }
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="portfolio-archive-filters" aria-label="Portfolio filters">
                <div className="portfolio-archive-filter-label">
                  <BsFunnelFill className="portfolio-archive-filter-icon" aria-hidden="true" />
                  <span>Filter:</span>
                </div>

                {archiveFilters.map((filter) => {
                  const filterControl = (
                    <div key={filter.id} className="portfolio-archive-filter-control">
                      <button
                        type="button"
                        className={
                          openFilterId === filter.id
                            ? 'portfolio-archive-filter-chip portfolio-archive-filter-chip-open'
                            : 'portfolio-archive-filter-chip'
                        }
                        aria-expanded={openFilterId === filter.id}
                        onClick={() => setOpenFilterId((current) => (current === filter.id ? null : filter.id))}
                      >
                        <span>{selectedFilters[filter.id] || filter.label}</span>
                        <span className="portfolio-archive-filter-caret" aria-hidden="true" />
                      </button>

                      {openFilterId === filter.id ? (
                        <div className="portfolio-archive-filter-menu" role="menu" aria-label={`${filter.label} filter`}>
                          <div className="portfolio-archive-filter-menu-header">
                            <span>{filter.label}</span>
                          </div>

                          {filter.options.map((option) => (
                            <button
                              key={option}
                              type="button"
                              className={
                                selectedFilters[filter.id] === option
                                  ? 'portfolio-archive-filter-option portfolio-archive-filter-option-active'
                                  : 'portfolio-archive-filter-option'
                              }
                              onClick={() => {
                                setSelectedFilters((current) => ({
                                  ...current,
                                  [filter.id]: option === 'All' ? '' : option,
                                }))
                                setOpenFilterId(null)
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  )

                  if (filter.id === 'color') {
                    return (
                      <div key={filter.id} className="portfolio-archive-filter-stack">
                        {filterControl}
                        <button type="button" className="portfolio-archive-clear-filters" onClick={clearAllFilters}>
                          Clear all Filters
                        </button>
                      </div>
                    )
                  }

                  return filterControl
                })}
              </div>
            </section>

            <section className="portfolio-archive-grid" aria-label="Archive products">
              {portfolioArchiveItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="portfolio-archive-card"
                  onClick={() => goToExpandedItem(item.slug)}
                >
                  <div className="portfolio-archive-card-image-frame">
                    <img src={item.image} alt={item.title} className="portfolio-archive-card-image" />
                  </div>
                  <img src={item.badge} alt="" className="portfolio-archive-card-badge" />

                  <div className="portfolio-archive-card-meta">
                    <h2>{item.title}</h2>
                    <p>{item.subtitle}</p>
                  </div>
                </button>
              ))}
            </section>

            <section className="portfolio-archive-pagination" aria-label="Pagination">
              <p className="portfolio-archive-pagination-summary">Showing 1-10 from 1000</p>

              <div className="portfolio-archive-pagination-center">
                <button type="button" className="portfolio-archive-pagination-arrow" aria-label="Previous page">
                  &lt;
                </button>
                <div className="portfolio-archive-pagination-page">1</div>
                <span className="portfolio-archive-pagination-total">of 1000</span>
                <button type="button" className="portfolio-archive-pagination-arrow" aria-label="Next page">
                  &gt;
                </button>
              </div>

              <div className="portfolio-archive-pagination-rows">
                <span>Rows per page:</span>
                <button type="button" className="portfolio-archive-pagination-page">
                  4 <IoChevronDown aria-hidden="true" />
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

export default PortfolioArchive
