import { FeatureCard } from './FeatureCard';
import { SectionHeader } from './SectionHeader';
import { WhyChooseUsFeature, WhyChooseUsSectionProps } from '../types';

const defaultFeatures: WhyChooseUsFeature[] = [
  {
    id: 'quality-assurance',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
          clipRule='evenodd'
        />
      </svg>
    ),
    title: 'Quality Assurance',
    description:
      'Professional-grade materials and expert craftsmanship ensure lasting results for every project.',
  },
  {
    id: 'experienced-team',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M10 2L3 7v11a1 1 0 001 1h5v-6h2v6h5a1 1 0 001-1V7l-7-5z'
          clipRule='evenodd'
        />
      </svg>
    ),
    title: 'Experienced Team',
    description:
      'Our skilled professionals bring years of experience and expertise to deliver exceptional service.',
  },
  {
    id: 'timely-delivery',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path
          fillRule='evenodd'
          d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
          clipRule='evenodd'
        />
      </svg>
    ),
    title: 'Timely Delivery',
    description:
      'We respect your schedule and ensure projects are completed on time without compromising quality.',
  },
];

export const WhyChooseUsSection = ({
  title = 'Why Choose Our Services?',
  features = defaultFeatures,
}: WhyChooseUsSectionProps) => {
  return (
    <div className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <SectionHeader title={title} />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
