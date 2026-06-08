import { Suspense } from 'react'
import Nav               from '@/components/Nav'
import Footer            from '@/components/Footer'
import ReservarHero      from '@/components/reservar/ReservarHero'
import ReservarQueEsperar from '@/components/reservar/ReservarQueEsperar'
import ReservarFAQ       from '@/components/reservar/ReservarFAQ'

export const metadata = {
  title: 'Reservar sesión — Lucas Patanó',
  description: 'Reservá tu mentoría 1:1 o sesión introductoria de Product Coaching con Lucas Patanó.',
}

export default function ReservarPage() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <ReservarHero />
      </Suspense>
      <ReservarQueEsperar />
      <ReservarFAQ />
      <Footer />
    </>
  )
}
