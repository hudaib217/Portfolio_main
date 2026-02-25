import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import styles from './Contact.module.css'

const contactInfo = [
  { icon: FaEnvelope, label: 'Email', value: 'hudaib@example.com' },
  { icon: FaMapMarkerAlt, label: 'Location', value: 'Your City, Country' },
  { icon: FaPhone, label: 'Phone', value: '+1 234 567 890' },
]

function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('idle')
  const revealRef = useScrollReveal()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container" ref={revealRef}>
        <h2 className="section__title scroll-reveal">Get In Touch</h2>
        <p className="section__subtitle scroll-reveal">
          Have a project in mind or just want to say hi? I'd love to hear from you.
        </p>

        <div className={styles.content}>
          <div className={styles.infoCol}>
            <h3 className={styles.infoHeading}>Let's talk about your project</h3>
            <p className={styles.infoText}>
              I'm always interested in hearing about new projects and opportunities.
              Feel free to reach out through the form or contact me directly.
            </p>

            <div className={styles.infoItems}>
              {contactInfo.map((item) => (
                <div key={item.label} className={styles.infoItem}>
                  <div className={styles.infoIcon}>
                    <item.icon size={18} />
                  </div>
                  <div>
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={form.subject}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            <div className={styles.formGroup}>
              <textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className={styles.textarea}
              />
            </div>

            <button
              type="submit"
              className={`${styles.submitBtn} ${status === 'sending' ? styles.sending : ''}`}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className={`${styles.statusMsg} ${styles.success}`}>
                Message sent successfully! I'll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p className={`${styles.statusMsg} ${styles.error}`}>
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
