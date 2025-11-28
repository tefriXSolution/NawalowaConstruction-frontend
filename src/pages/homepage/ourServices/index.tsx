import { ServiceCard } from "./components/ServiceCard";
import sandBlastingImg from "@/assets/img/sandBlasting.png";
import steelPaintingImg from "@/assets/img/steelPainting.png";
import housePaintingImg from "@/assets/img/housePainting.png";

export const OurServices = () => {
  return (
    <section id="serviceSection" className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-mainTheme-color section-title">
          Our Services
        </h2>
        <div className="mt-3 flex justify-center">
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="flex justify-center">
          <ServiceCard
            imgUrl={sandBlastingImg}
            cardTitle="Sand Blasting"
            CardSubTitle="Achieve superior surface preparation with our professional sand blasting services, ensuring optimal adhesion for new coatings."
            buttonLabel="Request Service"
          />
        </div>

        <div className="flex justify-center">
          <ServiceCard
            imgUrl={steelPaintingImg}
            cardTitle="Steel Painting"
            CardSubTitle="Protect and beautify your steel structures with our expert painting solutions, engineered for durability and aesthetic appeal."
            buttonLabel="Request Service"
          />
        </div>

        <div className="flex justify-center">
          <ServiceCard
            imgUrl={housePaintingImg}
            cardTitle="House Painting"
            CardSubTitle="Transform your home with our high-quality house painting, providing a fresh look and long-lasting protection."
            buttonLabel="Request Service"
          />
        </div>
      </div>
    </section>
  );
};
