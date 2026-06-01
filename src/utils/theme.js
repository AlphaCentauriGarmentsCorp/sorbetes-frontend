export const DARK_MODE_STORAGE_KEY = 'sorbetes_dark_mode'

export function getInitialDarkMode() {
  if (typeof window === 'undefined') {
    return false
  }

  return window.localStorage.getItem(DARK_MODE_STORAGE_KEY) === 'true'
}

export function applyDarkMode(enabled) {
  if (typeof document === 'undefined') {
    return
  }

  document.documentElement.classList.toggle('sorbetes-dark', enabled)
  document.body.classList.toggle('sorbetes-dark', enabled)
}

export function applySavedDarkMode() {
  applyDarkMode(getInitialDarkMode())
}

export function persistDarkMode(enabled) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(DARK_MODE_STORAGE_KEY, String(enabled))
  }
}
