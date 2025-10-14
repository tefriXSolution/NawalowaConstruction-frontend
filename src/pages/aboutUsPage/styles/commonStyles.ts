// Common styles used across About Us page components

export const commonStyles = {
  // Container and layout styles
  container: 'container mx-auto px-6',
  section: 'py-20',
  sectionSmall: 'py-16',

  // Animation styles
  fadeIn: 'transition-all duration-1000',
  fadeInDelayed: (delay: number) =>
    `transition-all duration-1000 delay-${delay}`,
  slideUp: 'opacity-0 translate-y-10',
  slideUpVisible: 'opacity-100 translate-y-0',

  // Typography styles
  heading: {
    h1: 'text-4xl lg:text-5xl font-bold text-gray-900',
    h2: 'text-3xl lg:text-4xl font-bold text-gray-900',
    h3: 'text-2xl font-bold text-gray-900',
    subtitle: 'text-xl text-gray-600 max-w-3xl mx-auto',
    body: 'text-lg text-gray-600 leading-relaxed',
  },

  // Button styles
  button: {
    primary:
      'px-8 py-4 bg-mainTheme-color text-white rounded-lg font-semibold hover:bg-mainTheme-hover-color transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl',
    secondary:
      'px-8 py-4 border-2 border-mainTheme-color text-mainTheme-color rounded-lg font-semibold hover:bg-mainTheme-color hover:text-white transition-all duration-300',
    white:
      'px-8 py-4 bg-white text-mainTheme-color rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg',
  },

  // Card styles
  card: {
    base: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100',
    hover: 'group hover:scale-105 transition-all duration-300',
  },

  // Gradient styles
  gradient: {
    background: 'bg-gradient-to-b from-gray-50 to-white',
    blueGray: 'bg-gradient-to-br from-blue-50 via-white to-gray-50',
    grayBlue: 'bg-gradient-to-r from-gray-50 to-blue-50',
    theme: 'bg-gradient-to-r from-mainTheme-color to-mainTheme-hover-color',
  },

  // Accent line
  accentLine: 'w-24 h-1 bg-mainTheme-color mx-auto mt-6',
};
