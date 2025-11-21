# Retro Replay - Retro Gaming Console Store

## Overview
This is a static HTML website for "Retro Replay," a professional retro gaming console refurbishment store. The site features PlayStation, Xbox, Nintendo, Atari, and Sega consoles with a modern ecommerce design.

**Current State:** Fully redesigned with modern ecommerce standards, running on Replit with deployment configured.

## Recent Changes
- **November 21, 2025**: Complete ecommerce redesign
  - Implemented modern ecommerce CSS framework with mobile-first responsive design
  - Redesigned homepage with professional layout, hero section, trust badges, and product grid
  - Updated all console subsites (PlayStation, Xbox, Nintendo, Atari, Sega) with consistent modern design
  - Enhanced cart.js with better UX, visual notifications, and improved functionality
  - Maintained all existing site structure and console subsite organization
  - Used clean, professional color scheme with proper typography (Inter font)
  - Added proper ecommerce elements: search bar, cart badge, trust signals, footer navigation

- **November 21, 2025**: Initial Replit setup
  - Configured Node.js and http-server for static file serving
  - Set up workflow to run on port 5000
  - Configured static deployment settings
  - Created .gitignore for Node.js dependencies

## Project Architecture

### Technology Stack
- **Frontend**: HTML5, CSS3 (Modern Ecommerce Framework), vanilla JavaScript
- **Design**: Mobile-first responsive design, clean professional layout
- **Typography**: Inter font family for modern, readable text
- **Hosting**: Static file server (http-server via Node.js)
- **Cart System**: Client-side localStorage-based shopping cart with notifications

### Project Structure
```
/
├── index.html              # Homepage (redesigned with modern ecommerce layout)
├── style.css               # Modern ecommerce CSS framework
├── cart.js                 # Enhanced shopping cart with notifications
├── assets/                 # Images and media files
├── playstation/            # PlayStation console pages (redesigned)
│   ├── index.html          # PlayStation hub page
│   ├── products/           # PS1, PS2, PS3 product pages
│   ├── guides.html         # Setup guides
│   └── contact.html        # Contact page
├── xbox/                   # Xbox console pages (redesigned)
│   ├── index.html          # Xbox hub page
│   ├── products/           # Xbox, Xbox 360 product pages
│   ├── guides.html
│   └── contact.html
├── nintendo/               # Nintendo console pages (redesigned)
│   ├── index.html          # Nintendo hub page
│   ├── products/           # NES, SNES, N64 product pages
│   ├── guides.html
│   └── contact.html
├── atari/                  # Atari console pages (redesigned)
│   ├── index.html          # Atari hub page
│   ├── products/           # 2600, 5200, 7800 product pages
│   ├── guides.html
│   └── contact.html
├── sega/                   # Sega console pages (redesigned)
│   ├── index.html          # Sega hub page
│   ├── products/           # Genesis, Mega Drive, Saturn, Dreamcast pages
│   ├── guides.html
│   └── contact.html
├── about.html              # About page
├── consoles.html           # Console overview
├── checkout.html           # Checkout page
├── contact.html            # Contact page
└── [other pages]           # Various info pages
```

### Key Features
1. **Modern Ecommerce Design**: Professional layout following 2025 ecommerce best practices
2. **Shopping Cart**: Enhanced client-side cart with visual notifications and better UX
3. **Multi-Console Support**: Dedicated subsites for PlayStation, Xbox, Nintendo, Atari, and Sega
4. **Responsive Design**: Mobile-first design that works on all devices
5. **Trust Signals**: Warranty badges, professional refurbishment messaging, customer testimonials
6. **Product Cards**: Clean product presentation with features, pricing, and CTAs
7. **Consistent Navigation**: Unified header/footer across all pages with search functionality

### Design System
- **Primary Color**: #2563eb (Professional blue)
- **Secondary Color**: #10b981 (Success green)
- **Accent Color**: #f59e0b (Warning/highlight orange)
- **Typography**: Inter font family
- **Layout**: Container max-width 1200px, mobile-first responsive grid
- **Shadows**: Multiple elevation levels for depth
- **Border Radius**: Consistent rounded corners (0.375rem to 1rem)

### Missing Assets
Some images referenced in HTML are missing from the assets folder but don't prevent functionality:
- ps2logo.png
- ps2-hdd-bracket.png
- ps2-laser.png
- ps2-fmcb.png

## Development

### Running Locally
The workflow "Start website" is configured to run:
```bash
npx http-server -p 5000 -a 0.0.0.0 --cors -c-1
```

This serves the static files on port 5000 with:
- CORS enabled
- Cache disabled (`-c-1`)
- Listening on all interfaces (`0.0.0.0`)

### Deployment
The site is configured for static deployment:
- **Deployment Type**: Static
- **Public Directory**: `.` (root directory)

## User Preferences
- Modern ecommerce design standards (2025)
- Maintain main site and subsite structure for all console brands
- Clean, professional appearance
- Keep all existing console pages and organization

## Notes
- The site uses localStorage for cart persistence
- No backend server or database is required
- All content is static HTML/CSS/JavaScript
- Cart system includes visual notifications and improved UX
- Design follows modern ecommerce best practices: mobile-first, trust signals, clear CTAs, professional layout
