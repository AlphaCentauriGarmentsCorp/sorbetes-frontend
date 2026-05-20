import { useEffect, useState } from 'react'
import Auth from './Auth.jsx'
import ForgotPassword from './ForgotPassword.jsx'
import NewPassword from './NewPassword.jsx'
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
import DirectForm from './DirectForm.jsx'
import Pricing from './Pricing.jsx'
import FoundersClub from './FoundersClub.jsx'
import FoundersClubSignedIn from './FoundersClubSignedIn.jsx'
import FoundersClubGuide from './FoundersClubGuide.jsx'
import GetInTouch from './GetInTouch.jsx'
import MyOrders from './MyOrders.jsx'
import TrackOrder from './TrackOrder.jsx'
import AccountSettings from './AccountSettings.jsx'
import { ensureFoundersClubAccount, isSignedIn } from '../utils/auth.js'
import '../design/index.css'

import { getPageParam } from '../utils/navigation.js'

export default function App() {
  const [navVersion, setNavVersion] = useState(0)
  const [signedIn, setSignedIn] = useState(() => isSignedIn())
  const page = navVersion >= 0 ? getPageParam() : ''

  useEffect(() => {
    const syncPage = () => setNavVersion((version) => version + 1)
    const syncAuth = () => setSignedIn(isSignedIn())

    window.addEventListener('popstate', syncPage)
    window.addEventListener('cursor:navigate', syncPage)
    window.addEventListener('cursor:auth-change', syncAuth)

    ensureFoundersClubAccount()
    syncAuth()

    return () => {
      window.removeEventListener('popstate', syncPage)
      window.removeEventListener('cursor:navigate', syncPage)
      window.removeEventListener('cursor:auth-change', syncAuth)
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [page])

  if (page === 'otp') return <OtpVerification />
  if (page === 'auth') return <Auth />
  if (page === 'forgot-password') return <ForgotPassword />
  if (page === 'new-password') return <NewPassword />
  if (page === 'home') return <Homepage />
  if (page === 'our-story') return <OurStory />
  if (page === 'services') return <Services />
  if (page === 'guide') return <Guide />
  if (page === 'fabric-print-guide') return <FabricPrintGuide />
  if (page === 'portfolio') return <Portfolio />
  if (page === 'portfolio-archive') return <PortfolioArchive />
  if (page === 'portfolio-expanded') return <PortfolioExpanded />
  if (page === 'walkthrough') return <GuidedWalkthrough />
  if (page === 'direct-form') return <DirectForm />
  if (page === 'pricing') return <Pricing />
  if (page === 'founders-club') return signedIn ? <FoundersClubSignedIn /> : <FoundersClub />
  if (page === 'founders-club-guide') return <FoundersClubGuide />
  if (page === 'get-in-touch') return <GetInTouch />
  if (page === 'my-orders') return signedIn ? <MyOrders /> : <Auth />
  if (page === 'track-order') return signedIn ? <TrackOrder /> : <Auth />
  if (page === 'account' || page === 'account-settings') {
    return signedIn ? <AccountSettings /> : <Auth />
  }
  return <Homepage />
}
