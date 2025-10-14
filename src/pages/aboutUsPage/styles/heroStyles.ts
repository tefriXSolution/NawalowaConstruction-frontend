// Hero section specific styles
export const heroStyles = {
  section: 'relative overflow-hidden',
  backgroundPattern:
    'absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-gray-50',
  decorativeElements: 'absolute top-0 left-0 w-full h-full opacity-5',
  decorativeBox1:
    'absolute top-10 left-10 w-20 h-20 border-2 border-mainTheme-color transform rotate-45',
  decorativeBox2:
    'absolute top-40 right-20 w-16 h-16 border-2 border-mainTheme-color transform rotate-12',
  decorativeBox3:
    'absolute bottom-20 left-1/4 w-12 h-12 border-2 border-mainTheme-color transform -rotate-45',

  content: 'relative z-10 container mx-auto px-6 py-16 lg:py-24',
  grid: 'grid lg:grid-cols-2 gap-12 lg:gap-16 items-center',

  textSection: 'space-y-8',
  textContent: 'space-y-4',
  badge:
    'inline-flex items-center px-4 py-2 bg-mainTheme-color/10 rounded-full',
  badgeText:
    'text-mainTheme-color font-semibold text-sm uppercase tracking-wide',
  title:
    'text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight',
  titleAccent: 'text-mainTheme-color block',
  description: 'text-lg lg:text-xl text-gray-600 leading-relaxed',

  buttonContainer: 'flex flex-col sm:flex-row gap-4',

  imageSection: 'relative',
  imageBackground:
    'absolute inset-0 bg-gradient-to-r from-mainTheme-color/20 to-transparent rounded-3xl transform rotate-3',
  image:
    'relative z-10 w-full h-auto rounded-3xl shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500',
  iconBadge:
    'absolute -bottom-6 -right-6 w-24 h-24 bg-mainTheme-color rounded-full flex items-center justify-center shadow-lg',
  icon: 'text-white text-2xl',
};
