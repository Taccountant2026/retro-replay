# Retro Replay - Retro Gaming Console Testing & Sales

## Overview
Professional gaming console testing and sales service. Retro Replay thoroughly tests all consoles with professional-grade equipment, provides printed test reports, external cleaning only. Refurbishment, internal cleaning, and mods are premium upsell options. Focuses on PS2 range.

**Current State:** Modern ecommerce site with accurate business model. All products: Tested Console + External Clean + Printed Report (Base). Refurbishment & mods are upsell features.

## Business Model

### Core Service
- **Product**: Tested Console (passes professional testing)
- **Includes**: 
  - Thorough professional testing with printed report
  - External professional cleaning
  - 2x Controllers & all necessary cables
  - UK statutory warranty (6 months minimum)
- **Cosmetic Grading**: A (Like New), B (Very Good), C (Good)

### Upsell Options
1. **Refurbishment (Internal Clean)** - Professional internal cleaning, laser recalibration (upsell feature)
2. **Mods & Upgrades** - HDD installation, FMCB, custom shells, etc. (upsell feature)
3. **Extended Services** - Setup assistance, delivery installation (upsell feature)

### Pricing Strategy
- Bare console: Tested + External Clean + Report + 2 Controllers + Cables
- All mods: Additional cost add-ons
- Prices in GBP (£)
- Focus on PS2 range (Fat/Slim models, all variants)

### Warranty
- **Legal Minimum**: UK statutory rights (6 months for goods/services)
- **Terms**: Covers defects in materials/workmanship
- **Exclusions**: Cosmetic damage, misuse, intentional damage

### Regional Focus
- UK primary market
- International shipping available (upsell)

## Recent Changes
- **November 21, 2025**: Business model update
  - Repositioned from "refurbished" to "tested + external clean"
  - Refurbishment becomes premium upsell option
  - Added printed test report to base offering
  - Updated warranty to legal minimum protection
  - All mods are now add-on features
  - Focus on PS2 product line

- **November 21, 2025**: Design enhancement
  - Applied modern 2025 theme with gradient effects and glassmorphism
  - Added retro floating particle system throughout site
  - Enhanced cart page design with better product cards
  - Improved button interactions and visual hierarchy

## Project Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3 (Modern Ecommerce Framework), vanilla JavaScript
- **Design**: Mobile-first responsive design, retro gaming aesthetic with modern execution
- **Typography**: Inter font family
- **Hosting**: Static file server (http-server via Node.js)
- **Cart System**: Client-side localStorage shopping cart

### Project Structure
```
/
├── index.html                      # Homepage
├── style.css                       # Modern ecommerce CSS with gradients
├── cart.js                         # Shopping cart system
├── particles.js                    # Retro floating particles
├── playstation/
│   ├── products/ps2.html          # PS2 console listing (main focus)
│   ├── products/ps1.html
│   ├── products/ps3.html
│   ├── index.html
│   ├── guides.html
│   └── contact.html
├── xbox/, nintendo/, atari/, sega/ # Other console lines
├── about.html                      # About page
├── services.html                   # Services/mods page
├── checkout.html                   # Cart & checkout
└── assets/                         # Images & media
```

### Key Features
1. **Tested Console Listings**: Clear distinction between base product and upsells
2. **Cosmetic Grading**: A/B/C visual indicators for condition
3. **Upsell Structure**: Mods & services clearly presented as add-ons
4. **Test Report Included**: Every console comes with printed test documentation
5. **Modern Design**: 2025 ecommerce standards with retro gaming vibe
6. **Shopping Cart**: Full cart functionality with upsell suggestions

### Design System
- **Primary**: #0066ff (Modern Blue)
- **Secondary**: #00d084 (Success Green)
- **Accent**: #ff6b35 (Retro Orange)
- **Dark**: #0a0e27 (Deep Navy)
- **Typography**: Inter 400-800 weights
- **Effects**: Gradients, glassmorphism, shadow depth, floating particles

## Product Information

### PS2 Range (Primary Focus)
- **PS2 Fat SCPH-50003** (Black/Silver) - Classic original model
- **PS2 Slim SCPH-70003** (All colors) - Compact revision
- **Cosmetic Ratings Available**: A (Like New), B (Very Good), C (Good)
- **Optional Mods**: HDD + FMCB, internal refurbishment, controllers upgrade

### Upsell Services
- Professional internal refurbishment
- HDD installation (500GB-1TB options)
- FMCB installation (Free McBoot)
- Custom shell colors
- Controller upgrades
- Extended warranty options
- International shipping

## Warranty & Legal

### UK Statutory Rights (Base Coverage)
- 6 months for consumer goods/services
- Covers defects in materials/workmanship
- Professional testing documented via printed report
- Right of return for defective products

### What's NOT Covered
- Cosmetic wear (grading system shows condition)
- User-caused damage
- Intentional misuse
- Normal wear from gaming use
- Cosmetic condition deterioration

## User Preferences
- Accurate business model representation
- PS2 as primary product line
- Legal minimum warranty protection
- Clear upsell/add-on distinction
- Professional testing emphasizes quality
- Modern design with retro gaming charm

## Notes
- Printed test reports differentiate from competitors
- Cosmetic grading helps manage expectations
- Upsell model protects margins on base product
- UK focus with international expansion possible
- All pricing excludes upsell services
- Static site - all products/pricing updatable via HTML
