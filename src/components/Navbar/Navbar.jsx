import { useState, useEffect } from 'react'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import styles from './Navbar.module.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'About', href: '#about' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = document.querySelectorAll('main section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-50% 0px -50% 0px' }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`${styles.navContainer} container`}>
        <a href="#home" className={styles.logo}>
          Hudaib<span>.</span>
        </a>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`${styles.navLink} ${
                  activeSection === link.href.slice(1) ? styles.active : ''
                }`}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}
    </nav>
  )
}

export default Navbar
