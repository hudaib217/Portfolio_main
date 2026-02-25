import { useState, useEffect, useRef } from 'react'
import {
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaPlay,
} from 'react-icons/fa'
import styles from './ProjectModal.module.css'

function ProjectModal({ project, onClose, onNavigate }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const videoRef = useRef(null)
  const modalRef = useRef(null)

  // Lock body scroll & listen for escape key
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate('prev')
      if (e.key === 'ArrowRight') onNavigate('next')
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, onNavigate])

  // Reset state when project changes
  useEffect(() => {
    setActiveImageIndex(0)
    setIsVideoPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [project])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const handlePlayVideo = () => {
    setIsVideoPlaying(true)
    setTimeout(() => {
      videoRef.current?.play()
    }, 0)
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      {/* Prev/Next project arrows */}
      <button
        className={`${styles.navArrow} ${styles.navPrev}`}
        onClick={() => onNavigate('prev')}
        aria-label="Previous project"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        className={`${styles.navArrow} ${styles.navNext}`}
        onClick={() => onNavigate('next')}
        aria-label="Next project"
      >
        <FaChevronRight size={20} />
      </button>

      <div className={styles.modal} ref={modalRef}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
          <FaTimes size={20} />
        </button>

        {/* Media Section */}
        <div className={styles.media}>
          {/* Video or Main Image */}
          {project.video && isVideoPlaying ? (
            <video
              ref={videoRef}
              src={project.video}
              className={styles.mainMedia}
              controls
              poster={project.thumbnail}
            />
          ) : (
            <div className={styles.mainImageWrapper}>
              <img
                src={project.images[activeImageIndex] || project.thumbnail}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className={styles.mainMedia}
              />
              {project.video && !isVideoPlaying && (
                <button className={styles.playOverlay} onClick={handlePlayVideo}>
                  <FaPlay size={24} />
                  <span>Play Video</span>
                </button>
              )}
            </div>
          )}

          {/* Thumbnail Strip */}
          {project.images.length > 1 && (
            <div className={styles.thumbStrip}>
              {project.images.map((img, index) => (
                <button
                  key={index}
                  className={`${styles.thumb} ${
                    index === activeImageIndex && !isVideoPlaying ? styles.thumbActive : ''
                  }`}
                  onClick={() => {
                    setActiveImageIndex(index)
                    setIsVideoPlaying(false)
                    if (videoRef.current) videoRef.current.pause()
                  }}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} />
                </button>
              ))}
              {project.video && (
                <button
                  className={`${styles.thumb} ${styles.videoThumb} ${
                    isVideoPlaying ? styles.thumbActive : ''
                  }`}
                  onClick={handlePlayVideo}
                >
                  <FaPlay size={12} />
                  <span>Video</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className={styles.info}>
          <h2 className={styles.title}>{project.title}</h2>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <p className={styles.description}>{project.description}</p>

          <div className={styles.actions}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionPrimary}
              >
                <FaExternalLinkAlt size={14} />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionSecondary}
              >
                <FaGithub size={16} />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal
