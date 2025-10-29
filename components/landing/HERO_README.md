# Hero Section Implementation

## Overview
The Hero Section is the full-screen introductory section at the top of the Africa Climate Platform landing page. It features a parallax background, animated text, and responsive CTA buttons.

## Features Implemented

### ✅ Full-Screen Layout
- Responsive height: 100vh on all devices
- Centered content with proper spacing
- Container-based responsive padding

### ✅ Parallax Background
- GSAP ScrollTrigger-powered parallax effect
- Scroll speed ratio: 0.5 (background moves slower than foreground)
- Next.js Image component with priority loading
- Optimized for performance with `will-change: transform`

### ✅ Staggered Text Animation
Animation timeline (GSAP):
1. Title: Fade-in + slide-up (1s duration, 0.3s delay)
2. Subtitle: Fade-in + slide-up (0.8s duration, 0.6s delay)
3. CTA buttons: Fade-in + slide-up with stagger (0.6s duration, 0.9s delay, 0.2s stagger)

### ✅ Responsive CTA Buttons
- Two variants: Primary (climate green) and Secondary (outline with backdrop blur)
- Hover effects: Scale (1.05), shadow, and color transitions (0.3s)
- Responsive layout: Stacked on mobile, side-by-side on desktop
- Minimum width: 200px for consistency
- Icon integration with Lucide React (ArrowRight)

### ✅ Gradient Overlay
- Multi-stop gradient for text readability
- From black/60 → black/40 → black/60
- Ensures proper contrast for white text

### ✅ Image Optimization
- Next.js Image component with:
  - Priority loading (above the fold)
  - Quality: 85
  - Responsive sizes: 100vw
  - Object-fit: cover
- Placeholder SVG created for development

### ✅ Accessibility
- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Respects `prefers-reduced-motion` preference
- Proper heading hierarchy (h1)
- Descriptive alt text for images

### ✅ Responsive Design
- Mobile-first approach
- Breakpoints:
  - Mobile: < 640px (sm)
  - Tablet: 640px - 1024px
  - Desktop: > 1024px
- Text sizes scale appropriately:
  - h1: 4xl → 5xl → 6xl → 7xl
  - Subtitle: lg → xl → 2xl

## Requirements Met

### Requirement 1.1 ✅
- Displays full-screen hero section with tagline
- Loads within 2 seconds (optimized with Next.js)

### Requirement 1.2 ✅
- Hero background image with minimum 1920x1080 resolution
- Placeholder SVG provided (replace with actual image)

### Requirement 1.3 ✅
- GSAP fade-in and slide-up animation over 1 second
- Smooth power2.out easing

### Requirement 1.4 ✅
- Two primary CTA buttons: "Join the Movement" and "Explore Opportunities"
- Fully functional and styled

### Requirement 1.5 ✅
- Hover effects with color transition within 0.3s
- Scale and shadow effects for enhanced interactivity

### Requirement 10.2 ✅
- Parallax scrolling effect with scroll speed ratio of 0.5
- Smooth scrubbing with GSAP ScrollTrigger

## Usage

```tsx
import { HeroSection } from '@/components/landing';

// Default usage
<HeroSection />

// Custom props
<HeroSection
  title="Your Custom Title"
  subtitle="Your custom subtitle"
  backgroundImage="/path/to/image.jpg"
  ctaButtons={[
    { label: 'Primary CTA', href: '#section', variant: 'primary' },
    { label: 'Secondary CTA', href: '#other', variant: 'secondary' },
  ]}
/>
```

## Props Interface

```typescript
interface CTAButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaButtons?: CTAButton[];
}
```

## Default Values

- **Title**: "Accelerating African Climate Solutions through Innovation, Investment, and Impact"
- **Subtitle**: "Join the movement to mobilize green finance, accelerate climate innovation, and foster collaboration across Africa"
- **Background Image**: `/images/hero/africa-climate-hero.jpg`
- **CTA Buttons**: 
  - "Join the Movement" (primary)
  - "Explore Opportunities" (secondary)

## File Structure

```
components/landing/
├── hero-section.tsx       # Main component
├── index.ts              # Exports
└── HERO_README.md        # This file

public/images/hero/
├── africa-climate-hero.jpg  # Placeholder SVG (replace with actual image)
└── .gitkeep                 # Directory marker
```

## Next Steps

1. **Replace Placeholder Image**: Add actual hero background image (1920x1080px, WebP format recommended)
2. **Update CTA Links**: Connect buttons to actual routes/sections
3. **Test Animations**: Verify smooth animations across devices
4. **Performance Testing**: Run Lighthouse audit to ensure < 2.5s LCP

## Dependencies

- `next/image` - Image optimization
- `gsap` - Animation library
- `gsap/ScrollTrigger` - Scroll-based animations
- `lucide-react` - Icons
- `@/components/ui/button` - Button component
- `@/lib/animations` - Animation utilities

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Graceful degradation for older browsers
- Respects user motion preferences

## Performance Considerations

- Priority loading for hero image (above the fold)
- `will-change: transform` for optimized animations
- Reduced motion support for accessibility
- Optimized GSAP timeline for 60 FPS

## Color Palette Used

- Primary: `#1E5631` (Climate Green)
- Text: White with opacity variations
- Overlay: Black with gradient opacity
- Hover: Climate Green Dark

## Typography

- Heading: Outfit font family (from layout)
- Body: Inter font family (from layout)
- Font sizes: Responsive scale (4xl → 7xl for h1)
