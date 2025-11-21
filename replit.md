# Retro Replay - PS2 Premium Store

## Overview
This is a static HTML website for "Retro Replay," a retro gaming console store specializing in PlayStation 2 (PS2) refurbishment and sales. The site also features other classic gaming consoles including PlayStation, Xbox, Nintendo, Atari, and Sega systems.

**Current State:** Fully functional static website running on Replit with deployment configured.

## Recent Changes
- **November 21, 2025**: Initial Replit setup
  - Configured Node.js and http-server for static file serving
  - Set up workflow to run on port 5000
  - Configured static deployment settings
  - Created .gitignore for Node.js dependencies

## Project Architecture

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and vanilla JavaScript
- **Hosting**: Static file server (http-server via Node.js)
- **Cart System**: Client-side localStorage-based shopping cart

### Project Structure
```
/
├── index.html              # Homepage
├── style.css               # Shared CSS styles
├── cart.js                 # Shopping cart functionality
├── assets/                 # Images and media files
├── playstation/            # PlayStation console pages
├── xbox/                   # Xbox console pages
├── nintendo/               # Nintendo console pages
├── atari/                  # Atari console pages
├── sega/                   # Sega console pages
├── about.html              # About page
├── consoles.html           # Console overview
├── checkout.html           # Checkout page
├── contact.html            # Contact page
└── [other pages]           # Various info pages
```

### Key Features
1. **Shopping Cart**: Client-side cart using localStorage
2. **Multi-Console Support**: Dedicated sections for major gaming brands
3. **Responsive Design**: Modern CSS with Orbitron font and neon effects
4. **Product Listings**: Static product pages for various consoles and accessories

### Missing Assets
Some images referenced in the HTML are missing from the assets folder:
- ps2logo.png
- ps2-hdd-bracket.png
- ps2-laser.png
- ps2-fmcb.png
- PS2_BUNDLE_FRONT_UP.jpg
- playstation/playstation-logo.png

These do not prevent the site from functioning.

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
None specified yet.

## Notes
- The site uses localStorage for cart persistence, so cart data is stored in the browser
- No backend server or database is required
- All content is static HTML/CSS/JavaScript
