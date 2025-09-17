import { RentItemCard } from "./components/RentItemCard"

import testImg from '@/assets/img/testCard.jpg'

export const RentSection = () => {
  return (
    <>
        <div>
            <h1 className="section-title">
                Reliable Equipment for Rent
            </h1>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4">
            <div className="flex justify-center p-1">
                <RentItemCard
                    imgUrl={testImg}
                    cardTitle="Painting Machine"
                    CardSubTitle="High-efficiency painting machines for rent, perfect or large-scale projects and achieving a smooth, ven finish."
                    rentPerDay = {2500}
                    buttonLabel="Rent Item"
                />
            </div>            
            <div className="flex justify-center p-1">
                <RentItemCard
                    imgUrl={testImg}
                    cardTitle="Painting Machine"
                    CardSubTitle="High-efficiency painting machines for rent, perfect or large-scale projects and achieving a smooth, ven finish."
                    rentPerDay = {2500}
                    buttonLabel="Rent Item"
                />
            </div>            
            <div className="flex justify-center p-1">
                <RentItemCard
                    imgUrl={testImg}
                    cardTitle="Painting Machine"
                    CardSubTitle="High-efficiency painting machines for rent, perfect or large-scale projects and achieving a smooth, ven finish."
                    rentPerDay = {2500}
                    buttonLabel="Rent Item"
                />
            </div>            
        </div>
        <div className="flex justify-end mt-10 pr-10">
            <button type="button" className="text-rentBtn-color hover:text-white border border-rentBtn-hover-color hover:bg-rentBtn-hover-color focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  ">Browse More...</button>
        </div>
    </>
  )
}
