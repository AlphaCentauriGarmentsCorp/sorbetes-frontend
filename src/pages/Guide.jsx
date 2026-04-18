import { useEffect, useState } from 'react'
import { FaPlay } from 'react-icons/fa6'
import { IoChevronBack } from 'react-icons/io5'
import '../design/Guide.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const GUIDE_BASE_WIDTH = 1920
const GUIDE_BASE_HEIGHT = 4261

const guideSteps = [
  {
    title: 'Start by Visiting the Pricing Page',
    description:
      "Click on the Pricing section to begin the ordering process. Instead of browsing static price lists, you'll be guided through a short questionnaire designed to help us understand the exact specifications of the apparel you want to produce.",
  },
  {
    title: 'Answer the Apparel Questionnaire',
    description:
      "Provide details about the type of apparel you want to create. This includes selecting the garment type such as t-shirt, hoodie, or shorts, choosing the fit or pattern, fabric thickness, preferred colors, and other important production details. These questions help us tailor the order to match your brand's style and requirements.",
  },
  {
    title: 'Select Your Preferred Colors',
    description:
      'Choose the shirt color that best fits your design. You may use the built-in color picker to find the closest color reference, or manually provide a Pantone code if you already have a specific color in mind. Accurate color selection helps ensure the final product closely matches your brand design.',
  },
  {
    title: 'Customize Your Print and Design Options',
    description:
      'Next, specify your printing preferences such as print size, printing method, and whether you would like prints on the front or back of the garment. These selections help determine the best production method for achieving durable and high-quality results.',
  },
  {
    title: 'Upload Your Design Files',
    description:
      'Upload your artwork or design files so our team can review your concept. Providing clear and high-quality files helps us accurately prepare the garment for printing and production.',
  },
  {
    title: 'Automatically Generate Your Apparel Summary',
    description:
      'After completing the questionnaire, the system will automatically compile your selections into a detailed summary. This includes the garment type, fabric choice, color selection, printing specifications, labels, and other customization details.',
  },
  {
    title: 'View the Estimated Pricing',
    description:
      'Based on the information you provided, the system will generate an estimated price for your order. This allows you to see how your design choices and quantity affect the final cost before continuing.',
  },
  {
    title: 'Review and Adjust Your Order',
    description:
      'Carefully review the details of your order. You can still edit your selections, update your design files, or adjust quantities to ensure everything is correct before submitting.',
  },
  {
    title: 'Submit Your Request',
    description:
      'Once everything looks good, submit your request and our team will review your order details.',
  },
  {
    title: 'Sample Development and Production',
    description:
      'After submission, our team will review your order and begin coordinating the sample development process. Please note that sample production typically takes 1 to 2 weeks, allowing us to ensure the garment meets our quality standards before full production begins.',
  },
]

function getGuideScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / GUIDE_BASE_WIDTH, 0.18), 1)
}

function Guide() {
  const [pageScale, setPageScale] = useState(() => getGuideScale())

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getGuideScale())
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
    <div className="guide-shell">
      <div
        className="guide-scale-frame"
        style={{
          width: `${GUIDE_BASE_WIDTH * pageScale}px`,
          height: `${GUIDE_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="guide-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <div className="guide-page">
            <Navbar logoSrc={logoCircleImg} currentPage="guide" />

            <button type="button" className="guide-back-button" aria-label="Back to homepage" onClick={goToHome}>
              <IoChevronBack className="guide-back-icon" aria-hidden="true" />
            </button>

            <section className="guide-hero">
              <div className="guide-title-block">
                <h1 className="guide-title">Guide</h1>
                <div className="guide-title-line" aria-hidden="true" />
              </div>

              <div className="guide-intro-card">
                <p className="guide-intro-text">
                  Watch this short guide to learn how to properly upload your design files and select your preferred
                  shirt color using our built-in color picker. This walkthrough will help ensure that your artwork,
                  color choices, and order details are submitted accurately for production.
                </p>
              </div>

              <div className="guide-video-card" aria-label="Guide video placeholder">
                <div className="guide-video-panel" aria-hidden="true" />
                <button type="button" className="guide-video-play" aria-label="Play guide video">
                  <FaPlay className="guide-video-play-icon" />
                </button>
              </div>
            </section>

            <section className="guide-steps-section">
              <h2 className="guide-steps-title">How to Order?</h2>

              <div className="guide-steps-list">
                {guideSteps.map((step, index) => (
                  <article key={step.title} className="guide-step-item">
                    <div className="guide-step-number-wrap">
                      <span className="guide-step-number">{index + 1}</span>
                    </div>
                    <div className="guide-step-copy">
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guide
