---
name: Lumina Light
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464554'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#006591'
  on-secondary: '#ffffff'
  secondary-container: '#39b8fd'
  on-secondary-container: '#004666'
  tertiary: '#904900'
  on-tertiary: '#ffffff'
  tertiary-container: '#b55d00'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#c9e6ff'
  secondary-fixed-dim: '#89ceff'
  on-secondary-fixed: '#001e2f'
  on-secondary-fixed-variant: '#004c6e'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: JetBrains Mono
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: JetBrains Mono
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: JetBrains Mono
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: JetBrains Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  headline-xl-mobile:
    fontFamily: JetBrains Mono
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system focuses on a high-fidelity, technical aesthetic that merges the precision of developer tools with the elegance of modern glassmorphism. The brand personality is innovative, lucid, and structured. 

The design style utilizes **Glassmorphism** and **Modern Corporate** influences. It relies on a crisp white environment where depth is not created by darkness, but by subtle shifts in refractive surfaces, multi-layered ambient shadows, and translucent overlays. The goal is to evoke a sense of "digital glass"—clean, light-weight, and highly organized—while maintaining the technical rigor required for complex workflows.

## Colors
The palette is anchored by a pure White (#FFFFFF) foundation to maximize clarity and perceived space. 

- **Primary (Indigo):** Used exclusively for high-priority actions, active states, and focus indicators.
- **Secondary (Sky):** Reserved for informational accents and secondary interactive elements.
- **Neutral (Slate):** A range of greys used for borders and secondary text to maintain a soft contrast against the white backdrop.
- **Surfaces:** Neutral-50 (#F8FAFC) is used for container backgrounds to provide a subtle distinction from the base page color.
- **Glass Effect:** Use semi-transparent white (#FFFFFFBB) with a 12px backdrop-blur for floating panels.

## Typography
The system uses **JetBrains Mono** across all levels to reinforce the 3D technical narrative. To ensure high readability on light backgrounds, font weights are slightly increased compared to dark mode counterparts.

- **Headlines:** Use Bold or SemiBold weights with tighter letter-spacing for a "stamped" architectural feel.
- **Body Text:** Maintain a 1.5x line height minimum to compensate for the monospaced character widths, ensuring long-form legibility.
- **Monospace Utility:** Lean into the technical nature of the font for data displays and labels, using Slate-700 (#334155) for primary text content.

## Layout & Spacing
The layout follows a **Fluid Grid** logic with generous margins to allow the glassmorphic elements "room to breathe."

- **Grid:** 12-column system on desktop, 4-column on mobile.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Containment:** Use wide gutters (24px) to prevent the UI from feeling cluttered, which is essential when using multi-layered shadows that require physical space to transition.
- **Mobile Adaption:** Margins contract to 16px, and 3D effects (shadow spreads) are reduced by 50% to maintain touch-target precision.

## Elevation & Depth
Depth is the defining characteristic of this system. It is achieved through **Ambient Shadows** and **Tonal Layering**.

- **Shadows:** Use a "Triple-Stack" shadow technique for 3D depth. 
  - *Layer 1:* A tight, slightly darker shadow for definition.
  - *Layer 2:* A medium, diffused shadow for elevation.
  - *Layer 3:* A very soft, wide-spread Indigo-tinted shadow (#6366f10A) to simulate light bounce from the primary brand color.
- **Glassmorphism:** Elements at the highest elevation use a semi-transparent white background with a `backdrop-filter: blur(12px)`.
- **Surfaces:** Use thin, low-contrast inner borders (1px, #00000008) to define the edges of glass containers against the white background.

## Shapes
The shape language is consistently **Rounded**, providing a "friendly-tech" counter-balance to the rigid monospaced typography.

- **Standard Components:** 0.5rem (8px) radius for buttons and inputs.
- **Containers:** 1rem (16px) for cards and main UI panels to emphasize the "object-like" quality of the interface.
- **Interactive States:** On hover, elements should slightly "lift" via a 2px upward translation and an increase in shadow spread.

## Components
- **Buttons:** Primary buttons use a solid Indigo fill with a subtle inner-top highlight (white, 10% opacity) to create a "convex" 3D effect. Text is white.
- **Inputs:** Use a soft-grey background (#F1F5F9) with a 1px inset shadow to appear "sunken" into the page. On focus, they transition to white with an Indigo glow.
- **Cards:** Defined by a 16px corner radius, a white background, and the "Triple-Stack" shadow. Glassmorphic cards are reserved for floating overlays or navigation bars.
- **Chips/Labels:** Use a subtle Slate-100 background with Slate-600 text. Active chips utilize a light Indigo tint (#EEF2FF) with Indigo text.
- **3D Depth Indicator:** For scrollable areas, use a subtle gradient fade at the edges rather than a hard line to maintain the glass aesthetic.