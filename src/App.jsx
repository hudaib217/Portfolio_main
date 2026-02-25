import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import Work from './components/Work/Work'
import Services from './components/Services/Services'
import Certificates from './components/Certificates/Certificates'
import About from './components/About/About'
import Testimonial from './components/Testimonial/Testimonial'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
        <Services />
        <Certificates />
        <About />
        <Testimonial />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
