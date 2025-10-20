import React from 'react';
import { WhyChooseUsFeature } from '../types';

// Configuration for the Services Page content
export const servicesPageConfig = {
  // Page header content
  header: {
    title: "Our Professional Services",
    description: "Comprehensive construction and painting solutions tailored to meet your project needs. Quality workmanship, professional expertise, and exceptional results guaranteed."
  },

  // Why Choose Us section content
  whyChooseUs: {
    title: "Why Choose Our Services?",
    features: [
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
        description: 'Professional-grade materials and expert craftsmanship ensure lasting results for every project.',
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
        description: 'Our skilled professionals bring years of experience and expertise to deliver exceptional service.',
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
        description: 'We respect your schedule and ensure projects are completed on time without compromising quality.',
      },
    ] as WhyChooseUsFeature[]
  }
};

// Alternative configurations for different use cases
export const alternativeFeatures: WhyChooseUsFeature[] = [
  {
    id: 'affordable-pricing',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z'/>
        <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z' clipRule='evenodd'/>
      </svg>
    ),
    title: 'Affordable Pricing',
    description: 'Competitive rates without compromising on quality. Get the best value for your investment.',
  },
  {
    id: '24-7-support',
    icon: (
      <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
        <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z' clipRule='evenodd'/>
      </svg>
    ),
    title: '24/7 Support',
    description: 'Round-the-clock customer support to address your concerns and ensure project success.',
  }
];