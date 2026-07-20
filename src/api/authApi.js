import { apiRequest } from './client.js'

export function loginSorbetes({ email, password, remember }) {
  return apiRequest('/login/sorbetes', {
    method: 'POST',
    body: { email, password, remember: !!remember },
  })
}

export function registerSorbetes({ name, email, password }) {
  return apiRequest('/register/sorbetes', {
    method: 'POST',
    body: { name, email, password },
  })
}

export function verifyOtp({ email, otp }) {
  return apiRequest('/verify-otp', {
    method: 'POST',
    body: { email, otp },
  })
}

export function resendOtp({ email }) {
  return apiRequest('/resend-otp', {
    method: 'POST',
    body: { email },
  })
}

export function fetchMe() {
  return apiRequest('/me', { method: 'GET', auth: true })
}

export async function logoutRequest(token) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {}
    await apiRequest('/logout', { method: 'POST', auth: !token, headers })
  } catch {
    // ignore; the local session is cleared regardless
  }
}
