import { OurStory } from '@/types';
import { StoryBlock } from '../StoryBlock';
import { storyStyles, commonStyles } from '../../styles';

const OurStories: OurStory[] = [
  {
    StoryTitle: 'Foundation and Early Years (2005-2010)',
    StoryDesc:
      'Nawalowa Constructions began its journey in 2005 with a vision to revolutionize the local construction and equipment rental industry. Founded by a team of seasoned engineers and construction veterans, our initial focus was on providing specialized sand blasting and steel painting services for industrial clients. We quickly earned a reputation for precision, reliability, and delivering projects ahead of schedule.',
  },
  {
    StoryTitle: 'Expansion and Diversification (2011-2017)',
    StoryDesc:
      'Recognizing the growing demand for comprehensive construction solutions, Nawalowa expanded its services to include house painting and introduced a rental fleet of essential equipment. This period marked a significant diversification, bringing in painting machines, sand blasting machines, and lime mixing machines. Our commitment to using high-quality materials and state-of-the-art equipment allowed us to cater to a broader residential and commercial clientele.',
  },
  {
    StoryTitle: 'Innovation and Growth (2018-Present)',
    StoryDesc:
      'In recent years, Nawalowa Constructions has embraced technological advancements and sustainable practices to further enhance our offerings. We invested in modern, energy-efficient machinery and implemented rigorous safety protocols, reinforcing our position as an industry leader. Our dedication to continuous improvement and fostering strong client relationships has fueled our steady growth.',
  },
];

interface StorySectionProps {
  isVisible: boolean;
}

export const StorySection = ({ isVisible }: StorySectionProps) => {
  return (
    <section
      data-section='story'
      className={`${storyStyles.section} ${commonStyles.fadeInDelayed(400)} ${
        isVisible ? commonStyles.slideUpVisible : commonStyles.slideUp
      }`}
    >
      <div className={storyStyles.container}>
        <div className={storyStyles.header}>
          <h2 className={storyStyles.title}>Our Journey</h2>
          <p className={storyStyles.subtitle}>
            A legacy of building excellence and innovation spanning nearly two
            decades
          </p>
          <div className={storyStyles.accentLine}></div>
        </div>

        <div className={storyStyles.timeline}>
          {/* Timeline line */}
          <div className={storyStyles.timelineLine}></div>

          <div className={storyStyles.storyList}>
            {OurStories.map((story, index) => (
              <div key={index} className={storyStyles.storyItem}>
                {/* Timeline dot */}
                <div className={storyStyles.timelineDot}></div>

                <div className={storyStyles.storyContent}>
                  <StoryBlock
                    title={story.StoryTitle}
                    description={story.StoryDesc}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
