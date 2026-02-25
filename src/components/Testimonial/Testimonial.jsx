import { useState, useEffect, useRef } from 'react'
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { testimonials } from '../../data/testimonials'
import styles from './Testimonial.module.css'

function Testimonial() {
  const [activeIndex, setActiveIndex] = useState(0)
  const isPaused = useRef(false)
  const revealRef = useScrollReveal()

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused.current) {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (index) => setActiveIndex(index)
  const goPrev = () =>
    setActiveIndex((prev) =>
      prev <= 0 ? testimonials.length - 1 : prev - 1
    )
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % testimonials.length)

  return (
    <section id="testimonials" className={`section ${styles.testimonials}`}>
      <div className="container" ref={revealRef}>
        <h2 className="section__title scroll-reveal">Testimonials</h2>
        <p className="section__subtitle scroll-reveal">
          What my clients and colleagues say about working with me.
        </p>

        <div
          className={styles.carousel}
          onMouseEnter={() => (isPaused.current = true)}
          onMouseLeave={() => (isPaused.current = false)}
        >
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <FaChevronLeft size={18} />
          </button>

          <div className={styles.track}>
            <div
              className={styles.slides}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className={styles.slide}>
                  <FaQuoteLeft className={styles.quoteIcon} size={32} />
                  <p className={styles.quote}>{t.quote}</p>
                  <div className={styles.client}>
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className={styles.avatar}
                    />
                    <div>
                      <h4 className={styles.clientName}>{t.name}</h4>
                      <p className={styles.clientRole}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <FaChevronRight size={18} />
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === activeIndex ? styles.dotActive : ''
              }`}
              onClick={() => goTo(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
