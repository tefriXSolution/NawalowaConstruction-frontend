import { ServiceCard } from './components/ServiceCard'
import sandBlastingImg from "@/assets/img/sandBlasting.png"
import steelPaintingImg from "@/assets/img/steelPainting.png"
import housePaintingImg from "@/assets/img/housePainting.png"

export const OurServices = () => {
  return (
    <>
        <div>
            <h2 className='section-title'>Our Services</h2>
        </div>
        <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4'>
            <div className='flex justify-center p-1'>
                <ServiceCard
                    imgUrl={sandBlastingImg}
                    cardTitle={"Sand Blasting"}
                    CardSubTitle={"Achieve superior surface preparation with our professional sand blasting services, ensuring optimal adhesion for new coatings."}
                    buttonLabel={"Request Service"}
                />
            </div>
            <div className='flex justify-center p-1'>
                <ServiceCard
                    imgUrl={steelPaintingImg}
                    cardTitle={"Steel Painting"}
                    CardSubTitle={"Protect and beautify your steel structures with our expert painting solutions, engineered for durability and aesthetic appeal."}
                    buttonLabel={"Request Service"}
                />
            </div>
            <div className='flex justify-center p-1'>
                <ServiceCard
                    imgUrl={housePaintingImg}
                    cardTitle={"House Painting"}
                    CardSubTitle={"Transform your home with our high-quality house painting, providing a fresh look and long-lasting protection."}
                    buttonLabel={"Request Service"}
                />
            </div>
        </div>
    </>
  )
}
