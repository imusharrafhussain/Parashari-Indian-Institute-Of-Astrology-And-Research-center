# Image Setup Instructions

## Zodiac Wheel Background Image

The hero section on the home page (index.html) is now configured to use a zodiac wheel background image.

### Where to place the image:
- **Path**: `assets/images/zodiac-wheel.jpg`
- **Location**: Save the image file in the `assets/images/` directory

### Image Requirements:
- **Filename**: zodiac-wheel.jpg (or update the CSS if using a different name)
- **Recommended Size**: 1920x1080px or larger for high quality
- **Format**: JPG or PNG
- **File Size**: Keep under 500KB for optimal loading

### CSS Location:
The background image styling is defined in `assets/css/main.css` with the class `.hero-with-bg`

### Current Setup:
- The image has a semi-transparent dark overlay (50% opacity black) for better text readability
- The section is 700px tall on desktop (400px on mobile)
- Text is centered with text-shadow for contrast
- Background is fixed on scroll for parallax effect

### To use this:
1. Download or save the zodiac wheel image
2. Save it as `zodiac-wheel.jpg` in the `assets/images/` directory
3. The home page will automatically display it behind the "Unlock Your Cosmic Destiny" heading
