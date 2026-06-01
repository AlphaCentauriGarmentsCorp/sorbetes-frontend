const AUTH_STORAGE_KEY = 'sorbetes_signed_in'
const USERS_STORAGE_KEY = 'sorbetes_users'
const CURRENT_USER_KEY = 'sorbetes_current_user'

export const FOUNDERS_CLUB_ACCOUNT = {
  firstName: 'Founders',
  lastName: 'Club',
  username: 'founders',
  email: 'founders@sorbetes.ph',
  password: 'founders123',
}

const REMOVED_TEST_EMAIL = ['test', 'sorbetes.ph'].join('@')

function readUsers() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const raw = window.localStorage.getItem(USERS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeUsers(users) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

export function ensureFoundersClubAccount() {
  const users = readUsers().filter((user) => user.email !== REMOVED_TEST_EMAIL)
  const hasFoundersAccount = users.some((user) => user.email === FOUNDERS_CLUB_ACCOUNT.email)

  if (!hasFoundersAccount) {
    users.push({ ...FOUNDERS_CLUB_ACCOUNT })
  }

  writeUsers(users)

  if (typeof window !== 'undefined') {
    try {
      const currentUser = JSON.parse(window.localStorage.getItem(CURRENT_USER_KEY))
      if (currentUser?.email === REMOVED_TEST_EMAIL) {
        setSignedIn(false)
      }
    } catch {
      setSignedIn(false)
    }
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined' || !isSignedIn()) {
    return null
  }

  try {
    const raw = window.localStorage.getItem(CURRENT_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function isSignedIn() {
  if (typeof window === 'undefined') {
    return false
  }

  try {
    const currentUser = JSON.parse(window.localStorage.getItem(CURRENT_USER_KEY))
    if (currentUser?.email === REMOVED_TEST_EMAIL) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY)
      window.localStorage.removeItem(CURRENT_USER_KEY)
      return false
    }
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    window.localStorage.removeItem(CURRENT_USER_KEY)
    return false
  }

  return window.localStorage.getItem(AUTH_STORAGE_KEY) === 'true'
}

export function setSignedIn(signedIn, user = null) {
  if (typeof window === 'undefined') {
    return
  }

  if (signedIn) {
    window.localStorage.setItem(AUTH_STORAGE_KEY, 'true')
    if (user) {
      window.localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    }
  } else {
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
    window.localStorage.removeItem(CURRENT_USER_KEY)
  }

  window.dispatchEvent(new Event('cursor:auth-change'))
}

export function registerUser({ firstName, lastName, username, email, password }) {
  const trimmedUsername = username.trim().toLowerCase()
  const trimmedEmail = email.trim().toLowerCase()

  if (!firstName.trim() || !lastName.trim() || !trimmedUsername || !trimmedEmail || !password) {
    return { ok: false, error: 'Please fill in all fields.' }
  }

  if (trimmedUsername.length < 3) {
    return { ok: false, error: 'Username must be at least 3 characters.' }
  }

  if (password.length < 6) {
    return { ok: false, error: 'Password must be at least 6 characters.' }
  }

  const users = readUsers()

  if (users.some((user) => user.email === trimmedEmail)) {
    return { ok: false, error: 'An account with this email already exists.' }
  }

  if (users.some((user) => user.username === trimmedUsername)) {
    return { ok: false, error: 'An account with this username already exists.' }
  }

  const newUser = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    username: trimmedUsername,
    email: trimmedEmail,
    password,
  }

  users.push(newUser)
  writeUsers(users)

  return { ok: true, user: newUser }
}

export function loginUser(identifier, password) {
  const trimmedIdentifier = identifier.trim().toLowerCase()

  if (!trimmedIdentifier || !password) {
    return { ok: false, error: 'Please enter your email/username and password.' }
  }

  const user = readUsers().find(
    (entry) =>
      (entry.email === trimmedIdentifier || entry.username === trimmedIdentifier) && entry.password === password,
  )

  if (!user) {
    return { ok: false, error: 'Invalid email or password.' }
  }

  const sessionUser = { ...user, password: undefined }
  setSignedIn(true, sessionUser)

  return { ok: true, user: sessionUser }
}

export function signOut() {
  setSignedIn(false)
}

export function updateCurrentUser(updates) {
  const user = getCurrentUser()
  if (!user) {
    return { ok: false }
  }

  const updated = { ...user, ...updates }
  setSignedIn(true, updated)

  const users = readUsers()
  const index = users.findIndex((entry) => entry.email === user.email)
  if (index >= 0) {
    users[index] = { ...users[index], ...updates }
    writeUsers(users)
  }

  return { ok: true, user: updated }
}

export function updateCurrentUserPassword(currentPassword, newPassword) {
  const user = getCurrentUser()
  if (!user) {
    return { ok: false, error: 'Please sign in again before changing your password.' }
  }

  if (!newPassword || newPassword.length < 8 || !/\d/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
    return { ok: false, error: 'New password must be at least 8 characters and include one number and one special character.' }
  }

  const users = readUsers()
  const index = users.findIndex((entry) => entry.email === user.email)
  if (index < 0) {
    return { ok: false, error: 'Account not found.' }
  }

  const savedPassword = users[index].password
  if (savedPassword && savedPassword !== currentPassword) {
    return { ok: false, error: 'Current password is incorrect.' }
  }

  users[index] = { ...users[index], password: newPassword }
  writeUsers(users)
  setSignedIn(true, { ...user, password: undefined })

  return { ok: true }
}

export function getPostAuthPath() {
  const redirect = new URLSearchParams(window.location.search).get('redirect')
  return redirect || '?page=home'
}
