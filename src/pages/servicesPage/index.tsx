import { OurServices } from '@/pages/homepage/ourServices/index';
import { ServicesPageHeader, WhyChooseUsSection } from './components';
import { servicesPageConfig } from './config/index';

export const ServicesPage = () => {
  const { header, whyChooseUs } = servicesPageConfig;

  return (
    <main className='min-h-screen bg-white'>
      {/* Page Header */}
      <ServicesPageHeader
        title={header.title}
        description={header.description}
      />

      {/* Services Content */}
      <div className='py-16'>
        <OurServices />
      </div>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection
        title={whyChooseUs.title}
        features={whyChooseUs.features}
      />
    </main>
  );
};
