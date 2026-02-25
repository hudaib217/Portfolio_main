import { useState, useEffect } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import styles from './Hero.module.css'

const roles = ['Full Stack Developer', 'UI/UX Designer', 'Mobile Developer', 'Problem Solver']

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentRole = roles[roleIndex]
    let timeout

    if (!isDeleting && text === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentRole.substring(0, text.length - 1)
              : currentRole.substring(0, text.length + 1)
          )
        },
        isDeleting ? 40 : 80
      )
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, roleIndex])

  return (
    <section id="home" className={styles.hero}>
      <div className={`${styles.content} container`}>
        <p className={styles.greeting}>Hello, I'm</p>
        <h1 className={styles.name}>Muhammad Hudaib</h1>
        <div className={styles.roleWrapper}>
          <span className={styles.role}>
            {text}
            <span className={styles.cursor}>|</span>
          </span>
        </div>
        <p className={styles.tagline}>
          I craft beautiful, performant digital experiences that bring ideas to life.
          Passionate about clean code and intuitive design.
        </p>
        <div className={styles.ctas}>
          <a href="#work" className={styles.ctaPrimary}>
            View My Work
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Get In Touch
          </a>
        </div>
      </div>
      <a href="#work" className={styles.scrollDown} aria-label="Scroll down">
        <FaArrowDown />
      </a>
    </section>
  )
}

export default Hero
