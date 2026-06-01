import { useEffect, useState, useCallback } from 'react'
import logoImg from '../assets/Logo Sorbetes.jpg'
import {
  ensureFoundersClubAccount,
  getPostAuthPath,
  loginUser,
  registerUser,
} from '../utils/auth.js'
import { navigateBack } from '../utils/navigation.js'
import '../design/Login.css'
import '../design/Register.css'
import '../design/Auth.css'

const POLICY_TABS = [
  {
    id: 'terms',
    label: 'Terms and Condition',
    title: '1. Terms and Condition',
    sections: [
      {
        heading: '1.1 INTRODUCTION',
        body:
          'These Terms & Conditions govern the use of the Sorbetes Apparel Website and the purchase of products from Sorbetes Apparel Studio by businesses and business partners only. Certain provisions of these Terms & Conditions may differ for international or foreign business partners. By registering for an account or placing an order with us, you confirm that you are acting in a business or commercial capacity and not as a consumer.',
      },
      {
        heading: '1.2 ACCOUNT REGISTRATION',
        body: '',
        bullets: [
          '1.2.1 One account per business entity. Individuals may only act as authorized representatives of that entity.',
          "1.2.2 Business partners are to be responsible in regards to their account's credentials.",
          '1.2.3 Business partners are to avoid exploiting the website to prevent system errors which may result in faulty transactions.',
        ],
      },
      {
        heading: '1.3 ORDERS & ACCEPTANCE',
        body:
          "All orders are subject to the seller's approval and will not be considered accepted until confirmed by the seller. Orders can only be cancelled before order production starts.",
      },
      {
        heading: '1.4 PRICING & TAXES',
        body:
          'Pricing is negotiated in transaction details dependent on several factors such as quantity, materials used, production time, etc.. Prices do not include foreign import taxes or additional fees due to international orders unless stated and the business partner is to be fully responsible in regards to it.',
      },
      {
        heading: '1.5 PAYMENT TERMS',
        body:
          'Payment terms are governed by the Payment Policy. Failure to comply may result in order delays, suspension, or account termination.',
      },
      {
        heading: '1.6 PRODUCTION & LEAD TIMES',
        body:
          'Estimation of order completion details may be discussed during the ordering process to give transparency in production time.',
      },
      {
        heading: '1.7 SHIPPING & RISK',
        body: 'Risk of loss transfers to the courier upon handover for delivery.',
      },
      {
        heading: '1.8 INSPECTION & CLAIMS',
        body:
          'Business partners must inspect the products after being received. Claims for defects must be reported within 1 week after being received by the business partner.',
      },
      {
        heading: '1.9 INTELLECTUAL PROPERTY',
        body:
          'All designs, trademarks, images, and content given by the business partner will remain the property of the business partner. By giving the resources for the design, the business partner consents to permitting the seller to use their design for the production of their order and may not be used further without written consent after the order has been fulfilled.',
      },
      {
        heading: '1.10 LIMITATION OF LIABILITY',
        body:
          "To the fullest extent permitted by applicable law, the seller's liability is limited to the value of the products purchased. The seller does not bear liability for matters unrelated to the manufacturing quality of the products",
      },
      {
        heading: '1.11 GOVERNING LAW',
        body:
          'These Terms are governed by the laws of the Republic of the Philippines, without regard to conflict of law principles',
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    title: '2. Privacy Policy',
    sections: [
      {
        heading: '2.1 INFORMATION COLLECTED',
        body:
          'Full Name, Brand Name, Address, Contact Number, Email Address, Delivery Address and Design Specifications e.g. size, color, type.',
      },
      {
        heading: '2.2 HOW INFORMATION IS USED',
        body:
          'Information collected will be used for processing orders, managing accounts, communication with business partners and to comply with legal obligations.',
      },
      {
        heading: '2.3 DATA SHARING',
        body: 'We may share collected information to: Logistics Provider, Payment Processors, Legal Authorities when required.',
      },
      {
        heading: '2.4 DATA PROTECTION',
        body: 'lorem ipsum',
      },
      {
        heading: '2.5 USER RIGHTS',
        body:
          'Users may request access, correction, or deletion of data in accordance with the Philippine Data Privacy Act of 2012.',
      },
      {
        heading: '2.6 POLICY UPDATES',
        body: 'This Privacy Policy may be updated without prior notice.',
      },
    ],
  },
  {
    id: 'payment',
    label: 'Payment Policy',
    title: '3. Payment Policy',
    sections: [
      {
        heading: '3.1 ACCEPTED PAYMENT METHODS',
        body: 'Accepted payment methods include:',
        bullets: ['3.1.1 Paymaya', '3.1.2 GCash', '3.1.3 BDO', '3.1.4 Paypal'],
      },
      {
        heading: '3.2 PAYMENT TERMS',
        body:
          'Creation of a sample requires an upfront payment (PHP 1,000). After confirming the quality of the sample, payment of 60% of the total amount is required before starting production with the remaining 40% to be paid after production. The currency primarily used for payment is Philippine Peso or United States Dollars (USD).',
      },
    ],
  },
  {
    id: 'delivery',
    label: 'Delivery Policy',
    title: '4. Delivery Policy',
    sections: [
      {
        heading: '4.1 SHIPPING COVERAGE',
        body:
          'Shipping coverage is dependent on the availability of the assigned third-party courier e.g., Lalamove, Transportify Grab Express.',
      },
      {
        heading: '4.2 PROCESSING & LEAD TIME',
        body:
          'Delivery time estimation is entirely dependent on the courier handling the delivery and is not influenced by the seller.',
      },
      {
        heading: '4.3 SHIPPING COSTS',
        body:
          'The shipping cost is to be fully paid by the business partner. Any additional fees to the shipping is to be paid by the business partner.',
      },
      {
        heading: '4.4 RISKS & OWNERSHIP',
        body:
          'Risks and responsibilities of the products are transferred to the courier once it has been handed.',
      },
    ],
  },
  {
    id: 'refund',
    label: 'Refund & Return Policy',
    title: '5. Refund & Return Policy',
    sections: [
      {
        heading: '5.1 NO REFUND FOR CUSTOM ORDERS',
        body: 'No refunds will be issued once:',
        bullets: [
          '5.1.1 Design/Mockup has been approved and/or production has started (e.g., printing, cutting, sewing, embroidery, etc.).',
        ],
      },
      {
        heading: '5.2 CANCELLATION POLICY',
        body:
          'Before production starts, orders may be cancelled and payment is refundable. The refunded amount will be based on the current progress made such as design completion and processing costs. After production has started, cancellation is no longer allowed and payments become non-refundable.',
      },
      {
        heading: '5.3 DOWNPAYMENT/RESERVATION FEE',
        body:
          'All downpayments and reservations are NON-REFUNDABLE. These are used to cover the materials, labor & production scheduling. This is applied even if production is not yet completed.',
      },
      {
        heading: '5.4 REFUND PROCESSING & TRANSFER FEES',
        body:
          'For approved refunds, all bank, e-wallet, or payment gateway fees such as transfer fees, services charges & processing fees shall be deducted from the refundable amount. The business partner will receive the net amount after the deductions. Sorbetes Apparel Studio is not liable for third-party transfer charges.',
      },
      {
        heading: '5.5 NO REFUNDS FOR CLIENT-CAUSED DELAYS',
        body: 'No refunds will be issued for delays caused by:',
        bullets: [
          '5.5.1 Late design approval',
          '5.5.2 Incomplete or incorrect order details',
          '5.5.3 Late balance payment',
          '5.5.4 Client-requested changes',
        ],
      },
      {
        heading: '5.6 FINAL OUTPUT BASED ON APPROVED MOCKUP',
        body: 'The approved mockup/sample serves as the final reference. No refunds will be granted for:',
        bullets: [
          '5.6.1 Color perception differences',
          '5.6.2 Size expectations differing from approved specs',
          '5.6.3 Changes in preference after approval',
        ],
      },
      {
        heading: '5.7 OVERRUNS & UNDERRUNS',
        body:
          'A standard industry tolerance of ±3–5% may apply to bulk orders. Minor shortages or excess within this range are not refundable.',
      },
      {
        heading: '5.8 CLIENT-SUPPLIED MATERIALS',
        body:
          'There are no refunds/replacement for client-supplied shirts/materials should they be damaged during production.',
      },
      {
        heading: '5.9 ERRORS & DEFECTS (FROM OUT SIDE)',
        body:
          "Rework or replacement will be provided if the output does not match approved mockup/sample's design, size or color and must be reported within 48 hours of receipt. Partial defects do not qualify for a full order refund.",
      },
      {
        heading: '5.10 RUSH ORDERS & SPECIAL REQUESTS',
        body:
          'Orders with rush fees, special fabrics and inks (puff, high-density, glow, metallic) used are strictly non-refundable.',
      },
      {
        heading: '5.11 UNCLAIMED ORDERS',
        body: 'Orders must be claimed within 30 days after production. No refunds will be issued for unclaimed orders. Unclaimed orders may be:',
        bullets: ['5.11.1 Subject to storage fees', '5.11.2 Considered abandoned and disposed of'],
      },
      {
        heading: '5.12 FORCE MAJEURE',
        body:
          'No refunds will be granted for delays caused by events beyond our control, including but not limited to:',
        bullets: [
          '5.12.1 Power Outages',
          '5.12.2 Supplier Delays',
          '5.12.3 Natural Disasters',
          '5.12.4 Government Restrictions',
        ],
      },
      {
        heading: '5.13 AGREEMENT',
        body:
          'By confirming an order, approving the design, and sending payment, the business partner fully agrees to and accepts all terms stated above.',
      },
    ],
  },
]

function Auth() {
  const [isSignUp, setIsSignUp] = useState(() => new URLSearchParams(window.location.search).get('mode') === 'signup')
  const [returnPhase, setReturnPhase] = useState('idle') // 'idle' | 'off'
  const [loginShowPassword, setLoginShowPassword] = useState(false)
  const [registerShowPassword, setRegisterShowPassword] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')
  const [policyOpen, setPolicyOpen] = useState(false)
  const [activePolicyTab, setActivePolicyTab] = useState(POLICY_TABS[0].id)

  useEffect(() => {
    ensureFoundersClubAccount()
  }, [])

  const goAfterAuth = () => {
    const path = getPostAuthPath()
    window.history.pushState({}, '', path)
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const goToForgotPassword = () => {
    window.history.pushState({}, '', '?page=forgot-password')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const handleLogin = () => {
    setAuthError('')
    setAuthSuccess('')
    const result = loginUser(loginEmail, loginPassword)

    if (!result.ok) {
      setAuthError(result.error)
      return
    }

    goAfterAuth()
  }

  const handleRegister = () => {
    setAuthError('')
    setAuthSuccess('')
    const result = registerUser({
      firstName,
      lastName,
      username,
      email: registerEmail,
      password: registerPassword,
    })

    if (!result.ok) {
      setAuthError(result.error)
      return
    }

    setAuthSuccess('Registration successful. You can now log in with your email or username.')
    setLoginEmail(registerEmail || username)
    setLoginPassword('')
    setRegisterPassword('')
    setIsSignUp(false)
    setReturnPhase('idle')
  }

  const handleSignUpClick = () => {
    setAuthError('')
    setAuthSuccess('')
    setIsSignUp(true)
  }

  const handleLogInClick = useCallback(() => {
    setAuthError('')
    setAuthSuccess('')
    setReturnPhase('off')
  }, [])

  const activePolicy = POLICY_TABS.find((tab) => tab.id === activePolicyTab) ?? POLICY_TABS[0]

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
            <button type="button" className="register-back-button" aria-label="Go back" onClick={() => navigateBack()}>
              <span className="register-back-icon" />
            </button>
            <div className="register-form-wrapper">
              <div className="register-heading-group">
                <h2 className="register-title">Sign up</h2>
                <p className="register-subtitle">Get started with your first collection.</p>
              </div>
              {authError && isSignUp ? <p className="auth-form-error">{authError}</p> : null}
              <div className="register-fields-group">
                <div className="register-name-row">
                  <div className="register-field-group">
                    <label className="register-label" htmlFor="firstName">First Name</label>
                    <div className="register-input-wrapper">
                      <input
                        id="firstName"
                        type="text"
                        className="register-input"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      />
                    </div>
                  </div>
                  <div className="register-field-group">
                    <label className="register-label" htmlFor="lastName">Last Name</label>
                    <div className="register-input-wrapper">
                      <input
                        id="lastName"
                        type="text"
                        className="register-input"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="register-field-group">
                  <label className="register-label" htmlFor="reg-username">Username</label>
                  <div className="register-input-wrapper">
                    <input
                      id="reg-username"
                      type="text"
                      className="register-input"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(event) => setUsername(event.target.value)}
                    />
                  </div>
                </div>
                <div className="register-field-group">
                  <label className="register-label" htmlFor="reg-email">Email</label>
                  <div className="register-input-wrapper">
                    <input
                      id="reg-email"
                      type="email"
                      className="register-input"
                      placeholder="Enter your email"
                      value={registerEmail}
                      onChange={(event) => setRegisterEmail(event.target.value)}
                    />
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
                      value={registerPassword}
                      onChange={(event) => setRegisterPassword(event.target.value)}
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
              <button type="button" className="register-submit" onClick={handleRegister}>
                <span className="register-submit-label">Sign Up</span>
              </button>
              <p className="register-terms">
                By creating an account, you agree to our{' '}
                <button type="button" className="register-link-button" onClick={() => setPolicyOpen(true)}>
                  Terms & Privacy Policy
                </button>
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
          <button type="button" className="login-back-button" aria-label="Go back" onClick={() => navigateBack()}>
            <span className="login-back-icon" />
          </button>
          <div className="login-form-wrapper">
            <div className="login-heading-group">
              <h2 className="login-title">Log in</h2>
              <p className="login-subtitle">Let's keep your shelves fresh.</p>
            </div>
            {authSuccess && !isSignUp ? <p className="auth-form-success">{authSuccess}</p> : null}
            {authError && !isSignUp ? <p className="auth-form-error">{authError}</p> : null}
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
                <input
                  id="email"
                  type="text"
                  className="login-input"
                  placeholder="Enter your e-mail or username"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleLogin()
                  }}
                />
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
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') handleLogin()
                  }}
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
              <button type="button" className="login-link-button" onClick={goToForgotPassword}>
                Forgot password?
              </button>
            </div>
            <button type="button" className="login-submit" onClick={handleLogin}>
              <span className="login-submit-label">Log in</span>
            </button>
          </div>
        </div>
      </div>

      {policyOpen && (
        <div className="auth-policy-overlay" role="presentation">
          <article className="auth-policy-modal" role="dialog" aria-modal="true" aria-labelledby="auth-policy-title">
            <div className="auth-policy-header">
              <div className="auth-policy-brand">
                <img src={logoImg} alt="" />
                <span>SORBETES</span>
              </div>
              <button
                type="button"
                className="auth-policy-close"
                aria-label="Close Terms and Privacy Policy"
                onClick={() => setPolicyOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="auth-policy-disclaimer">
              <strong>Disclaimer:</strong> Sorbetes Apparel is intended only for business transactions for ordering
              customized clothing and does not bear any liability in other irrelevant and inconsequential matters such as
              business losses, indirect damages or expectations brought by the products. The seller is not responsible
              for any products that do not meet the business partner&apos;s expectations unless said products contain
              defects that are proven to be entirely the fault of our manufacturing process.
            </div>

            <div className="auth-policy-scroll">
              <h2 id="auth-policy-title">{activePolicy.title}</h2>
              {activePolicy.sections.map((section) => (
                <section key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.body ? <p>{section.body}</p> : null}
                  {section.bullets ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <div className="auth-policy-tabs" role="tablist" aria-label="Policy sections">
              {POLICY_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={tab.id === activePolicyTab ? 'auth-policy-tab auth-policy-tab-active' : 'auth-policy-tab'}
                  onClick={() => setActivePolicyTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <p className="auth-policy-agreement">
              By clicking &quot;Agree&quot;, you agree to our <button type="button">Terms and Conditions</button>. We
              collect, use, and share your information in accordance with our{' '}
              <button type="button">Privacy Policy</button>.
            </p>

            <div className="auth-policy-actions">
              <button type="button" className="auth-policy-cancel" onClick={() => setPolicyOpen(false)}>
                Cancel
              </button>
              <button type="button" className="auth-policy-agree" onClick={() => setPolicyOpen(false)}>
                Agree
              </button>
            </div>
          </article>
        </div>
      )}
    </div>
  )
}

export default Auth
