import { NavigationBar, Footer } from '@/components'
import { HeroSection } from './heroSection/HeroSection'
import { OurServices } from './ourServices'
import { NavBarLink, FooterLink } from '@/types'
import { RentSection } from './rentSection'

export const HomePage = () => {

  const navLinks:NavBarLink[] = [
    {
      linkName:"Home",
      linkUrl:"/",
    },
    {
      linkName:"Services",
      linkUrl:"/services",
    },
    {
      linkName:"Equipment Rentals",
      linkUrl:"/rentals",
    },
    {
      linkName:"About Us",
      linkUrl:"/about",
    },
    {
      linkName:"Contact Us",
      linkUrl:"/contactUs",
    }
  ]

  const footerLinks:FooterLink[]=[
    {
      linkName:"Home",
      linkUrl:""
    },
    {
      linkName:"Service",
      linkUrl:""
    },
    {
      linkName:"Equipment Rentals",
      linkUrl:""
    },
    {
      linkName:"About Us",
      linkUrl:""
    },
    {
      linkName:"Contact Us",
      linkUrl:""
    },
  ]

  return (
    <>
      <section>
        <NavigationBar
          navLinks={navLinks}
        />
        <HeroSection />
      </section>

      <section className='mt-10'>
        <OurServices />
      </section>

      <section className='mt-10'>
        <RentSection />
      </section>

      <section className='mt-10'>
        <Footer 
          footerLinks={footerLinks}
        />
      </section>
    </>
  )
}
