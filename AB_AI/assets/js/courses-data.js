/**
 * courses-data.js
 * Data source for the Explore section course cards.
 *
 * isCategory values and their meaning:
 * ─────────────────────────────────────────────────────
 *  "Intro Course"  → Beginner   (entry-level programs)
 *  "Diploma"       → Popular    (most-enrolled programs)
 *  "Bachelor"      → Pro        (professional programs)
 *  "Master"        → Advanced   (advanced programs)
 *  "Grand Master"  → Elite      (highest-level programs)
 * ─────────────────────────────────────────────────────
 *
 * Distribution: 3 courses per category × 5 categories = 15 courses total
 */

const coursesData = [

    // ── INTRO COURSE (Beginner) ──────────────────────────────────────────────
    {
        id: 1,
        title: "Vedic Astrology",
        isCategory: "Intro Course",   // Beginner
        icon: "♈",
        image: "assets/images/aries-card.png",
        description: "Master the ancient science of Vedic Astrology. Learn natal charts, planetary movements, and predictions.",
        price: "₹5,999",
        badges: ["✓ Certification", "Online Available"],
        link: "astrology.html"
    },
    {
        id: 2,
        title: "Nadi Jyotish",
        isCategory: "Intro Course",   // Beginner
        icon: "📜",
        image: "assets/images/taurus-card.png",
        description: "Learn precise prediction techniques using Nadi astrology principles and leaf reading concepts.",
        price: "₹5,999",
        badges: ["✓ Certification"],
        link: "nadi-jyotish.html"
    },
    {
        id: 3,
        title: "Palmistry",
        isCategory: "Intro Course",   // Beginner
        icon: "✋",
        image: "assets/images/pisces-card.png",
        description: "Decode destiny through palm lines and understand personality traits.",
        price: "₹3,999",
        badges: ["✓ Certification"],
        link: "palmistry.html"
    },

    // ── DIPLOMA (Popular) ────────────────────────────────────────────────────
    {
        id: 4,
        title: "Lal Kitab Remedies",
        isCategory: "Diploma",        // Popular
        icon: "📕",
        image: "assets/images/gemini-card.png",
        description: "Simple yet effective remedies for complex life problems using the wisdom of Lal Kitab.",
        price: "₹18,000",
        badges: ["✓ Certification"],
        link: "lal-kitab.html"
    },
    {
        id: 5,
        title: "Complete Astrology",
        isCategory: "Diploma",        // Popular
        icon: "🎓",
        image: "assets/images/sagittarius-card.png",
        description: "From beginner to professional level — comprehensive diploma in Vedic sciences.",
        price: "₹13,000",
        badges: ["✓ Diploma"],
        link: "complete-astrology.html"
    },
    {
        id: 6,
        title: "Tarot Reading",
        isCategory: "Diploma",        // Popular
        icon: "🃏",
        image: "assets/images/gemini-card.png",
        description: "Unlock intuitive guidance and future predictions using Tarot cards.",
        price: "₹2,999",
        badges: ["✓ Certification"],
        link: "tarot.html"
    },

    // ── BACHELOR (Pro) ───────────────────────────────────────────────────────
    {
        id: 7,
        title: "KP Astrology",
        isCategory: "Bachelor",       // Pro
        icon: "⭐",
        image: "assets/images/leo-card.png",
        description: "Krishnamurti Paddhati system for pinpoint accuracy in timing events and predictions.",
        price: "₹14,000",
        badges: ["✓ Certification"],
        link: "kp-astrology.html"
    },
    {
        id: 8,
        title: "Vastu Shastra",
        isCategory: "Bachelor",       // Pro
        icon: "🏠",
        image: "assets/images/aquarius-card.png",
        description: "Transform your space. Learn the principles of Vastu for prosperity, health, and harmony.",
        price: "₹2,999",
        badges: ["✓ Certification", "Projects Included"],
        link: "vastu.html"
    },
    {
        id: 9,
        title: "Numerology",
        isCategory: "Bachelor",       // Pro
        icon: "🔢",
        image: "assets/images/virgo-card.jpg",
        description: "Discover the mystical relationship between numbers and life events.",
        price: "₹3,999",
        badges: ["✓ Certification"],
        link: "numerology.html"
    },

    // ── MASTER (Advanced) ────────────────────────────────────────────────────
    {
        id: 10,
        title: "Remedy Course",
        isCategory: "Master",         // Advanced
        icon: "🕉️",
        image: "assets/images/cancer-card.png",
        description: "Comprehensive training on effective astrological remedies for health, wealth, and relationships.",
        price: "₹12,000",
        badges: ["✓ Certification"],
        link: "remedy-course.html"
    },
    {
        id: 11,
        title: "Medical Astrology",
        isCategory: "Master",         // Advanced
        icon: "⚕️",
        image: "assets/images/scorpio-card.png",
        description: "Diagnose potential health issues and find ayurvedic remedies through planetary positions.",
        price: "₹9,000",
        badges: ["✓ Certification"],
        link: "medical-astrology.html"
    },
    {
        id: 12,
        title: "Face Reading",
        isCategory: "Master",         // Advanced
        icon: "👤",
        image: "assets/images/aries-card.png",
        description: "Master the art of physiognomy to read character and fortune from facial features.",
        price: "₹8,000",
        badges: ["✓ Certification"],
        link: "face-reading.html"
    },

    // ── GRAND MASTER (Elite) ─────────────────────────────────────────────────
    {
        id: 13,
        title: "BNN Advanced",
        isCategory: "Grand Master",   // Elite
        icon: "🔍",
        image: "assets/images/virgo-card.jpg",
        description: "Bhrigu Nandi Nadi advanced predictive techniques for professional astrologers.",
        price: "₹15,000",
        badges: ["✓ Advanced"],
        link: "bnn-astrology.html"
    },
    {
        id: 14,
        title: "Rudraksha Remedies",
        isCategory: "Grand Master",   // Elite
        icon: "📿",
        image: "assets/images/capricorn-card.png",
        description: "Understand the power of different Mukhi Rudrakshas and their therapeutic benefits.",
        price: "₹35,000",
        badges: ["✓ Certification"],
        link: "rudraksha.html"
    },
    {
        id: 15,
        title: "1-on-1 Mentorship",
        isCategory: "Grand Master",   // Elite
        icon: "🤝",
        image: "assets/images/libra-card.png",
        description: "Personalized guidance and advanced training with expert gurus for serious learners.",
        price: "Contact Us",
        badges: ["Personalized"],
        link: "contact.html"
    }

];

/**
 * Category meta-information
 * Maps each isCategory value to its badge label and style tier.
 */
const categoryMeta = {
    "Intro Course": { label: "Beginner", tier: 1, color: "#4CAF50" },
    "Diploma": { label: "Popular", tier: 2, color: "#2196F3" },
    "Bachelor": { label: "Pro", tier: 3, color: "#9C27B0" },
    "Master": { label: "Advanced", tier: 4, color: "#FF9800" },
    "Grand Master": { label: "Elite", tier: 5, color: "#c8960c" }
};
