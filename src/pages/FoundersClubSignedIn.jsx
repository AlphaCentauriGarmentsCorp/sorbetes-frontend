import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  FaCommentDots,
  FaQuoteRight,
  FaStar,
} from 'react-icons/fa'
import { IoChevronBack } from 'react-icons/io5'
import '../design/FoundersClub.css'
import '../design/FoundersClubSignedIn.css'
import foundersLogo from '../assets/Founders-logo.png'
import wLogo from '../assets/w_logo.png'
import foundersClubKush from '../assets/Kush.jpg'
import { FOOTER_CANVAS_HEIGHT } from '../constants/layout.js'
import Footer from './Footer.jsx'
import LoggedInNavbar from './LoggedInNavbar.jsx'
import { navigate, navigateBack } from '../utils/navigation.js'

const FCSI_BASE_WIDTH = 1920
const FCSI_PAGE_HEIGHT = 5046
const FCSI_BASE_HEIGHT = FCSI_PAGE_HEIGHT + FOOTER_CANVAS_HEIGHT

const reviews = [
  { name: 'John Lloyd Cruz', featured: true },
  { name: 'Jerald Napoles' },
  { name: 'Billie Eilish' },
  { name: 'John Lloyd Cruz' },
  { name: 'Jerald Napoles' },
  { name: 'Billie Eilish' },
]

const reviewText =
  'Sorbetes has supported our apparel projects with reliable service, quality production, and helpful guidance from concept to completion.'

function getFoundersClubSignedInScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / FCSI_BASE_WIDTH, 0.18), 1)
}

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
        aria-labelledby="fcsi-review-modal-title"
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
        <h2 id="fcsi-review-modal-title">Great!</h2>
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

function FoundersClubSignedIn() {
  const [pageScale, setPageScale] = useState(() => getFoundersClubSignedInScale())
  const [selectedReview, setSelectedReview] = useState(null)
  const [rating, setRating] = useState(0)
  const [referenceNumber, setReferenceNumber] = useState('')
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getFoundersClubSignedInScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToFoundersGuide = (event) => {
    event.preventDefault()
    navigate('?page=founders-club-guide')
  }

  const handleExperienceSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <>
      <div className="fcsi-shell">
        <div
          className="fcsi-scale-frame"
          style={{
            width: `${FCSI_BASE_WIDTH * pageScale}px`,
            height: `${FCSI_BASE_HEIGHT * pageScale}px`,
          }}
        >
          <div className="fcsi-scale-content" style={{ transform: `scale(${pageScale})` }}>
            <main className="fcsi-page">
              <LoggedInNavbar currentPage="founders-club" />

              <div className="fcsi-top-links">
                <button type="button" className="fc-back-button" aria-label="Go back" onClick={() => navigateBack()}>
                  <IoChevronBack aria-hidden="true" />
                </button>
                <a href="?page=founders-club-guide" onClick={goToFoundersGuide}>
                  How to join the Sorbetes Founder&apos;s Club?
                </a>
              </div>

              <section className="fc-hero" aria-labelledby="fcsi-founders-club-title">
                <p>Be part of the Sorbetes</p>
                <h1 id="fcsi-founders-club-title">Founder&apos;s Club</h1>
                <div className="fc-title-line" aria-hidden="true" />
              </section>

              <section className="fc-about" id="about">
                <img className="fc-about-logo" src={foundersLogo} alt="The Founders Club" />
                <p>
                  <strong>What is the Sorbetes Founders Club?</strong>
                  <br />
                  Sorbetes Founders Club is a community of visionary brands, creators, and business owners who have
                  trusted us to bring their apparel ideas to life. Their experiences reflect our commitment to quality
                  craftsmanship, reliable production, and long-term partnership — inspiring new brands to grow with
                  confidence alongside us.
                </p>
              </section>

              <section className="fc-trusted" aria-labelledby="fcsi-trusted-brands-title">
                <div className="fc-section-heading">
                  <h2 id="fcsi-trusted-brands-title">Trusted by Growing Brands</h2>
                  <p>Join the Sorbetes Founders Club and bring your ideas to life.</p>
                </div>

                <div className="fcsi-feature-wrap">
                  <img
                    src={foundersClubKush}
                    alt="KUSH Co. Founder Club testimonial — Bam Santiago, Founder"
                  />

                </div>

                <a className="fc-view-all fc-feature-view-all" href="#reviews">
                  View All
                </a>
              </section>

              <section className="fc-reviews" id="reviews" aria-labelledby="fcsi-customer-reviews-title">
                <div className="fc-section-heading">
                  <h2 id="fcsi-customer-reviews-title">Hear what our customers say</h2>
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

              <section className="fcsi-experience" aria-labelledby="fcsi-experience-title">
                <div className="fcsi-experience-intro">
                  <h2 id="fcsi-experience-title">How&apos;s your experience?</h2>
                  <p>
                    We&apos;d love to hear about your experience with Sorbetes. Your feedback helps us continue
                    improving and delivering quality apparel you can trust.
                  </p>
                </div>

                <form className="fcsi-experience-form" onSubmit={handleExperienceSubmit}>
                  <div className="fcsi-form-fields">
                    <div className="fcsi-field">
                      <label htmlFor="fcsi-reference">Reference Number</label>
                      <input
                        id="fcsi-reference"
                        type="text"
                        placeholder="Enter your reference number"
                        value={referenceNumber}
                        onChange={(event) => setReferenceNumber(event.target.value)}
                      />
                    </div>

                    <div className="fcsi-field">
                      <label htmlFor="fcsi-title">Title</label>
                      <input
                        id="fcsi-title"
                        type="text"
                        placeholder="Enter title here"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>

                    <div className="fcsi-field">
                      <label htmlFor="fcsi-message">Message</label>
                      <textarea
                        id="fcsi-message"
                        placeholder="Enter your message..."
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="fcsi-rating-block">
                    <span>Rate your experience</span>
                    <div className="fcsi-rating-stars" role="group" aria-label="Rate your experience">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const starValue = index + 1
                        return (
                          <button
                            key={starValue}
                            type="button"
                            className={`fcsi-rating-star${starValue <= rating ? ' is-active' : ''}`}
                            aria-label={`${starValue} star${starValue === 1 ? '' : 's'}`}
                            onClick={() => setRating(starValue)}
                          >
                            <FaStar aria-hidden="true" />
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <button type="submit" className="fcsi-submit">
                    Submit
                  </button>
                </form>
              </section>
            </main>

            <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>

      <ReviewModal review={selectedReview} onClose={() => setSelectedReview(null)} />
    </>
  )
}

export default FoundersClubSignedIn
