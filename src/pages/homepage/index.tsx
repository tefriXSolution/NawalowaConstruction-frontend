
import { NavigationBar } from '@/components/navbar'
import { HeroSection } from './heroSection/HeroSection'
import { OurServices } from './ourServices'

export const HomePage = () => {
  return (
    <>
      <section>
        <NavigationBar />
        <HeroSection />
      </section>
      <section>
        <OurServices />
      </section>
    </>
  )
}
