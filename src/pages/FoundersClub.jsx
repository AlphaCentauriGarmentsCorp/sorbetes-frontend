import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaCommentDots, FaQuoteRight, FaStar } from 'react-icons/fa'
import { IoChevronBack } from 'react-icons/io5'
import '../design/FoundersClub.css'
import foundersLogo from '../assets/Founders-logo.png'
import wLogo from '../assets/w_logo.png'
import foundersClubKush from '../assets/Kush.jpg'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const FOUNDERS_CLUB_BASE_WIDTH = 1920
const FOUNDERS_CLUB_BASE_HEIGHT = 3877

const reviews = [
  { name: 'John Lloyd Cruz', featured: true },
  { name: 'Jerald Napoles' },
  { name: 'Billie Eilish' },
  { name: 'John Lloyd Cruz' },
  { name: 'Jerald Napoles' },
  { name: 'Billie Eilish' },
]

function getFoundersClubScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / FOUNDERS_CLUB_BASE_WIDTH, 0.18), 1)
}

const reviewText =
  'Sorbetes has supported our apparel projects with reliable service, quality production, and helpful guidance from concept to completion.'

function ReviewModal({ review, onClose }) {
  if (!review || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="fc-review-modal-overlay" role="presentation" onClick={onClose}>
      <article
        className="fc-review-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fc-review-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="fc-review-modal-close" aria-label="Close review" onClick={onClose}>
          ×
        </button>
        <div className="fc-review-stars" aria-label="5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar key={index} />
          ))}
        </div>
        <h2 id="fc-review-modal-title">Great!</h2>
        <p>{reviewText}</p>
        <div className="fc-review-modal-bottom">
          <div className="fc-review-author">
            <span className="fc-review-avatar" aria-hidden="true" />
            <span>{review.name}</span>
          </div>
          <FaQuoteRight className="fc-review-modal-quote" aria-hidden="true" />
        </div>
      </article>
    </div>,
    document.body,
  )
}

function ReviewCard({ review, onReadAll }) {
  return (
    <article className={review.featured ? 'fc-review-card fc-review-card-featured' : 'fc-review-card'}>
      <div className="fc-review-stars" aria-label="5 stars">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar key={index} />
        ))}
      </div>
      <h3>Great!</h3>
      <p>{reviewText}</p>
      <button type="button" className="fc-review-read-all" onClick={() => onReadAll(review)}>
        Read All
      </button>
      <div className="fc-review-bottom">
        <div className="fc-review-author">
          <span className="fc-review-avatar" aria-hidden="true" />
          <span>{review.name}</span>
        </div>
        <FaQuoteRight className="fc-review-quote" aria-hidden="true" />
      </div>
    </article>
  )
}

function FoundersClub() {
  const [pageScale, setPageScale] = useState(() => getFoundersClubScale())
  const [selectedReview, setSelectedReview] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getFoundersClubScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToHome = () => {
    window.history.pushState({}, '', '?page=home')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const goToSignUp = () => {
    window.history.pushState({}, '', '?page=auth&mode=signup')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const goToFoundersGuide = (event) => {
    event.preventDefault()
    window.history.pushState({}, '', '?page=founders-club-guide')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  return (
    <>
      <div className="founders-club-shell">
      <div
        className="founders-club-scale-frame"
        style={{
          width: `${FOUNDERS_CLUB_BASE_WIDTH * pageScale}px`,
          height: `${FOUNDERS_CLUB_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="founders-club-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <main className="founders-club-page">
            <Navbar logoSrc={foundersLogo} currentPage="founders-club" logoOnly />

            <div className="fc-top-links">
              <button type="button" className="fc-back-button" aria-label="Back to homepage" onClick={goToHome}>
                <IoChevronBack aria-hidden="true" />
              </button>
              <a href="?page=founders-club-guide" onClick={goToFoundersGuide}>
                Learn More about Sorbetes Founder&apos;s Club
              </a>
            </div>

            <section className="fc-hero" aria-labelledby="founders-club-title">
              <p>Be part of the Sorbetes</p>
              <h1 id="founders-club-title">Founder&apos;s Club</h1>
              <div className="fc-title-line" aria-hidden="true" />
            </section>

            <section className="fc-about" id="about">
              <img className="fc-about-logo" src={foundersLogo} alt="The Founders Club" />
              <p>
                <strong>What is the Sorbetes Founders Club?</strong>
                <br />
                Sorbetes Founders Club is a community of visionary brands, creators, and business owners who have
                trusted us to bring their apparel ideas to life. Their experiences reflect our commitment to quality
                craftsmanship, reliable production, and long-term partnership - inspiring new brands to grow with
                confidence alongside us.
              </p>
            </section>

            <section className="fc-trusted" aria-labelledby="trusted-brands-title">
              <div className="fc-section-heading">
                <h2 id="trusted-brands-title">Trusted by Growing Brands</h2>
                <p>Join the Sorbetes Founders Club and bring your ideas to life.</p>
              </div>
              <div className="fc-feature-wrap">
                <img src={foundersClubKush} alt="KUSH Co. Founder Club testimonial" />
              </div>
              <a className="fc-view-all fc-feature-view-all" href="#reviews">
                View All
              </a>
            </section>

            <section className="fc-reviews" id="reviews" aria-labelledby="customer-reviews-title">
              <div className="fc-section-heading">
                <h2 id="customer-reviews-title">Hear what our customers say</h2>
                <p>Trusted by customers, proven by reviews.</p>
              </div>

              <div className="fc-review-grid">
                {reviews.map((review, index) => (
                  <ReviewCard key={`${review.name}-${index}`} review={review} onReadAll={setSelectedReview} />
                ))}
              </div>

              <div className="fc-review-summary">
                <span>1000+ Satisfied Clients love our services</span>
                <button type="button" className="fc-summary-chat" aria-label="Open reviews chat">
                  <FaCommentDots aria-hidden="true" />
                </button>
                <div className="fc-summary-rating">
                  <div className="fc-review-stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <FaStar key={index} />
                    ))}
                  </div>
                  <span>5.0</span>
                  <small>Based on 1.0k reviews</small>
                </div>
                <a className="fc-view-all" href="#reviews">
                  View All
                </a>
              </div>
            </section>

            <section className="fc-cta" aria-label="Start your journey">
              <p>Start your brand with us now - be the next Sorbetes success story.</p>
              <button type="button" onClick={goToSignUp}>
                START YOUR JOURNEY
              </button>
            </section>

            <Footer logoSrc={wLogo} />
          </main>
        </div>
      </div>
      </div>
      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </>
  )
}

export default FoundersClub
