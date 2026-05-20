import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { IoArrowBack } from 'react-icons/io5'
import '../design/ForgotPassword.css'
import logoImg from '../assets/Logo Sorbetes.jpg'

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('cursor:navigate'))
}

function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    form.reset()
    setEmailSent(true)
  }

  return (
    <main className="forgot-page">
      <section className="forgot-left" aria-label="Sorbetes brand panel">
        <div className="forgot-left-gradient" />
        <div className="forgot-left-header">
          <div className="forgot-brand-group">
            <img src={logoImg} alt="Sorbetes" />
            <span>SORBETES</span>
          </div>
          <span className="forgot-since">SINCE 2002</span>
        </div>
        <div className="forgot-left-copy">
          <h1>Bring your Ideas to Life.</h1>
          <p>Start your journey with a trusted partner.</p>
        </div>
      </section>

      <section className="forgot-right" aria-labelledby="forgot-title">
        <button
          type="button"
          className="forgot-back-button"
          aria-label="Back to login"
          onClick={() => navigate('?page=auth')}
        >
          <IoArrowBack aria-hidden="true" />
        </button>

        {emailSent ? (
          <section className="forgot-confirmation" aria-labelledby="forgot-confirmation-title">
            <FaCheckCircle className="forgot-confirmation-icon" aria-hidden="true" />
            <div className="forgot-confirmation-copy">
              <h2 id="forgot-confirmation-title">Email Successfully Sent</h2>
              <p>A secure reset link has been delivered to your email address.</p>
            </div>
            <button type="button" className="forgot-submit" onClick={() => navigate('?page=home')}>
              Back to website
            </button>
          </section>
        ) : (
          <form className="forgot-form" onSubmit={handleSubmit}>
            <div className="forgot-heading">
              <h2 id="forgot-title">Forgot your password?</h2>
              <p>Provide your email and we&apos;ll send you instructions to reset your password.</p>
            </div>

            <label className="forgot-field">
              <span>Email</span>
              <input type="email" placeholder="Enter your e-mail" required />
            </label>

            <button type="submit" className="forgot-submit">
              Send
            </button>
          </form>
        )}
      </section>
    </main>
  )
}

export default ForgotPassword
