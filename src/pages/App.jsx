import Auth from './Auth.jsx'
import OtpVerification from './OtpVerification.jsx'
import Homepage from './Homepage.jsx'
import '../design/index.css'

function App() {
  const params = new URLSearchParams(window.location.search)
  const page = params.get('page')

  if (page === 'otp') return <OtpVerification />
  if (page === 'auth') return <Auth />
  if (page === 'home') return <Homepage />

  return <Homepage />
}

export default App

