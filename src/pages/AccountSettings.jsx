import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaExclamation, FaPen, FaUser } from 'react-icons/fa'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import '../design/AccountSettings.css'
import { FOOTER_CANVAS_HEIGHT } from '../constants/layout.js'
import { getCurrentUser, updateCurrentUser } from '../utils/auth.js'
import { navigateToPage } from '../utils/navigation.js'

const SAVE_TOAST_DURATION_MS = 5000

const AS_BASE_WIDTH = 1920
const AS_PAGE_HEIGHT = 1412
const AS_BASE_HEIGHT = AS_PAGE_HEIGHT + FOOTER_CANVAS_HEIGHT

const PROFILE_NAV = [
  { key: 'account', label: 'Account' },
  { key: 'address', label: 'Address' },
  { key: 'password', label: 'Password' },
  { key: 'founders-club', label: "Sorbetes Founder's Club", page: 'founders-club' },
  { key: 'rewards', label: 'Rewards' },
]

const DEFAULT_PROFILE = {
  firstName: 'Abdul Aziz',
  lastName: 'De Borja',
  email: 'abdulazizdeborja@gmail.com',
  phone: '0912345679812',
}

const PROFILE_TEXT_FIELDS = ['firstName', 'lastName', 'email', 'phone']

const DEFAULT_ADDRESS = {
  street: '117 Mother Ignacia',
  city: 'Quezon',
  province: 'Manila',
  postalCode: '1240',
  country: 'Philippines',
  preferredCourier: 'Lalamove',
  shippingMethod: 'By Land',
  receiverName: 'Abdul Aziz',
  receiverContact: '0912345679812',
}

const LOCATION_FIELDS = ['street', 'city', 'province', 'postalCode', 'country']

const COURIER_FIELDS = ['preferredCourier', 'shippingMethod', 'receiverName', 'receiverContact']

const ADDRESS_TEXT_FIELDS = [...LOCATION_FIELDS, ...COURIER_FIELDS]

function getFieldErrors(values, keys) {
  const errors = {}

  keys.forEach((key) => {
    if (!String(values[key] ?? '').trim()) {
      errors[key] = true
    }
  })

  return errors
}

function getProfileFieldErrors(profile) {
  return getFieldErrors(profile, PROFILE_TEXT_FIELDS)
}

function resolveShippingValues(address) {
  if (address.sameAsProfile !== false) {
    return pickLocationFields(address)
  }

  return pickLocationFields(address.shipping || address)
}

function getAddressFieldErrors(address) {
  const errors = getFieldErrors(address, ADDRESS_TEXT_FIELDS)

  if (address.sameAsProfile === false) {
    const shipping = resolveShippingValues(address)

    LOCATION_FIELDS.forEach((key) => {
      if (!String(shipping[key] ?? '').trim()) {
        errors[`shipping-${key}`] = true
      }
    })
  }

  return errors
}

function getAccountScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / AS_BASE_WIDTH, 0.18), 1)
}

function getInitialProfile() {
  const user = getCurrentUser()
  if (!user) {
    return { ...DEFAULT_PROFILE, avatarUrl: '' }
  }

  return {
    firstName: user.firstName || DEFAULT_PROFILE.firstName,
    lastName: user.lastName || DEFAULT_PROFILE.lastName,
    email: user.email || DEFAULT_PROFILE.email,
    phone: user.phone || DEFAULT_PROFILE.phone,
    avatarUrl: user.avatarUrl || '',
  }
}

function pickLocationFields(saved = {}) {
  return LOCATION_FIELDS.reduce((accumulator, key) => {
    accumulator[key] = saved[key] || DEFAULT_ADDRESS[key]
    return accumulator
  }, {})
}

function pickCourierFields(saved = {}) {
  return COURIER_FIELDS.reduce((accumulator, key) => {
    accumulator[key] = saved[key] || DEFAULT_ADDRESS[key]
    return accumulator
  }, {})
}

function getInitialAddress() {
  const user = getCurrentUser()
  const saved = user?.address || {}
  const location = pickLocationFields(saved)
  const sameAsProfile = saved.sameAsProfile ?? true
  const shipping = sameAsProfile
    ? { ...location }
    : pickLocationFields(saved.shipping || saved)

  return {
    ...location,
    ...pickCourierFields(saved),
    sameAsProfile,
    shipping,
  }
}

function EditableField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  hasError = false,
  fullWidth = false,
  disabled = false,
}) {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  return (
    <div className={`AS-field${fullWidth ? ' AS-field-full' : ''}`}>
      <label className="AS-field-label" htmlFor={id}>
        {label}
      </label>
      <div
        className={`AS-field-input-wrap${editing && !disabled ? ' AS-field-input-wrap-editing' : ''}${
          hasError ? ' AS-field-input-wrap-error' : ''
        }${disabled ? ' AS-field-input-wrap-disabled' : ''}`}
      >
        <input
          id={id}
          ref={inputRef}
          className="AS-field-input"
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          readOnly={disabled || !editing}
          disabled={disabled}
          aria-invalid={hasError}
          onBlur={() => setEditing(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              setEditing(false)
            }
          }}
        />
        {!disabled ? (
          <button
            type="button"
            className="AS-field-edit"
            aria-label={`Edit ${label}`}
            onClick={() => setEditing((open) => !open)}
          >
            <FaPen aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default function AccountSettings() {
  const [pageScale, setPageScale] = useState(() => getAccountScale())
  const [profile, setProfile] = useState(getInitialProfile)
  const [address, setAddress] = useState(getInitialAddress)
  const [activeSection, setActiveSection] = useState('account')
  const [toast, setToast] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const fileInputRef = useRef(null)
  const toastTimerRef = useRef(null)
  const displayFirstName = profile.firstName || 'Guest'

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getAccountScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    setAddress((current) => {
      if (current.sameAsProfile !== false || current.shipping) {
        return current
      }

      return { ...current, shipping: pickLocationFields(current) }
    })
  }, [])

  const handleProfileChange = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }))
    if (fieldErrors[key]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[key]
        return next
      })
    }
  }

  const handleAddressChange = (key, value) => {
    setAddress((current) => {
      const next = { ...current, [key]: value }

      if (current.sameAsProfile && LOCATION_FIELDS.includes(key)) {
        next.shipping = { ...current.shipping, [key]: value }
      }

      return next
    })

    if (fieldErrors[key]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[key]
        return next
      })
    }
  }

  const handleShippingChange = (key, value) => {
    setAddress((current) => ({
      ...current,
      sameAsProfile: false,
      shipping: { ...resolveShippingValues(current), [key]: value },
    }))

    const errorKey = `shipping-${key}`
    if (fieldErrors[errorKey]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[errorKey]
        return next
      })
    }
  }

  const handleSameAsProfileChange = (checked) => {
    setAddress((current) => {
      const next = { ...current, sameAsProfile: checked }

      if (checked) {
        next.shipping = LOCATION_FIELDS.reduce((accumulator, key) => {
          accumulator[key] = current[key]
          return accumulator
        }, {})
      } else if (!current.shipping) {
        next.shipping = pickLocationFields(current)
      }

      return next
    })

    setFieldErrors((current) => {
      const next = { ...current }
      LOCATION_FIELDS.forEach((key) => {
        delete next[`shipping-${key}`]
      })
      return next
    })
  }

  const shippingValues = resolveShippingValues(address)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }

    if (file.size > 15 * 1024 * 1024) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setProfile((current) => ({ ...current, avatarUrl: reader.result }))
      }
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const handleRemoveAvatar = () => {
    setProfile((current) => ({ ...current, avatarUrl: '' }))
  }

  const showToast = (type) => {
    setToast(type)
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current)
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null)
      toastTimerRef.current = null
    }, SAVE_TOAST_DURATION_MS)
  }

  const saveAccount = () => {
    const errors = getProfileFieldErrors(profile)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      showToast('error')
      return
    }

    setFieldErrors({})

    const result = updateCurrentUser({
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      email: profile.email.trim(),
      phone: profile.phone.trim(),
      avatarUrl: profile.avatarUrl,
    })

    if (result.ok) {
      showToast('success')
    }
  }

  const saveAddress = () => {
    const trimmedLocation = LOCATION_FIELDS.reduce((accumulator, key) => {
      accumulator[key] = String(address[key] ?? '').trim()
      return accumulator
    }, {})

    const trimmedCourier = COURIER_FIELDS.reduce((accumulator, key) => {
      accumulator[key] = String(address[key] ?? '').trim()
      return accumulator
    }, {})

    const trimmedShipping = LOCATION_FIELDS.reduce((accumulator, key) => {
      const source = address.sameAsProfile !== false ? trimmedLocation : resolveShippingValues(address)
      accumulator[key] = String(source[key] ?? '').trim()
      return accumulator
    }, {})

    const payload = {
      ...trimmedLocation,
      ...trimmedCourier,
      sameAsProfile: address.sameAsProfile,
      shipping: trimmedShipping,
    }

    const errors = getAddressFieldErrors({
      ...payload,
      shipping: trimmedShipping,
    })

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      showToast('error')
      return
    }

    setFieldErrors({})
    setAddress({
      ...trimmedLocation,
      ...trimmedCourier,
      sameAsProfile: address.sameAsProfile,
      shipping: trimmedShipping,
    })

    const result = updateCurrentUser({ address: payload })

    if (result.ok) {
      showToast('success')
    }
  }

  const handleSave = () => {
    if (activeSection === 'address') {
      saveAddress()
      return
    }

    saveAccount()
  }

  const handleNavClick = (item) => {
    if (item.page) {
      navigateToPage(item.page)
      return
    }

    setActiveSection(item.key)
    setFieldErrors({})
    setToast(null)
  }

  return (
    <div className="AS-shell">
      <div
        className="AS-scale-frame"
        style={{
          width: `${AS_BASE_WIDTH * pageScale}px`,
          height: `${AS_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div
          className="AS-scale-content"
          style={{ height: `${AS_BASE_HEIGHT}px`, transform: `scale(${pageScale})` }}
        >
          <main className="AS-page">
            <Navbar logoSrc={logoCircleImg} currentPage="account-settings" />

            <div className="AS-layout">
              <aside className="AS-sidebar" aria-label="Profile settings">
                <div className="AS-user-card">
                  <span className="AS-user-avatar" aria-hidden="true">
                    <FaUser />
                  </span>
                  <div className="AS-user-greeting">
                    <p className="AS-user-hello">Hello,</p>
                    <p className="AS-user-name">{displayFirstName}</p>
                  </div>
                </div>

                <nav className="AS-side-nav">
                  <p className="AS-side-nav-heading">PROFILE SETTINGS</p>
                  <ul className="AS-side-nav-list">
                    {PROFILE_NAV.map((item) => (
                      <li key={item.key}>
                        <button
                          type="button"
                          className={`AS-side-nav-link${
                            activeSection === item.key ? ' AS-side-nav-link-active' : ''
                          }`}
                          onClick={() => handleNavClick(item)}
                        >
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>

              <section className="AS-panel" aria-label="Account settings">
                {toast ? (
                  <div
                    className={`AS-save-toast${toast === 'error' ? ' AS-save-toast-error' : ''}`}
                    role={toast === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                  >
                    <span
                      className={`AS-save-toast-icon${
                        toast === 'error' ? ' AS-save-toast-icon-error' : ''
                      }`}
                      aria-hidden="true"
                    >
                      {toast === 'error' ? <FaExclamation /> : <FaCheck />}
                    </span>
                    <span
                      className={`AS-save-toast-text${
                        toast === 'error' ? ' AS-save-toast-text-error' : ''
                      }`}
                    >
                      {toast === 'error' ? 'Something went wrong' : 'Changes Saved!'}
                    </span>
                  </div>
                ) : null}
                {activeSection === 'account' ? (
                  <div className="AS-panel-inner">
                    <header className="AS-panel-header">
                      <div className="AS-panel-heading">
                        <h1 className="AS-panel-title">Account</h1>
                        <p className="AS-panel-subtitle">
                          Manage your account details and preferences.
                        </p>
                      </div>
                      <hr className="AS-divider" />
                    </header>

                    <div className="AS-profile-picture-row">
                      <div className="AS-profile-picture-left">
                        <span className="AS-profile-avatar" aria-hidden="true">
                          {profile.avatarUrl ? (
                            <img src={profile.avatarUrl} alt="" />
                          ) : (
                            <FaUser />
                          )}
                        </span>
                        <div className="AS-profile-picture-copy">
                          <p className="AS-profile-picture-title">Profile Picture</p>
                          <p className="AS-profile-picture-hint">PNG, JPG under 15MB</p>
                        </div>
                      </div>
                      <div className="AS-profile-picture-actions">
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          className="AS-file-input"
                          onChange={handleFileChange}
                          tabIndex={-1}
                          aria-hidden="true"
                        />
                        <button type="button" className="AS-btn AS-btn-primary" onClick={handleUploadClick}>
                          Upload profile picture
                        </button>
                        <button
                          type="button"
                          className="AS-btn AS-btn-remove"
                          onClick={handleRemoveAvatar}
                          disabled={!profile.avatarUrl}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <section className="AS-form-section">
                      <h2 className="AS-section-title">Full Name</h2>
                      <div className="AS-field-row">
                        <EditableField
                          id="as-first-name"
                          label="First Name"
                          value={profile.firstName}
                          hasError={Boolean(fieldErrors.firstName)}
                          onChange={(value) => handleProfileChange('firstName', value)}
                        />
                        <EditableField
                          id="as-last-name"
                          label="Last Name"
                          value={profile.lastName}
                          hasError={Boolean(fieldErrors.lastName)}
                          onChange={(value) => handleProfileChange('lastName', value)}
                        />
                      </div>
                    </section>

                    <hr className="AS-divider AS-divider-light" />

                    <section className="AS-form-section">
                      <header className="AS-section-heading">
                        <h2 className="AS-section-title">Contact Information</h2>
                        <p className="AS-section-subtitle">
                          Your primary contact details for communication.
                        </p>
                      </header>
                      <div className="AS-field-row">
                        <EditableField
                          id="as-email"
                          label="Email"
                          type="email"
                          value={profile.email}
                          hasError={Boolean(fieldErrors.email)}
                          onChange={(value) => handleProfileChange('email', value)}
                        />
                        <EditableField
                          id="as-phone"
                          label="Contact Number"
                          type="tel"
                          value={profile.phone}
                          hasError={Boolean(fieldErrors.phone)}
                          onChange={(value) => handleProfileChange('phone', value)}
                        />
                      </div>
                    </section>

                    <div className="AS-save-row">
                      <button type="button" className="AS-btn AS-btn-save" onClick={handleSave}>
                        Save
                      </button>
                    </div>
                  </div>
                ) : activeSection === 'address' ? (
                  <div className="AS-panel-inner AS-panel-inner-address">
                    <header className="AS-panel-header">
                      <div className="AS-panel-heading">
                        <h1 className="AS-panel-title">Address</h1>
                        <p className="AS-panel-subtitle">Manage your location details.</p>
                      </div>
                      <hr className="AS-divider" />
                    </header>

                    <div className="AS-panel-scroll">
                      <div className="AS-address-form">
                        <section className="AS-form-section AS-form-section-tight">
                          <EditableField
                            id="as-street"
                            label="Street"
                            value={address.street}
                            fullWidth
                            hasError={Boolean(fieldErrors.street)}
                            onChange={(value) => handleAddressChange('street', value)}
                          />
                          <div className="AS-field-row">
                            <EditableField
                              id="as-city"
                              label="City"
                              value={address.city}
                              hasError={Boolean(fieldErrors.city)}
                              onChange={(value) => handleAddressChange('city', value)}
                            />
                            <EditableField
                              id="as-province"
                              label="Province"
                              value={address.province}
                              hasError={Boolean(fieldErrors.province)}
                              onChange={(value) => handleAddressChange('province', value)}
                            />
                          </div>
                          <div className="AS-field-row">
                            <EditableField
                              id="as-postal-code"
                              label="Postal Code"
                              value={address.postalCode}
                              hasError={Boolean(fieldErrors.postalCode)}
                              onChange={(value) => handleAddressChange('postalCode', value)}
                            />
                            <EditableField
                              id="as-country"
                              label="Country"
                              value={address.country}
                              hasError={Boolean(fieldErrors.country)}
                              onChange={(value) => handleAddressChange('country', value)}
                            />
                          </div>
                        </section>

                        <section className="AS-form-section AS-form-section-courier">
                          <header className="AS-section-heading">
                            <h2 className="AS-section-title">Courier</h2>
                            <p className="AS-section-subtitle">
                              Preferred courier and receiver information.
                            </p>
                          </header>
                          <hr className="AS-divider AS-divider-light" />
                          <div className="AS-courier-fields">
                            <div className="AS-field-row">
                              <EditableField
                                id="as-preferred-courier"
                                label="Preferred Courier"
                                value={address.preferredCourier}
                                hasError={Boolean(fieldErrors.preferredCourier)}
                                onChange={(value) => handleAddressChange('preferredCourier', value)}
                              />
                              <EditableField
                                id="as-shipping-method"
                                label="Shipping Method"
                                value={address.shippingMethod}
                                hasError={Boolean(fieldErrors.shippingMethod)}
                                onChange={(value) => handleAddressChange('shippingMethod', value)}
                              />
                            </div>
                            <div className="AS-field-row">
                              <EditableField
                                id="as-receiver-name"
                                label="Receiver's Name"
                                value={address.receiverName}
                                hasError={Boolean(fieldErrors.receiverName)}
                                onChange={(value) => handleAddressChange('receiverName', value)}
                              />
                              <EditableField
                                id="as-receiver-contact"
                                label="Contact Number"
                                type="tel"
                                value={address.receiverContact}
                                hasError={Boolean(fieldErrors.receiverContact)}
                                onChange={(value) => handleAddressChange('receiverContact', value)}
                              />
                            </div>
                          </div>
                        </section>

                        <section className="AS-form-section AS-form-section-shipping">
                          <header className="AS-section-heading">
                            <h2 className="AS-section-title">Shipping Address</h2>
                            <p className="AS-section-subtitle">Set your delivery preferences.</p>
                          </header>
                          <hr className="AS-divider AS-divider-light" />
                          <label className="AS-same-profile-check">
                            <input
                              type="checkbox"
                              checked={address.sameAsProfile}
                              onChange={(event) => handleSameAsProfileChange(event.target.checked)}
                            />
                            <span>Same as my profile address</span>
                          </label>
                          <div className="AS-shipping-fields">
                            <EditableField
                              id="as-shipping-street"
                              label="Street"
                              value={shippingValues.street}
                              fullWidth
                              disabled={address.sameAsProfile}
                              hasError={Boolean(fieldErrors['shipping-street'])}
                              onChange={(value) => handleShippingChange('street', value)}
                            />
                            <div className="AS-field-row">
                              <EditableField
                                id="as-shipping-city"
                                label="City"
                                value={shippingValues.city}
                                disabled={address.sameAsProfile}
                                hasError={Boolean(fieldErrors['shipping-city'])}
                                onChange={(value) => handleShippingChange('city', value)}
                              />
                              <EditableField
                                id="as-shipping-province"
                                label="Province"
                                value={shippingValues.province}
                                disabled={address.sameAsProfile}
                                hasError={Boolean(fieldErrors['shipping-province'])}
                                onChange={(value) => handleShippingChange('province', value)}
                              />
                            </div>
                            <div className="AS-field-row">
                              <EditableField
                                id="as-shipping-postal-code"
                                label="Postal Code"
                                value={shippingValues.postalCode}
                                disabled={address.sameAsProfile}
                                hasError={Boolean(fieldErrors['shipping-postalCode'])}
                                onChange={(value) => handleShippingChange('postalCode', value)}
                              />
                              <EditableField
                                id="as-shipping-country"
                                label="Country"
                                value={shippingValues.country}
                                disabled={address.sameAsProfile}
                                hasError={Boolean(fieldErrors['shipping-country'])}
                                onChange={(value) => handleShippingChange('country', value)}
                              />
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>

                    <div className="AS-save-row">
                      <button type="button" className="AS-btn AS-btn-save" onClick={handleSave}>
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="AS-panel-placeholder">
                    <h1 className="AS-panel-title">{PROFILE_NAV.find((item) => item.key === activeSection)?.label}</h1>
                    <p className="AS-panel-subtitle">This section is coming soon.</p>
                  </div>
                )}
              </section>
            </div>
          </main>
          <Footer logoSrc={wLogo} />
        </div>
      </div>
    </div>
  )
}
