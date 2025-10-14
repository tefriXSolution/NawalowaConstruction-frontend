import { LuTarget, LuEye } from 'react-icons/lu';
import { missionVisionStyles } from '../../styles';

export const MissionVisionSection = () => {
  return (
    <section className={missionVisionStyles.section}>
      <div className={missionVisionStyles.container}>
        <div className={missionVisionStyles.grid}>
          <div className={missionVisionStyles.block}>
            <div className={missionVisionStyles.header}>
              <LuTarget className={missionVisionStyles.icon} />
              <h3 className={missionVisionStyles.title}>Our Mission</h3>
            </div>
            <p className={missionVisionStyles.description}>
              To deliver exceptional construction and equipment rental services
              that exceed expectations while maintaining the highest standards
              of safety, quality, and environmental responsibility.
            </p>
          </div>
          <div className={missionVisionStyles.block}>
            <div className={missionVisionStyles.header}>
              <LuEye className={missionVisionStyles.icon} />
              <h3 className={missionVisionStyles.title}>Our Vision</h3>
            </div>
            <p className={missionVisionStyles.description}>
              To be the leading construction and equipment rental company,
              recognized for innovation, reliability, and our commitment to
              building sustainable communities for future generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
