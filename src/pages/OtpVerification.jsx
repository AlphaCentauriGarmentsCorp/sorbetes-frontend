import { useMemo, useRef, useState } from 'react'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import '../design/OtpVerification.css'

const OTP_LENGTH = 6

function OtpVerification() {
  const [digits, setDigits] = useState(() => Array.from({ length: OTP_LENGTH }, () => ''))
  const inputsRef = useRef([])

  const otpValue = useMemo(() => digits.join(''), [digits])

  const focusIndex = (index) => {
    const el = inputsRef.current[index]
    if (el) el.focus()
  }

  const handleDigitChange = (index, rawValue) => {
    const cleaned = rawValue.replace(/\D/g, '').slice(0, 1)

    setDigits((prev) => {
      const next = [...prev]
      next[index] = cleaned
      return next
    })

    if (cleaned && index < OTP_LENGTH - 1) focusIndex(index + 1)
  }

  const handleDigitKeyDown = (index, e) => {
    if (e.key !== 'Backspace') return

    if (!digits[index] && index > 0) {
      setDigits((prev) => {
        const next = [...prev]
        next[index - 1] = ''
        return next
      })
      focusIndex(index - 1)
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const text = e.clipboardData.getData('text') || ''
    const cleaned = text.replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!cleaned) return

    setDigits(() => Array.from({ length: OTP_LENGTH }, (_, i) => cleaned[i] || ''))

    const lastIndex = Math.min(cleaned.length - 1, OTP_LENGTH - 1)
    focusIndex(Math.max(lastIndex, 0))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // No verification function yet (UI only).
    console.log('OTP submit:', otpValue)
  }

  const handleBack = () => {
    if (window.history.length > 0) window.history.back()
  }

  return (
    <div className="otp-page">
      <div className="otp-left" aria-hidden="true">
        <div className="otp-left-gradient" />
        <div className="otp-left-header">
          <img src={logoCircleImg} alt="" className="otp-logo-circle" />
          <span className="otp-brand">SORBETES</span>
          <span className="otp-since">SINCE 2002</span>
        </div>

        <div className="otp-left-text">
          <h1 className="otp-left-title">Let&apos;s Build your brand.</h1>
          <p className="otp-left-subtitle">Turn your ideas into wearable stories</p>
        </div>
      </div>

      <div className="otp-right">
        <button type="button" className="otp-back-button" onClick={handleBack} aria-label="Back">
          <span className="otp-back-icon" />
        </button>

        <div className="otp-form-wrapper">
          <h2 className="otp-title">OTP Verification</h2>
          <p className="otp-subtitle">
            Please enter the OTP (One-Time Password) sent to your registered email <strong>(je.de@gl.c*m)</strong> to
            complete your verification.
          </p>

          <form className="otp-form" onSubmit={handleSubmit}>
            <div className="otp-digits-row">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputsRef.current[index] = el
                  }}
                  className={`otp-digit ${index === OTP_LENGTH - 1 ? 'otp-digit-last' : ''}`}
                  value={digit}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  inputMode="numeric"
                  autoComplete={index === 0 ? 'one-time-code' : 'off'}
                  aria-label={`OTP digit ${index + 1}`}
                />
              ))}
            </div>

            <div className="otp-resend-row">
              <button type="button" className="otp-resend-button">
                Didn&apos;t got the code? <span className="otp-resend-underlined">Resend in 30s</span>
              </button>
            </div>

            <button type="submit" className="otp-verify-button">
              <span className="otp-verify-label">Verify</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification

