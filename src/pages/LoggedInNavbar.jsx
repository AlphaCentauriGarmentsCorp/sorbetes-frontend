import { useEffect, useRef, useState } from 'react'
import {
  FaBell,
  FaBoxOpen,
  FaCheck,
  FaClipboardList,
  FaPaperPlane,
  FaShoppingCart,
  FaTruck,
  FaUser,
} from 'react-icons/fa'
import { FaCircleQuestion, FaRightFromBracket, FaUserGear } from 'react-icons/fa6'
import '../design/LoggedInNavbar.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import foundersLogo from '../assets/Founders-logo.png'
import { signOut } from '../utils/auth.js'
import { navigateToPage } from '../utils/navigation.js'

const NAV_ITEMS = [
  { key: 'our-story', label: 'Our Story', page: 'our-story' },
  {
    key: 'services',
    label: 'Services',
    dropdown: [
      { label: 'Our Services', page: 'services' },
      { label: 'Portfolio', page: 'portfolio' },
    ],
  },
  {
    key: 'guide',
    label: 'Guide',
    dropdown: [
      { label: 'How to Order', page: 'guide' },
      { label: 'Fabric Print Guide', page: 'fabric-print-guide' },
    ],
  },
  { key: 'founders-club', label: "Founder's Club", page: 'founders-club' },
  { key: 'get-in-touch', label: 'Get in Touch', page: 'get-in-touch' },
]

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'quotation-received',
    title: 'Quotation Received',
    time: '1hr ago',
    message: 'Your request has been successfully submitted and is now under review by our team.',
    icon: 'sent',
  },
  {
    id: 'quotation-review',
    title: 'Quotation Under Review',
    time: '1hr ago',
    message: 'We are currently reviewing your specifications and preparing your quotation details.',
    icon: 'clipboard',
  },
  {
    id: 'quotation-ready',
    title: 'Quotation Ready',
    time: '1hr ago',
    message: 'Your quotation is now available. Please review the details and proceed with confirmation.',
    icon: 'ready',
  },
]

function NotificationIcon({ type }) {
  if (type === 'clipboard') {
    return <FaClipboardList aria-hidden="true" />
  }

  if (type === 'ready') {
    return <FaCheck aria-hidden="true" />
  }

  return <FaPaperPlane aria-hidden="true" />
}

function LoggedInNavbar({ currentPage = '', notifications = DEFAULT_NOTIFICATIONS, points = 0 }) {
  const [activeNav, setActiveNav] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [openActionMenu, setOpenActionMenu] = useState(null)
  const ordersMenuRef = useRef(null)
  const profileMenuRef = useRef(null)
  const resolved = activeNav ?? currentPage
  const isFoundersClub = resolved === 'founders-club'

  useEffect(() => {
    if (!openActionMenu) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (ordersMenuRef.current?.contains(event.target)) {
        return
      }
      if (profileMenuRef.current?.contains(event.target)) {
        return
      }
      setOpenActionMenu(null)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [openActionMenu])

  const closeMenus = () => {
    setOpenDropdown(null)
    setNotificationOpen(false)
    setOpenActionMenu(null)
  }

  const toggleActionMenu = (menu) => {
    setOpenActionMenu((current) => {
      const next = current === menu ? null : menu
      if (next) {
        setOpenDropdown(null)
        setNotificationOpen(false)
      }
      return next
    })
  }

  const handleNavClick = (event, item) => {
    event.preventDefault()
    setActiveNav(item.key)
    closeMenus()

    if (item.page) {
      navigateToPage(item.page)
      return
    }

    if (item.hash) {
      window.location.hash = item.hash
    }
  }

  const handleDropdownItem = (event, key, page) => {
    event.preventDefault()
    setActiveNav(key)
    closeMenus()
    navigateToPage(page)
  }

  const handleActionItem = (event, page) => {
    event.preventDefault()
    event.stopPropagation()
    closeMenus()
    navigateToPage(page)
  }

  const handleLogout = () => {
    closeMenus()
    signOut()
    navigateToPage('auth')
  }

  return (
    <header className="lin-navbar">
      <a
        className={isFoundersClub ? 'lin-brand lin-brand-founders' : 'lin-brand'}
        href="?page=home"
        onClick={(event) => {
          event.preventDefault()
          navigateToPage('home')
        }}
        aria-label="Go to homepage"
      >
        {isFoundersClub ? (
          <img src={foundersLogo} alt="The Founders Club" />
        ) : (
          <>
            <img src={logoCircleImg} alt="" />
            <span>SORBETES</span>
          </>
        )}
      </a>

      <nav className="lin-nav" aria-label="Primary">
        {NAV_ITEMS.map((item) =>
          item.dropdown ? (
            <div
              key={item.key}
              className={openDropdown === item.key ? 'lin-dropdown lin-dropdown-open' : 'lin-dropdown'}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={resolved === item.key ? 'lin-nav-link lin-nav-link-active' : 'lin-nav-link'}
                aria-expanded={openDropdown === item.key}
                aria-haspopup="menu"
                onMouseEnter={() => setOpenDropdown(item.key)}
                onClick={() => setOpenDropdown((current) => (current === item.key ? null : item.key))}
              >
                {item.label}
                <span className="lin-caret" aria-hidden="true" />
              </button>
              <div className="lin-dropdown-menu" role="menu">
                {item.dropdown.map((dropdownItem) => (
                  <a
                    key={dropdownItem.page}
                    className="lin-dropdown-item"
                    href={`?page=${dropdownItem.page}`}
                    role="menuitem"
                    onClick={(event) => handleDropdownItem(event, item.key, dropdownItem.page)}
                  >
                    {dropdownItem.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={item.key}
              className={resolved === item.key ? 'lin-nav-link lin-nav-link-active' : 'lin-nav-link'}
              href={item.page ? `?page=${item.page}` : item.hash}
              onClick={(event) => handleNavClick(event, item)}
            >
              {item.label}
            </a>
          ),
        )}
      </nav>

      <div className="lin-actions" aria-label="Account actions">
        <div
          ref={ordersMenuRef}
          className={
            openActionMenu === 'orders'
              ? 'lin-action-dropdown lin-action-dropdown-orders lin-action-dropdown-open'
              : 'lin-action-dropdown lin-action-dropdown-orders'
          }
        >
          <button
            type="button"
            className="lin-action-btn lin-cart-btn"
            aria-label="Orders menu"
            aria-expanded={openActionMenu === 'orders'}
            aria-haspopup="menu"
            onClick={() => toggleActionMenu('orders')}
          >
            <FaBoxOpen aria-hidden="true" />
            <span className="lin-mini-chevron" aria-hidden="true" />
          </button>
          <div
            className="lin-action-menu"
            role="menu"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="lin-action-menu-item"
              role="menuitem"
              onClick={(event) => handleActionItem(event, 'my-orders')}
            >
              <FaShoppingCart className="lin-action-menu-icon" aria-hidden="true" />
              My Orders
            </button>
            <button
              type="button"
              className="lin-action-menu-item"
              role="menuitem"
              onClick={(event) => handleActionItem(event, 'track-order')}
            >
              <FaTruck className="lin-action-menu-icon" aria-hidden="true" />
              Track my Order
            </button>
          </div>
        </div>
        <button
          type="button"
          className="lin-action-btn lin-bell-btn"
          aria-label="Notifications"
          aria-expanded={notificationOpen}
          onClick={() => {
            setNotificationOpen((current) => !current)
            setOpenActionMenu(null)
            setOpenDropdown(null)
          }}
        >
          <FaBell aria-hidden="true" />
          {notifications.length ? <span className="lin-notification-dot" aria-hidden="true" /> : null}
        </button>
        {notificationOpen ? (
          <section className="lin-notification-panel" aria-label="Notifications panel">
            <div className="lin-notification-header">
              <h2>Notification</h2>
              <div className="lin-notification-tabs" aria-label="Notification filters">
                <button type="button" className="lin-notification-tab lin-notification-tab-active">
                  All
                </button>
                <button type="button" className="lin-notification-tab">
                  Unread
                </button>
              </div>
            </div>
            <div className="lin-notification-divider" />
            {notifications.length ? (
              <div className="lin-notification-list">
                {notifications.map((notification) => (
                  <article className="lin-notification-item" key={notification.id}>
                    <div
                      className={
                        notification.icon === 'ready'
                          ? 'lin-notification-icon lin-notification-icon-ready'
                          : 'lin-notification-icon'
                      }
                    >
                      <NotificationIcon type={notification.icon} />
                    </div>
                    <div className="lin-notification-copy">
                      <h3>
                        {notification.title}
                        <span>{notification.time}</span>
                      </h3>
                      <p>{notification.message}</p>
                    </div>
                    <span className="lin-notification-unread-dot" aria-hidden="true" />
                  </article>
                ))}
              </div>
            ) : (
              <p className="lin-notification-empty">You don&apos;t have any notifs.</p>
            )}
          </section>
        ) : null}
        <div
          ref={profileMenuRef}
          className={
            openActionMenu === 'profile'
              ? 'lin-action-dropdown lin-action-dropdown-profile lin-action-dropdown-open'
              : 'lin-action-dropdown lin-action-dropdown-profile'
          }
        >
          <button
            type="button"
            className="lin-action-btn lin-user-btn"
            aria-label="Account menu"
            aria-expanded={openActionMenu === 'profile'}
            aria-haspopup="menu"
            onClick={() => toggleActionMenu('profile')}
          >
            <span className="lin-user-avatar">
              <FaUser aria-hidden="true" />
            </span>
            <span className="lin-mini-chevron" aria-hidden="true" />
          </button>
          <div
            className="lin-action-menu"
            role="menu"
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="lin-action-menu-item lin-action-menu-points" role="menuitem">
              <img className="lin-points-logo" src={logoCircleImg} alt="" />
              <span className="lin-points-label">{points} Points</span>
              <button type="button" className="lin-points-help" aria-label="About points">
                <FaCircleQuestion aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              className="lin-action-menu-item"
              role="menuitem"
              onClick={(event) => handleActionItem(event, 'account-settings')}
            >
              <FaUserGear className="lin-action-menu-icon" aria-hidden="true" />
              Profile
            </button>
            <button type="button" className="lin-action-menu-item" role="menuitem" onClick={handleLogout}>
              <FaRightFromBracket className="lin-action-menu-icon" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default LoggedInNavbar
