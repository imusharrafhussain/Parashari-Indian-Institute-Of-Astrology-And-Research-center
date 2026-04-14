const fs = require('fs');

const missingStr = `      @media (max-width: 768px) {
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
  \`;

  const html = \`
    \${customStyles}
    <!-- START MAIN LAYOUT WITH SIDEBAR -->
    <div class="cvd-layout-container" style="display: flex; flex-wrap: wrap; gap: 50px; max-width: 1400px; margin: 20px auto 60px auto; align-items: flex-start; padding: 0 20px;">
      
      <div class="cvd-main-content" style="flex: 1; min-width: 0;">

        <section class="cvd-hero">
          <div class="cvd-hero-container">
            <div class="cvd-hero-text">
              <div class="cvd-hero-badge"><i class="fas fa-award"></i> \${levelLabel} Certification</div>
              <div class="cvd-hero-title">Numerology Science:</div>
              <div class="cvd-hero-subtitle">Unlock Your True Potential & Destiny</div>
              <div class="cvd-hero-hook" style="font-weight: 500;">Discover how the vibrations of your birth date and name shape your future, career, and relationships.</div>
              
              <a href="\${courseSlug}.html" class="cvd-hero-btn">Enroll Now – <span style="text-decoration: line-through; opacity: 0.7; font-size: 0.85em; margin-right: 6px;">\${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'}</span> \${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4,199'}</a>
              <div class="cvd-hero-save"><i class="fas fa-check" style="color: #6B8E23;"></i> Save \${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% Today &nbsp;&middot;&nbsp; Duration: \${levelSlug === 'grand-master' ? '48 Weeks' : (levelSlug === 'masters' ? '16 Weeks' : (levelSlug === 'bachelors' ? '12 Weeks' : '8 Weeks'))}</div>
              
              <div style="margin-top: 25px;">
                <a href="\${courseSlug}.html" style="color: #B27C31; font-weight: 600; text-decoration: underline; font-size: 1rem;">
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
        <h3 class="cvd-sidebar-heading">\${levelLabel} Course Curriculum</h3>
        \${modulesHtml}
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
          Limited Offer: Only \${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.newPrice || '₹4199'} 
          <span style="font-size:1.1rem; color:#444; font-weight:normal; display:block; margin-top:5px;">(Save \${levelSlug === 'grand-master' ? 29 : (levelSlug === 'bachelors' || levelSlug === 'masters' ? 25 : 24)}% &ndash; Regular Price \${LEVEL_DATA[courseSlug]?.levels[levelSlug]?.oldPrice || '₹5,499'})</span>
        </div>
        <div>
          <a href="\${courseSlug}.html" class="cvd-strip-btn"><i class="far fa-file-alt"></i> Get Started Now!</a>
          <a href="\${courseSlug}.html" class="cvd-strip-link">For price comparison follow this</a>
        </div>
      </div>
    </div>
  \`;
  mainEl.innerHTML = html;
  document.title = \`\${levelLabel} in Numerology — Parashari Institute\`;

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
`

let current = fs.readFileSync('assets/js/level-data.js', 'utf8');
if (current.trim().endsWith('}')) {
    // wait already ends with } could mean it's fine.
}
// Strip to 1123 lines and append
const lines = current.split('\n');
const fixedLines = lines.slice(0, 1123);
fs.writeFileSync('assets/js/level-data.js', fixedLines.join('\n') + '\n' + missingStr);
console.log('Fixed');
