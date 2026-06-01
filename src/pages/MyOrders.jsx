import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaBoxOpen, FaCheck, FaFilter } from 'react-icons/fa'
import { IoChevronBack } from 'react-icons/io5'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import '../design/MyOrders.css'
import { FOOTER_CANVAS_HEIGHT } from '../constants/layout.js'
import OrderDetailModal from './OrderDetailModal.jsx'
import { TRACKING_REFERENCES } from '../data/orderTracking.js'
import { navigateBack } from '../utils/navigation.js'

const SAMPLE_ORDER_DETAILS = {
  status: 'Confirmed',
  amount: '100.00 PHP',
  paymentTime: 'March 15, 2024',
  paymentMethod: 'Bank Transfer',
  senderName: 'Abdul Aziz De Borja',
  product: {
    package: 'Standard (DTF)',
    fabric: 'Thick & Premium (280 GSM)',
    shirtColor: '11-4201',
    printSize: 'Full Print',
    printMethod: 'Water Based',
    neckline: 'Pro Club',
    printColorAmount: '1-2 Colors',
    totalPieces: '50',
    addOns: '0',
  },
  branding: {
    frontPrint: 'No',
    backPrint: 'No',
    innerBrandingPrint: 'Silk Screen',
    wovenLabel: 'No',
    ownWovenLabel: 'No',
    wovenLabelLocation: 'N/A',
  },
  files: [
    { label: 'Woven File', name: 'woven.png' },
    { label: 'Front Print', name: 'frontprint.png' },
    { label: 'Back Print', name: 'backprint.png' },
    { label: 'Mockup', name: 'mockup.png' },
  ],
}

const MO_BASE_WIDTH = 1920
const MO_PAGE_HEIGHT = 1941
const MO_LIST_START_Y = 820
const MO_ORDER_CARD_HEIGHT = 250
const MO_ORDER_CARD_GAP = 63
const MO_ORDER_LIST_BOTTOM_SPACE = 180

const PROGRESS_STEPS = [
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'processing', label: 'Processing' },
  { key: 'picked-up', label: 'Picked Up' },
  { key: 'delivered', label: 'Delivered' },
]

const UPCOMING_ORDERS = [
  {
    id: 'order-1',
    reference: TRACKING_REFERENCES.confirmed,
    type: 'Standard (DTF)',
    submittedOn: 'March 10, 2026',
    currentStep: 0,
    items: '50 Items',
    fabric: 'Thick Fabric',
    print: 'Water-Based Print',
    details: { ...SAMPLE_ORDER_DETAILS, status: 'Confirmed' },
  },
  {
    id: 'order-2',
    reference: TRACKING_REFERENCES.production,
    type: 'Standard (DTF)',
    submittedOn: 'March 12, 2026',
    currentStep: 1,
    items: '75 Items',
    fabric: 'Premium Fabric',
    print: 'Plastisol Print',
    details: { ...SAMPLE_ORDER_DETAILS, status: 'In Production' },
  },
  {
    id: 'order-3',
    reference: TRACKING_REFERENCES.readyForDelivery,
    type: 'Oversized (DTF)',
    submittedOn: 'March 14, 2026',
    currentStep: 2,
    items: '30 Items',
    fabric: 'Thick Fabric',
    print: 'Water-Based Print',
    details: { ...SAMPLE_ORDER_DETAILS, status: 'Ready for Delivery' },
  },
  {
    id: 'order-4',
    reference: TRACKING_REFERENCES.inTransit,
    type: 'Standard (DTF)',
    submittedOn: 'March 15, 2026',
    currentStep: 2,
    items: '50 Items',
    fabric: 'Thick Fabric',
    print: 'Water-Based Print',
    details: { ...SAMPLE_ORDER_DETAILS, status: 'In Transit' },
  },
  {
    id: 'order-5',
    reference: TRACKING_REFERENCES.delivered,
    type: 'Standard (DTF)',
    submittedOn: 'March 15, 2026',
    currentStep: 3,
    items: '50 Items',
    fabric: 'Thick Fabric',
    print: 'Water-Based Print',
    details: { ...SAMPLE_ORDER_DETAILS, status: 'Delivered' },
  },
]

function getMyOrdersScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / MO_BASE_WIDTH, 0.18), 1)
}

function getStepState(stepIndex, currentStep) {
  if (stepIndex < currentStep) {
    return 'complete'
  }
  if (stepIndex === currentStep) {
    return 'current'
  }
  return 'upcoming'
}

function getConnectorState(stepIndex, currentStep) {
  return stepIndex < currentStep ? 'complete' : 'upcoming'
}

function OrderProgress({ currentStep }) {
  return (
    <ol className="MO-progress" aria-label="Order progress">
      {PROGRESS_STEPS.map((step, index) => {
        const state = getStepState(index, currentStep)
        const connectorState = getConnectorState(index, currentStep)

        return (
          <li key={step.key} className="MO-progress-step">
            <span className="MO-progress-label">{step.label}</span>
            <span className={`MO-progress-dot MO-progress-dot-${state}`} aria-hidden="true">
              {state === 'complete' ? <FaCheck /> : null}
            </span>
            {index < PROGRESS_STEPS.length - 1 ? (
              <span className={`MO-progress-line MO-progress-line-${connectorState}`} aria-hidden="true" />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

function CancelOrderModal({ order, onClose, onConfirm }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="MO-cancel-overlay" role="presentation" onClick={onClose}>
      <section
        className="MO-cancel-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="MO-cancel-title"
        aria-describedby="MO-cancel-desc"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="MO-cancel-title">Cancel this order?</h2>
        <p id="MO-cancel-desc">
          Are you sure you want to cancel <strong>Reference #{order.reference}</strong>? This action cannot be
          undone.
        </p>
        <div className="MO-cancel-actions">
          <button type="button" className="MO-btn MO-btn-primary" onClick={onClose}>
            Keep Order
          </button>
          <button type="button" className="MO-btn MO-btn-cancel" onClick={onConfirm}>
            Yes, Cancel Order
          </button>
        </div>
      </section>
    </div>,
    document.body,
  )
}

function OrderCard({ order, onDetailsRequest, onCancelRequest }) {
  return (
    <article className="MO-order-card">
      <div className="MO-order-card-top">
        <div className="MO-order-card-ident">
          <span className="MO-order-icon" aria-hidden="true">
            <FaBoxOpen />
          </span>
          <div className="MO-order-card-meta">
            <h2 className="MO-order-reference">Reference #{order.reference}</h2>
            <p className="MO-order-type">{order.type}</p>
          </div>
        </div>
        <p className="MO-order-submitted">Submitted on {order.submittedOn}</p>
      </div>

      <OrderProgress currentStep={order.currentStep} />

      <div className="MO-order-card-bottom">
        <p className="MO-order-summary">
          <strong>{order.items}</strong>
          <span className="MO-order-summary-dot" aria-hidden="true" />
          <span>{order.fabric}</span>
          <span className="MO-order-summary-dot" aria-hidden="true" />
          <span>{order.print}</span>
        </p>
        <div className="MO-order-actions">
          <button
            type="button"
            className="MO-btn MO-btn-primary"
            onClick={() => onDetailsRequest(order)}
          >
            Order Details
          </button>
          <button
            type="button"
            className="MO-btn MO-btn-cancel"
            onClick={() => onCancelRequest(order)}
          >
            Cancel Order
          </button>
        </div>
      </div>
    </article>
  )
}

export default function MyOrders() {
  const [pageScale, setPageScale] = useState(() => getMyOrdersScale())
  const [activeTab, setActiveTab] = useState('upcoming')
  const [upcomingOrders, setUpcomingOrders] = useState(UPCOMING_ORDERS)
  const [cancelTarget, setCancelTarget] = useState(null)
  const [detailTarget, setDetailTarget] = useState(null)
  const ordersListRef = useRef(null)
  const [measuredPageHeight, setMeasuredPageHeight] = useState(MO_PAGE_HEIGHT)

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getMyOrdersScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const orders = activeTab === 'upcoming' ? upcomingOrders : []
  const upcomingCount = upcomingOrders.length
  const previousCount = 0
  const orderListHeight = orders.length
    ? orders.length * MO_ORDER_CARD_HEIGHT + (orders.length - 1) * MO_ORDER_CARD_GAP
    : 160
  const estimatedPageHeight = MO_LIST_START_Y + orderListHeight + MO_ORDER_LIST_BOTTOM_SPACE
  const pageHeight = Math.max(MO_PAGE_HEIGHT, estimatedPageHeight, measuredPageHeight)
  const canvasHeight = pageHeight + FOOTER_CANVAS_HEIGHT

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const list = ordersListRef.current

      if (!list) {
        setMeasuredPageHeight(MO_PAGE_HEIGHT)
        return
      }

      setMeasuredPageHeight(Math.max(MO_PAGE_HEIGHT, list.offsetTop + list.offsetHeight + MO_ORDER_LIST_BOTTOM_SPACE))
    })

    return () => window.cancelAnimationFrame(frame)
  }, [activeTab, orders.length])

  const handleConfirmCancel = () => {
    if (!cancelTarget) {
      return
    }

    setUpcomingOrders((current) => current.filter((order) => order.id !== cancelTarget.id))
    setCancelTarget(null)
  }

  return (
    <div className="MO-shell">
      <div
        className="MO-scale-frame"
        style={{
          width: `${MO_BASE_WIDTH * pageScale}px`,
          height: `${canvasHeight * pageScale}px`,
        }}
      >
        <div
          className="MO-scale-content"
          style={{ height: `${canvasHeight}px`, transform: `scale(${pageScale})` }}
        >
          <main className="MO-page" style={{ minHeight: `${pageHeight}px` }}>
            <Navbar logoSrc={logoCircleImg} currentPage="my-orders" />

            <button
              type="button"
              className="MO-back"
              aria-label="Go back"
              onClick={() => navigateBack()}
            >
              <IoChevronBack aria-hidden="true" />
            </button>

            <header className="MO-hero">
              <div className="MO-hero-title-wrap">
                <h1 className="MO-title">My Orders</h1>
                <span className="MO-title-line" aria-hidden="true" />
              </div>
              <p className="MO-description">
                View and manage your quotation requests, track order progress, and stay updated on every stage of
                your apparel production.
              </p>
            </header>

            <div className="MO-toolbar">
              <div className="MO-tabs" role="tablist" aria-label="Order categories">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'upcoming'}
                  className={`MO-tab${activeTab === 'upcoming' ? ' MO-tab-active' : ''}`}
                  onClick={() => setActiveTab('upcoming')}
                >
                  Upcoming Orders ({upcomingCount})
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'previous'}
                  className={`MO-tab${activeTab === 'previous' ? ' MO-tab-active' : ''}`}
                  onClick={() => setActiveTab('previous')}
                >
                  Previous Orders ({previousCount})
                </button>
              </div>

              <div className="MO-sort">
                <span className="MO-sort-label">
                  <FaFilter className="MO-sort-icon" aria-hidden="true" />
                  Sort By:
                </span>
                <button type="button" className="MO-sort-select" aria-label="Sort by date">
                  <span>Date</span>
                  <span className="MO-sort-chevron" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div className="MO-orders-list" ref={ordersListRef}>
              {orders.length ? (
                orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onDetailsRequest={(selected) => {
                      setCancelTarget(null)
                      setDetailTarget(selected)
                    }}
                    onCancelRequest={(selected) => {
                      setDetailTarget(null)
                      setCancelTarget(selected)
                    }}
                  />
                ))
              ) : (
                <p className="MO-empty">You don&apos;t have any orders in this tab yet.</p>
              )}
            </div>
          </main>
          <Footer logoSrc={wLogo} />
        </div>
      </div>

      {detailTarget ? (
        <OrderDetailModal order={detailTarget} onClose={() => setDetailTarget(null)} />
      ) : null}

      {cancelTarget ? (
        <CancelOrderModal
          order={cancelTarget}
          onClose={() => setCancelTarget(null)}
          onConfirm={handleConfirmCancel}
        />
      ) : null}
    </div>
  )
}
