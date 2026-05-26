import { useEffect, useState } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import '../design/Pricing.css'
import { FOOTER_CANVAS_HEIGHT } from '../constants/layout.js'

import { HiMiniUsers } from "react-icons/hi2"
import { FaPenAlt } from "react-icons/fa"
import { IoChevronBack, IoClose } from "react-icons/io5"
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from "react-icons/fi"
import { navigate, navigateBack } from '../utils/navigation.js'

const PR_BASE_WIDTH = 1920
const PR_PAGE_HEIGHT = 1562
const PR_BASE_HEIGHT = PR_PAGE_HEIGHT + FOOTER_CANVAS_HEIGHT

function getPricingScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / PR_BASE_WIDTH, 0.18), 1)
}

export default function Pricing() {
  const [pageScale, setPageScale] = useState(() => getPricingScale())
  const [showVideo, setShowVideo] = useState(false)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getPricingScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMute = () => setMuted(!muted)
  const togglePlay = () => setPlaying(!playing)

  return (
    <div className="PR-shell">
      <div
        className="PR-scale-frame"
        style={{
          width: `${PR_BASE_WIDTH * pageScale}px`,
          height: `${PR_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="PR-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <main className="PR-page">
            <div className="PR-ellipse PR-ellipse-right" aria-hidden="true" />
            <div className="PR-ellipse PR-ellipse-left" aria-hidden="true" />

            <Navbar logoSrc={logoCircleImg} currentPage="pricing" />

            <div className="PR-top-row">
              <button className="PR-back" type="button" aria-label="Go back" onClick={() => navigateBack()}>
                <IoChevronBack aria-hidden="true" />
              </button>
              <button className="PR-guide" type="button" onClick={() => navigate('?page=guide')}>
                Guide
              </button>
            </div>

            <section className="PR-content" aria-labelledby="pricing-title">
              <div className="PR-hero">
                <img src={logoCircleImg} className="PR-logo" alt="" />
                <div className="PR-title-block">
                  <h1 id="pricing-title" className="PR-title">Let’s Build Your Apparel</h1>
                  <p className="PR-subtitle">Answer a few questions to help us understand your project.</p>
                </div>
              </div>

              <div className="PR-cards">
                <article className="PR-card">
                  <div className="PR-icon"><HiMiniUsers aria-hidden="true" /></div>
                  <h2>Guided Walkthrough</h2>
                  <p>Follow our guided walkthrough to help you choose the right options step by step.</p>
                  <button className="PR-btn" type="button" onClick={() => navigate('?page=walkthrough')}>Get Started</button>
                </article>

                <article className="PR-card">
                  <div className="PR-icon"><FaPenAlt aria-hidden="true" /></div>
                  <h2>Fill Form Directly</h2>
                  <p>Fill out the order form directly and proceed to pricing with your preferred garment and production specifications.</p>
                  <button className="PR-btn" type="button" onClick={() => navigate('?page=direct-form')}>Get Started</button>
                </article>
              </div>

              <button className="PR-outline" type="button" onClick={() => setShowVideo(true)}>
                <FiPlay className="PR-demo-icon" aria-hidden="true" />
                <span>Watch Demo</span>
              </button>

              <div className="PR-info">
                <span className="PR-i">i</span>
                <span>Need help? Click the ‘Guide’ on the upper right to get step-by-step instructions before proceeding</span>
              </div>
            </section>
          </main>
          <Footer logoSrc={wLogo} />
        </div>
      </div>

      {showVideo && (
        <div className="PR-overlay" onClick={() => setShowVideo(false)}>
          <div className="PR-box" onClick={(e) => e.stopPropagation()}>

            <div className="PR-placeholder" onClick={togglePlay}>
              <div className="PR-center">
                {playing ? <FiPause size={40} /> : <FiPlay size={40} />}
              </div>
              <p>Demo Video Coming Soon</p>
            </div>

            <div className="PR-controls">
              <button type="button" onClick={togglePlay}>{playing ? <FiPause /> : <FiPlay />}</button>
              <button type="button" onClick={toggleMute}>{muted ? <FiVolumeX /> : <FiVolume2 />}</button>
              <button type="button" onClick={() => setShowVideo(false)}><IoClose /></button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}