import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  FaBell,
  FaBoxOpen,
  FaCheck,
  FaClipboardList,
  FaMoon,
  FaPaperPlane,
  FaShoppingCart,
  FaSun,
  FaTruck,
  FaUser,
} from 'react-icons/fa'
import { FaCircleQuestion, FaRightFromBracket, FaUserGear } from 'react-icons/fa6'
import '../design/LoggedInNavbar.css'
import logoCircleImg from '../assets/Logo_Sorbetes-removebg-preview.png'
import foundersLogo from '../assets/Founders-logo.png'
import { getCurrentUser, signOut } from '../utils/auth.js'
import { navigateToPage } from '../utils/navigation.js'
import { applyDarkMode, getInitialDarkMode, persistDarkMode } from '../utils/theme.js'

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const [darkMode, setDarkMode] = useState(getInitialDarkMode)
  const [avatarUrl, setAvatarUrl] = useState(() => getCurrentUser()?.avatarUrl || '')
  const ordersMenuRef = useRef(null)
  const profileMenuRef = useRef(null)
  const resolved = activeNav ?? currentPage
  const isFoundersClub = resolved === 'founders-club'

  useEffect(() => {
    applyDarkMode(darkMode)
    persistDarkMode(darkMode)
  }, [darkMode])

  useEffect(() => {
    const syncAvatar = () => {
      setAvatarUrl(getCurrentUser()?.avatarUrl || '')
    }

    syncAvatar()
    window.addEventListener('cursor:auth-change', syncAvatar)
    return () => window.removeEventListener('cursor:auth-change', syncAvatar)
  }, [])

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
    setMobileOpen(false)
    setMobileDropdown(null)
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
      window.history.pushState({}, '', item.hash)
      window.dispatchEvent(new Event('cursor:navigate'))
    }
  }

  const handleDropdownItem = (event, key, page) => {
    event.preventDefault()
    setActiveNav(key)
    closeMenus()
    navigateToPage(page)
  }

  const handleMobileNotifications = () => {
    setNotificationOpen((current) => !current)
    setOpenActionMenu(null)
    setOpenDropdown(null)
    setMobileOpen(false)
    setMobileDropdown(null)
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

  const handleDarkModeToggle = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDarkMode((current) => !current)
  }

  const navbar = (
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
              {avatarUrl ? (
                <img src={avatarUrl} alt="" />
              ) : (
                <FaUser aria-hidden="true" />
              )}
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
              <button
                type="button"
                className="lin-points-help"
                aria-label="About points"
                aria-describedby="lin-points-tooltip"
              >
                <FaCircleQuestion aria-hidden="true" />
              </button>
              <span id="lin-points-tooltip" className="lin-points-tooltip" role="tooltip">
                Earn <strong>Sorbetes Referral Points</strong> by inviting others — redeem them for free production on
                your next order.
              </span>
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
            <button
              type="button"
              className="lin-action-menu-item lin-theme-toggle"
              role="menuitem"
              aria-pressed={darkMode}
              onClick={handleDarkModeToggle}
            >
              {darkMode ? (
                <FaSun className="lin-action-menu-icon" aria-hidden="true" />
              ) : (
                <FaMoon className="lin-action-menu-icon" aria-hidden="true" />
              )}
              <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              <span className="lin-theme-switch" aria-hidden="true">
                <span className="lin-theme-switch-thumb" />
              </span>
            </button>
            <button type="button" className="lin-action-menu-item" role="menuitem" onClick={handleLogout}>
              <FaRightFromBracket className="lin-action-menu-icon" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <button
        type="button"
        className={`lin-hamburger${mobileOpen ? ' lin-hamburger-open' : ''}`}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => {
          setMobileOpen((current) => !current)
          setOpenDropdown(null)
          setOpenActionMenu(null)
          setNotificationOpen(false)
        }}
      >
        <span />
        <span />
        <span />
      </button>

      {mobileOpen ? (
        <div className="lin-mobile-menu" role="dialog" aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) =>
            item.dropdown ? (
              <div key={item.key} className="lin-mobile-group">
                <button
                  type="button"
                  className={`lin-mobile-link lin-mobile-link-btn${mobileDropdown === item.key ? ' lin-mobile-link-expanded' : ''}`}
                  onClick={() => setMobileDropdown((current) => (current === item.key ? null : item.key))}
                >
                  {item.label} <span className="lin-caret" aria-hidden="true" />
                </button>
                {mobileDropdown === item.key ? (
                  <div className="lin-mobile-submenu">
                    {item.dropdown.map((dropdownItem) => (
                      <a
                        key={dropdownItem.page}
                        className="lin-mobile-sublink"
                        href={`?page=${dropdownItem.page}`}
                        onClick={(event) => handleDropdownItem(event, item.key, dropdownItem.page)}
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <a
                key={item.key}
                className={`lin-mobile-link${resolved === item.key ? ' lin-mobile-link-active' : ''}`}
                href={item.page ? `?page=${item.page}` : item.hash}
                onClick={(event) => handleNavClick(event, item)}
              >
                {item.label}
              </a>
            ),
          )}

          <div className="lin-mobile-account">
            <span className="lin-mobile-account-label">Account</span>
            <button type="button" className="lin-mobile-link lin-mobile-link-btn" onClick={(event) => handleActionItem(event, 'my-orders')}>
              <FaShoppingCart aria-hidden="true" />
              My Orders
            </button>
            <button type="button" className="lin-mobile-link lin-mobile-link-btn" onClick={(event) => handleActionItem(event, 'track-order')}>
              <FaTruck aria-hidden="true" />
              Track my Order
            </button>
            <button type="button" className="lin-mobile-link lin-mobile-link-btn" onClick={handleMobileNotifications}>
              <FaBell aria-hidden="true" />
              Notifications
              {notifications.length ? <span className="lin-mobile-notification-badge" aria-hidden="true" /> : null}
            </button>
            <button type="button" className="lin-mobile-link lin-mobile-link-btn" onClick={(event) => handleActionItem(event, 'account-settings')}>
              <FaUserGear aria-hidden="true" />
              Profile
            </button>
            <button
              type="button"
              className="lin-mobile-link lin-mobile-link-btn lin-mobile-theme-toggle"
              aria-pressed={darkMode}
              onClick={(event) => {
                event.stopPropagation()
                handleDarkModeToggle(event)
              }}
            >
              {darkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
              <span className="lin-theme-switch" aria-hidden="true">
                <span className="lin-theme-switch-thumb" />
              </span>
            </button>
            <button type="button" className="lin-mobile-link lin-mobile-link-btn lin-mobile-logout" onClick={handleLogout}>
              <FaRightFromBracket aria-hidden="true" />
              Logout
            </button>
          </div>

          <div className="lin-mobile-points">
            <img className="lin-points-logo" src={logoCircleImg} alt="" />
            <span>{points} Points</span>
          </div>
        </div>
      ) : null}
    </header>
  )

  if (typeof document === 'undefined') {
    return navbar
  }

  return createPortal(navbar, document.body)
}

export default LoggedInNavbar
