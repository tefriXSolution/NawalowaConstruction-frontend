import { useEffect, useState } from 'react';
import {
  HeroSection,
  StatsSection,
  MissionVisionSection,
  StorySection,
  ValuesSection,
  CallToActionSection,
} from './components/sections';
import { commonStyles } from './styles';
import './styles/utilities.css';

export const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    stats: false,
    story: false,
    values: false,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            const section = target.dataset.section;
            if (section) {
              setIsVisible((prev) => ({ ...prev, [section]: true }));
            }
          }
        });
      },
      { threshold: 0.1 },
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className={commonStyles.gradient.background}>
      <HeroSection isVisible={isVisible.hero} />
      <StatsSection isVisible={isVisible.stats} />
      <MissionVisionSection />
      <StorySection isVisible={isVisible.story} />
      <ValuesSection isVisible={isVisible.values} />
      <CallToActionSection />
    </div>
  );
};
