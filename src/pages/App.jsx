import { useEffect, useState } from 'react'
import Auth from './Auth.jsx'
import OtpVerification from './OtpVerification.jsx'
import Homepage from './Homepage.jsx'
import OurStory from './OurStory.jsx'
import Services from './Services.jsx'
import Guide from './Guide.jsx'
import FabricPrintGuide from './FabricPrintGuide.jsx'
import Portfolio from './Portfolio.jsx'
import PortfolioArchive from './PortfolioArchive.jsx'
import PortfolioExpanded from './PortfolioExpanded.jsx'
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [page])

  if (page === 'otp') return <OtpVerification />
  if (page === 'auth') return <Auth />
  if (page === 'home') return <Homepage />
  if (page === 'our-story') return <OurStory />
  if (page === 'services') return <Services />
  if (page === 'guide') return <Guide />
  if (page === 'fabric-print-guide') return <FabricPrintGuide />
  if (page === 'portfolio') return <Portfolio />
  if (page === 'portfolio-archive') return <PortfolioArchive />
  if (page === 'portfolio-expanded') return <PortfolioExpanded />

  return <Homepage />
}

export default App

