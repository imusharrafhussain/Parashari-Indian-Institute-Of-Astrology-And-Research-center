/**
 * courses-data.js
 * Data source for the Explore section course cards.
 *
 * isCategory values and their meaning:
 * ─────────────────────────────────────────────────────
 *  "Crash Course"  → Beginner   (entry-level programs)
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
        title: "Vedic Astrology (Jyotish)",
        isCategory: "Diploma",
        icon: '<i class="fa-solid fa-om"></i>',
        image: "assets/images-optimized/aries-card.webp",
        description: "Master the ancient science of Vedic Astrology. Learn natal charts, planetary movements, and predictions.",
        price: "₹4,199",
        badges: ["✓ Certification", "Online Available"],
        link: "astrology.html"
    },
    {
        id: 2,
        title: "Nadi Jyotish",
        isCategory: "Crash Course",   // Beginner
        icon: '<i class="fa-solid fa-scroll"></i>',
        image: "assets/images-optimized/Nadi Jyotish.webp",
        description: "Learn precise prediction techniques using Nadi astrology principles and leaf reading concepts.",
        price: "₹2,999",
        badges: ["✓ Certification"],
        link: "crash-courses/cc-nadi-astrology.html"
    },
    {
        id: 3,
        title: "Palmistry (Chirognomy & Chiromancy)",
        isCategory: "Diploma",
        icon: '<i class="fa-solid fa-hand-sparkles"></i>',
        image: "assets/images-optimized/crash-courses/PALMSTRY.webp",
        description: "Decode destiny through palm lines and understand personality traits.",
        price: "₹4,199",
        badges: ["✓ Certification"],
        link: "palmistry.html"
    },

    // ── DIPLOMA (Popular) ────────────────────────────────────────────────────
    {
        id: 4,
        title: "Lal Kitab",
        isCategory: "Diploma",        // Popular
        icon: '<i class="fa-solid fa-book-journal-whills"></i>',
        image: "assets/images-optimized/crash-courses/lal kitab.webp",
        description: "Simple yet effective remedies for complex life problems using the wisdom of Lal Kitab.",
        price: "₹4,199",
        badges: ["✓ Certification"],
        link: "lal-kitab.html"
    },
    {
        id: 5,
        title: "Gemstone Science (Ratna Vigyan)",
        isCategory: "Diploma",        // Popular
        icon: '<i class="fa-regular fa-gem"></i>',
        image: "assets/images-optimized/gemstone.webp",
        description: "Master the science of gemstones and their impact on human life and destiny.",
        price: "₹4,199",
        badges: ["✓ Diploma"],
        link: "complete-astrology.html"
    },
    {
        id: 6,
        title: "Tarot Reading",
        isCategory: "Diploma",        // Popular
        icon: '<i class="fa-solid fa-layer-group"></i>',
        image: "assets/images-optimized/gemini-card.webp",
        description: "Unlock intuitive guidance and future predictions using Tarot cards.",
        price: "₹4,199",
        badges: ["✓ Certification"],
        link: "tarot.html"
    },

    // ── BACHELOR (Pro) ───────────────────────────────────────────────────────
    {
        id: 7,
        title: "KP Astrology (Krishnamurti Padhdhati)",
        isCategory: "Diploma",
        icon: '<i class="fa-solid fa-star"></i>',
        image: "assets/images-optimized/leo-card.webp",
        description: "Krishnamurti Paddhati system for pinpoint accuracy in timing events and predictions.",
        price: "₹4,199",
        badges: ["✓ Certification"],
        link: "kp-astrology.html"
    },
    {
        id: 8,
        title: "Vastu Shastra",
        isCategory: "Diploma",
        icon: '<i class="fa-solid fa-house-chimney"></i>',
        image: "assets/images-optimized/aquarius-card.webp",
        description: "Transform your space. Learn the principles of Vastu for prosperity, health, and harmony.",
        price: "₹4,199",
        badges: ["✓ Certification", "Projects Included"],
        link: "vastu.html"
    },
    {
        id: 9,
        title: "Numerology (Pythagorean & Chaldean)",
        isCategory: "Diploma",
        icon: '<i class="fa-solid fa-hashtag"></i>',
        image: "assets/images-optimized/virgo-card.webp",
        description: "Numerology studies how numbers connected to your name and birthdate reveal personality, life path, and opportunities.",
        price: "₹4,199",
        badges: ["✓ Certification"],
        link: "numerology.html"
    },

    // ── MASTER (Advanced) ────────────────────────────────────────────────────
    {
        id: 10,
        title: "Remedy Course",
        isCategory: "Diploma",
        icon: '<i class="fa-solid fa-om"></i>',
        image: "assets/images-optimized/cancer-card.webp",
        description: "Comprehensive training on effective astrological remedies for health, wealth, and relationships.",
        price: "₹4,199",
        badges: ["✓ Certification", "Diploma Level"],
        link: "remedy-course.html"
    },
    {
        id: 11,
        title: "Medical Astrology",
        isCategory: "Crash Course",         // Relocated
        icon: '<i class="fa-solid fa-staff-snake"></i>',
        image: "assets/images-optimized/crash-courses/medical astrology.webp",
        description: "Diagnose potential health issues and find ayurvedic remedies through planetary positions.",
        price: "₹2,999",
        badges: ["✓ Certification"],
        link: "medical-astrology.html"
    },
    {
        id: 12,
        title: "Face Reading (Physiognomy)",
        isCategory: "Diploma",
        icon: '<i class="fa-solid fa-user"></i>',
        image: "assets/images-optimized/crash-courses/face reading.webp",
        description: "Master the art of physiognomy to read character and fortune from facial features.",
        price: "₹4,199",
        badges: ["✓ Certification"],
        link: "face-reading.html"
    },

    // ── GRAND MASTER (Elite) ─────────────────────────────────────────────────
    {
        id: 13,
        title: "BNN Advanced",
        isCategory: "Hidden",   // Elite
        icon: '<i class="fa-solid fa-magnifying-glass"></i>',
        image: "assets/images-optimized/crash-courses/bnn.webp",
        description: "Bhrigu Nandi Nadi advanced predictive techniques for professional astrologers.",
        price: "₹24,999",
        badges: ["✓ Advanced"],
        link: "bnn-astrology.html"
    },
    {
        id: 14,
        title: "Rudraksha Remedies",
        isCategory: "Hidden",   // Elite
        icon: '<i class="fa-solid fa-om"></i>',
        image: "assets/images-optimized/capricorn-card.webp",
        description: "Understand the power of different Mukhi Rudrakshas and their therapeutic benefits.",
        price: "₹24,999",
        badges: ["✓ Certification"],
        link: "rudraksha.html"
    },
    {
        id: 15,
        title: "1-on-1 Mentorship",
        isCategory: "Hidden",   // Elite
        icon: '<i class="fa-solid fa-handshake-angle"></i>',
        image: "assets/images-optimized/libra-card.webp",
        description: "Personalized guidance and advanced training with expert gurus for serious learners.",
        price: "Contact Us",
        badges: ["Personalized"],
        link: "contact.html"
    },
    // ── BACHELOR (Pro) Restructured ──────────────────────────────────────────
    {
        id: 16,
        title: "Vedic Astrology (Jyotish)",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-om"></i>',
        image: "Education/Bach/vedic Astrology 1.webp",
        description: "Advanced professional program in Vedic Astrology. Deep dive into predictive techniques.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "astrology.html"
    },
    {
        id: 17,
        title: "Numerology (Pythagorean & Chaldean)",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-hashtag"></i>',
        image: "Education/Bach/Numerology.webp",
        description: "Professional Numerology certification covering advanced calculations and analysis.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "numerology.html"
    },
    {
        id: 18,
        title: "KP Astrology (Krishnamurti Padhdhati)",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-star"></i>',
        image: "Education/Bach/KP Astrology.webp",
        description: "Timing of events and advanced prediction using the KP system at a professional level.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "kp-astrology.html"
    },
    {
        id: 19,
        title: "Gemstone Science (Ratna Vigyan)",
        isCategory: "Bachelor",
        icon: '<i class="fa-regular fa-gem"></i>',
        image: "Education/Bach/gemstone Science.webp",
        description: "Scientific study of gemstones and their advanced applications in human life.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "complete-astrology.html"
    },
    {
        id: 20,
        title: "Vastu Shastra",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-house-chimney"></i>',
        image: "Education/Bach/Vastu Sastra.webp",
        description: "Comprehensive professional training in Vastu principles for large-scale projects.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "vastu.html"
    },
    {
        id: 21,
        title: "Lal Kitab",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-book-journal-whills"></i>',
        image: "Education/Bach/Lal Kitab.webp",
        description: "In-depth study of Lal Kitab remedies and their professional application.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "lal-kitab.html"
    },
    {
        id: 22,
        title: "Face Reading (Physiognomy)",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-user"></i>',
        image: "Education/Bach/Face Reading.webp",
        description: "Expert level character analysis and fortune telling through facial features.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "face-reading.html"
    },
    {
        id: 23,
        title: "Reiki Healing",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-hands-holding-circle"></i>',
        image: "Education/Bach/Reiki Healing.webp",
        description: "Professional level Reiki certification for advanced practitioners.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "reiki.html"
    },
    {
        id: 24,
        title: "Tarot Reading",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-layer-group"></i>',
        image: "Education/Bach/vedic Astrology 2.webp",
        description: "Professional grade intuitive guidance and advanced predictive tarot mastery.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "tarot.html"
    },
    {
        id: 25,
        title: "Nakshatra (Lunar Mansions) 1",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-star-half-stroke"></i>',
        image: "Education/Bach/Nakshtra.webp",
        description: "In-depth research and professional application of Lunar Mansions in astrology.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "nakshatra.html"
    },
    {
        id: 26,
        title: "Crystal Rudraksha",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-gem"></i>',
        image: "Education/Bach/Rudraksh.webp",
        description: "Scientific and professional combination of crystals and rudrakshas for healing.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "crystal-healing.html"
    },
    {
        id: 27,
        title: "Palmistry (Chirognomy & Chiromancy)",
        isCategory: "Bachelor",
        icon: '<i class="fa-solid fa-hand-sparkles"></i>',
        image: "Education/Bach/Palmistry.webp",
        description: "Comprehensive professional level palmistry including line analysis and personality traits.",
        price: "₹8,999",
        badges: ["✓ Certification", "Pro Level"],
        link: "palmistry.html"
    },
    {
        id: 28,
        title: "Feng Shui",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-torii-gate"></i>',
        image: "assets/images-optimized/crash-courses/feng shui.webp",
        description: "Learn the art of placement and flow of energy (Qi) to improve life harmony.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-feng-shui.html"
    },
    {
        id: 29,
        title: "Numerology (Pythagorean & Chaldean)",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-hashtag"></i>',
        image: "assets/images-optimized/numerology-new.webp",
        description: "Master level numerology covering deep Pythagorean and Chaldean systems.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "numerology.html"
    },
    {
        id: 30,
        title: "Vedic Astrology (Jyotish)",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-om"></i>',
        image: "assets/images-optimized/vedic-astrology-new.webp",
        description: "Expert level Vedic Astrology with advanced predictive techniques.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "astrology.html"
    },
    {
        id: 31,
        title: "KP Astrology (Krishnamurti Padhdhati)",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-star"></i>',
        image: "assets/images-optimized/kp-astrology-new.webp",
        description: "Advanced KP Astrology for pinpoint outcome timing and event analysis.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "kp-astrology.html"
    },
    {
        id: 32,
        title: "Gemstone Science (Ratna Vigyan)",
        isCategory: "Master",
        icon: '<i class="fa-regular fa-gem"></i>',
        image: "assets/images-optimized/gemstone.webp",
        description: "In-depth study of gemstone vibrations and therapeutic planetary correlations.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "complete-astrology.html"
    },
    {
        id: 33,
        title: "Vastu Shastra",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-house-chimney"></i>',
        image: "assets/images-optimized/vastu-new.webp",
        description: "Advanced Vastu principles for industrial, commercial and residential planning.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "vastu.html"
    },
    {
        id: 34,
        title: "Lal Kitab",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-book-journal-whills"></i>',
        image: "assets/images-optimized/crash-courses/lal kitab.webp",
        description: "Mastering complex Lal Kitab remedies and horoscope analysis.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "lal-kitab.html"
    },
    {
        id: 35,
        title: "Face Reading (Physiognomy)",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-user"></i>',
        image: "assets/images-optimized/crash-courses/face reading.webp",
        description: "Advanced face reading techniques to identify subtle character traits.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "face-reading.html"
    },
    {
        id: 36,
        title: "Healing",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-hands-holding-circle"></i>',
        image: "assets/images-optimized/crash-courses/healing.webp",
        description: "Foundational course on energy healing, chakra balancing and spiritual wellness.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-healing.html"
    },
    {
        id: 37,
        title: "Tarot Reading",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-layer-group"></i>',
        image: "assets/images-optimized/tarot-new.webp",
        description: "Intuitive Master level Tarot reading and spread interpretations.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "tarot.html"
    },
    {
        id: 38,
        title: "Nakshatra (Lunar Mansions)",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-star-half-stroke"></i>',
        image: "assets/images-optimized/gold_zodiac_wheel.webp",
        description: "Deep research into the 27 Nakshatras and their specific life impacts.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "nakshatra.html"
    },
    {
        id: 39,
        title: "Crystal Rudraksha",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-gem"></i>',
        image: "assets/images-optimized/crystal-healing-new.webp",
        description: "Advanced usage of crystals and Rudraksha for planetary remediation.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "crystal-healing.html"
    },
    {
        id: 40,
        title: "Palmistry (Chirognomy & Chiromancy)",
        isCategory: "Master",
        icon: '<i class="fa-solid fa-hand-sparkles"></i>',
        image: "assets/images-optimized/crash-courses/PALMSTRY.webp",
        description: "Advanced palmistry including complex line variants and hand psychology.",
        price: "₹18,699",
        badges: ["✓ Certification", "Advanced Tier"],
        link: "palmistry.html"
    },
    // ── CRASH COURSE (Beginner) POPULATION ───────────────────────────────────
    {
        id: 41,
        title: "Past Life Regression Theory (PLRT)",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-hourglass-half"></i>',
        image: "assets/images-optimized/crash-courses/PAST LIFE-1.webp",
        description: "Explore the theoretical foundations of past life regression and soul journey principles.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "archive/plrt.html"
    },
    {
        id: 42,
        title: "Bhoomi Vastu & Prasada Vastu",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-house-chimney"></i>',
        image: "assets/images-optimized/vastu-new.webp",
        description: "Learn site energetics and architectural integration principles for harmonic living.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-bhoomi-vastu.html"
    },
    {
        id: 43,
        title: "Palmistry",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-hand-sparkles"></i>',
        image: "assets/images-optimized/crash-courses/PALMSTRY.webp",
        description: "Understanding personality and character analysis through palmistry techniques.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-modern-western-palmistry.html"
    },
    {
        id: 44,
        title: "Mobile Numerology",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-mobile-screen"></i>',
        image: "assets/images-optimized/crash-courses/mobile numerology.webp",
        description: "Decode the impact of mobile numbers on luck, professional success and personal life.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-mobile-numerology.html"
    },
    {
        id: 45,
        title: "Face Reading",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-user"></i>',
        image: "assets/images-optimized/crash-courses/face reading.webp",
        description: "Learn systematic character analysis and behavioral profiling through facial features.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-face-reading.html"
    },
    {
        id: 46,
        title: "Financial Astrology (Artha)",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-chart-line"></i>',
        image: "assets/images-optimized/crash-courses/financial astrology.webp",
        description: "Introductory course on identifying financial potential and wealth cycles in birth charts.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-financial-astrology.html"
    },
    {
        id: 47,
        title: "Lal Kitab Basics",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-book-journal-whills"></i>',
        image: "assets/images-optimized/crash-courses/lal kitab.webp",
        description: "Foundational principles of Lal Kitab and its unique approach to astrological remedies.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-lal-kitab.html"
    },
    {
        id: 48,
        title: "The BNN Intensive",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-magnifying-glass"></i>',
        image: "assets/images-optimized/crash-courses/bnn.webp",
        description: "Intensive training on the Bhrigu Nandi Nadi system for rapid and accurate predictions.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-bnn-intensive.html"
    },
    {
        id: 49,
        title: "Modern Career Astrology",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-briefcase"></i>',
        image: "assets/images-optimized/crash-courses/modern career astro.webp",
        description: "Astrological guidance for modern professions, career planning, and timing of success.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-modern-career-astrology.html"
    },
    {
        id: 50,
        title: "Business Numerology",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-building"></i>',
        image: "assets/images-optimized/Business Numerology.webp",
        description: "Optimizing business names, brand identities and timing for commercial success.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-business-numerology.html"
    },
    {
        id: 51,
        title: "Vedic Numerology",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-hashtag"></i>',
        image: "assets/images-optimized/Vedic Numerology.webp",
        description: "Traditional Indian numerological systems for understanding destiny and life path.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-vedic-numerology.html"
    },
    {
        id: 52,
        title: "Medical Astrology",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-staff-snake"></i>',
        image: "assets/images-optimized/crash-courses/medical astrology.webp",
        description: "Analyze health alignments and chart-based disease predictions using Medical Astrology.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-medical-astrology.html"
    },
    {
        id: 53,
        title: "Jaimini Astrology",
        isCategory: "Crash Course",
        icon: '<i class="fa-solid fa-users"></i>',
        image: "assets/images-optimized/gemini-card.webp",
        description: "Master the principles of Jaimini Astrology, karakas, and distinct predictive dashas.",
        price: "₹2,999",
        badges: ["✓ Certification", "Beginner Tier"],
        link: "crash-courses/cc-jaimini-astrology.html"
    }
];

/**
 * Category meta-information
 * Maps each isCategory value to its badge label and style tier.
 */
const categoryMeta = {
    "Crash Course": { label: "Beginner", tier: 1, color: "#4CAF50" },
    "Diploma": { label: "Popular", tier: 2, color: "#2196F3" },
    "Bachelor": { label: "Pro", tier: 3, color: "#9C27B0" },
    "Master": { label: "Advanced", tier: 4, color: "#FF9800" },
    "Grand Master": { label: "Elite", tier: 5, color: "#c8960c" }
};
