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
import GuidedWalkthrough from './GuidedWalkthrough.jsx'
import Pricing from './Pricing.jsx'
import '../design/index.css'

function getCurrentPage() {
  return new URLSearchParams(window.location.search).get('page')
}

export default function App() {
  const [page, setPage] = useState(() => getCurrentPage())

  useEffect(() => {
    const syncPage = () => setPage(getCurrentPage())

    window.addEventListener('popstate', syncPage)
    window.addEventListener('cursor:navigate', syncPage)

    return () => {
      window.removeEventListener('popstate', syncPage)
      window.removeEventListener('cursor:navigate', syncPage)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
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
  
  if (page === 'walkthrough') return <GuidedWalkthrough />
  if (page === 'pricing') return <Pricing />
  return <Homepage />
}