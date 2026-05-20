import { useEffect, useState } from 'react'
import { FaCheck, FaClock, FaEnvelope, FaFacebookF, FaInstagram, FaPhone, FaTiktok } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { IoChevronBack } from 'react-icons/io5'
import '../design/GetInTouch.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import wLogo from '../assets/w_logo.png'
import { FOOTER_CANVAS_HEIGHT } from '../constants/layout.js'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

const CONTACT_BASE_WIDTH = 1920
const CONTACT_PAGE_HEIGHT = 3013
const CONTACT_CONFIRM_PAGE_HEIGHT = 1080
const FAQ_OPEN_EXTRA_HEIGHT = 85

const contactDetails = [
  {
    Icon: FaLocationDot,
    text: '117 Mother Ignacia Ave., Quezon City, Philippines',
  },
  {
    Icon: FaPhone,
    text: '0961 442 7409',
  },
  {
    Icon: FaEnvelope,
    text: 'sales@alphacentauri.ph',
  },
  {
    Icon: FaClock,
    text: (
      <>
        Mon-Sat: 9:00AM-5:00PM
        <br />
        Sunday: Closed
      </>
    ),
  },
]

const faqs = [
  {
    question: 'What services do you offer?',
    answer:
      'We provide end-to-end apparel services including custom design, bulk production, printing, embroidery, and premium finishing.',
  },
  {
    question: 'Do you work with start-up or small brands?',
    answer:
      'Yes. We support start-ups, creators, and growing brands, and we guide them through the production process from concept to completion.',
  },
  {
    question: 'Is there a minimum order quantity (MOQ)?',
    answer:
      'Yes, MOQs vary depending on the service and garment type. Contact us with your requirements so we can provide accurate details.',
  },
  {
    question: 'How can we follow up on our inquiry?',
    answer: 'Once you contact us, our team will respond within business hours and guide you through the next steps.',
  },
  {
    question: "Can you help with design if we don't have one yet?",
    answer:
      'Yes. Our team can assist with design development and refinement to ensure your ideas are production-ready.',
  },
  {
    question: 'Do you ship nationwide?',
    answer: 'Yes, we offer nationwide shipping. Shipping options and costs will be discussed during order processing.',
  },
]

function getContactScale() {
  if (typeof window === 'undefined') {
    return 1
  }

  return Math.min(Math.max((window.innerWidth - 24) / CONTACT_BASE_WIDTH, 0.18), 1)
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event('cursor:navigate'))
}

function GetInTouch() {
  const [pageScale, setPageScale] = useState(() => getContactScale())
  const [openFaqs, setOpenFaqs] = useState([])
  const [messageSent, setMessageSent] = useState(false)
  const faqExtraHeight = openFaqs.length * FAQ_OPEN_EXTRA_HEIGHT
  const contactPageHeight = messageSent ? CONTACT_CONFIRM_PAGE_HEIGHT : CONTACT_PAGE_HEIGHT + faqExtraHeight
  const contactBaseHeight = contactPageHeight + FOOTER_CANVAS_HEIGHT

  useEffect(() => {
    const handleResize = () => {
      setPageScale(getContactScale())
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const goToHome = () => {
    navigate('?page=home')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    form.reset()
    setOpenFaqs([])
    setMessageSent(true)
  }

  return (
    <div className="contact-shell">
      <div
        className="contact-scale-frame"
        style={{
          width: `${CONTACT_BASE_WIDTH * pageScale}px`,
          height: `${contactBaseHeight * pageScale}px`,
        }}
      >
        <div
          className="contact-scale-content"
          style={{ height: `${contactBaseHeight}px`, transform: `scale(${pageScale})` }}
        >
          <main className="contact-page" style={{ height: `${contactPageHeight}px` }}>
            <Navbar logoSrc={logoCircleImg} currentPage="get-in-touch" />

            {messageSent ? (
              <section className="contact-confirmation" aria-labelledby="contact-confirmation-title">
                <div className="contact-confirmation-icon" aria-hidden="true">
                  <FaCheck />
                </div>
                <h1 id="contact-confirmation-title">Message Sent!</h1>
                <p>Thanks for contacting Sorbetes! We&apos;ll respond shortly.</p>
                <button type="button" onClick={() => setMessageSent(false)}>
                  Done
                </button>
              </section>
            ) : (
              <>
                <button type="button" className="contact-back-button" aria-label="Back to homepage" onClick={goToHome}>
                  <IoChevronBack aria-hidden="true" />
                </button>

                <section className="contact-message-card" aria-labelledby="contact-message-title">
              <div className="contact-info-panel">
                <div className="contact-message-heading">
                  <h1 id="contact-message-title">Message Us</h1>
                  <div aria-hidden="true" />
                </div>

                <div className="contact-detail-list">
                  {contactDetails.map(({ Icon, text }, index) => (
                    <div className="contact-detail-row" key={index}>
                      <span className="contact-icon-circle" aria-hidden="true">
                        <Icon />
                      </span>
                      <p>{text}</p>
                    </div>
                  ))}
                </div>

                <div className="contact-social-row" aria-label="Social links">
                  <a className="contact-social contact-social-dark" href="https://www.facebook.com/SorbetesApparel" target="_blank" rel="noreferrer" aria-label="Open Facebook">
                    <FaFacebookF aria-hidden="true" />
                  </a>
                  <a className="contact-social" href="https://www.instagram.com/sorbetesapparelstudio/" target="_blank" rel="noreferrer" aria-label="Open Instagram">
                    <FaInstagram aria-hidden="true" />
                  </a>
                  <a className="contact-social" href="https://www.tiktok.com/@sorbetesapparelstudio.ph" target="_blank" rel="noreferrer" aria-label="Open TikTok">
                    <FaTiktok aria-hidden="true" />
                  </a>
                </div>
              </div>

              <form className="contact-form-panel" onSubmit={handleSubmit}>
                <label>
                  <span>Your Name</span>
                  <input type="text" placeholder="Enter your full name" required />
                </label>
                <label>
                  <span>E-mail</span>
                  <input type="email" placeholder="Enter your email" required />
                </label>
                <label className="contact-message-field">
                  <span>Message</span>
                  <textarea placeholder="Enter your message here..." required />
                </label>
                <button type="submit">Send</button>
              </form>
            </section>

            <section className="contact-faq" aria-labelledby="contact-faq-title">
              <h2 id="contact-faq-title">FAQ&apos;s</h2>
              <div className="contact-faq-list">
                {faqs.map(({ question, answer }, index) => {
                  const isOpen = openFaqs.includes(index)

                  return (
                  <article
                    className={isOpen ? 'contact-faq-item contact-faq-item-open' : 'contact-faq-item'}
                    key={question}
                  >
                    <button
                      type="button"
                      className="contact-faq-question"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenFaqs((current) =>
                          current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
                        )
                      }
                    >
                      <span aria-hidden="true">⌄</span>
                      {question}
                    </button>
                    {isOpen && <p>{answer}</p>}
                  </article>
                  )
                })}
              </div>
              <p style={{ top: `${787 + faqExtraHeight}px` }}>
                Still have questions? You may reach out using the contact form above.
              </p>
            </section>

            <section
              className="contact-visit"
              style={{ top: `${2285 + faqExtraHeight}px` }}
              aria-labelledby="contact-visit-title"
            >
              <div className="contact-visit-copy">
                <div>
                  <h2 id="contact-visit-title">Visit Us</h2>
                  <p>
                    Our studio sits near the <strong>Pinoy Big Brother House</strong>, beside Tower B of M Place,
                    offering a convenient location for consultations, meetings, and studio visits.
                  </p>
                </div>

                <div className="contact-visit-details">
                  <div className="contact-visit-row">
                    <span className="contact-icon-circle" aria-hidden="true">
                      <FaLocationDot />
                    </span>
                    <span>117 Mother Ignacia Ave., Quezon City, Philippines</span>
                  </div>
                  <div className="contact-visit-row">
                    <span className="contact-icon-circle" aria-hidden="true">
                      <FaPhone />
                    </span>
                    <span>0961 442 7409</span>
                  </div>
                  <div className="contact-visit-row">
                    <span className="contact-icon-circle" aria-hidden="true">
                      <FaClock />
                    </span>
                    <span>
                      Mon-Sat: 9:00AM-5:00PM
                      <br />
                      Sunday: Closed
                    </span>
                  </div>
                </div>
              </div>

              <iframe
                className="contact-map"
                title="Sorbetes Studio map"
                src="https://www.google.com/maps?q=117%20Mother%20Ignacia%20Ave%2C%20Quezon%20City%2C%20Philippines&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </section>
              </>
            )}
          </main>
          <Footer logoSrc={wLogo} />
        </div>
      </div>
    </div>
  )
}

export default GetInTouch
