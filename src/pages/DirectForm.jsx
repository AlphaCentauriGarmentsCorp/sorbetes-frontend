import { useEffect, useState } from 'react'
import { FaFacebookF } from 'react-icons/fa'
import { IoAttach, IoChevronBack, IoClose, IoDownloadOutline, IoImageOutline } from 'react-icons/io5'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import '../design/DirectForm.css'

const DIRECT_FORM_BASE_WIDTH = 1920
const DIRECT_FORM_PAGE_HEIGHT = 2968
const DIRECT_FORM_UPLOAD_PAGE_HEIGHT = 3159
const DIRECT_FORM_UPLOAD_FIRST_FILE_EXTRA_HEIGHT = 106
const DIRECT_FORM_UPLOAD_NEXT_FILE_EXTRA_HEIGHT = 64
const DIRECT_FORM_PRICING_PAGE_HEIGHT = 2861
const DIRECT_FORM_PRICE_BREAKDOWN_EXTRA_HEIGHT = 540
const DIRECT_FORM_CUSTOM_WOVEN_EXTRA_HEIGHT = 190
const DIRECT_FORM_FOOTER_HEIGHT = 332

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  contactNumber: '',
  package: '',
  fabricType: '',
  shirtColor: '',
  printSize: '',
  printMethod: '',
  frontPrint: '',
  frontColors: '0',
  backPrint: '',
  backColors: '0',
  necklineStyle: '',
  innerBrandingPrint: '',
  wovenLabel: '',
  ownWovenLabel: '',
  wovenLocation: '',
  wovenLocationOther: '',
  customWovenLocationFile: '',
}

const SELECT_OPTIONS = {
  package: [
    'Standard',
    'Standard (DTF)',
    'Oversized',
    'Oversized (DTF)',
    'Boxy',
    'Boxy (DTF)',
    'Print Only (Standard)',
    'Print Only (Full Print)',
    'Hoodie (Standard)',
    'Hoodie (Oversized)',
    'Polo (Lacoste) Standard',
    'Polo (Lacoste) Osized/Boxy',
    'Long Sleeves',
    'Long Sleeves (Osized/Boxy)',
    'Sweatpants',
    'Full Print',
    'Full Subli Top',
    'Cropped Top',
  ],
  fabricType: ['Soft & Lightweight (220-240 GSM)', 'Thick & Premium (280 GSM)'],
  shirtColor: ['White', 'Black', 'Natural', 'Custom Color'],
  printSize: ['Regular Print (14X20)', 'Full Print'],
  printMethod: ['Silkscreen (Water-based)', 'Sublimation', 'DTF', 'Embroidery', 'High Density'],
  necklineStyle: ['Standard', 'Pro Club'],
  innerBrandingPrint: ['Silk Screen', 'DTF', 'None'],
}

const WOVEN_LOCATION_GROUPS = [
  {
    label: 'Front',
    options: ['Neck Label / Main Label', 'Size Label', 'Tagless Neckprint', 'Sleeve Label', 'Hem Label'],
  },
  {
    label: 'Back',
    options: ['Care Label / Wash Label'],
  },
  {
    label: 'Optional',
    options: ['Others'],
  },
]

const UPLOAD_FILE_SECTIONS = [
  { key: 'woven', label: 'Woven File' },
  { key: 'front', label: 'Front Print' },
  { key: 'back', label: 'Back Print' },
  { key: 'mockup', label: 'Mockup' },
]

const QUANTITY_SIZES = [
  { key: 'xs', label: 'XS' },
  { key: 'medium', label: 'Medium' },
  { key: 'large', label: 'Large' },
  { key: '2xl', label: '2XL' },
  { key: '3xl', label: '3XL' },
]

function getDirectFormScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / DIRECT_FORM_BASE_WIDTH, 0.18), 1)
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('cursor:navigate'))
}

function Field({ label, value, onChange, placeholder, type = 'text' }) {
  return (
    <label className="DFF-field">
      {label}
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  )
}

function SelectField({ label, value, onChange, placeholder, options, wide = false }) {
  return (
    <label className={`DFF-field${wide ? ' DFF-field-wide' : ''}`}>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  )
}

function RadioGroup({ label, value, onChange }) {
  return (
    <div className="DFF-radio-group">
      <span>{label}</span>
      <div>
        {['Yes', 'No'].map((option) => (
          <label key={option}>
            <input
              type="radio"
              name={label}
              checked={value === option.toLowerCase()}
              onChange={() => onChange(option.toLowerCase())}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  )
}

function WovenLocationField({ value, otherValue, fileName, onChange, onOtherChange, onFileChange, onFileRemove }) {
  return (
    <div className="DFF-field DFF-woven-location-field">
      <span>* Woven Location</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Select Location</option>
        {WOVEN_LOCATION_GROUPS.map((group) => (
          <optgroup label={group.label} key={group.label}>
            {group.options.map((option) => (
              <option value={option} key={option}>
                {option === 'Others' ? `Others:${otherValue ? ` ${otherValue}` : ''}` : option}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
      {value === 'Others' ? (
        <div className="DFF-other-location">
          <span>Others:</span>
          <input
            type="text"
            value={otherValue}
            onChange={(event) => onOtherChange(event.target.value)}
            placeholder="Please Specify"
          />
        </div>
      ) : null}
      {value === 'Others' ? (
        <div className="DFF-custom-woven-location">
          <span>Custom Woven Location</span>
          <label>
            <IoAttach aria-hidden="true" />
            {fileName || 'Attach File'}
            <input type="file" accept=".jpg,.jpeg,.png,image/jpeg,image/png" onChange={onFileChange} />
          </label>
          {fileName ? (
            <button type="button" onClick={onFileRemove} aria-label="Remove attached custom woven location file">
              <IoClose aria-hidden="true" />
            </button>
          ) : null}
          <small>Upload a reference image or mockup showing where you would like the woven label placed.</small>
        </div>
      ) : null}
    </div>
  )
}

function UploadDropzone({ section, files, onFileChange, onFileRemove }) {
  return (
    <div className="DFF-upload-section">
      <h3>{section.label}</h3>
      <label className="DFF-upload-dropzone">
        <IoImageOutline aria-hidden="true" />
        <span>Drop your image here, or upload</span>
        <small>Supports: jpg, png</small>
        <em>Browse File</em>
        <input
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          multiple
          onChange={(event) => onFileChange(section.key, event)}
        />
      </label>
      {files.length > 0 ? (
        <div className="DFF-upload-files">
          <span>Your Files</span>
          {files.map((fileName, index) => (
            <div className="DFF-upload-file-row" key={`${section.key}-${fileName}-${index}`}>
              <p>{fileName}</p>
              <button type="button" onClick={() => onFileRemove(section.key, index)} aria-label={`Remove ${fileName}`}>
                <IoClose aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function SummaryRows({ rows }) {
  return (
    <div className="DFF-pricing-summary-list">
      {rows.map(([label, value]) => (
        <div className="DFF-pricing-summary-row" key={label}>
          <span>{label}</span>
          <strong>{value || 'No Data Yet'}</strong>
        </div>
      ))}
    </div>
  )
}

function escapeHtml(value) {
  return String(value || 'No Data Yet')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function renderPrintRows(rows) {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <th>${escapeHtml(label)}</th>
          <td>${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join('')
}

export default function DirectForm() {
  const [pageScale, setPageScale] = useState(() => getDirectFormScale())
  const [step, setStep] = useState('product-details')
  const [form, setForm] = useState(INITIAL_FORM)
  const [uploadedFiles, setUploadedFiles] = useState({
    woven: [],
    front: [],
    back: [],
    mockup: [],
  })
  const [quantities, setQuantities] = useState({
    xs: '0',
    medium: '0',
    large: '0',
    '2xl': '0',
    '3xl': '0',
  })
  const [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false)
  const [warning, setWarning] = useState('')
  const hasCustomWovenLocation = form.wovenLocation === 'Others'
  const uploadFileExtraHeight = Object.values(uploadedFiles).reduce((total, files) => {
    if (files.length === 0) {
      return total
    }

    return total + DIRECT_FORM_UPLOAD_FIRST_FILE_EXTRA_HEIGHT + (files.length - 1) * DIRECT_FORM_UPLOAD_NEXT_FILE_EXTRA_HEIGHT
  }, 0)
  const pageHeight =
    step === 'pricing'
      ? DIRECT_FORM_PRICING_PAGE_HEIGHT + (priceBreakdownOpen ? DIRECT_FORM_PRICE_BREAKDOWN_EXTRA_HEIGHT : 0)
      : step === 'uploaded-files'
      ? DIRECT_FORM_UPLOAD_PAGE_HEIGHT + uploadFileExtraHeight
      : DIRECT_FORM_PAGE_HEIGHT + (hasCustomWovenLocation ? DIRECT_FORM_CUSTOM_WOVEN_EXTRA_HEIGHT : 0)
  const baseHeight = pageHeight + DIRECT_FORM_FOOTER_HEIGHT
  const quantityTotal = Object.values(quantities).reduce((total, value) => total + (Number.parseInt(value, 10) || 0), 0)
  const printColorAmount =
    Number.parseInt(form.frontColors, 10) || Number.parseInt(form.backColors, 10)
      ? `${(Number.parseInt(form.frontColors, 10) || 0) + (Number.parseInt(form.backColors, 10) || 0)} Colors`
      : 'No Data Yet'
  const productRows = [
    ['Package', form.package],
    ['Print Method', form.printMethod],
    ['Quantity', quantityTotal > 0 ? `${quantityTotal} pcs` : 'No Data Yet'],
    ['Neckline', form.necklineStyle],
    ['Shirt Color', form.shirtColor],
    ['Print Color Amount', printColorAmount],
    ['Add ons', form.wovenLabel === 'yes' ? 'Woven Label' : 'No Data Yet'],
  ]
  const fileRows = UPLOAD_FILE_SECTIONS.map((section) => [
    section.label,
    uploadedFiles[section.key].length > 0 ? uploadedFiles[section.key].join(', ') : 'No Data Yet',
  ])
  const breakdownRows = [
    ['Small', quantities.xs || '0', printColorAmount === 'No Data Yet' ? '0' : printColorAmount, form.wovenLabel === 'yes' ? 'Woven Label' : '0', '0 PHP'],
    ['Medium', quantities.medium || '0', printColorAmount === 'No Data Yet' ? '0' : printColorAmount, form.wovenLabel === 'yes' ? 'Woven Label' : '0', '0 PHP'],
    ['Large', quantities.large || '0', printColorAmount === 'No Data Yet' ? '0' : printColorAmount, form.wovenLabel === 'yes' ? 'Woven Label' : '0', '0 PHP'],
    ['XL', '0', printColorAmount === 'No Data Yet' ? '0' : printColorAmount, form.wovenLabel === 'yes' ? 'Woven Label' : '0', '0 PHP'],
    ['2XL', quantities['2xl'] || '0', printColorAmount === 'No Data Yet' ? '0' : printColorAmount, form.wovenLabel === 'yes' ? 'Woven Label' : '0', '0 PHP'],
    ['3XL', quantities['3xl'] || '0', printColorAmount === 'No Data Yet' ? '0' : printColorAmount, form.wovenLabel === 'yes' ? 'Woven Label' : '0', '0 PHP'],
  ]

  useEffect(() => {
    const handleResize = () => setPageScale(getDirectFormScale())

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
    setWarning('')
  }

  const handleCustomWovenLocationFile = (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    updateForm('customWovenLocationFile', file.name)
    event.target.value = ''
  }

  const handleUploadFileChange = (sectionKey, event) => {
    const fileNames = Array.from(event.target.files ?? []).map((file) => file.name)

    if (fileNames.length === 0) {
      return
    }

    setUploadedFiles((current) => ({
      ...current,
      [sectionKey]: [...current[sectionKey], ...fileNames],
    }))
    setWarning('')
    event.target.value = ''
  }

  const removeUploadFile = (sectionKey, fileIndex) => {
    setUploadedFiles((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].filter((_, index) => index !== fileIndex),
    }))
  }

  const updateQuantity = (sizeKey, value) => {
    setQuantities((current) => ({
      ...current,
      [sizeKey]: value.replace(/\D/g, ''),
    }))
    setWarning('')
  }

  const autoDistributeQuantities = () => {
    setQuantities({
      xs: '10',
      medium: '10',
      large: '10',
      '2xl': '10',
      '3xl': '10',
    })
    setWarning('')
  }

  const validateForm = () => {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'contactNumber',
      'package',
      'fabricType',
      'shirtColor',
      'printSize',
      'printMethod',
      'frontPrint',
      'backPrint',
      'necklineStyle',
      'innerBrandingPrint',
      'wovenLabel',
      'ownWovenLabel',
      'wovenLocation',
    ]

    if (requiredFields.some((field) => !form[field].trim())) {
      setWarning('Please complete all required product details before continuing.')
      return false
    }

    if (form.wovenLocation === 'Others' && !form.wovenLocationOther.trim()) {
      setWarning('Please specify the woven location before continuing.')
      return false
    }

    return true
  }

  const goToUploadFiles = () => {
    if (validateForm()) {
      setStep('uploaded-files')
      setWarning('')
      window.scrollTo(0, 0)
    }
  }

  const validateUploadedFiles = () => {
    const hasUploadedImages = Object.values(uploadedFiles).some((files) => files.length > 0)

    if (!hasUploadedImages) {
      setWarning('Please upload at least one image before continuing.')
      return false
    }

    setWarning('')
    return true
  }

  const goToPricing = () => {
    if (validateUploadedFiles()) {
      setStep('pricing')
      setWarning('')
      window.scrollTo(0, 0)
    }
  }

  const validatePricing = () => {
    if (quantityTotal < 50) {
      setWarning('Please enter a minimum total quantity of 50 pieces before continuing.')
      return false
    }

    setWarning('')
    return true
  }

  const openPricingPdfPreview = () => {
    const printWindow = window.open('', 'direct-form-pricing-pdf', 'width=900,height=1200')

    if (!printWindow) {
      setWarning('Please allow pop-ups to open and print the pricing PDF.')
      return
    }

    const contactRows = [
      ['First Name', form.firstName],
      ['Last Name', form.lastName],
      ['E-mail', form.email],
      ['Contact Number', form.contactNumber],
    ]
    const quantityRows = QUANTITY_SIZES.map((size) => [size.label, `${quantities[size.key] || '0'} pcs`])
    const overallRows = [
      ['TOTAL', 'No Data Yet'],
      ['60% Downpayment', 'No Data Yet'],
      ['40% Balance (Upon Delivery/Pick up)', 'No Data Yet'],
    ]

    printWindow.document.write(`
      <!doctype html>
      <html>
        <head>
          <title>Sorbetes Pricing Quotation</title>
          <style>
            @page { size: A4; margin: 18mm; }
            * { box-sizing: border-box; }
            body {
              margin: 0;
              font-family: Montserrat, Arial, sans-serif;
              color: #000;
              background: #f5f5f5;
            }
            .toolbar {
              position: sticky;
              top: 0;
              z-index: 1;
              display: flex;
              justify-content: flex-end;
              gap: 12px;
              padding: 16px 24px;
              background: #111;
            }
            .toolbar button {
              min-width: 120px;
              height: 40px;
              border: 1px solid #fff;
              border-radius: 8px;
              background: #fff;
              color: #000;
              font-weight: 700;
              cursor: pointer;
            }
            .sheet {
              width: 210mm;
              min-height: 297mm;
              margin: 24px auto;
              padding: 34px 40px;
              background: #fff;
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.18);
            }
            header {
              display: flex;
              justify-content: space-between;
              gap: 24px;
              border-bottom: 3px solid #ffce31;
              padding-bottom: 18px;
              margin-bottom: 28px;
            }
            h1 {
              margin: 0;
              font-size: 30px;
              line-height: 1.15;
            }
            header p,
            section p {
              margin: 6px 0 0;
              color: #555;
              font-size: 12px;
              line-height: 1.5;
            }
            .brand {
              text-align: right;
              font-weight: 800;
              letter-spacing: 0.08em;
            }
            section {
              margin-top: 26px;
              break-inside: avoid;
            }
            h2 {
              margin: 0 0 12px;
              font-size: 17px;
              line-height: 1.2;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 12px;
            }
            th,
            td {
              border-bottom: 1px solid #e5e5e5;
              padding: 9px 0;
              vertical-align: top;
            }
            th {
              width: 34%;
              text-align: left;
              color: #555;
              font-weight: 600;
            }
            td {
              text-align: right;
              font-weight: 500;
            }
            .total td,
            .total th {
              border-top: 2px solid #000;
              font-weight: 800;
            }
            footer {
              margin-top: 36px;
              padding-top: 16px;
              border-top: 1px solid #ddd;
              color: #555;
              font-size: 11px;
              text-align: center;
            }
            @media print {
              body { background: #fff; }
              .toolbar { display: none; }
              .sheet {
                width: auto;
                min-height: auto;
                margin: 0;
                padding: 0;
                box-shadow: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="toolbar">
            <button type="button" onclick="window.print()">Print / Save PDF</button>
            <button type="button" onclick="window.close()">Close</button>
          </div>
          <main class="sheet">
            <header>
              <div>
                <h1>Pricing Quotation</h1>
                <p>Generated from the Sorbetes Fill Form Directly flow.</p>
              </div>
              <div class="brand">
                SORBETES
                <p>Quezon City, Philippines</p>
              </div>
            </header>
            <section>
              <h2>Contact Information</h2>
              <table>${renderPrintRows(contactRows)}</table>
            </section>
            <section>
              <h2>Product Information</h2>
              <table>${renderPrintRows(productRows)}</table>
            </section>
            <section>
              <h2>Your Files</h2>
              <table>${renderPrintRows(fileRows)}</table>
            </section>
            <section>
              <h2>Quantity</h2>
              <table>
                ${renderPrintRows(quantityRows)}
                <tr class="total">
                  <th>Total</th>
                  <td>${escapeHtml(quantityTotal)} pcs</td>
                </tr>
              </table>
            </section>
            <section>
              <h2>Overall</h2>
              <table>${renderPrintRows(overallRows)}</table>
            </section>
            <footer>
              This quotation preview can be printed or saved as PDF from your browser print dialog.
            </footer>
          </main>
          <script>
            window.addEventListener('load', () => {
              setTimeout(() => window.print(), 300);
            });
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
  }

  return (
    <div className="DFF-shell">
      <div
        className="DFF-scale-frame"
        style={{
          width: `${DIRECT_FORM_BASE_WIDTH * pageScale}px`,
          height: `${baseHeight * pageScale}px`,
        }}
      >
        <div className="DFF-scale-content" style={{ height: `${baseHeight}px`, transform: `scale(${pageScale})` }}>
          <main
            className={`DFF-page${hasCustomWovenLocation && step === 'product-details' ? ' DFF-page-custom-woven' : ''}${step === 'uploaded-files' ? ' DFF-page-upload' : ''}${step === 'pricing' ? ' DFF-page-pricing' : ''}`}
            style={{
              height: `${pageHeight}px`,
              '--upload-file-extra-height': `${uploadFileExtraHeight}px`,
            }}
          >
            <Navbar logoSrc={logoCircleImg} currentPage="pricing" />

            <button className="DFF-back" type="button" aria-label="Back to pricing" onClick={() => navigate('?page=pricing')}>
              <IoChevronBack aria-hidden="true" />
            </button>

            <section className="DFF-hero" aria-labelledby="direct-form-title">
              <h1 id="direct-form-title">Fill Form Directly</h1>
              <div />
              <p>Provide your apparel specifications below to generate an accurate quotation.</p>
            </section>

            <nav className="DFF-tabs" aria-label="Direct form sections">
              <button
                className={step === 'product-details' ? 'active' : ''}
                type="button"
                onClick={() => setStep('product-details')}
              >
                Product Details
              </button>
              <button
                className={step === 'uploaded-files' ? 'active' : ''}
                type="button"
                onClick={goToUploadFiles}
              >
                Uploaded Files
              </button>
              <button className={step === 'pricing' ? 'active' : ''} type="button" onClick={goToPricing}>
                Pricing
              </button>
            </nav>

            {step === 'product-details' ? (
            <section className="DFF-card">
              <header className="DFF-card-header">
                <div className="DFF-section-title">
                  <span>1</span>
                  <div>
                    <h2>Product Details</h2>
                    <p>* All product details are required</p>
                  </div>
                </div>
                <button type="button" onClick={() => navigate('?page=guide')}>Guide</button>
              </header>

              <div className="DFF-contact">
                <h3>Contact Information</h3>
                <div className="DFF-social-row">
                  <button type="button">
                    <span className="DFF-google" aria-hidden="true" />
                    Continue with Google
                  </button>
                  <button type="button">
                    <FaFacebookF aria-hidden="true" />
                    Continue with Facebook
                  </button>
                </div>

                <div className="DFF-divider">
                  <span />
                  <em>or</em>
                  <span />
                </div>

                <span className="DFF-muted-label">Personal Information</span>
                <div className="DFF-field-grid">
                  <Field label="* First Name" value={form.firstName} onChange={(value) => updateForm('firstName', value)} placeholder="Enter your First Name" />
                  <Field label="* Last Name" value={form.lastName} onChange={(value) => updateForm('lastName', value)} placeholder="Enter your Last Name" />
                  <Field label="* E-mail" type="email" value={form.email} onChange={(value) => updateForm('email', value)} placeholder="Enter your E-mail" />
                  <Field label="* Contact Number" value={form.contactNumber} onChange={(value) => updateForm('contactNumber', value)} placeholder="Enter your Contact Number" />
                </div>
              </div>

              <div className="DFF-order">
                <h3>Order Details</h3>
                <span className="DFF-muted-label">Apparel &amp; Design</span>
                <SelectField wide label="* Package" value={form.package} onChange={(value) => updateForm('package', value)} placeholder="Select Package" options={SELECT_OPTIONS.package} />

                <div className="DFF-field-grid">
                  <SelectField label="* Fabric Type" value={form.fabricType} onChange={(value) => updateForm('fabricType', value)} placeholder="Select Fabric Type" options={SELECT_OPTIONS.fabricType} />
                  <SelectField label="* Shirt Color" value={form.shirtColor} onChange={(value) => updateForm('shirtColor', value)} placeholder="Choose Shirt Color" options={SELECT_OPTIONS.shirtColor} />
                  <SelectField label="* Print Size" value={form.printSize} onChange={(value) => updateForm('printSize', value)} placeholder="Select Print Size" options={SELECT_OPTIONS.printSize} />
                  <SelectField label="* Print Method" value={form.printMethod} onChange={(value) => updateForm('printMethod', value)} placeholder="Select Print Method" options={SELECT_OPTIONS.printMethod} />
                </div>

                <button className="DFF-color-help" type="button">Not sure about the color?</button>

                <div className="DFF-branding">
                  <span className="DFF-muted-label">Branding</span>
                  <div className="DFF-branding-row">
                    <RadioGroup label="* Front Print?" value={form.frontPrint} onChange={(value) => updateForm('frontPrint', value)} />
                    <label className="DFF-small-field">
                      How many colors?
                      <input value={form.frontColors} onChange={(event) => updateForm('frontColors', event.target.value.replace(/\D/g, ''))} />
                    </label>
                    <RadioGroup label="* Back Print?" value={form.backPrint} onChange={(value) => updateForm('backPrint', value)} />
                    <label className="DFF-small-field">
                      How many colors?
                      <input value={form.backColors} onChange={(event) => updateForm('backColors', event.target.value.replace(/\D/g, ''))} />
                    </label>
                  </div>

                  <div className="DFF-field-grid">
                    <SelectField label="* Neckline Style" value={form.necklineStyle} onChange={(value) => updateForm('necklineStyle', value)} placeholder="Select Neckline Style" options={SELECT_OPTIONS.necklineStyle} />
                    <SelectField label="* Inner Branding Print" value={form.innerBrandingPrint} onChange={(value) => updateForm('innerBrandingPrint', value)} placeholder="Select Inner Branding Print" options={SELECT_OPTIONS.innerBrandingPrint} />
                  </div>

                  <div className="DFF-branding-row DFF-woven-row">
                    <RadioGroup label="* Woven Label?" value={form.wovenLabel} onChange={(value) => updateForm('wovenLabel', value)} />
                    <RadioGroup label="* Own Woven Label?" value={form.ownWovenLabel} onChange={(value) => updateForm('ownWovenLabel', value)} />
                    <WovenLocationField
                      value={form.wovenLocation}
                      otherValue={form.wovenLocationOther}
                      fileName={form.customWovenLocationFile}
                      onChange={(value) => updateForm('wovenLocation', value)}
                      onOtherChange={(value) => updateForm('wovenLocationOther', value)}
                      onFileChange={handleCustomWovenLocationFile}
                      onFileRemove={() => updateForm('customWovenLocationFile', '')}
                    />
                  </div>
                </div>
              </div>

              {warning ? <p className="DFF-warning">{warning}</p> : null}

              <div className="DFF-actions">
                <button type="button" onClick={() => navigate('?page=pricing')}>Back</button>
                <button type="button" onClick={goToUploadFiles}>Next</button>
              </div>
            </section>
            ) : step === 'uploaded-files' ? (
            <section className="DFF-card DFF-upload-card">
              <header className="DFF-card-header">
                <div className="DFF-section-title">
                  <span>2</span>
                  <div>
                    <h2>Upload Files</h2>
                    <p>* All product details are required</p>
                  </div>
                </div>
                <button type="button" onClick={() => navigate('?page=guide')}>Guide</button>
              </header>

              <h3 className="DFF-upload-heading">Uploaded Files</h3>

              <div className="DFF-upload-list">
                {UPLOAD_FILE_SECTIONS.map((section) => (
                  <UploadDropzone
                    section={section}
                    files={uploadedFiles[section.key]}
                    onFileChange={handleUploadFileChange}
                    onFileRemove={removeUploadFile}
                    key={section.key}
                  />
                ))}
              </div>

              {warning ? <p className="DFF-warning DFF-upload-warning">{warning}</p> : null}

              <div className="DFF-actions DFF-upload-actions">
                <button type="button" onClick={() => setStep('product-details')}>Back</button>
                <button type="button" onClick={goToPricing}>Next</button>
              </div>
            </section>
            ) : (
            <section className="DFF-card DFF-pricing-card">
              <header className="DFF-card-header">
                <div className="DFF-section-title">
                  <span>3</span>
                  <div>
                    <h2>Review your Product Details</h2>
                    <p>* All product details are required</p>
                  </div>
                </div>
                <button className="DFF-pricing-download" type="button" onClick={openPricingPdfPreview}>
                  <IoDownloadOutline aria-hidden="true" />
                  Download
                </button>
              </header>

              <div className="DFF-pricing-content">
                <section className="DFF-pricing-block">
                  <h3>Product Information</h3>
                  <SummaryRows rows={productRows} />
                </section>

                <section className="DFF-pricing-block DFF-pricing-files">
                  <h3>Your Files</h3>
                  <SummaryRows rows={fileRows} />
                </section>

                <section className="DFF-pricing-quantity">
                  <h3>Quantity</h3>
                  <p>(Minimum of 50pcs)</p>
                  <div className="DFF-pricing-quantity-box">
                    <div className="DFF-pricing-size-row">
                      {QUANTITY_SIZES.map((size) => (
                        <label key={size.key}>
                          {size.label}
                          <input value={quantities[size.key]} onChange={(event) => updateQuantity(size.key, event.target.value)} />
                        </label>
                      ))}
                    </div>
                    <div className="DFF-pricing-quantity-footer">
                      <div>
                        <strong>Total:</strong>
                        <span>{quantityTotal}</span>
                        <em>pcs</em>
                      </div>
                      <button type="button" onClick={autoDistributeQuantities}>Auto Distribute</button>
                    </div>
                  </div>
                </section>

                <section className="DFF-pricing-block DFF-pricing-overall">
                  <h3>Overall</h3>
                  <SummaryRows
                    rows={[
                      ['TOTAL:', 'No Data Yet'],
                      ['60% Downpayment', 'No Data Yet'],
                      ['40% Balance (Upon Delivery/Pick up)', 'No Data Yet'],
                    ]}
                  />
                  <button
                    type="button"
                    className="DFF-price-breakdown"
                    onClick={() => setPriceBreakdownOpen((current) => !current)}
                  >
                    {priceBreakdownOpen ? 'Show Less' : 'Show Price Breakdown'}
                    <span className={`DFF-breakdown-caret${priceBreakdownOpen ? ' up' : ''}`} aria-hidden="true" />
                  </button>
                </section>

                <section className={`DFF-price-breakdown-panel${priceBreakdownOpen ? ' open' : ''}`}>
                  <h3>Price Breakdown</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Size</th>
                        <th>Quantity</th>
                        <th>Print Color</th>
                        <th>Add Ons</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {breakdownRows.map(([size, quantity, printColor, addOns, amount]) => (
                        <tr key={size}>
                          <td>{size}</td>
                          <td>{quantity}</td>
                          <td>{printColor}</td>
                          <td>{addOns}</td>
                          <td>{amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </div>

              {warning ? <p className="DFF-warning DFF-pricing-warning">{warning}</p> : null}

              <div className="DFF-actions DFF-pricing-actions">
                <button type="button" onClick={validatePricing}>Done</button>
              </div>
            </section>
            )}
          </main>

          <Footer logoSrc={wLogo} />
        </div>
      </div>
    </div>
  )
}
