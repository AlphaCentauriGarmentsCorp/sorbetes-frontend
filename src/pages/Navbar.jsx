import { useState } from 'react'
import { createPortal } from 'react-dom'
import '../design/Navbar.css'

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
  { key: 'founders-club', label: "Founder's Club", hash: '#founders-club' },
  { key: 'reviews', label: 'Reviews', hash: '#reviews' },
  { key: 'get-in-touch', label: 'Get in Touch', hash: '#get-in-touch' },
]

function Navbar({ logoSrc, brand = 'SORBETES', currentPage = '' }) {
  const [activeNav, setActiveNav] = useState(null)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)

  const resolved = activeNav ?? currentPage

  const navigate = (path) => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new Event('cursor:navigate'))
  }

  const handleNavClick = (e, key, page, hash) => {
    e.preventDefault()
    setActiveNav(key)
    setOpenDropdown(null)
    setMobileOpen(false)
    setMobileDropdown(null)
    if (page) navigate(`?page=${page}`)
    else if (hash) window.location.hash = hash
  }

  const handleDropdownItem = (e, key, page) => {
    e.preventDefault()
    setActiveNav(key)
    setOpenDropdown(null)
    setMobileOpen(false)
    setMobileDropdown(null)
    navigate(`?page=${page}`)
  }

  const navbar = (
    <header className="nb-header">
      <a className="nb-brand" href="?page=home" onClick={(e) => handleNavClick(e, 'home', 'home')} aria-label="Go to homepage">
        <img className="nb-logo" src={logoSrc} alt="" />
        <span className="nb-brand-name">{brand}</span>
      </a>

      <nav className="nb-nav" aria-label="Primary">
        {NAV_ITEMS.map(({ key, label, page, hash, dropdown }) =>
          dropdown ? (
            <div
              key={key}
              className={`nb-dropdown${openDropdown === key ? ' nb-dropdown-open' : ''}`}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                type="button"
                className={`nb-link nb-link-btn${resolved === key ? ' nb-link-active' : ''}`}
                aria-expanded={openDropdown === key}
                aria-haspopup="menu"
                onMouseEnter={() => setOpenDropdown(key)}
                onClick={() => setOpenDropdown(p => p === key ? null : key)}
              >
                {label} <span className="nb-caret" aria-hidden="true" />
              </button>
              <div className="nb-dropdown-menu" role="menu">
                {dropdown.map((item) => (
                  <a
                    key={item.page}
                    className="nb-dropdown-item"
                    href={`?page=${item.page}`}
                    role="menuitem"
                    onClick={(e) => handleDropdownItem(e, key, item.page)}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <a
              key={key}
              className={`nb-link${resolved === key ? ' nb-link-active' : ''}`}
              href={page ? `?page=${page}` : hash}
              onClick={(e) => handleNavClick(e, key, page, hash)}
            >
              {label}
            </a>
          )
        )}
      </nav>

      <div className="nb-actions">
        <button type="button" className="nb-btn nb-btn-dark" onClick={() => { setMobileOpen(false); navigate('?page=auth') }}>
          Log in
        </button>
        <button type="button" className="nb-btn nb-btn-outline"  onClick={() => { setMobileOpen(false); navigate('?page=pricing') }} >
          Pricing
        </button>
      </div>

      <button
        type="button"
        className={`nb-hamburger${mobileOpen ? ' nb-hamburger-open' : ''}`}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen(p => !p)}
      >
        <span /><span /><span />
      </button>

      {mobileOpen && (
        <div className="nb-mobile-menu" role="dialog" aria-label="Mobile navigation">
          {NAV_ITEMS.map(({ key, label, page, hash, dropdown }) =>
            dropdown ? (
              <div key={key} className="nb-mobile-group">
                <button
                  type="button"
                  className={`nb-mobile-link nb-mobile-link-btn${mobileDropdown === key ? ' nb-mobile-link-expanded' : ''}`}
                  onClick={() => setMobileDropdown(p => p === key ? null : key)}
                >
                  {label} <span className="nb-caret" aria-hidden="true" />
                </button>
                {mobileDropdown === key && (
                  <div className="nb-mobile-submenu">
                    {dropdown.map((item) => (
                      <a
                        key={item.page}
                        className="nb-mobile-sublink"
                        href={`?page=${item.page}`}
                        onClick={(e) => handleDropdownItem(e, key, item.page)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={key}
                className={`nb-mobile-link${resolved === key ? ' nb-mobile-link-active' : ''}`}
                href={page ? `?page=${page}` : hash}
                onClick={(e) => handleNavClick(e, key, page, hash)}
              >
                {label}
              </a>
            )
          )}
          <div className="nb-mobile-actions">
            <button type="button" className="nb-btn nb-btn-dark" onClick={() => { setMobileOpen(false); navigate('?page=auth') }}>Log in</button>
            <button type="button" className="nb-btn nb-btn-outline"  onClick={() => { setMobileOpen(false); navigate('?page=pricing') }} >Pricing</button>
          </div>
        </div>
      )}
    </header>
  )

  if (typeof document === 'undefined') return navbar
  return createPortal(navbar, document.body)
}

export default Navbar