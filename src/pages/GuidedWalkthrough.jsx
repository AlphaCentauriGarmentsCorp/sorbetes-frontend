import { useEffect, useState } from 'react'
import '../design/GuidedWalkthrough.css'
import { FaCopyright, FaEnvelope, FaFacebookF, FaInstagram, FaPhone, FaTiktok } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoCheckmarkCircle, IoClose, IoDownloadOutline, IoHelpCircleOutline, IoImageOutline, IoPlaySkipForward, IoRefresh } from 'react-icons/io5'
import shirtOversized from '../assets/shirt_oversized.png'
import shirtStandard from '../assets/shirt_standard.png'
import shirtBox from '../assets/shirtt_box.png'
import fullPrintImg from '../assets/fullprint.png'
import regularPrintImg from '../assets/Sign up.jpg'
import neckStandardImg from '../assets/Neck_standard.png'
import neckProclubImg from '../assets/Neck_proclub.png'
import wovenLabelImg from '../assets/woven.png'
import wovenBackImg from '../assets/woven_back.png'
import sorbetesLogoImg from '../assets/Logo/whitelogo.png'
import wLogo from '../assets/w_logo.png'
import Footer from './Footer.jsx'
import { navigate, navigateBack } from '../utils/navigation.js'

const GW_BASE_WIDTH = 1920
const GW_BASE_HEIGHT = 1357
const GW_FIT_BASE_HEIGHT = 1464
const GW_FABRIC_BASE_HEIGHT = 1376
const GW_COLOR_BASE_HEIGHT = 1236
const GW_COLOR_OPEN_HEIGHT = 1541
const GW_PRINT_BASE_HEIGHT = 1522
const GW_METHOD_BASE_HEIGHT = 1424
const GW_FRONT_BASE_HEIGHT = 1342
const GW_BACK_BASE_HEIGHT = 1342
const GW_NECKLINE_BASE_HEIGHT = 1408
const GW_NECKLINE_OPEN_HEIGHT = 1556
const GW_INNER_BRANDING_BASE_HEIGHT = 1478
const GW_WOVEN_LABEL_BASE_HEIGHT = 1115
const GW_WOVEN_LABEL_UPLOAD_BASE_HEIGHT = 1519
const GW_WOVEN_LOCATION_BASE_HEIGHT = 2342
const GW_WOVEN_LOCATION_ATTACH_BASE_HEIGHT = 2500
const GW_UPLOAD_ARTWORK_BASE_HEIGHT = 3561
const GW_UPLOAD_ARTWORK_ROW_EXTRA_HEIGHT = 80
const GW_LOADER_BASE_HEIGHT = 1080
const GW_REVIEW_CARD_TOP = 670
const GW_FOOTER_FULL_HEIGHT = 450
const GW_REVIEW_FOOTER_GAP = 48
const GW_PRODUCT_DETAILS_CARD_HEIGHT = 2345
const GW_UPLOADED_FILES_CARD_HEIGHT = 3127
const GW_PRICING_CARD_BASE_HEIGHT = 2882
const GW_PRODUCT_DETAILS_BASE_HEIGHT =
  GW_REVIEW_CARD_TOP + GW_PRODUCT_DETAILS_CARD_HEIGHT + GW_REVIEW_FOOTER_GAP + GW_FOOTER_FULL_HEIGHT
const GW_UPLOADED_FILES_BASE_HEIGHT =
  GW_REVIEW_CARD_TOP + GW_UPLOADED_FILES_CARD_HEIGHT + GW_REVIEW_FOOTER_GAP + GW_FOOTER_FULL_HEIGHT
const GW_PRICING_BASE_HEIGHT =
  GW_REVIEW_CARD_TOP + GW_PRICING_CARD_BASE_HEIGHT + GW_REVIEW_FOOTER_GAP + GW_FOOTER_FULL_HEIGHT
const GW_PRICE_BREAKDOWN_EXTRA_HEIGHT = 520
const GW_QUOTATION_SENT_BASE_HEIGHT = 2398
const GW_INFO_EXTRA_HEIGHT = 209
const GW_FIT_INFO_EXTRA_HEIGHT = 178
const GW_FABRIC_INFO_EXTRA_HEIGHT = 209
const GW_PRINT_INFO_EXTRA_HEIGHT = 178
const GW_METHOD_EXTRA_OPTIONS_HEIGHT = 258
const GW_METHOD_INFO_EXTRA_HEIGHT = 233

const PRICING_QUANTITY_SIZES = [
  ['xs', 'XS'],
  ['small', 'Small'],
  ['medium', 'Medium'],
  ['large', 'Large'],
  ['xl', 'XL'],
  ['2xl', '2XL'],
  ['3xl', '3XL'],
]

const PRICING_QUANTITY_MIN_TOTAL = 50

const SKIP_SECTION_LABELS = {
  fit: 'fit style selection',
  fabric: 'fabric selection',
  color: 'color selection',
  print: 'print package selection',
  method: 'printing method selection',
  front: 'front design',
  back: 'back design',
  neckline: 'neckline style',
  'inner-branding': 'inner branding',
  'woven-label': 'woven label',
  'own-woven-label': 'own woven label',
  'woven-label-upload': 'woven label upload',
  'woven-location': 'woven location',
  'woven-location-back': 'back woven location',
  'woven-location-reference': 'woven location reference',
  'upload-artwork': 'artwork upload',
}

const SKIP_DESTINATIONS = {
  fit: 'fabric',
  fabric: 'color',
  color: 'print',
  print: 'method',
  method: 'front',
  front: 'back',
  back: 'neckline',
  neckline: 'inner-branding',
  'inner-branding': 'woven-label',
  'woven-label': 'upload-artwork',
  'own-woven-label': 'woven-location',
  'woven-label-upload': 'woven-location',
  'woven-location': 'woven-location-back',
  'woven-location-back': 'woven-location-reference',
  'woven-location-reference': 'upload-artwork',
  'upload-artwork': 'quotation-loader',
}

function getSkipDestination(currentQuestion) {
  return SKIP_DESTINATIONS[currentQuestion] ?? null
}

const APPAREL_INFO = {
  't-shirt': {
    description: 'Carefully produced using premium fabrics and precise construction for a clean, refined finish.',
    note: 'Best for lightweight production and detailed print applications.',
  },
  hoodie: {
    description:
      'Expertly crafted with durable materials and structured construction for elevated comfort and long-lasting quality.',
    note: 'Ideal for thicker fabrics, layered designs, and premium finishing.',
  },
}

const FIT_OPTIONS = [
  {
    key: 'standard',
    label: 'Standard',
    image: shirtStandard,
    description: 'Carefully tailored with precise proportions for a timeless, polished finish.',
    note: 'Best for classic styling and everyday wear.',
  },
  {
    key: 'boxy',
    label: 'Boxy',
    image: shirtBox,
    description: 'Structured with wider dimensions for a modern, fashion-forward shape.',
    note: 'Popular for contemporary streetwear brands.',
  },
  {
    key: 'oversized',
    label: 'Oversized',
    image: shirtOversized,
    description: 'Crafted with relaxed proportions for comfort and bold visual impact.',
    note: 'Perfect for expressive and trend-led designs.',
  },
]

const FABRIC_OPTIONS = [
  {
    key: 'soft-lightweight',
    label: 'Soft & Lightweight (220-240 GSM)',
    description: 'Crafted from breathable, lightweight fabrics for a smooth texture and comfortable everyday wear.',
    note: 'Perfect for breathable, comfortable shirts that feel light on the body—ideal for everyday wear, events, and active lifestyles.',
  },
  {
    key: 'thick-premium',
    label: 'Thick & Premium (280 GSM)',
    description: 'Constructed using dense, high-quality fabrics for enhanced structure, durability, and long-lasting performance.',
    note: 'A heavier fabric with a more structured feel—great for premium brands and streetwear looking for a solid, high-quality shirt.',
  },
]

const COLOR_SWATCHES = Array.from({ length: 69 }, (_, index) => index)

const LIGHT_SWATCH_COLORS = COLOR_SWATCHES.map((index) => `hsl(${(index * 19) % 360}, 72%, 72%)`)
const DARK_SWATCH_COLORS = COLOR_SWATCHES.map((index) => `hsl(${(index * 19) % 360}, 58%, 32%)`)

const PRINT_OPTIONS = [
  {
    key: 'full-print',
    label: 'Full Print',
    image: fullPrintImg,
    description: 'Applied with precise detailing for subtle branding and a clean, refined appearance.',
    note: 'Produced with expanded coverage for bold visuals and strong design impact.',
  },
  {
    key: 'regular-print',
    label: 'Regular Print (14X20)',
    image: regularPrintImg,
    description: 'Ideal for minimal designs, logos, and understated brand presentation.',
    note: 'Applied with precise detailing for subtle branding and a clean, refined appearance.',
  },
]

const PRINTING_METHOD_OPTIONS = [
  {
    key: 'silkscreen',
    label: 'Silkscreen (Water-based)',
    description:
      'Our signature screen printing method uses water-based inks to produce vibrant colors, exceptional print clarity, and a soft, breathable finish that maintains long-lasting quality.',
    note: 'Best suited for cotton fabrics and premium, comfortable wear.',
  },
  {
    key: 'sublimation',
    label: 'Sublimation',
    description: 'A heat-transfer process that infuses the design directly into the fabric for seamless, full-color results.',
    note: 'Best for detailed artwork and all-over printing applications.',
  },
  {
    key: 'dtf',
    label: 'DTF',
    description:
      'Direct-to-Film is an advanced printing method that transfers detailed designs with strong color accuracy and flexibility.',
    note: 'Suitable for complex designs and multi-color prints.',
  },
  {
    key: 'embroidery',
    label: 'Embroidery',
    description: 'A classic stitching technique that adds texture, durability, and a refined finish to your design.',
    note: 'Best for logos and branding that require a premium, long-lasting, and textured look.',
  },
  {
    key: 'high-density',
    label: 'High Density',
    description:
      'A specialized printing method that creates raised, dimensional designs with a bold and structured feel.',
    note: 'Ideal for designs that need a thick, elevated texture for a more striking and premium appearance.',
  },
]

const FRONT_DESIGN_OPTIONS = [
  { key: 'yes', label: 'Yes' },
  { key: 'no', label: 'No' },
]

const NECKLINE_OPTIONS = [
  {
    key: 'standard-neckline',
    label: 'Standard',
    image: neckStandardImg,
    description: 'Carefully finished with a clean, classic collar construction for a balanced and timeless look.',
    note: 'Best suited for everyday wear and traditional styling.',
  },
  {
    key: 'pro-club-neckline',
    label: 'Pro Club',
    image: neckProclubImg,
    description: 'Constructed with a thicker, structured collar for a firm shape and elevated streetwear aesthetic.',
    note: 'Ideal for modern, trend-driven designs and structured silhouettes.',
  },
]

const INNER_BRANDING_OPTIONS = [
  {
    key: 'silk-screen',
    label: 'Silk Screen',
    description: 'A precise printing method that applies branding with strong coverage and lasting durability.',
    note: 'Ideal for clear, bold inner branding.',
  },
  {
    key: 'dtf',
    label: 'DTF',
    description: 'An advanced transfer technique that delivers detailed branding with excellent color accuracy and flexibility.',
    note: 'Suitable for intricate designs and multi-color branding.',
  },
  {
    key: 'pending',
    label: 'pending',
    description: 'lorem ipsum',
    note: 'lorem ipsum/lorem ipsum',
  },
]

const WOVEN_LOCATION_OPTIONS = [
  {
    key: 'neck-main',
    label: 'Neck Label/ Main Label',
    className: 'neck-main',
    note: 'Main brand label showing brand name, size, and sometimes country of origin',
  },
  {
    key: 'tagless-neckprint',
    label: 'Tagless Neckprint',
    className: 'tagless',
    note: 'Ink printed label to comfort, often used to avoid itchiness',
  },
  {
    key: 'size-label',
    label: 'Size Label',
    className: 'size',
    note: 'Small tag indicating shirt size (S, M, L, etc.)',
  },
  {
    key: 'sleeve-label',
    label: 'Sleeve Label',
    className: 'sleeve',
    note: 'Small woven tag placed on the sleeve with the brand logo',
  },
  {
    key: 'hem-label',
    label: 'Hem Label',
    className: 'hem',
    note: 'Small woven tag displaying the brand logo',
  },
]

const WOVEN_BACK_LOCATION_OPTIONS = [
  {
    key: 'care-wash-label',
    label: 'Care Label / Wash Label',
    className: 'care',
    note: 'Contains washing instructions, fabric composition, and manufacturer information',
  },
]

const UPLOAD_ARTWORK_SECTIONS = [
  { key: 'woven', label: 'Woven File' },
  { key: 'front', label: 'Front Print' },
  { key: 'back', label: 'Back Print' },
  { key: 'mockup', label: 'Mockup' },
]

function getGuidedWalkthroughScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / GW_BASE_WIDTH, 0.18), 1)
}

function getOptionLabel(options, selectedKey, fallback = '-') {
  return options.find((option) => option.key === selectedKey)?.label ?? fallback
}

function getYesNoLabel(selectedKey) {
  if (selectedKey === 'yes') {
    return 'Yes'
  }

  if (selectedKey === 'no') {
    return 'No'
  }

  return '-'
}

function getWovenLocationLabel(selectedKeys, otherTextValue) {
  if (selectedKeys.includes('others') && otherTextValue.trim()) {
    return otherTextValue.trim()
  }

  const locationLabels = selectedKeys
    .filter((key) => key !== 'others')
    .map(
      (key) =>
        WOVEN_LOCATION_OPTIONS.find((option) => option.key === key)?.label ??
        WOVEN_BACK_LOCATION_OPTIONS.find((option) => option.key === key)?.label,
    )
    .filter(Boolean)

  return locationLabels.join(', ') || '-'
}

function GWReviewFooter({ className = '', style }) {
  const wrapClass = ['GW-review-footer-wrap', className].filter(Boolean).join(' ')
  return (
    <div className={wrapClass} style={style}>
      <Footer logoSrc={wLogo} />
    </div>
  )
}

export default function GuidedWalkthrough() {
  const [pageScale, setPageScale] = useState(() => getGuidedWalkthroughScale())
  const [question, setQuestion] = useState('garment')
  const [selectedApparel, setSelectedApparel] = useState('')
  const [selectedFit, setSelectedFit] = useState('')
  const [selectedFabric, setSelectedFabric] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedPrint, setSelectedPrint] = useState('')
  const [selectedMethod, setSelectedMethod] = useState('')
  const [frontDesign, setFrontDesign] = useState('')
  const [frontColorCount, setFrontColorCount] = useState('')
  const [backDesign, setBackDesign] = useState('')
  const [backColorCount, setBackColorCount] = useState('')
  const [selectedNeckline, setSelectedNeckline] = useState('')
  const [selectedInnerBranding, setSelectedInnerBranding] = useState('')
  const [selectedWovenLabel, setSelectedWovenLabel] = useState('')
  const [selectedOwnWovenLabel, setSelectedOwnWovenLabel] = useState('')
  const [wovenLabelFileName, setWovenLabelFileName] = useState('')
  const [selectedWovenLocations, setSelectedWovenLocations] = useState([])
  const [wovenLocationOther, setWovenLocationOther] = useState('')
  const [selectedWovenBackLocations, setSelectedWovenBackLocations] = useState([])
  const [wovenBackLocationOther, setWovenBackLocationOther] = useState('')
  const [selectedWovenReferenceLocations, setSelectedWovenReferenceLocations] = useState([])
  const [wovenReferenceLocationOther, setWovenReferenceLocationOther] = useState('')
  const [wovenReferenceFileName, setWovenReferenceFileName] = useState('')
  const [reviewContactInfo, setReviewContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
  })
  const [pricingQuantities, setPricingQuantities] = useState(() =>
    Object.fromEntries(
      PRICING_QUANTITY_SIZES.map(([key], index) => {
        const base = Math.floor(PRICING_QUANTITY_MIN_TOTAL / PRICING_QUANTITY_SIZES.length)
        const remainder = PRICING_QUANTITY_MIN_TOTAL % PRICING_QUANTITY_SIZES.length
        return [key, String(base + (index < remainder ? 1 : 0))]
      }),
    ),
  )
  const [artworkFiles, setArtworkFiles] = useState({
    woven: [],
    front: [],
    back: [],
    mockup: [],
  })
  const [colorDropdownOpen, setColorDropdownOpen] = useState(false)
  const [activeColorTab, setActiveColorTab] = useState('light')
  const [otherText, setOtherText] = useState('')
  const [openInfo, setOpenInfo] = useState([])
  const [openFitInfo, setOpenFitInfo] = useState([])
  const [openFabricInfo, setOpenFabricInfo] = useState([])
  const [openPrintInfo, setOpenPrintInfo] = useState([])
  const [openMethodInfo, setOpenMethodInfo] = useState([])
  const [openNecklineInfo, setOpenNecklineInfo] = useState([])
  const [openInnerBrandingInfo, setOpenInnerBrandingInfo] = useState([])
  const [openWovenLocationInfo, setOpenWovenLocationInfo] = useState([])
  const [openWovenBackLocationInfo, setOpenWovenBackLocationInfo] = useState([])
  const [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false)
  const [exitModalOpen, setExitModalOpen] = useState(false)
  const [skipConfirmOpen, setSkipConfirmOpen] = useState(false)
  const [warningMessage, setWarningMessage] = useState('')
  const infoExtraHeight = openInfo.length * GW_INFO_EXTRA_HEIGHT
  const fitInfoExtraHeight = openFitInfo.length > 0 ? GW_FIT_INFO_EXTRA_HEIGHT : 0
  const fabricInfoExtraHeight = openFabricInfo.length * GW_FABRIC_INFO_EXTRA_HEIGHT
  const colorDropdownExtraHeight = colorDropdownOpen ? 345 : 0
  const printInfoExtraHeight = openPrintInfo.length > 0 ? GW_PRINT_INFO_EXTRA_HEIGHT : 0
  const methodInfoExtraHeight = openMethodInfo.length * GW_METHOD_INFO_EXTRA_HEIGHT
  const necklineInfoOpen = openNecklineInfo.length > 0
  const innerBrandingInfoExtraHeight = openInnerBrandingInfo.length * GW_INFO_EXTRA_HEIGHT
  const artworkFileExtraHeight =
    Object.values(artworkFiles).reduce((total, files) => total + files.length, 0) * GW_UPLOAD_ARTWORK_ROW_EXTRA_HEIGHT
  const uploadedFilesHiddenWovenOffset = selectedOwnWovenLabel === 'yes' ? 0 : 612
  const priceBreakdownExtraHeight = priceBreakdownOpen ? GW_PRICE_BREAKDOWN_EXTRA_HEIGHT : 0
  const isLoaderQuestion = question === 'quotation-loader'
  const isReviewQuestion =
    question === 'product-details' || question === 'uploaded-files' || question === 'pricing' || question === 'quotation-sent'
  const pageHeight =
    isLoaderQuestion
      ? GW_LOADER_BASE_HEIGHT
      : question === 'quotation-sent'
        ? GW_QUOTATION_SENT_BASE_HEIGHT
      : question === 'pricing'
        ? GW_REVIEW_CARD_TOP +
          GW_PRICING_CARD_BASE_HEIGHT +
          priceBreakdownExtraHeight +
          GW_REVIEW_FOOTER_GAP +
          GW_FOOTER_FULL_HEIGHT
      : question === 'uploaded-files'
        ? GW_UPLOADED_FILES_BASE_HEIGHT - uploadedFilesHiddenWovenOffset
      : isReviewQuestion
        ? GW_PRODUCT_DETAILS_BASE_HEIGHT
      : question === 'fit'
      ? GW_FIT_BASE_HEIGHT + fitInfoExtraHeight
      : question === 'fabric'
        ? GW_FABRIC_BASE_HEIGHT + fabricInfoExtraHeight
        : question === 'color'
          ? colorDropdownOpen
            ? GW_COLOR_OPEN_HEIGHT
            : GW_COLOR_BASE_HEIGHT
          : question === 'print'
            ? GW_PRINT_BASE_HEIGHT + printInfoExtraHeight
            : question === 'method'
              ? GW_METHOD_BASE_HEIGHT + GW_METHOD_EXTRA_OPTIONS_HEIGHT + methodInfoExtraHeight
              : question === 'front'
                ? GW_FRONT_BASE_HEIGHT
                : question === 'back'
                  ? GW_BACK_BASE_HEIGHT
                  : question === 'neckline'
                    ? necklineInfoOpen
                      ? GW_NECKLINE_OPEN_HEIGHT
                      : GW_NECKLINE_BASE_HEIGHT
                    : question === 'inner-branding'
                      ? GW_INNER_BRANDING_BASE_HEIGHT + innerBrandingInfoExtraHeight
                      : question === 'woven-label'
                        ? GW_WOVEN_LABEL_BASE_HEIGHT
                        : question === 'own-woven-label'
                          ? GW_WOVEN_LABEL_BASE_HEIGHT
                          : question === 'woven-label-upload'
                            ? GW_WOVEN_LABEL_UPLOAD_BASE_HEIGHT
                            : question === 'woven-location'
                              ? GW_WOVEN_LOCATION_BASE_HEIGHT
                              : question === 'woven-location-back'
                                ? GW_WOVEN_LOCATION_BASE_HEIGHT
                                : question === 'woven-location-reference'
                                  ? GW_WOVEN_LOCATION_ATTACH_BASE_HEIGHT
                                  : question === 'upload-artwork'
                                    ? GW_UPLOAD_ARTWORK_BASE_HEIGHT + artworkFileExtraHeight
          : GW_BASE_HEIGHT + infoExtraHeight

  const showWarning = (message) => {
    setWarningMessage(message)
  }

  const openSkipConfirm = () => {
    if (getSkipDestination(question)) {
      setSkipConfirmOpen(true)
    }
  }

  const cancelSkip = () => {
    setSkipConfirmOpen(false)
  }

  const confirmSkip = () => {
    const nextQuestion = getSkipDestination(question)

    if (nextQuestion) {
      setQuestion(nextQuestion)
      setWarningMessage('')
    }

    setSkipConfirmOpen(false)
  }

  const toggleWovenLocation = (locationKey) => {
    setSelectedWovenLocations((current) =>
      current.includes(locationKey) ? current.filter((item) => item !== locationKey) : [...current, locationKey],
    )
    setWarningMessage('')
  }

  const toggleWovenLocationInfo = (locationKey) => {
    setOpenWovenLocationInfo((current) =>
      current.includes(locationKey) ? current.filter((item) => item !== locationKey) : [...current, locationKey],
    )
  }

  const toggleWovenBackLocation = (locationKey) => {
    setSelectedWovenBackLocations((current) =>
      current.includes(locationKey) ? current.filter((item) => item !== locationKey) : [...current, locationKey],
    )
    setWarningMessage('')
  }

  const toggleWovenBackLocationInfo = (locationKey) => {
    setOpenWovenBackLocationInfo((current) =>
      current.includes(locationKey) ? current.filter((item) => item !== locationKey) : [...current, locationKey],
    )
  }

  const toggleWovenReferenceLocation = (locationKey) => {
    setSelectedWovenReferenceLocations((current) =>
      current.includes(locationKey) ? current.filter((item) => item !== locationKey) : [...current, locationKey],
    )
    setWarningMessage('')
  }

  const handleArtworkFileChange = (sectionKey, event) => {
    const fileNames = Array.from(event.target.files ?? []).map((file) => file.name)

    if (fileNames.length === 0) {
      return
    }

    setArtworkFiles((current) => ({
      ...current,
      [sectionKey]: [...current[sectionKey], ...fileNames],
    }))
    setWarningMessage('')
    event.target.value = ''
  }

  const removeArtworkFile = (sectionKey, fileIndex) => {
    setArtworkFiles((current) => ({
      ...current,
      [sectionKey]: current[sectionKey].filter((_, index) => index !== fileIndex),
    }))
  }

  const updateReviewContactInfo = (field, value) => {
    setReviewContactInfo((current) => ({
      ...current,
      [field]: value,
    }))
    setWarningMessage('')
  }

  const validateReviewContactInfo = () => {
    if (!reviewContactInfo.firstName.trim()) {
      showWarning('Please enter your first name before continuing.')
      return false
    }

    if (!reviewContactInfo.lastName.trim()) {
      showWarning('Please enter your last name before continuing.')
      return false
    }

    if (!reviewContactInfo.email.trim()) {
      showWarning('Please enter your email before continuing.')
      return false
    }

    if (!reviewContactInfo.contactNumber.trim()) {
      showWarning('Please enter your contact number before continuing.')
      return false
    }

    return true
  }

  const updatePricingQuantity = (sizeKey, value) => {
    setPricingQuantities((current) => ({
      ...current,
      [sizeKey]: value.replace(/\D/g, ''),
    }))
    setWarningMessage('')
  }

  const autoDistributeQuantities = () => {
    const base = Math.floor(PRICING_QUANTITY_MIN_TOTAL / PRICING_QUANTITY_SIZES.length)
    const remainder = PRICING_QUANTITY_MIN_TOTAL % PRICING_QUANTITY_SIZES.length
    setPricingQuantities(
      Object.fromEntries(
        PRICING_QUANTITY_SIZES.map(([key], index) => [
          key,
          String(base + (index < remainder ? 1 : 0)),
        ]),
      ),
    )
    setWarningMessage('')
  }

  const hasArtworkFiles = Object.values(artworkFiles).some((files) => files.length > 0)
  const pricingTotalPieces = Object.values(pricingQuantities).reduce(
    (total, value) => total + (Number.parseInt(value, 10) || 0),
    0,
  )
  const selectedFitLabel = getOptionLabel(FIT_OPTIONS, selectedFit)
  const selectedFabricLabel = getOptionLabel(FABRIC_OPTIONS, selectedFabric)
  const selectedPrintLabel = getOptionLabel(PRINT_OPTIONS, selectedPrint)
  const selectedMethodLabel = getOptionLabel(PRINTING_METHOD_OPTIONS, selectedMethod)
  const selectedNecklineLabel = getOptionLabel(NECKLINE_OPTIONS, selectedNeckline)
  const selectedInnerBrandingLabel = getOptionLabel(INNER_BRANDING_OPTIONS, selectedInnerBranding)
  const selectedWovenLocationLabel = getWovenLocationLabel(
    [...selectedWovenLocations, ...selectedWovenBackLocations],
    wovenLocationOther || wovenBackLocationOther,
  )
  const visibleUploadedFileSections = UPLOAD_ARTWORK_SECTIONS.filter(
    (section) => section.key !== 'woven' || selectedOwnWovenLabel === 'yes',
  )
  const pricingProductRows = [
    ['Package', 'Standard (DTF)'],
    ['Fabric', selectedFabricLabel],
    ['Shirt Color', selectedColor || '11-4201'],
    ['Print Size', selectedPrintLabel],
    ['Print Method', selectedMethodLabel],
    ['Neckline', selectedNecklineLabel],
    ['Print Color Amount', frontColorCount || backColorCount ? '1-2 Colors' : '0'],
    ['Total Pieces', String(pricingTotalPieces)],
    ['Add ons', '0'],
  ]
  const pricingBrandingRows = [
    ['Front Print', getYesNoLabel(frontDesign)],
    ['Back Print', getYesNoLabel(backDesign)],
    ['Inner Branding Print', selectedInnerBrandingLabel],
    ['Woven Label', getYesNoLabel(selectedWovenLabel)],
    ['Own Woven Label', getYesNoLabel(selectedOwnWovenLabel)],
    ['Woven Label Location', selectedWovenLocationLabel === '-' ? 'N/A' : selectedWovenLocationLabel],
  ]
  const isFilesStage =
    question === 'front' ||
    question === 'back' ||
    question === 'neckline' ||
    question === 'inner-branding' ||
    question === 'woven-label' ||
    question === 'own-woven-label' ||
    question === 'woven-label-upload' ||
    question === 'woven-location' ||
    question === 'woven-location-back' ||
    question === 'woven-location-reference' ||
    question === 'upload-artwork'

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getGuidedWalkthroughScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isLoaderQuestion) {
      return undefined
    }

    const loaderTimer = window.setTimeout(() => {
      setQuestion('product-details')
    }, 1500)

    return () => window.clearTimeout(loaderTimer)
  }, [isLoaderQuestion])

  return (
    <div className="GW-shell">
      <div
        className="GW-scale-frame"
        style={{
          width: `${GW_BASE_WIDTH * pageScale}px`,
          height: `${pageHeight * pageScale}px`,
        }}
      >
        <div
          className={`GW-page ${isReviewQuestion ? 'GW-review-page' : ''}`}
          style={{ height: `${pageHeight}px`, transform: `scale(${pageScale})` }}
        >
          {!isLoaderQuestion ? (
            <button
              className="GW-close-x"
              type="button"
              aria-label="Close guided walkthrough"
              onClick={() => setExitModalOpen(true)}
            >
              <IoClose aria-hidden="true" />
            </button>
          ) : null}

          <main className="GW-main-container">
            {!isLoaderQuestion ? (
              <div className={`GW-stepper ${question === 'quotation-sent' ? 'GW-stepper-complete' : ''}`}>
                <div className={isFilesStage || isReviewQuestion ? 'step step-completed' : 'step active'}>
                  <span className="step-num">{isFilesStage || isReviewQuestion ? '✓' : '1'}</span>
                  <span className="step-label">Apparel & Design</span>
                </div>
                <div className="step-line"></div>
                <div className={isReviewQuestion ? 'step step-completed' : isFilesStage ? 'step active' : 'step'}>
                  <span className="step-num">{isReviewQuestion ? '✓' : '2'}</span>
                  <span className="step-label">Files and Branding</span>
                </div>
                <div className="step-line"></div>
                <div className={question === 'quotation-sent' ? 'step step-completed' : isReviewQuestion ? 'step active' : 'step'}>
                  <span className="step-num">{question === 'quotation-sent' ? '✓' : '3'}</span>
                  <span className="step-label">Review</span>
                </div>
              </div>
            ) : null}

            {question === 'quotation-loader' ? (
              <div className="GW-loader-page">
                <div className="GW-loader-content">
                  <div className="GW-loader-logo">
                    <img src={sorbetesLogoImg} alt="Sorbetes" />
                  </div>
                  <div className="GW-loader-progress-block">
                    <div className="GW-loader-progress-track">
                      <span className="GW-loader-progress-fill"></span>
                    </div>
                    <p>Generating Results...</p>
                  </div>
                </div>

                <div className="GW-loader-footer">
                  <div className="GW-loader-brand">
                    <span className="GW-loader-brand-icon">
                      <img src={sorbetesLogoImg} alt="" />
                    </span>
                    <span>Sorbetes</span>
                  </div>
                  <div className="GW-loader-copyright">
                    <span className="GW-loader-copyright-icon">©</span>
                    <span>2002-2025 Sorbetes. All rights reserved.</span>
                  </div>
                </div>
              </div>
            ) : question === 'product-details' ? (
              <div className="GW-review-order-page">
                <section className="GW-review-hero">
                  <h1>Review Your Order</h1>
                  <div className="GW-review-title-line" />
                  <p>Check your selections and make any edits before submission.</p>
                </section>

                <nav className="GW-review-tabs" aria-label="Review sections">
                  <button className="active" type="button" onClick={() => setQuestion('product-details')}>
                    Product Details
                  </button>
                  <button type="button" onClick={() => setQuestion('uploaded-files')}>
                    Uploaded Files
                  </button>
                  <button type="button" onClick={() => setQuestion('pricing')}>
                    Pricing
                  </button>
                </nav>

                <section className="GW-review-card">
                  <div className="GW-review-card-header">
                    <div className="GW-review-section-title">
                      <span className="GW-review-section-num">1</span>
                      <div>
                        <h2>Product Details</h2>
                        <p>* All product details are required</p>
                      </div>
                    </div>
                    <button type="button">Guide</button>
                  </div>

                  <div className="GW-review-contact">
                    <h3>Contact Information</h3>
                    <div className="GW-review-social-row">
                      <button type="button">
                        <span className="GW-review-google" aria-hidden="true"></span>
                        Continue with Google
                      </button>
                      <button type="button">
                        <FaFacebookF aria-hidden="true" />
                        Continue with Facebook
                      </button>
                    </div>
                    <div className="GW-review-divider">
                      <span />
                      <em>or</em>
                      <span />
                    </div>
                    <span className="GW-review-muted-label">Personal Information</span>
                    <div className="GW-review-field-grid">
                      <label>
                        * First Name
                        <input
                          type="text"
                          value={reviewContactInfo.firstName}
                          onChange={(event) => updateReviewContactInfo('firstName', event.target.value)}
                        />
                      </label>
                      <label>
                        * Last Name
                        <input
                          type="text"
                          value={reviewContactInfo.lastName}
                          onChange={(event) => updateReviewContactInfo('lastName', event.target.value)}
                        />
                      </label>
                      <label>
                        * E-mail
                        <input
                          type="email"
                          value={reviewContactInfo.email}
                          onChange={(event) => updateReviewContactInfo('email', event.target.value)}
                        />
                      </label>
                      <label>
                        * Contact Number
                        <input
                          type="text"
                          value={reviewContactInfo.contactNumber}
                          onChange={(event) => updateReviewContactInfo('contactNumber', event.target.value)}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="GW-review-order-details">
                    <h3>Order Details</h3>
                    <span className="GW-review-muted-label">Apparel &amp; Design</span>
                    <label className="GW-review-field-full">
                      * Package
                      <select value="Standard (DTF)" disabled>
                        <option>Standard (DTF)</option>
                      </select>
                    </label>

                    <div className="GW-review-field-grid">
                      <label>
                        * Fabric Type
                        <select value={selectedFabricLabel} disabled>
                          <option>{selectedFabricLabel}</option>
                        </select>
                      </label>
                      <label>
                        * Shirt Color
                        <select value={selectedColor || '11-4201'} disabled>
                          <option>{selectedColor || '11-4201'}</option>
                        </select>
                      </label>
                      <label>
                        * Print Size
                        <select value={selectedPrintLabel} disabled>
                          <option>{selectedPrintLabel}</option>
                        </select>
                      </label>
                      <label>
                        * Print Method
                        <select value={selectedMethodLabel} disabled>
                          <option>{selectedMethodLabel}</option>
                        </select>
                      </label>
                    </div>

                    <button className="GW-review-color-help" type="button">
                      Not sure about the color?
                    </button>

                    <div className="GW-review-branding">
                      <span className="GW-review-muted-label">Branding</span>
                      <div className="GW-review-branding-row">
                        <div className="GW-review-radio-group">
                          <span>* Front Print?</span>
                          <div>
                            <span className={frontDesign === 'yes' ? 'checked' : ''}>Yes</span>
                            <span className={frontDesign === 'no' ? 'checked' : ''}>No</span>
                          </div>
                        </div>
                        <label className="GW-review-small-field">
                          How many colors?
                          <input type="text" value={frontColorCount || '0'} readOnly />
                        </label>
                        <div className="GW-review-radio-group">
                          <span>* Back Print?</span>
                          <div>
                            <span className={backDesign === 'yes' ? 'checked' : ''}>Yes</span>
                            <span className={backDesign === 'no' ? 'checked' : ''}>No</span>
                          </div>
                        </div>
                        <label className="GW-review-small-field">
                          How many colors?
                          <input type="text" value={backColorCount || '0'} readOnly />
                        </label>
                      </div>

                      <div className="GW-review-field-grid">
                        <label>
                          * Neckline Style
                          <select value={selectedNecklineLabel} disabled>
                            <option>{selectedNecklineLabel}</option>
                          </select>
                        </label>
                        <label>
                          * Inner Branding Print
                          <select value={selectedInnerBrandingLabel} disabled>
                            <option>{selectedInnerBrandingLabel}</option>
                          </select>
                        </label>
                      </div>

                      <div className="GW-review-branding-row GW-review-woven-row">
                        <div className="GW-review-radio-group GW-review-compact-radio">
                          <span>* Woven Label?</span>
                          <div>
                            <span className={selectedWovenLabel === 'yes' ? 'checked' : ''}>Yes</span>
                            <span className={selectedWovenLabel === 'no' ? 'checked' : ''}>No</span>
                          </div>
                        </div>
                        <div className="GW-review-radio-group GW-review-compact-radio">
                          <span>* Own Woven Label?</span>
                          <div>
                            <span className={selectedOwnWovenLabel === 'yes' ? 'checked' : ''}>Yes</span>
                            <span className={selectedOwnWovenLabel === 'no' ? 'checked' : ''}>No</span>
                          </div>
                        </div>
                        <label>
                          * Woven Location
                          <select value={selectedWovenLocationLabel} disabled>
                            <option>{selectedWovenLocationLabel}</option>
                          </select>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="GW-review-actions">
                    <button type="button" onClick={() => setQuestion('upload-artwork')}>
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (validateReviewContactInfo()) {
                          setQuestion('uploaded-files')
                        }
                      }}
                    >
                      Next
                    </button>
                  </div>
                </section>

                <GWReviewFooter />
              </div>
            ) : question === 'uploaded-files' ? (
              <div
                className="GW-review-order-page GW-review-uploaded-page"
                style={{ height: `${GW_UPLOADED_FILES_BASE_HEIGHT - uploadedFilesHiddenWovenOffset}px` }}
              >
                <section className="GW-review-hero">
                  <h1>Review Your Order</h1>
                  <div className="GW-review-title-line" />
                  <p>Check your selections and make any edits before submission.</p>
                </section>

                <nav className="GW-review-tabs" aria-label="Review sections">
                  <button type="button" onClick={() => setQuestion('product-details')}>
                    Product Details
                  </button>
                  <button className="active" type="button" onClick={() => setQuestion('uploaded-files')}>
                    Uploaded Files
                  </button>
                  <button type="button" onClick={() => setQuestion('pricing')}>
                    Pricing
                  </button>
                </nav>

                <section
                  className="GW-review-card GW-review-uploaded-card"
                  style={{ height: `${3127 - uploadedFilesHiddenWovenOffset}px` }}
                >
                  <div className="GW-review-card-header">
                    <div className="GW-review-section-title">
                      <span className="GW-review-section-num">2</span>
                      <div>
                        <h2>Upload Files</h2>
                        <p>* All product details are required</p>
                      </div>
                    </div>
                    <button type="button">Guide</button>
                  </div>

                  <h3 className="GW-review-uploaded-heading">Uploaded Files</h3>

                  <div className="GW-review-uploaded-list">
                    {visibleUploadedFileSections.map((section) => (
                      <div className="GW-artwork-upload-section" key={section.key}>
                        <h2>{section.label}</h2>
                        <label className="GW-upload-dropzone GW-artwork-dropzone">
                          <IoImageOutline className="GW-upload-icon" aria-hidden="true" />
                          <span className="GW-upload-title">Drop your image here, or upload</span>
                          <span className="GW-upload-support">Supports: jpg, png</span>
                          <span className="GW-upload-browse">Browse File</span>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                            multiple
                            onChange={(event) => handleArtworkFileChange(section.key, event)}
                          />
                        </label>

                        {artworkFiles[section.key].length > 0 ? (
                          <div className="GW-upload-files GW-artwork-files">
                            <span className="GW-upload-files-label GW-artwork-files-label">Your Files</span>
                            {artworkFiles[section.key].map((fileName, index) => (
                              <div className="GW-upload-file-row GW-artwork-file-row" key={`${fileName}-${index}`}>
                                <span className="GW-upload-file-name">
                                  <IoImageOutline aria-hidden="true" />
                                  {fileName}
                                </span>
                                <button
                                  type="button"
                                  className="GW-upload-remove"
                                  aria-label={`Remove ${fileName}`}
                                  onClick={() => removeArtworkFile(section.key, index)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div
                    className="GW-review-actions GW-review-uploaded-actions"
                    style={{ top: `${2940 - uploadedFilesHiddenWovenOffset}px` }}
                  >
                    <button type="button" onClick={() => setQuestion('product-details')}>
                      Back
                    </button>
                    <button type="button" onClick={() => setQuestion('pricing')}>
                      Next
                    </button>
                  </div>
                </section>

                <GWReviewFooter className="GW-review-uploaded-footer" />
              </div>
            ) : question === 'pricing' ? (
              <div
                className="GW-review-order-page GW-pricing-page"
                style={{ height: `${GW_PRICING_BASE_HEIGHT + priceBreakdownExtraHeight}px` }}
              >
                <section className="GW-review-hero">
                  <h1>Review Your Order</h1>
                  <div className="GW-review-title-line" />
                  <p>Check your selections and make any edits before submission.</p>
                </section>

                <nav className="GW-review-tabs" aria-label="Review sections">
                  <button type="button" onClick={() => setQuestion('product-details')}>
                    Product Details
                  </button>
                  <button type="button" onClick={() => setQuestion('uploaded-files')}>
                    Uploaded Files
                  </button>
                  <button className="active" type="button" onClick={() => setQuestion('pricing')}>
                    Pricing
                  </button>
                </nav>

                <section
                  className="GW-review-card GW-pricing-card"
                  style={{ height: `${GW_PRICING_CARD_BASE_HEIGHT + priceBreakdownExtraHeight}px` }}
                >
                  <div className="GW-review-card-header">
                    <div className="GW-review-section-title">
                      <span className="GW-review-section-num">3</span>
                      <div>
                        <h2>Review your Product Details</h2>
                        <p>* All product details are required</p>
                      </div>
                    </div>
                    <button type="button" className="GW-pricing-download">
                      <IoDownloadOutline aria-hidden="true" />
                      Download
                    </button>
                  </div>

                  <div className="GW-pricing-content">
                    <section className="GW-pricing-summary-block">
                      <h3>Product Information</h3>
                      <div className="GW-pricing-subsection">
                        <h4>Apparel and Design</h4>
                        <div className="GW-pricing-row-list">
                          {pricingProductRows.map(([label, value]) => (
                            <div className="GW-pricing-row" key={label}>
                              <span>{label}</span>
                              <strong>{value}</strong>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="GW-pricing-subsection">
                        <h4>Files and Branding</h4>
                        <div className="GW-pricing-row-list">
                          {pricingBrandingRows.map(([label, value]) => (
                            <div className="GW-pricing-row" key={label}>
                              <span>{label}</span>
                              <strong>{value}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section className="GW-pricing-files-block">
                      <h3>Your Files</h3>
                      <div className="GW-pricing-row-list">
                        {visibleUploadedFileSections.map((section) => (
                          <div className="GW-pricing-row GW-pricing-file-row" key={section.key}>
                            <span>{section.label}</span>
                            <strong>
                              <IoImageOutline aria-hidden="true" />
                              {artworkFiles[section.key][0] || 'No file'}
                            </strong>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="GW-pricing-quantity-block">
                      <div className="GW-pricing-quantity-heading">
                        <h3>Quantity</h3>
                        <p>(Minimum of 50pcs)</p>
                      </div>
                      <div className="GW-pricing-quantity-box">
                        <div className="GW-pricing-size-row">
                          {PRICING_QUANTITY_SIZES.map(([sizeKey, label]) => (
                            <label key={sizeKey}>
                              {label}
                              <input
                                type="text"
                                inputMode="numeric"
                                value={pricingQuantities[sizeKey]}
                                onChange={(event) => updatePricingQuantity(sizeKey, event.target.value)}
                              />
                            </label>
                          ))}
                        </div>
                        <div className="GW-pricing-quantity-footer">
                          <span>
                            <strong>Total:</strong>
                            <em>{pricingTotalPieces}</em>
                            pcs
                          </span>
                          <button type="button" onClick={autoDistributeQuantities}>
                            Auto Distribute
                          </button>
                        </div>
                      </div>
                    </section>

                    <section className="GW-pricing-overall-block">
                      <h3>Overall</h3>
                      <div className="GW-pricing-row-list">
                        <div className="GW-pricing-row GW-pricing-total-row">
                          <span>TOTAL:</span>
                          <strong>₱100</strong>
                        </div>
                        <div className="GW-pricing-row">
                          <span>60% Downpayment</span>
                          <strong>₱60</strong>
                        </div>
                        <div className="GW-pricing-row">
                          <span>40% Balance (Upon Delivery/Pick up)</span>
                          <strong>₱40</strong>
                        </div>
                      </div>
                      <button
                        className="GW-pricing-breakdown"
                        type="button"
                        onClick={() => setPriceBreakdownOpen((current) => !current)}
                      >
                        <span>{priceBreakdownOpen ? 'Show less' : 'Show Price Breakdown'}</span>
                        <span className={priceBreakdownOpen ? 'GW-pricing-caret GW-pricing-caret-up' : 'GW-pricing-caret'}></span>
                      </button>
                    </section>

                    {priceBreakdownOpen ? (
                      <section className="GW-price-breakdown-panel">
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
                            {PRICING_QUANTITY_SIZES.map(([sizeKey, label]) => (
                              <tr key={sizeKey}>
                                <td>{label}</td>
                                <td>{pricingQuantities[sizeKey] || '0'}</td>
                                <td>380</td>
                                <td>0</td>
                                <td>3,500.00 PHP</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </section>
                    ) : null}

                    <button
                      className="GW-pricing-submit"
                      type="button"
                      onClick={() => {
                        if (pricingTotalPieces < 50) {
                          showWarning('Please enter at least 50 total pieces before submitting.')
                        } else {
                          setQuestion('quotation-sent')
                          setWarningMessage('')
                        }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                </section>

                <GWReviewFooter
                  style={{
                    top: `${GW_REVIEW_CARD_TOP + GW_PRICING_CARD_BASE_HEIGHT + priceBreakdownExtraHeight + GW_REVIEW_FOOTER_GAP}px`,
                    bottom: 'auto',
                  }}
                />
              </div>
            ) : question === 'quotation-sent' ? (
              <div className="GW-quotation-sent-page">
                <section className="GW-quotation-sent-card">
                  <div className="GW-quotation-sent-content">
                    <div className="GW-quotation-success-icon">
                      <IoCheckmarkCircle aria-hidden="true" />
                    </div>
                    <h1>Quotation Sent</h1>
                    <p>
                      A confirmation of your request has also been sent to j***@gmail.com for your reference.
                      <br />
                      Thank you for your request. Our team will review your order details and design files shortly.
                    </p>
                  </div>

                  <div className="GW-quotation-next">
                    <span>WHAT&apos;S NEXT?</span>
                    {[
                      [
                        'Step 1: Order Review',
                        'Our team reviews the information you submitted, including garment specifications, printing details, and uploaded design files to ensure everything is clear for production.',
                      ],
                      [
                        'Step 2: Design & Production Assessment',
                        'We evaluate your design and production requirements to confirm the appropriate printing method, materials, and estimated production process.',
                      ],
                      [
                        'Step 3: Confirmation & Coordination',
                        'We evaluate your design and production requirements to confirm the appropriate printing method, materials, and estimated production process.',
                      ],
                      [
                        'Step 4: Sample Development',
                        'Once everything is confirmed, we begin sample production to ensure the garment, print quality, and overall construction meet our standards. Sample development typically takes 1-2 weeks.',
                      ],
                      [
                        'Step 5: Production & Order Processing',
                        'After sample approval, we proceed with full production and coordinate the next steps for order completion and delivery.',
                      ],
                    ].map(([title, description]) => (
                      <div className="GW-quotation-step" key={title}>
                        <h2>{title}</h2>
                        <p>{description}</p>
                      </div>
                    ))}
                  </div>

                  <button className="GW-quotation-done" type="button" onClick={() => navigateBack('?page=pricing')}>
                    Done
                  </button>
                </section>

                <GWReviewFooter />
              </div>
            ) : question === 'garment' ? (
              <div className="GW-selection-card" style={{ height: `${914 + infoExtraHeight}px` }}>
                <div className="GW-card-heading">
                  <div className="badge">GARMENT SELECTION</div>
                  <h1 className="GW-card-title">Which apparel would you like to create?</h1>
                  <p className="GW-card-subtitle">Choose your preferred apparel</p>
                </div>

                <div className="options-list">
                  {['t-shirt', 'hoodie', 'others'].map((type) => {
                    const isInfoOpen = openInfo.includes(type)
                    const apparelInfo = APPAREL_INFO[type]

                    return (
                      <div
                        key={type}
                        className={`option-item ${selectedApparel === type ? 'selected' : ''} ${isInfoOpen ? 'option-item-open' : ''}`}
                        role="radio"
                        aria-checked={selectedApparel === type}
                        tabIndex={0}
                        onClick={() => {
                          setSelectedApparel(type)
                          setWarningMessage('')
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedApparel(type)
                            setWarningMessage('')
                          }
                        }}
                      >
                        <div className="option-row">
                          <span className="option-main">
                            <input type="radio" name="apparel" value={type} checked={selectedApparel === type} readOnly />

                            <span className="radio-dot"></span>

                            <span className="option-text">
                              {type === 'others' ? 'Others:' : type.charAt(0).toUpperCase() + type.slice(1)}
                            </span>
                          </span>

                          {type === 'others' && (
                            <input
                              type="text"
                              placeholder="Please Specify"
                              className="other-input"
                              value={otherText}
                              onChange={(e) => setOtherText(e.target.value)}
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedApparel('others')
                                setWarningMessage('')
                              }}
                            />
                          )}

                          {apparelInfo && (
                            <button
                              type="button"
                              className="help-icon-button"
                              aria-label={`Show ${type} information`}
                              aria-expanded={isInfoOpen}
                              onClick={(event) => {
                                event.stopPropagation()
                                setOpenInfo((current) =>
                                  current.includes(type)
                                    ? current.filter((item) => item !== type)
                                    : [...current, type],
                                )
                              }}
                            >
                              <IoHelpCircleOutline className="help-icon" />
                            </button>
                          )}
                        </div>

                        {apparelInfo && isInfoOpen ? (
                          <div className="option-info">
                            <p>{apparelInfo.description}</p>
                            <div className="option-info-note">
                              <span className="hint-icon">i</span>
                              {apparelInfo.note}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )
                  })}
                </div>

                <div className="GW-actions">
                  <button
                    className="GW-next-btn"
                    type="button"
                    onClick={() => {
                      if (selectedApparel === 'others' && !otherText.trim()) {
                        showWarning('Please specify your apparel type before continuing.')
                      } else if (selectedApparel) {
                        setQuestion('fit')
                        setWarningMessage('')
                      } else {
                        showWarning('Please choose an apparel option before continuing.')
                      }
                    }}
                  >
                    Next
                  </button>

                  <div className="GW-hint-bar">
                    <span className="hint-icon">i</span>
                    Click the question mark button for more informations
                  </div>
                </div>
              </div>
            ) : question === 'fit' ? (
              <>
                <div className="GW-selection-card GW-fit-card" style={{ height: `${1013 + fitInfoExtraHeight}px` }}>
                  <div className="GW-card-heading GW-fit-heading">
                    <div className="badge GW-fit-badge">FIT STYLE</div>
                    <h1 className="GW-card-title">What fit would you like for your apparel?</h1>
                    <p className="GW-card-subtitle">Choose the fit style that best represents your brand&apos;s aesthetic.</p>
                  </div>

                  <div className="fit-options" style={{ height: `${421 + fitInfoExtraHeight}px` }}>
                    {FIT_OPTIONS.map((fit) => {
                      const isFitInfoOpen = openFitInfo.includes(fit.key)

                      return (
                      <div
                        key={fit.key}
                        className={`fit-card ${selectedFit === fit.key ? 'fit-card-selected' : ''} ${isFitInfoOpen ? 'fit-card-open' : ''}`}
                        role="radio"
                        aria-checked={selectedFit === fit.key}
                        tabIndex={0}
                        onClick={() => {
                          setSelectedFit(fit.key)
                          setWarningMessage('')
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedFit(fit.key)
                            setWarningMessage('')
                          }
                        }}
                      >
                        <div className="fit-image-wrap">
                          <img src={fit.image} alt={`${fit.label} t-shirt fit`} />
                          <button
                            type="button"
                            className="fit-camera-button"
                            aria-label={`View ${fit.label} sample`}
                            onClick={(event) => event.stopPropagation()}
                          >
                            <IoImageOutline aria-hidden="true" />
                          </button>
                        </div>

                        <div className="fit-card-footer">
                          <span className="fit-label-main">
                            <span className="radio-dot"></span>
                            <span>{fit.label}</span>
                          </span>
                          <button
                            type="button"
                            className="help-icon-button"
                            aria-label={`Show ${fit.label} information`}
                            aria-expanded={isFitInfoOpen}
                            onClick={(event) => {
                              event.stopPropagation()
                              setOpenFitInfo((current) =>
                                current.includes(fit.key)
                                  ? current.filter((item) => item !== fit.key)
                                  : [...current, fit.key],
                              )
                            }}
                          >
                            <IoHelpCircleOutline className="help-icon" />
                          </button>
                        </div>

                        {isFitInfoOpen ? (
                          <div className="fit-info">
                            <p>{fit.description}</p>
                            <div className="fit-info-note">
                              <span className="hint-icon">i</span>
                              {fit.note}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      )
                    })}
                  </div>

                  <div className="GW-actions GW-fit-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('garment')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (selectedFit) {
                            setQuestion('fabric')
                            setWarningMessage('')
                          } else {
                            showWarning('Please choose a fit style before continuing.')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Click the question mark button for more informations
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ top: `${1346.64 + fitInfoExtraHeight}px` }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'fabric' ? (
              <>
                <div className="GW-selection-card GW-fabric-card" style={{ height: `${790 + fabricInfoExtraHeight}px` }}>
                  <div className="GW-card-heading GW-fabric-heading">
                    <div className="badge GW-fabric-badge">FABRIC SELECTION</div>
                    <h1 className="GW-card-title">What type of fabric would you like?</h1>
                    <p className="GW-card-subtitle">
                      Select the fabric thickness. Thicker fabrics are more durable; softer fabrics offer more comfort.
                    </p>
                  </div>

                  <div className="fabric-options" style={{ height: `${198 + fabricInfoExtraHeight}px` }}>
                    {FABRIC_OPTIONS.map((fabric) => {
                      const isFabricInfoOpen = openFabricInfo.includes(fabric.key)

                      return (
                        <div
                          key={fabric.key}
                          className={`option-item ${selectedFabric === fabric.key ? 'selected' : ''} ${isFabricInfoOpen ? 'option-item-open' : ''}`}
                          role="radio"
                          aria-checked={selectedFabric === fabric.key}
                          tabIndex={0}
                          onClick={() => {
                            setSelectedFabric(fabric.key)
                            setWarningMessage('')
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              setSelectedFabric(fabric.key)
                              setWarningMessage('')
                            }
                          }}
                        >
                          <div className="option-row">
                            <span className="option-main">
                              <input
                                type="radio"
                                name="fabric"
                                value={fabric.key}
                                checked={selectedFabric === fabric.key}
                                readOnly
                              />

                              <span className="radio-dot"></span>
                              <span className="option-text">{fabric.label}</span>
                            </span>

                            <button
                              type="button"
                              className="help-icon-button"
                              aria-label={`Show ${fabric.label} information`}
                              aria-expanded={isFabricInfoOpen}
                              onClick={(event) => {
                                event.stopPropagation()
                                setOpenFabricInfo((current) =>
                                  current.includes(fabric.key)
                                    ? current.filter((item) => item !== fabric.key)
                                    : [...current, fabric.key],
                                )
                              }}
                            >
                              <IoHelpCircleOutline className="help-icon" />
                            </button>
                          </div>

                          {isFabricInfoOpen ? (
                            <div className="option-info">
                              <p>{fabric.description}</p>
                              <div className="option-info-note">
                                <span className="hint-icon">i</span>
                                {fabric.note}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>

                  <div className="GW-actions GW-fabric-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('fit')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (selectedFabric) {
                            setQuestion('color')
                            setWarningMessage('')
                          } else {
                            showWarning('Please choose a fabric option before continuing.')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Click the question mark button for more informations
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ top: `${1123.64 + fabricInfoExtraHeight}px` }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'color' ? (
              <>
                <div className="GW-selection-card GW-color-card" style={{ height: `${740 + colorDropdownExtraHeight}px` }}>
                  <div className="GW-card-heading GW-color-heading">
                    <div className="badge GW-color-badge">COLOR SELECTION</div>
                    <div className="GW-color-title-block">
                      <h1 className="GW-card-title">Which color would you like for this fabric?</h1>
                      <p className="GW-card-subtitle">
                        Available colors depend on the fabric thickness. Softer fabrics have more color options, thicker fabrics have fewer.
                      </p>
                    </div>
                  </div>

                  <div className="GW-color-field-group" style={{ height: `${148 + colorDropdownExtraHeight}px` }}>
                    <span className="GW-color-label">Enter your preferred color:</span>
                    <div className="GW-color-dropdown" style={{ height: `${69 + colorDropdownExtraHeight}px` }}>
                      <button
                        type="button"
                        className="GW-color-select"
                        aria-expanded={colorDropdownOpen}
                        onClick={() => setColorDropdownOpen((current) => !current)}
                      >
                        <span>{selectedColor || 'Select Pantone Color'}</span>
                        <span className={colorDropdownOpen ? 'GW-select-caret GW-select-caret-open' : 'GW-select-caret'} />
                      </button>

                      {colorDropdownOpen ? (
                        <div className="GW-color-menu">
                          <div className="GW-color-tabs">
                            <button
                              type="button"
                              className={activeColorTab === 'light' ? 'GW-color-tab GW-color-tab-active' : 'GW-color-tab'}
                              onClick={() => setActiveColorTab('light')}
                            >
                              Light Colors
                            </button>
                            <button
                              type="button"
                              className={activeColorTab === 'dark' ? 'GW-color-tab GW-color-tab-active' : 'GW-color-tab'}
                              onClick={() => setActiveColorTab('dark')}
                            >
                              Dark Colors
                            </button>
                          </div>

                          <div className="GW-color-grid" role="listbox" aria-label={`${activeColorTab} pantone colors`}>
                            {COLOR_SWATCHES.map((swatch) => {
                              const colorValue = `${activeColorTab === 'light' ? 'Light' : 'Dark'} Color ${swatch + 1}`
                              const swatchColor =
                                activeColorTab === 'light' ? LIGHT_SWATCH_COLORS[swatch] : DARK_SWATCH_COLORS[swatch]
                              return (
                                <button
                                  key={`${activeColorTab}-${swatch}`}
                                  type="button"
                                  className={selectedColor === colorValue ? 'GW-color-swatch GW-color-swatch-selected' : 'GW-color-swatch'}
                                  style={{ backgroundColor: swatchColor }}
                                  aria-label={colorValue}
                                  onClick={() => {
                                    setSelectedColor(colorValue)
                                    setWarningMessage('')
                                    setColorDropdownOpen(false)
                                  }}
                                />
                              )
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="GW-actions GW-color-actions">
                    <div className="GW-color-hint GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Select from our wide range of available colors, with options varying depending on the fabric thickness you choose.
                    </div>

                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('fabric')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (selectedColor) {
                            setQuestion('print')
                            setColorDropdownOpen(false)
                            setWarningMessage('')
                          } else {
                            showWarning('Please choose a color before continuing.')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ top: `${1073.64 + colorDropdownExtraHeight}px` }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'print' ? (
              <>
                <div className="GW-selection-card GW-print-card" style={{ height: `${1013 + printInfoExtraHeight}px` }}>
                  <div className="GW-card-heading GW-print-heading">
                    <div className="badge GW-print-badge">PRINT SIZE</div>
                    <h1 className="GW-card-title">What type of print do you want?</h1>
                    <p className="GW-card-subtitle">
                      Choose your preferred print size to define the overall look and visual impact of your design.
                    </p>
                  </div>

                  <div className="print-options" style={{ height: `${421 + printInfoExtraHeight}px` }}>
                    {PRINT_OPTIONS.map((print) => {
                      const isPrintInfoOpen = openPrintInfo.includes(print.key)

                      return (
                      <div
                        key={print.key}
                        className={`print-card ${selectedPrint === print.key ? 'print-card-selected' : ''} ${isPrintInfoOpen ? 'print-card-open' : ''}`}
                        role="radio"
                        aria-checked={selectedPrint === print.key}
                        tabIndex={0}
                        onClick={() => {
                          setSelectedPrint(print.key)
                          setWarningMessage('')
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedPrint(print.key)
                            setWarningMessage('')
                          }
                        }}
                      >
                        <div className="print-image-wrap">
                          <img src={print.image} alt={`${print.label} sample`} />
                          <button
                            type="button"
                            className="fit-camera-button"
                            aria-label={`View ${print.label} sample`}
                            onClick={(event) => event.stopPropagation()}
                          >
                            <IoImageOutline aria-hidden="true" />
                          </button>
                        </div>

                        <div className="print-card-footer">
                          <span className="fit-label-main">
                            <span className="radio-dot"></span>
                            <span>{print.label}</span>
                          </span>
                          <button
                            type="button"
                            className="help-icon-button"
                            aria-label={`Show ${print.label} information`}
                            aria-expanded={isPrintInfoOpen}
                            onClick={(event) => {
                              event.stopPropagation()
                              setOpenPrintInfo((current) =>
                                current.includes(print.key)
                                  ? current.filter((item) => item !== print.key)
                                  : [...current, print.key],
                              )
                            }}
                          >
                            <IoHelpCircleOutline className="help-icon" />
                          </button>
                        </div>

                        {isPrintInfoOpen ? (
                          <div className="print-info">
                            <p>{print.description}</p>
                            <div className="print-info-note">
                              <span className="hint-icon">i</span>
                              {print.note}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      )
                    })}
                  </div>

                  <div className="GW-actions GW-print-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('color')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (selectedPrint) {
                            setQuestion('method')
                            setWarningMessage('')
                          } else {
                            showWarning('Please choose a print size before continuing.')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Click the question mark button for more informations
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ top: `${1346.64 + printInfoExtraHeight}px` }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'method' ? (
              <>
                <div className="GW-selection-card GW-method-card" style={{ height: `${919 + GW_METHOD_EXTRA_OPTIONS_HEIGHT + methodInfoExtraHeight}px` }}>
                  <div className="GW-card-heading GW-method-heading">
                    <div className="badge GW-method-badge">PRINTING METHOD</div>
                    <h1 className="GW-card-title">Which printing technique would you like?</h1>
                    <p className="GW-card-subtitle">Select the printing method that best fits your design and fabric.</p>
                  </div>

                  <div className="method-options" style={{ height: `${327 + GW_METHOD_EXTRA_OPTIONS_HEIGHT + methodInfoExtraHeight}px` }}>
                    {PRINTING_METHOD_OPTIONS.map((method) => {
                      const isMethodInfoOpen = openMethodInfo.includes(method.key)

                      return (
                      <div
                        key={method.key}
                        className={`option-item ${selectedMethod === method.key ? 'selected' : ''} ${isMethodInfoOpen ? 'option-item-open' : ''}`}
                        role="radio"
                        aria-checked={selectedMethod === method.key}
                        tabIndex={0}
                        onClick={() => {
                          setSelectedMethod(method.key)
                          setWarningMessage('')
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setSelectedMethod(method.key)
                            setWarningMessage('')
                          }
                        }}
                      >
                        <div className="option-row">
                          <span className="option-main">
                            <input
                              type="radio"
                              name="printing-method"
                              value={method.key}
                              checked={selectedMethod === method.key}
                              readOnly
                            />
                            <span className="radio-dot"></span>
                            <span className="option-text">{method.label}</span>
                          </span>
                          <button
                            type="button"
                            className="help-icon-button"
                            aria-label={`Show ${method.label} information`}
                            aria-expanded={isMethodInfoOpen}
                            onClick={(event) => {
                              event.stopPropagation()
                              setOpenMethodInfo((current) =>
                                current.includes(method.key)
                                  ? current.filter((item) => item !== method.key)
                                  : [...current, method.key],
                              )
                            }}
                          >
                            <IoHelpCircleOutline className="help-icon" />
                          </button>
                        </div>

                        {isMethodInfoOpen ? (
                          <div className="option-info">
                            <p>{method.description}</p>
                            <div className="option-info-note">
                              <span className="hint-icon">i</span>
                              {method.note}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      )
                    })}
                  </div>

                  <div className="GW-actions GW-method-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('print')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (selectedMethod) {
                            setQuestion('front')
                            setWarningMessage('')
                          } else {
                            showWarning('Please choose a printing method before continuing.')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Click the question mark button for more informations
                    </div>
                  </div>
                </div>

                <button
                  className="GW-skip-btn"
                  type="button"
                  onClick={openSkipConfirm}
                  style={{ top: `${1252.64 + GW_METHOD_EXTRA_OPTIONS_HEIGHT + methodInfoExtraHeight}px` }}
                >
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'front' ? (
              <>
                <div className="GW-selection-card GW-front-card">
                  <div className="GW-card-heading GW-front-heading">
                    <div className="badge GW-front-badge">FRONT DESIGN</div>
                    <h1 className="GW-card-title">Do you want a front print?</h1>
                    <p className="GW-card-subtitle">
                      If yes, specify the number of colors for accurate pricing and production.
                    </p>
                  </div>

                  <div className="front-choice-row">
                    {FRONT_DESIGN_OPTIONS.map((option) => (
                      <div
                        key={option.key}
                        className={`front-choice ${frontDesign === option.key ? 'selected' : ''}`}
                        role="radio"
                        aria-checked={frontDesign === option.key}
                        tabIndex={0}
                        onClick={() => {
                          setFrontDesign(option.key)
                          if (option.key === 'no') {
                            setFrontColorCount('')
                          }
                          setWarningMessage('')
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setFrontDesign(option.key)
                            if (option.key === 'no') {
                              setFrontColorCount('')
                            }
                            setWarningMessage('')
                          }
                        }}
                      >
                        <input type="radio" name="front-design" value={option.key} checked={frontDesign === option.key} readOnly />
                        <span className="radio-dot"></span>
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>

                  {frontDesign === 'yes' ? (
                    <input
                      className="front-color-input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter number of colors"
                      value={frontColorCount}
                      onChange={(event) => {
                        setFrontColorCount(event.target.value.replace(/\D/g, ''))
                        setWarningMessage('')
                      }}
                    />
                  ) : null}

                  <div className="GW-actions GW-front-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('method')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!frontDesign) {
                            showWarning('Please choose Yes or No before continuing.')
                          } else if (frontDesign === 'yes' && !frontColorCount.trim()) {
                            showWarning('Please enter the number of colors before continuing.')
                          } else {
                            setQuestion('back')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="GW-front-hint GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Adds design placement to the front area of the garment for visual impact and brand visibility.
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ left: '1651px', top: '1158.64px' }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'back' ? (
              <>
                <div className="GW-selection-card GW-front-card">
                  <div className="GW-card-heading GW-front-heading">
                    <div className="badge GW-back-badge">BACK DESIGN</div>
                    <h1 className="GW-card-title">Do you want a back print?</h1>
                    <p className="GW-card-subtitle">
                      If yes, specify the number of colors for accurate pricing and production.
                    </p>
                  </div>

                  <div className="front-choice-row">
                    {FRONT_DESIGN_OPTIONS.map((option) => (
                      <div
                        key={option.key}
                        className={`front-choice ${backDesign === option.key ? 'selected' : ''}`}
                        role="radio"
                        aria-checked={backDesign === option.key}
                        tabIndex={0}
                        onClick={() => {
                          setBackDesign(option.key)
                          if (option.key === 'no') {
                            setBackColorCount('')
                          }
                          setWarningMessage('')
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            setBackDesign(option.key)
                            if (option.key === 'no') {
                              setBackColorCount('')
                            }
                            setWarningMessage('')
                          }
                        }}
                      >
                        <input type="radio" name="back-design" value={option.key} checked={backDesign === option.key} readOnly />
                        <span className="radio-dot"></span>
                        <span>{option.label}</span>
                      </div>
                    ))}
                  </div>

                  {backDesign === 'yes' ? (
                    <input
                      className="front-color-input"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="Enter number of colors"
                      value={backColorCount}
                      onChange={(event) => {
                        setBackColorCount(event.target.value.replace(/\D/g, ''))
                        setWarningMessage('')
                      }}
                    />
                  ) : null}

                  <div className="GW-actions GW-front-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('front')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!backDesign) {
                            showWarning('Please choose Yes or No before continuing.')
                          } else if (backDesign === 'yes' && !backColorCount.trim()) {
                            showWarning('Please enter the number of colors before continuing.')
                          } else {
                            setQuestion('neckline')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="GW-back-hint GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Adds design placement to the back area for extended branding and statement visuals.
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ left: '1664px', top: '1158.64px' }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'neckline' ? (
              <>
                <div
                  className="GW-selection-card GW-neckline-card"
                  style={{ height: `${necklineInfoOpen ? 1089.47 : 941}px` }}
                >
                  <div className="GW-card-heading GW-neckline-heading">
                    <div className="badge GW-neckline-badge">NECKLINE STYLE</div>
                    <h1 className="GW-card-title">Which neckline style do you prefer?</h1>
                    <p className="GW-card-subtitle">Choose the neckline that suits your apparel and audience.</p>
                  </div>

                  <div className="neckline-options" style={{ height: `${necklineInfoOpen ? 568.47 : 421}px` }}>
                    {NECKLINE_OPTIONS.map((neckline) => {
                      const isNecklineInfoOpen = openNecklineInfo.includes(neckline.key)

                      return (
                        <div
                          key={neckline.key}
                          className={`neckline-card ${selectedNeckline === neckline.key ? 'neckline-card-selected' : ''} ${isNecklineInfoOpen ? 'neckline-card-open' : ''}`}
                          role="radio"
                          aria-checked={selectedNeckline === neckline.key}
                          tabIndex={0}
                          onClick={() => {
                            setSelectedNeckline(neckline.key)
                            setWarningMessage('')
                          }}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              setSelectedNeckline(neckline.key)
                              setWarningMessage('')
                            }
                          }}
                        >
                          <div className="neckline-image-wrap">
                            <img src={neckline.image} alt={`${neckline.label} neckline sample`} />
                            <button
                              type="button"
                              className="fit-camera-button"
                              aria-label={`View ${neckline.label} sample`}
                              onClick={(event) => event.stopPropagation()}
                            >
                              <IoImageOutline aria-hidden="true" />
                            </button>
                          </div>

                          <div className="neckline-card-footer">
                            <div className="neckline-card-topline">
                              <span className="fit-label-main">
                                <span className="radio-dot"></span>
                                <span>{neckline.label}</span>
                              </span>
                              <button
                                type="button"
                                className="help-icon-button"
                                aria-label={`Show ${neckline.label} information`}
                                aria-expanded={isNecklineInfoOpen}
                                onClick={(event) => {
                                  event.stopPropagation()
                                  setOpenNecklineInfo((current) =>
                                    current.includes(neckline.key)
                                      ? current.filter((item) => item !== neckline.key)
                                      : [...current, neckline.key],
                                  )
                                }}
                              >
                                <IoHelpCircleOutline className="help-icon" />
                              </button>
                            </div>

                            {isNecklineInfoOpen ? (
                              <>
                                <p>{neckline.description}</p>
                                <div className="neckline-info-note">
                                  <span className="hint-icon">i</span>
                                  {neckline.note}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="GW-actions GW-neckline-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('back')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!selectedNeckline) {
                            showWarning('Please choose a neckline style before continuing.')
                          } else {
                            setQuestion('inner-branding')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="GW-skip-btn"
                  type="button"
                  onClick={openSkipConfirm}
                  style={{ top: `${necklineInfoOpen ? 1423.43 : 1275}px` }}
                >
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'inner-branding' ? (
              <>
                <div
                  className="GW-selection-card GW-inner-branding-card"
                  style={{ height: `${919 + innerBrandingInfoExtraHeight}px` }}
                >
                  <div className="GW-card-heading GW-inner-branding-heading">
                    <div className="badge GW-inner-branding-badge">INNER BRANDING</div>
                    <h1 className="GW-card-title">How do you want the inner print label printed?</h1>
                    <p className="GW-card-subtitle">Choose your preferred method for branding inside the garment.</p>
                  </div>

                  <div
                    className="options-list inner-branding-options"
                    style={{ height: `${327 + innerBrandingInfoExtraHeight}px` }}
                  >
                    {INNER_BRANDING_OPTIONS.map((option) => {
                      const isInnerInfoOpen = openInnerBrandingInfo.includes(option.key)

                      return (
                        <label
                          className={`option-item ${selectedInnerBranding === option.key ? 'selected' : ''} ${isInnerInfoOpen ? 'option-item-open' : ''}`}
                          key={option.key}
                        >
                          <input
                            type="radio"
                            name="inner-branding"
                            value={option.key}
                            checked={selectedInnerBranding === option.key}
                            onChange={() => {
                              setSelectedInnerBranding(option.key)
                              setWarningMessage('')
                            }}
                          />
                          <div className="option-row">
                            <span className="option-main">
                              <span className="radio-dot"></span>
                              <span className="option-text">{option.label}</span>
                            </span>
                            <button
                              type="button"
                              className="help-icon-button"
                              aria-label={`Show ${option.label} information`}
                              aria-expanded={isInnerInfoOpen}
                              onClick={(event) => {
                                event.preventDefault()
                                setOpenInnerBrandingInfo((current) =>
                                  current.includes(option.key)
                                    ? current.filter((item) => item !== option.key)
                                    : [...current, option.key],
                                )
                              }}
                            >
                              <IoHelpCircleOutline className="help-icon" />
                            </button>
                          </div>

                          {isInnerInfoOpen ? (
                            <div className="option-info inner-branding-info">
                              <p>{option.description}</p>
                              <div className="option-info-note">
                                <span className="hint-icon">i</span>
                                {option.note}
                              </div>
                            </div>
                          ) : null}
                        </label>
                      )
                    })}
                  </div>

                  <div className="GW-actions GW-inner-branding-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('neckline')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!selectedInnerBranding) {
                            showWarning('Please choose an inner branding method before continuing.')
                          } else {
                            setQuestion('woven-label')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                    <div className="GW-hint-bar">
                      <span className="hint-icon">i</span>
                      Click the question mark button for more informations
                    </div>
                  </div>
                </div>

                <button
                  className="GW-skip-btn"
                  type="button"
                  onClick={openSkipConfirm}
                  style={{ top: `${1244 + innerBrandingInfoExtraHeight}px` }}
                >
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'woven-label' ? (
              <>
                <div className="GW-selection-card GW-woven-label-card">
                  <div className="GW-card-heading GW-woven-label-heading">
                    <div className="badge GW-woven-label-badge">WOVEN LABEL</div>
                    <h1 className="GW-card-title">Do you want a woven label?</h1>
                    <p className="GW-card-subtitle">
                      Add a premium brand label to your garment for a professional and polished finish.
                    </p>
                  </div>

                  <div className="front-choice-row GW-woven-label-choices">
                    {FRONT_DESIGN_OPTIONS.map((option) => (
                      <label
                        key={option.key}
                        className={`front-choice ${selectedWovenLabel === option.key ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="woven-label"
                          value={option.key}
                          checked={selectedWovenLabel === option.key}
                          onChange={() => {
                            setSelectedWovenLabel(option.key)
                            setWarningMessage('')
                          }}
                        />
                        <span className="radio-dot"></span>
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="GW-actions GW-woven-label-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('inner-branding')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!selectedWovenLabel) {
                            showWarning('Please choose Yes or No before continuing.')
                          } else if (selectedWovenLabel === 'yes') {
                            setQuestion('own-woven-label')
                            setWarningMessage('')
                          } else {
                            setQuestion('upload-artwork')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                    <div className="GW-hint-bar GW-woven-label-hint">
                      <span className="hint-icon">i</span>
                      Enhances brand identity with a durable, professionally finished label.
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ left: '1651px', top: '994.64px' }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'own-woven-label' ? (
              <>
                <div className="GW-selection-card GW-woven-label-card">
                  <div className="GW-card-heading GW-woven-label-heading">
                    <div className="badge GW-woven-label-badge">WOVEN LABEL</div>
                    <h1 className="GW-card-title">Do you want to use your own woven label?</h1>
                    <p className="GW-card-subtitle">
                      Integrate your existing label seamlessly to preserve your brand identity and consistency.
                    </p>
                  </div>

                  <div className="front-choice-row">
                    {FRONT_DESIGN_OPTIONS.map((option) => (
                      <label
                        key={option.key}
                        className={`front-choice ${selectedOwnWovenLabel === option.key ? 'selected' : ''}`}
                      >
                        <input
                          type="radio"
                          name="own-woven-label"
                          value={option.key}
                          checked={selectedOwnWovenLabel === option.key}
                          onChange={() => {
                            setSelectedOwnWovenLabel(option.key)
                            setWarningMessage('')
                          }}
                        />
                        <span className="radio-dot"></span>
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="GW-actions GW-woven-label-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('woven-label')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!selectedOwnWovenLabel) {
                            showWarning('Please choose Yes or No before continuing.')
                          } else if (selectedOwnWovenLabel === 'yes') {
                            setQuestion('woven-label-upload')
                            setWarningMessage('')
                          } else {
                            setQuestion('woven-location')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                    <div className="GW-hint-bar GW-own-woven-label-hint">
                      <span className="hint-icon">i</span>
                      Labels produced by Sorbetes may include an additional fee.
                    </div>
                  </div>
                </div>

                <button className="GW-skip-btn" type="button" onClick={openSkipConfirm} style={{ left: '1651px', top: '994.64px' }}>
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : question === 'woven-label-upload' ? (
              <>
                <div className="GW-selection-card GW-woven-upload-card">
                  <div className="GW-card-heading GW-woven-label-heading">
                    <div className="badge GW-woven-label-badge">WOVEN LABEL</div>
                    <h1 className="GW-card-title">Upload your woven label</h1>
                    <p className="GW-card-subtitle">
                      Easily provide your label file so we can integrate it seamlessly into production.
                    </p>
                  </div>

                  <div className="GW-woven-upload-block">
                    <label className="GW-upload-dropzone">
                      <IoImageOutline className="GW-upload-icon" aria-hidden="true" />
                      <span className="GW-upload-title">Drop your image here, or upload</span>
                      <span className="GW-upload-support">Supports: jpg, png</span>
                      <span className="GW-upload-browse">Browse File</span>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        onChange={(event) => {
                          const file = event.target.files?.[0]
                          if (file) {
                            setWovenLabelFileName(file.name)
                            setWarningMessage('')
                          }
                        }}
                      />
                    </label>

                    <div className="GW-upload-files">
                      <span className="GW-upload-files-label">Your Files</span>
                      <div className="GW-upload-file-row">
                        {wovenLabelFileName ? (
                          <>
                            <span className="GW-upload-file-name">
                              <IoImageOutline aria-hidden="true" />
                              {wovenLabelFileName}
                            </span>
                            <button
                              type="button"
                              className="GW-upload-remove"
                              aria-label="Remove woven label file"
                              onClick={() => setWovenLabelFileName('')}
                            >
                              ×
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="GW-actions GW-woven-label-actions">
                    <div className="GW-button-row">
                      <button className="GW-back-btn" type="button" onClick={() => setQuestion('own-woven-label')}>
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!wovenLabelFileName.trim()) {
                            showWarning('Please upload your woven label before continuing.')
                          } else {
                            setQuestion('woven-location')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                    <div className="GW-hint-bar GW-woven-upload-hint">
                      <span className="hint-icon">i</span>
                      Ensure the file reflects your exact brand design for accurate placement.
                    </div>
                  </div>
                </div>
              </>
            ) : question === 'woven-location' ? (
              <>
                <div className="GW-woven-location-wrap">
                  <div className="GW-selection-card GW-woven-location-card">
                    <div className="GW-card-heading GW-woven-location-heading">
                      <div className="badge GW-woven-label-badge">WOVEN LABEL</div>
                      <h1 className="GW-card-title">Select Woven Location</h1>
                      <p className="GW-card-subtitle">
                        Select the placement of your woven label and see how each option enhances the branding and
                        overall look of your garment.
                      </p>
                    </div>

                    <div className="GW-woven-location-content">
                      <div className="GW-woven-location-diagram">
                        <img src={wovenLabelImg} alt="Woven label placement guide" />

                        {WOVEN_LOCATION_OPTIONS.map((option) => {
                          const isLocationInfoOpen = openWovenLocationInfo.includes(option.key)

                          return (
                            <label
                              key={option.key}
                              className={`GW-location-choice GW-location-${option.className} ${selectedWovenLocations.includes(option.key) ? 'selected' : ''} ${isLocationInfoOpen ? 'GW-location-choice-open' : ''}`}
                            >
                              <input
                                type="checkbox"
                                name="woven-location"
                                value={option.key}
                                checked={selectedWovenLocations.includes(option.key)}
                                onChange={() => toggleWovenLocation(option.key)}
                              />
                              <span className="GW-location-choice-row">
                                <span className="radio-dot"></span>
                                <span>{option.label}</span>
                                <button
                                  type="button"
                                  className="help-icon-button"
                                  aria-label={`Show ${option.label} information`}
                                  aria-expanded={isLocationInfoOpen}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    toggleWovenLocationInfo(option.key)
                                  }}
                                >
                                  <IoHelpCircleOutline className="help-icon" aria-hidden="true" />
                                </button>
                              </span>
                              {isLocationInfoOpen ? (
                                <span className="GW-location-info">
                                  <span className="hint-icon">i</span>
                                  {option.note}
                                </span>
                              ) : null}
                            </label>
                          )
                        })}
                      </div>

                      <label className={`GW-location-other ${selectedWovenLocations.includes('others') ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          name="woven-location"
                          value="others"
                          checked={selectedWovenLocations.includes('others')}
                          onChange={() => toggleWovenLocation('others')}
                        />
                        <span className="radio-dot"></span>
                        <span>Others:</span>
                        <input
                          className="other-input"
                          type="text"
                          placeholder="Please Specify"
                          value={wovenLocationOther}
                          onChange={(event) => {
                            setWovenLocationOther(event.target.value)
                            setSelectedWovenLocations((current) => (current.includes('others') ? current : [...current, 'others']))
                            setWarningMessage('')
                          }}
                        />
                      </label>

                      <button
                        className="GW-location-refresh"
                        type="button"
                        aria-label="Reset woven location"
                        onClick={() => {
                          setSelectedWovenLocations([])
                          setWovenLocationOther('')
                        }}
                      >
                        <IoRefresh aria-hidden="true" />
                      </button>

                      <button
                        className="GW-next-btn GW-location-next"
                        type="button"
                        onClick={() => {
                          if (selectedWovenLocations.length === 0) {
                            showWarning('Please choose a woven label location before continuing.')
                          } else if (selectedWovenLocations.includes('others') && !wovenLocationOther.trim()) {
                            showWarning('Please specify the woven label location before continuing.')
                          } else {
                            setQuestion('woven-location-back')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>

                      <div className="GW-hint-bar GW-woven-location-hint">
                        <span className="hint-icon">i</span>
                        If unsure, upload a mockup or mark the placement on your design.
                      </div>
                    </div>
                  </div>

                  <button className="GW-skip-btn GW-woven-location-skip" type="button" onClick={openSkipConfirm}>
                    Skip <IoPlaySkipForward aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : question === 'woven-location-back' ? (
              <>
                <div className="GW-woven-location-wrap">
                  <div className="GW-selection-card GW-woven-location-card">
                    <div className="GW-card-heading GW-woven-location-heading">
                      <div className="badge GW-woven-label-badge">WOVEN LABEL</div>
                      <h1 className="GW-card-title">Select Woven Location</h1>
                      <p className="GW-card-subtitle">
                        Select the placement of your woven label and see how each option enhances the branding and
                        overall look of your garment.
                      </p>
                    </div>

                    <div className="GW-woven-location-content GW-woven-back-location-content">
                      <div className="GW-woven-location-diagram GW-woven-back-location-diagram">
                        <img src={wovenBackImg} alt="Back woven label placement guide" />

                        {WOVEN_BACK_LOCATION_OPTIONS.map((option) => {
                          const isBackLocationInfoOpen = openWovenBackLocationInfo.includes(option.key)

                          return (
                            <label
                              key={option.key}
                              className={`GW-location-choice GW-back-location-${option.className} ${selectedWovenBackLocations.includes(option.key) ? 'selected' : ''} ${isBackLocationInfoOpen ? 'GW-location-choice-open' : ''}`}
                            >
                              <input
                                type="checkbox"
                                name="woven-back-location"
                                value={option.key}
                                checked={selectedWovenBackLocations.includes(option.key)}
                                onChange={() => toggleWovenBackLocation(option.key)}
                              />
                              <span className="GW-location-choice-row">
                                <span className="radio-dot"></span>
                                <span>{option.label}</span>
                                <button
                                  type="button"
                                  className="help-icon-button"
                                  aria-label={`Show ${option.label} information`}
                                  aria-expanded={isBackLocationInfoOpen}
                                  onClick={(event) => {
                                    event.preventDefault()
                                    event.stopPropagation()
                                    toggleWovenBackLocationInfo(option.key)
                                  }}
                                >
                                  <IoHelpCircleOutline className="help-icon" aria-hidden="true" />
                                </button>
                              </span>
                              {isBackLocationInfoOpen ? (
                                <span className="GW-location-info">
                                  <span className="hint-icon">i</span>
                                  {option.note}
                                </span>
                              ) : null}
                            </label>
                          )
                        })}
                      </div>

                      <label className={`GW-location-other ${selectedWovenBackLocations.includes('others') ? 'selected' : ''}`}>
                        <input
                          type="checkbox"
                          name="woven-back-location"
                          value="others"
                          checked={selectedWovenBackLocations.includes('others')}
                          onChange={() => toggleWovenBackLocation('others')}
                        />
                        <span className="radio-dot"></span>
                        <span>Others:</span>
                        <input
                          className="other-input"
                          type="text"
                          placeholder="Please Specify"
                          value={wovenBackLocationOther}
                          onChange={(event) => {
                            setWovenBackLocationOther(event.target.value)
                            setSelectedWovenBackLocations((current) =>
                              current.includes('others') ? current : [...current, 'others'],
                            )
                            setWarningMessage('')
                          }}
                        />
                      </label>

                      <button
                        className="GW-location-refresh"
                        type="button"
                        aria-label="Reset back woven location"
                        onClick={() => {
                          setSelectedWovenBackLocations([])
                          setWovenBackLocationOther('')
                        }}
                      >
                        <IoRefresh aria-hidden="true" />
                      </button>

                      <button
                        className="GW-next-btn GW-location-next"
                        type="button"
                        onClick={() => {
                          if (selectedWovenBackLocations.length === 0) {
                            showWarning('Please choose a woven label location before continuing.')
                          } else if (selectedWovenBackLocations.includes('others') && !wovenBackLocationOther.trim()) {
                            showWarning('Please specify the woven label location before continuing.')
                          } else {
                            setQuestion('woven-location-reference')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>

                      <div className="GW-hint-bar GW-woven-location-hint">
                        <span className="hint-icon">i</span>
                        If unsure, upload a mockup or mark the placement on your design.
                      </div>
                    </div>
                  </div>

                  <button className="GW-skip-btn GW-woven-location-skip" type="button" onClick={openSkipConfirm}>
                    Skip <IoPlaySkipForward aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : question === 'woven-location-reference' ? (
              <>
                <div className="GW-woven-location-wrap">
                  <div className="GW-selection-card GW-woven-location-card GW-woven-location-card-attach">
                    <div className="GW-card-heading GW-woven-location-heading">
                      <div className="badge GW-woven-label-badge">WOVEN LABEL</div>
                      <h1 className="GW-card-title">Select Woven Location</h1>
                      <p className="GW-card-subtitle">
                        Select the placement of your woven label and see how each option enhances the branding and
                        overall look of your garment.
                      </p>
                    </div>

                    <div className="GW-woven-location-content GW-woven-location-content-attach">
                      <div className="GW-woven-location-diagram">
                        <img src={wovenLabelImg} alt="Woven label placement guide" />

                        {WOVEN_LOCATION_OPTIONS.map((option) => (
                          <label
                            key={option.key}
                            className={`GW-location-choice GW-location-${option.className} ${selectedWovenReferenceLocations.includes(option.key) ? 'selected' : ''}`}
                          >
                            <input
                              type="checkbox"
                              name="woven-reference-location"
                              value={option.key}
                              checked={selectedWovenReferenceLocations.includes(option.key)}
                              onChange={() => toggleWovenReferenceLocation(option.key)}
                            />
                            <span className="GW-location-choice-row">
                              <span className="radio-dot"></span>
                              <span>{option.label}</span>
                              <IoHelpCircleOutline className="help-icon" aria-hidden="true" />
                            </span>
                          </label>
                        ))}
                      </div>

                      <div className="GW-location-controls-attach">
                        <label
                          className={`GW-location-other ${selectedWovenReferenceLocations.includes('others') ? 'selected' : ''}`}
                        >
                          <input
                            type="checkbox"
                            name="woven-reference-location"
                            value="others"
                            checked={selectedWovenReferenceLocations.includes('others')}
                            onChange={() => toggleWovenReferenceLocation('others')}
                          />
                          <span className="radio-dot"></span>
                          <span>Others:</span>
                          <input
                            className="other-input"
                            type="text"
                            placeholder="Please Specify"
                            value={wovenReferenceLocationOther}
                            onChange={(event) => {
                              setWovenReferenceLocationOther(event.target.value)
                              setSelectedWovenReferenceLocations((current) =>
                                current.includes('others') ? current : [...current, 'others'],
                              )
                              setWarningMessage('')
                            }}
                          />
                        </label>

                        <div className="GW-location-attach-block">
                          <label className="GW-location-attach-button">
                            <IoImageOutline aria-hidden="true" />
                            Attach File
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                              onChange={(event) => {
                                const file = event.target.files?.[0]
                                if (file) {
                                  setWovenReferenceFileName(file.name)
                                  setWarningMessage('')
                                }
                              }}
                            />
                          </label>
                          <span className="GW-location-attach-help">
                            Upload a reference image or mockup showing where you would like the woven label placed.
                          </span>
                          {wovenReferenceFileName ? (
                            <div className="GW-location-uploaded">
                              <span className="GW-location-uploaded-label">Uploaded File</span>
                              <div className="GW-location-uploaded-row">
                                <span className="GW-location-uploaded-name">
                                  <IoImageOutline aria-hidden="true" />
                                  {wovenReferenceFileName}
                                </span>
                                <button
                                  type="button"
                                  className="GW-upload-remove"
                                  aria-label="Remove uploaded reference file"
                                  onClick={() => setWovenReferenceFileName('')}
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>

                        <button
                          className="GW-location-refresh"
                          type="button"
                          aria-label="Reset woven location reference"
                          onClick={() => {
                            setSelectedWovenReferenceLocations([])
                            setWovenReferenceLocationOther('')
                            setWovenReferenceFileName('')
                          }}
                        >
                          <IoRefresh aria-hidden="true" />
                        </button>

                        <button
                          className="GW-next-btn GW-location-next"
                          type="button"
                          onClick={() => {
                            if (selectedWovenReferenceLocations.length === 0) {
                              showWarning('Please choose a woven label location before continuing.')
                            } else if (
                              selectedWovenReferenceLocations.includes('others') &&
                              !wovenReferenceLocationOther.trim()
                            ) {
                              showWarning('Please specify the woven label location before continuing.')
                            } else if (!wovenReferenceFileName) {
                              showWarning('Please upload a reference image before continuing.')
                            } else {
                              setQuestion('upload-artwork')
                              setWarningMessage('')
                            }
                          }}
                        >
                          Next
                        </button>

                        <div className="GW-hint-bar GW-woven-location-hint">
                          <span className="hint-icon">i</span>
                          If unsure, upload a mockup or mark the placement on your design.
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="GW-skip-btn GW-woven-location-skip" type="button" onClick={openSkipConfirm}>
                    Skip <IoPlaySkipForward aria-hidden="true" />
                  </button>
                </div>
              </>
            ) : question === 'upload-artwork' ? (
              <>
                <div
                  className="GW-selection-card GW-artwork-card"
                  style={{ height: `${2994 + artworkFileExtraHeight}px` }}
                >
                  <div className="GW-card-heading GW-artwork-heading">
                    <div className="badge GW-artwork-badge">UPLOAD ARTWORK</div>
                    <h1 className="GW-card-title">Upload your design files</h1>
                    <p className="GW-card-subtitle">Please upload your artwork. Sample production takes 1-2 weeks.</p>
                  </div>

                  <div className="GW-artwork-upload-list">
                    {UPLOAD_ARTWORK_SECTIONS.map((section) => (
                      <div className="GW-artwork-upload-section" key={section.key}>
                        <h2>{section.label}</h2>
                        <label className="GW-upload-dropzone GW-artwork-dropzone">
                          <IoImageOutline className="GW-upload-icon" aria-hidden="true" />
                          <span className="GW-upload-title">Drop your image here, or upload</span>
                          <span className="GW-upload-support">Supports: jpg, png</span>
                          <span className="GW-upload-browse">Browse File</span>
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                            multiple
                            onChange={(event) => handleArtworkFileChange(section.key, event)}
                          />
                        </label>

                        {artworkFiles[section.key].length > 0 ? (
                          <div className="GW-upload-files GW-artwork-files">
                            <span className="GW-upload-files-label GW-artwork-files-label">Your Files</span>
                            {artworkFiles[section.key].map((fileName, index) => (
                              <div className="GW-upload-file-row GW-artwork-file-row" key={`${fileName}-${index}`}>
                                <span className="GW-upload-file-name">
                                  <IoImageOutline aria-hidden="true" />
                                  {fileName}
                                </span>
                                <button
                                  type="button"
                                  className="GW-upload-remove"
                                  aria-label={`Remove ${fileName}`}
                                  onClick={() => removeArtworkFile(section.key, index)}
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>

                  <div className="GW-actions GW-artwork-actions">
                    <div className="GW-button-row">
                      <button
                        className="GW-back-btn"
                        type="button"
                        onClick={() => setQuestion(selectedWovenLabel === 'yes' ? 'woven-location-reference' : 'woven-label')}
                      >
                        Back
                      </button>
                      <button
                        className="GW-next-btn"
                        type="button"
                        onClick={() => {
                          if (!hasArtworkFiles) {
                            showWarning('Please upload at least one design file before continuing.')
                          } else {
                            setQuestion('quotation-loader')
                            setWarningMessage('')
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>

                    <div className="GW-hint-bar GW-artwork-hint">
                      <span className="hint-icon">i</span>
                      Ensure your files are final and high-resolution for accurate production
                    </div>
                  </div>
                </div>

                <button
                  className="GW-skip-btn GW-artwork-skip"
                  type="button"
                  onClick={openSkipConfirm}
                  style={{ top: `${3328 + artworkFileExtraHeight}px` }}
                >
                  Skip <IoPlaySkipForward aria-hidden="true" />
                </button>
              </>
            ) : null}
          </main>

          {exitModalOpen ? (
            <div className="GW-exit-overlay" role="presentation">
              <section className="GW-exit-modal" role="dialog" aria-modal="true" aria-labelledby="GW-exit-title">
                <button className="GW-continue-editing" type="button" onClick={() => setExitModalOpen(false)}>
                  Continue Editing
                </button>

                <div className="GW-exit-content">
                  <div className="GW-exit-copy">
                    <h2 id="GW-exit-title">Leave your project setup?</h2>
                    <p>You can save your progress as a draft, continue editing, or discard your changes.</p>
                  </div>

                  <div className="GW-exit-actions">
                    <button className="GW-quit-btn" type="button" onClick={() => navigateBack('?page=pricing')}>
                      Quit without saving
                    </button>
                    <button className="GW-save-draft-btn" type="button" onClick={() => navigateBack('?page=pricing')}>
                      Save as Draft
                    </button>
                  </div>
                </div>
              </section>
            </div>
          ) : null}

          {skipConfirmOpen ? (
            <div className="GW-skip-overlay" role="presentation" onClick={cancelSkip}>
              <section
                className="GW-skip-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="GW-skip-title"
                onClick={(event) => event.stopPropagation()}
              >
                <h2 id="GW-skip-title">Skip this step?</h2>
                <p>
                  Are you sure you want to skip {SKIP_SECTION_LABELS[question] || 'this section'}? You can continue
                  without completing it.
                </p>
                <div className="GW-skip-actions">
                  <button type="button" className="GW-skip-cancel-btn" onClick={cancelSkip}>
                    Cancel
                  </button>
                  <button type="button" className="GW-skip-confirm-btn" onClick={confirmSkip}>
                    Yes, skip
                  </button>
                </div>
              </section>
            </div>
          ) : null}

          {warningMessage ? (
            <div className="GW-warning-overlay" role="presentation">
              <section className="GW-warning-modal" role="alertdialog" aria-modal="true" aria-labelledby="GW-warning-title">
                <h2 id="GW-warning-title">Selection Required</h2>
                <p>{warningMessage}</p>
                <button type="button" onClick={() => setWarningMessage('')}>
                  OK
                </button>
              </section>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}