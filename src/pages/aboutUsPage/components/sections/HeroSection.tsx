import { LuHammer } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import testImg from '@/assets/img/testCard.jpg';
import { heroStyles, commonStyles } from '../../styles';

interface HeroSectionProps {
  isVisible: boolean;
}

export const HeroSection = ({ isVisible }: HeroSectionProps) => {
  const navigate = useNavigate();

  const handleServicesClick = () => {
    navigate('/services');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleContactClick = () => {
    navigate('/contactUs');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section
      data-section='hero'
      className={`${heroStyles.section} ${commonStyles.fadeIn} ${
        isVisible ? commonStyles.slideUpVisible : commonStyles.slideUp
      }`}
    >
      {/* Background Pattern */}
      <div className={heroStyles.backgroundPattern}></div>
      <div className={heroStyles.decorativeElements}>
        <div className={heroStyles.decorativeBox1}></div>
        <div className={heroStyles.decorativeBox2}></div>
        <div className={heroStyles.decorativeBox3}></div>
      </div>

      <div className={heroStyles.content}>
        <div className={heroStyles.grid}>
          <div className={heroStyles.textSection}>
            <div className={heroStyles.textContent}>
              <div className={heroStyles.badge}>
                <span className={heroStyles.badgeText}>Since 2005</span>
              </div>
              <h1 className={heroStyles.title}>
                Building the Future,
                <span className={heroStyles.titleAccent}>
                  One Project at a Time
                </span>
              </h1>
              <p className={heroStyles.description}>
                At Nawalowa Constructions, we blend innovation with unwavering
                dedication to quality. For nearly two decades, we've been the
                trusted partner for comprehensive construction and equipment
                rental solutions, turning visions into reality with precision
                and expertise.
              </p>
            </div>

            <div className={heroStyles.buttonContainer}>
              <button
                onClick={handleServicesClick}
                className={commonStyles.button.primary}
              >
                Our Services
              </button>
              <button
                onClick={handleContactClick}
                className={commonStyles.button.secondary}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className={heroStyles.imageSection}>
            <div className={heroStyles.imageBackground}></div>
            <img
              src={testImg}
              alt='Nawalowa Construction Project'
              className={heroStyles.image}
            />
            <div className={heroStyles.iconBadge}>
              <LuHammer className={heroStyles.icon} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
