import { useEffect, useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { applyDarkMode, getInitialDarkMode, persistDarkMode } from '../utils/theme.js'

export default function NavbarThemePicker({ className = '' }) {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)

  useEffect(() => {
    applyDarkMode(darkMode)
    persistDarkMode(darkMode)
  }, [darkMode])

  const wrapClass = ['nb-theme-picker', className].filter(Boolean).join(' ')

  return (
    <div className={wrapClass} role="group" aria-label="Color theme">
      <button
        type="button"
        className={`nb-theme-option${!darkMode ? ' nb-theme-option-active' : ''}`}
        aria-pressed={!darkMode}
        onClick={() => setDarkMode(false)}
      >
        <FaSun aria-hidden="true" />
        <span>Light</span>
      </button>
      <button
        type="button"
        className={`nb-theme-option${darkMode ? ' nb-theme-option-active' : ''}`}
        aria-pressed={darkMode}
        onClick={() => setDarkMode(true)}
      >
        <FaMoon aria-hidden="true" />
        <span>Dark</span>
      </button>
    </div>
  )
}
