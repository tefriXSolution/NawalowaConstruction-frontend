// Values section specific styles
export const valuesStyles = {
  section: 'py-20 bg-gradient-to-b from-gray-50 to-white',
  container: 'container mx-auto px-6',

  header: 'text-center mb-16',
  title: 'text-4xl lg:text-5xl font-bold text-gray-900 mb-4',
  subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
  accentLine: 'w-24 h-1 bg-mainTheme-color mx-auto mt-6',

  // Desktop grid
  desktopGrid: 'hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  cardWrapper: 'transform hover:scale-105 transition-all duration-300',

  // Mobile slider
  mobileSlider: 'md:hidden relative',
  navButton:
    'absolute top-1/2 transform -translate-y-1/2 z-20 bg-white text-gray-700 rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors',
  navButtonLeft: 'left-2',
  navButtonRight: 'right-2',

  sliderContainer:
    'flex overflow-x-auto space-x-6 pb-4 scrollbar-hide scroll-smooth',
  sliderItem: 'flex-shrink-0 w-80',
};
