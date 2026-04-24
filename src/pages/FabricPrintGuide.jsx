import { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import '../design/FabricPrintGuide.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import reeferImg from '../assets/reefer.png'
import wLogo from '../assets/w_logo.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const FABRIC_PRINT_GUIDE_BASE_WIDTH = 1920
const FABRIC_PRINT_GUIDE_BASE_HEIGHT = 4449

const fabricPrintSteps = [
  {
    number: '01',
    title: 'Choose the Right Garment',
    bullets: [
      'Start with the shirt style, fit, and fabric that best matches the look and feel of your collection.',
      'Different fabrics respond differently to each print method, so this choice affects the final output.',
    ],
  },
  {
    number: '02',
    title: 'Prepare High-Quality Artwork',
    bullets: [
      'Use clear artwork files with the correct sizing and placement references before sending them for production.',
      'A cleaner file helps avoid unnecessary adjustments during setup and improves print consistency.',
    ],
    reverse: true,
  },
  {
    number: '03',
    title: 'Select the Print Method',
    bullets: [
      'Silkscreen, transfer, and other approaches each have strengths depending on quantity, color count, and design detail.',
      'We help recommend the most practical option based on your target result and production requirements.',
    ],
  },
  {
    number: '04',
    title: 'Review Mockup or Sample',
    bullets: [
      'Before full production, a mockup or sample can help confirm placement, scale, color direction, and garment feel.',
      'This extra step reduces revisions later and gives you more confidence before scaling the order.',
    ],
    reverse: true,
  },
  {
    number: '05',
    title: 'Approve for Production',
    bullets: [
      'Once all details are aligned, the order can move forward into full production and finishing.',
      'At this point the timeline, quantity, and print method are already coordinated for smoother execution.',
    ],
  },
  {
    number: '06',
    title: 'Quality Check and Release',
    bullets: [
      'Finished garments are checked for print consistency, placement, and presentation before release.',
      'The final output is then prepared for pickup, shipping, or the next stage of your brand launch.',
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
                  A quick guide to understanding how your artwork, garments, and print method come together before
                  production starts.
                </p>
              </div>
            </section>

            <section className="fabric-guide-steps-section">
              {fabricPrintSteps.map((step) => (
                <article
                  key={step.number}
                  className={step.reverse ? 'fabric-guide-step-row fabric-guide-step-row-reverse' : 'fabric-guide-step-row'}
                >
                  <div className="fabric-guide-step-copy">
                    <div className="fabric-guide-step-head">
                      <span className="fabric-guide-step-number">{`STEP ${Number(step.number)}:`}</span>
                      <h2>{step.title}</h2>
                    </div>

                    <div className="fabric-guide-step-bullets">
                      {step.bullets.map((bullet) => (
                        <p key={bullet}>{bullet}</p>
                      ))}
                    </div>
                  </div>

                  <div className="fabric-guide-step-media">
                    <img className="fabric-guide-step-image" src={reeferImg} alt="Silkscreen printed oversized T-shirt" />
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
