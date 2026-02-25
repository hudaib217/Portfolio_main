import { useScrollReveal } from '../../hooks/useScrollReveal'
import { services } from '../../data/services'
import styles from './Services.module.css'

function Services() {
  const revealRef = useScrollReveal()

  return (
    <section id="services" className={`section ${styles.services}`}>
      <div className="container" ref={revealRef}>
        <h2 className="section__title scroll-reveal">My Services</h2>
        <p className="section__subtitle scroll-reveal">
          I offer a range of services to help bring your digital vision to life.
        </p>

        <div className={styles.grid}>
          {services.map((service) => (
            <div key={service.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <service.icon size={28} />
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
