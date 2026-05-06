import { useState } from 'react'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logoCircleImg from '../assets/Logo/whitelogo.png'
import wLogo from '../assets/w_logo.png'
import '../design/Pricing.css'

import { HiMiniUsers } from "react-icons/hi2"
import { FaPenAlt } from "react-icons/fa"
import { IoClose } from "react-icons/io5"
import { FiVolume2, FiVolumeX, FiPlay, FiPause } from "react-icons/fi"

export default function Pricing() {
  const [showVideo, setShowVideo] = useState(false)
  const [muted, setMuted] = useState(false)
  const [playing, setPlaying] = useState(false)

  const toggleMute = () => setMuted(!muted)
  const togglePlay = () => setPlaying(!playing)

  return (
    <div className="PR-page">
      <div className="PR-main">
        <div className="PR-content">
          <Navbar logoSrc={logoCircleImg} currentPage="pricing" />

          <div className="PR-header">
            <button className="PR-back">‹</button>
            <img src={logoCircleImg} className="PR-logo" />
            <h2 className="PR-guide">Guide</h2>
          </div>

          <h1 className="PR-title">Pricing & Build Your Apparel</h1>
          <p className="PR-subtitle">Answer a few questions to generate your pricing estimate.</p>

          <div className="PR-cards">
            <div className="PR-card">
              <div className="PR-icon"><HiMiniUsers size={28} /></div>
              <h3>Guided Walkthrough</h3>
              <p>Step-by-step flow to help you choose the right options.</p>
              <button className="PR-btn">Get Started</button>
            </div>

            <div className="PR-card">
              <div className="PR-icon"><FaPenAlt size={26} /></div>
              <h3>Direct Form</h3>
              <p>Fill details manually and get instant pricing estimate.</p>
              <button className="PR-btn">Get Started</button>
            </div>
          </div>

          <button className="PR-outline" onClick={() => setShowVideo(true)}>
            <span className="PR-play">▶</span>
            Watch Demo
          </button>

          <div className="PR-info">
            <span className="PR-i">i</span>
            Need help? Click Guide for instructions
          </div>
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
              <button onClick={togglePlay}>{playing ? <FiPause /> : <FiPlay />}</button>
              <button onClick={toggleMute}>{muted ? <FiVolumeX /> : <FiVolume2 />}</button>
              <button onClick={() => setShowVideo(false)}><IoClose /></button>
            </div>

          </div>
        </div>
      )}

      <Footer logoSrc={wLogo} />
    </div>
  )
}