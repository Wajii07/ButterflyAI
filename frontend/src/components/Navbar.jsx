import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, FlaskConical } from 'lucide-react'

const NAV_LINKS = [
  { to: '/',           label: 'Home',           end: true },
  { to: '/identify',   label: 'Identify',        end: false },
  { to: '/species',    label: 'Species Explorer', end: false },
  { to: '/model-lab',  label: 'AI Model Lab',    end: false },
  { to: '/about',      label: 'About',           end: false },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="navbar"
      style={{ background: scrolled ? 'rgba(2,13,7,0.97)' : 'rgba(2,13,7,0.78)' }}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5" aria-label="ButterflyAI home">
          <ButterflyLogo />
          <span className="font-display font-bold text-xl tracking-tight text-emerald-400">
            Butterfly<span className="text-teal-400">AI</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-0.5" role="list">
          {NAV_LINKS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'text-emerald-300/65 hover:text-emerald-300 hover:bg-emerald-500/8'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <NavLink
          to="/identify"
          id="nav-cta-identify"
          className="btn-primary hidden md:flex text-sm py-2 px-5"
        >
          <FlaskConical size={15} />
          Identify Now
        </NavLink>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-emerald-400 p-2 rounded-lg hover:bg-emerald-500/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          id="mobile-menu-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div
          className="md:hidden border-t border-emerald-500/10 px-5 pt-4 pb-5 flex flex-col gap-1"
          style={{ background: 'rgba(2,13,7,0.97)' }}
        >
          {NAV_LINKS.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-400'
                    : 'text-emerald-300/65 hover:text-emerald-300 hover:bg-emerald-500/8'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/identify"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 justify-center"
          >
            Identify Now
          </NavLink>
        </div>
      )}
    </nav>
  )
}

function ButterflyLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="nav-wing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399"/>
          <stop offset="100%" stopColor="#0d9488"/>
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="38" rx="22" ry="16" fill="url(#nav-wing)" opacity="0.9" transform="rotate(-20 30 38)"/>
      <ellipse cx="28" cy="62" rx="16" ry="11" fill="url(#nav-wing)" opacity="0.7" transform="rotate(15 28 62)"/>
      <ellipse cx="70" cy="38" rx="22" ry="16" fill="url(#nav-wing)" opacity="0.9" transform="rotate(20 70 38)"/>
      <ellipse cx="72" cy="62" rx="16" ry="11" fill="url(#nav-wing)" opacity="0.7" transform="rotate(-15 72 62)"/>
      <ellipse cx="50" cy="50" rx="4" ry="22" fill="#064e3b"/>
      <line x1="50" y1="28" x2="40" y2="16" stroke="#34d399" strokeWidth="2" strokeLinecap="round"/>
      <line x1="50" y1="28" x2="60" y2="16" stroke="#34d399" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="40" cy="15" r="2.5" fill="#6ee7b7"/>
      <circle cx="60" cy="15" r="2.5" fill="#6ee7b7"/>
    </svg>
  )
}
