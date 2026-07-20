// Minimal fetch client for the ASH API. Mirrors REEFER's axios instance behaviour
// (baseURL from VITE_API_URL + Bearer token) without adding an axios dependency.

const BASE_URL = import.meta.env.VITE_API_URL || ''

export function getToken() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem('token') || null
  } catch {
    return null
  }
}

export function setToken(token) {
  if (typeof window === 'undefined') return
  try {
    if (token) window.localStorage.setItem('token', token)
    else window.localStorage.removeItem('token')
  } catch {
    // ignore storage errors
  }
}

export async function apiRequest(path, { method = 'GET', body, auth = false, headers = {} } = {}) {
  const finalHeaders = { Accept: 'application/json', ...headers }
  if (body !== undefined) finalHeaders['Content-Type'] = 'application/json'
  if (auth && !finalHeaders.Authorization) {
    const token = getToken()
    if (token) finalHeaders.Authorization = `Bearer ${token}`
  }

  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: finalHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    const networkErr = new Error('Network error. Please check your connection and try again.')
    networkErr.status = 0
    throw networkErr
  }

  let data = null
  const text = await response.text()
  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = null
    }
  }

  if (!response.ok) {
    let message = 'Something went wrong. Please try again.'
    if (data) {
      if (data.message && data.message !== 'Validation failed') {
        message = data.message
      } else if (data.errors) {
        const first = Object.values(data.errors)[0]
        message = Array.isArray(first) ? first[0] : first
      } else if (data.message) {
        message = data.message
      }
    }
    const httpErr = new Error(message)
    httpErr.status = response.status
    httpErr.data = data
    throw httpErr
  }

  return data
}
