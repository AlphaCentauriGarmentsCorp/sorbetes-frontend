import { useEffect, useState } from 'react'
import { FaBullseye, FaChevronLeft, FaChevronRight, FaEye, FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa'
import '../design/OurStory.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import storyImage from '../assets/Hero 1.jpg'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const OUR_STORY_BASE_WIDTH = 1920
const OUR_STORY_BASE_HEIGHT = 3223

function getOurStoryScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / OUR_STORY_BASE_WIDTH, 0.18), 1)
}

function OurStory() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [pageScale, setPageScale] = useState(() => getOurStoryScale())
  const storySlides = [storyImage, storyImage, storyImage, storyImage, storyImage]

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getOurStoryScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToHome = () => {
    window.location.search = '?page=home'
  }

  const showPreviousSlide = () => {
    setSlideIndex((prev) => (prev - 1 + storySlides.length) % storySlides.length)
  }

  const showNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % storySlides.length)
  }

  return (
    <div className="our-story-shell">
      <div
        className="our-story-scale-frame"
        style={{
          width: `${OUR_STORY_BASE_WIDTH * pageScale}px`,
          height: `${OUR_STORY_BASE_HEIGHT * pageScale}px`,
        }}
      >
        <div className="our-story-scale-content" style={{ transform: `scale(${pageScale})` }}>
          <div className="our-story-page">
            <div className="os-ellipse os-ellipse-left" aria-hidden="true" />
            <div className="os-ellipse os-ellipse-right" aria-hidden="true" />

            <Navbar logoSrc={logoCircleImg} currentPage="our-story" />

            <button type="button" className="os-back-button" aria-label="Back to homepage" onClick={goToHome}>
              &lsaquo;
            </button>

            <section className="os-hero">
              <h1 className="os-title">Our Story</h1>
              <div className="os-title-line" aria-hidden="true" />
            </section>

            <section className="os-story-body">
              <div className="os-copy">
                <p>
                  Sorbetes Apparel Studio began as a small, passionate workshop with just a few sewing machines, a
                  tight-knit team, and a dream of creating clothing people would be proud to wear. Over the past
                  decades, that dream has grown into a full-scale apparel studio backed by advanced equipment, modern
                  production technology, and a team of more than 100 skilled professionals.
                </p>
                <p>
                  Despite our growth, our heart remains the same: helping creators, start-up brands, and entrepreneurs
                  turn their ideas into real, wearable art. From bulk orders to custom design to premium finishing, we
                  aim to make apparel production simple, accessible, and reliable for everyone.
                </p>
                <p>
                  Today, Sorbetes Apparel Studio partners with emerging and established brands around the world,
                  helping turn creative ideas into thoughtfully crafted, market-ready apparel. Guided by decades of
                  experience, a commitment to quality, and a passion for innovation, we continue to refine our process
                  to deliver reliable production, exceptional craftsmanship, and garments that reflect every brand&apos;s
                  unique identity.
                </p>
              </div>

              <div className="os-image-card">
                <img src={storySlides[slideIndex]} alt="Sorbetes production floor" className="os-story-image" />
                <button type="button" className="os-image-arrow os-image-arrow-left" onClick={showPreviousSlide}>
                  <FaChevronLeft />
                </button>
                <button type="button" className="os-image-arrow os-image-arrow-right" onClick={showNextSlide}>
                  <FaChevronRight />
                </button>
                <div className="os-image-dots" aria-label="Story image indicators">
                  {storySlides.map((_, idx) => (
                    <span key={idx} className={idx === slideIndex ? 'os-dot os-dot-active' : 'os-dot'} aria-hidden="true" />
                  ))}
                </div>
              </div>
            </section>

            <section className="os-mission-vision">
              <h2>Mission &amp; Vision</h2>
              <div className="os-mv-grid">
                <article className="os-mv-card">
                  <div className="os-mv-head">
                    <span className="os-mv-icon-wrap">
                      <FaBullseye className="os-mv-icon" />
                    </span>
                    <h3>Mission</h3>
                  </div>
                  <p>
                    To provide businesses with high-quality, thoughtfully crafted garments that combine creativity,
                    consistency, and efficient production-helping brands turn their ideas into products they can be
                    proud of.
                  </p>
                </article>

                <article className="os-mv-card">
                  <div className="os-mv-head">
                    <span className="os-mv-icon-wrap">
                      <FaEye className="os-mv-icon" />
                    </span>
                    <h3>Vision</h3>
                  </div>
                  <p>
                    To be a trusted apparel partner known for elevating local and growing brands through reliable
                    manufacturing, modern design, and long-term collaboration.
                  </p>
                </article>
              </div>
            </section>

            <section className="os-follow">
              <h2>Follow us</h2>
              <p>See what we&apos;ve been working on.</p>
              <div className="os-follow-icons">
                <a
                  className="os-follow-circle"
                  href="https://www.facebook.com/SorbetesApparel"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Sorbetes Apparel on Facebook"
                >
                  <FaFacebookF className="os-follow-icon os-follow-icon-facebook" />
                </a>
                <a
                  className="os-follow-circle"
                  href="https://www.instagram.com/sorbetesapparelstudio/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Sorbetes Apparel Studio on Instagram"
                >
                  <FaInstagram className="os-follow-icon os-follow-icon-instagram" />
                </a>
                <a
                  className="os-follow-circle"
                  href="https://www.tiktok.com/@sorbetesapparelstudio.ph"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open Sorbetes Apparel Studio on TikTok"
                >
                  <FaTiktok className="os-follow-icon os-follow-icon-tiktok" />
                </a>
              </div>
            </section>

            <Footer logoSrc={wLogo} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurStory
