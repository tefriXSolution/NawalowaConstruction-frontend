import { RentalItem } from '@/pages/rentalItemsPage/types';
import testImg from '@/assets/img/testCard.jpg';

export const rentalItemsData: RentalItem[] = [
  {
    id: 1,
    title: 'Painting Machine',
    description:
      'High-efficiency painting machines for rent, perfect for large-scale projects and achieving a smooth, even finish.',
    pricePerDay: 2500,
    image: testImg,
    category: 'painting',
  },
  {
    id: 2,
    title: 'Sand Blasting Equipment',
    description:
      'Professional sand blasting equipment for surface preparation and cleaning applications.',
    pricePerDay: 3500,
    image: testImg,
    category: 'cleaning',
  },
  {
    id: 3,
    title: 'Steel Painting Tools',
    description:
      'Specialized tools for steel structure painting and coating applications.',
    pricePerDay: 2800,
    image: testImg,
    category: 'painting',
  },
  {
    id: 4,
    title: 'Pressure Washer',
    description:
      'Heavy-duty pressure washers for cleaning and surface preparation work.',
    pricePerDay: 1500,
    image: testImg,
    category: 'cleaning',
  },
  {
    id: 5,
    title: 'Paint Sprayer',
    description:
      'Professional paint spraying equipment for efficient and uniform coating application.',
    pricePerDay: 2200,
    image: testImg,
    category: 'painting',
  },
  {
    id: 6,
    title: 'Scaffolding Set',
    description:
      'Complete scaffolding systems for safe access to elevated work areas.',
    pricePerDay: 1800,
    image: testImg,
    category: 'construction',
  },
  {
    id: 7,
    title: 'Air Compressor',
    description:
      'Industrial air compressors for powering pneumatic tools and equipment.',
    pricePerDay: 2000,
    image: testImg,
    category: 'power',
  },
  {
    id: 8,
    title: 'Surface Grinder',
    description:
      'Heavy-duty surface grinding equipment for metal preparation and finishing.',
    pricePerDay: 4000,
    image: testImg,
    category: 'grinding',
  },
  {
    id: 9,
    title: 'Coating Applicator',
    description:
      'Precision coating application tools for industrial and commercial projects.',
    pricePerDay: 3200,
    image: testImg,
    category: 'painting',
  },
];

// Service functions for data manipulation
export const getUniqueCategories = (items: RentalItem[]): string[] => {
  return ['all', ...Array.from(new Set(items.map((item) => item.category)))];
};

export const filterItemsByCategory = (
  items: RentalItem[],
  category: string,
): RentalItem[] => {
  return category === 'all'
    ? items
    : items.filter((item) => item.category === category);
};

export const paginateItems = (
  items: RentalItem[],
  page: number,
  itemsPerPage: number,
): RentalItem[] => {
  const startIndex = (page - 1) * itemsPerPage;
  return items.slice(startIndex, startIndex + itemsPerPage);
};
