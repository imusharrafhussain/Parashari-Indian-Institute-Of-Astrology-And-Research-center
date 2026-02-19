# Parashari Indian Institute of Astrology & Research - Official Website

A professional, responsive educational website for Parashari Indian Institute built with pure HTML5, CSS3, and Vanilla JavaScript. No frameworks, no build tools—just clean, production-ready code.

## 🌟 Project Overview

This website serves as the complete digital presence for Parashari Institute, showcasing:
- **12 comprehensive pages** covering courses, admissions, gallery, and more
- **Responsive design** working seamlessly from mobile (320px) to desktop (1920px+)
- **Professional styling** with custom color scheme and typography
- **Interactive features** including forms, accordions, tabs, and floating buttons
- **Complete authentication** with login and registration pages
- **SEO-optimized** semantic HTML5 structure

## 📁 Folder Structure

```
AB_AI/
├── index.html                 # Homepage - Hero, courses, testimonials
├── profile.html               # About us - Mission, vision, faculty, achievements
├── courses.html               # All courses listing with pricing
├── astrology.html             # Vedic Astrology course details
├── palmistry.html             # Palmistry course with success stories
├── vastu.html                 # Vastu Shastra course
├── fee-structure.html         # Pricing table, payment options, scholarships
├── student-section.html       # Indian/International student programs
├── gallery.html               # Photo gallery of campus and events
├── contact.html               # Contact form and location details
├── login.html                 # Student login page
├── register.html              # Student registration form
├── README.md                  # This file
└── assets/
    ├── css/
    │   ├── main.css           # Core styling & design system (1,100+ lines)
    │   ├── navbar.css         # Navigation bar styles (270+ lines)
    │   ├── footer.css         # Footer styles (240+ lines)
    │   └── responsive.css     # Mobile/tablet breakpoints (380+ lines)
    ├── js/
    │   ├── main.js            # Core functionality (280+ lines)
    │   ├── navbar.js          # Mobile menu & nav (50+ lines)
    │   └── form-validation.js # Form validation (160+ lines)
    └── images/
        ├── logo/              # Logo assets
        ├── banners/           # Banner images
        ├── icons/             # Icon assets
        └── gallery/           # Gallery images
```

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup with proper heading hierarchy
- **CSS3** - Flexbox, Grid, Custom Properties (CSS Variables), Media Queries
- **Vanilla JavaScript** - No dependencies, no frameworks
- **Font Awesome** - Icon library (CDN)

### Key Features
- No build process required
- No npm/yarn dependencies
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- Progressive enhancement

## 📱 Responsive Breakpoints

The website is optimized for:
- **320px** - Small phones
- **480px** - Standard phones
- **600px** - Large phones/small tablets
- **768px** - Tablets
- **1024px+** - Desktop and larger screens

## 🎨 Design System

### Color Palette
```css
--primary-color: #8B5A3C      /* Brown - Primary brand color */
--secondary-color: #D4AF37    /* Gold - Accent color */
--dark-color: #2C3E50         /* Dark blue - Text */
--light-bg: #F5F3F0           /* Cream - Light background */
--danger-color: #E74C3C       /* Red - Error states */
--success-color: #27AE60      /* Green - Success states */
```

### Typography
- **Headings** - Georgia serif font
- **Body Text** - Segoe UI sans-serif
- **Line Height** - 1.6 for readability
- **Sizes** - 16px base with modular scale

### Spacing
CSS variables for consistent spacing rhythm (8px base unit):
- 0.5rem, 1rem, 1.5rem, 2rem, 2.5rem, 3rem, 3.5rem, 4rem

## 📄 Pages Overview

| Page | Purpose | Key Features |
|------|---------|--------------|
| **index.html** | Homepage | Hero section, course cards, testimonials, contact form |
| **profile.html** | About us | Mission/vision, faculty, achievements, stats |
| **courses.html** | Courses listing | All programs, pricing, enrollment buttons |
| **astrology.html** | Course detail | Vedic astrology curriculum, program details |
| **palmistry.html** | Course detail | Palmistry training, success stories |
| **vastu.html** | Course detail | Vastu Shastra course, benefits |
| **fee-structure.html** | Pricing | Complete pricing table, payment options, scholarships |
| **student-section.html** | Student info | Indian/International programs, FAQs |
| **gallery.html** | Gallery | Campus photos, events, student activities |
| **contact.html** | Contact | Contact form, address, phone, hours, location |
| **login.html** | Authentication | Student login form |
| **register.html** | Registration | Student signup form with validation |

## ✨ Key Features Implemented

### Navigation
- Sticky header with mobile hamburger menu
- Active link highlighting
- Smooth scroll to anchors with offset
- Mobile-responsive navigation drawer

### Forms
- **Client-side validation** for email, phone, password
- **Error message display** with styling
- **Password strength checking**
- **Confirm password verification**
- **All fields properly labeled**

### Interactive Elements
- **Accordion components** for FAQs
- **Tab system** for course details
- **Floating action buttons** (WhatsApp & Chat)
- **Lazy loading** for images (IntersectionObserver API)
- **Smooth animations** on scroll

### Accessibility
- Semantic HTML5 (`<header>`, `<nav>`, `<section>`, `<footer>`)
- Proper heading hierarchy (h1-h6)
- Alt text for all images
- Form labels linked to inputs
- Color contrast compliant

## 🚀 Installation & Setup

### No Build Step Required!
This is a static site—just clone and open in a browser.

```bash
# Clone the repository
git clone https://github.com/imusharrafhussain/Parashari-Indian-Institute-Of-Astrology-And-Research-center.git

# Navigate to the directory
cd AB_AI

# Open in browser (choose one)
# Option 1: Direct file open
open index.html

# Option 2: Simple HTTP server (Python 3)
python -m http.server 8000
# Then visit: http://localhost:8000

# Option 3: Simple HTTP server (Node.js)
npx http-server
```

## 📝 Customization Guide

### Changing Colors
Edit the `:root` variables in [assets/css/main.css](assets/css/main.css#L1-L20):

```css
:root {
  --primary-color: #8B5A3C;    /* Change this */
  --secondary-color: #D4AF37;  /* Change this */
  --dark-color: #2C3E50;       /* Change this */
  /* ... more variables ... */
}
```

All colors throughout the site update automatically!

### Updating Content
Simply edit the HTML files with a text editor:
- Course titles and descriptions in [courses.html](courses.html)
- Contact info in [contact.html](contact.html)
- Testimonials in [palmistry.html](palmistry.html)
- Pricing in [fee-structure.html](fee-structure.html)

### Adding New Pages
1. Create new `.html` file
2. Copy navigation from any existing page
3. Maintain same structure for consistency
4. Link from navigation menu in all pages

### Custom Images
- Replace placeholder URLs (unsplash.com) with real images
- Add images to appropriate `assets/images/` subdirectory
- Update `src` attributes in HTML files

## 📦 CSS File Descriptions

### main.css (Core Styling)
- CSS custom properties (colors, spacing, typography)
- Base element styles
- Button variants (.btn-primary, .btn-secondary, etc.)
- Card component system
- Grid layout (2-4 columns responsive)
- Utility classes (spacing, text alignment, colors)
- Animations and transitions

### navbar.css (Navigation)
- Sticky header positioning
- Mobile hamburger menu with animation
- Navigation link styling and hover effects
- Header top information bar
- Mobile drawer menu

### footer.css (Footer)
- 4-column footer grid (responsive)
- Social media links
- Contact information section
- Copyright and credits
- Footer collapse on mobile

### responsive.css (Mobile Optimization)
- 5 breakpoint media queries
- Font size adjustments for mobile
- Grid column adjustments
- Padding/margin reductions
- Orientation (landscape) handling
- Print styles

## 🔧 JavaScript File Descriptions

### main.js (Core Functionality)
- `initSmoothScroll()` - Smooth anchor navigation (80px header offset)
- `initLazyLoading()` - IntersectionObserver for lazy image loading
- `initScrollAnimations()` - Fade-in animations on scroll
- `initTabs()` - Tab system for course details
- `initAccordion()` - Expandable FAQ sections
- `initFloatingButtons()` - WhatsApp and chat buttons
- Utility functions: `formatCurrency()`, `formatPhoneNumber()`, `getQueryParam()`, `debounce()`

### navbar.js (Navigation)
- Mobile hamburger menu toggle
- Navigation drawer click handling
- Click outside to close menu
- Active link detection and highlighting
- Auto-close menu when link clicked

### form-validation.js (Form Handling)
- `FormValidator` class with validation methods
- Email regex validation
- Phone number validation
- Password strength checking (minimum 8 chars)
- Password match verification
- Real-time error display
- Form submission handling

## 🌐 Deployment to Render

### Step 1: Create Render Account
Visit [render.com](https://render.com) and sign up

### Step 2: Connect GitHub Repository
1. Dashboard → New → Static Site
2. Connect GitHub account
3. Select repository: `Parashari-Indian-Institute-Of-Astrology-And-Research-center`
4. Select branch: `main`

### Step 3: Configure Deployment
- **Root Directory**: `/AB_AI` (if site is in subdirectory) or `/` (if at root)
- **Build Command**: Leave empty (static site)
- **Publish Directory**: `.` or `/`

### Step 4: Deploy
- Click "Create Static Site"
- Render builds and deploys automatically
- Your live URL: `https://your-site.onrender.com`

### Environment Variables
None required for static site.

## 💾 Git Workflow

```bash
# Initialize repository (if not already done)
git init
git remote add origin https://github.com/imusharrafhussain/Parashari-Indian-Institute-Of-Astrology-And-Research-center.git

# Create feature branches
git checkout -b feature/new-page

# Commit changes
git add .
git commit -m "Add gallery page with campus photos"

# Push to GitHub
git push origin feature/new-page

# Merge to main
git checkout main
git pull origin main
git merge feature/new-page
git push origin main
```

## 📊 Performance Metrics

- **Zero JavaScript dependencies** - No vendor lock-in
- **CSS Variables only** - No preprocessor needed
- **Lazy loading implemented** - Reduces initial load time
- **Semantic HTML** - Better SEO and browser support
- **No heavy frameworks** - Faster initial load
- **Mobile-first approach** - Progressive enhancement

## 🔒 Security Notes

### Current Implementation
- Client-side form validation (user experience)
- HTML5 input validation
- No sensitive data handling

### For Production
Add these when deploying:
1. **Server-side validation** - Always validate on backend
2. **HTTPS** - Enable SSL/TLS on Render (automatic)
3. **Backend API** - Create endpoints to handle:
   - Form submissions
   - User registration
   - Login authentication
   - Database storage
4. **CORS headers** - If using external APIs
5. **Rate limiting** - Prevent form spam

## 📞 Contact & Support

**Institute Details**
- Phone: +91 9999-999-999
- Email: info@parashari.com
- Address: 123 Vedic Street, Delhi 110001

**Developer Support**
- See [contact.html](contact.html) page

## 📜 License

All content copyright © 2024 Parashari Institute. All rights reserved.

---

## 🚀 Live Site

**Current Status**: Ready for deployment

**Next Steps**:
1. Replace placeholder images with real institute photos
2. Update contact information and pricing
3. Add server-side form handling
4. Deploy to Render
5. Set up domain name (optional)

---

**Built with ❤️ for Parashari Institute**

*Preserving and promoting authentic Vedic wisdom since 1998*
