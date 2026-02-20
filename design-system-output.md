## Design System: Campamento Balcarce

### Pattern
- **Name:** Minimal Single Column
- **Conversion Focus:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Color Strategy:** Minimalist: Brand + white #FFFFFF + accent. Buttons: High contrast 7:1+. Text: Black/Dark grey
- **Sections:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

### Style
- **Name:** Vibrant & Block-based
- **Keywords:** Bold, energetic, playful, block layout, geometric shapes, high color contrast, duotone, modern, energetic
- **Best For:** Startups, creative agencies, gaming, social media, youth-focused, entertainment, consumer
- **Performance:** ΓÜí Good | **Accessibility:** ΓùÉ Ensure WCAG

### Colors
| Role | Hex |
|------|-----|
| Primary | #171717 |
| Secondary | #404040 |
| CTA | #D4AF37 |
| Background | #FFFFFF |
| Text | #171717 |

*Notes: Minimal black + accent gold*

### Typography
- **Heading:** Inter
- **Body:** Inter
- **Mood:** minimal, clean, swiss, functional, neutral, professional
- **Best For:** Dashboards, admin panels, documentation, enterprise apps, design systems
- **Google Fonts:** https://fonts.google.com/share?selection.family=Inter:wght@300;400;500;600;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Key Effects
Large sections (48px+ gaps), animated patterns, bold hover (color shift), scroll-snap, large type (32px+), 200-300ms

### Avoid (Anti-patterns)
- Flat design without depth
- Text-heavy pages

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px

