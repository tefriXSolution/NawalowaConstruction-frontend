# About Us Page

This directory contains the About Us page implementation with a well-organized, maintainable structure.

## 📁 Directory Structure

```
aboutUsPage/
├── index.tsx                     # Main About Us page component
├── components/                   # Reusable components
│   ├── index.ts                 # Components export file
│   ├── StoryBlock.tsx           # Individual story timeline item
│   ├── CoreValueCard.tsx        # Individual core value card
│   └── sections/                # Page section components
│       ├── index.ts             # Sections export file
│       ├── HeroSection.tsx      # Hero/landing section
│       ├── StatsSection.tsx     # Company statistics section
│       ├── MissionVisionSection.tsx # Mission & vision section
│       ├── StorySection.tsx     # Company journey timeline
│       ├── ValuesSection.tsx    # Core values section
│       └── CallToActionSection.tsx # CTA section
└── styles/                      # Style configurations
    ├── index.ts                 # Styles export file
    ├── utilities.css            # CSS utility classes
    ├── commonStyles.ts          # Shared style constants
    ├── heroStyles.ts            # Hero section styles
    ├── statsStyles.ts           # Stats section styles
    ├── missionVisionStyles.ts   # Mission/Vision styles
    ├── storyStyles.ts           # Story section styles
    ├── valuesStyles.ts          # Values section styles
    └── ctaStyles.ts             # CTA section styles
```

## 🎨 Design Features

### Visual Enhancements

- **Modern Hero Section** with gradient backgrounds and decorative elements
- **Company Statistics** showcase with animated counters
- **Mission & Vision** clearly presented with icons
- **Timeline Design** for company story/journey
- **Interactive Cards** with hover effects and animations
- **Professional CTA** section with action buttons

### Responsive Design

- **Mobile-First Approach** with optimized layouts
- **Desktop Grid System** for core values
- **Mobile Slider** with smooth navigation
- **Adaptive Typography** scaling across devices

### Animation & Interactions

- **Scroll Animations** using Intersection Observer
- **Hover Effects** on cards and buttons
- **Smooth Transitions** throughout the interface
- **Progressive Loading** with staggered animations

## 🛠 Technical Implementation

### Component Architecture

- **Modular Design** with separate section components
- **Reusable Components** (StoryBlock, CoreValueCard)
- **Clean Separation** of concerns
- **TypeScript Integration** for type safety

### Styling Approach

- **Utility Classes** in separate CSS file
- **Style Constants** in TypeScript files
- **Theme Integration** using CSS custom properties
- **Maintainable Structure** with organized style files

### Performance Optimizations

- **Intersection Observer** for efficient scroll detection
- **Lazy Loading** of animations
- **Optimized Images** with proper alt text
- **Minimal Re-renders** with proper state management

## 🎯 Usage

### Importing Components

```tsx
import { AboutUsPage } from './pages/aboutUsPage';

// Individual sections can also be imported
import {
  HeroSection,
  StatsSection,
} from './pages/aboutUsPage/components/sections';
```

### Customizing Styles

```tsx
import { commonStyles, heroStyles } from './pages/aboutUsPage/styles';

// Use predefined style constants
<div className={commonStyles.button.primary}>Primary Button</div>;
```

### Adding New Sections

1. Create component in `components/sections/`
2. Create corresponding style file in `styles/`
3. Export from respective index files
4. Import and use in main `index.tsx`

## 🔧 Maintenance

### Adding New Styles

- Add common styles to `commonStyles.ts`
- Create section-specific styles in dedicated files
- Keep utility classes in `utilities.css`
- Maintain consistency with existing patterns

### Modifying Animations

- Update animation classes in `utilities.css`
- Adjust timing and delays in component files
- Test across different devices and browsers

### Content Updates

- Company stats in `StatsSection.tsx`
- Story timeline in `StorySection.tsx`
- Core values in `ValuesSection.tsx`
- Mission/Vision text in `MissionVisionSection.tsx`

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Slider navigation for values)
- **Tablet**: 768px - 1024px (Adjusted grid layouts)
- **Desktop**: > 1024px (Full grid system)

## 🎨 Color Scheme

Uses the main theme colors defined in `src/index.css`:

- Primary: `--color-mainTheme-color` (#001f3e)
- Primary Hover: `--color-mainTheme-hover-color` (#0a3866)
- Text: Various gray shades for hierarchy
- Backgrounds: Gradient combinations

## 🚀 Future Enhancements

- Add loading skeletons
- Implement image lazy loading
- Add more micro-interactions
- Include accessibility improvements
- Add dark mode support
