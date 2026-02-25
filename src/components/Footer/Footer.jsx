import { FaArrowUp } from 'react-icons/fa'
import { socialLinks } from '../../data/socialLinks'
import styles from './Footer.module.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.content}`}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#home" className={styles.logo}>
              Hudaib<span>.</span>
            </a>
            <p className={styles.brandText}>
              Building digital experiences that make a difference.
            </p>
          </div>

          <div className={styles.links}>
            <h4 className={styles.linksTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.social}>
            <h4 className={styles.linksTitle}>Connect</h4>
            <div className={styles.socialIcons}>
              {socialLinks.map((s) => (
                <a
                  key={s.id}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialIcon}
                  aria-label={s.platform}
                >
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Muhammad Hudaib. All rights reserved.
          </p>
          <a href="#home" className={styles.backToTop} aria-label="Back to top">
            <FaArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
