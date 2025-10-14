import { useRef } from 'react';
import { CoreValue } from '@/types';
import { LuHammer, LuLightbulb } from 'react-icons/lu';
import { FiUsers } from 'react-icons/fi';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { FaRegHandshake } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import { CoreValueCard } from '../CoreValueCard';
import { valuesStyles, commonStyles } from '../../styles';

const coreValues: CoreValue[] = [
  {
    valueTitle: 'Excellence in Craftsmanship',
    valueDesc:
      'We are committed to delivering superior quality in every project, ensuring durability and aesthetic appeal.',
    icon: LuHammer,
  },
  {
    valueTitle: 'Uncompromising Safety',
    valueDesc:
      'The well-being of our team and clients is paramount. We adhere to the highest safety standards.',
    icon: VscWorkspaceTrusted,
  },
  {
    valueTitle: 'Integrity and Trust',
    valueDesc:
      'We operate with transparency, honesty, and foster lasting relationships built on mutual respect.',
    icon: FaRegHandshake,
  },
  {
    valueTitle: 'Innovation and Adaptability',
    valueDesc:
      'Embracing new technologies and methods to provide efficient and forward-thinking solutions.',
    icon: LuLightbulb,
  },
  {
    valueTitle: 'Customer-Centric Approach',
    valueDesc:
      'Understanding and exceeding client expectations through personalized service and open communication.',
    icon: FiUsers,
  },
  {
    valueTitle: 'Community Impact',
    valueDesc:
      'Committed to contributing positively to the communities where we build and operate.',
    icon: MdOutlineLocationOn,
  },
];

interface ValuesSectionProps {
  isVisible: boolean;
}

export const ValuesSection = ({ isVisible }: ValuesSectionProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const scrollPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  return (
    <section
      data-section='values'
      className={`${valuesStyles.section} ${commonStyles.fadeInDelayed(600)} ${
        isVisible ? commonStyles.slideUpVisible : commonStyles.slideUp
      }`}
    >
      <div className={valuesStyles.container}>
        <div className={valuesStyles.header}>
          <h2 className={valuesStyles.title}>Our Core Values</h2>
          <p className={valuesStyles.subtitle}>
            Guiding principles that define our commitment to excellence and
            integrity
          </p>
          <div className={valuesStyles.accentLine}></div>
        </div>

        {/* Desktop Grid */}
        <div className={valuesStyles.desktopGrid}>
          {coreValues.map((value, index) => (
            <div key={index} className={valuesStyles.cardWrapper}>
              <CoreValueCard
                title={value.valueTitle}
                description={value.valueDesc}
                Icon={value.icon}
              />
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className={valuesStyles.mobileSlider}>
          <button
            onClick={scrollPrev}
            className={`${valuesStyles.navButton} ${valuesStyles.navButtonLeft}`}
          >
            ←
          </button>

          <div
            ref={sliderRef}
            className={valuesStyles.sliderContainer}
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {coreValues.map((value, index) => (
              <div
                key={index}
                className={valuesStyles.sliderItem}
                style={{ scrollSnapAlign: 'start' }}
              >
                <CoreValueCard
                  title={value.valueTitle}
                  description={value.valueDesc}
                  Icon={value.icon}
                />
              </div>
            ))}
          </div>

          <button
            onClick={scrollNext}
            className={`${valuesStyles.navButton} ${valuesStyles.navButtonRight}`}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};
