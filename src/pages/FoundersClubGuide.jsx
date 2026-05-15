import { useEffect, useState } from 'react'
import { IoChevronBack } from 'react-icons/io5'
import '../design/FoundersClubGuide.css'
import foundersLogo from '../assets/Founders-logo.png'
import wLogo from '../assets/w_logo.png'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const FOUNDERS_CLUB_GUIDE_BASE_WIDTH = 1920
const FOUNDERS_CLUB_GUIDE_BASE_HEIGHT = 1984

function getFoundersClubGuideScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / FOUNDERS_CLUB_GUIDE_BASE_WIDTH, 0.18), 1)
}

function FoundersClubGuide() {
  const [pageScale, setPageScale] = useState(() => getFoundersClubGuideScale())

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getFoundersClubGuideScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goBack = () => {
    window.history.pushState({}, '', '?page=founders-club')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const goToSignUp = () => {
    window.history.pushState({}, '', '?page=auth&mode=signup')
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  return (
    <div className="founders-club-guide-shell">
      <div
        className="founders-club-guide-scale-frame"
        style={{
          width: `${FOUNDERS_CLUB_GUIDE_BASE_WIDTH * pageScale}px`,
          height: `${FOUNDERS_CLUB_GUIDE_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="founders-club-guide-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <main className="founders-club-guide-page">
            <Navbar logoSrc={foundersLogo} currentPage="founders-club" logoOnly />

            <button type="button" className="fcg-back-button" aria-label="Back to Founder's Club" onClick={goBack}>
              <IoChevronBack aria-hidden="true" />
            </button>

            <img className="fcg-founders-logo" src={foundersLogo} alt="The Founders Club" />

            <section className="fcg-content" aria-labelledby="fcg-title">
              <article className="fcg-block">
                <h1 id="fcg-title">How to Join the Sorbetes Founder&apos;s Club</h1>
                <div className="fcg-copy">
                  <p>
                    The Sorbetes Founder&apos;s Club is a community of brands we feature as part of our partners. By
                    joining, your brand receives <strong>free promotion</strong> through a dedicated showcase that
                    includes your logo, testimonial, and clickable social media links. This helps potential clients and
                    visitors discover your brand while highlighting your experience working with Sorbetes.
                  </p>
                  <p>
                    To join, simply log in to your account and <strong>complete your first purchase.</strong> After your
                    order is successfully finished, you&apos;ll receive your <strong>reference number.</strong> You can
                    then use this code to submit your review, along with your brand details and logo, to apply for the
                    Sorbetes Founder&apos;s Club. Once approved, your entry will be published on the Founder&apos;s Club
                    page and <strong>featured as one of our partners.</strong>
                  </p>
                  <p>
                    This is a great opportunity to increase visibility, build credibility, and connect with a wider
                    audience - at no cost.
                  </p>
                </div>
              </article>

              <article className="fcg-block fcg-perks">
                <h2>Perks of being part of the Founder&apos;s Club</h2>
                <div className="fcg-copy">
                  <p>
                    Being part of the Sorbetes Founder&apos;s Club gives you <strong>additional rewards</strong> on top
                    of your referrals. You&apos;ll receive <strong>bonus points</strong> that will be added directly to
                    your referral points. These points can be accumulated and converted into free production for your
                    future orders.
                  </p>
                  <p>
                    The more brands you refer, the more points you earn - and there&apos;s no limit to how much you can
                    collect. As your points increase, you can redeem them for free production, helping you maximize your
                    partnership benefits. It&apos;s a simple way to get featured, earn rewards, and turn your referrals
                    into real production value.
                  </p>
                </div>
              </article>

              <button type="button" className="fcg-avail-button" onClick={goToSignUp}>
                AVAIL NOW
              </button>
            </section>

            <Footer logoSrc={wLogo} />
          </main>
        </div>
      </div>
    </div>
  )
}

export default FoundersClubGuide
