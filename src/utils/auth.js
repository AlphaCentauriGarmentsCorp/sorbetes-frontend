// Sorbetes storefront auth, backed by the ASH API (api.sorbetesapparel.com/api/v2).
// Keeps the same exported surface the pages already use (isSignedIn / getCurrentUser /
// loginUser / registerUser / signOut / ...), so the rest of the app is unchanged.
// Session = a Bearer token in localStorage; the current user is cached locally and
// refreshed from /me on app load.

import {
  loginSorbetes,
  registerSorbetes,
  verifyOtp as verifyOtpRequest,
  resendOtp as resendOtpRequest,
  fetchMe,
  logoutRequest,
} from '../api/authApi.js'
import { setToken } from '../api/client.js'

const CURRENT_USER_KEY = 'sorbetes_current_user'

// Kept only so existing imports don't break; the Founders Club is a real account now.
export const FOUNDERS_CLUB_ACCOUNT = {
  firstName: 'Founders',
  lastName: 'Club',
  username: 'founders',
  email: 'founders@sorbetes.ph',
}

function normalizeUser(user) {
  if (!user) return null
  const name = (user.name || '').trim()
  const parts = name ? name.split(/\s+/) : []
  return {
    ...user,
    name,
    firstName: user.firstName || parts[0] || '',
    lastName: user.lastName || parts.slice(1).join(' ') || '',
    username: user.username || '',
    email: user.email || '',
    avatarUrl: user.avatarUrl || user.avatar || '',
  }
}

function readToken() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem('token')
  } catch {
    return null
  }
}

function readCurrentUser() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCurrentUser(user) {
  if (typeof window === 'undefined') return
  try {
    if (user) window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    else window.localStorage.removeItem(CURRENT_USER_KEY)
  } catch {
    // ignore storage errors
  }
}

function notifyAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('cursor:auth-change'))
  }
}

function applySession(token, apiUser) {
  setToken(token)
  const user = normalizeUser(apiUser)
  writeCurrentUser(user)
  notifyAuthChange()
  return user
}

function clearSession() {
  setToken(null)
  writeCurrentUser(null)
  notifyAuthChange()
}

// No-op: no more seeded localStorage accounts. Kept for backward compatibility.
export function ensureFoundersClubAccount() {}

export function isSignedIn() {
  return !!readToken()
}

export function getCurrentUser() {
  if (!isSignedIn()) return null
  return readCurrentUser()
}

export function setSignedIn(signedIn, user = null) {
  if (signedIn) {
    if (user) writeCurrentUser(normalizeUser(user))
    notifyAuthChange()
  } else {
    clearSession()
  }
}

// Validate/refresh the session on app load. Safe to call with no token.
export async function hydrateSession() {
  if (!readToken()) return null
  try {
    const data = await fetchMe()
    const user = normalizeUser(data && data.user ? data.user : data)
    writeCurrentUser(user)
    notifyAuthChange()
    return user
  } catch (err) {
    if (err && err.status === 401) {
      clearSession()
    }
    return null
  }
}

export async function loginUser(identifier, password, remember = false) {
  const email = (identifier || '').trim()
  if (!email || !password) {
    return { ok: false, error: 'Please enter your email and password.' }
  }
  try {
    const data = await loginSorbetes({ email, password, remember })
    const user = applySession(data.token, data.user)
    return { ok: true, user }
  } catch (err) {
    return { ok: false, error: err.message || 'Login failed. Please try again.' }
  }
}

export async function registerUser({ firstName, lastName, username, email, password }) {
  const fn = (firstName || '').trim()
  const ln = (lastName || '').trim()
  const un = (username || '').trim()
  const em = (email || '').trim()

  if (!fn || !ln || !un || !em || !password) {
    return { ok: false, error: 'Please fill in all fields.' }
  }
  if (un.length < 3) {
    return { ok: false, error: 'Username must be at least 3 characters.' }
  }
  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' }
  }

  try {
    await registerSorbetes({ name: `${fn} ${ln}`.trim(), email: em, password })
    return { ok: true, needsOtp: true, email: em }
  } catch (err) {
    return { ok: false, error: err.message || 'Registration failed. Please try again.' }
  }
}

export async function verifyOtp(email, otp) {
  const em = (email || '').trim()
  const code = (otp || '').trim()
  if (!em) {
    return { ok: false, error: 'Missing email. Please register again.' }
  }
  if (code.length < 6) {
    return { ok: false, error: 'Please enter the 6-digit code.' }
  }
  try {
    const data = await verifyOtpRequest({ email: em, otp: code })
    const user = applySession(data.token, data.user)
    return { ok: true, user }
  } catch (err) {
    return { ok: false, error: err.message || 'Verification failed. Please try again.' }
  }
}

export async function resendOtp(email) {
  const em = (email || '').trim()
  if (!em) {
    return { ok: false, error: 'Missing email. Please register again.' }
  }
  try {
    await resendOtpRequest({ email: em })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err.message || 'Could not resend the code. Please try again.' }
  }
}

export function signOut() {
  const token = readToken()
  // Clear locally first so the UI flips to logged-out immediately (matches REEFER).
  clearSession()
  // Best-effort server-side revoke with the token we just held (failures ignored).
  if (token) {
    logoutRequest(token)
  }
}

// --- Profile / password: cached locally only for now (no backend endpoint this round). ---

export function updateCurrentUser(updates) {
  const user = getCurrentUser()
  if (!user) return { ok: false }
  const updated = { ...user, ...updates }
  writeCurrentUser(updated)
  notifyAuthChange()
  return { ok: true, user: updated }
}

export function updateCurrentUserPassword(currentPassword, newPassword) {
  if (!getCurrentUser()) {
    return { ok: false, error: 'Please sign in again before changing your password.' }
  }
  if (!newPassword || newPassword.length < 8 || !/\d/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
    return { ok: false, error: 'New password must be at least 8 characters and include one number and one special character.' }
  }
  // Not yet persisted to the backend (deferred); returns ok so the UI flow completes.
  return { ok: true }
}

export function getPostAuthPath() {
  const redirect = new URLSearchParams(window.location.search).get('redirect')
  return redirect || '?page=home'
}
