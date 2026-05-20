import { useEffect, useState } from 'react'
import { FaCheck, FaClipboardList, FaTruck } from 'react-icons/fa'
import { IoChevronBack } from 'react-icons/io5'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import loadTrackIcon from '../assets/load_track.png'
import loadTrackGrayIcon from '../assets/load_track_gray.png'
import wLogo from '../assets/w_logo.png'
import '../design/TrackOrder.css'
import { FOOTER_CANVAS_HEIGHT } from '../constants/layout.js'
import {
  DEMO_TRACKING_HINTS,
  PRODUCTION_SUB_STEPS,
  STUDIO_NAME,
  getTrackingForReference,
} from '../data/orderTracking.js'

const TO_BASE_WIDTH = 1920
const TO_PAGE_HEIGHT = 3600
const TO_BASE_HEIGHT = TO_PAGE_HEIGHT + FOOTER_CANVAS_HEIGHT

const MAP_EMBED_URL =
  'https://www.google.com/maps?q=117%20Mother%20Ignacia%20Ave%2C%20Quezon%20City%2C%20Philippines&output=embed'

const STAGE_ICONS = [
  { key: 'review', Icon: FaClipboardList },
  { key: 'production' },
  { key: 'shipping', Icon: FaTruck },
  { key: 'delivered', Icon: FaCheck },
]

function ProductionStageIcon({ active }) {
  return (
    <img
      src={active ? loadTrackIcon : loadTrackGrayIcon}
      alt=""
      className="TO-production-stage-img"
      aria-hidden="true"
    />
  )
}

function getTrackOrderScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / TO_BASE_WIDTH, 0.18), 1)
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('cursor:navigate'))
}

function TrackingDetailsCard({ tracking }) {
  const {
    events,
    activeStageIndex,
    stepperMuted,
    cardClassName,
    productionSubStepsComplete = 0,
    defaultShowProductionSteps = false,
  } = tracking
  const productionEvent = events.find((event) => event.key === 'production')
  const isProductionComplete = Boolean(productionEvent?.complete)
  const [showProductionSteps, setShowProductionSteps] = useState(
    defaultShowProductionSteps ?? isProductionComplete,
  )
  const isDelivered = activeStageIndex >= 3

  const toggleProductionSteps = () => {
    setShowProductionSteps((open) => !open)
  }

  return (
    <article
      className={`TO-details-card${cardClassName}`}
      aria-label="Tracking details"
    >
      <h2 className="TO-details-title">Tracking Details</h2>

      <div
        className={`TO-details-stages${stepperMuted ? ' TO-details-stages-muted' : ''}${
          isDelivered ? ' TO-details-stages-delivered' : ''
        }`}
        aria-hidden="true"
      >
        {STAGE_ICONS.map(({ key, Icon }, index) => {
          const isProduction = key === 'production'
          const isDeliveredStage = key === 'delivered'
          const isOutlinedComplete = isDelivered && index < 3
          const isFilledComplete = isDelivered && isDeliveredStage
          const isActive = !isDelivered && index === activeStageIndex
          const isPast = !isDelivered && index < activeStageIndex
          const lineActive = !stepperMuted && index > 0 && index <= activeStageIndex

          return (
            <div key={key} className="TO-details-stage-wrap">
              {index > 0 ? (
                <span
                  className={`TO-details-stage-line${
                    lineActive ? ' TO-details-stage-line-active' : ''
                  }${stepperMuted ? ' TO-details-stage-line-muted' : ''}`}
                />
              ) : null}
              <span
                className={`TO-details-stage-icon${
                  isFilledComplete || (isPast && !isProduction)
                    ? ' TO-details-stage-icon-complete'
                    : ''
                }${isOutlinedComplete || (isActive && !isProduction) ? ' TO-details-stage-icon-current' : ''}${
                  isProduction && (isOutlinedComplete || isActive || isPast)
                    ? ' TO-details-stage-icon-current'
                    : ''
                }${isProduction ? ' TO-details-stage-icon-production' : ''}`}
              >
                {isProduction ? (
                  <ProductionStageIcon active={isOutlinedComplete || isActive || isPast} />
                ) : (
                  <Icon aria-hidden="true" />
                )}
              </span>
            </div>
          )
        })}
      </div>

      <div className="TO-details-timeline-section">
        <ul className="TO-details-timeline">
            {events.map((event, eventIndex) => {
              const isProduction = event.key === 'production'
              const hasConnector = eventIndex < events.length - 1

              return (
                <li
                  key={event.key}
                  className={`TO-details-event${event.complete ? ' TO-details-event-complete' : ''}${
                    event.current ? ' TO-details-event-current' : ''
                  }${hasConnector ? ' TO-details-event-has-next' : ''}${
                    isProduction && showProductionSteps ? ' TO-details-event-expanded' : ''
                  }`}
                >
                  <div className="TO-details-event-row">
                    <div className="TO-details-event-main">
                      <div className="TO-details-marker-col">
                        <span className="TO-details-marker" aria-hidden="true">
                          {event.complete ? <FaCheck /> : null}
                        </span>
                      </div>
                      <div className="TO-details-event-copy">
                        <p className="TO-details-event-title">{event.title}</p>
                        <p className="TO-details-event-location">{event.location}</p>
                        {isProduction && event.expandable ? (
                          <button
                            type="button"
                            className="TO-details-view-all"
                            onClick={toggleProductionSteps}
                            aria-expanded={showProductionSteps}
                          >
                            {showProductionSteps ? 'View Less' : 'View All >'}
                          </button>
                        ) : null}
                      </div>
                    </div>
                    <time className="TO-details-event-date" dateTime="2026-03-15">
                      {event.date}
                    </time>
                  </div>

                  {isProduction && showProductionSteps ? (
                    <ul className="TO-details-subtimeline" aria-label="Production steps">
                      {PRODUCTION_SUB_STEPS.map((step, stepIndex) => {
                        const substepComplete =
                          isProductionComplete || stepIndex < productionSubStepsComplete

                        return (
                        <li
                          key={step.key}
                          className={`TO-details-substep${
                            substepComplete ? ' TO-details-substep-complete' : ''
                          }${
                            stepIndex < PRODUCTION_SUB_STEPS.length - 1
                              ? ' TO-details-substep-has-next'
                              : ''
                          }`}
                        >
                          <div className="TO-details-substep-row">
                            <div className="TO-details-submarker-col">
                              <span
                                className={`TO-details-submarker${
                                  substepComplete ? ' TO-details-submarker-complete' : ''
                                }`}
                                aria-hidden="true"
                              >
                                {substepComplete ? <FaCheck /> : null}
                              </span>
                            </div>
                            <div className="TO-details-substep-copy">
                              <p className="TO-details-event-title">{step.title}</p>
                              <p className="TO-details-event-location">{STUDIO_NAME}</p>
                            </div>
                          </div>
                        </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </li>
              )
            })}
        </ul>
      </div>
    </article>
  )
}

export default function TrackOrder() {
  const [pageScale, setPageScale] = useState(() => getTrackOrderScale())
  const [reference, setReference] = useState('')
  const trimmedReference = reference.trim()
  const tracking = getTrackingForReference(trimmedReference)
  const hasTracking = Boolean(tracking)

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getTrackOrderScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="TO-shell">
      <div
        className="TO-scale-frame"
        style={{
          width: `${TO_BASE_WIDTH * pageScale}px`,
          height: `${TO_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div
          className="TO-scale-content"
          style={{ height: `${TO_BASE_HEIGHT}px`, transform: `scale(${pageScale})` }}
        >
          <main className="TO-page">
            <Navbar logoSrc={logoCircleImg} currentPage="track-order" />

            <button
              type="button"
              className="TO-back"
              aria-label="Back to homepage"
              onClick={() => navigate('?page=home')}
            >
              <IoChevronBack aria-hidden="true" />
            </button>

            <header className="TO-hero">
              <div className="TO-hero-title-wrap">
                <h1 className="TO-title">Track My Order</h1>
                <span className="TO-title-line" aria-hidden="true" />
              </div>
              <p className="TO-description">
                Track the progress of your order and stay updated on each stage of production from review to
                completion.
              </p>
            </header>

            <section className="TO-track-section" aria-label="Order tracking">
              <div className="TO-map-wrap">
                <iframe
                  className="TO-map"
                  title="Sorbetes location map"
                  src={MAP_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="TO-form-block">
                <label className="TO-field-label" htmlFor="TO-reference-input">
                  Reference Number
                </label>
                <input
                  id="TO-reference-input"
                  className="TO-reference-input"
                  type="text"
                  value={reference}
                  onChange={(event) => setReference(event.target.value)}
                  placeholder="Enter your reference number"
                  autoComplete="off"
                />
                {!hasTracking ? (
                  <div className="TO-helper-block">
                    <p className="TO-helper">
                      Your tracking details will appear here once you enter a valid reference number.
                    </p>
                    <p className="TO-helper TO-helper-demo-title">Demo references</p>
                    <ul className="TO-demo-refs">
                      {DEMO_TRACKING_HINTS.map(({ reference: demoRef, label }) => (
                        <li key={demoRef}>
                          <button
                            type="button"
                            className="TO-demo-ref-btn"
                            onClick={() => setReference(demoRef)}
                          >
                            <span className="TO-demo-ref-code">{demoRef}</span>
                            <span className="TO-demo-ref-label">{label}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              {tracking ? <TrackingDetailsCard tracking={tracking} /> : null}
            </section>
          </main>
          <Footer logoSrc={wLogo} />
        </div>
      </div>
    </div>
  )
}
