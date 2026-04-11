import os
import shutil
from PIL import Image
import json

base_source = r"d:\Parashari website new\rudraksha"
target_dir = r"d:\Parashari website new\AB_AI\assets\images-optimized\rudraksha"
os.makedirs(target_dir, exist_ok=True)
os.makedirs(os.path.join(target_dir, "middle-elements"), exist_ok=True)
os.makedirs(os.path.join(target_dir, "what-youll-learn"), exist_ok=True)

# Copy and convert images
def process_and_convert(src_path, dst_path):
    if not os.path.exists(src_path):
       return dst_path.replace('.webp', '.png')
    with Image.open(src_path) as img:
        img.save(dst_path, 'webp', quality=85)
    return os.path.basename(dst_path)

header_img = process_and_convert(os.path.join(base_source, "header image.png"), os.path.join(target_dir, "header_image.webp"))
main_ref = process_and_convert(os.path.join(base_source, "mainpage ref.png"), os.path.join(target_dir, "mainpage_ref.webp"))

middle_files = ["deepen spiritual connection.png", "protect your energy.png", "reduce stress and worry.png"]
middle_names = [
    process_and_convert(os.path.join(base_source, "middle elements", f), os.path.join(target_dir, "middle-elements", f.replace('.png', '.webp')))
    for f in middle_files
]

learn_files = ["ATTRACT PROSPERITY.png", "AWAKEN YOUR CHAKRAS.png", "ENHANCE INNER PEACE.png", "HISTORY OF RUDRAKSHA.png", "IDENTIFY REAL RUDRAKSHA.png", "WEAR RUDRAKSHA PROPERLY.png"]
learn_names = [
    process_and_convert(os.path.join(base_source, "what you'll learn", f), os.path.join(target_dir, "what-youll-learn", f.replace('.png', '.webp')))
    for f in learn_files
]

js_code = f"""
// ═══════════════════════════════════════════════════
// CUSTOM OVERRIDE — Rudraksha (Bespoke Pages)
// ═══════════════════════════════════════════════════
function renderCustomRudrakshaPage(courseSlug, levelSlug) {{
  const mainEl = document.getElementById('ld-main');
  const levelNames = {{ diploma: 'Diploma', bachelors: 'Bachelors', masters: 'Masters', 'grand-master': 'Grand Master' }};
  const levelLabel = levelNames[levelSlug] || 'Diploma';
  
  let oldPrice = "5,499";
  let newPrice = "4,199";
  let duration = "8 Weeks";
  let badgeColor = "#2196F3";
  let priceStr = "4199";
  
  if(levelSlug === 'bachelors') {{
      oldPrice = "11,999";
      newPrice = "8,999";
      duration = "12 Weeks";
      badgeColor = "#9C27B0";
      priceStr = "8999";
  }} else if (levelSlug === 'masters' || levelSlug === 'grand-master') {{
      oldPrice = "24,999";
      newPrice = "18,699";
      duration = "16 Weeks";
      badgeColor = "#FF9800";
      priceStr = "18699";
  }}

  let rudrakshaModules = [];
  if (levelSlug === 'diploma') {{
    rudrakshaModules = [
      {{ title: "Introduction & Fundamentals of Rudraksha", weeks: "Week 1-2", lessons: ["Rudraksha ka history aur origin", "Botanical details (Elaeocarpus Ganitrus)", "Types of Rudraksha (1-21 Mukhi)", "Natural vs Artificial identification", "Spiritual and scientific importance"] }},
      {{ title: "Mukhi Classification & Benefits", weeks: "Week 3-4", lessons: ["1 to 14 Mukhi Rudraksha detailed study", "Ruling planets and deities", "Spiritual, health and astrology benefits", "Who should wear which Rudraksha", "Combination of Rudraksha"] }},
      {{ title: "Testing, Energization & Wearing Methods", weeks: "Week 5-6", lessons: ["Original Rudraksha testing methods", "Fake Rudraksha identification techniques", "Rudraksha purification (Shuddhi process)", "Energization (Pran Pratishtha process)", "Wearing rules and precautions"] }},
      {{ title: "Practical Applications & Professional Use", weeks: "Week 7-8", lessons: ["Rudraksha in astrology remedies", "Rudraksha therapy basics", "How to suggest Rudraksha to clients", "Business guidance (pricing & sourcing basics)", "Case studies and practical consultation"] }}
    ];
  }} else if (levelSlug === 'bachelors') {{
    rudrakshaModules = [
      {{ title: "Rudraksha Fundamentals", weeks: "Week 1-2", lessons: ["Rudraksha history and mythology", "Origin and production areas (Nepal, Indonesia, India)", "Botanical structure of Rudraksha", "Types based on Mukhi", "Spiritual significance in scriptures"] }},
      {{ title: "Detailed Mukhi Rudraksha Study", weeks: "Week 3-4", lessons: ["1 to 21 Mukhi Rudraksha classification", "Ruling deities and planets", "Beej mantras of each Mukhi", "Benefits and contraindications", "Rare and special Rudraksha (Gauri Shankar, Ganesh Rudraksha)"] }},
      {{ title: "Authentication & Quality Testing", weeks: "Week 5-6", lessons: ["Physical identification techniques", "Laboratory testing basics", "Real vs fake Rudraksha differences", "Quality grading (size, shape, origin)", "Market fraud awareness"] }},
      {{ title: "Energization & Ritual Processes", weeks: "Week 7-8", lessons: ["Rudraksha purification methods", "Pran Pratishtha procedure", "Mantra activation process", "Auspicious days and timing", "Maintenance and care rules"] }},
      {{ title: "Astrological & Healing Applications", weeks: "Week 9-10", lessons: ["Rudraksha according to horoscope", "Planetary remedies using Rudraksha", "Chakra healing with Rudraksha", "Health benefits and therapy concepts", "Case study based recommendations"] }},
      {{ title: "Professional Practice & Consultation", weeks: "Week 11-12", lessons: ["Client consultation methodology", "How to recommend Rudraksha professionally", "Rudraksha combinations for problems", "Ethical practices", "Rudraksha business basics", "Final assessment and certification project"] }}
    ];
  }} else {{
    rudrakshaModules = [
      {{ title: "Advanced Fundamentals of Rudraksha", weeks: "Week 1-2", lessons: ["Origin and evolution of Rudraksha", "Detailed botanical and spiritual structure", "Scriptures references (Shiva Purana, Padma Purana)", "Global varieties and characteristics", "Energetic properties of Rudraksha"] }},
      {{ title: "Complete Mukhi Rudraksha Research", weeks: "Week 3-4", lessons: ["1 to 21 Mukhi deep analysis", "Rare Rudraksha types and their powers", "Deity connection and symbolism", "Planetary correlations", "Advanced benefits analysis"] }},
      {{ title: "Rare & Special Rudraksha", weeks: "Week 5-6", lessons: ["Gauri Shankar Rudraksha", "Ganesh Rudraksha", "Trijuti Rudraksha", "Garbh Gauri Rudraksha", "Collector category Rudraksha"] }},
      {{ title: "Scientific Testing & Certification Methods", weeks: "Week 7-8", lessons: ["Advanced authenticity testing", "X-ray testing concepts", "Density and structure testing", "Certification process understanding", "International grading standards"] }},
      {{ title: "Advanced Energization & Ritual Science", weeks: "Week 9-10", lessons: ["Advanced Pran Pratishtha rituals", "Tantra and mantra activation", "Special Siddhi processes", "Muhurat selection principles", "Maintenance rituals"] }},
      {{ title: "Astrology, Numerology & Chakra Integration", weeks: "Week 11-12", lessons: ["Horoscope based Rudraksha selection", "Numerology based recommendations", "Chakra balancing methods", "Combination therapy", "Problem specific prescriptions"] }},
      {{ title: "Rudraksha Therapy & Case Studies", weeks: "Week 13-14", lessons: ["Rudraksha healing techniques", "Stress, health and energy balancing", "Practical case studies", "Client problem analysis", "Result tracking methods"] }},
      {{ title: "Research, Teaching & Professional Mastery", weeks: "Week 15-16", lessons: ["How to become a Rudraksha expert", "Teaching methodology", "Research documentation", "Building consultation systems", "Premium client handling", "Final thesis / research project"] }}
    ];
  }}

  const modulesHtml = rudrakshaModules.map((m, i) => `
        <div class="cvd-module-card">
          <div class="cvd-module-title">${{m.title}}</div>
          <div class="cvd-module-weeks">Module ${{i + 1}}: ${{m.weeks}}</div>
          <ul>
            ${{m.lessons.map(l => `<li>${{l}}</li>`).join('')}}
          </ul>
        </div>
  `).join('');
  
  const customStyles = `
    <style>
      .cvd-hero {{ background: #FFFFFF; position: relative; overflow: hidden; padding: 50px 0 50px 0; border-bottom: none; }}
      .cvd-hero-container {{ max-width: 100%; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; padding: 0 40px; position: relative; min-height: 450px; }}
      .cvd-hero-text {{ flex: 1; max-width: 480px; padding-bottom: 0px; z-index: 2; }}
      .cvd-hero-badge {{ display: inline-block; background: linear-gradient(135deg, #FFD700, #DAA520); color: #591C21; padding: 5px 15px; border-radius: 20px; font-size: 0.9rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 15px; box-shadow: 0 4px 15px rgba(218, 165, 32, 0.4); border: 1px solid rgba(255, 255, 255, 0.6); animation: badgePulse 2s infinite alternate; }}
      @keyframes badgePulse {{ 0% {{ box-shadow: 0 4px 10px rgba(218, 165, 32, 0.4); }} 100% {{ box-shadow: 0 4px 20px rgba(218, 165, 32, 0.8); }} }}
      .cvd-hero-title {{ font-size: 2.8rem; color: #333; font-weight: 700; line-height: 1.1; margin-bottom: 10px; }}
      .cvd-hero-subtitle {{ color: #B27C31; font-size: 1.8rem; font-weight: 600; margin-bottom: 25px; line-height: 1.4; text-shadow: 1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.8), 1px -1px 0px rgba(255,255,255,0.8), -1px 1px 0px rgba(255,255,255,0.8), 0 2px 10px rgba(255,255,255,0.8); }}
      .cvd-hero-hook {{ font-style: italic; color: #444; font-size: 1.1rem; line-height: 1.5; margin-bottom: 20px; }}
      .cvd-hero-btn {{ background: linear-gradient(to right, #B22222, #8b0000); color: #fff !important; padding: 12px 35px; font-size: 1.35rem; font-weight: bold; border-radius: 6px; display: inline-block; text-decoration: none; box-shadow: 0 6px 15px rgba(139,0,0,0.25); margin-top: 15px; }}
      .cvd-hero-save {{ color: #B27C31; font-style: italic; font-weight: bold; margin-top: 10px; font-size: 1.05rem; }}
      .cvd-hero-img-wrap {{ position: absolute; top: 0; bottom: 0; right: 0; width: 55%; z-index: 1; display: flex; justify-content: flex-end; align-items: center; pointer-events: none; }}
      .cvd-hero-img-wrap img {{ height: 105%; width: auto; max-width: none; display: block; object-fit: contain; object-position: right center; margin-right: -100px; transform: translateY(0%); }}
      .cvd-section {{ padding: 30px 20px; text-align: center; }}
      .cvd-section-bg {{ background-color: #F9F9F9; }}
      @keyframes hookGlow {{ 0% {{ filter: drop-shadow(0 0 2px rgba(218,165,32,0.2)); transform: scale(0.995); }} 100% {{ filter: drop-shadow(0 0 15px rgba(218,165,32,0.9)); transform: scale(1.015); }} }}
      .cvd-title {{ font-size: 2.8rem; font-weight: bold; font-family: "Times New Roman", serif; margin-bottom: 20px; background: linear-gradient(to right, #800000, #B27C31, #800000); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: hookGlow 2.5s infinite alternate ease-in-out; }}
      .cvd-desc {{ font-size: 1.35rem; font-weight: 600; font-style: italic; max-width: 850px; margin: 0 auto 30px auto; line-height: 1.8; letter-spacing: 0.5px; background: linear-gradient(to right, #555, #B27C31, #555); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: hookGlow 2.5s infinite alternate ease-in-out; animation-delay: 1.25s; }}
      
      .cvd-3col {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }}
      .cvd-3col-card {{ width: 100%; }}
      .cvd-3col-card img {{ width: 100%; height: 200px; object-fit: cover; box-shadow: 0 5px 15px rgba(0,0,0,0.1); }}
      .cvd-3col-card p {{ font-size: 1.2rem; margin-top: 15px; color: #444; font-weight: bold; }}

      .cvd-ba-container {{ max-width: 1050px; margin: 10px auto 40px auto; }}
      .cvd-ba-header {{ display: flex; align-items: center; padding: 0 10px; }}
      .cvd-ba-header h3 {{ font-size: 1.8rem; color: #444; font-family: "Times New Roman", serif; margin: 0 40px; font-weight: bold; }}
      .cvd-ba-header h3.after-title {{ color: #A82C2C; }}
      .cvd-ba-box {{ display: flex; margin-top: 15px; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); background: #fff; }}
      
      .cvd-ba-left {{ width: 50%; padding: 20px 40px 20px 40px; background: #EEE9DC; border-radius: 4px 0 0 4px; position: relative; z-index: 2; }}
      .cvd-ba-left::after {{ content: ''; position: absolute; right: -30px; top: 0; bottom: 0; width: 30px; background: #EEE9DC; clip-path: polygon(0 0, 0 100%, 100% 50%); z-index: 3; }}
      .cvd-ba-right {{ width: 50%; padding: 20px 40px 20px 60px; background: #C69429; border-radius: 0 4px 4px 0; position: relative; }}
      
      .cvd-ba-item {{ display: flex; align-items: center; gap: 15px; font-size: 1.2rem; min-height: 65px; border-bottom: 1px solid rgba(0,0,0,0.06); }}
      .cvd-ba-left .cvd-ba-item:last-child {{ border-bottom: none; min-height: 55px; }}
      .cvd-ba-right .cvd-ba-item:last-child {{ border-bottom: none; min-height: 55px; }}
      .cvd-ba-left .cvd-ba-item {{ color: #555; }}
      .cvd-ba-left .cvd-ba-icon {{ color: #BBA072; font-size: 0.6rem; }}
      .cvd-ba-right .cvd-ba-item {{ color: #fff; font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.25); text-shadow: 0 1px 2px rgba(0,0,0,0.1); }}
      .cvd-ba-right .cvd-ba-icon {{ color: #fff; font-size: 1.2rem; }}

      .cvd-learn-grid {{ display: grid; grid-template-columns: repeat(3, 1fr); justify-items: center; align-items: start; gap: 20px; margin-top: 40px; max-width: 1200px; margin-left: auto; margin-right: auto; }}
      .cvd-learn-grid.cvd-learn-fullwidth {{ grid-template-columns: repeat(6, 1fr); }}
      .cvd-learn-item {{ width: 100%; max-width: 160px; text-align: center; }}
      .cvd-learn-item img {{ max-width: 100px; height: auto; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; }}
      .cvd-learn-item p {{ font-size: 0.95rem; color: #444; font-weight: 600; line-height: 1.4; }}

      .cvd-sidebar-heading {{ font-family: 'Times New Roman', serif; font-size: 1.8rem; color: #591C21; font-weight: bold; margin-bottom: 25px; text-align: center; position: relative; }}
      .cvd-sidebar-heading::after {{ content: ''; display: block; width: 60px; height: 3px; background: #B27C31; margin: 10px auto 0 auto; }}

      .cvd-strip {{ background: linear-gradient(to right, #F5DEB3, #D4AF37, #F5DEB3); padding: 30px; margin-top: 50px; }}
      .cvd-strip-inner {{ display: flex; align-items: center; justify-content: center; gap: 30px; flex-wrap: wrap; max-width: 1000px; margin: 0 auto; }}
      .cvd-strip-text {{ font-size: 1.5rem; color: #591C21; font-weight: bold; margin: 0; text-align: left; }}
      .cvd-strip-btn {{ display: inline-flex; align-items: center; gap: 10px; background: #CC0000; color: #fff !important; padding: 12px 30px; font-size: 1.3rem; font-weight: bold; border-radius: 4px; text-decoration: none; box-shadow: 0 4px 10px rgba(0,0,0,0.2); transition: background 0.2s ease; }}
      .cvd-strip-btn:hover {{ background: #AA0000; }}
      .cvd-strip-link {{ color: #800000; font-weight: bold; text-decoration: underline; font-size: 0.95rem; margin-top: 8px; display: block; text-align: center; }}

      .cvd-faq {{ max-width: 800px; margin: 30px auto; }}
      .cvd-faq-item {{ background: #E8E8E8; margin-bottom: 10px; border-radius: 6px; overflow: hidden; }}
      .cvd-faq-question {{ padding: 15px 20px; display: flex; justify-content: space-between; cursor: pointer; color: #333; font-weight: 500; }}
      .cvd-faq-answer {{ padding: 0 20px 15px 20px; display: none; color: #555; line-height: 1.6; text-align:left; }}
      .cvd-faq-item.active .cvd-faq-answer {{ display: block; }}
      .cvd-faq-icon {{ font-weight: bold; background: #666; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 0.9rem;}}

      .cvd-module-card {{ background: #FFF; border-radius: 8px; padding: 25px 20px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.04); border: 1px solid #EAEAEA; border-top: 4px solid #7D2C30; transition: transform 0.3s ease, box-shadow 0.3s ease; }}
      .cvd-module-card:hover {{ transform: translateY(-4px); box-shadow: 0 8px 25px rgba(0,0,0,0.08); }}
      .cvd-module-title {{ text-align: center; color: #591C21; font-size: 1.3rem; font-weight: bold; margin-bottom: 15px; }}
      .cvd-module-weeks {{ font-size: 0.95rem; color: #333; font-weight: 600; margin-bottom: 10px; }}
      .cvd-module-card ul {{ list-style: none; padding: 0; margin: 0; }}
      .cvd-module-card li {{ font-size: 0.95rem; color: #555; margin-bottom: 10px; position: relative; padding-left: 15px; line-height: 1.5; }}
      .cvd-module-card li::before {{ content: '▸'; color: #B98E45; position: absolute; left: 0; top: 0; font-size: 1rem; }}

      @media (max-width: 991px) {{
        .cvd-layout-container {{ flex-direction: column; overflow-x: hidden; }}
        .cvd-sidebar {{ width: 100% !important; position: static !important; margin-top: 40px; }}
        .cvd-4col {{ grid-template-columns: repeat(2, 1fr); }}
        .cvd-learn-grid {{ grid-template-columns: repeat(3, 1fr); gap: 30px; }}
        .cvd-learn-grid.cvd-learn-fullwidth {{ grid-template-columns: repeat(3, 1fr); }}
        .cvd-hero-container {{ padding: 0 20px; }}
      }}
      @media (max-width: 768px) {{
        .cvd-main-content, .cvd-layout-container {{ overflow-x: hidden; max-width: 100vw; box-sizing: border-box; }}
        .cvd-hero {{ padding: 20px 0 30px 0; }}
        .cvd-hero-container {{ flex-direction: column-reverse; text-align: center; padding: 0 15px; min-height: auto; }}
        .cvd-hero-text {{ max-width: 100%; padding: 10px 5px 20px 5px; }}
        .cvd-hero-title {{ font-size: 2rem; }}
        .cvd-hero-subtitle {{ font-size: 1.3rem; }}
        .cvd-hero-img-wrap {{ position: relative; width: 100%; height: auto; justify-content: center; transform: none; margin-top: 0; pointer-events: auto; }}
        .cvd-hero-img-wrap img {{ width: 100%; max-width: 350px; margin: 0 auto; object-fit: contain; }}
        .cvd-section {{ padding: 20px 15px; overflow: hidden; }}
        .cvd-title {{ font-size: 1.8rem; word-wrap: break-word; }}
        .cvd-3col {{ grid-template-columns: 1fr; gap: 20px; max-width: 350px; margin: 0 auto; }}
        .cvd-ba-left, .cvd-ba-right {{ width: 100%; border-radius: 4px; padding: 15px 20px; }}
        .cvd-ba-box {{ flex-direction: column; }}
        .cvd-learn-grid, .cvd-learn-grid.cvd-learn-fullwidth {{ grid-template-columns: repeat(2, 1fr); gap: 20px; }}
        .cvd-strip-inner {{ flex-direction: column; text-align: center; }}
      }}
    </style>
  `;

  const html = `
    ${{customStyles}}
    <div class="cvd-layout-container" style="display: flex; flex-wrap: wrap; gap: 50px; max-width: 1400px; margin: 20px auto 60px auto; align-items: flex-start; padding: 0 20px;">
      
      <div class="cvd-main-content" style="flex: 1; min-width: 0;">

        <section class="cvd-hero">
          <div class="cvd-hero-container">
            <div class="cvd-hero-text">
              <div class="cvd-hero-badge"><i class="fas fa-award"></i> ${{levelLabel}} Certification</div>
              <div class="cvd-hero-title">Master The Science Of Rudraksha:</div>
              <div class="cvd-hero-subtitle">Transform Energy & Attract Positivity</div>
              <div class="cvd-hero-hook" style="font-weight: 500;">Unlock the spiritual, healing, and scientific secrets of Rudraksha to enhance your life and bring clarity to others.</div>
              
              <a href="register.html" class="cvd-hero-btn">Enroll Now - ₹${{priceStr}}</a>
              <div class="cvd-hero-save"><i class="fas fa-check" style="color: #6B8E23;"></i> Duration: ${{duration}}</div>
              
              <div style="margin-top: 25px;">
                <a href="rudraksha.html" style="color: #B27C31; font-weight: 600; text-decoration: underline; font-size: 1rem;">
                  For price comparison follow this <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                </a>
              </div>
            </div>
            <div class="cvd-hero-img-wrap">
              <img src="assets/images-optimized/rudraksha/{header_img}" alt="Master Rudraksha Science" />
            </div>
          </div>
        </section>

        <section class="cvd-section" style="padding-top: 40px;">
          <h2 class="cvd-title">Balance Your Energy... Transform Your Destiny</h2>
          <div class="cvd-desc">Rudraksha is not just an ornament; it holds immense power to heal, protect, and elevate your spiritual journey.<br>Learn to identify genuine sacred beads and use them for life-changing results.</div>
          
          <div class="cvd-3col">
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/rudraksha/middle-elements/{middle_names[0]}" alt="Deepen Spiritual Connection">
              <p>Deepen Spiritual Connection</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/rudraksha/middle-elements/{middle_names[1]}" alt="Protect Your Energy">
              <p>Protect Your Energy</p>
            </div>
            <div class="cvd-3col-card">
              <img src="assets/images-optimized/rudraksha/middle-elements/{middle_names[2]}" alt="Reduce Stress and Worry">
              <p>Reduce Stress and Worry</p>
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
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Overwhelmed with Stress</div>
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Fake Bead Confusion</div>
                <div class="cvd-ba-item"><i class="fas fa-circle cvd-ba-icon"></i> Blocked Energy Flow</div>
              </div>
              <div class="cvd-ba-right">
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Centered and Peaceful</div>
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Identify Authentic Rudraksha</div>
                <div class="cvd-ba-item"><i class="fas fa-check cvd-ba-icon"></i> Balanced Chakras</div>
              </div>
            </div>
          </div>
        </section>

      </div>
      
      <!-- Right Section Sidebar -->
      <aside class="cvd-sidebar" id="cvd-dynamic-sidebar" style="width: 380px; flex-shrink: 0; padding-top: 20px;">
        <h3 class="cvd-sidebar-heading">Course Curriculum</h3>
        ${{modulesHtml}}
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
          <img src="assets/images-optimized/rudraksha/what-youll-learn/{learn_names[0]}" alt="Attract Prosperity">
          <p>Attract<br>Prosperity</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/rudraksha/what-youll-learn/{learn_names[1]}" alt="Awaken Your Chakras">
          <p>Awaken<br>Your Chakras</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/rudraksha/what-youll-learn/{learn_names[2]}" alt="Enhance Inner Peace">
          <p>Enhance<br>Inner Peace</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/rudraksha/what-youll-learn/{learn_names[3]}" alt="History of Rudraksha">
          <p>History of<br>Rudraksha</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/rudraksha/what-youll-learn/{learn_names[4]}" alt="Identify Real Rudraksha">
          <p>Identify Real<br>Rudraksha</p>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/rudraksha/what-youll-learn/{learn_names[5]}" alt="Wear Rudraksha Properly">
          <p>Wear Rudraksha<br>Properly</p>
        </div>
      </div>
    </section>

    <div class="cvd-strip">
      <div class="cvd-strip-inner">
        <div class="cvd-strip-text">
          Limited Offer: Only ₹${{priceStr}} 
          <span style="font-size:1.1rem; color:#444; font-weight:normal; display:block; margin-top:5px;">(Regular Price ₹${{oldPrice}})</span>
        </div>
        <div>
          <a href="register.html" class="cvd-strip-btn"><i class="far fa-file-alt"></i> Get Started Now!</a>
          <a href="rudraksha.html" class="cvd-strip-link">For price comparison follow this</a>
        </div>
      </div>
    </div>

    <section class="cvd-section">
      <div class="cvd-faq">
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Is this course beginner friendly? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Yes, absolutely! The ${{levelLabel}} course is designed for anyone to easily follow along regardless of previous spiritual knowledge.</div>
        </div>
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Will I learn how to spot fake Rudraksha? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Yes, a core part of the curriculum covers testing authenticity, grading methods, and preventing fraud so you will confidently identify genuine beads.</div>
        </div>
      </div>
    </section>
  `;
  mainEl.innerHTML = html;
  document.title = `${{levelLabel}} in Rudraksha — Parashari Institute`;

  setTimeout(() => {{
    const mainContent = document.querySelector('.cvd-main-content');
    const sidebar = document.querySelector('.cvd-sidebar');
    const learnSection = document.getElementById('cvd-learn-section');
    if (mainContent && sidebar && learnSection) {{
      if (sidebar.offsetHeight > mainContent.offsetHeight + 400) {{
        learnSection.querySelector('.cvd-learn-grid').classList.remove('cvd-learn-fullwidth');
        mainContent.appendChild(learnSection);
      }}
    }}
  }}, 50);
}}
"""

file_path = r"d:\Parashari website new\AB_AI\assets\js\level-data.js"
with open(file_path, 'r', encoding='utf-8') as f:
    orig_content = f.read()

# Insert the function just before `function initLevelDetailPage`
if "function renderCustomRudrakshaPage" not in orig_content:
    orig_content = orig_content.replace("function initLevelDetailPage() {", js_code + "\n\nfunction initLevelDetailPage() {")

# Update `initLevelDetailPage` to call `renderCustomRudrakshaPage`
call_rudraksha = """
  if ((courseSlug === 'rudraksha') && customLevels.includes(levelSlug)) {
    renderCustomRudrakshaPage(courseSlug, levelSlug);
    return;
  }
"""
if "renderCustomRudrakshaPage(courseSlug" not in orig_content:
    orig_content = orig_content.replace(
        "if ((courseSlug === 'vedic-astrology' || courseSlug === 'astrology') && customLevels.includes(levelSlug)) {",
        call_rudraksha.strip() + "\n\n  if ((courseSlug === 'vedic-astrology' || courseSlug === 'astrology') && customLevels.includes(levelSlug)) {"
    )

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(orig_content)

print(f"Injection complete. Code size: {len(js_code)}")
