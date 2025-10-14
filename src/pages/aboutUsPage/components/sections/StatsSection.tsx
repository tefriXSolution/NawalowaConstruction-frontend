import { FiAward, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { LuTarget } from 'react-icons/lu';
import { statsStyles, commonStyles } from '../../styles';

const stats = [
  { number: '20+', label: 'Years of Excellence', icon: FiAward },
  { number: '500+', label: 'Projects Completed', icon: LuTarget },
  { number: '150+', label: 'Happy Clients', icon: FiUsers },
  { number: '98%', label: 'Client Satisfaction', icon: FiTrendingUp },
];

interface StatsSectionProps {
  isVisible: boolean;
}

export const StatsSection = ({ isVisible }: StatsSectionProps) => {
  return (
    <section
      data-section='stats'
      className={`${statsStyles.section} ${commonStyles.fadeInDelayed(200)} ${
        isVisible ? commonStyles.slideUpVisible : commonStyles.slideUp
      }`}
    >
      <div className={statsStyles.container}>
        <div className={statsStyles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={statsStyles.statItem}>
              <div className={statsStyles.iconContainer}>
                <stat.icon className={statsStyles.icon} />
              </div>
              <div className={statsStyles.number}>{stat.number}</div>
              <div className={statsStyles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
