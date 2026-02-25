import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './About.module.css'

const skills = [
  'React', 'Next.js', 'JavaScript', 'TypeScript',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
  'React Native', 'HTML/CSS', 'Tailwind CSS', 'Git',
]

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '25+', label: 'Projects Completed' },
  { value: '15+', label: 'Happy Clients' },
  { value: '10+', label: 'Technologies' },
]

function About() {
  const revealRef = useScrollReveal()

  return (
    <section id="about" className={`section ${styles.about}`}>
      <div className="container" ref={revealRef}>
        <h2 className="section__title scroll-reveal">About Me</h2>
        <p className={`section__subtitle scroll-reveal ${styles.subtitle}`}>
          Get to know more about me and what I do.
        </p>

        <div className={styles.content}>
          <h3 className={styles.heading}>
            A passionate developer building digital experiences
          </h3>

          <div className={styles.bioGroup}>
            <p className={styles.bio}>
              I'm Muhammad Hudaib, a full-stack developer with a passion for creating
              beautiful and functional web applications. With expertise in modern
              JavaScript frameworks and a keen eye for design, I bring ideas to life
              through clean code and intuitive interfaces.
            </p>
            <p className={styles.bio}>
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with the
              developer community. I believe in continuous learning and pushing
              the boundaries of what's possible on the web.
            </p>
          </div>

          <div className={styles.skills}>
            {skills.map((skill) => (
              <span key={skill} className={styles.skill}>
                {skill}
              </span>
            ))}
          </div>

          <div className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
