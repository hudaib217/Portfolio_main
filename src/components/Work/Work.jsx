import { useState } from 'react'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { projects, categories } from '../../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import styles from './Work.module.css'

function Work() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const revealRef = useScrollReveal()

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  const handleOpenModal = (project) => {
    setSelectedProject(project)
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
  }

  const handleNavigate = (direction) => {
    if (!selectedProject) return
    const currentIndex = projects.findIndex((p) => p.id === selectedProject.id)
    let newIndex
    if (direction === 'prev') {
      newIndex = currentIndex <= 0 ? projects.length - 1 : currentIndex - 1
    } else {
      newIndex = currentIndex >= projects.length - 1 ? 0 : currentIndex + 1
    }
    setSelectedProject(projects[newIndex])
  }

  return (
    <section id="work" className="section">
      <div className="container" ref={revealRef}>
        <h2 className="section__title scroll-reveal">My Projects</h2>
        <p className="section__subtitle scroll-reveal">
          Here are some of my recent projects. Click on any project to see more details.
        </p>

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${
                activeFilter === cat ? styles.filterActive : ''
              }`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleOpenModal(project)}
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseModal}
          onNavigate={handleNavigate}
        />
      )}
    </section>
  )
}

export default Work
