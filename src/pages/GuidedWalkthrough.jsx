import { useState } from 'react'
import '../design/GuidedWalkthrough.css'
import { IoClose, IoHelpCircleOutline } from "react-icons/io5"

export default function GuidedWalkthrough() {
  const [selectedApparel, setSelectedApparel] = useState('')
  const [otherText, setOtherText] = useState('')

  return (
    <div className="GW-page">

      <button className="GW-close-x">
        <IoClose size={26} />
      </button>

      <main className="GW-main-container">
        <div className="GW-stepper">
          <div className="step active">
            <span className="step-num">1</span>
            <span className="step-label">Apparel & Design</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <span className="step-num">2</span>
            <span className="step-label">Files & Branding</span>
          </div>
          <div className="step-line"></div>
          <div className="step">
            <span className="step-num">3</span>
            <span className="step-label">Review</span>
          </div>
        </div>

        <div className="GW-selection-card">
          <div className="badge">GARMENT SELECTION</div>
          <h1 className="GW-card-title">Which apparel would you like to create?</h1>
          <p className="GW-card-subtitle">Choose your preferred apparel</p>

          <div className="options-list">
            {['t-shirt', 'hoodie', 'others'].map((type) => (
              <label
                key={type}
                className={`option-item ${selectedApparel === type ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="apparel"
                  value={type}
                  onChange={(e) => setSelectedApparel(e.target.value)}
                />

                <span className="radio-dot"></span>

                <span className="option-text">
                  {type === 'others' ? 'Others:' : type.charAt(0).toUpperCase() + type.slice(1)}
                </span>

                {type === 'others' && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="other-input"
                    value={otherText}
                    onChange={(e) => setOtherText(e.target.value)}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedApparel('others')
                    }}
                  />
                )}

                <IoHelpCircleOutline className="help-icon" />
              </label>
            ))}
          </div>

          <button className="GW-next-btn">Next</button>

          <div className="GW-hint-bar">
            <span className="hint-icon">i</span>
            Click the question mark button for more information
          </div>
        </div>
      </main>
    </div>
  )
}