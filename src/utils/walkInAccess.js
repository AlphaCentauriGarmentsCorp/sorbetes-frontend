/** Session flag set when the in-store QR link is opened with a valid key. */
export const WALK_IN_SESSION_KEY = 'sorbetes_walk_in_session'

/** QR-encoded access key — encode this value in your QR (no QR image generated here). */
export const WALK_IN_QR_KEY = 'sorbetes-walkin'

const WALK_IN_GARMENT_KEY = 'sorbetes_walk_in_garment'
const WALK_IN_GARMENT_OTHER_KEY = 'sorbetes_walk_in_garment_other'
const WALK_IN_CONFIRMATION_KEY = 'sorbetes_walk_in_confirmation'

export function normalizeWalkInStep(step) {
  if (!step) return 'garment'
  if (step === 't-shirt' || step === 'tshirt') return 'tshirt'
  if (step === 'hoodie') return 'hoodie'
  if (step === 'garment') return 'garment'
  if (step === 'confirmed' || step === 'confirmation') return 'confirmed'
  return step
}

export function generateWalkInRefNumber() {
  const stamp = Date.now().toString()
  const suffix = Math.floor(100000 + Math.random() * 900000).toString()
  return `${stamp}${suffix}`
}

export function formatWalkInPaymentTime(date = new Date()) {
  const datePart = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const timePart = date
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    .toLowerCase()
    .replace(' ', '')
  return `${datePart} (${timePart})`
}

export function saveWalkInConfirmation(confirmation) {
  sessionStorage.setItem(WALK_IN_CONFIRMATION_KEY, JSON.stringify(confirmation))
}

export function getWalkInConfirmation() {
  const raw = sessionStorage.getItem(WALK_IN_CONFIRMATION_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearWalkInConfirmation() {
  sessionStorage.removeItem(WALK_IN_CONFIRMATION_KEY)
}

export function getWalkInStep() {
  const step = new URLSearchParams(window.location.search).get('step') || 'garment'
  return normalizeWalkInStep(step)
}

export function navigateWalkInStep(step) {
  const url = new URL(window.location.href)
  url.searchParams.set('page', 'walk-in')
  url.searchParams.set('step', normalizeWalkInStep(step))
  window.history.pushState({}, '', url)
  window.dispatchEvent(new Event('cursor:navigate'))
}

export function grantWalkInAccessFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const key = params.get('key')

  if (key === WALK_IN_QR_KEY) {
    sessionStorage.setItem(WALK_IN_SESSION_KEY, '1')
    const url = new URL(window.location.href)
    url.searchParams.delete('key')
    window.history.replaceState({}, '', url)
    return true
  }

  return sessionStorage.getItem(WALK_IN_SESSION_KEY) === '1'
}

export function hasWalkInAccess() {
  return sessionStorage.getItem(WALK_IN_SESSION_KEY) === '1'
}

export function saveWalkInGarment(garment, otherText = '') {
  sessionStorage.setItem(WALK_IN_GARMENT_KEY, garment)
  sessionStorage.setItem(WALK_IN_GARMENT_OTHER_KEY, otherText)
}

export function getWalkInGarment() {
  return {
    garment: sessionStorage.getItem(WALK_IN_GARMENT_KEY) || '',
    otherText: sessionStorage.getItem(WALK_IN_GARMENT_OTHER_KEY) || '',
  }
}

export function getWalkInEntryUrl(origin = window.location.origin) {
  return `${origin}/?page=walk-in&key=${WALK_IN_QR_KEY}`
}
