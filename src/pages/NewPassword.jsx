import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import '../design/ForgotPassword.css'
import logoImg from '../assets/Logo Sorbetes.jpg'
import { navigateBack } from '../utils/navigation.js'

function NewPassword() {
  const [passwordError, setPasswordError] = useState('')
  const [passwordReset, setPasswordReset] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setPasswordError('')

    const form = event.currentTarget
    const formData = new FormData(form)
    const password = formData.get('newPassword')
    const confirmPassword = formData.get('confirmPassword')

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.')
      return
    }

    form.reset()
    setPasswordReset(true)
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

      <section className="forgot-right" aria-labelledby="new-password-title">
        {passwordReset ? (
          <section className="forgot-confirmation new-password-confirmation" aria-labelledby="new-password-confirmation-title">
            <FaCheckCircle className="forgot-confirmation-icon" aria-hidden="true" />
            <div className="forgot-confirmation-copy">
              <h2 id="new-password-confirmation-title">Password Reset successful</h2>
              <p>You can now log in with your new password.</p>
            </div>
            <button type="button" className="forgot-submit" onClick={() => navigateBack()}>
              Back to website
            </button>
          </section>
        ) : (
          <form className="forgot-form new-password-form" onSubmit={handleSubmit}>
            <div className="forgot-heading">
              <h2 id="new-password-title">Create your new password</h2>
              <p>Enter your new password below to complete the reset process.</p>
            </div>

            {passwordError ? <p className="new-password-error">{passwordError}</p> : null}

            <label className="forgot-field">
              <span>New Password</span>
              <input name="newPassword" type="password" placeholder="Enter new password" minLength="6" required />
            </label>

            <label className="forgot-field">
              <span>Re-enter New Password</span>
              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter new password"
                minLength="6"
                required
              />
            </label>

            <button type="submit" className="forgot-submit">
              Confirm
            </button>
          </form>
        )}
      </section>
    </main>
  )
}

export default NewPassword
