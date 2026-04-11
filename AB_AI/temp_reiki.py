import re

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'r', encoding='utf-8') as f:
    content = f.read()

reiki_func = '''
// ═══════════════════════════════════════════════════
// CUSTOM OVERRIDE — Reiki Healing (Bespoke Pages)
// ═══════════════════════════════════════════════════
function renderCustomReikiHealingPage(courseSlug, levelSlug) {
  const mainEl = document.getElementById('ld-main');
  const levelNames = { diploma: 'Diploma', bachelors: 'Bachelors', masters: 'Masters', 'grand-master': 'Grand Master' };
  const levelLabel = levelNames[levelSlug] || 'Diploma';

  let reikiModules = [];
  if (levelSlug === 'diploma' || !['diploma','bachelors','masters','grand-master'].includes(levelSlug)) {
    reikiModules = [
      { title: "Level 1 (Shoden)", lessons: ["Covers Reiki history, foundational self-healing techniques, and the 24 hand positions to channel life-force energy for physical and emotional wellness."] },
      { title: "Level 2 (Okuden)", lessons: ["Introduces sacred symbols for power, harmony, and distant healing, alongside advanced techniques for deep mental and emotional subconscious cleansing."] },
      { title: "Anatomy & Endocrine", lessons: ["Explores the Chakra system\\'s alignment with the endocrine glands, understanding how energy imbalances manifest as specific physical or hormonal ailments."] },
      { title: "Professional Practice", lessons: ["Mastering aura scanning (Byosen), applying healing to animals, and maintaining high client ethics for a successful, professional Reiki practitioner career."] }
    ];
  } else if (levelSlug === 'bachelors') {
    reikiModules = [
      { title: "Energy Anatomy", lessons: ["A detailed study of the 7 Chakras and Nadis (energy channels), understanding how life force flows through the human body."] },
      { title: "Attunements & Symbols", lessons: ["Focuses on Level 1 and 2 attunements, mastering the primary symbols like Cho Ku Rei and Sei He Ki for healing."] },
      { title: "Distance & Time Healing", lessons: ["Teaches Distance Healing across space and Time-Travel Healing to clear past traumas, bridging the gap between past and present."] },
      { title: "Reiki Master Level (3A)", lessons: ["The transition to Mastery, introducing the Dai Ko Myo symbol to access the highest frequencies of spiritual and physical healing."] },
      { title: "Advanced Techniques", lessons: ["Explores Psychic Surgery to remove deep energetic blockages and Aura Shielding to protect the practitioner and client from negative influences."] },
      { title: "Clinical Practice", lessons: ["Guidelines for establishing a professional healing center, managing client records, and upholding the highest standards of practitioner ethics and conduct."] }
    ];
  } else {
    // masters and grand-master
    let gmBadge = levelSlug === 'grand-master' ? ' <span class="gm-premium-badge">Advanced</span>' : '';
    reikiModules = [
      { title: "Energy Anatomy" + gmBadge, lessons: ["Detailed study of the 7 Chakras and Nadis, understanding how life force flows through the human bio-field and aura."] },
      { title: "Level 1 & 2 Attunements" + gmBadge, lessons: ["Mastering the primary healing symbols—Cho Ku Rei, Sei He Ki, and Hon Sha Ze Sho Nen—to channel energy."] },
      { title: "Distance & Time Healing" + gmBadge, lessons: ["Techniques for Distance Healing across space and Time-Travel Healing to clear past traumas and future anxieties effectively."] },
      { title: "Reiki Master Level (3A)" + gmBadge, lessons: ["The transition to Mastery, introducing the Dai Ko Myo symbol to access the highest frequencies of spiritual and physical healing."] },
      { title: "Advanced Healing Techniques" + gmBadge, lessons: ["Explores Psychic Surgery to remove deep energetic blockages and Aura Shielding to protect both the practitioner and the client."] },
      { title: "Animal & Nature Reiki" + gmBadge, lessons: ["Adapting healing frequencies for animals, plants, and environments, expanding the practitioner\\'s ability to harmonize various life forms and spaces."] },
      { title: "Crystal Reiki Integration" + gmBadge, lessons: ["Combining the vibrational power of Crystals with Reiki energy to amplify healing results and balance specific planetary deficiencies."] },
      { title: "Clinical Practice & Ethics" + gmBadge, lessons: ["Guidelines for setting up a healing centre, managing professional client relationships, and maintaining high ethical standards in spiritual practice."] }
    ];
  }

  const partNames = ["Foundation", "Advanced", "Methodology", "Practice", "Integration", "Expertise", "Professional", "Mastery"];
  const modulesHtml = reikiModules.map((m, i) => `
        <div class="cvd-module-card">
          <div class="cvd-module-title">${partNames[i] || 'Section'} (Part ${i + 1})</div>
          <div class="cvd-module-weeks">Module ${i + 1}: ${m.title}</div>
          <ul>
            ${m.lessons.map(l => `<li>${l}</li>`).join('')}
          </ul>
        </div>
  `).join('');

  let oldPrice = "5,499";
  let newPrice = "4,199";
  let duration = "8 Weeks";
  if(levelSlug === 'bachelors') { oldPrice = "11,999"; newPrice = "8,999"; duration = "12 Weeks"; }
  else if(levelSlug === 'masters') { oldPrice = "24,999"; newPrice = "18,699"; duration = "16 Weeks"; }
  else if(levelSlug === 'grand-master') { oldPrice = "34,999"; newPrice = "24,999"; duration = "48 Weeks"; }

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
        max-width: 480px;
        padding-bottom: 0px;
        z-index: 2;
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
        width: 55%;
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
        margin-right: -100px;
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
        -webkit-text-fill-color: transparent;
        animation: hookGlow 2.5s infinite alternate ease-in-out; 
        animation-delay: 1.25s; 
      }
      
      .cvd-4col { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; max-width: 1200px; margin: 0 auto; }
      .cvd-4col-card { width: 100%; text-align: center; }
      .cvd-4col-card img { width: 180px; height: 180px; border-radius: 50%; object-fit: cover; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border: 4px solid #D4AF37; margin: 0 auto; display: block; }
      .cvd-4col-card p { font-size: 1.2rem; margin-top: 15px; font-weight: bold; color: #444; }
      .cvd-4col-card .sub-p { font-size: 0.95rem; color: #666; margin-top: 5px; font-weight: normal; line-height: 1.4; padding: 0 10px; }

      .cvd-learn-grid { display: grid; grid-template-columns: repeat(4, 1fr); justify-items: center; align-items: start; gap: 20px; margin-top: 40px; max-width: 1200px; margin-left: auto; margin-right: auto; }
      .cvd-learn-item { width: 100%; text-align: center; }
      .cvd-learn-item img { width: 150px; height: 150px; border-radius: 50%; margin-bottom: 15px; display: block; margin-left: auto; margin-right: auto; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border: 2px solid #EEE; }
      .cvd-learn-item p { font-size: 1.1rem; color: #444; font-weight: bold; line-height: 1.4; margin-bottom: 5px;}
      .cvd-learn-item .sub-p { font-size: 0.95rem; color: #666; font-weight: normal; }

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

      .gm-premium-badge {
        background: linear-gradient(135deg, #d4af37 0%, #ffdf70 50%, #d4af37 100%);
        color: #5a1e1e;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 0.65em;
        font-weight: 800;
        margin-left: 8px;
        border: 1px solid #ffd700;
        box-shadow: 0 0 8px rgba(212, 175, 55, 0.6), inset 0 0 5px rgba(255, 255, 255, 0.5);
        text-transform: uppercase;
        vertical-align: middle;
        letter-spacing: 0.5px;
        text-shadow: 0px 1px 1px rgba(255, 255, 255, 0.5);
      }

      @media (max-width: 991px) {
        .cvd-layout-container { flex-direction: column; }
        .cvd-sidebar { width: 100% !important; position: static !important; margin-top: 40px; }
        .cvd-4col { grid-template-columns: repeat(2, 1fr); }
        .cvd-learn-grid { grid-template-columns: repeat(2, 1fr); gap: 30px; }
      }
      @media (max-width: 768px) {
        .cvd-hero-container { flex-direction: column; text-align: center; }
        .cvd-hero-text { padding-top: 40px; padding-bottom: 20px; }
        .cvd-hero-img-wrap { position: relative; width: 100%; justify-content: center; transform: none; }
        .cvd-hero-img-wrap img { margin: 0; }
        .cvd-strip-inner { flex-direction: column; text-align: center; gap: 15px; }
        .cvd-strip-text { text-align: center; }
        .cvd-4col { grid-template-columns: 1fr; }
        .cvd-learn-grid { grid-template-columns: 1fr; gap: 20px; }
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
              <div class="cvd-hero-title">Reiki Healing:</div>
              <div class="cvd-hero-subtitle">Restore Your Energy & Balance Your Life</div>
              <div class="cvd-hero-hook" style="font-weight: 500;">Reiki is a Japanese energy healing technique that promotes relaxation and healing by balancing the body's energy centers.</div>
              
              <a href="register.html" class="cvd-hero-btn">Enroll Now - ₹${newPrice}</a>
              <div class="cvd-hero-save"><i class="fas fa-check" style="color: #6B8E23;"></i> Save Today &nbsp;&middot;&nbsp; Duration: ${duration}</div>
              
              <div style="margin-top: 25px;">
                <a href="reiki.html" style="color: #B27C31; font-weight: 600; text-decoration: underline; font-size: 1rem;">
                  For price comparison follow this <i class="fas fa-arrow-right" style="font-size: 0.8rem;"></i>
                </a>
              </div>
            </div>
            <div class="cvd-hero-img-wrap">
              <img src="assets/images-optimized/reiki/header.png" alt="Reiki Healing" />
            </div>
          </div>
        </section>

        <section class="cvd-section" style="padding-top: 40px;">
          <h2 class="cvd-title" style="font-size: 2.2rem;">What Is Reiki Healing? How Can It Help You?</h2>
          <div class="cvd-desc" style="font-size: 1.1rem; max-width: 900px; margin-bottom: 40px;">Reiki is a Japanese energy healing technique that promotes relaxation and healing by balancing the body's energy centers. Here's how Reiki can transform your life:</div>
          
          <div class="cvd-4col">
            <div class="cvd-4col-card">
              <img src="assets/images-optimized/reiki/release anxiety.png" alt="Reduce Stress & Anxiety">
              <p>Reduce Stress & Anxiety</p>
              <div class="sub-p">Experience deep relaxation and calm</div>
            </div>
            <div class="cvd-4col-card">
              <img src="assets/images-optimized/reiki/improve sleep.png" alt="Improve Sleep">
              <p>Improve Sleep</p>
              <div class="sub-p">Achieve restful and restorative sleep</div>
            </div>
            <div class="cvd-4col-card">
              <img src="assets/images-optimized/reiki/boost spiritual growth.png" alt="Boost Spiritual Growth">
              <p>Boost Spiritual Growth</p>
              <div class="sub-p">Align with your true self and inner peace</div>
            </div>
            <div class="cvd-4col-card">
              <img src="assets/images-optimized/reiki/accelerate physical healing.png" alt="Accelerate Physical Healing">
              <p>Accelerate Physical Healing</p>
              <div class="sub-p">Speed up your body's natural healing process</div>
            </div>
          </div>
        </section>

      </div> <!-- end cvd-main-content -->
      
      <!-- Right Section Sidebar -->
      <aside class="cvd-sidebar" id="cvd-dynamic-sidebar" style="width: 380px; flex-shrink: 0; padding-top: 20px;">
        
        <h3 class="cvd-sidebar-heading">Course Curriculum</h3>

        ${modulesHtml}

      </aside>

    </div> <!-- end cvd-layout-container -->

    <!-- FULL WIDTH SECTIONS -->
    <section id="cvd-learn-section" class="cvd-section cvd-section-bg" style="padding-top: 20px; background-color: transparent;">
      <div style="display:flex; justify-content:center; align-items:center; margin: 30px auto 30px auto; max-width:800px;">
        <hr style="flex:1; border:none; border-top:1px solid #ccc;">
        <h2 class="cvd-title" style="margin: 0 30px;">What You'll Experience</h2>
        <hr style="flex:1; border:none; border-top:1px solid #ccc;">
      </div>
      
      <div class="cvd-learn-grid">
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/reiki/reiki energy healing.png" alt="Reiki Energy Healing">
          <p>Reiki Energy Healing</p>
          <div class="sub-p">Restore balance and energy flow within</div>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/reiki/chakra balancing.png" alt="Chakra Balancing">
          <p>Chakra Balancing</p>
          <div class="sub-p">Clear and align your chakra energy centers</div>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/reiki/deep relaxation.png" alt="Deep Relaxation">
          <p>Deep Relaxation</p>
          <div class="sub-p">Release stress and enter a state of deep relaxation</div>
        </div>
        <div class="cvd-learn-item">
          <img src="assets/images-optimized/reiki/emotional release.png" alt="Emotional Release">
          <p>Emotional Release</p>
          <div class="sub-p">Let go of negative emotions and mental blocks</div>
        </div>
      </div>
    </section>

    <div class="cvd-strip">
      <div class="cvd-strip-inner">
        <div class="cvd-strip-text">
          Limited Offer: Only ₹${newPrice} 
          <span style="font-size:1.1rem; color:#444; font-weight:normal; display:block; margin-top:5px;">(Regular Price ₹${oldPrice})</span>
        </div>
        <div>
          <a href="register.html" class="cvd-strip-btn"><i class="far fa-file-alt"></i> Enroll Now!</a>
          <a href="reiki.html" class="cvd-strip-link">For price comparison follow this</a>
        </div>
      </div>
    </div>

    <section class="cvd-section">
      <div class="cvd-faq">
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Is prior experience needed? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">No prior background in healing is required. This course is designed to guide you step-by-step from foundational concepts to advanced practices, ensuring that anyone can learn and master Reiki effectively.</div>
        </div>
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Will I receive an attunement remotely? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Yes, attunements can be sent effectively over a distance. You will receive the appropriate attunements for your chosen certification level from a certified Reiki Master.</div>
        </div>
        <div class="cvd-faq-item">
          <div class="cvd-faq-question" onclick="this.parentElement.classList.toggle('active')">Can I practice professionally after this? <span class="cvd-faq-icon">+</span></div>
          <div class="cvd-faq-answer">Depending on the level you complete, yes. While the Diploma is great for personal healing, the Bachelors, Masters, and Grand Master levels equip you with the advanced techniques, attunements, and ethical frameworks required to set up a professional practice.</div>
        </div>
      </div>
    </section>
  `;
  mainEl.innerHTML = html;
  document.title = `${levelLabel} in Reiki Healing — Parashari Institute`;

  setTimeout(() => {
    const mainContent = document.querySelector('.cvd-main-content');
    const sidebar = document.querySelector('.cvd-sidebar');
    const learnSection = document.getElementById('cvd-learn-section');
    if (mainContent && sidebar && learnSection) {
      if (sidebar.offsetHeight > mainContent.offsetHeight + 400) {
        mainContent.appendChild(learnSection);
      }
    }
  }, 50);
}
'''

new_content = content.replace('// ═══════════════════════════════════════════════════\n// RENDERER — Reads URL params and builds the page\n// ═══════════════════════════════════════════════════', reiki_func + '\n// ═══════════════════════════════════════════════════\n// RENDERER — Reads URL params and builds the page\n// ═══════════════════════════════════════════════════')

init_search = "  if ((courseSlug === 'vastu-shastra' || courseSlug === 'vastu' || courseSlug === 'vastu-shashtra') && customLevels.includes(levelSlug)) {\n    renderCustomVastuShastraPage(courseSlug, levelSlug);\n    return;\n  }"

init_replace = init_search + '''

  if ((courseSlug === 'reiki' || courseSlug === 'reiki-healing') && customLevels.includes(levelSlug)) {
    renderCustomReikiHealingPage(courseSlug, levelSlug);
    return;
  }'''

new_content = new_content.replace(init_search, init_replace)

custom_levels_re = re.compile(r"const customLevels = \['diploma', 'bachelors', 'masters'\];")
new_content = custom_levels_re.sub("const customLevels = ['diploma', 'bachelors', 'masters', 'grand-master'];", new_content)

with open(r'd:\Parashari website new\AB_AI\assets\js\level-data.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Done")
