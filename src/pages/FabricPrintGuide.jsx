import { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import '../design/FabricPrintGuide.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const FABRIC_PRINT_GUIDE_BASE_WIDTH = 1920
const FABRIC_PRINT_GUIDE_BASE_HEIGHT = 4449

const fabricPrintSteps = [
  {
    number: 'STEP 1:',
    title: 'Assess the File Quality',
    bullets: [
      'Check the resolution: Printing needs high resolution, usually around 300 DPI.',
      'Identify the file type: Vector files like AI, EPS, or PDF work best, while raster files like JPG or PNG need extra care.',
      'Determine if the design is layered: Layered files make editing easier, while flat files may need to be recreated.',
    ],
  },
  {
    number: 'STEP 2:',
    title: 'Recreate or Enhance the Design',
    bullets: [
      'If the file is low-quality, we enhance it or recreate it in high resolution.',
      'For non-layered files, we separate elements like text, graphics, and colors into editable layers.',
      'This ensures the colors and shapes remain sharp and accurate in print.',
    ],
    reverse: true,
  },
  {
    number: 'STEP 3:',
    title: 'Adjust Colors for Printing',
    bullets: [
      'Convert colors to CMYK, the standard color mode for print production.',
      'Adjust brightness, contrast, and saturation to ensure the print matches what you see on screen.',
    ],
  },
  {
    number: 'STEP 4:',
    title: 'Optimize for Print Size',
    bullets: [
      'Scale the design to the actual print dimensions.',
      'Check that text and details are clear and readable at the final size.',
    ],
    reverse: true,
  },
  {
    number: 'STEP 5:',
    title: 'Proof and Finalize',
    bullets: [
      'The designer prepares a print proof for review.',
      'Check that text and details are clear and readable at the final size.',
    ],
  },
  {
    number: 'STEP 6:',
    title: 'Export as Print-Ready File',
    bullets: [
      'Save the design in the correct format for printing, usually PDF or TIFF at high resolution.',
      'Include bleed and crop marks if needed for cutting.',
    ],
    reverse: true,
  },
]

function getFabricPrintGuideScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / FABRIC_PRINT_GUIDE_BASE_WIDTH, 0.18), 1)
}

function FabricPrintGuide() {
  const [pageScale, setPageScale] = useState(() => getFabricPrintGuideScale())

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getFabricPrintGuideScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToHome = () => {
    window.history.pushState({}, '', '?page=home')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  return (
    <div className="fabric-guide-shell">
      <div
        className="fabric-guide-scale-frame"
        style={{
          width: `${FABRIC_PRINT_GUIDE_BASE_WIDTH * pageScale}px`,
          height: `${FABRIC_PRINT_GUIDE_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="fabric-guide-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <div className="fabric-guide-page">
            <Navbar logoSrc={logoCircleImg} currentPage="guide" />

            <button
              type="button"
              className="fabric-guide-back-button"
              aria-label="Back to homepage"
              onClick={goToHome}
            >
              <IoChevronBack className="fabric-guide-back-icon" aria-hidden="true" />
            </button>

            <section className="fabric-guide-hero">
              <div className="fabric-guide-title-block">
                <h1 className="fabric-guide-title">Fabric Print Guide</h1>
                <div className="fabric-guide-title-line" aria-hidden="true" />
              </div>

              <div className="fabric-guide-intro-card">
                <p className="fabric-guide-intro-text">
                  Follow along as we show you how we turn your mockups, no matter the quality, into high-resolution,
                  print-ready designs. We enhance your files, separate layers, adjust colors, and make sure every
                  detail looks perfect before printing. This guide explains each step so your final product comes out
                  exactly as you envisioned.
                </p>
              </div>
            </section>

            <section className="fabric-guide-steps-section" aria-label="Fabric print guide steps">
              {fabricPrintSteps.map((step) => (
                <article
                  key={step.number}
                  className={step.reverse ? 'fabric-guide-step-row fabric-guide-step-row-reverse' : 'fabric-guide-step-row'}
                >
                  <div className={step.reverse ? 'fabric-guide-step-copy fabric-guide-step-copy-right' : 'fabric-guide-step-copy'}>
                    <div className="fabric-guide-step-head">
                      <span className="fabric-guide-step-number">{step.number}</span>
                      <h2>{step.title}</h2>
                    </div>

                    <div className="fabric-guide-step-bullets">
                      {step.bullets.map((bullet) => (
                        <p key={bullet}>{bullet}</p>
                      ))}
                    </div>
                  </div>

                  <div className="fabric-guide-step-media" aria-hidden="true">
                    <div className="fabric-guide-step-placeholder" />
                  </div>
                </article>
              ))}
            </section>

            <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FabricPrintGuide
