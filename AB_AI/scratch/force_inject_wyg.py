import os
import json
import re

files_dir = 'd:/Parashari website new/AB_AI/crash-courses/'
archive_dir = 'd:/Parashari website new/AB_AI/archive/'

course_data = {
    "plrt.html": [
        {"icon": "🧠", "title": "Foundational Principles", "desc": "Understand the foundational principles of past life regression and its therapeutic applications"},
        {"icon": "🔗", "title": "Karmic Patterns", "desc": "Identify karmic patterns and soul contracts influencing present-life challenges"},
        {"icon": "🌀", "title": "Hypnotic Induction", "desc": "Learn hypnotic induction techniques used to safely guide regression sessions"},
        {"icon": "🛡️", "title": "Trauma & Blocks", "desc": "Recognize emotional and psychological blocks rooted in past-life trauma"},
        {"icon": "🌱", "title": "Spiritual Growth", "desc": "Apply PLRT frameworks to support healing, forgiveness, and spiritual growth"},
        {"icon": "⚖️", "title": "Ethical Integration", "desc": "Ethically assess client readiness and manage post-session integration"}
    ],
    "cc-bhoomi-vastu.html": [
        {"icon": "🧭", "title": "Site Energetics", "desc": "Evaluate land plots for energetic suitability using classical Bhoomi Vastu principles"},
        {"icon": "🌍", "title": "Land Indicators", "desc": "Interpret soil quality, slope direction, and geographic features as Vastu indicators"},
        {"icon": "🏛️", "title": "Architectural Alignment", "desc": "Apply Prasada Vastu guidelines to align architectural layouts with natural energy flows"},
        {"icon": "📐", "title": "Vastu Purusha Mandala", "desc": "Design or assess room placement, entrances, and axes using Vastu Purusha Mandala"},
        {"icon": "🏘️", "title": "Modern Harmonization", "desc": "Harmonize modern construction needs with ancient sacred architectural wisdom"},
        {"icon": "📋", "title": "On-Site Audits", "desc": "Conduct on-site Vastu audits and provide actionable remedial recommendations"}
    ],
    "cc-modern-western-palmistry.html": [
        {"icon": "✋", "title": "Major Palm Lines", "desc": "Read and interpret the four major palm lines — Heart, Head, Life, and Fate — with precision"},
        {"icon": "🔍", "title": "Mounts & Markings", "desc": "Identify mounts, markings, and finger formations as indicators of personality and destiny"},
        {"icon": "🔥", "title": "Elemental Hand Types", "desc": "Map hand shape and texture to elemental personality types (Earth, Air, Fire, Water)"},
        {"icon": "⏱️", "title": "Age Mapping & Timing", "desc": "Assess timing of life events using line segments and age-mapping techniques"},
        {"icon": "🧬", "title": "Inherited vs Evolving", "desc": "Distinguish between inherited traits and evolving life patterns through palm changes"},
        {"icon": "🗣️", "title": "Structured Consultations", "desc": "Conduct structured, ethical palm reading consultations with confidence"}
    ],
    "cc-mobile-numerology.html": [
        {"icon": "📱", "title": "Vibrational Influence", "desc": "Decode how mobile number vibrations influence personal energy, luck, and relationships"},
        {"icon": "🔢", "title": "Core Calculations", "desc": "Calculate core numerological values from phone numbers using Chaldean and Pythagorean systems"},
        {"icon": "⚖️", "title": "Number Combinations", "desc": "Identify favorable and unfavorable number combinations for specific life goals"},
        {"icon": "💼", "title": "Success Enhancement", "desc": "Select or correct mobile numbers to enhance business success, health, and harmony"},
        {"icon": "🗣️", "title": "Practical Application", "desc": "Apply mobile numerology as a practical tool in personal and professional consultations"},
        {"icon": "🧠", "title": "Psychological Impact", "desc": "Understand the science of number frequencies and their psychological impact"}
    ],
    "cc-face-reading.html": [
        {"icon": "👤", "title": "Facial Zones", "desc": "Map facial zones and features to personality traits, emotional tendencies, and life patterns"},
        {"icon": "👁️", "title": "Feature Reading", "desc": "Read forehead lines, nose shape, lip structure, and eye type as character indicators"},
        {"icon": "🎭", "title": "Archetype Profiling", "desc": "Identify dominant archetypes and behavioral dispositions through facial profiling"},
        {"icon": "🤝", "title": "Ethical Application", "desc": "Use physiognomy ethically in counseling, HR, and relationship contexts"},
        {"icon": "🧠", "title": "Character Assessment", "desc": "Combine facial analysis with psychological frameworks for deeper character assessment"},
        {"icon": "🔍", "title": "Real-time Observation", "desc": "Develop the observational skills needed to read faces accurately in real-time interactions"}
    ],
    "cc-financial-astrology.html": [
        {"icon": "📈", "title": "Planetary Cycles", "desc": "Correlate planetary transits and cycles with market trends, economic shifts, and financial events"},
        {"icon": "💰", "title": "Wealth Potential", "desc": "Analyze natal charts for wealth potential, financial risks, and ideal investment periods"},
        {"icon": "⏱️", "title": "Muhurta Timing", "desc": "Time financial decisions — investments, launches, borrowings — using Muhurta principles"},
        {"icon": "🏠", "title": "House Combinations", "desc": "Interpret the 2nd, 8th, and 11th house combinations for wealth accumulation patterns"},
        {"icon": "📜", "title": "Historical Cycles", "desc": "Study historical market cycles through the lens of major planetary conjunctions"},
        {"icon": "🔮", "title": "Systematic Forecasting", "desc": "Build a systematic approach to financial forecasting using astrological tools"}
    ],
    "cc-lal-kitab.html": [
        {"icon": "📘", "title": "Lal Kitab Philosophy", "desc": "Understand the unique philosophy and unconventional house system of Lal Kitab"},
        {"icon": "⚖️", "title": "Planetary Debts (Rin)", "desc": "Identify planetary debts (Rin) and their manifestation in life challenges"},
        {"icon": "💊", "title": "Signature Remedies", "desc": "Learn signature Lal Kitab remedies — practical, affordable, and result-oriented"},
        {"icon": "📜", "title": "Distinct Rules", "desc": "Interpret charts through Lal Kitab's distinct rules for planetary placement and aspect"},
        {"icon": "🔍", "title": "Methodology Contrast", "desc": "Differentiate Lal Kitab methodology from classical Parashari Jyotish interpretations"},
        {"icon": "🗣️", "title": "Effective Guidance", "desc": "Apply Lal Kitab principles to provide quick, effective guidance in client consultations"}
    ],
    "cc-medical-astrology.html": [
        {"icon": "🧬", "title": "Body Mapping", "desc": "Map the twelve zodiac signs and planets to the body's organs, systems, and functions"},
        {"icon": "⚠️", "title": "Disease Periods", "desc": "Identify disease-prone periods using dashas, transits, and afflicted house analysis"},
        {"icon": "🏥", "title": "House Analysis", "desc": "Analyze the 6th, 8th, and 12th houses for acute, chronic, and hidden health conditions"},
        {"icon": "🌿", "title": "Constitutional Types", "desc": "Understand constitutional types (Prakriti) through planetary dominance in the birth chart"},
        {"icon": "🛡️", "title": "Preventive Timing", "desc": "Use predictive techniques to flag health vulnerabilities and recommend preventive timing"},
        {"icon": "⚕️", "title": "Complementary Tool", "desc": "Ethically integrate medical astrology as a complementary tool alongside professional healthcare"}
    ],
    "cc-bnn-intensive.html": [
        {"icon": "🪐", "title": "Planetary Pairs", "desc": "Master the Nadi-specific interpretation of planetary pairs and their predictive significance"},
        {"icon": "🧩", "title": "Combinatorial Logic", "desc": "Read charts through the Bhrigu Nandi system's unique sequential and combinatorial logic"},
        {"icon": "🔮", "title": "Precision Prediction", "desc": "Predict life events — marriage, career shifts, health — with precision using BNN rules"},
        {"icon": "⏳", "title": "Event Timing", "desc": "Understand the role of Bhrigu transit (Jupiter's annual movement) in event timing"},
        {"icon": "📜", "title": "Complex Combinations", "desc": "Decode complex multi-planet combinations through intensive, hands-on chart practice"},
        {"icon": "⚡", "title": "Speed & Accuracy", "desc": "Develop the speed and accuracy required for professional Nadi-based consultations"}
    ],
    "cc-modern-career-astrology.html": [
        {"icon": "🏢", "title": "Career Identification", "desc": "Identify the most suitable career fields through the 10th house, its lord, and planetary combinations"},
        {"icon": "💰", "title": "Income Dynamics", "desc": "Evaluate the 2nd, 6th, and 11th houses for income potential and workplace dynamics"},
        {"icon": "⏱️", "title": "Transition Timing", "desc": "Time career transitions, promotions, and business ventures using dasha and transit analysis"},
        {"icon": "📊", "title": "Vocational Charts", "desc": "Distinguish between entrepreneurial and service-oriented vocational charts"},
        {"icon": "🚀", "title": "Professional Growth", "desc": "Analyze the impact of Saturn, Sun, and Mercury on professional growth and ambition"},
        {"icon": "🗣️", "title": "Actionable Counseling", "desc": "Provide actionable, chart-based career counseling for students, professionals, and entrepreneurs"}
    ],
    "cc-business-numerology.html": [
        {"icon": "🔢", "title": "Core Business Numbers", "desc": "Calculate core numerological numbers for businesses — name, founding date, and brand identity"},
        {"icon": "✨", "title": "Vibrational Alignment", "desc": "Align company names and logos with favorable vibrational frequencies for success"},
        {"icon": "📅", "title": "Milestone Timing", "desc": "Identify ideal dates for launches, signings, and key business milestones using number cycles"},
        {"icon": "🤝", "title": "Partner Compatibility", "desc": "Assess compatibility between business partners using numerological profiling"},
        {"icon": "⚙️", "title": "Organizational Energy", "desc": "Understand how master numbers and karmic numbers influence organizational energy"},
        {"icon": "📈", "title": "Strategic Consulting", "desc": "Apply Business Numerology as a strategic consulting tool for startups and established enterprises"}
    ],
    "cc-vedic-numerology.html": [
        {"icon": "🛕", "title": "Vedic Foundation", "desc": "Master the Vedic system of numerology rooted in ancient Indian numerical philosophy"},
        {"icon": "🔢", "title": "Number Calculations", "desc": "Calculate and interpret the Mulank (Root Number), Bhagyank (Destiny Number), and Namank (Name Number)"},
        {"icon": "🪐", "title": "Planetary Influence", "desc": "Understand the influence of the nine planets on each of the nine primary numbers"},
        {"icon": "💞", "title": "Compatibility Analysis", "desc": "Analyze compatibility in relationships and partnerships through Vedic number matching"},
        {"icon": "✍️", "title": "Name Correction", "desc": "Apply Vedic Numerology for name correction to enhance personal and professional outcomes"},
        {"icon": "🔮", "title": "Predictive Cycles", "desc": "Integrate Vedic number cycles with astrological timing for powerful predictive readings"}
    ],
    "cc-nadi-astrology.html": [
        {"icon": "📜", "title": "Nadi Heritage", "desc": "Understand the origins, palm leaf tradition, and philosophical basis of Nadi Jyotish"},
        {"icon": "⚖️", "title": "Core Rule Distinctions", "desc": "Learn the core principles that distinguish Nadi from mainstream Parashari Jyotish"},
        {"icon": "🪐", "title": "Positional Logic", "desc": "Apply Nadi-specific rules for planetary interpretation, aspects, and positional logic"},
        {"icon": "🔍", "title": "Minimal Chart Data", "desc": "Use Nadi techniques to identify precise life events with minimal chart data"},
        {"icon": "📚", "title": "Methodology Integration", "desc": "Integrate Bhrigu Nadi, Chandra Kala Nadi, or Sapta Rishi Nadi methodologies"},
        {"icon": "🔮", "title": "Predictive Framework", "desc": "Develop a systematic framework for accurate, karma-based predictive consultations"}
    ],
    "cc-healing.html": [
        {"icon": "✨", "title": "Energy Biofield", "desc": "Understand the foundational principles of energy healing and the human biofield"},
        {"icon": "👐", "title": "Healing Techniques", "desc": "Learn hands-on and distant healing techniques including Reiki, Pranic, or chakra-based methods"},
        {"icon": "🧱", "title": "Energy Blockages", "desc": "Identify energy blockages in the physical, emotional, and spiritual bodies"},
        {"icon": "📡", "title": "Intuitive Channeling", "desc": "Develop intuition and sensitivity to detect and channel healing frequencies"},
        {"icon": "🧘", "title": "Session Structuring", "desc": "Integrate breath work, visualization, and intention-setting into structured healing sessions"},
        {"icon": "🛡️", "title": "Ethical Boundaries", "desc": "Establish ethical boundaries and self-care practices essential for sustainable healing work"}
    ],
    "cc-feng-shui.html": [
        {"icon": "☯️", "title": "Classical Principles", "desc": "Understand the classical principles of Feng Shui, including Chi flow, Yin-Yang, and the Five Elements"},
        {"icon": "🗺️", "title": "Bagua Application", "desc": "Apply the Bagua map to analyze and activate key life areas within any living or working space"},
        {"icon": "🏺", "title": "Space Harmonization", "desc": "Identify and correct environmental imbalances using space planning, colors, and symbolic cures"},
        {"icon": "🏞️", "title": "Landform Analysis", "desc": "Assess external landforms and interior layouts for their energetic impact on occupants"},
        {"icon": "⚖️", "title": "Environment Support", "desc": "Harmonize home and office environments to support health, wealth, and relationship goals"},
        {"icon": "📋", "title": "Practical Consultations", "desc": "Conduct practical Feng Shui consultations integrating both classical and BTB (Black Sect) approaches"}
    ],
    "cc-jaimini-astrology.html": [
        {"icon": "🏛️", "title": "Philosophical Roots", "desc": "Understand the philosophical roots and unique framework that distinguishes Jaimini from Parashari Jyotish"},
        {"icon": "👤", "title": "Chara Karakas", "desc": "Master the Chara Karaka system — identifying the Atmakaraka, Amatyakaraka, and other soul-significators"},
        {"icon": "🔭", "title": "Rashi Aspects", "desc": "Apply Rashi-based aspects (Jaimini's own aspect rules) for accurate planetary interpretation"},
        {"icon": "👁️", "title": "Arudha Padas", "desc": "Interpret Arudha Padas to reveal how the world perceives a person's wealth, status, and relationships"},
        {"icon": "⏳", "title": "Dasha Systems", "desc": "Use Chara Dasha and Sthira Dasha systems for precise timing of life events"},
        {"icon": "🗺️", "title": "Special Lagnas", "desc": "Analyze special Lagnas — Hora Lagna, Ghati Lagna, and Bhava Lagna — for a multi-layered chart reading"}
    ]
}

for filename, bullets in course_data.items():
    filepath = os.path.join(archive_dir if filename == 'plrt.html' else files_dir, filename)
    if not os.path.exists(filepath):
        print(f"File not found: {filename}")
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    js_items = []
    for point in bullets:
        js_items.append(
            f'{{ icon: "{point["icon"]}", title: "{point["title"]}", desc: "{point["desc"]}", value: "<span class=\'wyg-inc\'>Included</span>" }}'
        )
    
    js_array_str = "var items = [\n                    " + ",\n                    ".join(js_items) + "\n                ];"
    
    # Try capturing various possible formatting styles induced by IDEs or formatters
    pattern = r'var\s+items\s*=\s*\[(.*?)\s*\]\s*;(?=\s*var target = document\.getElementById\(\'wyg-items\'\);)'
    
    if re.search(pattern, content, flags=re.DOTALL):
        new_content = re.sub(pattern, js_array_str, content, flags=re.DOTALL)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated WYG explicitly: {filename}")
    else:
        print(f"Pattern 'var items =' not found in: {filename}")

