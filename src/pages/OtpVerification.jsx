import { useEffect, useMemo, useRef, useState } from 'react'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import { navigate, navigateBack } from '../utils/navigation.js'
import { verifyOtp, resendOtp, getPostAuthPath } from '../utils/auth.js'
import '../design/OtpVerification.css'

const OTP_LENGTH = 6
const RESEND_SECONDS = 30

function OtpVerification() {
  const [email] = useState(() => new URLSearchParams(window.location.search).get('email') || '')
  const [digits, setDigits] = useState(() => Array.from({ length: OTP_LENGTH }, () => ''))
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const inputsRef = useRef([])

  const otpValue = useMemo(() => digits.join(''), [digits])

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const timer = setInterval(() => {
      setCooldown((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [cooldown])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setError('')

    if (otpValue.length < OTP_LENGTH) {
      setError('Please enter the 6-digit code.')
      return
    }

    setSubmitting(true)
    const result = await verifyOtp(email, otpValue)
    if (!result.ok) {
      setError(result.error)
      setSubmitting(false)
      return
    }

    navigate(getPostAuthPath())
  }

  const handleResend = async () => {
    if (cooldown > 0 || resending) return
    setError('')
    setResending(true)
    const result = await resendOtp(email)
    setResending(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setCooldown(RESEND_SECONDS)
  }

  const handleBack = () => {
    navigateBack('?page=auth')
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
            Please enter the OTP (One-Time Password) sent to your registered email{' '}
            <strong>{email || 'your email'}</strong> to complete your verification.
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

            {error ? (
              <p className="otp-error" role="alert" style={{ color: '#c0392b', margin: '4px 0 0' }}>
                {error}
              </p>
            ) : null}

            <div className="otp-resend-row">
              <button
                type="button"
                className="otp-resend-button"
                onClick={handleResend}
                disabled={cooldown > 0 || resending}
              >
                Didn&apos;t get the code?{' '}
                <span className="otp-resend-underlined">
                  {cooldown > 0 ? `Resend in ${cooldown}s` : resending ? 'Sending...' : 'Resend'}
                </span>
              </button>
            </div>

            <button type="submit" className="otp-verify-button" disabled={submitting}>
              <span className="otp-verify-label">{submitting ? 'Verifying...' : 'Verify'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OtpVerification
