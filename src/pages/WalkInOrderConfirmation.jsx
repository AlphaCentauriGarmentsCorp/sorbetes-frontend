import { useEffect } from 'react'
import { FaCheck } from 'react-icons/fa6'
import Footer from './Footer.jsx'
import '../design/WalkInOrderConfirmation.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import {
  clearWalkInConfirmation,
  getWalkInConfirmation,
  navigateWalkInStep,
} from '../utils/walkInAccess.js'

function DetailRow({ label, value }) {
  return (
    <div className="wic-detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

export default function WalkInOrderConfirmation() {
  const confirmation = getWalkInConfirmation()

  useEffect(() => {
    if (!confirmation) {
      navigateWalkInStep('garment')
    }
  }, [confirmation])

  if (!confirmation) {
    return null
  }

  const handleDone = () => {
    clearWalkInConfirmation()
    navigateWalkInStep('garment')
  }

  return (
    <div className="wic-page wif-light-scope">
      <header className="wic-topbar">
        <a
          className="wic-brand"
          href="?page=walk-in&step=garment"
          onClick={(event) => {
            event.preventDefault()
            handleDone()
          }}
        >
          <img src={logoCircleImg} alt="" />
          <span>SORBETES</span>
        </a>
      </header>

      <main className="wic-main">
        <section className="wic-card" aria-labelledby="wic-title">
          <div className="wic-card-top">
            <div className="wic-success-icon" aria-hidden="true">
              <FaCheck />
            </div>

            <div className="wic-heading-block">
              <h1 id="wic-title">Order Submitted</h1>
              <p>
                Sample production takes 1–2 weeks. Thank you for trusting Sorbetes Apparel Studio!
              </p>
            </div>
          </div>

          <div className="wic-details">
            <DetailRow label="Ref. Number" value={confirmation.refNumber} />
            <DetailRow label="Payment Time" value={confirmation.paymentTime} />
            <DetailRow label="Payment Method" value={confirmation.paymentMethod} />
            <DetailRow label="Sender Name" value={confirmation.senderName} />
          </div>

          <div className="wic-amount-row">
            <span>Amount</span>
            <strong>{confirmation.amount}</strong>
          </div>
        </section>

        <button type="button" className="wic-done-btn" onClick={handleDone}>
          Done
        </button>
      </main>

      <Footer logoSrc={logoCircleImg} />
    </div>
  )
}
