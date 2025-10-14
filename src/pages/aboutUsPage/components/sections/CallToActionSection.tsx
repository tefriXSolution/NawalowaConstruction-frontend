import { useNavigate } from 'react-router-dom';
import { ctaStyles, commonStyles } from '../../styles';

export const CallToActionSection = () => {
  const navigate = useNavigate();

  const handleGetServiceClick = () => {
    navigate('/services');
    // Scroll to top of services page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleContactClick = () => {
    navigate('/contactUs');
    // Scroll to top of contact page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  return (
    <section className={ctaStyles.section}>
      <div className={ctaStyles.container}>
        <h2 className={ctaStyles.title}>Ready to Start Your Next Project?</h2>
        <p className={ctaStyles.description}>
          Let's bring your vision to life with our expertise and commitment to
          excellence.
        </p>
        <div className={ctaStyles.buttonContainer}>
          <button
            onClick={handleGetServiceClick}
            className={commonStyles.button.white}
          >
            Get a Service
          </button>
          <button
            onClick={handleContactClick}
            className='px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-mainTheme-color transition-all duration-300'
          >
            Let's Contact
          </button>
        </div>
      </div>
    </section>
  );
};
