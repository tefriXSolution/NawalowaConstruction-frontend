import { useNavigate } from 'react-router-dom';
import { ctaStyles, commonStyles } from '../../styles';
import { WavyBackground } from './wavy-background';

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
      <WavyBackground
        className="w-full h-80"
        containerClassName="w-full h-full"
        // backgroundFill="#1f2937" // Dark gray to match your design
        // colors={["#3b82f6", "#1d4ed8", "#2563eb", "#1e40af"]} // Blue theme colors
        waveOpacity={0.3}
        speed="slow"
      >
        <div className={ctaStyles.container}>
          <h2 className={ctaStyles.title}>Get a Quote for Your Blasting & Painting Project</h2>
          <p className={ctaStyles.description}>
            Let's bring your vision to life with our expertise and commitment to
            excellence.
          </p>
          <div className={ctaStyles.buttonContainer}>
            <button
              onClick={handleGetServiceClick}
              className={commonStyles.button.primary}
            >
              Get a Service
            </button>
            <button
              onClick={handleContactClick}
             className='px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base md:px-8 md:py-4 border-2 border-blue-950 text-blue-950 rounded-lg font-semibold hover:bg-blue-950 hover:text-white transition-all duration-300'
            >
              Let's Contact
            </button>
          </div>
        </div>
      </WavyBackground>
    </section>
  );
};