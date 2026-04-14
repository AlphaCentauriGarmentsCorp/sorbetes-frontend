import { useState, useCallback } from 'react'
import logoImg from '../assets/Logo Sorbetes.jpg'
import '../design/Login.css'
import '../design/Register.css'
import '../design/Auth.css'

function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [returnPhase, setReturnPhase] = useState('idle') // 'idle' | 'off'
  const [loginShowPassword, setLoginShowPassword] = useState(false)
  const [registerShowPassword, setRegisterShowPassword] = useState(false)

  const goToHomepage = () => {
    window.location.search = '?page=home'
  }

  const handleSignUpClick = () => setIsSignUp(true)

  const handleLogInClick = useCallback(() => {
    setReturnPhase('off')
  }, [])

  return (
    <div className="auth-page">
      {/* Back layer: Sign up page - [form left] [decorative right] - revealed when left panel slides away */}
      <div className={`auth-signup-layer ${isSignUp && returnPhase !== 'in' ? 'auth-signup-visible' : ''} ${returnPhase === 'off' ? 'auth-signup-transitioning' : ''}`}>
        <div className="auth-signup-inner">
          <div className="register-right auth-signup-form-panel">
            <div className="register-top-link">
              <span>Already have an account? </span>
              <button
                type="button"
                className="register-link-button"
                onClick={handleLogInClick}
              >
                Log in
              </button>
            </div>
            <button type="button" className="register-back-button" aria-label="Back" onClick={goToHomepage}>
              <span className="register-back-icon" />
            </button>
            <div className="register-form-wrapper">
              <div className="register-heading-group">
                <h2 className="register-title">Sign up</h2>
                <p className="register-subtitle">Get started with your first collection.</p>
              </div>
              <div className="register-fields-group">
                <div className="register-name-row">
                  <div className="register-field-group">
                    <label className="register-label" htmlFor="firstName">First Name</label>
                    <div className="register-input-wrapper">
                      <input id="firstName" type="text" className="register-input" placeholder="Enter your first name" />
                    </div>
                  </div>
                  <div className="register-field-group">
                    <label className="register-label" htmlFor="lastName">Last Name</label>
                    <div className="register-input-wrapper">
                      <input id="lastName" type="text" className="register-input" placeholder="Enter your last name" />
                    </div>
                  </div>
                </div>
                <div className="register-field-group">
                  <label className="register-label" htmlFor="reg-email">Email</label>
                  <div className="register-input-wrapper">
                    <input id="reg-email" type="email" className="register-input" placeholder="Enter your email" />
                  </div>
                </div>
                <div className="register-field-group">
                  <label className="register-label" htmlFor="reg-password">Password</label>
                  <div className="register-input-wrapper register-password-wrapper">
                    <input
                      id="reg-password"
                      type={registerShowPassword ? 'text' : 'password'}
                      className="register-input"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="register-eye-button"
                      aria-label={registerShowPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setRegisterShowPassword((prev) => !prev)}
                    >
                      <span className={registerShowPassword ? 'register-eye-icon register-eye-visible' : 'register-eye-icon register-eye-hidden'} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="register-social-group">
                <div className="register-or">or</div>
                <div className="register-social-buttons">
                  <button type="button" className="register-social register-social-google">
                    <span className="register-social-icon google" />
                    <span className="register-social-label">Sign up with Google</span>
                  </button>
                  <button type="button" className="register-social register-social-facebook">
                    <span className="register-social-icon facebook" />
                    <span className="register-social-label">Sign up with Facebook</span>
                  </button>
                </div>
              </div>
              <button type="submit" className="register-submit">
                <span className="register-submit-label">Sign Up</span>
              </button>
              <p className="register-terms">
                By creating an account, you agree to our{' '}
                <button type="button" className="register-link-button">Terms & Privacy Policy</button>
              </p>
            </div>
          </div>

          <div
            className="register-left auth-signup-decorative"
            onTransitionEnd={(e) => {
              if (e.target === e.currentTarget && e.propertyName === 'transform' && returnPhase === 'off') {
                setIsSignUp(false)
                setReturnPhase('idle')
              }
            }}
          >
            <div className="register-left-gradient" />
            <div className="register-left-header">
              <img src={logoImg} alt="Sorbetes" className="register-header-logo-img" />
              <span className="register-brand">SORBETES</span>
              <span className="register-since">SINCE 2002</span>
            </div>
            <div className="register-left-text">
              <h1 className="register-left-title">Bring your Ideas to Life.</h1>
              <p className="register-left-subtitle">
                Start your journey with a trusted partner.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Front layer: Login - left panel slides right (curtain), right side has login form */}
      <div className={`auth-login-overlay ${isSignUp && returnPhase !== 'off' ? 'auth-login-signup' : ''} ${returnPhase === 'off' ? 'auth-login-returning' : ''}`}>
        {/* This panel slides to the right to reveal sign up behind it */}
        <div
          className="auth-login-left-panel login-left"
        >
          <div className="login-left-gradient" />
          <div className="login-left-header">
            <img src={logoImg} alt="Sorbetes" className="login-header-logo-img" />
            <span className="login-brand">SORBETES</span>
            <span className="login-since">SINCE 2002</span>
          </div>
          <div className="login-left-text">
            <h1 className="login-left-title">Let's Build your brand.</h1>
            <p className="login-left-subtitle">
              Turn your ideas into wearable stories
            </p>
          </div>
        </div>

        {/* Login form - hides when sign up to reveal sign up decorative on right */}
        <div className="auth-login-form-panel login-right">
          <div className="login-top-link">
            <span>Don't have an account? </span>
            <button
              type="button"
              className="login-link-button"
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </div>
          <button type="button" className="login-back-button" aria-label="Back" onClick={goToHomepage}>
            <span className="login-back-icon" />
          </button>
          <div className="login-form-wrapper">
            <div className="login-heading-group">
              <h2 className="login-title">Log in</h2>
              <p className="login-subtitle">Let's keep your shelves fresh.</p>
            </div>
            <div className="login-social-group">
              <button type="button" className="login-social login-social-google">
                <span className="login-social-icon google" />
                <span className="login-social-label">Continue with Google</span>
              </button>
              <button type="button" className="login-social login-social-facebook">
                <span className="login-social-icon facebook" />
                <span className="login-social-label">Continue with Facebook</span>
              </button>
              <div className="login-or">or</div>
            </div>
            <div className="login-field-group">
              <label className="login-label" htmlFor="email">E-mail or username</label>
              <div className="login-input-wrapper">
                <input id="email" type="text" className="login-input" placeholder="Enter your e-mail or username" />
              </div>
            </div>
            <div className="login-field-group">
              <label className="login-label" htmlFor="password">Password</label>
              <div className="login-input-wrapper login-password-wrapper">
                <input
                  id="password"
                  type={loginShowPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="login-eye-button"
                  aria-label={loginShowPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setLoginShowPassword((prev) => !prev)}
                >
                  <span className={loginShowPassword ? 'login-eye-icon login-eye-visible' : 'login-eye-icon login-eye-hidden'} />
                </button>
              </div>
            </div>
            <div className="login-remember-forgot">
              <label className="login-remember">
                <span className="login-checkbox" />
                <span className="login-remember-text">Remember me</span>
              </label>
              <button type="button" className="login-link-button">Forgot password?</button>
            </div>
            <button type="submit" className="login-submit">
              <span className="login-submit-label">Log in</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
