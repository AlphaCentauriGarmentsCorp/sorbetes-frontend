import { useState } from 'react'
import { IoHelpCircleOutline } from 'react-icons/io5'
import '../design/WalkInForm.css'
import {
  getWalkInGarment,
  navigateWalkInStep,
  saveWalkInGarment,
} from '../utils/walkInAccess.js'

const APPAREL_OPTIONS = [
  { id: 't-shirt', label: 'T-shirt' },
  { id: 'hoodie', label: 'Hoodie' },
  { id: 'others', label: 'Others:' },
]

const APPAREL_INFO = {
  't-shirt': {
    description: 'Classic tees for everyday wear, events, and brand merch.',
    note: 'Includes Standard, Oversized, and Boxy fits.',
  },
  hoodie: {
    description: 'Warm layers for streetwear, teams, and seasonal drops.',
    note: 'Includes Standard, Oversized, and Boxy fits.',
  },
}

export default function WalkInGarmentSelection() {
  const saved = getWalkInGarment()
  const [selected, setSelected] = useState(saved.garment || '')
  const [otherText, setOtherText] = useState(saved.otherText || '')
  const [openInfo, setOpenInfo] = useState([])
  const [warning, setWarning] = useState('')

  const handleNext = () => {
    if (!selected) {
      setWarning('Please choose an apparel option before continuing.')
      return
    }

    if (selected === 'others' && !otherText.trim()) {
      setWarning('Please specify your apparel type before continuing.')
      return
    }

    saveWalkInGarment(selected, otherText.trim())
    setWarning('')

    if (selected === 'hoodie') {
      navigateWalkInStep('hoodie')
      return
    }

    if (selected === 't-shirt') {
      navigateWalkInStep('tshirt')
      return
    }

    navigateWalkInStep('tshirt')
  }

  return (
    <div className="wif-page wif-page-garment">
      <main className="wif-garment-shell">
        <div className="wif-garment-card">
          <header className="wif-garment-heading">
            <span className="wif-garment-badge">Garment Selection</span>
            <h1>Which apparel would you like to create?</h1>
            <p>Choose your preferred apparel</p>
          </header>

          <div className="wif-garment-options" role="radiogroup" aria-label="Garment type">
            {APPAREL_OPTIONS.map((option) => {
              const isSelected = selected === option.id
              const info = APPAREL_INFO[option.id]
              const isInfoOpen = openInfo.includes(option.id)

              return (
                <div
                  key={option.id}
                  className={`wif-garment-option${isSelected ? ' wif-garment-option-selected' : ''}${isInfoOpen ? ' wif-garment-option-open' : ''}`}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => {
                    setSelected(option.id)
                    setWarning('')
                  }}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelected(option.id)
                      setWarning('')
                    }
                  }}
                >
                  <div className="wif-garment-option-row">
                    <span className="wif-garment-option-main">
                      <span className={`wif-radio${isSelected ? ' wif-radio-checked' : ''}`} aria-hidden="true" />
                      <span>{option.label}</span>
                    </span>

                    {option.id === 'others' ? (
                      <input
                        type="text"
                        className="wif-garment-other-input"
                        placeholder="Please Specify"
                        value={otherText}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => {
                          setOtherText(event.target.value)
                          setSelected('others')
                          setWarning('')
                        }}
                      />
                    ) : null}

                    {info ? (
                      <button
                        type="button"
                        className="wif-garment-help"
                        aria-label={`More information about ${option.label}`}
                        aria-expanded={isInfoOpen}
                        onClick={(event) => {
                          event.stopPropagation()
                          setOpenInfo((current) =>
                            current.includes(option.id)
                              ? current.filter((item) => item !== option.id)
                              : [...current, option.id],
                          )
                        }}
                      >
                        <IoHelpCircleOutline aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>

                  {info && isInfoOpen ? (
                    <div className="wif-garment-info">
                      <p>{info.description}</p>
                      <p className="wif-garment-info-note">{info.note}</p>
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>

          {warning ? <p className="wif-garment-warning">{warning}</p> : null}

          <button type="button" className="wif-garment-next" onClick={handleNext}>
            Next
          </button>
        </div>
      </main>
    </div>
  )
}
