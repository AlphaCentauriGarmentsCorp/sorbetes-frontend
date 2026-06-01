import { useEffect, useState } from 'react'
import '../design/WalkInForm.css'
import WalkInGarmentSelection from './WalkInGarmentSelection.jsx'
import WalkInOrderConfirmation from './WalkInOrderConfirmation.jsx'
import WalkInHoodieForm from './WalkInHoodieForm.jsx'
import WalkInTshirtForm from './WalkInTshirtForm.jsx'
import {
  getWalkInEntryUrl,
  getWalkInStep,
  grantWalkInAccessFromUrl,
  hasWalkInAccess,
  navigateWalkInStep,
  normalizeWalkInStep,
} from '../utils/walkInAccess.js'
import { isSignedIn } from '../utils/auth.js'

function WalkInBlocked({ title, message }) {
  return (
    <div className="wif-page wif-page-blocked wif-light-scope">
      <main className="wif-blocked-card">
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
    </div>
  )
}

function getInitialWalkInState() {
  if (isSignedIn()) {
    return { allowed: false, blockedReason: 'signed-in' }
  }

  const granted = grantWalkInAccessFromUrl() || hasWalkInAccess()
  return { allowed: granted, blockedReason: granted ? '' : 'no-access' }
}

export default function WalkInForm() {
  const initial = getInitialWalkInState()
  const [allowed, setAllowed] = useState(initial.allowed)
  const [blockedReason, setBlockedReason] = useState(initial.blockedReason)
  const [step, setStep] = useState(() => getWalkInStep())

  useEffect(() => {
    const next = getInitialWalkInState()
    setAllowed(next.allowed)
    setBlockedReason(next.blockedReason)
  }, [])

  useEffect(() => {
    const sync = () => setStep(getWalkInStep())
    window.addEventListener('popstate', sync)
    window.addEventListener('cursor:navigate', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('cursor:navigate', sync)
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('page') !== 'walk-in') return
    const raw = params.get('step') || 'garment'
    const canonical = normalizeWalkInStep(raw)
    if (raw !== canonical) {
      navigateWalkInStep(canonical)
    }
  }, [step])

  if (blockedReason === 'signed-in') {
    return (
      <WalkInBlocked
        title="Walk-in form unavailable"
        message="This form is for in-store clients without a Sorbetes account. Please sign out of your account to use the kiosk, or ask our team for help."
      />
    )
  }

  if (!allowed) {
    return (
      <WalkInBlocked
        title="Access required"
        message={`Open this page using the in-store QR link. For local testing, use: ${getWalkInEntryUrl()}`}
      />
    )
  }

  if (step === 'confirmed') {
    return <WalkInOrderConfirmation />
  }

  if (step === 'tshirt') {
    return <WalkInTshirtForm />
  }

  if (step === 'hoodie') {
    return <WalkInHoodieForm />
  }

  return <WalkInGarmentSelection />
}
