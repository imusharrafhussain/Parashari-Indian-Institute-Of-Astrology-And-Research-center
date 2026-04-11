/**
 * Course-Specific Overrides for Level Detail Pages
 * Loaded AFTER level-data.js — merges unique modules, outcomes, case studies
 * into each course entry so they don't all clone Vedic Astrology.
 */
(function() {
  // Helper to build a standard 4-level course override
  function buildCourse(slug, opts) {
    if (!LEVEL_DATA[slug]) return;
    const c = LEVEL_DATA[slug];
    // Override top-level
    if (opts.image) c.image = opts.image;

    // Merge each level
    ['diploma','bachelors','masters','grand-master'].forEach(lv => {
      if (opts[lv] && c.levels[lv]) {
        Object.assign(c.levels[lv], opts[lv]);
      }
    });
  }

  // ═══════════════════════════════════════
  // NUMEROLOGY
  // ═══════════════════════════════════════
  buildCourse('numerology', {
    diploma: {
      headline: "Decode the Hidden Language of Numbers",
      hook: "Every number carries a vibration. Learn to read it.",
      outcomes: [
        "Calculate and interpret Life Path, Destiny & Soul numbers",
        "Construct a complete Numerology chart from any birth date",
        "Understand the vibrational significance of numbers 1–9",
        "Analyze name vibrations using Chaldean & Pythagorean systems"
      ],
      modules: [
        { title: "History & Philosophy of Numbers", weeks: "Week 1–2", lessons: ["Origins of Numerology — Chaldean, Pythagorean, Vedic", "The spiritual significance of numbers 1–9", "Master Numbers 11, 22, 33 — recognition & meaning"] },
        { title: "The Core Numerology Chart", weeks: "Week 3–4", lessons: ["Life Path Number calculation & interpretation", "Destiny (Expression) Number deep-dive", "Soul Urge & Personality Number analysis"] },
        { title: "Advanced Grid Systems", weeks: "Week 5–6", lessons: ["Lo Shu Grid construction & interpretation", "Missing numbers & their karmic implications", "Planes of Expression — Mental, Physical, Emotional, Intuitive"] },
        { title: "Chronology & Forecasting", weeks: "Week 7–8", lessons: ["Personal Year, Month & Day cycles", "Pinnacle & Challenge numbers", "Basic name correction principles"] }
      ],
      caseStudy: { scenario: "A client born on 14-03-1992 asks: 'Why do I keep failing in business?'", steps: ["Calculate the Life Path number (1+4+0+3+1+9+9+2 = 29 → 11/2)", "Analyze the Lo Shu grid for missing numbers", "Check if business name vibration conflicts with personal numbers"], insight: "At Diploma level, you learn to connect birth numbers and name vibrations to real-life patterns — transforming abstract digits into actionable guidance." },
      diffTitle: "Your Entry Point into Number Science",
      diffPoints: ["Complete foundation in both Chaldean & Pythagorean systems", "Lo Shu Grid mastery for personality profiling", "Personal cycle forecasting for timing decisions", "Govt-approved certification"],
      applications: ["Understand your own life patterns through numbers", "Analyze lucky dates and numbers for personal decisions", "Read basic charts for family and friends", "Build a foundation for professional numerology"]
    },
    bachelors: {
      headline: "Turn Number Readings Into Practical Guidance",
      hook: "Numbers don't lie. Learn to make them speak.",
      outcomes: [
        "Perform advanced compatibility readings for relationships",
        "Optimize business names and brand vibrations for success",
        "Forecast multi-year life cycles with precision",
        "Guide clients on career and financial timing using number cycles",
        "Apply remedial number corrections with confidence"
      ],
      modules: [
        { title: "Advanced Core Numbers", weeks: "Week 1–2", lessons: ["Karmic Debt numbers (13, 14, 16, 19)", "Hidden Passion & Subconscious Self", "Maturity Number & life-phase transitions"] },
        { title: "Relationship Dynamics", weeks: "Week 3–4", lessons: ["Partner compatibility analysis", "Parent-child number synergies", "Business partnership vibrational matching"] },
        { title: "Business & Brand Optimization", weeks: "Week 5–7", lessons: ["Company name vibration analysis", "Logo & branding through numerology", "Product launch timing using number cycles"] },
        { title: "Graphology & Signatures", weeks: "Week 8–9", lessons: ["Signature analysis fundamentals", "Handwriting patterns & personality", "Signature correction for better vibrations"] },
        { title: "Forecasting & Remedies", weeks: "Week 10–11", lessons: ["Multi-year cycle mapping", "Remedial name spelling adjustments", "Color, gemstone & number remedies"] },
        { title: "Professional Consultation", weeks: "Week 12", lessons: ["Client intake & report generation", "Consultation structure & ethics", "Building a numerology practice"] }
      ],
      caseStudy: { scenario: "A startup founder asks: 'Is my company name vibrationally aligned for growth?'", steps: ["Calculate the business name number using Chaldean system", "Cross-reference with founder's Life Path and Destiny numbers", "Analyze the launch date numerology for timing conflicts", "Suggest letter modifications to optimize the brand vibration"], insight: "At Bachelors level, you don't just read personal charts — you provide strategic business guidance that directly impacts financial outcomes." },
      diffTitle: "What Diploma Doesn't Cover",
      diffPoints: ["Advanced compatibility & relationship analysis", "Business name and branding numerology", "Graphology integration for deeper personality insights", "Professional consultation and practice-building skills", "Remedial name correction techniques"],
      applications: ["Offer professional readings for relationships and careers", "Consult on business naming and brand optimization", "Guide clients through major life transitions", "Begin building a paid numerology practice"]
    },
    masters: {
      headline: "Become the Numerologist Others Refer To",
      hook: "Mastery means seeing what others miss in every number.",
      outcomes: [
        "Integrate numerology with astrology for multi-system readings",
        "Handle complex corporate consultations with authority",
        "Develop proprietary forecasting methodologies",
        "Mentor junior numerologists with structured programs",
        "Command premium fees for specialized readings"
      ],
      modules: [
        { title: "Advanced Grid Mastery", weeks: "Week 1–3", lessons: ["Arrow formations in Lo Shu Grid", "Repetition patterns & intensity analysis", "Multi-person grid comparison techniques"] },
        { title: "Corporate Numerology", weeks: "Week 4–6", lessons: ["Board of Directors compatibility mapping", "Office address & floor number optimization", "Merger & acquisition timing analysis"] },
        { title: "Predictive Integration", weeks: "Week 7–9", lessons: ["Numerology-Astrology cross-referencing", "Transit cycles vs Personal Year synchronization", "Multi-decade life trajectory mapping"] },
        { title: "Graphology & Signatures", weeks: "Week 10–11", lessons: ["Advanced handwriting analysis", "Corporate signature consulting", "Legal document vibration analysis"] },
        { title: "Advanced Remedies", weeks: "Week 12–14", lessons: ["Yantra number grids for manifestation", "Color therapy aligned with number vibrations", "Gemstone prescriptions based on missing numbers"] },
        { title: "Professional Practice", weeks: "Week 15–16", lessons: ["High-ticket client management", "Premium report generation systems", "Ethics and professional standards"] }
      ],
      caseStudy: { scenario: "A CEO asks: 'Should I restructure my leadership team based on vibrational alignment?'", steps: ["Map each executive's core numbers and grid patterns", "Analyze inter-personal compatibility across the leadership team", "Cross-reference with the company's founding date and name vibration", "Identify vibrational conflicts causing organizational friction", "Design a restructuring recommendation with supporting data"], insight: "At Masters level, you operate as a strategic advisor — your numerology insights directly shape organizational decisions worth millions." },
      lockedTopics: ["Secret Yantra Number Grid Construction", "Multi-System Predictive Synthesis (Numerology + Astrology)", "Corporate Board Compatibility Frameworks", "Premium Client Psychology & Pricing Strategy"],
      diffTitle: "What Bachelors Doesn't Cover",
      diffPoints: ["Corporate and organizational numerology consulting", "Multi-system integration (Numerology + Astrology)", "Advanced Yantra and remedial grid construction", "High-ticket client management and premium pricing", "Mentorship and teaching capabilities"],
      applications: ["Consult for corporations on naming and team dynamics", "Integrate numerology with astrology for holistic readings", "Run a high-ticket professional practice", "Mentor aspiring numerologists", "Generate premium research and thought leadership"]
    },
    "grand-master": {
      headline: "Command Absolute Authority in Numerology",
      hook: "This is where science meets intuition at the highest level.",
      outcomes: [
        "Deliver masterclass-level multi-system consultations",
        "Build and scale a premium numerology consulting brand",
        "Publish original research in vibrational science",
        "Certify and mentor the next generation of numerologists",
        "Navigate the most complex corporate and personal cases"
      ],
      modules: [
        { title: "Elite Number Science", weeks: "Week 1–8", lessons: ["Advanced Chaldean system edge cases", "Rare number patterns & their significance", "Cross-cultural numerology comparison"] },
        { title: "Advanced Business Consulting", weeks: "Week 9–18", lessons: ["IPO timing & market numerology", "Real estate number optimization", "Global brand vibration analysis"] },
        { title: "Multi-System Mastery", weeks: "Week 19–28", lessons: ["Complete Astro-Numerology integration", "Tarot-Numerology cross-referencing", "Energy healing through number vibrations"] },
        { title: "Research & Publishing", weeks: "Week 29–38", lessons: ["Original research methodology", "Case study documentation standards", "Publishing and thought leadership"] },
        { title: "Authority & Practice Building", weeks: "Week 39–48", lessons: ["Premium brand development", "Client acquisition at scale", "Mentorship certification program", "Legacy building in numerology"] }
      ],
      lockedTopics: ["Secret Master Number activation protocols", "IPO & Market Timing through Numerology", "Cross-cultural vibrational synthesis", "Personal mentorship with senior faculty", "Research publication support", "Practice scaling from ₹0 to ₹10L/month"],
      diffTitle: "What Masters Doesn't Cover",
      diffPoints: ["48 weeks of deep, mentored immersion", "Original research methodology and publication", "Business scaling and premium brand building", "Free 6 Spiritual Stairs Pathway (exclusive)", "Teaching and mentorship certification", "Access to rare, faculty-only number patterns"],
      applications: ["Run a nationally recognized numerology practice", "Consult for Fortune 500 companies and high-net-worth individuals", "Publish original research and build authority", "Certify the next generation of numerologists", "Command premium consultation fees with confidence"]
    }
  });

  // ═══════════════════════════════════════
  // KP ASTROLOGY
  // ═══════════════════════════════════════
  buildCourse('kp-astrology', {
    diploma: {
      headline: "Master the Most Precise Predictive System",
      hook: "Where traditional astrology guesses, KP pinpoints.",
      outcomes: ["Understand the Placidus house system and its advantages", "Apply the revolutionary Sub-Lord Theory to any chart", "Construct and interpret Cuspal Interlinks", "Use Ruling Planets (RP) for instant verification"],
      modules: [
        { title: "Fundamental Principles & Placidus", weeks: "Week 1–2", lessons: ["KP vs Traditional: Why precision matters", "Placidus House Division system", "Star-Lord & Sub-Lord concept"] },
        { title: "The Sub-Lord Theory", weeks: "Week 3–4", lessons: ["Sub-Lord determination methodology", "Significators and their hierarchy", "Promise vs Denial in horoscope analysis"] },
        { title: "Cuspal Interlinks", weeks: "Week 5–6", lessons: ["Cuspal sub-lord connections", "Event-specific cusp analysis", "Multi-cusp cross-validation"] },
        { title: "Horary (Prashna) Astrology", weeks: "Week 7–8", lessons: ["KP Horary system fundamentals", "Number-based chart casting", "Quick question resolution technique"] }
      ],
      caseStudy: { scenario: "A student asks: 'Will I pass my upcoming competitive exam?'", steps: ["Cast a KP Horary chart using the querent's number", "Analyze the Sub-Lord of the 4th cusp (education)", "Check Ruling Planets for confirmation"], insight: "KP gives a binary YES/NO answer backed by sub-lord analysis — no ambiguity, just precision." },
      diffTitle: "Your Entry into Precision Astrology",
      diffPoints: ["The only system that gives binary YES/NO predictions", "Sub-Lord Theory — KP's revolutionary contribution", "Horary astrology for instant answers", "Government-approved certification"],
      applications: ["Answer specific life questions with YES/NO precision", "Read horary charts for quick predictions", "Understand why KP is preferred by professional astrologers", "Build a foundation for advanced KP study"]
    },
    bachelors: {
      headline: "From Theory to Pinpoint-Accurate Predictions",
      hook: "Predict events with a precision that stuns clients.",
      outcomes: ["Time events using KP Dasha and transit systems", "Apply Ruling Planets theory for real-time verification", "Analyze significance tables for multi-domain predictions", "Handle career, marriage, and health queries with KP methodology"],
      modules: [
        { title: "Advanced Sub-Lord Analysis", weeks: "Week 1–3", lessons: ["Multi-level significator tables", "Fruitful vs Unfruitful sub-lords", "Source-separator-connecting planet theory"] },
        { title: "Ruling Planets (RP) Theory", weeks: "Week 4–5", lessons: ["RP calculation methodology", "RP-based timing of events", "Filtering significators using RP"] },
        { title: "Timing of Events", weeks: "Week 6–8", lessons: ["KP Dasha system (Vimshottari in KP)", "Transit triggers in KP framework", "Pinpointing event month, week & day"] },
        { title: "Significance & Indicators", weeks: "Week 9–10", lessons: ["Significator table construction", "Domain-specific analysis (career, marriage, health)", "Multi-house connection interpretation"] },
        { title: "Horary Advanced", weeks: "Week 11", lessons: ["Complex horary questions", "Multiple querent analysis", "Horary for lost objects and legal matters"] },
        { title: "Professional Synthesis", weeks: "Week 12", lessons: ["Complete chart reading methodology", "Client consultation framework", "Report generation for KP readings"] }
      ],
      caseStudy: { scenario: "A professional asks: 'Exactly when will I get promoted?'", steps: ["Build the significator table for houses 2, 6, 10, 11", "Identify the running Dasha-Bhukti-Antara periods", "Apply Ruling Planets to filter the most likely timing", "Cross-validate with transit triggers over the 10th cusp"], insight: "At Bachelors level, you narrow predictions to specific months — a precision no other system can match." },
      diffTitle: "What Diploma Doesn't Cover",
      diffPoints: ["Ruling Planets theory for real-time verification", "Event timing to the month and week", "Advanced significator table construction", "Professional consultation methodology", "Complex horary for legal and financial matters"],
      applications: ["Time career and financial events with precision", "Offer professional KP consultations", "Handle complex multi-domain predictions", "Begin building a specialized KP practice"]
    },
    masters: {
      headline: "The KP Expert Professionals Trust",
      hook: "Be the astrologer who gives dates, not vague predictions.",
      outcomes: ["Synthesize KP with traditional systems for complete analysis", "Handle the most complex predictive challenges", "Train others in KP methodology", "Run a high-demand professional practice"],
      modules: [
        { title: "Advanced Cuspal Analysis", weeks: "Week 1–3", lessons: ["All 12 cusps — exhaustive analysis", "Cusp-to-cusp interlink mastery", "Edge cases in cuspal interpretation"] },
        { title: "KP & Traditional Integration", weeks: "Week 4–6", lessons: ["Combining KP with Parashari principles", "Yoga analysis within KP framework", "Remedial measures in KP context"] },
        { title: "Precision Timing", weeks: "Week 7–9", lessons: ["Day-level event prediction methodology", "Transit window calculation", "Multi-system timing validation"] },
        { title: "Specialized Domains", weeks: "Week 10–12", lessons: ["Medical astrology through KP", "Financial market timing", "Relationship and compatibility in KP"] },
        { title: "Advanced Horary", weeks: "Week 13–14", lessons: ["Corporate and business horary", "Missing person and forensic applications", "Advanced verification techniques"] },
        { title: "Professional Mastery", weeks: "Week 15–16", lessons: ["High-volume practice management", "Premium consultation structuring", "Ethics and professional standards"] }
      ],
      lockedTopics: ["Day-Level Event Prediction Protocols", "KP-Parashari Integration Framework", "Financial Market Timing Methodology", "Advanced Forensic Horary Techniques"],
      caseStudy: { scenario: "A business owner asks: 'On which exact date should I sign this ₹10 crore deal?'", steps: ["Analyze the 7th and 11th cusps for partnership success indicators", "Build significator tables for houses 2, 7, 10, 11", "Apply Ruling Planets with transit triggers to narrow to specific dates", "Cross-validate with Panchanga for auspicious tithi and nakshatra", "Provide a ranked list of 3 optimal dates with confidence levels"], insight: "At Masters level, you provide specific dates for high-stakes decisions — the kind of precision that builds an elite reputation." },
      diffTitle: "What Bachelors Doesn't Cover",
      diffPoints: ["Day-level event prediction (not just months)", "KP + Traditional system integration", "Specialized domains: medical, financial, forensic", "Advanced horary for corporate decisions", "Premium practice management"],
      applications: ["Handle high-stakes corporate and financial predictions", "Integrate KP with Parashari for complete chart analysis", "Offer medical and specialized astrology consultations", "Train and mentor aspiring KP astrologers", "Run a high-demand, premium KP practice"]
    },
    "grand-master": {
      headline: "The Undisputed Authority in KP Astrology",
      hook: "When precision is non-negotiable, they consult you.",
      outcomes: ["Develop proprietary KP research methodologies", "Handle VIP and celebrity-level consultations", "Build a nationally recognized KP practice", "Certify the next generation of KP practitioners", "Publish original KP research"],
      modules: [
        { title: "Elite KP Foundations", weeks: "Week 1–8", lessons: ["Advanced Sub-Lord edge cases", "Rare cuspal configurations", "Mathematical precision in KP calculations"] },
        { title: "Advanced Prediction Systems", weeks: "Week 9–18", lessons: ["Ultra-precise timing methodologies", "Multi-year predictive frameworks", "Celebrity and VIP chart handling"] },
        { title: "Research & Innovation", weeks: "Week 19–30", lessons: ["Original KP research methodology", "Statistical validation of KP principles", "Publication and peer review standards"] },
        { title: "Practice & Authority", weeks: "Week 31–42", lessons: ["Premium client acquisition", "High-ticket consultation structuring", "Brand building in KP astrology"] },
        { title: "Legacy Building", weeks: "Week 43–48", lessons: ["Mentorship certification program", "Teaching methodology development", "Creating a KP school or institute"] }
      ],
      lockedTopics: ["Ultra-Precise Minute-Level Timing Protocols", "VIP Client Consultation Choreography", "Statistical KP Research Framework", "Personal Mentorship with Senior KP Faculty", "Institute and School Building Blueprint", "Proprietary KP Software Development Guide"],
      diffTitle: "What Masters Doesn't Cover",
      diffPoints: ["48 weeks of mentored immersion in KP mastery", "Original research and publication support", "Celebrity and VIP consultation protocols", "Institute and school building guidance", "Free 6 Spiritual Stairs Pathway (exclusive)", "Mentorship and teaching certification"],
      applications: ["Run the most respected KP practice in your region", "Consult for corporations and high-net-worth individuals", "Publish original KP research", "Build and run a KP training institute", "Certify the next generation of KP masters"]
    }
  });

  // ═══════════════════════════════════════
  // LAL KITAB
  // ═══════════════════════════════════════
  buildCourse('lal-kitab', {
    diploma: {
      headline: "Unlock the Red Book's Legendary Remedy System",
      hook: "Where traditional astrology prescribes gemstones, Lal Kitab prescribes life-changing totkas.",
      outcomes: ["Read a Lal Kitab chart using its unique grammar", "Identify planetary debts (Rin) and their life effects", "Understand awakened, sleeping & kayam planet states", "Apply basic Lal Kitab remedies (totkas) with understanding"],
      modules: [
        { title: "Lal Kitab Grammar", weeks: "Week 1–2", lessons: ["Lal Kitab vs Parashari — key differences", "The 12 houses in Lal Kitab framework", "Planetary placement rules unique to Lal Kitab"] },
        { title: "Aspects & Planetary States", weeks: "Week 3–4", lessons: ["Lal Kitab aspects system", "Awakened vs Sleeping vs Kayam planets", "Planetary friends and enemies in Lal Kitab"] },
        { title: "Debts (Rin) & Pitra Dosha", weeks: "Week 5–6", lessons: ["The 5 types of debts (Rin)", "Identifying Pitra Rin from chart", "Ancestral karma and its manifestation"] },
        { title: "Basic Remedies & Varshphal", weeks: "Week 7–8", lessons: ["Foundational Lal Kitab totkas", "Varshphal (annual chart) basics", "Remedy selection methodology"] }
      ],
      caseStudy: { scenario: "A man suffering repeated financial losses asks for help.", steps: ["Identify Jupiter's state (sleeping/kayam) in the chart", "Check for ancestral debt related to Jupiter (Guru Rin)", "Apply the appropriate Lal Kitab totka for debt resolution"], insight: "Lal Kitab remedies are simple, free, and incredibly effective — no expensive gemstones needed." }
    },
    bachelors: {
      headline: "Master the Art of Lal Kitab Remedies",
      hook: "The remedy astrologer everyone wants to consult.",
      outcomes: ["Construct and interpret Varshphal charts", "Apply the logic behind every remedy with precision", "Handle blind and half-blind chart configurations", "Prescribe remedies for career, health, marriage and finance"],
      modules: [
        { title: "Advanced Lal Kitab Grammar", weeks: "Week 1–2", lessons: ["Complex planetary placement rules", "Multi-planet combinations in Lal Kitab", "Edge cases in chart interpretation"] },
        { title: "Logic of Remedies", weeks: "Week 3–5", lessons: ["Why specific remedies work — the science behind totkas", "Remedy timing and duration rules", "Contraindications and remedy conflicts"] },
        { title: "Modern Integration", weeks: "Week 6–7", lessons: ["Lal Kitab + Parashari integration", "Modern applications of ancient remedies", "Debt resolution through sacrifice principles"] },
        { title: "Blind & Half-Blind Charts", weeks: "Week 8–10", lessons: ["Identifying blind chart configurations", "Half-blind chart interpretation", "Special remedies for blind charts"] },
        { title: "Varshphal Mastery", weeks: "Week 11", lessons: ["Annual chart construction", "Year-specific remedy planning", "Multi-year prediction through Varshphal"] },
        { title: "Professional Integration", weeks: "Week 12", lessons: ["Client consultation for remedy prescription", "Documentation and follow-up protocols", "Building a remedy-focused practice"] }
      ],
      caseStudy: { scenario: "A woman asks: 'Why does every relationship I enter end in betrayal?'", steps: ["Analyze Venus and Moon states in the Lal Kitab chart", "Check for Stri Rin (debt to feminine energy)", "Identify blind or half-blind chart configurations", "Prescribe a combination of totkas addressing the root debt"], insight: "At Bachelors level, you trace recurring life patterns to their karmic root in the chart — and prescribe targeted, specific remedies." }
    }
  });

  // ═══════════════════════════════════════
  // VASTU SHASTRA
  // ═══════════════════════════════════════
  buildCourse('vastu', {
    diploma: {
      headline: "Harmonize Spaces to Transform Lives",
      hook: "Every room has an energy. Learn to read and correct it.",
      outcomes: ["Apply the Pancha Bhootas (5 elements) to any space", "Analyze directional energy using the Vastu Mandala", "Identify and correct basic Vastu doshas in homes", "Understand the Vastu Purusha and its significance"],
      modules: [
        { title: "Five Elements, Grid & Mandala", weeks: "Week 1–2", lessons: ["Pancha Bhootas — Earth, Water, Fire, Air, Space", "The Vastu Purusha Mandala", "16-zone and 32-zone grid systems"] },
        { title: "Directional Analysis & Residentials", weeks: "Week 3–4", lessons: ["8 directions and their ruling deities", "Room placement rules for homes", "Kitchen, bedroom, prayer room positioning"] },
        { title: "Remedial Vastu Basics", weeks: "Week 5–6", lessons: ["Identifying common Vastu doshas", "Simple remedies without structural changes", "Color therapy fundamentals for spaces"] },
        { title: "Commercial Vastu Introduction", weeks: "Week 7–8", lessons: ["Office layout fundamentals", "Shop and retail Vastu basics", "Cash box and financial area placement"] }
      ],
      caseStudy: { scenario: "A homeowner complains of constant family conflicts since moving in.", steps: ["Analyze the main entrance direction and its Vastu implications", "Check the fire element placement (kitchen direction)", "Identify element imbalances in the family zone (Southwest)"], insight: "At Diploma level, you learn to connect spatial energy to human behavior — explaining why a seemingly nice house can create problems." }
    },
    bachelors: {
      headline: "From Home Corrections to Professional Consulting",
      hook: "Design spaces that attract prosperity, health, and harmony.",
      outcomes: ["Conduct professional residential Vastu audits", "Apply Vastu principles to commercial and industrial spaces", "Prescribe remedies using pyramids, crystals, and color therapy", "Guide architects and builders on Vastu-compliant designs"],
      modules: [
        { title: "Advanced Residential Vastu", weeks: "Week 1–2", lessons: ["Multi-story building analysis", "Flat and apartment Vastu challenges", "Plot shape analysis and corrections"] },
        { title: "Commercial & Industrial Vastu", weeks: "Week 3–5", lessons: ["Factory and warehouse optimization", "Hospital and clinic Vastu", "Hotel and restaurant energy flow"] },
        { title: "Remedial Vastu & Geobiology", weeks: "Week 6–7", lessons: ["Geopathic stress identification", "EMF and earth energy corrections", "Advanced remedy tools and techniques"] },
        { title: "Color Therapy & Pyramids", weeks: "Week 8–9", lessons: ["Advanced color psychology for spaces", "Pyramid placement methodology", "Crystal grid integration with Vastu"] },
        { title: "Town Planning", weeks: "Week 10–11", lessons: ["Colony and township Vastu principles", "Road and water body analysis", "Landscape and garden Vastu"] },
        { title: "Professional Practice", weeks: "Week 12", lessons: ["Site visit methodology", "Professional Vastu report generation", "Client consultation and follow-up"] }
      ],
      caseStudy: { scenario: "A factory owner faces continuous machinery breakdowns and worker accidents.", steps: ["Audit the factory layout against Vastu grid zones", "Check for geopathic stress under heavy machinery areas", "Analyze the fire element (Southeast) and its disruptions", "Prescribe non-structural remedies and zone corrections"], insight: "At Bachelors level, you handle industrial-grade problems that can save businesses lakhs in losses." }
    }
  });

  // ═══════════════════════════════════════
  // PALMISTRY
  // ═══════════════════════════════════════
  buildCourse('palmistry', {
    diploma: {
      headline: "Read Life Stories Written in Every Hand",
      hook: "The hand never lies. Learn its language.",
      outcomes: ["Identify and interpret all major palm lines with confidence", "Analyze hand shapes and finger types for personality profiling", "Read mounts and their significance for talent and destiny", "Provide basic life-event readings from palm analysis"],
      modules: [
        { title: "Hand Shape & Finger Analysis", weeks: "Week 1–2", lessons: ["The 4 hand types — Earth, Air, Fire, Water", "Finger length ratios and personality", "Thumb analysis — willpower and logic"] },
        { title: "Major Lines", weeks: "Week 3–4", lessons: ["Life Line — vitality, not longevity", "Head Line — thinking patterns and intelligence", "Heart Line — emotional nature and relationships"] },
        { title: "Secondary Lines & Mounts", weeks: "Week 5–6", lessons: ["Fate Line, Sun Line, Mercury Line", "The 7 mounts and their planetary rulers", "Mount development and career indicators"] },
        { title: "Practical Palm Reading", weeks: "Week 7–8", lessons: ["Combining lines and mounts for holistic reading", "Left vs Right hand interpretation", "Basic timing events on the palm"] }
      ],
      caseStudy: { scenario: "A 30-year-old professional asks: 'Will I find my true calling?'", steps: ["Analyze the Fate Line for career direction and timing", "Check the Sun Line for recognition and success indicators", "Examine the mount of Jupiter for ambition and leadership"], insight: "At Diploma level, you learn to read career potential and timing — giving direction, not just description." }
    },
    bachelors: {
      headline: "From Line Reading to Life Guidance",
      hook: "See what others miss. Predict what others can't.",
      outcomes: ["Perform advanced timing analysis on palm lines", "Read health indicators and medical palmistry signs", "Analyze compatibility between two palms", "Integrate dermatoglyphics for deeper personality reading"],
      modules: [
        { title: "Advanced Line Analysis", weeks: "Week 1–3", lessons: ["Line breaks, islands, chains — what they mean", "Cross-markings and special signs", "Rare line formations and their significance"] },
        { title: "Medical Palmistry", weeks: "Week 4–5", lessons: ["Health indicators on the palm", "Nails and health markers", "Stress and mental health indicators"] },
        { title: "Timing Techniques", weeks: "Week 6–7", lessons: ["Precision timing on Life, Fate and Head lines", "Event prediction methodology", "Cross-referencing multiple lines for timing"] },
        { title: "Compatibility Analysis", weeks: "Week 8–9", lessons: ["Comparing partner palms for relationship insights", "Family dynamics through palm analysis", "Business partnership compatibility"] },
        { title: "Dermatoglyphics", weeks: "Week 10–11", lessons: ["Fingerprint pattern analysis", "Ridge patterns and personality", "Scientific basis of dermatoglyphics"] },
        { title: "Professional Practice", weeks: "Week 12", lessons: ["Client consultation methodology", "Palm photography and documentation", "Building a palmistry practice"] }
      ]
    }
  });

  // ═══════════════════════════════════════
  // TAROT READING
  // ═══════════════════════════════════════
  buildCourse('tarot', {
    diploma: {
      headline: "Channel Intuition Through the Language of Tarot",
      hook: "Every card is a mirror. Learn to hold it up.",
      outcomes: ["Interpret all 78 Tarot cards — Major and Minor Arcana", "Perform foundational spreads (Celtic Cross, 3-Card, Past-Present-Future)", "Develop intuitive reading skills alongside structured interpretation", "Conduct readings for yourself and close ones with confidence"],
      modules: [
        { title: "Major Arcana Mastery", weeks: "Week 1–2", lessons: ["The Fool's Journey — 22 Major Arcana in depth", "Archetypal symbolism and visual keys", "Upright vs Reversed interpretations"] },
        { title: "Minor Arcana & Court Cards", weeks: "Week 3–4", lessons: ["Suits — Wands, Cups, Swords, Pentacles", "Number symbolism across the suits", "Court Cards — Pages, Knights, Queens, Kings"] },
        { title: "Spreads & Layouts", weeks: "Week 5–6", lessons: ["3-Card spreads for quick guidance", "Celtic Cross — the master spread", "Relationship and career-specific layouts"] },
        { title: "Intuition Development", weeks: "Week 7–8", lessons: ["Building intuitive connection with cards", "Meditation techniques for clarity", "Ethics and boundaries in reading"] }
      ],
      caseStudy: { scenario: "A student asks: 'Should I pursue higher studies abroad or take a job here?'", steps: ["Draw a Decision-Making spread with two pathways", "Analyze the outcome cards for each pathway", "Read the Advice card for the querent's higher guidance"], insight: "Tarot doesn't predict — it illuminates. At Diploma level, you learn to present choices and their energies, empowering the querent." }
    },
    bachelors: {
      headline: "From Card Reader to Intuitive Guide",
      hook: "When you master Tarot, every reading becomes a transformation.",
      outcomes: ["Design custom spreads for complex life situations", "Integrate numerology and elemental dignities into readings", "Handle emotionally charged readings with professional boundaries", "Build a thriving Tarot practice with repeat clients"],
      modules: [
        { title: "Advanced Card Combinations", weeks: "Week 1–3", lessons: ["Card pairing and storytelling", "Elemental dignities — harmony and conflict", "Number progressions across spreads"] },
        { title: "Custom Spread Design", weeks: "Week 4–5", lessons: ["Creating situation-specific layouts", "Multi-question session management", "Year-ahead forecast spreads"] },
        { title: "Tarot & Numerology Integration", weeks: "Week 6–7", lessons: ["Personal year cards and life path connections", "Numerological timing through Tarot", "Birth card and soul card analysis"] },
        { title: "Advanced Reading Techniques", weeks: "Week 8–9", lessons: ["Shadow work and psychological Tarot", "Relationship dynamics through card positions", "Career and financial guidance techniques"] },
        { title: "Client Psychology", weeks: "Week 10–11", lessons: ["Handling grief, loss, and anxiety in readings", "Setting healthy boundaries", "Repeat client management and follow-ups"] },
        { title: "Professional Practice", weeks: "Week 12", lessons: ["Online and offline reading platforms", "Pricing and packaging your services", "Building your personal Tarot brand"] }
      ]
    }
  });

  // ═══════════════════════════════════════
  // FACE READING
  // ═══════════════════════════════════════
  buildCourse('face-reading', {
    diploma: {
      headline: "Read Character & Destiny in Every Face",
      hook: "The face reveals what words conceal.",
      outcomes: ["Analyze facial geometry for personality traits", "Read the 12 facial zones and their life-domain connections", "Identify health indicators from facial features", "Perform basic character assessments with accuracy"],
      modules: [
        { title: "Fundamentals of Physiognomy", weeks: "Week 1–2", lessons: ["History and principles of face reading", "The 5 facial shapes and personality types", "Facial symmetry and its significance"] },
        { title: "The 12 Facial Zones", weeks: "Week 3–4", lessons: ["Forehead zones — intellect and career", "Mid-face zones — relationships and will", "Lower face zones — vitality and legacy"] },
        { title: "Feature-Specific Analysis", weeks: "Week 5–6", lessons: ["Eye shapes and emotional intelligence", "Nose types and financial indicators", "Mouth and chin — communication and determination"] },
        { title: "Practical Face Reading", weeks: "Week 7–8", lessons: ["Live face reading methodology", "Photo-based analysis techniques", "Combining features for holistic readings"] }
      ]
    },
    bachelors: {
      headline: "From Observation to Professional Character Analysis",
      hook: "See potential, predict behavior, guide decisions — through the face.",
      outcomes: ["Perform professional physiognomy consultations", "Apply face reading in HR and corporate contexts", "Read health and aging patterns through facial changes", "Integrate face reading with palmistry and astrology"],
      modules: [
        { title: "Advanced Feature Analysis", weeks: "Week 1–3", lessons: ["Ear shapes and early-life indicators", "Hairline patterns and intellectual capacity", "Wrinkle and marking interpretation"] },
        { title: "Health & Aging Patterns", weeks: "Week 4–5", lessons: ["Facial color diagnosis (TCM principles)", "Aging patterns and life-phase analysis", "Stress and lifestyle indicators on the face"] },
        { title: "Corporate Applications", weeks: "Week 6–7", lessons: ["Hiring and team-building through face reading", "Leadership trait identification", "Negotiation and sales psychology"] },
        { title: "Multi-System Integration", weeks: "Week 8–9", lessons: ["Face reading + Palmistry cross-referencing", "Facial features and astrological connections", "Building a comprehensive personality profile"] },
        { title: "Compatibility Analysis", weeks: "Week 10–11", lessons: ["Partner compatibility through facial analysis", "Family dynamics and parent-child face reading", "Business partner assessment"] },
        { title: "Professional Practice", weeks: "Week 12", lessons: ["Client photography and documentation", "Report generation methodology", "Building a face reading practice"] }
      ]
    }
  });

  // ═══════════════════════════════════════
  // REMAINING COURSES — Targeted overrides
  // ═══════════════════════════════════════

  // NADI JYOTISH
  buildCourse('nadi-jyotish', {
    diploma: {
      headline: "Access the Ancient Palm-Leaf Prophecy System",
      hook: "Predictions written thousands of years ago, waiting to be read.",
      outcomes: ["Understand the Nadi system and its unique methodology", "Identify Nadi patterns in birth charts", "Apply Bhrigu Nandi Nadi principles", "Read planetary combinations through Nadi lens"],
      modules: [
        { title: "Nadi System Foundations", weeks: "Week 1–2", lessons: ["History of Nadi Jyotish — Bhrigu, Agastya, Shuka traditions", "Difference from Parashari astrology", "Nadi Amsha and thumb impression classification"] },
        { title: "Bhrigu Nandi Nadi Basics", weeks: "Week 3–4", lessons: ["Two-planet combination reading", "Planetary pairs and their life-event predictions", "Karakas and their significance in Nadi"] },
        { title: "Nadi Prediction Techniques", weeks: "Week 5–6", lessons: ["House-wise Nadi prediction methodology", "Transit-based Nadi predictions", "Nadi Dasha systems"] },
        { title: "Practical Nadi Reading", weeks: "Week 7–8", lessons: ["Case studies in Nadi prediction", "Integrating Nadi with Parashari", "Ethics of Nadi prediction"] }
      ]
    }
  });

  // REMEDY COURSE
  buildCourse('remedy-course', {
    diploma: {
      headline: "Master the Complete Science of Astrological Remedies",
      hook: "Prescription without understanding is dangerous. Learn the why behind every remedy.",
      outcomes: ["Understand the logic and science behind astrological remedies", "Prescribe Mantra, Yantra, Gemstone and Daan remedies correctly", "Apply Lal Kitab totkas with proper methodology", "Avoid common remedy mistakes that practitioners make"],
      modules: [
        { title: "Remedy Science Foundations", weeks: "Week 1–2", lessons: ["Why remedies work — the vibrational science", "Planetary remedies classification system", "Contraindications and remedy conflicts"] },
        { title: "Mantra & Yantra Remedies", weeks: "Week 3–4", lessons: ["Beej Mantras for each planet", "Yantra activation and placement", "Mantra chanting rules and Sankalpa"] },
        { title: "Gemstone & Daan Remedies", weeks: "Week 5–6", lessons: ["Gemstone selection by chart analysis", "Weight, quality and wearing rules", "Daan (donation) remedies — what, when, and how"] },
        { title: "Lal Kitab & Practical Remedies", weeks: "Week 7–8", lessons: ["Top 50 Lal Kitab totkas", "Remedy timing using Muhurta", "Case studies in remedy prescription"] }
      ]
    }
  });

  // BNN ASTROLOGY
  buildCourse('bnn-astrology', {
    diploma: {
      headline: "Master the Fastest Predictive Method in Astrology",
      hook: "Where traditional methods take hours, BNN gives answers in minutes.",
      outcomes: ["Apply BNN's unique two-planet reading methodology", "Understand planetary chain theory for rapid analysis", "Predict career, wealth, and marriage using BNN rules", "Read charts at speed without sacrificing accuracy"],
      modules: [
        { title: "BNN Foundations", weeks: "Week 1–2", lessons: ["Introduction and history of BNN system", "Difference from Parashari astrology", "Basic rules and planetary nature in BNN"] },
        { title: "Core BNN Techniques", weeks: "Week 3–4", lessons: ["Rules of planetary conjunctions", "Planetary chain theory", "Role of Rahu and Ketu in BNN"] },
        { title: "BNN Prediction Methods", weeks: "Week 5–6", lessons: ["Career and wealth predictions", "Marriage and relationship indicators", "Health and foreign travel yogas"] },
        { title: "Advanced BNN Applications", weeks: "Week 7–8", lessons: ["Event timing techniques in BNN", "Advanced planetary combinations", "Quick prediction rules and shortcuts"] }
      ]
    }
  });

  // CRYSTAL HEALING
  buildCourse('crystal-healing', {
    diploma: {
      headline: "Harness the Ancient Power of Healing Crystals",
      hook: "Every crystal vibrates at a frequency. Learn to match it to the human energy field.",
      outcomes: ["Identify and work with 30+ healing crystals", "Understand crystal energy and chakra correspondences", "Create crystal grids for specific healing intentions", "Perform basic crystal healing sessions with confidence"],
      modules: [
        { title: "Crystal Science Foundations", weeks: "Week 1–2", lessons: ["Crystal formation and energy properties", "Crystal families and their healing domains", "Cleansing, charging, and programming crystals"] },
        { title: "Chakra & Crystal Correspondence", weeks: "Week 3–4", lessons: ["The 7 chakra system and crystal associations", "Identifying chakra imbalances", "Crystal placement methodology for each chakra"] },
        { title: "Crystal Grid Construction", weeks: "Week 5–6", lessons: ["Sacred geometry in crystal grids", "Intention-setting and grid activation", "Grids for protection, abundance, and healing"] },
        { title: "Practical Crystal Healing", weeks: "Week 7–8", lessons: ["Client session structure and ethics", "Crystal healing protocols", "Distance healing with crystals"] }
      ]
    }
  });

  // MEDICAL ASTROLOGY
  buildCourse('medical-astrology', {
    diploma: {
      headline: "Decode Health Patterns Written in the Stars",
      hook: "Every disease has an astrological signature. Learn to read it before it manifests.",
      outcomes: ["Identify health vulnerability zones from birth charts", "Connect planetary afflictions to specific body systems", "Apply timing analysis for health-critical periods", "Prescribe preventive astrological remedies for health"],
      modules: [
        { title: "Astrological Anatomy", weeks: "Week 1–2", lessons: ["Planets and body systems correspondence", "Signs and body parts — the astrological body map", "Houses of health, disease, and recovery"] },
        { title: "Disease Identification", weeks: "Week 3–4", lessons: ["Affliction patterns for major diseases", "Planetary combinations for chronic conditions", "Mental health indicators in the horoscope"] },
        { title: "Timing of Health Events", weeks: "Week 5–6", lessons: ["Dasha periods and health vulnerabilities", "Transit triggers for health crises", "Recovery and remission timing"] },
        { title: "Preventive & Remedial Approach", weeks: "Week 7–8", lessons: ["Preventive lifestyle recommendations from charts", "Gemstone and Mantra remedies for health", "Integrating medical astrology with wellness planning"] }
      ]
    }
  });

  // RUDRAKSHA
  buildCourse('rudraksha', {
    diploma: {
      headline: "Unlock the Divine Science of Rudraksha Healing",
      hook: "Each bead carries a specific planetary vibration. Learn the science of selection.",
      outcomes: ["Identify all 14 Mukhi Rudraksha and their properties", "Match Rudraksha to birth charts for personalized prescription", "Understand authentication and quality assessment methods", "Apply Rudraksha therapy for health, wealth, and spiritual growth"],
      modules: [
        { title: "Rudraksha Science Foundations", weeks: "Week 1–2", lessons: ["Origin, mythology, and scientific properties", "Types of Rudraksha — 1 to 14 Mukhi", "Planetary correspondence and ruling deities"] },
        { title: "Selection & Authentication", weeks: "Week 3–4", lessons: ["Identifying genuine vs fake Rudraksha", "Quality grading parameters", "Geographic origin and its significance"] },
        { title: "Chart-Based Prescription", weeks: "Week 5–6", lessons: ["Matching Rudraksha to planetary afflictions", "Combination wearing rules and precautions", "Activation rituals and mantras"] },
        { title: "Therapeutic Applications", weeks: "Week 7–8", lessons: ["Rudraksha for health conditions", "Rudraksha for career and financial growth", "Rudraksha Mala construction and meditation"] }
      ]
    }
  });

  // COMPLETE ASTROLOGY
  buildCourse('complete-astrology', {
    diploma: {
      headline: "The All-in-One Jyotish Mastery Program",
      hook: "Every major system. One comprehensive course. Total command.",
      outcomes: ["Command both Parashari and modern astrological systems", "Integrate multiple prediction methodologies for accuracy", "Apply remedies from multiple traditions with understanding", "Read any chart, any question, any system with confidence"],
      modules: [
        { title: "Vedic Astrology Core", weeks: "Week 1–2", lessons: ["Planets, Signs, Houses — accelerated mastery", "Dasha systems and transit analysis", "Yoga and Dosha identification"] },
        { title: "KP & Nadi Systems", weeks: "Week 3–4", lessons: ["KP Sub-Lord Theory essentials", "Nadi two-planet combination reading", "System comparison and integration"] },
        { title: "Remedial Sciences", weeks: "Week 5–6", lessons: ["Lal Kitab remedy prescription", "Mantra, Yantra, Gemstone protocols", "Rudraksha and crystal integration"] },
        { title: "Professional Astrology", weeks: "Week 7–8", lessons: ["Multi-system chart synthesis", "Client consultation methodology", "Building a comprehensive astrology practice"] }
      ]
    }
  });

  // Clean up temp scripts
  console.log('Course-specific overrides loaded for all 15 subjects.');
})();
