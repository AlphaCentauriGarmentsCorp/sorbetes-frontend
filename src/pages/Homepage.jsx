import '../design/Homepage.css'

import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import hero1 from '../assets/Hero 1.jpg'
import hero2 from '../assets/Hero 2.jpg'
import hero3 from '../assets/Hero 3.jpg'
import hero4 from '../assets/Hero 4.jpg'
import hero5 from '../assets/Hero 5.jpg'
import hero6 from '../assets/Hero 6.jpg'
import hero7 from '../assets/Hero 7.jpg'
import wLogo from '../assets/w_logo.png'
import kushLogo from '../assets/kush-logo.png'
import linyaLogo from '../assets/linya.jpg'
import dailyGrindLogo from '../assets/daily grind.jpg'
import teamMnlLogo from '../assets/teammnl.jpg'
import foundersClubKush from '../assets/Kush.jpg'
import foundersClubRevel from '../assets/REVEL.jpg'
import foundersClubSenoritos from '../assets/Senoritos.jpg'
import foundersClubStayHungry from '../assets/Stay Hungry.jpg'
import foundersClubVariant5 from '../assets/Variant5.jpg'
import serviceImg1 from '../assets/OurServices/Clothing Production.jpg'
import serviceImg2 from '../assets/OurServices/Print Packages.jpg'
import serviceImg3 from '../assets/OurServices/Printing Services.jpg'
import serviceImg4 from '../assets/OurServices/Garment Making.jpg'
import serviceImg5 from '../assets/OurServices/Ready-Made Items.jpg'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import { useEffect, useRef, useState } from 'react'
import { FaAward, FaLocationDot, FaPen, FaStar, FaUserGroup, FaUsers } from 'react-icons/fa6'
import { FaFacebookF, FaInstagram, FaTiktok, FaUser } from 'react-icons/fa'
import { FiMessageSquare, FiSend } from 'react-icons/fi'
import { IoClose } from 'react-icons/io5'
import { MdHandshake } from 'react-icons/md'
import { isSignedIn } from '../utils/auth.js'

const heroImages = [hero1, hero2, hero3, hero4, hero5, hero6, hero7]

const testimonialImages = [
  { src: foundersClubKush, alt: 'Founders Club testimonial for KUSH' },
  { src: foundersClubRevel, alt: 'Founders Club testimonial for REVEL' },
  { src: foundersClubSenoritos, alt: 'Founders Club testimonial for Senoritos' },
  { src: foundersClubStayHungry, alt: 'Founders Club testimonial for Stay Hungry' },
  { src: foundersClubVariant5, alt: 'Founders Club testimonial for Variant5' },
]

const trustedBrands = [
  { src: kushLogo, alt: 'KUSH' },
  { src: linyaLogo, alt: 'Linya Linya' },
  { src: dailyGrindLogo, alt: 'Daily Grind' },
  { src: teamMnlLogo, alt: 'Team MNL' },
]

const services = [
  {
    title: 'Custom Clothing Production',
    text: "Bring your ideas to life with fully customized apparel tailored to your vision. From fabrics to finishes, we help you design and produce pieces that represent your brand's style.",
    img: serviceImg1,
    imgAlt: 'Custom clothing production',
    layout: 'text-image',
  },
  {
    title: 'Shirt + Print Packages',
    text: 'Pair quality shirts with full customization and scaled production options. From style selection to print execution, we help you build ready-to-sell pieces for your brand or store.',
    img: serviceImg2,
    imgAlt: 'Shirt and print packages',
    layout: 'image-text',
  },
  {
    title: 'Printing Services',
    text: 'We offer high-quality printing using durable ink and proven techniques like silkscreen printing, direct transfer, color details, and long-lasting prints on every garment.',
    img: serviceImg3,
    imgAlt: 'Printing services',
    layout: 'text-image',
  },
  {
    title: 'Cut & Sew Garment Making',
    text: 'From fabric selection to final packaging, we handle the entire production process. This end-to-end service is ideal for brands looking for custom-made apparel from concept to completion.',
    img: serviceImg4,
    imgAlt: 'Cut and sew garment making',
    layout: 'image-text',
  },
  {
    title: 'Ready-Made Items',
    text: 'Choose from our collection of ready-made apparel, including shirts, hoodies, jackets, socks, shorts, and more, ready to print, brand, and merchandize.',
    img: serviceImg5,
    imgAlt: 'Ready-made items',
    layout: 'text-image',
  },
]

const whyItems = [
  { icon: <FaStar className="hp-why-icon-svg hp-why-icon-svg-star" />, title: 'Established Experience', text: 'Operating since 2002, we bring years of industry knowledge and hands-on expertise to every project.' },
  { icon: <MdHandshake className="hp-why-icon-svg hp-why-icon-svg-handshake" />, title: 'Trusted by Brands', text: 'We have worked with respected local and national brands who continue to choose us for our reliability and results.' },
  { icon: <FaAward className="hp-why-icon-svg hp-why-icon-svg-medal" />, title: 'Quality-Driven', text: 'Every project is handled with attention to detail and a commitment to high standards.' },
  { icon: <FaLocationDot className="hp-why-icon-svg hp-why-icon-svg-ph" />, title: 'Local Expertise', text: 'Based in Quezon City, we understand the local market while delivering professional-level service.' },
  { icon: <FaUsers className="hp-why-icon-svg hp-why-icon-svg-people" />, title: 'Client-Focused Approach', text: 'We value long-term partnerships and treat every project as a collaborative effort.' },
]

const socialLinks = [
  { href: 'https://www.facebook.com/SorbetesApparel', label: 'Facebook', cls: 'facebook', icon: <FaFacebookF className="hp-follow-icon hp-follow-icon-facebook" /> },
  { href: 'https://www.instagram.com/sorbetesapparelstudio/', label: 'Instagram', cls: 'instagram', icon: <FaInstagram className="hp-follow-icon hp-follow-icon-instagram" /> },
  { href: 'https://www.tiktok.com/@sorbetesapparelstudio.ph', label: 'TikTok', cls: 'tiktok', icon: <FaTiktok className="hp-follow-icon hp-follow-icon-tiktok" /> },
]

const BOT_REPLY_DELAY_MS = 2000
const BOT_REPLY_TEXT =
  'Thanks for your message! Our team has received your inquiry and will get back to you shortly.'

function formatSentTime(date) {
  const value = date instanceof Date ? date : new Date(date)
  const time = value.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  return `Sent ${time.replace(/\s/g, '').toLowerCase()}`
}

function Homepage() {
  const [heroIndex, setHeroIndex] = useState(0)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [testimonialDirection, setTestimonialDirection] = useState('next')
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [unreadReplies, setUnreadReplies] = useState(0)
  const chatOpenRef = useRef(chatOpen)
  const replyTimeoutRef = useRef(null)
  const signedIn = isSignedIn()

  useEffect(() => {
    chatOpenRef.current = chatOpen
    if (chatOpen) {
      const frame = window.requestAnimationFrame(() => setUnreadReplies(0))
      return () => window.cancelAnimationFrame(frame)
    }
  }, [chatOpen])

  useEffect(() => {
    const id = setInterval(() => setHeroIndex((p) => (p + 1) % heroImages.length), 3000)
    return () => {
      clearInterval(id)
      if (replyTimeoutRef.current) {
        clearTimeout(replyTimeoutRef.current)
      }
    }
  }, [])

  const scheduleBotReply = () => {
    if (replyTimeoutRef.current) {
      clearTimeout(replyTimeoutRef.current)
    }

    replyTimeoutRef.current = setTimeout(() => {
      setChatMessages((previous) => [
        ...previous,
        {
          id: Date.now(),
          text: BOT_REPLY_TEXT,
          sentAt: new Date(),
          role: 'bot',
        },
      ])

      if (!chatOpenRef.current) {
        setUnreadReplies((count) => count + 1)
      }

      replyTimeoutRef.current = null
    }, BOT_REPLY_DELAY_MS)
  }

  const handleChatSubmit = (event) => {
    event.preventDefault()
    const trimmed = chatMessage.trim()
    if (!trimmed) return

    setChatMessages((previous) => [
      ...previous,
      { id: Date.now(), text: trimmed, sentAt: new Date(), role: 'user' },
    ])
    setChatMessage('')
    scheduleBotReply()
  }

  const toggleChatOpen = () => {
    setChatOpen((open) => {
      const nextOpen = !open
      if (nextOpen) {
        setUnreadReplies(0)
      }
      return nextOpen
    })
  }

  const hasUserMessages = chatMessages.some((message) => message.role === 'user')
  const isAwaitingReply =
    hasUserMessages && chatMessages[chatMessages.length - 1]?.role === 'user'

  const prevTestimonial = () => {
    setTestimonialDirection('prev')
    setTestimonialIndex(p => (p - 1 + testimonialImages.length) % testimonialImages.length)
  }

  const nextTestimonial = () => {
    setTestimonialDirection('next')
    setTestimonialIndex(p => (p + 1) % testimonialImages.length)
  }

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  return (
    <div className="hp-page">
      <div className="hp-ellipse hp-ellipse-1" aria-hidden="true" />
      <div className="hp-ellipse hp-ellipse-2" aria-hidden="true" />
      <div className="hp-ellipse hp-ellipse-3" aria-hidden="true" />
      <div className="hp-ellipse hp-ellipse-4" aria-hidden="true" />

      <Navbar logoSrc={logoCircleImg} currentPage="home" />

      {signedIn ? (
        <>
          {chatOpen ? (
            <section
              className="hp-chatbot-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Sorbetes chatbot"
            >
              <header className="hp-chatbot-header">
                <div className="hp-chatbot-brand">
                  <img src={logoCircleImg} alt="" />
                  <span>SORBETES</span>
                </div>
                <button
                  type="button"
                  className="hp-chatbot-close"
                  aria-label="Close chatbot"
                  onClick={() => setChatOpen(false)}
                >
                  <IoClose aria-hidden="true" />
                </button>
              </header>

              <div className="hp-chatbot-divider" aria-hidden="true" />

              <div className="hp-chatbot-notice">
                <span className="hp-chatbot-notice-icon" aria-hidden="true">
                  i
                </span>
                <p>Replies may take a few moments. Thank you for your patience.</p>
              </div>

              <div
                className={
                  hasUserMessages ? 'hp-chatbot-body hp-chatbot-body-sent' : 'hp-chatbot-body'
                }
              >
                {!hasUserMessages ? (
                  <p className="hp-chatbot-greeting">Hi, how may we assist you today</p>
                ) : (
                  <>
                    {isAwaitingReply ? (
                      <p className="hp-chatbot-awaiting">Awaiting response...</p>
                    ) : null}
                    <div className="hp-chatbot-messages" aria-live="polite">
                      {chatMessages.map((message) =>
                        message.role === 'bot' ? (
                          <article className="hp-chatbot-message hp-chatbot-message-bot" key={message.id}>
                            <div className="hp-chatbot-message-row">
                              <span className="hp-chatbot-avatar hp-chatbot-avatar-bot" aria-hidden="true">
                                <img src={logoCircleImg} alt="" />
                              </span>
                              <div className="hp-chatbot-bubble hp-chatbot-bubble-bot">{message.text}</div>
                            </div>
                          </article>
                        ) : (
                          <article className="hp-chatbot-message" key={message.id}>
                            <div className="hp-chatbot-message-row">
                              <div className="hp-chatbot-bubble">{message.text}</div>
                              <span className="hp-chatbot-avatar" aria-hidden="true">
                                <FaUser />
                              </span>
                            </div>
                            <p className="hp-chatbot-sent-time">{formatSentTime(message.sentAt)}</p>
                          </article>
                        ),
                      )}
                    </div>
                  </>
                )}
              </div>

              <form className="hp-chatbot-input-row" onSubmit={handleChatSubmit}>
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(event) => setChatMessage(event.target.value)}
                  placeholder="Write a message here"
                  aria-label="Write a message"
                />
                <button type="submit" className="hp-chatbot-send" aria-label="Send message">
                  <FiSend aria-hidden="true" />
                </button>
              </form>
            </section>
          ) : null}

          <button
            type="button"
            className="hp-chatbot-button"
            aria-label={chatOpen ? 'Close chatbot' : 'Open chatbot'}
            aria-expanded={chatOpen}
            onClick={toggleChatOpen}
          >
            <FiMessageSquare aria-hidden="true" />
            {!chatOpen && unreadReplies > 0 ? (
              <span className="hp-chatbot-badge" aria-label={`${unreadReplies} unread replies`}>
                {unreadReplies > 9 ? '9+' : unreadReplies}
              </span>
            ) : null}
          </button>
        </>
      ) : null}

      <section className="hp-hero" aria-label="Hero">
        <div className="hp-hero-copy">
          <div className="hp-hero-coin-wrap">
            <img className="hp-hero-coin" src={wLogo} alt="" />
          </div>
          <h1 className="hp-hero-title">Start your own</h1>
          <h1 className="hp-hero-title hp-hero-title-bold">Clothing Line</h1>
          <p className="hp-hero-subtitle">
            From concept to production, we help emerging and established brands turn apparel ideas into
            thoughtfully crafted, market-ready collections that stand out.
          </p>
          <div className="hp-hero-cta-row">
            {signedIn ? (
              <>
                <button type="button" className="hp-btn hp-btn-primary" onClick={() => navigate('?page=pricing')}>
                  START NEW ORDER
                </button>
                <button type="button" className="hp-btn hp-btn-outline" onClick={() => navigate('?page=my-orders')}>
                  VIEW MY ORDERS
                </button>
              </>
            ) : (
              <>
                <button type="button" className="hp-btn hp-btn-primary" onClick={() => navigate('?page=portfolio')}>
                  EXPLORE MORE
                </button>
                <button type="button" className="hp-btn hp-btn-outline" onClick={() => navigate('?page=pricing')}>
                  AVAIL NOW
                </button>
              </>
            )}
          </div>
          <div className="hp-hero-divider" aria-hidden="true" />
          <div className="hp-hero-stats">
            <div className="hp-hero-stat">
              <span className="hp-hero-stat-icon hp-hero-stat-icon-medal" aria-hidden="true" />
              <span>20+ Years of Experience</span>
            </div>
            <div className="hp-hero-stat">
              <span className="hp-hero-stat-icon hp-hero-stat-icon-shirt" aria-hidden="true" />
              <span>500+ Brands Served</span>
            </div>
            <div className="hp-hero-stat">
              <span className="hp-hero-stat-icon hp-hero-stat-icon-star" aria-hidden="true" />
              <span>Premium Quality Production</span>
            </div>
          </div>
        </div>

        <div className="hp-hero-media">
          <div className="hp-hero-stack hp-hero-stack-1" aria-hidden="true" />
          <div className="hp-hero-stack hp-hero-stack-2" aria-hidden="true" />
          <div className="hp-hero-stack hp-hero-stack-3" aria-hidden="true" />
          <img key={heroIndex} className="hp-hero-image" src={heroImages[heroIndex]} alt={`Hero ${heroIndex + 1}`} />
          <div className="hp-hero-image-shadow" aria-hidden="true" />
          <div className="hp-hero-dots" role="tablist" aria-label="Hero images">
            {heroImages.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`hp-dot${i === heroIndex ? ' hp-dot-active' : ''}`}
                aria-label={`Show hero ${i + 1}`}
                aria-selected={i === heroIndex}
                onClick={() => setHeroIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="hp-testimonial" aria-label="Client testimonial">
        <img
          key={`${testimonialDirection}-${testimonialIndex}`}
          className={`hp-t-image hp-t-image-${testimonialDirection}`}
          src={testimonialImages[testimonialIndex].src}
          alt={testimonialImages[testimonialIndex].alt}
        />
        <button type="button" className="hp-t-nav hp-t-nav-prev" aria-label="Previous testimonial" onClick={prevTestimonial}>
          <span className="hp-t-nav-icon" aria-hidden="true" />
        </button>
        <button type="button" className="hp-t-nav hp-t-nav-next" aria-label="Next testimonial" onClick={nextTestimonial}>
          <span className="hp-t-nav-icon" aria-hidden="true" />
        </button>
      </section>

      <section className="hp-services" aria-label="Our services">
        <div className="hp-section-label">
          <div className="hp-label-line" />
          <span className="hp-label-text">OUR SERVICES</span>
        </div>
        <div className="hp-services-intro">
          <h2 className="hp-section-heading">Concept to Production</h2>
          <p className="hp-section-copy">
            Everything you need to bring your apparel ideas to life, thoughtfully crafted through expert production,
            precision detailing, and a seamless end-to-end process.
          </p>
        </div>
        <div className="hp-services-list">
          {services.map(({ title, text, img, imgAlt, layout }) => (
            <article key={title} className={`hp-service-row hp-service-row-${layout}`}>
              <div className="hp-service-copy">
                <h3 className="hp-service-title">{title}</h3>
                <p className="hp-service-text">{text}</p>
              </div>
              <div className="hp-service-media">
                <img className="hp-service-img" src={img} alt={imgAlt} />
              </div>
            </article>
          ))}
        </div>
        <button type="button" className="hp-btn hp-btn-primary hp-services-avail" onClick={() => navigate('?page=pricing')}>
          AVAIL NOW
        </button>
      </section>

      <section className="hp-why" aria-label="Why choose us">
        <div className="hp-section-label">
          <div className="hp-label-line" />
          <span className="hp-label-text">ABOUT US</span>
        </div>
        <div className="hp-why-header">
          <h2 className="hp-section-heading">Why Choose us?</h2>
          <p className="hp-section-copy">
            Decades of experience, uncompromising quality, and trust you can rely on, crafted to deliver exceptional
            results you can be proud of.
          </p>
        </div>
        <div className="hp-why-list">
          {whyItems.map(({ icon, title, text }) => (
            <article key={title} className="hp-why-item">
              <div className="hp-why-left">
                <span className="hp-why-icon" aria-hidden="true">{icon}</span>
                <h3 className="hp-why-item-title">{title}</h3>
              </div>
              <div className="hp-why-right">
                <p className="hp-why-item-text">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="hp-quote" aria-label="Request a quote">
        <div className="hp-quote-header">
          <h2 className="hp-quote-title">Let&apos;s bring your projects to life</h2>
          <p className="hp-quote-subtitle">Receive a detailed quote with no commitment.</p>
        </div>
        <div className="hp-quote-options">
          <article className="hp-quote-card">
            <div className="hp-quote-icon-wrap"><FaUserGroup className="hp-quote-icon" /></div>
            <h3 className="hp-quote-card-title">Guided Walkthrough</h3>
            <p className="hp-quote-card-text">Follow our guided walkthrough to help you choose the right options step by step.</p>
          </article>
          <article className="hp-quote-card">
            <div className="hp-quote-icon-wrap"><FaPen className="hp-quote-icon" /></div>
            <h3 className="hp-quote-card-title">Fill Form Directly</h3>
            <p className="hp-quote-card-text">Fill out the order form directly and proceed to pricing with your preferred garment and production specifications.</p>
          </article>
        </div>
        <button
          type="button"
          className="hp-btn hp-btn-primary hp-quote-btn"
          onClick={() => navigate('?page=pricing')}
        >
          Request a Quote
        </button>
      </section>

      <section className="hp-trusted" aria-label="Trusted brands">
        <h2 className="hp-trusted-title">Trusted by Brands</h2>
        <p className="hp-trusted-subtitle">Built on credibility and results.</p>
        <div className="hp-marquee" aria-label="Trusted brand logos">
          <div className="hp-marquee-track">
            {[...trustedBrands, ...trustedBrands].map((brand, i) => (
              <div key={i} className="hp-brand-card">
                <img className="hp-brand-img" src={brand.src} alt={i < trustedBrands.length ? brand.alt : ''} />
              </div>
            ))}
          </div>
        </div>
        <p className="hp-trusted-caption">...and the list goes on</p>
      </section>

      <section className="hp-follow" aria-label="Follow us">
        <h2 className="hp-follow-title">Follow us</h2>
        <p className="hp-follow-subtitle">See what we&apos;ve been working on.</p>
        <div className="hp-follow-icons">
          {socialLinks.map(({ href, label, cls, icon }) => (
            <a
              key={cls}
              className={`hp-follow-circle hp-follow-circle-${cls}`}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open Sorbetes Apparel on ${label}`}
            >
              {icon}
            </a>
          ))}
        </div>
      </section>

      <Footer logoSrc={wLogo} />
    </div>
  )
}

export default Homepage