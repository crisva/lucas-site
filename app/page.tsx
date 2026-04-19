import Nav          from '@/components/Nav'
import Hero         from '@/components/Hero'
import About        from '@/components/About'
import Services     from '@/components/Services'
import WhyMe        from '@/components/WhyMe'
import Testimonials from '@/components/Testimonials'
import Numbers      from '@/components/Numbers'
import CTABand      from '@/components/CTABand'
import Podcast      from '@/components/Podcast'
import Appearances  from '@/components/Appearances'
import Blog         from '@/components/Blog'
import Newsletter   from '@/components/Newsletter'
import Footer       from '@/components/Footer'

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
      <Podcast />
      <Appearances />
      <Blog />
      <Newsletter />
      <Footer />
    </>
  )
}
