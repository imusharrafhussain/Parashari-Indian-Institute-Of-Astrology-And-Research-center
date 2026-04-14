/**
 * Level Detail Page — Dynamic Data Engine
 * Powers the premium level-detail.html template
 * URL: level-detail.html?course=vedic-astrology&level=masters
 */

const LEVEL_DATA = {

  // ═══════════════════════════════════════════════════
  // VEDIC ASTROLOGY
  // ═══════════════════════════════════════════════════
  "vedic-astrology": {
    courseName: "Vedic Astrology",
    courseSlug: "vedic-astrology",
    pageFile: "astrology.html",
    image: "assets/images-optimized/Picture3.webp",
    levels: {
      diploma: {
        name: "Diploma",
        position: "The Foundation",
        icon: "fa-book-open",
        badge: "",
        headline: "Build an Unshakeable Foundation in Vedic Astrology",
        hook: "Move beyond guesswork into structured cosmic understanding.",
        oldPrice: "₹5,499", newPrice: "₹4,199", duration: "8 Weeks",
        cta: "Start Your Foundation",
        outcomes: [
          "Read a birth chart (Kundli) with clarity and confidence",
          "Identify planetary strengths and weaknesses in any horoscope",
          "Understand the 12 houses and their real-life significance",
          "Explain timing patterns using the Vimshottari Dasha system"
        ],
        modules: [
          { title: "Cosmic Mechanics", weeks: "Week 1–2", lessons: ["Fundamentals of Astronomy & Astrology", "Grahas (Planets) — Nature, Strength & Behavior", "Rashis (Zodiac Signs) — Classification & Qualities"] },
          { title: "Planetary Dynamics", weeks: "Week 3–4", lessons: ["Shadbala — The Six-Fold Planetary Strength", "Functional Benefics vs Malefics by Ascendant", "Planetary Friendships & Enmities"] },
          { title: "Temporal Timing", weeks: "Week 5–6", lessons: ["Vimshottari Dasha — Life-Cycle Sequencing", "Gochar (Transits) — Pinpointing Events", "Combining Dashas & Transits for Prediction"] },
          { title: "Chart Synthesis", weeks: "Week 7–8", lessons: ["Career, Marriage & Health Analysis", "Basic Remedial Measures", "Practical Chart Reading Sessions"] }
        ],
        caseStudy: {
          scenario: "A 25-year-old asks: 'When will I get my first job?'",
          steps: ["Identify the 10th house lord and its placement", "Check the Dasha period running at the current age", "Analyze Saturn's transit over the 10th house"],
          insight: "At the Diploma level, you learn to connect these three data points to give a structured, logical answer — not a guess."
        },
        diffTitle: "Your Entry Point",
        diffPoints: [
          "Structured, no-overwhelm introduction to Jyotish",
          "Covers the essential 4 modules needed for basic reading",
          "Government-approved certification upon completion",
          "Perfect for personal use and self-understanding"
        ],
        applications: [
          "Understand your own birth chart deeply",
          "Read charts for family members with basic accuracy",
          "Make informed decisions about timing (career, education)",
          "Build a strong base for advanced study"
        ]
      },
      bachelors: {
        name: "Bachelors",
        position: "The Practitioner",
        icon: "fa-chart-pie",
        badge: "Smart Choice",
        headline: "Transition from Theory to Real-World Prediction",
        hook: "Stop studying astrology. Start practicing it.",
        oldPrice: "₹11,999", newPrice: "₹8,999", duration: "12 Weeks",
        cta: "Step Into Practice",
        outcomes: [
          "Predict real-life events using multiple Dasha systems",
          "Analyze Divisional Charts (D-9, D-10) for marriage and career",
          "Quantify planetary power using the Ashtakvarga system",
          "Apply practical remedies (Mantras, Yantras) with understanding",
          "Offer structured readings to friends and acquaintances"
        ],
        modules: [
          { title: "Siddhanta & Mathematics", weeks: "Week 1–2", lessons: ["Astronomical Foundations of Jyotish", "Calculating Planetary Longitudes", "Mathematical Horoscope Construction"] },
          { title: "Graha & Rashi Analysis", weeks: "Week 3–4", lessons: ["Shadbala & Dig Bala Deep-Dive", "Planetary Avasthas (States)", "Sign-Based Behavioral Modifications"] },
          { title: "Advanced Dasha Systems", weeks: "Week 5–7", lessons: ["Yogini Dasha for Quick Predictions", "Jaimini's Chara Dasha System", "Multi-Layered Predictive Timing"] },
          { title: "Varga Charts", weeks: "Week 8–9", lessons: ["Navamsha (D-9) for Marriage & Fruitage", "Dashamsha (D-10) for Career & Status", "Cross-Referencing Varga with Rashi"] },
          { title: "Ashtakvarga & Transits", weeks: "Week 10–11", lessons: ["Point System for Planetary Power", "Transit Analysis with Ashtakvarga", "Pinpointing Exact Timing of Events"] },
          { title: "Remedial Jyotish", weeks: "Week 12", lessons: ["Mantra Prescription Methodology", "Yantra Selection & Activation", "Muhurta Basics for Remedies"] }
        ],
        caseStudy: {
          scenario: "A married couple asks: 'Will we face separation this year?'",
          steps: ["Analyze the 7th house lord in both Rashi and Navamsha (D-9)", "Check the running Dasha antardasha for relationship triggers", "Apply Ashtakvarga bindus to the 7th house during current transit", "Cross-validate with Yogini Dasha for timing confirmation"],
          insight: "At the Bachelors level, you don't just see the problem — you triangulate it across multiple systems to give a precise, confident answer."
        },
        diffTitle: "What Diploma Doesn't Cover",
        diffPoints: [
          "Advanced Dasha systems beyond basic Vimshottari",
          "Divisional chart analysis (D-9, D-10) for specialized prediction",
          "Ashtakvarga quantification — numbers, not guesswork",
          "Practical remedy prescription with Mantras & Yantras",
          "Real case study practice with structured feedback"
        ],
        applications: [
          "Offer confident readings to friends, family, and acquaintances",
          "Predict career changes, marriage timing, and financial shifts",
          "Begin building a small advisory practice",
          "Apply remedies for yourself and close ones"
        ]
      },
      masters: {
        name: "Masters",
        position: "The Advanced Guide",
        icon: "fa-compass",
        badge: "Most Popular",
        headline: "Build Real Expertise That Commands Respect",
        hook: "The difference between reading a chart and truly understanding a life.",
        oldPrice: "₹24,999", newPrice: "₹18,699", duration: "16 Weeks",
        cta: "Build Real Expertise",
        outcomes: [
          "Synthesize multiple predictive systems into a unified reading",
          "Navigate all 16 Shodashvarga divisional charts with precision",
          "Select auspicious moments (Muhurta) using Panchanga mastery",
          "Handle professional consultations with ethical confidence",
          "Identify and resolve complex planetary afflictions"
        ],
        modules: [
          { title: "Siddhanta & Astronomy", weeks: "Week 1–2", lessons: ["Advanced Mathematical Foundations", "Precision Longitude Calculations", "Cosmic Mechanics of the Zodiac System"] },
          { title: "Graha & Rashi Analysis", weeks: "Week 3–4", lessons: ["Advanced Shadbala Applications", "Dig Bala Integration Techniques", "Planetary Sign Modification Mastery"] },
          { title: "Bhava & House Lords", weeks: "Week 5–6", lessons: ["12 Bhavas — Deep Structural Analysis", "House Lord Placement Effects", "Multi-Aspect Interpretation Framework"] },
          { title: "Advanced Dasha Systems", weeks: "Week 7–8", lessons: ["Vimshottari Mastery & Edge Cases", "Yogini & Chara Dasha Integration", "Precision Event-Timing Methodology"] },
          { title: "Varga Charts", weeks: "Week 9–11", lessons: ["All 16 Shodashvargas — Complete Framework", "Navamsha for Life Fruitage Prediction", "Dashamsha for Career Authority Mapping"] },
          { title: "Ashtakvarga & Transits", weeks: "Week 12–13", lessons: ["Quantified Planetary Power Analysis", "Advanced Gochar Prediction", "Multi-System Timing Synthesis"] },
          { title: "Muhurta & Panchanga", weeks: "Week 14–15", lessons: ["Electional Astrology Mastery", "Five Limbs of Panchanga", "Selecting Auspicious Moments for Life Events"] },
          { title: "Remedial Jyotish & Ethics", weeks: "Week 16", lessons: ["Advanced Mantra, Yantra & Gemstone Remedies", "Professional Consultation Ethics", "Client Handling & Communication Standards"] }
        ],
        caseStudy: {
          scenario: "A businessman asks: 'When is the best month to launch my new venture?'",
          steps: ["Analyze the D-10 (Dashamsha) for professional strength periods", "Cross-reference with Panchanga — identify Tithi, Nakshatra, and Yoga", "Apply Muhurta selection rules to narrow down the ideal launch window", "Validate using Ashtakvarga transit scores for the 10th and 11th houses", "Prescribe pre-launch remedial measures to strengthen planetary support"],
          insight: "At the Masters level, you integrate 5+ systems to deliver a holistic, actionable answer that no single-system astrologer can match."
        },
        lockedTopics: [
          "Secret Nadi Combinations for Wealth Prediction",
          "Advanced Muhurta Selection for Marriage Ceremonies",
          "Professional Client Intake & Consultation Framework",
          "Multi-Varga Synthesis for Career Path Mapping"
        ],
        diffTitle: "What Bachelors Doesn't Cover",
        diffPoints: [
          "Complete 16-chart Shodashvarga analysis",
          "Muhurta & Panchanga — Electional Astrology mastery",
          "Professional ethics and client consultation standards",
          "Multi-system integration for 360° life readings",
          "Advanced remedial prescriptions (Gemstones + Yantras)"
        ],
        applications: [
          "Conduct professional paid consultations with confidence",
          "Guide clients on marriage, career, health, and financial timing",
          "Select auspicious dates for major life events",
          "Teach or mentor beginner students",
          "Build a recognized practice with repeat clients"
        ]
      },
      "grand-master": {
        name: "Grand Master",
        position: "The Authority",
        icon: "fa-crown",
        badge: "Elite Invitation",
        headline: "Command Unquestioned Authority in Vedic Astrology",
        hook: "This is not a course. It is an initiation into mastery.",
        oldPrice: "₹34,999", newPrice: "₹24,999", duration: "48 Weeks Access",
        cta: "Claim Authority",
        outcomes: [
          "Deliver masterful, multi-system consultations that stun clients",
          "Handle complex charts (Balarishta, Kemadruma, Kala Sarpa) with authority",
          "Build and scale a premium astrology consulting practice",
          "Develop your own research methodology and unique interpretive voice",
          "Mentor and certify other aspiring astrologers"
        ],
        modules: [
          { title: "Foundation (Advanced)", weeks: "Week 1–6", lessons: ["Advanced Siddhanta & Astronomy", "Elite Graha & Rashi Analysis", "Mathematical Precision Training"] },
          { title: "Analysis & Timing (Advanced)", weeks: "Week 7–14", lessons: ["Advanced Bhava & House Lord Mastery", "Elite Dasha System Integration", "Multi-System Timing Protocols"] },
          { title: "Divisional & Transits (Advanced)", weeks: "Week 15–24", lessons: ["Complete 16-Varga Synthesis Mastery", "Advanced Ashtakvarga Applications", "Predictive Transit Frameworks"] },
          { title: "Practice & Ethics (Advanced)", weeks: "Week 25–36", lessons: ["Elite Muhurta & Panchanga Selection", "Advanced Remedial Jyotish", "Professional Practice Building"] },
          { title: "Authority Building", weeks: "Week 37–48", lessons: ["Client Acquisition & Premium Pricing", "Research Methodology Development", "Mentorship & Teaching Certification", "Personal Brand Building in Astrology"] }
        ],
        caseStudy: {
          scenario: "A high-profile client with Kala Sarpa Yoga asks: 'Is my life truly cursed?'",
          steps: ["Deep-analyze the Kala Sarpa configuration — is it actually present or misdiagnosed?", "Evaluate compensating yogas that can neutralize the perceived affliction", "Cross-reference across Navamsha and other Varga charts for confirmation", "Design a comprehensive, multi-layered remedial protocol", "Structure the consultation to educate, reassure, and guide — not frighten"],
          insight: "At the Grand Master level, you don't just interpret — you counsel, heal, and transform. Your authority comes from depth that no shortcut can replicate."
        },
        lockedTopics: [
          "Secret Bhrigu Nandi Nadi Combinations",
          "Advanced Kala Sarpa & Balarishta Resolution Protocols",
          "Premium Client Psychology & Consultation Choreography",
          "Research Methodology for Original Astrological Discoveries",
          "Personal Mentorship with Senior Faculty",
          "Practice Building: From Zero to Premium Authority"
        ],
        diffTitle: "What Masters Doesn't Cover",
        diffPoints: [
          "48 weeks of deep, mentored immersion (not just modules)",
          "Professional practice building — client acquisition, pricing, branding",
          "Research methodology — develop your own unique astrological voice",
          "Free 6 Spiritual Stairs Pathway (exclusive Grand Master benefit)",
          "Teaching & mentorship certification",
          "Access to secret, faculty-only Nadi combinations"
        ],
        applications: [
          "Run a full-time premium astrology consulting practice",
          "Charge high-ticket consultation fees with confidence",
          "Mentor and certify the next generation of astrologers",
          "Publish original research and build thought leadership",
          "Be recognized as a true authority in the astrological community"
        ]
      }
    }
  }
};

// Generate entries for all other courses by cloning the vedic-astrology structure
// with course-specific names and images
const COURSE_REGISTRY = {
  "vedic-astrology":      { name: "Vedic Astrology",       file: "astrology.html",           image: "Picture3.webp" },
  "astrology":            { name: "Vedic Astrology",       file: "astrology.html",           image: "Picture3.webp" },
  "nadi-jyotish":         { name: "Nadi Jyotish",          file: "nadi-jyotish.html",        image: "Picture5.webp" },
  "lal-kitab":            { name: "Lal Kitab Remedies",    file: "lal-kitab.html",           image: "Picture6.webp" },
  "remedy-course":        { name: "Remedy Course",         file: "remedy-course.html",       image: "remedy.webp" },
  "kp-astrology":         { name: "KP Astrology",          file: "kp-astrology.html",        image: "kp-astrology.webp" },
  "bnn-astrology":        { name: "BNN Astrology",         file: "bnn-astrology.html",       image: "Picture4.webp" },
  "crystal-healing":      { name: "Crystal Healing",       file: "crystal-healing.html",     image: "crystal.webp" },
  "medical-astrology":    { name: "Medical Astrology",     file: "medical-astrology.html",   image: "Medical Astrology.webp" },
  "complete-astrology":   { name: "Complete Astrology",    file: "complete-astrology.html",  image: "Picture3.webp" },
  "rudraksha":            { name: "Rudraksha Remedies",    file: "rudraksha.html",           image: "rudraksha.webp" },
  "vastu":                { name: "Vastu Shastra",         file: "vastu.html",               image: "vastu.webp" },
  "palmistry":            { name: "Palmistry",             file: "palmistry.html",           image: "palmistry.webp" },
  "face-reading":         { name: "Face Reading",          file: "face-reading.html",        image: "face-reading-hero.webp" },
  "tarot":                { name: "Tarot Reading",         file: "tarot.html",               image: "hero-tarot.webp" },
  "numerology":           { name: "Numerology",            file: "numerology.html",          image: "Vedic Numerology.webp" },
  "reiki":                { name: "Reiki Healing",         file: "reiki.html",               image: "healing.webp" },
  "nakshatra":            { name: "Nakshatra",             file: "nakshatra.html",           image: "nakshatra_diploma_1775113764359.webp" },
  "gemstone-science":     { name: "Gemstone Science",      file: "gemstone.html",            image: "gemstone.webp" },
  "gemstone":             { name: "Gemstone Science",      file: "gemstone.html",            image: "gemstone.webp" }
};

// Clone structure for all courses not yet explicitly defined
Object.keys(COURSE_REGISTRY).forEach(slug => {
  if (!LEVEL_DATA[slug]) {
    const reg = COURSE_REGISTRY[slug];
    const base = JSON.parse(JSON.stringify(LEVEL_DATA["vedic-astrology"]));
    base.courseName = reg.name;
    base.courseSlug = slug;
    base.pageFile = reg.file;
    base.image = "assets/images-optimized/" + reg.image;

    // Update level headlines to use course name
    Object.keys(base.levels).forEach(lvl => {
      const l = base.levels[lvl];
      l.headline = l.headline.replace("Vedic Astrology", reg.name);
    });

    LEVEL_DATA[slug] = base;
  }
});

// ═══════════════════════════════════════════════════
// CUSTOM OVERRIDE — Vedic Astrology (Bespoke Pages)
// ═══════════════════════════════════════════════════
function renderCustomVedicPage(courseSlug, levelSlug) {
  const mainEl = document.getElementById('ld-main');
  const levelNames = { diploma: 'Diploma', bachelors: 'Bachelors', masters: 'Masters', 'grand-master': 'Grand Master' };
  const levelLabel = levelNames[levelSlug] || 'Diploma';
  
  let vedicModules = [];
  if (levelSlug === 'diploma' || !['bachelors','masters','grand-master'].includes(levelSlug)) {
    vedicModules = [
      { title: "Cosmic Mechanics", lessons: ["Fundamentals of Astronomy and Astrology: An introduction to the cosmic mechanics of Jyotish, covering Grahas (Planets), Rashis (Zodiac Signs), and the twelve Bhavas (Houses)."] },
      { title: "Planetary Dynamics", lessons: ["Planetary Dynamics and Strengths: An advanced study of Shadbala (the six-fold planetary strength) and the classification of planets as Functional Benefices or Malefices based on specific Ascendants."] },
      { title: "Temporal Timing", lessons: ["Temporal Analysis and Timing of Events: Mastering the Vimshottari Dasha system for life-cycle sequencing and utilizing Gochar (Transits) to pinpoint the exact timing of significant life events."] },
      { title: "Chart Synthesis", lessons: ["Chart Synthesis and Practical Application: Comprehensive analysis of the birth chart for specific life areas—including Career, Marriage, and Health—along with the implementation of Basic Remedial Measures."] }
    ];
  } else if (levelSlug === 'bachelors') {
    vedicModules = [
      { title: "Siddhanta & Math", lessons: ["Covers the astronomical foundations of Jyotish, calculating planetary longitudes and the mathematical construction of a precise horoscope or 'Kundli.'"] },
      { title: "Graha & Rashi Analysis", lessons: ["Analyses planetary strength through Shadbala (six-fold strength), Dig Bala (directional strength), and the varying Avasthas (developmental states) of planets."] },
      { title: "Advanced Dasha Systems", lessons: ["Moves beyond the standard Vimshottari to explore Yogini and Jaimini’s Chara Dashas for more nuanced, multi-layered predictive timing."] },
      { title: "Varga Charts", lessons: ["Deep dives into Divisional Charts, specifically the D-9 (Navamsha) for marriage/fruitage and the D-10 (Dashamsha) for professional success."] },
      { title: "Ashtakvarga & Transits", lessons: ["Uses the Ashtakvarga point system to quantify planetary power and analyses Gochar (Transits) to pinpoint the exact timing of events."] },
      { title: "Remedial Jyotish", lessons: ["Focuses on the practical application of Mantras, Yantras, and Muhurta (choosing auspicious moments) to balance planetary energies and karma."] }
    ];
  } else {
    vedicModules = [
      { title: "Siddhanta & Astronomy", lessons: ["Covers the mathematical foundations of the horoscope, calculating planetary longitudes, and understanding the cosmic mechanics of the Zodiac."] },
      { title: "Graha & Rashi Analysis", lessons: ["In-depth study of planetary strengths (Shadbala), directional strength (Dig Bala), and how signs modify the behavior of the nine Grahas."] },
      { title: "Bhava & House Lords", lessons: ["Analyses the 12 Bhavas (houses), focusing on the placement of house lords and the impact of planetary aspects (Drishti)."] },
      { title: "Advanced Dasha Systems", lessons: ["Mastering the Vimshottari Dasha and seasonal cycles like Yogini or Chara Dashas to pinpoint the exact timing of life events."] },
      { title: "Varga (Divisional) Charts", lessons: ["Deep dives into the 16 Shodashvargas, primarily the Navamsha (D9) for fruitage and Dashamsha (D10) for career and status."] },
      { title: "Ashtakvarga & Transits", lessons: ["Utilizing the Ashtakvarga point system to quantify planetary power and tracking Gochar (Transits) to predict immediate and future outcomes."] },
      { title: "Muhurta & Panchanga", lessons: ["The science of Electional Astrology, using the five limbs of the Panchanga to select auspicious moments for vital activities."] },
      { title: "Remedial Jyotish & Ethics", lessons: ["Applying Mantra, Yantra, and Gemstone remedies while maintaining high ethical standards and psychological sensitivity during professional client consultations."] }
    ];
  }

  const partNames = ["Foundation", "Analysis", "Query", "Practice", "Advanced", "Mastery", "Integration", "Expertise"];
  const modulesHtml = vedicModules.map((m, i) => `
        <div class="cvd-module-card">
          <div class="cvd-module-title">${partNames[i] || 'Section'} (Part ${i + 1})</div>
          <div class="cvd-module-weeks">Module ${i + 1}: ${m.title}</div>
          <ul>
            ${m.lessons.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>
  `).join('');
  
  const customStyles = `
    <style>
      .cvd-hero {
        background: #FFFFFF;
        position: relative;
        overflow: hidden;
        padding: 50px 0 50px 0;
        border-bottom: none;
      }
      .cvd-hero-container {
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        position: relative;
        min-height: 450px;
      }
      .cvd-hero-text {
        flex: 1;
        max-width: clamp(300px, 55%, 650px);
        padding-bottom: 0px;
        z-index: 2;
        position: relative;
      }
      .cvd-hero-badge {
        display: inline-block;
        background: linear-gradient(135deg, #FFD700, #DAA520);
        color: #591C21;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 15px;
        box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.6);
        animation: badgePulse 2s infinite alternate;
      }
      @keyframes badgePulse {
        0% { box-shadow: 0 4px 10px rgba(218, 165, 32, 0.4); }
        100% { box-shadow: 0 4px 20px rgba(218, 165, 32, 0.8); }
      }
      .cvd-hero-title {
        font-size: 2.8rem;
        color: #333;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 10px;
      }
      .cvd-hero-subtitle {
        color: #B27C31;
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 25px;
        line-height: 1.4;
        text-shadow: 1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.8), 1px -1px 0px rgba(255,255,255,0.8), -1px 1px 0px rgba(255,255,255,0.8), 0 2px 10px rgba(255,255,255,0.8);
      }
      .cvd-hero-hook {
        font-style: italic;
        color: #444;
        font-size: 1.1rem;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .cvd-hero-btn {
        background: linear-gradient(to right, #B22222, #8b0000);
        color: #fff !important;
        padding: 12px 35px;
        font-size: 1.35rem;
        font-weight: bold;
        border-radius: 6px;
        display: inline-block;
        text-decoration: none;
        box-shadow: 0 6px 15px rgba(139,0,0,0.25);
        margin-top: 15px;
      }
      .cvd-hero-save {
        color: #B27C31;
        font-style: italic;
        font-weight: bold;
        margin-top: 10px;
        font-size: 1.05rem;
      }
      .cvd-hero-img-wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 45%;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        pointer-events: none;
      }
      .cvd-hero-img-wrap img {
        height: 105%;
        width: auto;
        max-width: none;
        display: block;
        object-fit: contain;
        object-position: right center;
        margin-right: -120px;
        transform: translateY(0%);
      }
      
      .cvd-section { padding: 30px 20px; text-align: center; }
      .cvd-section-bg { background-color: #F9F9F9; }
      @keyframes hookGlow {
        0% { filter: drop-shadow(0 0 2px rgba(218,165,32,0.2)); transform: scale(0.995); }
        100% { filter: drop-shadow(0 0 15px rgba(218,165,32,0.9)); transform: scale(1.015); }
      }
      .cvd-title { 
        font-size: 2.8rem; 
        font-weight: bold; 
        font-family: "Times New Roman", serif; 
        margin-bottom: 20px;
        background: linear-gradient(to right, #800000, #B27C31, #800000);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hookGlow 2.5s infinite alternate ease-in-out;
      }
      .cvd-desc { 
        font-size: 1.35rem; 
        font-weight: 600; 
        font-style: italic; 
        max-width: 850px; 
        margin: 0 auto 30px auto; 
        line-height: 1.8; 
        letter-spacing: 0.5px;
        background: linear-gradient(to right, #555, #B27C31, #555);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hookGlow 2.5s infinite alternate ease-in-out; 
        animation-delay: 1.25s; 
      }
      
      .cvd-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      .cvd-3col-card { width: 100%; }
      .cvd-3col-card img { width: 100%; height: 200px; object-fit: cover; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      .cvd-3col-card p { font-size: 1.2rem; margin-top: 15px; color: #444; }

      .cvd-ba-container { max-width: 1050px; margin: 10px auto 40px auto; }
      .cvd-ba-header { display: flex; align-items: center; padding: 0 10px; }
      .cvd-ba-header h3 { font-size: 1.8rem; color: #444; font-family: "Times New Roman", serif; margin: 0 40px; font-weight: bold; }
      .cvd-ba-header h3.after-title { color: #A82C2C; }
      .cvd-ba-box { display: flex; margin-top: 15px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: #fff; }
      
      .cvd-ba-left { width: 50%; padding: 20px 40px 20px 40px; background: #EEE9DC; border-radius: 4px 0 0 4px; position: relative; z-index: 2; }
      .cvd-ba-left::after {
        content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 30px;
        background: #EEE9DC; clip-path: polygon(0 0, 0 100%, 100% 50%); z-index: 3;
      }
      .cvd-ba-right { width: 50%; padding: 20px 40px 20px 60px; background: #C69429; border-radius: 0 4px 4px 0; position: relative; }
      
      .cvd-ba-item { display: flex; align-items: center; gap: 15px; font-size: 1.2rem; min-height: 65px; border-bottom: 1px solid rgba(0,0,0,0.06); }
      .cvd-ba-left .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-right .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      
      .cvd-ba-left .cvd-ba-item { color: #555; }
      .cvd-ba-left .cvd-ba-icon { color: #BBA072; font-size: 0.6rem; }
      .cvd-ba-right .cvd-ba-item { color: #fff; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.25); text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
      .cvd-ba-right .cvd-ba-icon { color: #fff; font-size: 1.2rem; }

      .cvd-learn-grid { display: grid; grid-template-columns: repeat(3, 1fr); justify-items: center; align-items: start; gap: 20px; margin-top: 40px; max-width: 1200px; margin-left: auto; margin-right: auto; }
      .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(6, 1fr); }
      .cvd-learn-item { width: 100%; max-width: 160px; text-align: center; }
      .cvd-learn-item img { max-width: 100px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; }
      .cvd-learn-item p { font-size: 0.95rem; color: #444; font-weight: 600; line-height: 1.4; }

      .cvd-sidebar-heading { font-family: 'Times New Roman', serif; font-size: 1.8rem; color: #591C21; font-weight: bold; margin-bottom: 25px; text-align: center; position: relative; }
      .cvd-sidebar-heading::after { content: ''; display: block; width: 60px; height: 3px; background: #B27C31; margin: 10px auto 0 auto; }

      .cvd-strip { 
        background: linear-gradient(to right, #F5DEB3, #D4AF37, #F5DEB3); 
        padding: 30px; 
        margin-top: 50px; 
      }
      .cvd-strip-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
        max-width: 1000px;
        margin: 0 auto;
      }
      .cvd-strip-text { font-size: 1.5rem; color: #591C21; font-weight: bold; margin: 0; text-align: left; }
      .cvd-strip-btn { display: inline-flex; align-items: center; gap: 10px; background: #CC0000; color: #fff !important; padding: 12px 30px; font-size: 1.3rem; font-weight: bold; border-radius: 4px; text-decoration: none; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: background 0.2s ease; }
      .cvd-strip-btn:hover { background: #AA0000; }
      .cvd-strip-link { color: #800000; font-weight: bold; text-decoration: underline; font-size: 0.95rem; margin-top: 8px; display: block; text-align: center; }

      .cvd-faq { max-width: 800px; margin: 30px auto; }
      .cvd-faq-item { background: #E8E8E8; margin-bottom: 10px; border-radius: 6px; overflow: hidden; }
      .cvd-faq-question { padding: 15px 20px; display: flex; justify-content: space-between; cursor: pointer; color: #333; font-weight: 500; }
      .cvd-faq-answer { padding: 0 20px 15px 20px; display: none; color: #555; line-height: 1.6; text-align:left; }
      .cvd-faq-item.active .cvd-faq-answer { display: block; }
      .cvd-faq-icon { font-weight: bold; background: #666; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;}

      .cvd-module-card {
        background: #FFF;
        border-radius: 8px;
        padding: 25px 20px;
        margin-bottom: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.04);
        border: 1px solid #EAEAEA;
        border-top: 4px solid #7D2C30;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .cvd-module-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
      }
      .cvd-module-title {
        text-align: center;
        color: #591C21;
        font-size: 1.3rem;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .cvd-module-weeks {
        font-size: 0.95rem;
        color: #333;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .cvd-module-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .cvd-module-card li {
        font-size: 0.95rem;
        color: #555;
        margin-bottom: 10px;
        position: relative;
        padding-left: 15px;
        line-height: 1.5;
      }
      .cvd-module-card li::before {
        content: '▸';
        color: #B98E45;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 1rem;
      }

      @media (max-width: 991px) {
        .cvd-layout-container { flex-direction: column; overflow-x: hidden; }
        .cvd-sidebar { width: 100% !important; position: static !important; margin-top: 40px; }
        .cvd-4col { grid-template-columns: repeat(2, 1fr); }
        .cvd-learn-grid { grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(3, 1fr); }
        .cvd-3col { gap: 15px; }
        .cvd-ba-item { font-size: 1.05rem; }
        .cvd-hero-container { padding: 0 20px; }
      }
      @media (max-width: 768px) {
        /* Global overflow fix */
        html, body { overflow-x: hidden; max-width: 100%; padding: 0; margin: 0; }
        .cvd-main-content, .cvd-layout-container { overflow-x: hidden; max-width: 100%; width: 100%; padding: 0 !important; margin: 0 !important; box-sizing: border-box; }
        
        /* Hero Section - image on top, text below */
        .cvd-hero { padding: 20px 0 30px 0; }
        .cvd-hero-container { flex-direction: column-reverse; text-align: center; padding: 0 15px; min-height: auto; }
        .cvd-hero-text { max-width: 100%; padding: 10px 5px 20px 5px; }
        .cvd-hero-title { font-size: 2rem; }
        .cvd-hero-subtitle { font-size: 1.3rem; }
        .cvd-hero-hook { font-size: 1rem; }
        .cvd-hero-btn { font-size: 1.15rem; padding: 10px 25px; width: 100%; text-align: center; box-sizing: border-box; }
        .cvd-hero-img-wrap { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: auto; transform: none; margin-top: 0; pointer-events: auto; }
        .cvd-hero-img-wrap img { width: 100%; height: 300px; max-width: 400px; margin: 0 auto; object-position: 85% center; object-fit: cover; }
        
        /* Section titles - prevent text overflow */
        .cvd-section { padding: 20px 15px; overflow: hidden; }
        .cvd-title { font-size: 1.8rem; word-wrap: break-word; overflow-wrap: break-word; }
        .cvd-desc { font-size: 1.05rem; line-height: 1.6; padding: 0 5px; }
        
        /* 3-column image cards -> 1 column on mobile */
        .cvd-3col { grid-template-columns: 1fr; gap: 20px; max-width: 350px; margin: 0 auto; }
        .cvd-3col-card img { height: 180px; }
        .cvd-3col-card p { font-size: 1.05rem; }
        
        /* Before/After section - stack vertically */
      .cvd-ba-container { max-width: 1050px; margin: 10px auto 40px auto; }
      .cvd-ba-header { display: flex; align-items: center; padding: 0 10px; }
      .cvd-ba-header h3 { font-size: 1.8rem; color: #444; font-family: "Times New Roman", serif; margin: 0 40px; font-weight: bold; }
      .cvd-ba-header h3.after-title { color: #A82C2C; }
      .cvd-ba-box { display: flex; margin-top: 15px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: #fff; }
      
      .cvd-ba-left { width: 50%; padding: 20px 40px 20px 40px; background: #EEE9DC; border-radius: 4px 0 0 4px; position: relative; z-index: 2; }
      .cvd-ba-left::after { content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 30px; background: #EEE9DC; clip-path: polygon(0 0, 0 100%, 100% 50%); z-index: 3; }
      .cvd-ba-right { width: 50%; padding: 20px 40px 20px 60px; background: #C69429; border-radius: 0 4px 4px 0; position: relative; }
      
      .cvd-ba-item { display: flex; align-items: center; gap: 15px; font-size: 1.2rem; min-height: 65px; border-bottom: 1px solid rgba(0,0,0,0.06); }
      .cvd-ba-left .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-right .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-left .cvd-ba-item { color: #555; }
      .cvd-ba-left .cvd-ba-icon { color: #BBA072; font-size: 0.6rem; }
      .cvd-ba-right .cvd-ba-item { color: #fff; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.25); text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
      .cvd-ba-right .cvd-ba-icon { color: #fff; font-size: 1.2rem; }
        .cvd-learn-grid, .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .cvd-learn-item { max-width: 140px; }
        .cvd-learn-item img { max-width: 90px; height: 90px; object-fit: cover; }
        .cvd-learn-item p { font-size: 0.85rem; }
        
        /* Strip / CTA section */
        .cvd-strip { padding: 20px 15px; }
        .cvd-strip-inner { flex-direction: column; text-align: center; gap: 15px; }
        .cvd-strip-text { text-align: center; font-size: 1.2rem; }
        .cvd-strip-btn { width: 100%; justify-content: center; box-sizing: border-box; font-size: 1.1rem; }
        
        /* 4-column grid -> 1 column */
        .cvd-4col { grid-template-columns: 1fr; }
        
        /* Sidebar */
        .cvd-sidebar { width: 100% !important; padding: 0 10px !important; box-sizing: border-box; }
        
        /* Module cards */
        .cvd-module-card { padding: 15px 12px; }
        .cvd-module-title { font-size: 1.15rem; }
        
        /* FAQ */
        .cvd-faq { padding: 0 5px; }
        .cvd-faq-question { font-size: 0.95rem; padding: 12px 15px; }
      }
    </style>
  `;

  const html = `
    ${customStyles}
    <!-- START MAIN LAYOUT WITH SIDEBAR -->
    <div class="cvd-layout-container" style="display: flex; flex-wrap: wrap; gap: 50px; max-width: 1400px; margin: 20px auto 60px auto; align-items: flex-start; padding: 0 20px;">
      
      <div class="cvd-main-content" style="flex: 1; min-width: 0;">

        <section class="cvd-hero">
          <div class="cvd-hero-container">
            <div class="cvd-hero-text">
              <div class="cvd-hero-badge"><i class="fas fa-award"></i> ${levelLabel} Certification</div>
              <div class="cvd-hero-title">Vedic Astrology:</div>
              <div class="cvd-hero-subtitle">Predict Your Life & Future Events</div>
              <div class="cvd-hero-hook" style="font-weight: 500;">Unlock the secrets of your future using the ancient science of Vedic astrology. Read your birth chart with pinpoint accuracy.</div>
              
              <a href="${courseSlug}.html" class="cvd-hero-btn">Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'}</span> ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4,199'}</a>
              <div class="cvd-hero-save"><i class="fas fa-check" style="color: #6B8E23;"></i> Save ${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% Today &nbsp;&middot;&nbsp; Duration: ${levelSlug === 'grand-master' ? '48 Weeks' : (levelSlug === 'masters' ? '16 Weeks' : (levelSlug === 'bachelors' ? '12 Weeks' : '8 Weeks'))}</div>
              
<div style="margin-top: 25px;">
                <a href="${courseSlug}.html" style="color: #B27C31; font-weight: 600; text-decoration: underline; font-size: 1rem;">
                  For price comparison follow this <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                </a>
              </div>
            </div>
            <div class="cvd-hero-img-wrap">
              <img src="assets/images-optimized/vedic-astrology/harshit-sir.webp" alt="Vedic Astrology" />
            </div>
          </div>
        </section>

        <section class="cvd-section" style="padding-top: 40px;">
          <h2 class="cvd-title">Life Is Full of Uncertainty... But What If You Could Predict It?</h2>
          <div class="cvd-desc">Your birth chart holds ancient wisdom that can reveal your true purpose, hidden strengths, and upcoming challenges.<br>Most people never realize how much their life is influenced by the stars and planets.</div>
          
          <div class="cvd-3col">
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/vedic-astrology/Emotional distance in troubled times.png" alt="Relationship Issues">
              <p>Relationship Issues</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/vedic-astrology/img 2.webp" alt="Career Decisions">
              <p>Career Decisions</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/vedic-astrology/img 3.webp" alt="Health Concerns">
              <p>Health Concerns</p>
            </div>
          </div>
        </section>

        <section class="cvd-section cvd-section-bg">
          <div class="cvd-ba-container">
            <div class="cvd-ba-header">
              <div style="flex:1; height:1px; background:#D5CEBE;"></div>
              <h3>Before</h3>
              <div style="flex:1; height:1px; background:#D5CEBE; position: relative;">
                 <i class="fas fa-caret-right" style="position: absolute; right: -5px; top: -7px; color: #D5CEBE; font-size: 14px;"></i>
              </div>
              <h3 class="after-title">After</h3>
              <div style="flex:1; height:1px; background:#D5CEBE;"></div>
            </div>
            
            <div class="cvd-ba-box">
              <div class="cvd-ba-left">
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Feeling Lost in Life</div>
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Stressing Over Choices</div>
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Unprepared for Challenges</div>
              </div>
              <div class="cvd-ba-right">
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Understand Your Destiny</div>
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Gain Mental Clarity</div>
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Predict Major Life Events</div>
              </div>
            </div>
          </div>
        </section>

      </div> <!-- end cvd-main-content -->
      
      <!-- Right Section Sidebar -->
      <aside class="cvd-sidebar" id="cvd-dynamic-sidebar" style="width: 380px; flex-shrink: 0; padding-top: 20px;">
        
        <h3 class="cvd-sidebar-heading">${levelLabel} Course Curriculum</h3>

        ${modulesHtml}

      </aside>

    </div> <!-- end cvd-layout-container -->

    <!-- FULL WIDTH SECTIONS -->
    <section id="cvd-learn-section" class="cvd-section cvd-section-bg" style="padding-top: 20px; background-color: transparent;">
      <div style="display:flex; justify-content:center; align-items:center; margin: 30px auto 30px auto; max-width:800px;">
        <hr style="flex:1; border:none; border-top:1px solid #ccc;">
        <h2 class="cvd-title" style="margin: 0 30px;">What You'll Learn</h2>
        <hr style="flex:1; border:none; border-top:1px solid #ccc;">
      </div>
      
      <div class="cvd-learn-grid cvd-learn-fullwidth">
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/vedic-astrology/analyze your birth chart.webp" alt="Analyze Your Birth Chart">
          <p>Analyze<br>Your Birth Chart</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/vedic-astrology/predict major events.webp" alt="Predict Major Events">
          <p>Predict<br>Major Events</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/vedic-astrology/understand career and money.webp" alt="Understand Career & Money">
          <p>Understand<br>Career & Money</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/vedic-astrology/improve relationships.webp" alt="Improve Relationships">
          <p>Improve<br>Relationships</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/vedic-astrology/enhance health and well beings.webp" alt="Enhance Health">
          <p>Enhance<br>Health & Well-Being</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/vedic-astrology/auspicious dates and remedies.webp" alt="Auspicious Dates & Remedies">
          <p>Auspicious<br>Dates & Remedies</p>
        </div>
      </div>
    </section>

    <div class="cvd-strip">
      <div class="cvd-strip-inner">
        <div class="cvd-strip-text">
          Limited Offer: Only ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4199'} 
          <span style="font-size:1.1rem; color:#444; font-weight:normal; display:block; margin-top:5px;">(Save ${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% &ndash; Regular Price ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'})</span>
        </div>
        <div>
          <a href="${courseSlug}.html" class="cvd-strip-btn"><i class="far fa-file-alt"></i> Get Started Now!</a>
          <a href="${courseSlug}.html" class="cvd-strip-link">For price comparison follow this</a>
        </div>
      </div>
    </div>

    <section class="cvd-section">
      <div class="cvd-faq">
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Can I read my own birth chart after this course? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Absolutely. By the end of the course, you will be able to cast and interpret a birth chart (Kundli) for yourself, your family, and friends — understanding planetary placements, house significations, and Dasha periods with clarity.</div>
        </div>
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">What if I don't know my exact birth time? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Even without an exact birth time, you can work with the Moon chart (Chandra Kundli) which provides highly accurate insights. Our advanced modules also cover basic birth-time rectification techniques to help narrow it down.</div>
        </div>
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Is astrology prediction really accurate, or is it guesswork? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Vedic Astrology is a structured mathematical science based on precise planetary positions. When practiced with proper methodology — as taught in this course — predictions are data-driven and verifiable, not guesswork.</div>
        </div>
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Will I be able to predict timing of events like marriage or job? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Yes. You will learn the Vimshottari Dasha system and transit analysis, which together allow you to pinpoint the timing of major life events with remarkable accuracy.</div>
        </div>
      </div>
    </section>
  `;
  mainEl.innerHTML = html;
  document.title = `${levelLabel} in Vedic Astrology — Parashari Institute`;

  // Dynamic layout: move "What You'll Learn" inside left column if sidebar is taller
  setTimeout(() => {
    const mainContent = document.querySelector('.cvd-main-content');
    const sidebar = document.querySelector('.cvd-sidebar');
    const learnSection = document.getElementById('cvd-learn-section');
    if (mainContent && sidebar && learnSection) {
      if (sidebar.offsetHeight > mainContent.offsetHeight + 400) {
        learnSection.querySelector('.cvd-learn-grid').classList.remove('cvd-learn-fullwidth');
        mainContent.appendChild(learnSection);
      }
    }
  }, 50);
}

// ═══════════════════════════════════════════════════
// CUSTOM OVERRIDE — Numerology (Bespoke Pages)
// ═══════════════════════════════════════════════════
function renderCustomNumerologyPage(courseSlug, levelSlug) {
  const mainEl = document.getElementById('ld-main');
  const levelNames = { diploma: 'Diploma', bachelors: 'Bachelors', masters: 'Masters', 'grand-master': 'Grand Master' };
  const levelLabel = levelNames[levelSlug] || 'Diploma';

  let numModules = [];
  if (levelSlug === 'diploma' || !['bachelors','masters','grand-master'].includes(levelSlug)) {
    numModules = [
      { title: "Numeric Vibrations", lessons: ["Fundamentals of Numbers and Vibrations: An introduction to the symbolism of single digits (1–9), the high-frequency Master Numbers (11, 22, 33), and the foundational vibrations of the Pythagorean and Chaldean systems."] },
      { title: "Core Charting", lessons: ["Calculating the Core Numerology Chart: Step-by-step methodology for calculating the four core numbers: Life Path (Birth Date), Destiny (Full Name), Soul Urge (Vowels), and Personality (Consonants)."] },
      { title: "Predictive Cycles", lessons: ["Predictive Numerology and Life Cycles: Techniques for forecasting future trends using Personal Years, Months, and Days, alongside the calculation of Pinnacle Cycles and Challenges for long-term planning."] },
      { title: "Applied Consulting", lessons: ["Advanced Application and Consulting: Practical application of Name Correction Science, Business Numerology (for brand success), and Compatibility Analysis for personal and professional relationships."] }
    ];
  } else if (levelSlug === 'bachelors') {
    numModules = [
      { title: "History & Philosophy", lessons: ["Explores the origins and vibrational philosophies of the Pythagorean, Chaldean, and Vedic schools to understand the foundational power of numbers."] },
      { title: "Core Chart & Grids", lessons: ["Mastering the Core Chart and advanced grid systems like the Lo Shu Grid and Vedic Grid for spatial destiny analysis."] },
      { title: "Chronology & Forecasting", lessons: ["Calculating Personal Years, Life Path Periods, and Pinnacle Years to accurately predict significant timing and major transitions in one's life."] },
      { title: "Relationship & Business", lessons: ["Analysing Marriage Compatibility and optimizing Brand Names using numeric vibrations to ensure harmonious partnerships and commercial success for business ventures."] },
      { title: "Graphology & Signature", lessons: ["Investigating the profound link between numeric vibrations and handwriting, using Signature Analysis to identify and correct subconscious personality blocks."] },
      { title: "Ethics & Remedies", lessons: ["Focuses on Remedial Numerology, professional Client Consultation techniques, and maintaining high ethical standards throughout a numerologist’s professional practice."] }
    ];
  } else {
    numModules = [
      { title: "History & Philosophy", lessons: ["Explores the Pythagorean, Chaldean, and Vedic schools, detailing how number vibrations influence human destiny across different ancient civilizations."] },
      { title: "The Core Chart", lessons: ["Mastering the Life Path, Expression, Soul Urge, and Personality numbers to create a comprehensive profile of an individual's character."] },
      { title: "Advanced Grid Systems", lessons: ["Detailed study of the Lo Shu Grid and Vedic Grid, analysing missing numbers and directional arrows of fortune."] },
      { title: "Chronology & Forecasting", lessons: ["Calculating Personal Years, Months, and Days alongside Pinnacle Cycles to predict major life turning points and optimal timing."] },
      { title: "Relationship Dynamics", lessons: ["Analysing marriage compatibility and business partnerships by comparing core numbers to identify harmonic resonances or potential vibrational conflicts."] },
      { title: "Business & Brand Optimization", lessons: ["Applying numerological principles to brand naming, mobile numbers, and bank accounts to align professional ventures with success-oriented frequencies."] },
      { title: "Graphology & Signatures", lessons: ["Investigating the link between numeric vibrations and handwriting, using signature analysis to correct subconscious blocks and enhance personality."] },
      { title: "Professional Consultation", lessons: ["Focuses on remedial numerology, ethical client handling, and integrating numeric insights into a professional holistic astrology practice."] }
    ];
  }
  const partNamesNum = ["Foundation", "Analysis", "Application", "Prediction", "Advanced", "Mastery", "Integration", "Expertise"];
  const modulesHtml = numModules.map((m, i) => `
        <div class="cvd-module-card">
          <div class="cvd-module-title">${partNamesNum[i] || 'Section'} (Part ${i + 1})</div>
          <div class="cvd-module-weeks">Module ${i + 1}: ${m.title}</div>
          <ul>
            ${m.lessons.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>
  `).join('');
  
  const customStyles = `
    <style>
      .cvd-hero {
        background: #FFFFFF;
        position: relative;
        overflow: hidden;
        padding: 50px 0 50px 0;
        border-bottom: none;
      }
      .cvd-hero-container {
        max-width: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 40px;
        position: relative;
        min-height: 450px;
      }
      .cvd-hero-text {
        flex: 1;
        max-width: clamp(300px, 55%, 650px);
        padding-bottom: 0px;
        z-index: 2;
        position: relative;
      }
      .cvd-hero-badge {
        display: inline-block;
        background: linear-gradient(135deg, #FFD700, #DAA520);
        color: #591C21;
        padding: 5px 15px;
        border-radius: 20px;
        font-size: 0.9rem;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 1.5px;
        margin-bottom: 15px;
        box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4);
        border: 1px solid rgba(255, 255, 255, 0.6);
        animation: badgePulse 2s infinite alternate;
      }
      @keyframes badgePulse {
        0% { box-shadow: 0 4px 10px rgba(218, 165, 32, 0.4); }
        100% { box-shadow: 0 4px 20px rgba(218, 165, 32, 0.8); }
      }
      .cvd-hero-title {
        font-size: 2.8rem;
        color: #333;
        font-weight: 700;
        line-height: 1.1;
        margin-bottom: 10px;
      }
      .cvd-hero-subtitle {
        color: #B27C31;
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 25px;
        line-height: 1.4;
        text-shadow: 1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.8), 1px -1px 0px rgba(255,255,255,0.8), -1px 1px 0px rgba(255,255,255,0.8), 0 2px 10px rgba(255,255,255,0.8);
      }
      .cvd-hero-hook {
        font-style: italic;
        color: #444;
        font-size: 1.1rem;
        line-height: 1.5;
        margin-bottom: 20px;
      }
      .cvd-hero-btn {
        background: linear-gradient(to right, #B22222, #8b0000);
        color: #fff !important;
        padding: 12px 35px;
        font-size: 1.35rem;
        font-weight: bold;
        border-radius: 6px;
        display: inline-block;
        text-decoration: none;
        box-shadow: 0 6px 15px rgba(139,0,0,0.25);
        margin-top: 15px;
      }
      .cvd-hero-save {
        color: #B27C31;
        font-style: italic;
        font-weight: bold;
        margin-top: 10px;
        font-size: 1.05rem;
      }
      .cvd-hero-img-wrap {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 45%;
        z-index: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        pointer-events: none;
      }
      .cvd-hero-img-wrap img { width: 100%; height: 300px; max-width: 400px; margin: 0 auto; object-position: 85% center; object-fit: cover; }
      
      .cvd-learn-item img {
        width: 140px;
        height: 140px;
        object-fit: contain;
        display: block;
        margin: 0 auto 15px auto;
      }
      
      .cvd-section { padding: 30px 20px; text-align: center; }
      .cvd-section-bg { background-color: #F9F9F9; }
      @keyframes hookGlow {
        0% { filter: drop-shadow(0 0 2px rgba(218,165,32,0.2)); transform: scale(0.995); }
        100% { filter: drop-shadow(0 0 15px rgba(218,165,32,0.9)); transform: scale(1.015); }
      }
      .cvd-title { 
        font-size: 2.8rem; 
        font-weight: bold; 
        font-family: "Times New Roman", serif; 
        margin-bottom: 20px;
        background: linear-gradient(to right, #800000, #B27C31, #800000);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hookGlow 2.5s infinite alternate ease-in-out;
      }
      .cvd-desc { 
        font-size: 1.35rem; 
        font-weight: 600; 
        font-style: italic; 
        max-width: 850px; 
        margin: 0 auto 30px auto; 
        line-height: 1.8; 
        letter-spacing: 0.5px;
        background: linear-gradient(to right, #555, #B27C31, #555);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: hookGlow 2.5s infinite alternate ease-in-out; 
        animation-delay: 1.25s; 
      }
      
      .cvd-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
      .cvd-3col-card { width: 100%; }
      .cvd-3col-card img { width: 100%; height: 200px; object-fit: cover; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }
      .cvd-3col-card p { font-size: 1.2rem; margin-top: 15px; color: #444; }

      .cvd-ba-container { max-width: 1050px; margin: 10px auto 40px auto; }
      .cvd-ba-header { display: flex; align-items: center; padding: 0 10px; }
      .cvd-ba-header h3 { font-size: 1.8rem; color: #444; font-family: "Times New Roman", serif; margin: 0 40px; font-weight: bold; }
      .cvd-ba-header h3.after-title { color: #A82C2C; }
      .cvd-ba-box { display: flex; margin-top: 15px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: #fff; }
      
      .cvd-ba-left { width: 50%; padding: 20px 40px 20px 40px; background: #EEE9DC; border-radius: 4px 0 0 4px; position: relative; z-index: 2; }
      .cvd-ba-left::after {
        content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 30px;
        background: #EEE9DC; clip-path: polygon(0 0, 0 100%, 100% 50%); z-index: 3;
      }
      .cvd-ba-right { width: 50%; padding: 20px 40px 20px 60px; background: #C69429; border-radius: 0 4px 4px 0; position: relative; }
      
      .cvd-ba-item { display: flex; align-items: center; gap: 15px; font-size: 1.2rem; min-height: 65px; border-bottom: 1px solid rgba(0,0,0,0.06); }
      .cvd-ba-left .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-right .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      
      .cvd-ba-left .cvd-ba-item { color: #555; }
      .cvd-ba-left .cvd-ba-icon { color: #BBA072; font-size: 0.6rem; }
      .cvd-ba-right .cvd-ba-item { color: #fff; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.25); text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
      .cvd-ba-right .cvd-ba-icon { color: #fff; font-size: 1.2rem; }

      .cvd-learn-grid { display: grid; grid-template-columns: repeat(3, 1fr); justify-items: center; align-items: start; gap: 20px; margin-top: 40px; max-width: 1200px; margin-left: auto; margin-right: auto; }
      .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(6, 1fr); }
      .cvd-learn-item { width: 100%; max-width: 180px; text-align: center; }
      .cvd-learn-item img { max-width: 150px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; }
      .cvd-learn-item p { font-size: 1rem; color: #444; font-weight: 600; line-height: 1.4; }

      .cvd-sidebar-heading { font-family: 'Times New Roman', serif; font-size: 1.8rem; color: #591C21; font-weight: bold; margin-bottom: 25px; text-align: center; position: relative; }
      .cvd-sidebar-heading::after { content: ''; display: block; width: 60px; height: 3px; background: #B27C31; margin: 10px auto 0 auto; }

      .cvd-strip { 
        background: linear-gradient(to right, #F5DEB3, #D4AF37, #F5DEB3); 
        padding: 30px; 
        margin-top: 50px; 
      }
      .cvd-strip-inner {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
        max-width: 1000px;
        margin: 0 auto;
      }
      .cvd-strip-text { font-size: 1.5rem; color: #591C21; font-weight: bold; margin: 0; text-align: left; }
      .cvd-strip-btn { display: inline-flex; align-items: center; gap: 10px; background: #CC0000; color: #fff !important; padding: 12px 30px; font-size: 1.3rem; font-weight: bold; border-radius: 4px; text-decoration: none; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: background 0.2s ease; }
      .cvd-strip-btn:hover { background: #AA0000; }
      .cvd-strip-link { color: #800000; font-weight: bold; text-decoration: underline; font-size: 0.95rem; margin-top: 8px; display: block; text-align: center; }

      .cvd-faq { max-width: 800px; margin: 30px auto; }
      .cvd-faq-item { background: #E8E8E8; margin-bottom: 10px; border-radius: 6px; overflow: hidden; }
      .cvd-faq-question { padding: 15px 20px; display: flex; justify-content: space-between; cursor: pointer; color: #333; font-weight: 500; }
      .cvd-faq-answer { padding: 0 20px 15px 20px; display: none; color: #555; line-height: 1.6; text-align:left; }
      .cvd-faq-item.active .cvd-faq-answer { display: block; }
      .cvd-faq-icon { font-weight: bold; background: #666; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;}

      .cvd-module-card {
        background: #FFF;
        border-radius: 8px;
        padding: 25px 20px;
        margin-bottom: 25px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.04);
        border: 1px solid #EAEAEA;
        border-top: 4px solid #7D2C30;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .cvd-module-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.08);
      }
      .cvd-module-title {
        text-align: center;
        color: #591C21;
        font-size: 1.3rem;
        font-weight: bold;
        margin-bottom: 15px;
      }
      .cvd-module-weeks {
        font-size: 0.95rem;
        color: #333;
        font-weight: 600;
        margin-bottom: 10px;
      }
      .cvd-module-card ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .cvd-module-card li {
        font-size: 0.95rem;
        color: #555;
        margin-bottom: 10px;
        position: relative;
        padding-left: 15px;
        line-height: 1.5;
      }
      .cvd-module-card li::before {
        content: '▸';
        color: #B98E45;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 1rem;
      }

      @media (max-width: 991px) {
        .cvd-layout-container { flex-direction: column; overflow-x: hidden; }
        .cvd-sidebar { width: 100% !important; position: static !important; margin-top: 40px; }
        .cvd-4col { grid-template-columns: repeat(2, 1fr); }
        .cvd-learn-grid { grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(3, 1fr); }
        .cvd-3col { gap: 15px; }
        .cvd-ba-item { font-size: 1.05rem; }
        .cvd-hero-container { padding: 0 20px; }
      }
      @media (max-width: 768px) {
        /* Global overflow fix */
        html, body { overflow-x: hidden; max-width: 100%; padding: 0; margin: 0; }
        .cvd-main-content, .cvd-layout-container { overflow-x: hidden; max-width: 100%; width: 100%; padding: 0 !important; margin: 0 !important; box-sizing: border-box; }
        
        .cvd-hero { padding: 20px 0 30px 0; }
        .cvd-hero-container { flex-direction: column-reverse; text-align: center; padding: 0 15px; min-height: auto; }
        .cvd-hero-text { max-width: 100%; padding: 10px 5px 20px 5px; }
        .cvd-hero-title { font-size: 2rem; }
        .cvd-hero-subtitle { font-size: 1.3rem; }
        .cvd-hero-hook { font-size: 1rem; }
        .cvd-hero-btn { font-size: 1.15rem; padding: 10px 25px; width: 100%; text-align: center; box-sizing: border-box; }
        .cvd-hero-img-wrap { display: flex; align-items: center; justify-content: center; position: relative; width: 100%; height: auto; transform: none; margin-top: 0; pointer-events: auto; }
        .cvd-hero-img-wrap img { width: 100%; height: 300px; max-width: 400px; margin: 0 auto; object-position: 85% center; object-fit: cover; }
        
        .cvd-section { padding: 20px 15px; overflow: hidden; }
        .cvd-title { font-size: 1.8rem; word-wrap: break-word; overflow-wrap: break-word; }
        .cvd-desc { font-size: 1.05rem; line-height: 1.6; padding: 0 5px; }
        
        .cvd-3col { grid-template-columns: 1fr; gap: 20px; max-width: 350px; margin: 0 auto; }
        .cvd-3col-card img { height: 180px; }
        .cvd-3col-card p { font-size: 1.05rem; }
        
        .cvd-ba-container { max-width: 1050px; margin: 10px auto 40px auto; }
      .cvd-ba-header { display: flex; align-items: center; padding: 0 10px; }
      .cvd-ba-header h3 { font-size: 1.8rem; color: #444; font-family: "Times New Roman", serif; margin: 0 40px; font-weight: bold; }
      .cvd-ba-header h3.after-title { color: #A82C2C; }
      .cvd-ba-box { display: flex; margin-top: 15px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: #fff; }
      
      .cvd-ba-left { width: 50%; padding: 20px 40px 20px 40px; background: #EEE9DC; border-radius: 4px 0 0 4px; position: relative; z-index: 2; }
      .cvd-ba-left::after { content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 30px; background: #EEE9DC; clip-path: polygon(0 0, 0 100%, 100% 50%); z-index: 3; }
      .cvd-ba-right { width: 50%; padding: 20px 40px 20px 60px; background: #C69429; border-radius: 0 4px 4px 0; position: relative; }
      
      .cvd-ba-item { display: flex; align-items: center; gap: 15px; font-size: 1.2rem; min-height: 65px; border-bottom: 1px solid rgba(0,0,0,0.06); }
      .cvd-ba-left .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-right .cvd-ba-item:last-child { border-bottom: none; min-height: 55px; }
      .cvd-ba-left .cvd-ba-item { color: #555; }
      .cvd-ba-left .cvd-ba-icon { color: #BBA072; font-size: 0.6rem; }
      .cvd-ba-right .cvd-ba-item { color: #fff; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.25); text-shadow: 0 1px 2px rgba(0,0,0,0.1); }
      .cvd-ba-right .cvd-ba-icon { color: #fff; font-size: 1.2rem; }
        .cvd-learn-grid, .cvd-learn-grid.cvd-learn-fullwidth { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .cvd-learn-item { max-width: 140px; }
        .cvd-learn-item img { max-width: 90px; height: 90px; object-fit: cover; }
        .cvd-learn-item p { font-size: 0.85rem; }
        
        .cvd-strip { padding: 20px 15px; }
        .cvd-strip-inner { flex-direction: column; text-align: center; gap: 15px; }
        .cvd-strip-text { text-align: center; font-size: 1.2rem; }
        .cvd-strip-btn { width: 100%; justify-content: center; box-sizing: border-box; font-size: 1.1rem; }
        
        .cvd-4col { grid-template-columns: 1fr; }
        
        .cvd-sidebar { width: 100% !important; padding: 0 10px !important; box-sizing: border-box; }
        
        .cvd-module-card { padding: 15px 12px; }
        .cvd-module-title { font-size: 1.15rem; }
        
        .cvd-faq { padding: 0 5px; }
        .cvd-faq-question { font-size: 0.95rem; padding: 12px 15px; }
      }
    </style>
  `;

  const html = `
    ${customStyles}
    <!-- START MAIN LAYOUT WITH SIDEBAR -->
    <div class="cvd-layout-container" style="display: flex; flex-wrap: wrap; gap: 50px; max-width: 1400px; margin: 20px auto 60px auto; align-items: flex-start; padding: 0 20px;">
      
      <div class="cvd-main-content" style="flex: 1; min-width: 0;">

        <section class="cvd-hero">
          <div class="cvd-hero-container">
            <div class="cvd-hero-text">
              <div class="cvd-hero-badge"><i class="fas fa-award"></i> ${levelLabel} Certification</div>
              <div class="cvd-hero-title">Numerology Science:</div>
              <div class="cvd-hero-subtitle">Unlock Your True Potential & Destiny</div>
              <div class="cvd-hero-hook" style="font-weight: 500;">Discover how the vibrations of your birth date and name shape your future, career, and relationships.</div>
              
              <a href="${courseSlug}.html" class="cvd-hero-btn">Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'}</span> ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4,199'}</a>
              <div class="cvd-hero-save"><i class="fas fa-check" style="color: #6B8E23;"></i> Save ${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% Today &nbsp;&middot;&nbsp; Duration: ${levelSlug === 'grand-master' ? '48 Weeks' : (levelSlug === 'masters' ? '16 Weeks' : (levelSlug === 'bachelors' ? '12 Weeks' : '8 Weeks'))}</div>
              
              <div style="margin-top: 25px;">
                <a href="${courseSlug}.html" style="color: #B27C31; font-weight: 600; text-decoration: underline; font-size: 1rem;">
                  For price comparison follow this <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                </a>
              </div>
            </div>
            <div class="cvd-hero-img-wrap">
              <img src="assets/images-optimized/numerology/Vedic Numerology.webp" alt="Numerology Mastery" />
            </div>
          </div>
        </section>

        <section class="cvd-section" style="padding-top: 40px;">
          <h2 class="cvd-title">Your Numbers Hold the Keys to Success</h2>
          <div class="cvd-desc">Every number in your life has a frequency. By understanding and aligning with these frequencies, you can attract prosperity, love, and growth.</div>
          
          <div class="cvd-3col">
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/numerology/img 1.webp" alt="Relationship Issues">
              <p>Relationship Harmony</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/numerology/img 2.webp" alt="Career Decisions">
              <p>Career Decisions</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/numerology/img 3.webp" alt="Health Concerns">
              <p>Financial Growth</p>
            </div>
          </div>
        </section>

        <section class="cvd-section cvd-section-bg">
          <div class="cvd-ba-container">
            <div class="cvd-ba-header">
              <div style="flex:1; height:1px; background:#D5CEBE;"></div>
              <h3>Before</h3>
              <div style="flex:1; height:1px; background:#D5CEBE; position: relative;">
                 <i class="fas fa-caret-right" style="position: absolute; right: -5px; top: -7px; color: #D5CEBE; font-size: 14px;"></i>
              </div>
              <h3 class="after-title">After</h3>
              <div style="flex:1; height:1px; background:#D5CEBE;"></div>
            </div>
            
            <div class="cvd-ba-box">
              <div class="cvd-ba-left">
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Unsure of Life Purpose</div>
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Repeating the Same Mistakes</div>
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Missing Out on Opportunities</div>
              </div>
              <div class="cvd-ba-right">
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Deep Sense of Clarity</div>
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Strategic Future Planning</div>
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Confident Decision Making</div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <!-- Right Section Sidebar -->
      <aside class="cvd-sidebar" id="cvd-dynamic-sidebar" style="width: 380px; flex-shrink: 0; padding-top: 20px;">
        <h3 class="cvd-sidebar-heading">${levelLabel} Course Curriculum</h3>
        ${modulesHtml}
      </aside>

    </div>

    <!-- FULL WIDTH SECTIONS -->
    <section id="cvd-learn-section" class="cvd-section cvd-section-bg" style="padding-top: 20px; background-color: transparent;">
      <div style="display:flex; justify-content:center; align-items:center; margin: 30px auto 30px auto; max-width:800px;">
        <hr style="flex:1; border:none; border-top:1px solid #ccc;">
        <h2 class="cvd-title" style="margin: 0 30px;">What You'll Learn</h2>
        <hr style="flex:1; border:none; border-top:1px solid #ccc;">
      </div>
      
      <div class="cvd-learn-grid cvd-learn-fullwidth">
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/numerology/Life Path Calculation.webp" alt="Life Path Calculation">
          <p>Calculate<br>Your Life Path</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/numerology/Name Number Vibration.webp" alt="Name Number Vibration">
          <p>Name Number<br>Vibrations</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/numerology/Predict Important Years.webp" alt="Predict Important Years">
          <p>Predict Upcoming<br>Years</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/numerology/Compatibility Analysis.webp" alt="Compatibility Analysis">
          <p>Relationship<br>Compatibility</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/numerology/Remedies and Solutions.webp" alt="Remedies and Solutions">
          <p>Remedies<br>and Solutions</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/numerology/Brand Name Value.webp" alt="Brand Name Value">
          <p>Brand Name<br>Evaluation</p>
        </div>
      </div>
    </section>

    <div class="cvd-strip">
      <div class="cvd-strip-inner">
        <div class="cvd-strip-text">
          Limited Offer: Only ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4199'} 
          <span style="font-size:1.1rem; color:#444; font-weight:normal; display:block; margin-top:5px;">(Save ${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% &ndash; Regular Price ${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'})</span>
        </div>
        <div>
          <a href="${courseSlug}.html" class="cvd-strip-btn"><i class="far fa-file-alt"></i> Get Started Now!</a>
          <a href="${courseSlug}.html" class="cvd-strip-link">For price comparison follow this</a>
        </div>
      </div>
    </div>
  `;
  mainEl.innerHTML = html;
  document.title = `${levelLabel} in Numerology — Parashari Institute`;

  setTimeout(() => {
    const mainContent = document.querySelector('.cvd-main-content');
    const sidebar = document.querySelector('.cvd-sidebar');
    const learnSection = document.getElementById('cvd-learn-section');
    if (mainContent && sidebar && learnSection) {
      if (sidebar.offsetHeight > mainContent.offsetHeight + 400) {
        learnSection.querySelector('.cvd-learn-grid').classList.remove('cvd-learn-fullwidth');
        mainContent.appendChild(learnSection);
      }
    }
  }, 50);
}
