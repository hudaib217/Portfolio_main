import { useState, useEffect, useCallback } from 'react'
import { FaChevronLeft, FaChevronRight, FaCertificate } from 'react-icons/fa'
import { HiX } from 'react-icons/hi'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { certificates } from '../../data/certificates'
import styles from './Certificates.module.css'

function Certificates() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [selectedCert, setSelectedCert] = useState(null)
  const [brokenImages, setBrokenImages] = useState({})
  const revealRef = useScrollReveal()

  const goPrev = () =>
    setActiveIndex((prev) =>
      prev <= 0 ? certificates.length - 1 : prev - 1
    )
  const goNext = () =>
    setActiveIndex((prev) => (prev + 1) % certificates.length)
  const goTo = (index) => setActiveIndex(index)

  const openModal = (cert) => {
    setSelectedCert(cert)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = useCallback(() => {
    setSelectedCert(null)
    document.body.style.overflow = ''
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal()
    }
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCert, closeModal])

  const handleImageError = (id) => {
    setBrokenImages((prev) => ({ ...prev, [id]: true }))
  }

  const renderCertImage = (cert, className) => {
    if (brokenImages[cert.id]) {
      return (
        <div className={styles.placeholder}>
          <FaCertificate size={42} />
          <span className={styles.placeholderTitle}>{cert.title}</span>
          <span className={styles.placeholderIssuer}>{cert.issuer}</span>
        </div>
      )
    }
    return (
      <img
        src={cert.image}
        alt={cert.title}
        className={className}
        loading="lazy"
        onError={() => handleImageError(cert.id)}
      />
    )
  }

  return (
    <section id="certificates" className={`section ${styles.certificates}`}>
      <div className="container" ref={revealRef}>
        <h2 className="section__title scroll-reveal">Certificates</h2>
        <p className="section__subtitle scroll-reveal">
          Professional certifications and credentials I've earned.
        </p>

        <div className={styles.carousel}>
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={goPrev}
            aria-label="Previous certificate"
          >
            <FaChevronLeft size={18} />
          </button>

          <div className={styles.track}>
            <div
              className={styles.slides}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {certificates.map((cert) => (
                <div key={cert.id} className={styles.slide}>
                  <div
                    className={styles.imageFrame}
                    onClick={() => openModal(cert)}
                  >
                    {renderCertImage(cert, styles.image)}
                    <div className={styles.imageOverlay}>
                      <span className={styles.viewText}>Click to view</span>
                    </div>
                  </div>
                  <h3 className={styles.title}>{cert.title}</h3>
                  <p className={styles.issuer}>
                    {cert.issuer} &middot; {cert.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={goNext}
            aria-label="Next certificate"
          >
            <FaChevronRight size={18} />
          </button>
        </div>

        <div className={styles.dots}>
          {certificates.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === activeIndex ? styles.dotActive : ''
              }`}
              onClick={() => goTo(index)}
              aria-label={`Go to certificate ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {selectedCert && (
        <div className={styles.modal} onClick={closeModal}>
          <button
            className={styles.closeBtn}
            onClick={closeModal}
            aria-label="Close"
          >
            <HiX size={24} />
          </button>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {!brokenImages[selectedCert.id] ? (
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className={styles.modalImage}
              />
            ) : (
              <div className={styles.modalPlaceholder}>
                <FaCertificate size={64} />
                <h3>{selectedCert.title}</h3>
                <p>{selectedCert.issuer}</p>
                <span>{selectedCert.date}</span>
              </div>
            )}
            <div className={styles.modalInfo}>
              <h3>{selectedCert.title}</h3>
              <p>
                {selectedCert.issuer} &middot; {selectedCert.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Certificates
