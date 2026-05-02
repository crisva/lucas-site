import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import WhyMe from '@/components/WhyMe'
import Testimonials from '@/components/Testimonials'
import Numbers from '@/components/Numbers'
import CTABand from '@/components/CTABand'
import Contenido from '@/components/Contenido'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Services />
      <WhyMe />
      <Testimonials />
      <Numbers />
      <CTABand />
      <Contenido />
      <Newsletter />
      <Footer />
    </>
  )
}