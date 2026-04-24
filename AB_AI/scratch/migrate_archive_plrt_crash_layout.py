import re
from pathlib import Path


PLRT_FILE = Path(r"d:\Parashari website new\AB_AI\archive\plrt.html")
TEMPLATE_FILE = Path(r"d:\Parashari website new\AB_AI\crash-courses\cc-modern-western-palmistry.html")


def extract_between(text: str, start: str, end: str) -> str:
    m = re.search(start + r"(.*?)" + end, text, re.S)
    return m.group(1) if m else ""


def main() -> None:
    html = PLRT_FILE.read_text(encoding="utf-8")
    template_html = TEMPLATE_FILE.read_text(encoding="utf-8")

    style_block = extract_between(template_html, r"<style>", r"</style>")
    if not style_block:
        raise RuntimeError("Could not extract template style block")

    # Replace style
    html = re.sub(
        r"<style>.*?</style>",
        "<style>\n" + style_block.strip() + "\n    </style>",
        html,
        flags=re.S,
        count=1,
    )

    # Build PLRT-specific main content with extracted source data preserved
    main_block = """    <main class="cc-palmistry-landing">
        <section class="hero">
            <div class="particles" id="particles"></div>
            <div class="ccp-container hero-content">
                <div class="badges animate-fade-in">
                    <span class="badge">🛡️ Govt. Approved</span>
                    <span class="badge">⭐ 4.8/5 Rating</span>
                    <span class="badge">👥 High Enrollment</span>
                </div>
                <div class="hero-grid">
                    <div class="animate-slide-up">
                        <h1>Past Life Regression Theory (PLRT) <span class="text-gold">Masterclass</span></h1>
                        <p class="desc">Explore subconscious memories and heal through the profound wisdom of past lives. A highly intensive 4-week crash course designed to build practical therapeutic skills.</p>
                        <p class="hindi"><b>हिंदी में:</b> अवचेतन मन की यादों को समझें और पिछले जन्मों के गहन ज्ञान से मानसिक उपचार करना सीखें। यह 4-हफ्तों का एक बेहद सघन क्रैश कोर्स है, जो आपको व्यावहारिक थेरेपी सिखाने के लिए डिज़ाइन किया गया है।</p>
                        <div class="feature-pills">
                            <div class="pill"><span class="pill-icon">🎥</span><div><p class="pill-title">Intensive Live/Recorded Sessions</p><p class="pill-desc">Full access to premium 4-week training lessons</p></div></div>
                            <div class="pill"><span class="pill-icon">📚</span><div><p class="pill-title">Guided Technique Manuals</p><p class="pill-desc">Downloadable regression inductions & notes</p></div></div>
                            <div class="pill"><span class="pill-icon">🏆</span><div><p class="pill-title">Institute Certification</p><p class="pill-desc">Recognized certificate upon completion</p></div></div>
                            <div class="pill"><span class="pill-icon">💬</span><div><p class="pill-title">Private VIP Support</p><p class="pill-desc">Direct Q&A support in student groups</p></div></div>
                        </div>
                        <button class="btn-gold" style="margin-top:2rem" onclick="document.getElementById('pricing').scrollIntoView({behavior:'smooth'})">⚡ Claim Your Spot Now</button>
                    </div>
                    <div class="hero-img-wrap">
                        <div class="hero-img-inner">
                            <div class="hero-img-glow"></div>
                            <img src="../assets/images-optimized/Past_lif.webp" alt="Past Life Regression Theory Course" class="hero-img">
                            <div class="float-card bottom-left animate-float"><p class="float-label">Students Enrolled</p><p class="float-value text-gold">3,100+</p></div>
                            <div class="float-card top-right animate-float-delayed"><p class="float-label">Course Rating</p><div class="stars">★★★★★</div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hero-wave"><svg viewBox="0 0 1440 120" fill="none"><path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="hsl(40,33%,97%)" /></svg></div>
        </section>

        <section class="pricing-banner">
            <div class="ccp-container">
                <div class="banner-card">
                    <div class="banner-left">
                        <div class="banner-icon">⚡</div>
                        <div>
                            <p style="font-size:0.875rem;font-weight:600;color:var(--gold-dark)">⚡ VERY LIMITED SEATS</p>
                            <h3 class="banner-title">Start Your Subconscious Journey Today</h3>
                            <p class="banner-sub">Get complete access to the 4-week module, guided manuals, and community support immediately upon enrollment.</p>
                        </div>
                    </div>
                    <div class="banner-right">
                        <div class="countdown"><span class="countdown-label">🕐 Offer ends in:</span><span class="countdown-box" id="cd-h">23H</span><span class="countdown-box" id="cd-m">45M</span><span class="countdown-box" id="cd-s">12S</span></div>
                        <div class="price-box"><p class="price-old">Total Value ₹3,499</p><p class="price-new">₹2,499</p></div>
                        <button class="btn-cta" onclick="document.getElementById('pricing').scrollIntoView({behavior:'smooth'})">Enroll Now</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="stats"><div class="ccp-container"><div class="stats-grid"><div class="stat"><p class="stat-value text-gold">3,100+</p><p class="stat-label">Learners Enrolled</p></div><div class="stat"><p class="stat-value text-gold">4.8/5</p><p class="stat-label">Average Rating</p></div><div class="stat"><p class="stat-value text-gold">90%</p><p class="stat-label">Practice Confidence</p></div><div class="stat"><p class="stat-value text-gold">4 Weeks</p><p class="stat-label">Course Duration</p></div></div></div></section>

        <section class="curriculum">
            <div class="ccp-container">
                <div class="section-header">
                    <h2>What You Will <span class="text-gold">Master</span></h2>
                    <p>A structured crash course designed to take you from curiosity to practical PLRT understanding and application.</p>
                </div>
                <div class="modules" id="modules"></div>
            </div>
        </section>

        <section class="what-you-get">
            <div class="ccp-container">
                <div class="wyg-grid">
                    <div class="wyg-img-wrap"><div class="wyg-img-glow"></div><img src="../assets/images-optimized/Past_lif.webp" alt="PLRT Course Visual" class="wyg-img"></div>
                    <div>
                        <h2>Everything You Get for <span class="text-gold">Just ₹2,499</span></h2>
                        <p style="margin-top:1rem;color:var(--muted)">Total value worth ₹3,499 — but you pay only a fraction of that.</p>
                        <div class="wyg-items" id="wyg-items"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="expert"><div class="ccp-container"><div class="expert-card"><div class="expert-inner"><div class="expert-img-wrap"><img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img"></div><div><h2>Guided by an Elite Panel of Experts</h2><p style="font-size:0.875rem;font-weight:600;color:var(--gold-dark);margin-top:0.25rem">Unmatched Mentorship & Support</p><p style="margin-top:1rem;color:var(--muted);line-height:1.7">This crash course is designed and delivered by a curated group of seasoned industry professionals. Every module is taught by specialists with real-world therapeutic and consultative experience.</p><div class="expert-tags"><span class="expert-tag"><span class="expert-dot" style="background:hsl(40,80%,55%)"></span> Active Practitioners</span><span class="expert-tag"><span class="expert-dot" style="background:var(--gold)"></span> Proven Methodologies</span><span class="expert-tag"><span class="expert-dot" style="background:var(--primary)"></span> Guided Practice Focus</span></div></div></div></div></div></section>

        <section class="testimonials"><div class="ccp-container"><div class="section-header"><h2>Student <span class="text-gold">Transformations</span></h2><p>Real stories from learners who experienced practical inner-growth shifts</p></div><div class="test-grid" id="testimonials"></div></div></section>

        <section class="pricing" id="pricing">
            <div class="ccp-container">
                <div class="section-header"><h2>Enroll Now & Start Your PLRT Journey</h2><p>Join learners building practical subconscious healing skills with confidence</p></div>
                <div class="pricing-card-wrap">
                    <div class="pricing-glow"></div>
                    <div class="pricing-card">
                        <div class="pricing-header"><small>CRASH COURSE</small><h3>Past Life Regression Theory (PLRT)</h3><span>4 weeks • Complete Program</span></div>
                        <div class="pricing-body"><span class="pricing-old">₹3,499</span><span class="pricing-off">Save ₹1,000</span><p class="pricing-amount text-gold">₹2,499</p><p class="pricing-note">One-time payment • No hidden charges</p><button class="btn-enroll" onclick="window.location.href='../register.html'">🎓 Enroll Now — Start Learning Today</button><p class="pricing-secure">🔒 100% Secure Payment • Instant Access</p></div>
                        <div class="pricing-includes"><p>Everything included:</p><ul><li><span class="check">✓</span> 4 weeks of structured training</li><li><span class="check">✓</span> Guided PLRT technique modules</li><li><span class="check">✓</span> Regression manuals & support materials</li><li><span class="check">✓</span> VIP community & doubt support</li><li><span class="check">✓</span> Institute completion certificate</li></ul></div>
                    </div>
                </div>
                <div class="trust-signals"><span>🛡️ Govt. Approved</span><span>🔒 Secure Payment</span></div>
            </div>
        </section>

        <section class="faq"><div class="ccp-container"><div class="section-header"><h2>Frequently Asked <span class="text-gold">Questions</span></h2></div><div class="faq-list" id="faq-list"></div></div></section>
        <section class="final-cta" aria-label="Final call to action"><div class="ccp-container"><div class="final-cta-inner"><h2>Still Thinking? Your Future Self Will Thank You.</h2><p>For less than a dinner out, you get a skill that can support lifelong inner healing.</p><div class="final-cta-actions"><button class="btn-cta" onclick="document.getElementById('pricing').scrollIntoView({behavior:'smooth'})">⚡ Enroll Now for ₹2,499</button></div></div></div></section>

        <script>
            (function () { var c = document.getElementById('particles'); if (!c) return; for (var i = 0; i < 20; i++) { var d = document.createElement('div'); d.className = 'particle'; var s = Math.random() * 6 + 2; d.style.width = s + 'px'; d.style.height = s + 'px'; d.style.left = Math.random() * 100 + '%'; d.style.top = Math.random() * 100 + '%'; d.style.animation = 'ccp-float ' + (Math.random() * 4 + 4) + 's ease-in-out ' + (Math.random() * 2) + 's infinite'; c.appendChild(d); } })();
            (function () { var h = 23, m = 45, s = 12; setInterval(function () { s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; m = 59; s = 59; } var eh = document.getElementById('cd-h'), em = document.getElementById('cd-m'), es = document.getElementById('cd-s'); if (!eh || !em || !es) return; eh.textContent = String(h).padStart(2, '0') + 'H'; em.textContent = String(m).padStart(2, '0') + 'M'; es.textContent = String(s).padStart(2, '0') + 'S'; }, 1000); })();
            (function () { var modules = [{id:1,title:"Basic Introduction to PLRT",topics:["Introduction to PLRT","Rebirth and karma theory","Soul and subconscious mind","Past life memories","Hypnosis and meditation","Session preparation","Step-by-step PLRT process"]},{id:2,title:"Application and Practice of PLRT",topics:["Mental and spiritual benefits","Precautions and risks","Case studies","Career and client handling","Connection with other healing methods","Practice and practical guide"]}]; var el = document.getElementById('modules'); if (!el) return; el.innerHTML = modules.map(function (mod) { return '<div class="module' + (mod.id === 1 ? ' open' : '') + '" id="mod-' + mod.id + '"><button class="module-header" onclick="toggleModule(' + mod.id + ')"><div style="display:flex;align-items:center"><span class="module-num">M' + mod.id + '</span><span class="module-title">' + mod.title + '</span></div><svg class="module-chevron chevron-svg" viewBox="0 0 24 24" width="20" height="20"><polyline points="6 9 12 15 18 9"/></svg></button><div class="module-body"><div class="module-body-inner">' + mod.topics.map(function (t) { return '<div class="topic"><span class="topic-check">✓</span><span>' + t + '</span></div>'; }).join('') + '</div></div></div>'; }).join(''); })();
            function toggleModule(id) { document.querySelectorAll('.cc-palmistry-landing .module').forEach(function (m) { var mid = parseInt(m.id.split('-')[1]); if (mid === id) m.classList.toggle('open'); else m.classList.remove('open'); }); }
            (function () { var items = [{icon:"🎥",title:"4-week Guided Sessions",desc:"Structured PLRT training with replay access",value:"₹1,200"},{icon:"📚",title:"Technique Manuals",desc:"Regression scripts, notes, and support resources",value:"₹800"},{icon:"🧠",title:"Practical Integration",desc:"Applied module exercises and case understanding",value:"₹500"},{icon:"👥",title:"VIP Community Support",desc:"Private group support for doubts and practice",value:"₹400"},{icon:"🏆",title:"Completion Certificate",desc:"Institute-recognized completion certificate",value:"₹299"},{icon:"🎧",title:"Doubt Resolution",desc:"Guided support with mentor access",value:"₹200"},{icon:"📦",title:"Bonus Resources",desc:"Additional templates and guided references",value:"₹100"},{icon:"⏰",title:"Flexible Learning",desc:"Learn at your pace with structured progression",value:"Included"}]; var target = document.getElementById('wyg-items'); if (!target) return; target.innerHTML = items.map(function (i) { return '<div class="wyg-item"><div class="wyg-icon">' + i.icon + '</div><div class="wyg-text"><strong>' + i.title + '</strong><small>' + i.desc + '</small></div><span class="wyg-value">' + i.value + '</span></div>'; }).join(''); })();
            (function () { var t = [{name:"Seema R.",text:"I had an unexplained fear for years. This PLRT course helped me process deep emotional patterns with clarity."},{name:"Anil P.",text:"The structure is practical and responsible. The method is taught clearly with proper safety guidance."},{name:"Kavita M.",text:"The support materials and community made practice much easier. The value is excellent for the fee."}]; var target = document.getElementById('testimonials'); if (!target) return; target.innerHTML = t.map(function (r) { return '<div class="test-card"><div class="test-stars">★★★★★</div><p class="test-text">\"' + r.text + '\"</p><p class="test-name">— ' + r.name + '</p></div>'; }).join(''); })();
            (function () { var faqs = [{q:"Is Past Life Regression hypnosis?",a:"PLRT often uses deep relaxation or hypnotic techniques, but the focus is on subconscious memory access while maintaining awareness."},{q:"Do I need any background to learn this?",a:"No. This course is designed for beginners and also useful for learners from healing, spirituality, or counseling backgrounds."},{q:"Is this course safe to practice?",a:"Yes, when done with proper guidance and ethical understanding. Safety precautions and boundaries are clearly taught."},{q:"Will I receive a certificate after completing the course?",a:"Yes, students who complete the course receive a formal completion certificate from the institute."}]; var target = document.getElementById('faq-list'); if (!target) return; target.innerHTML = faqs.map(function (f, i) { return '<div class="faq-item' + (i === 0 ? ' open' : '') + '" id="faq-' + i + '"><button class="faq-q" onclick="toggleFaq(' + i + ')"><span>' + f.q + '</span><svg class="faq-chevron chevron-svg" viewBox="0 0 24 24" width="20" height="20"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-a"><p>' + f.a + '</p></div></div>'; }).join(''); })();
            function toggleFaq(i) { document.querySelectorAll('.cc-palmistry-landing .faq-item').forEach(function (el) { var fid = parseInt(el.id.split('-')[1]); if (fid === i) el.classList.toggle('open'); else el.classList.remove('open'); }); }
        </script>
    </main>"""

    html = re.sub(
        r"<!-- PREMIUM HERO & HOOK -->.*?<!-- TOP URGENCY MARQUEE -->",
        main_block + "\n\n    <!-- TOP URGENCY MARQUEE -->",
        html,
        flags=re.S,
        count=1,
    )

    # Remove legacy bottom accordion script block to avoid duplicate behavior.
    html = re.sub(
        r"\n\s*<script>\s*// Accordion functionality for Syllabus & FAQs.*?</script>\s*</body>",
        "\n</body>",
        html,
        flags=re.S,
        count=1,
    )

    PLRT_FILE.write_text(html, encoding="utf-8")
    print("Migrated archive/plrt.html to crash-course layout.")


if __name__ == "__main__":
    main()

