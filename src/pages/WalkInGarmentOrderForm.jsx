import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { FaCircleQuestion, FaDownload } from 'react-icons/fa6'
import { IoClose, IoImageOutline } from 'react-icons/io5'
import Footer from './Footer.jsx'
import '../design/WalkInForm.css'
import mockupExampleImg from '../assets/mock up.png'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import shirtStandardImg from '../assets/shirt_standard.png'
import shirtOversizedImg from '../assets/shirt_oversized.png'
import shirtBoxyImg from '../assets/shirtt_box.png'
import hoodieStandardImg from '../assets/Hoodie_Standard.png'
import hoodieOversizedImg from '../assets/hoodie_oversize.png'
import hoodieBoxyImg from '../assets/hoodie_box.png'
import neckStandardImg from '../assets/Neck_standard.png'
import neckProclubImg from '../assets/Neck_proclub.png'
import {
  formatWalkInPaymentTime,
  generateWalkInRefNumber,
  getWalkInGarment,
  navigateWalkInStep,
  saveWalkInConfirmation,
} from '../utils/walkInAccess.js'
import { navigateBack } from '../utils/navigation.js'

const FIT_TYPE_META = [
  {
    id: 'standard',
    label: 'Standard (₱370-400)',
    description: 'Carefully tailored with precise proportions for a timeless, polished finish.',
    tip: 'Best for classic styling and everyday wear.',
  },
  {
    id: 'oversized',
    label: 'Oversized (₱370-430)',
    description: 'Structured with wider dimensions for a modern, fashion-forward shape.',
    tip: 'Popular for contemporary streetwear brands.',
  },
  {
    id: 'boxy',
    label: 'Boxy (₱350-430)',
    description: 'Crafted with relaxed proportions for comfort and bold visual impact.',
    tip: 'Perfect for expressive and trend-led designs.',
  },
]

const VARIANT_CONFIG = {
  tshirt: {
    expectedGarment: 't-shirt',
    wrongGarmentStep: 'hoodie',
    fitImages: {
      standard: shirtStandardImg,
      oversized: shirtOversizedImg,
      boxy: shirtBoxyImg,
    },
  },
  hoodie: {
    expectedGarment: 'hoodie',
    wrongGarmentStep: 'tshirt',
    fitImages: {
      standard: hoodieStandardImg,
      oversized: hoodieOversizedImg,
      boxy: hoodieBoxyImg,
    },
  },
}

const PRINT_METHODS = [
  {
    id: 'silkscreen',
    label: 'Silkscreen',
    description:
      'Our signature screen printing method uses water-based inks to produce vibrant colors, exceptional print clarity, and a soft, breathable finish that maintains long-lasting quality.',
    tip: 'Best suited for cotton fabrics and premium, comfortable wear.',
  },
  {
    id: 'dtf',
    label: 'DTF',
    description:
      'Direct-to-Film is an advanced printing method that transfers detailed designs with strong color accuracy and flexibility.',
    tip: 'Suitable for complex designs and multi-color prints.',
  },
  {
    id: 'sublimation',
    label: 'Sublimation',
    description:
      'A heat-transfer process that infuses the design directly into the fabric for seamless, full-color results.',
    tip: 'Best for detailed artwork and all-over printing applications.',
  },
  {
    id: 'embroidery',
    label: 'Embroidery',
    description:
      'A classic stitching technique that adds texture, durability, and a refined finish to your design.',
    tip: 'Best for logos and branding that require a premium, long-lasting, and textured look.',
  },
  {
    id: 'high-density',
    label: 'High Density',
    description:
      'A specialized printing method that creates raised, dimensional designs with a bold and structured feel.',
    tip: 'Ideal for designs that need a thick, elevated texture for a more striking and premium appearance.',
  },
]

const NECKLINE_OPTIONS = [
  {
    id: 'standard',
    label: 'Standard',
    image: neckStandardImg,
    description: 'Carefully finished with a clean, classic collar construction for a balanced and timeless look.',
    tip: 'Best suited for everyday wear and traditional styling.',
  },
  {
    id: 'pro-club',
    label: 'Pro Club',
    image: neckProclubImg,
    description: 'Constructed with a thicker, structured collar for a firm shape and elevated streetwear aesthetic.',
    tip: 'Ideal for modern, trend-driven designs and structured silhouettes.',
  },
]

const FABRIC_OPTIONS = [
  { id: 'premium', label: 'Premium' },
  { id: 'heavyweight', label: 'Heavyweight' },
]

const COLOR_SWATCHES = Array.from({ length: 69 }, (_, index) => index)
const LIGHT_SWATCH_COLORS = COLOR_SWATCHES.map((index) => `hsl(${(index * 19) % 360}, 72%, 72%)`)
const DARK_SWATCH_COLORS = COLOR_SWATCHES.map((index) => `hsl(${(index * 19) % 360}, 58%, 32%)`)

const UPLOAD_SECTIONS = [
  { key: 'mockupFront', label: 'Mockup Front', fileLabel: 'mockup-front' },
  { key: 'frontPrint', label: 'Front Print', fileLabel: 'front-print' },
  { key: 'mockupBack', label: 'Mockup Back', fileLabel: 'mockup-back' },
  { key: 'backPrint', label: 'Back Print', fileLabel: 'back-print' },
]

function isEmptyField(value) {
  return value === null || value === undefined || String(value).trim() === ''
}

function validateWalkInForm(form, uploadedFiles) {
  const errors = {}

  if (isEmptyField(form.name)) errors.name = true
  if (isEmptyField(form.email)) errors.email = true
  if (isEmptyField(form.brandName)) errors.brandName = true
  if (isEmptyField(form.contactNumber)) errors.contactNumber = true

  if (isEmptyField(form.fitType)) {
    errors.fitType = true
  } else if (form.fitType === 'other' && isEmptyField(form.fitOther)) {
    errors.fitOther = true
  }

  if (isEmptyField(form.printMethod)) errors.printMethod = true
  if (isEmptyField(form.neckline)) errors.neckline = true
  if (isEmptyField(form.fabric)) errors.fabric = true
  if (isEmptyField(form.shirtColor)) errors.shirtColor = true

  if (isEmptyField(form.frontPrintColors)) errors.frontPrintColors = true
  if (isEmptyField(form.backPrintColors)) errors.backPrintColors = true

  if (!uploadedFiles.mockupFront?.length) errors.mockupFront = true
  if (!uploadedFiles.frontPrint?.length) errors.frontPrint = true
  if (!uploadedFiles.mockupBack?.length) errors.mockupBack = true
  if (!uploadedFiles.backPrint?.length) errors.backPrint = true

  return errors
}

function fieldClassName(baseClass, fieldErrors, key) {
  return `${baseClass}${fieldErrors[key] ? ' wif-field-error' : ''}`
}

function selectionClassName(baseClass, fieldErrors, key) {
  return `${baseClass}${fieldErrors[key] ? ' wif-selection-error' : ''}`
}

function StepHeading({ step, title }) {
  return (
    <div className="wif-step-heading">
      <span className="wif-step-number">{step}</span>
      <h2>{title}</h2>
    </div>
  )
}

function RadioPill({ name, value, label, checked, onChange }) {
  return (
    <label className={`wif-radio-pill${checked ? ' wif-radio-pill-checked' : ''}`}>
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} />
      <span className="wif-radio" aria-hidden="true" />
      <span className="wif-radio-pill-label">{label}</span>
    </label>
  )
}

const LOCKED_GARMENT_OPTIONS = [
  { id: 't-shirt', label: 'T-shirt' },
  { id: 'hoodie', label: 'Hoodie' },
  { id: 'others', label: 'Others:' },
]

function LockedGarmentSelection({ garment, otherText }) {
  return (
    <div className="wif-garment-locked" aria-label="Garment selection (locked)">
      <p className="wif-garment-locked-note">This matches your choice from the garment selection step and cannot be changed here.</p>
      <div className="wif-radio-pill-row wif-radio-pill-row-3">
        {LOCKED_GARMENT_OPTIONS.map((option) => {
          const isSelected = garment === option.id

          if (option.id === 'others') {
            return (
              <div
                key={option.id}
                className={`wif-radio-pill wif-radio-pill-specify wif-radio-pill-locked${isSelected ? ' wif-radio-pill-locked-selected' : ''}`}
              >
                <div className="wif-radio-pill-main">
                  <span className={`wif-radio${isSelected ? ' wif-radio-checked' : ''}`} aria-hidden="true" />
                  <span className="wif-radio-pill-label">{option.label}</span>
                </div>
                <input
                  type="text"
                  className="wif-inline-specify"
                  value={isSelected ? otherText : ''}
                  placeholder="Please Specify"
                  readOnly
                  disabled
                  tabIndex={-1}
                  aria-hidden={!isSelected}
                />
              </div>
            )
          }

          return (
            <div
              key={option.id}
              className={`wif-radio-pill wif-radio-pill-locked${isSelected ? ' wif-radio-pill-locked-selected' : ''}`}
            >
              <span className={`wif-radio${isSelected ? ' wif-radio-checked' : ''}`} aria-hidden="true" />
              <span className="wif-radio-pill-label">{option.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function OthersCustomizationRow({
  name,
  value = 'other',
  label,
  checked,
  specifyValue,
  onSelect,
  onSpecifyChange,
  wide = false,
  hasSpecifyError = false,
}) {
  return (
    <div
      className={`wif-radio-pill wif-radio-pill-specify${checked ? ' wif-radio-pill-checked' : ''}${hasSpecifyError ? ' wif-specify-error' : ''}`}
    >
      <label className="wif-radio-pill-main">
        <input type="radio" name={name} value={value} checked={checked} onChange={onSelect} />
        <span className="wif-radio" aria-hidden="true" />
        <span className="wif-radio-pill-label">{label}</span>
      </label>
      <input
        type="text"
        className={`wif-inline-specify${wide ? ' wif-inline-specify-wide' : ''}`}
        placeholder="Please Specify"
        value={specifyValue}
        disabled={!checked}
        aria-disabled={!checked}
        onFocus={() => {
          if (!checked) {
            onSelect()
          }
        }}
        onChange={(event) => onSpecifyChange(event.target.value)}
      />
    </div>
  )
}

function ShirtColorPicker({ value, onChange, hasError = false }) {
  const [activeTab, setActiveTab] = useState(() => (value?.startsWith('Dark') ? 'dark' : 'light'))
  const [menuOpen, setMenuOpen] = useState(true)

  useEffect(() => {
    if (value?.startsWith('Dark')) {
      setActiveTab('dark')
    } else if (value?.startsWith('Light')) {
      setActiveTab('light')
    }
  }, [value])

  const buildColorValue = (tab, index) => `${tab === 'light' ? 'Light' : 'Dark'} Color ${index + 1}`

  return (
    <div className={`wif-color-field wif-field-full${hasError ? ' wif-field-error' : ''}`}>
      <span className="wif-color-field-label">Shirt Color</span>
      <div className={`wif-color-picker${menuOpen ? ' wif-color-picker-open' : ''}`}>
        <button
          type="button"
          className="wif-color-select"
          aria-expanded={menuOpen}
          aria-haspopup="listbox"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className={value ? 'wif-color-select-value' : 'wif-color-select-placeholder'}>
            {value || 'Choose Shirt Color'}
          </span>
          <span className={`wif-color-caret${menuOpen ? ' wif-color-caret-open' : ''}`} aria-hidden="true" />
        </button>

        {menuOpen ? (
          <div className="wif-color-menu">
            <div className="wif-color-tabs">
              <button
                type="button"
                className={activeTab === 'light' ? 'wif-color-tab wif-color-tab-active' : 'wif-color-tab'}
                onClick={() => setActiveTab('light')}
              >
                Light Colors
              </button>
              <button
                type="button"
                className={activeTab === 'dark' ? 'wif-color-tab wif-color-tab-active' : 'wif-color-tab'}
                onClick={() => setActiveTab('dark')}
              >
                Dark Colors
              </button>
            </div>

            <div className="wif-color-grid" role="listbox" aria-label={`${activeTab} shirt colors`}>
              {COLOR_SWATCHES.map((swatch) => {
                const colorValue = buildColorValue(activeTab, swatch)
                const swatchColor = activeTab === 'light' ? LIGHT_SWATCH_COLORS[swatch] : DARK_SWATCH_COLORS[swatch]
                const isSelected = value === colorValue

                return (
                  <button
                    key={`${activeTab}-${swatch}`}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    className={`wif-color-swatch${isSelected ? ' wif-color-swatch-selected' : ''}`}
                    style={{ backgroundColor: swatchColor }}
                    aria-label={colorValue}
                    onClick={() => onChange(colorValue)}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function PrintMethodCard({
  label,
  description,
  tip,
  checked,
  onSelect,
  infoOpen,
  onToggleInfo,
}) {
  return (
    <div
      className={`wif-print-method-card${checked ? ' wif-print-method-card-checked' : ''}${infoOpen ? ' wif-print-method-card-info-open' : ''}`}
    >
      <div className="wif-print-method-card-header">
        <button
          type="button"
          className="wif-print-method-card-select"
          aria-pressed={checked}
          onClick={onSelect}
        >
          <span className={`wif-radio${checked ? ' wif-radio-checked' : ''}`} aria-hidden="true" />
          <span className="wif-print-method-card-label">{label}</span>
        </button>
        <button
          type="button"
          className="wif-print-method-help-btn"
          aria-label={`More information about ${label}`}
          aria-expanded={infoOpen}
          onMouseDown={(event) => {
            event.preventDefault()
            event.stopPropagation()
          }}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onToggleInfo()
          }}
        >
          <FaCircleQuestion aria-hidden="true" />
        </button>
      </div>

      {infoOpen ? (
        <div className="wif-print-method-card-details">
          <p className="wif-type-card-description">• {description}</p>
          <div className="wif-type-card-tip">
            <span className="wif-type-card-tip-icon" aria-hidden="true">
              i
            </span>
            <p>{tip}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ImageChoiceCard({
  id,
  name,
  label,
  image,
  checked,
  onChange,
  description,
  tip,
  infoOpen,
  onToggleInfo,
}) {
  const hasInfo = Boolean(description && tip)

  return (
    <div
      className={`wif-type-card${checked ? ' wif-type-card-checked' : ''}${infoOpen ? ' wif-type-card-info-open' : ''}`}
    >
      <button
        type="button"
        className="wif-type-card-image-btn"
        onClick={onChange}
        aria-pressed={checked}
        aria-label={`Select ${label}`}
      >
        <img src={image} alt="" className="wif-type-card-image" />
      </button>

      <div className="wif-type-card-footer">
        <label className="wif-type-card-select">
          <input type="radio" name={name} value={id} checked={checked} onChange={onChange} />
          <span className="wif-radio" aria-hidden="true" />
          <span>{label}</span>
        </label>

        {hasInfo ? (
          <button
            type="button"
            className="wif-type-card-help-btn"
            aria-label={`More information about ${label}`}
            aria-expanded={infoOpen}
            onMouseDown={(event) => {
              event.preventDefault()
              event.stopPropagation()
            }}
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              onToggleInfo()
            }}
          >
            <FaCircleQuestion aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {hasInfo && infoOpen ? (
        <div className="wif-type-card-details">
          <p className="wif-type-card-description">• {description}</p>
          <div className="wif-type-card-tip">
            <span className="wif-type-card-tip-icon" aria-hidden="true">
              i
            </span>
            <p>{tip}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function MockupExampleModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open || typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div className="wif-mockup-example-overlay" role="presentation" onClick={onClose}>
      <div
        className="wif-mockup-example-modal wif-light-scope"
        role="dialog"
        aria-modal="true"
        aria-label="How to count print colors example"
        onClick={(event) => event.stopPropagation()}
      >
        <button type="button" className="wif-mockup-example-close" aria-label="Close example" onClick={onClose}>
          <IoClose aria-hidden="true" />
        </button>
        <img src={mockupExampleImg} alt="Example guide for counting front and back print colors" />
      </div>
    </div>,
    document.body,
  )
}

function UploadBlock({ section, files, onUpload, onRemove, hasError = false }) {
  return (
    <div className={`wif-upload-block${hasError ? ' wif-field-error' : ''}`}>
      <h3>{section.label}</h3>
      <label className="wif-upload-dropzone">
        <IoImageOutline aria-hidden="true" />
        <span>Drop your image here, or upload</span>
        <small>Supports: jpg, png</small>
        <em>Browse File</em>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          multiple
          onChange={(event) => onUpload(section.key, event)}
        />
      </label>
      {files.length > 0 ? (
        <div className="wif-upload-files">
          <span>Your Files</span>
          {files.map((fileName, index) => (
            <div className="wif-upload-file-row" key={`${section.key}-${fileName}-${index}`}>
              <span>{fileName}</span>
              <button type="button" onClick={() => onRemove(section.key, index)} aria-label={`Remove ${fileName}`}>
                <IoClose aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function formatDisplayDate(date) {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function WalkInGarmentOrderForm({ variant = 'tshirt' }) {
  const config = VARIANT_CONFIG[variant] ?? VARIANT_CONFIG.tshirt
  const fitTypes = useMemo(
    () =>
      FIT_TYPE_META.map((fit) => ({
        ...fit,
        image: config.fitImages[fit.id],
      })),
    [config],
  )

  const { garment: savedGarment, otherText: savedGarmentOther } = getWalkInGarment()
  const todayLabel = useMemo(() => formatDisplayDate(new Date()), [])

  const [form, setForm] = useState({
    name: '',
    email: '',
    brandName: '',
    contactNumber: '',
    garmentChoice: savedGarment || config.expectedGarment,
    garmentOther: savedGarmentOther,
    fitType: '',
    fitOther: '',
    printMethod: '',
    neckline: '',
    fabric: '',
    shirtColor: '',
    frontPrintColors: '',
    backPrintColors: '',
  })

  const [uploadedFiles, setUploadedFiles] = useState({
    mockupFront: [],
    frontPrint: [],
    mockupBack: [],
    backPrint: [],
  })
  const [openCardInfo, setOpenCardInfo] = useState(null)
  const [mockupExampleOpen, setMockupExampleOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})

  const toggleCardInfo = (cardKey) => {
    setOpenCardInfo((current) => (current === cardKey ? null : cardKey))
  }

  useEffect(() => {
    if (!savedGarment) {
      navigateWalkInStep('garment')
      return
    }

    if (savedGarment !== config.expectedGarment) {
      navigateWalkInStep(config.wrongGarmentStep)
    }
  }, [savedGarment, config.expectedGarment, config.wrongGarmentStep])

  if (!savedGarment || savedGarment !== config.expectedGarment) {
    return (
      <div className="wif-page wif-page-form wif-light-scope wif-page-loading">
        <p className="wif-loading-message">Loading form…</p>
      </div>
    )
  }

  const clearFieldError = (field) => {
    setFieldErrors((current) => {
      if (!current[field]) return current
      const next = { ...current }
      delete next[field]
      return next
    })
  }

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    clearFieldError(field)
    if (field === 'fitType' && value !== 'other') {
      clearFieldError('fitOther')
    }
  }

  const handleUpload = (key, event) => {
    const names = Array.from(event.target.files || []).map((file) => file.name)
    if (!names.length) return
    setUploadedFiles((current) => ({
      ...current,
      [key]: [...current[key], ...names],
    }))
    clearFieldError(key)
    event.target.value = ''
  }

  const handleRemoveFile = (key, index) => {
    setUploadedFiles((current) => {
      const nextFiles = current[key].filter((_, fileIndex) => fileIndex !== index)
      const next = { ...current, [key]: nextFiles }
      if (!nextFiles.length) {
        setFieldErrors((errors) => ({ ...errors, [key]: true }))
      }
      return next
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const errors = validateWalkInForm(form, uploadedFiles)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      requestAnimationFrame(() => {
        document.querySelector('.wif-field-error, .wif-selection-error')?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })
      })
      return
    }

    setFieldErrors({})

    const submittedAt = new Date()
    saveWalkInConfirmation({
      refNumber: generateWalkInRefNumber(),
      paymentTime: formatWalkInPaymentTime(submittedAt),
      paymentMethod: 'Bank Transfer',
      senderName: form.name.trim(),
      amount: '100.00 PHP',
      submittedAt: submittedAt.toISOString(),
    })
    navigateWalkInStep('confirmed')
  }

  const handleDownload = async () => {
    const { downloadWalkInOrderPdf } = await import('../utils/walkInOrderPdf.js')
    downloadWalkInOrderPdf({
      form,
      uploadedFiles,
      savedGarment,
      savedGarmentOther,
      orderDate: todayLabel,
    })
  }

  return (
    <div className="wif-page wif-page-form wif-light-scope">
      <header className="wif-form-topbar">
        <a
          className="wif-form-brand"
          href="?page=walk-in&step=garment"
          onClick={(event) => {
            event.preventDefault()
            navigateWalkInStep('garment')
          }}
        >
          <img src={logoCircleImg} alt="" />
          <span>SORBETES</span>
        </a>
        <time dateTime={new Date().toISOString().split('T')[0]}>{todayLabel}</time>
      </header>

      <section className="wif-form-hero">
        <h1>Client Order Form</h1>
        <span className="wif-form-hero-line" aria-hidden="true" />
        <div className="wif-form-intro-wrap">
          <p className="wif-form-intro">
            Welcome to Sorbetes Apparel Studio. We&apos;re happy to have you here and excited to help bring your apparel
            ideas to life. Please take a moment to complete the form below with your order details so our team can
            accurately understand your vision and assist you with care and precision.
          </p>
        </div>
      </section>

      <div className="wif-form-card">
        <form className="wif-form-body" onSubmit={handleSubmit} noValidate>
          <section className="wif-form-section">
            <h3 className="wif-section-label">Basic Information</h3>
            <div className="wif-field-grid wif-field-grid-2">
              <label className={fieldClassName('wif-field', fieldErrors, 'name')}>
                <span>Your Name</span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  aria-invalid={Boolean(fieldErrors.name)}
                  onChange={(event) => updateField('name', event.target.value)}
                />
              </label>
              <label className={fieldClassName('wif-field', fieldErrors, 'email')}>
                <span>Email</span>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  aria-invalid={Boolean(fieldErrors.email)}
                  onChange={(event) => updateField('email', event.target.value)}
                />
              </label>
              <label className={fieldClassName('wif-field', fieldErrors, 'brandName')}>
                <span>Brand Name</span>
                <input
                  type="text"
                  placeholder="Enter your brand name"
                  value={form.brandName}
                  aria-invalid={Boolean(fieldErrors.brandName)}
                  onChange={(event) => updateField('brandName', event.target.value)}
                />
              </label>
              <label className={fieldClassName('wif-field', fieldErrors, 'contactNumber')}>
                <span>Contact Number</span>
                <input
                  type="tel"
                  placeholder="Enter your contact number"
                  value={form.contactNumber}
                  aria-invalid={Boolean(fieldErrors.contactNumber)}
                  onChange={(event) => updateField('contactNumber', event.target.value)}
                />
              </label>
            </div>
          </section>

          <section className="wif-form-section wif-form-section-order">
            <h3 className="wif-section-label">Order Details</h3>

            <div className="wif-order-steps">
            <div className="wif-order-step wif-order-step-garment">
            <StepHeading step="1" title="Garment Selection" />
            <LockedGarmentSelection garment={savedGarment} otherText={savedGarmentOther} />
            </div>

            <div className="wif-order-step wif-order-step-type">
            <StepHeading step="2" title="Type" />
            <div className={selectionClassName('wif-type-step-fields', fieldErrors, 'fitType')}>
            <div className="wif-type-card-grid">
              {fitTypes.map((fit) => (
                <ImageChoiceCard
                  key={fit.id}
                  id={fit.id}
                  name="fitType"
                  label={fit.label}
                  image={fit.image}
                  description={fit.description}
                  tip={fit.tip}
                  checked={form.fitType === fit.id}
                  onChange={() => updateField('fitType', fit.id)}
                  infoOpen={openCardInfo === `fitType-${fit.id}`}
                  onToggleInfo={() => toggleCardInfo(`fitType-${fit.id}`)}
                />
              ))}
            </div>
            <OthersCustomizationRow
              name="fitType"
              label="Others / Customization:"
              checked={form.fitType === 'other'}
              specifyValue={form.fitOther}
              wide
              hasSpecifyError={Boolean(fieldErrors.fitOther)}
              onSelect={() => updateField('fitType', 'other')}
              onSpecifyChange={(value) => updateField('fitOther', value)}
            />
            </div>
            </div>

            <div className="wif-order-step wif-order-step-print">
            <StepHeading step="3" title="Print Method" />
            <div
              className={selectionClassName('wif-print-method-list', fieldErrors, 'printMethod')}
              role="radiogroup"
              aria-label="Print method"
            >
              {PRINT_METHODS.map((method) => (
                <PrintMethodCard
                  key={method.id}
                  id={method.id}
                  label={method.label}
                  description={method.description}
                  tip={method.tip}
                  checked={form.printMethod === method.id}
                  onSelect={() => updateField('printMethod', method.id)}
                  infoOpen={openCardInfo === `printMethod-${method.id}`}
                  onToggleInfo={() => toggleCardInfo(`printMethod-${method.id}`)}
                />
              ))}
            </div>
            </div>

            <div className="wif-order-step wif-order-step-spec">
            <StepHeading step="4" title="Specifications" />
            <div className="wif-spec-block">
              <div className={selectionClassName('wif-type-card-grid wif-type-card-grid-2', fieldErrors, 'neckline')}>
                {NECKLINE_OPTIONS.map((neck) => (
                  <ImageChoiceCard
                    key={neck.id}
                    id={neck.id}
                    name="neckline"
                    label={neck.label}
                    image={neck.image}
                    description={neck.description}
                    tip={neck.tip}
                    checked={form.neckline === neck.id}
                    onChange={() => updateField('neckline', neck.id)}
                    infoOpen={openCardInfo === `neckline-${neck.id}`}
                    onToggleInfo={() => toggleCardInfo(`neckline-${neck.id}`)}
                  />
                ))}
              </div>

              <div className="wif-spec-subsection">
                <p className="wif-subsection-title">Fabric Selection</p>
                <div className={selectionClassName('wif-radio-pill-row wif-radio-pill-row-2', fieldErrors, 'fabric')}>
                  {FABRIC_OPTIONS.map((fabric) => (
                    <RadioPill
                      key={fabric.id}
                      name="fabric"
                      value={fabric.id}
                      label={fabric.label}
                      checked={form.fabric === fabric.id}
                      onChange={() => updateField('fabric', fabric.id)}
                    />
                  ))}
                </div>
              </div>

              <ShirtColorPicker
                value={form.shirtColor}
                hasError={Boolean(fieldErrors.shirtColor)}
                onChange={(color) => updateField('shirtColor', color)}
              />
            </div>
            </div>

            <div className="wif-order-step wif-order-step-mockup">
            <StepHeading step="5" title="Mockup Files" />

            <div className="wif-mockup-files">
              <div className="wif-mockup-view">
                <div className="wif-mockup-section-head">
                  <span>Front View</span>
                  <button
                    type="button"
                    className="wif-example-link"
                    onClick={() => setMockupExampleOpen(true)}
                  >
                    Example
                  </button>
                </div>
                <label className={fieldClassName('wif-field wif-field-full', fieldErrors, 'frontPrintColors')}>
                  <span>How many colors for the front print?</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter number of front print colors here"
                    value={form.frontPrintColors}
                    aria-invalid={Boolean(fieldErrors.frontPrintColors)}
                    onChange={(event) => updateField('frontPrintColors', event.target.value)}
                  />
                </label>
                <div className="wif-upload-stack">
                  <UploadBlock
                    section={UPLOAD_SECTIONS[0]}
                    files={uploadedFiles.mockupFront}
                    hasError={Boolean(fieldErrors.mockupFront)}
                    onUpload={handleUpload}
                    onRemove={handleRemoveFile}
                  />
                  <UploadBlock
                    section={UPLOAD_SECTIONS[1]}
                    files={uploadedFiles.frontPrint}
                    hasError={Boolean(fieldErrors.frontPrint)}
                    onUpload={handleUpload}
                    onRemove={handleRemoveFile}
                  />
                </div>
              </div>

              <div className="wif-mockup-view">
                <div className="wif-mockup-section-head">
                  <span>Back View</span>
                  <button
                    type="button"
                    className="wif-example-link"
                    onClick={() => setMockupExampleOpen(true)}
                  >
                    Example
                  </button>
                </div>
                <label className={fieldClassName('wif-field wif-field-full', fieldErrors, 'backPrintColors')}>
                  <span>How many colors for the back print?</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter number of back print colors here"
                    value={form.backPrintColors}
                    aria-invalid={Boolean(fieldErrors.backPrintColors)}
                    onChange={(event) => updateField('backPrintColors', event.target.value)}
                  />
                </label>
                <div className="wif-upload-stack">
                  <UploadBlock
                    section={UPLOAD_SECTIONS[2]}
                    files={uploadedFiles.mockupBack}
                    hasError={Boolean(fieldErrors.mockupBack)}
                    onUpload={handleUpload}
                    onRemove={handleRemoveFile}
                  />
                  <UploadBlock
                    section={UPLOAD_SECTIONS[3]}
                    files={uploadedFiles.backPrint}
                    hasError={Boolean(fieldErrors.backPrint)}
                    onUpload={handleUpload}
                    onRemove={handleRemoveFile}
                  />
                </div>
              </div>
            </div>
            </div>
            </div>
          </section>

          <section className="wif-summary-card">
            <div className="wif-summary-notice">
              <FaCircleQuestion aria-hidden="true" />
              <span>
                A ₱1,000 sample fee applies. A 50% downpayment is required before production begins.
              </span>
            </div>
            <h3>Order Summary</h3>
            <div className="wif-summary-rows">
            <div className="wif-summary-row">
              <span>Sample Fee</span>
              <strong>100.00 PHP</strong>
            </div>
            <div className="wif-summary-row">
              <span>60% Downpayment</span>
              <strong>100.00 PHP</strong>
            </div>
            <div className="wif-summary-row">
              <span>40% Balance</span>
              <strong>100.00 PHP</strong>
            </div>
            </div>
            <div className="wif-summary-row wif-summary-total">
              <span>Total Price</span>
              <strong>100.00 PHP</strong>
            </div>
          </section>

          <div className="wif-form-actions">
            <button
              type="button"
              className="wif-btn-outline"
              onClick={() => navigateBack(() => navigateWalkInStep('garment'))}
            >
              Back
            </button>
            <button type="submit" className="wif-btn-outline wif-btn-submit">
              Submit Form
            </button>
            <button type="button" className="wif-btn-dark" onClick={handleDownload}>
              <FaDownload aria-hidden="true" />
              Download
            </button>
          </div>
        </form>
      </div>

      <Footer logoSrc={logoCircleImg} />

      <MockupExampleModal open={mockupExampleOpen} onClose={() => setMockupExampleOpen(false)} />
    </div>
  )
}
