import { HeroSection } from './heroSection/HeroSection'
import { OurServices } from './ourServices'
import { RentSection } from './rentSection'
import {Helmet} from "react-helmet-async";

export const HomePage = () => {

  return (
    <div className='z-0'>
        <Helmet>
            <title>Home | Nawalowa Constructions</title>
            <meta name="description" content="Best construction company in Sri Lanka" />
        </Helmet>
      <section>
        <HeroSection />
      </section>

      <section className='mt-10'>
        <OurServices />
      </section>

      <section className='mt-10'>
        <RentSection />
      </section>
    </div>
  )
}
