import { HeroSection } from './heroSection/HeroSection'
import { OurServices } from './ourServices'
import { RentSection } from './rentSection'

export const HomePage = () => {

  return (
    <>
      <section>
        <HeroSection />
      </section>

      <section className='mt-10'>
        <OurServices />
      </section>

      <section className='mt-10'>
        <RentSection />
      </section>
    </>
  )
}
