import React from 'react';

export interface ServicesPageHeaderProps {
  title: string;
  description: string;
}

export interface SectionHeaderProps {
  title: string;
  showDivider?: boolean;
  className?: string;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface WhyChooseUsFeature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface WhyChooseUsSectionProps {
  title?: string;
  features?: WhyChooseUsFeature[];
}
