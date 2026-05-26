import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaExclamation, FaEye, FaInfoCircle, FaPen, FaUser } from 'react-icons/fa'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import foundersLogo from '../assets/Founders-logo.png'
import wLogo from '../assets/w_logo.png'
import '../design/AccountSettings.css'
import { FOOTER_CANVAS_HEIGHT } from '../constants/layout.js'
import { getCurrentUser, updateCurrentUser, updateCurrentUserPassword } from '../utils/auth.js'
import { navigateToPage } from '../utils/navigation.js'

const SAVE_TOAST_DURATION_MS = 5000

const AS_BASE_WIDTH = 1920
const AS_PAGE_HEIGHT = 1412
const AS_BASE_HEIGHT = AS_PAGE_HEIGHT + FOOTER_CANVAS_HEIGHT

const PROFILE_NAV = [
  { key: 'account', label: 'Account' },
  { key: 'address', label: 'Address' },
  { key: 'password', label: 'Password' },
  { key: 'founders-club', label: "Sorbetes Founder's Club" },
  { key: 'rewards', label: 'Rewards' },
]

const DEFAULT_PROFILE = {
  firstName: 'Abdul Aziz',
  lastName: 'De Borja',
  email: 'abdulazizdeborja@gmail.com',
  phone: '0912345679812',
}

const PROFILE_TEXT_FIELDS = ['firstName', 'lastName', 'email', 'phone']

const DEFAULT_PASSWORD_FORM = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

const DEFAULT_FOUNDERS_FORM = {
  pictureUrl: '',
  logoUrl: '',
  firstName: '',
  lastName: '',
  facebookLink: '',
  instagramLink: '',
  tiktokLink: '',
  highlightedMessage: '',
  message: '',
  referenceNumber: '',
}

const FOUNDERS_REQUIRED_FIELDS = ['firstName', 'lastName', 'highlightedMessage', 'message']

const DEFAULT_REWARDS_FORM = {
  referenceCode: '',
  friendReferenceCode: '',
  referralCode: '',
  hasAccess: false,
}

const PASSWORD_REQUIREMENTS = [
  {
    key: 'safe-length',
    label: 'Please add all necessary characters to create a safe password',
    test: (value) => value.length >= 8,
  },
  {
    key: 'number',
    label: 'One number',
    test: (value) => /\d/.test(value),
  },
  {
    key: 'special',
    label: 'One special character',
    test: (value) => /[^A-Za-z0-9]/.test(value),
  },
]

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

function getInitialFoundersForm() {
  const user = getCurrentUser()
  const saved = user?.foundersClub || {}

  return {
    pictureUrl: saved.pictureUrl || '',
    logoUrl: saved.logoUrl || '',
    firstName: saved.firstName || user?.firstName || '',
    lastName: saved.lastName || user?.lastName || '',
    facebookLink: saved.facebookLink || '',
    instagramLink: saved.instagramLink || '',
    tiktokLink: saved.tiktokLink || '',
    highlightedMessage: saved.highlightedMessage || '',
    message: saved.message || '',
    referenceNumber: saved.referenceNumber || '',
  }
}

function createRewardReferralCode(user) {
  const source = `${user?.username || user?.email || user?.firstName || 'sorbetes'}`
    .replace(/[^a-z0-9]/gi, '')
    .toUpperCase()
  const base = (source || 'SORBETES').slice(0, 8).padEnd(8, '0')
  const checksum = Array.from(`${user?.email || base}`).reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  )

  return `${base}${String(checksum).padStart(4, '0').slice(-4)}`
}

function getInitialRewardsForm() {
  const user = getCurrentUser()
  const saved = user?.rewards || {}

  return {
    ...DEFAULT_REWARDS_FORM,
    ...saved,
    referralCode: saved.referralCode || createRewardReferralCode(user),
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
  const [savedAvatarUrl, setSavedAvatarUrl] = useState(() => getCurrentUser()?.avatarUrl || '')
  const [savedDisplayName, setSavedDisplayName] = useState(
    () => getCurrentUser()?.firstName || DEFAULT_PROFILE.firstName || 'Guest',
  )
  const [savedFoundersForm, setSavedFoundersForm] = useState(getInitialFoundersForm)
  const [address, setAddress] = useState(getInitialAddress)
  const [activeSection, setActiveSection] = useState('account')
  const [toast, setToast] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})
  const [passwordForm, setPasswordForm] = useState(DEFAULT_PASSWORD_FORM)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [foundersForm, setFoundersForm] = useState(getInitialFoundersForm)
  const [rewardsForm, setRewardsForm] = useState(getInitialRewardsForm)
  const [passwordVisibility, setPasswordVisibility] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  })
  const fileInputRef = useRef(null)
  const foundersPictureInputRef = useRef(null)
  const foundersLogoInputRef = useRef(null)
  const toastTimerRef = useRef(null)
  const displayFirstName = savedDisplayName
  const passwordRequirementStates = PASSWORD_REQUIREMENTS.map((requirement) => ({
    ...requirement,
    met: requirement.test(passwordForm.newPassword),
  }))
  const passwordRequirementsMet = passwordRequirementStates.every((requirement) => requirement.met)
  const showPasswordRequirements = Boolean(passwordForm.newPassword || fieldErrors.newPassword)
  const newPasswordTone = showPasswordRequirements
    ? passwordRequirementsMet
      ? 'valid'
      : 'invalid'
    : ''
  const showConfirmPasswordMatch = Boolean(passwordForm.confirmPassword || fieldErrors.confirmPassword)
  const confirmPasswordMatches =
    Boolean(passwordForm.confirmPassword) && passwordForm.confirmPassword === passwordForm.newPassword
  const confirmPasswordTone = showConfirmPasswordMatch
    ? confirmPasswordMatches
      ? 'valid'
      : 'invalid'
    : ''

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
    const frame = window.requestAnimationFrame(() => {
      setAddress((current) => {
        if (current.sameAsProfile !== false || current.shipping) {
          return current
        }

        return { ...current, shipping: pickLocationFields(current) }
      })
    })

    return () => window.cancelAnimationFrame(frame)
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

  const updateFoundersFile = (key, file) => {
    if (!file || file.size > 15 * 1024 * 1024) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFoundersForm((current) => ({ ...current, [key]: reader.result }))
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFoundersFileChange = (event, key) => {
    updateFoundersFile(key, event.target.files?.[0])
    event.target.value = ''
  }

  const handleFoundersFieldChange = (key, value) => {
    setFoundersForm((current) => ({ ...current, [key]: value }))

    if (fieldErrors[`founders-${key}`]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[`founders-${key}`]
        return next
      })
    }
  }

  const handleRemoveFoundersFile = (key) => {
    setFoundersForm((current) => ({ ...current, [key]: '' }))
  }

  const handleRewardsFieldChange = (key, value) => {
    setRewardsForm((current) => ({ ...current, [key]: value }))

    if (fieldErrors[key]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[key]
        return next
      })
    }
  }

  const handlePasswordFieldChange = (key, value) => {
    setPasswordForm((current) => ({ ...current, [key]: value }))
    setPasswordMessage('')

    if (fieldErrors[key]) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[key]
        return next
      })
    }
  }

  const togglePasswordVisibility = (key) => {
    setPasswordVisibility((current) => ({ ...current, [key]: !current[key] }))
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
      setSavedAvatarUrl(profile.avatarUrl)
      setSavedDisplayName(profile.firstName.trim() || 'Guest')
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

  const savePassword = () => {
    const errors = {}
    const currentPassword = passwordForm.currentPassword.trim()
    const newPassword = passwordForm.newPassword.trim()
    const confirmPassword = passwordForm.confirmPassword.trim()

    if (!passwordRequirementsMet) {
      errors.newPassword = true
    }

    if (!confirmPassword || confirmPassword !== newPassword) {
      errors.confirmPassword = true
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setPasswordMessage(
        confirmPassword && confirmPassword !== newPassword
          ? 'New password and confirmation must match.'
          : 'Please make sure your new password meets all requirements.',
      )
      showToast('error')
      return
    }

    const result = updateCurrentUserPassword(currentPassword, newPassword)

    if (!result.ok) {
      setFieldErrors({ currentPassword: true })
      setPasswordMessage(result.error)
      showToast('error')
      return
    }

    setFieldErrors({})
    setPasswordMessage('')
    setPasswordForm(DEFAULT_PASSWORD_FORM)
    showToast('success')
  }

  const saveFoundersClub = () => {
    const payload = {
      pictureUrl: foundersForm.pictureUrl,
      logoUrl: foundersForm.logoUrl,
      firstName: foundersForm.firstName.trim(),
      lastName: foundersForm.lastName.trim(),
      facebookLink: foundersForm.facebookLink.trim(),
      instagramLink: foundersForm.instagramLink.trim(),
      tiktokLink: foundersForm.tiktokLink.trim(),
      highlightedMessage: foundersForm.highlightedMessage.trim(),
      message: foundersForm.message.trim(),
      referenceNumber: foundersForm.referenceNumber.trim(),
    }

    const errors = FOUNDERS_REQUIRED_FIELDS.reduce((accumulator, key) => {
      if (!payload[key]) {
        accumulator[`founders-${key}`] = true
      }
      return accumulator
    }, {})

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      showToast('error')
      return
    }

    setFoundersForm(payload)

    const result = updateCurrentUser({ foundersClub: payload })

    if (result.ok) {
      setSavedFoundersForm(payload)
      showToast('success')
    }
  }

  const saveRewards = () => {
    const fieldKey = rewardsForm.hasAccess ? 'friendReferenceCode' : 'referenceCode'
    const submittedCode = rewardsForm[fieldKey].trim()

    if (!submittedCode) {
      setFieldErrors({ [fieldKey]: true })
      showToast('error')
      return
    }

    const payload = {
      ...rewardsForm,
      [fieldKey]: submittedCode,
      hasAccess: true,
      referralCode: rewardsForm.referralCode || createRewardReferralCode(getCurrentUser()),
    }

    setFieldErrors({})
    setRewardsForm(payload)

    const result = updateCurrentUser({ rewards: payload })

    if (result.ok) {
      showToast('success')
    }
  }

  const handleCopyReferralCode = async () => {
    if (!rewardsForm.referralCode) {
      return
    }

    try {
      await navigator.clipboard.writeText(rewardsForm.referralCode)
      showToast('success')
    } catch {
      showToast('error')
    }
  }

  const handleSave = () => {
    if (activeSection === 'address') {
      saveAddress()
      return
    }

    if (activeSection === 'password') {
      savePassword()
      return
    }

    if (activeSection === 'founders-club') {
      saveFoundersClub()
      return
    }

    if (activeSection === 'rewards') {
      saveRewards()
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

  const renderPasswordField = (key, label, placeholder, tone = '') => (
    <div className={`AS-password-field${tone ? ` AS-password-field-${tone}` : ''}`}>
      <label className="AS-field-label" htmlFor={`as-${key}`}>
        {label}
      </label>
      <div
        className={`AS-password-input-wrap${tone ? ` AS-password-input-wrap-${tone}` : ''}${
          fieldErrors[key] ? ' AS-password-input-wrap-error' : ''
        }`}
      >
        <input
          id={`as-${key}`}
          className="AS-password-input"
          type={passwordVisibility[key] ? 'text' : 'password'}
          value={passwordForm[key]}
          placeholder={placeholder}
          onChange={(event) => handlePasswordFieldChange(key, event.target.value)}
        />
        <button
          type="button"
          className="AS-password-eye"
          aria-label={passwordVisibility[key] ? `Hide ${label}` : `Show ${label}`}
          onClick={() => togglePasswordVisibility(key)}
        >
          <FaEye aria-hidden="true" />
        </button>
      </div>
    </div>
  )

  const renderFoundersUploadRow = ({ type, title, uploadLabel, previewUrl, draftUrl, inputRef }) => (
    <div className="AS-founders-upload-row">
      <div className="AS-founders-upload-info">
        <span className="AS-founders-avatar" aria-hidden="true">
          {previewUrl ? <img src={previewUrl} alt="" /> : <FaUser />}
        </span>
        <div className="AS-founders-upload-copy">
          <p className="AS-founders-upload-title">{title}</p>
          <p className="AS-founders-upload-hint">PNG, JPG under 15MB</p>
        </div>
      </div>
      <div className="AS-founders-upload-actions">
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="AS-file-input"
          onChange={(event) => handleFoundersFileChange(event, type)}
          tabIndex={-1}
          aria-hidden="true"
        />
        <button
          type="button"
          className="AS-btn AS-btn-primary"
          onClick={() => inputRef.current?.click()}
        >
          {uploadLabel}
        </button>
        <button
          type="button"
          className="AS-btn AS-btn-remove"
          onClick={() => handleRemoveFoundersFile(type)}
          disabled={!draftUrl && !previewUrl}
        >
          Remove
        </button>
      </div>
    </div>
  )

  const renderFoundersInput = ({ keyName, label, placeholder, required = false }) => (
    <div className="AS-founders-field">
      <label className="AS-field-label" htmlFor={`as-founders-${keyName}`}>
        {label}
        {required ? ' *' : ''}
      </label>
      <input
        id={`as-founders-${keyName}`}
        className={`AS-founders-input${
          fieldErrors[`founders-${keyName}`] ? ' AS-founders-input-error' : ''
        }`}
        type="text"
        value={foundersForm[keyName]}
        placeholder={placeholder}
        aria-invalid={Boolean(fieldErrors[`founders-${keyName}`])}
        onChange={(event) => handleFoundersFieldChange(keyName, event.target.value)}
      />
    </div>
  )

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
                    {savedAvatarUrl ? (
                      <img src={savedAvatarUrl} alt="" />
                    ) : (
                      <FaUser />
                    )}
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

              <section
                className={`AS-panel${activeSection === 'rewards' ? ' AS-panel-rewards' : ''}`}
                aria-label="Account settings"
              >
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
                          {savedAvatarUrl ? (
                            <img src={savedAvatarUrl} alt="" />
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
                          disabled={!profile.avatarUrl && !savedAvatarUrl}
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
                ) : activeSection === 'password' ? (
                  <div className="AS-panel-inner AS-panel-inner-password">
                    <header className="AS-panel-header">
                      <div className="AS-panel-heading">
                        <h1 className="AS-panel-title">Password</h1>
                        <p className="AS-panel-subtitle">Keep your password up to date.</p>
                      </div>
                      <hr className="AS-divider" />
                    </header>

                    <div className="AS-password-notice" role="note">
                      <FaInfoCircle aria-hidden="true" />
                      <p>
                        Heads up! Accounts created using Google don&apos;t require a password. You can leave this
                        section blank unless you&apos;d like to set one for manual login using your email and password.
                      </p>
                    </div>

                    <div className="AS-password-form">
                      <div className="AS-password-current-block">
                        {renderPasswordField('currentPassword', 'Current Password', 'Enter your password')}
                        <p className="AS-password-hint">
                          <FaInfoCircle aria-hidden="true" />
                          <span>Leave blank if your account uses Google sign-in.</span>
                        </p>
                      </div>

                      <div className="AS-password-requirement-block">
                        {renderPasswordField(
                          'newPassword',
                          'New Password',
                          'Enter your new password',
                          newPasswordTone,
                        )}
                        <ul
                          className={`AS-password-requirements${
                            newPasswordTone ? ` AS-password-requirements-${newPasswordTone}` : ''
                          }`}
                        >
                          {passwordRequirementStates.map((requirement) => (
                            <li
                              key={requirement.key}
                              className={
                                requirement.met
                                  ? 'AS-password-requirement AS-password-requirement-met'
                                  : 'AS-password-requirement'
                              }
                            >
                              {requirement.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="AS-password-match-block">
                        {renderPasswordField(
                          'confirmPassword',
                          'Confirm New Password',
                          'Confirm your new password',
                          confirmPasswordTone,
                        )}
                        {showConfirmPasswordMatch ? (
                          <p className={`AS-password-match AS-password-match-${confirmPasswordTone}`}>
                            {confirmPasswordMatches
                              ? 'Passwords match'
                              : 'Confirm password must match your new password'}
                          </p>
                        ) : null}
                      </div>

                      {passwordMessage ? <p className="AS-password-message">{passwordMessage}</p> : null}

                      <div className="AS-password-actions">
                        <button type="button" className="AS-btn AS-btn-save" onClick={handleSave}>
                          Change Password
                        </button>
                        <button
                          type="button"
                          className="AS-password-forgot"
                          onClick={() => navigateToPage('forgot-password')}
                        >
                          Forgot password?
                        </button>
                      </div>
                    </div>
                  </div>
                ) : activeSection === 'founders-club' ? (
                  <div className="AS-panel-inner AS-panel-inner-founders">
                    <div className="AS-founders-scroll">
                      <header className="AS-founders-header">
                        <img className="AS-founders-logo" src={foundersLogo} alt="The Founders Club" />
                        <a className="AS-founders-learn" href="?page=founders-club-guide">
                          Learn more about Sorbetes Founder&apos;s Club
                        </a>
                      </header>

                      <section className="AS-founders-intro">
                        <h1>Be Featured on the Sorbetes Founder&apos;s Club</h1>
                        <p>
                          The Sorbetes Founder&apos;s Club highlights the brands that trusted us in developing their
                          apparel and growing their identity. This section features testimonials, logos, and
                          experiences from clients who have collaborated with our team, offering insight into how their
                          ideas were transformed into finished garments. It serves as both recognition for our partners
                          and inspiration for future brands looking to start their journey with Sorbetes.
                        </p>
                      </section>

                      <hr className="AS-divider AS-divider-light" />

                      <section className="AS-founders-uploads">
                        {renderFoundersUploadRow({
                          type: 'pictureUrl',
                          title: 'Your Picture',
                          uploadLabel: 'Upload profile picture',
                          previewUrl: savedFoundersForm.pictureUrl,
                          draftUrl: foundersForm.pictureUrl,
                          inputRef: foundersPictureInputRef,
                        })}
                        {renderFoundersUploadRow({
                          type: 'logoUrl',
                          title: 'Logo',
                          uploadLabel: 'Upload logo',
                          previewUrl: savedFoundersForm.logoUrl,
                          draftUrl: foundersForm.logoUrl,
                          inputRef: foundersLogoInputRef,
                        })}
                      </section>

                      <hr className="AS-divider AS-divider-light" />

                      <section className="AS-founders-basic">
                        <h2>Basic Information</h2>
                        <div className="AS-field-row">
                          {renderFoundersInput({
                            keyName: 'firstName',
                            label: 'First Name',
                            placeholder: 'Enter your name',
                            required: true,
                          })}
                          {renderFoundersInput({
                            keyName: 'lastName',
                            label: 'Last Name',
                            placeholder: 'Enter your last name',
                            required: true,
                          })}
                        </div>
                      </section>

                      <section className="AS-founders-basic">
                        <div className="AS-founders-section-heading">
                          <h2>Social Media Link</h2>
                          <p>At least one social media link is enough.</p>
                        </div>
                        {renderFoundersInput({
                          keyName: 'facebookLink',
                          label: 'Facebook Link',
                          placeholder: 'Enter your name',
                        })}
                        {renderFoundersInput({
                          keyName: 'instagramLink',
                          label: 'Instagram Link',
                          placeholder: 'Enter your name',
                        })}
                        {renderFoundersInput({
                          keyName: 'tiktokLink',
                          label: 'Tiktok Link',
                          placeholder: 'Enter your name',
                        })}
                      </section>

                      <hr className="AS-divider AS-divider-light" />

                      <section className="AS-founders-basic AS-founders-message-section">
                        <h2>Your Message</h2>
                        {renderFoundersInput({
                          keyName: 'highlightedMessage',
                          label: 'Highlighted Message',
                          placeholder: 'Enter highlighted message here',
                          required: true,
                        })}
                        <div className="AS-founders-field">
                          <label className="AS-field-label" htmlFor="as-founders-message">
                            Message *
                          </label>
                          <textarea
                            id="as-founders-message"
                            className={`AS-founders-input AS-founders-textarea${
                              fieldErrors['founders-message'] ? ' AS-founders-input-error' : ''
                            }`}
                            value={foundersForm.message}
                            placeholder="Enter your message..."
                            aria-invalid={Boolean(fieldErrors['founders-message'])}
                            onChange={(event) => handleFoundersFieldChange('message', event.target.value)}
                          />
                        </div>
                        {renderFoundersInput({
                          keyName: 'referenceNumber',
                          label: 'Reference Number',
                          placeholder: 'Enter your reference number',
                        })}
                      </section>

                      <div className="AS-save-row AS-founders-save-row">
                        <button type="button" className="AS-btn AS-btn-save" onClick={handleSave}>
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ) : activeSection === 'rewards' ? (
                  <div className="AS-panel-inner AS-panel-inner-rewards">
                    <header className="AS-rewards-header">
                      <div className="AS-panel-heading">
                        <h1 className="AS-panel-title">Earn Points & Get Rewards with Referrals</h1>
                        <p className="AS-rewards-subtitle">
                          Invite friends, earn points, and redeem them for free treats and perks. 100 points = 1 free
                          product! The more you refer, the more you earn.
                        </p>
                      </div>
                      <hr className="AS-divider AS-divider-light" />
                    </header>

                    {!rewardsForm.hasAccess ? (
                      <div className="AS-rewards-notice" role="note">
                        <FaInfoCircle aria-hidden="true" />
                        <p>
                          Please enter your reference code to access the referral system and start earning points for
                          free production.
                        </p>
                      </div>
                    ) : null}

                    <div className="AS-rewards-form">
                      {rewardsForm.hasAccess ? (
                        <div className="AS-rewards-field">
                          <label className="AS-rewards-label" htmlFor="as-rewards-referral-code">
                            Your Referral Code:
                          </label>
                          <div className="AS-rewards-input-row">
                            <input
                              id="as-rewards-referral-code"
                              className="AS-rewards-input"
                              type="text"
                              value={rewardsForm.referralCode}
                              readOnly
                            />
                            <button
                              type="button"
                              className="AS-rewards-submit"
                              onClick={handleCopyReferralCode}
                            >
                              Copy to Clipboard
                            </button>
                          </div>
                        </div>
                      ) : null}

                      <div className="AS-rewards-field">
                        <label
                          className="AS-rewards-label"
                          htmlFor={
                            rewardsForm.hasAccess
                              ? 'as-rewards-friend-reference-code'
                              : 'as-rewards-reference-code'
                          }
                        >
                          {rewardsForm.hasAccess ? 'Enter Referral Code:' : 'Enter your reference code:'}
                        </label>
                        <div
                          className={`AS-rewards-input-row${
                            fieldErrors[rewardsForm.hasAccess ? 'friendReferenceCode' : 'referenceCode']
                              ? ' AS-rewards-input-row-error'
                              : ''
                          }`}
                        >
                          <input
                            id={
                              rewardsForm.hasAccess
                                ? 'as-rewards-friend-reference-code'
                                : 'as-rewards-reference-code'
                            }
                            className="AS-rewards-input"
                            type="text"
                            value={
                              rewardsForm.hasAccess
                                ? rewardsForm.friendReferenceCode
                                : rewardsForm.referenceCode
                            }
                            placeholder={
                              rewardsForm.hasAccess
                                ? "Enter your friend's referral code here"
                                : 'Enter your reference code here'
                            }
                            aria-invalid={Boolean(
                              fieldErrors[rewardsForm.hasAccess ? 'friendReferenceCode' : 'referenceCode'],
                            )}
                            onChange={(event) =>
                              handleRewardsFieldChange(
                                rewardsForm.hasAccess ? 'friendReferenceCode' : 'referenceCode',
                                event.target.value,
                              )
                            }
                          />
                          <button type="button" className="AS-rewards-submit" onClick={handleSave}>
                            Submit
                          </button>
                        </div>
                      </div>
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
