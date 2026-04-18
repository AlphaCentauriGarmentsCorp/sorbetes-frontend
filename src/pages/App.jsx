import { useEffect, useState } from 'react'
import Auth from './Auth.jsx'
import OtpVerification from './OtpVerification.jsx'
import Homepage from './Homepage.jsx'
import OurStory from './OurStory.jsx'
import Services from './Services.jsx'
import Guide from './Guide.jsx'
import FabricPrintGuide from './FabricPrintGuide.jsx'
import '../design/index.css'

function getCurrentPage() {
  return new URLSearchParams(window.location.search).get('page')
}

function App() {
  const [page, setPage] = useState(() => getCurrentPage())

  useEffect(() => {
    const syncPage = () => {
      setPage(getCurrentPage())
    }

    window.addEventListener('popstate', syncPage)
    window.addEventListener('cursor:navigate', syncPage)

    return () => {
      window.removeEventListener('popstate', syncPage)
      window.removeEventListener('cursor:navigate', syncPage)
    }
  }, [])

  if (page === 'otp') return <OtpVerification />
  if (page === 'auth') return <Auth />
  if (page === 'home') return <Homepage />
  if (page === 'our-story') return <OurStory />
  if (page === 'services') return <Services />
  if (page === 'guide') return <Guide />
  if (page === 'fabric-print-guide') return <FabricPrintGuide />

  return <Homepage />
}

export default App

