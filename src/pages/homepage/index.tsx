
import { NavigationBar } from '@/components/navbar'
import { HeroSection } from './heroSection/HeroSection'
import { OurServices } from './ourServices'
import { NavBarLink } from '@/types'

export const HomePage = () => {

  const navLinks:NavBarLink[] = [
    {
      linkName:"Home",
      linkUrl:"",
    },
    {
      linkName:"Services",
      linkUrl:"",
    },
    {
      linkName:"Equipment Rentals",
      linkUrl:"",
    },
    {
      linkName:"About Us",
      linkUrl:"",
    },
    {
      linkName:"Contact Us",
      linkUrl:"",
    }
  ]

  return (
    <>
      <section>
        <NavigationBar
          navLinks={navLinks}
        />
        <HeroSection />
      </section>
      <section>
        <OurServices />
      </section>
    </>
  )
}
