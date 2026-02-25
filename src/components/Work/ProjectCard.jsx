import { FaPlay } from 'react-icons/fa'
import styles from './ProjectCard.module.css'

function ProjectCard({ project, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrapper}>
        <img
          src={project.thumbnail}
          alt={project.title}
          className={styles.image}
          loading="lazy"
        />
        {project.video && (
          <div className={styles.playBtn}>
            <FaPlay size={16} />
          </div>
        )}
      </div>
      <div className={styles.overlay}>
        <div className={styles.tags}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.desc}>{project.shortDesc}</p>
      </div>
    </div>
  )
}

export default ProjectCard
