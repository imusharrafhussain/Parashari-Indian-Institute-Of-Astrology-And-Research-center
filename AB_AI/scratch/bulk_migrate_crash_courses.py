import json
import re
from pathlib import Path


ROOT = Path(r"d:\Parashari website new\AB_AI\crash-courses")
TEMPLATE_FILE = Path(r"d:\Parashari website new\AB_AI\archive\plrt.html")


def extract_between(text: str, start_pat: str, end_pat: str) -> str:
    m = re.search(start_pat + r"(.*?)" + end_pat, text, re.S)
    return m.group(1) if m else ""


def clean_html_text(value: str) -> str:
    value = re.sub(r"<[^>]+>", " ", value)
    value = value.replace("&nbsp;", " ")
    return re.sub(r"\s+", " ", value).strip()


def sanitize_html_for_js(s: str) -> str:
    s = s.replace("\\", "\\\\")
    s = s.replace("'", "\\'")
    s = s.replace("\n", " ")
    s = re.sub(r"\s+", " ", s).strip()
    return s


def split_desc_hindi(subtitle_html: str) -> tuple[str, str]:
    marker = "<b>हिंदी में:</b>"
    if marker in subtitle_html:
        parts = subtitle_html.split(marker, 1)
        desc = re.sub(r"<br\s*/?>", " ", parts[0], flags=re.I).strip()
        hindi = parts[1].strip()
        return desc, hindi
    desc = re.sub(r"<br\s*/?>", " ", subtitle_html, flags=re.I).strip()
    return desc, ""


def extract_course_data(html: str) -> dict:
    title = re.search(r'<h1 class="course-title">(.*?)</h1>', html, re.S)
    subtitle = re.search(r'<p class="course-subtitle">(.*?)</p>', html, re.S)
    img = re.search(r'<div class="hero-image-content".*?<img[^>]*src="([^"]+)"[^>]*>', html, re.S)
    old_price = re.search(r"Total Value:\s*₹\s*([0-9,]+)", html)
    new_price = re.search(r"<strong[^>]*>\s*₹\s*([0-9,]+)\s*</strong>", html, re.S)

    course_title = clean_html_text(title.group(1)) if title else "Crash Course Masterclass"
    subtitle_html = subtitle.group(1).strip() if subtitle else "Structured crash course to build practical mastery."
    desc, hindi = split_desc_hindi(subtitle_html)
    image_src = img.group(1) if img else "../assets/images-optimized/harshit-sir-politician.webp"
    total_value = old_price.group(1) if old_price else "3,499"
    offer_price = new_price.group(1) if new_price else "2,499"

    syllabus_section = extract_between(html, r'<section class="syllabus-section">', r"</section>")
    module_matches = re.findall(
        r'<h3 class="module-title">(.*?)</h3>.*?<ul class="module-list"[^>]*>(.*?)</ul>',
        syllabus_section,
        re.S,
    )
    modules = []
    for idx, (m_title, ul_html) in enumerate(module_matches, start=1):
        li_items = re.findall(r"<li>(.*?)</li>", ul_html, re.S)
        topics = [clean_html_text(li) for li in li_items if clean_html_text(li)]
        modules.append({"id": idx, "title": clean_html_text(m_title), "topics": topics})
    if not modules:
        modules = [{"id": 1, "title": "Core Foundations", "topics": ["Fundamentals and essential concepts"]}]

    testimonials = []
    test_matches = re.findall(r'<div class="mini-testimonial".*?<p[^>]*>(.*?)</p>.*?<h5[^>]*>(.*?)</h5>', html, re.S)
    for text, name in test_matches:
        t = clean_html_text(text).strip('"')
        n = clean_html_text(name).lstrip("—- ").strip()
        if t and n:
            testimonials.append({"name": n, "text": t})
    if not testimonials:
        testimonials = [{"name": "Student", "text": "Great course with practical learning."}]

    faq_section = extract_between(html, r"<!-- FAQ SECTION -->", r"<!-- FOOTER -->")
    faq_matches = re.findall(
        r'<h4[^>]*>(.*?)</h4>.*?<div class="module-content">\s*<p[^>]*>(.*?)</p>',
        faq_section,
        re.S,
    )
    faqs = []
    for q, a in faq_matches:
        q_clean = clean_html_text(q)
        a_clean = clean_html_text(a)
        if q_clean and a_clean:
            faqs.append({"q": q_clean, "a": a_clean})
    if not faqs:
        faqs = [{"q": "Do I need prior knowledge?", "a": "No, this course is beginner friendly."}]

    return {
        "course_title": course_title,
        "desc": desc,
        "hindi": hindi,
        "image_src": image_src,
        "total_value": total_value,
        "offer_price": offer_price,
        "modules": modules,
        "testimonials": testimonials,
        "faqs": faqs,
    }


def build_main_block(data: dict) -> str:
    modules_json = json.dumps(data["modules"], ensure_ascii=False)
    testimonials_json = json.dumps(data["testimonials"], ensure_ascii=False)
    faqs_json = json.dumps(data["faqs"], ensure_ascii=False)
    desc = sanitize_html_for_js(data["desc"])
    hindi = sanitize_html_for_js(data["hindi"])

    return f"""    <main class="cc-palmistry-landing">
        <section class="hero">
            <div class="particles" id="particles"></div>
            <div class="ccp-container hero-content">
                <div class="badges animate-fade-in">
                    <span class="badge">🛡️ Govt. Approved</span>
                </div>
                <div class="hero-grid">
                    <div class="animate-slide-up">
                        <h1>{data["course_title"]} <span class="text-gold">Masterclass</span></h1>
                        <p class="desc">{data["desc"]}</p>
                        <p class="hindi"><b>हिंदी में:</b> {data["hindi"]}</p>
                        <div class="feature-pills">
                            <div class="pill"><span class="pill-icon">🎥</span><div><p class="pill-title">Intensive Sessions</p><p class="pill-desc">Complete recorded access with revision support</p></div></div>
                            <div class="pill"><span class="pill-icon">📚</span><div><p class="pill-title">Guided Study Material</p><p class="pill-desc">Handouts, notes, and practice references</p></div></div>
                            <div class="pill"><span class="pill-icon">🏆</span><div><p class="pill-title">Institute Certification</p><p class="pill-desc">Recognized certificate on completion</p></div></div>
                            <div class="pill"><span class="pill-icon">💬</span><div><p class="pill-title">VIP Doubt Support</p><p class="pill-desc">Private support group and guidance</p></div></div>
                        </div>
                        <button class="btn-gold" style="margin-top:2rem" onclick="document.getElementById('pricing').scrollIntoView({{behavior:'smooth'}})">⚡ Claim Your Spot Now</button>
                    </div>
                    <div class="hero-img-wrap">
                        <div class="hero-img-inner">
                            <div class="hero-img-glow"></div>
                            <img src="{data["image_src"]}" alt="{data["course_title"]}" class="hero-img"></div>
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
                            <h3 class="banner-title">Start Your Transformation Today</h3>
                            <p class="banner-sub">Get complete access to all modules, materials, and support immediately upon enrollment.</p>
                        </div>
                    </div>
                    <div class="banner-right">
                        <div class="countdown"><span class="countdown-label">🕐 Offer ends in:</span><span class="countdown-box" id="cd-h">23H</span><span class="countdown-box" id="cd-m">45M</span><span class="countdown-box" id="cd-s">12S</span></div>
                        <div class="price-box"><p class="price-old">Total Value ₹{data["total_value"]}</p><p class="price-new">₹{data["offer_price"]}</p></div>
                        <button class="btn-cta" onclick="document.getElementById('pricing').scrollIntoView({{behavior:'smooth'}})">Enroll Now</button>
                    </div>
                </div>
            </div>
        </section>

        <section class="stats"><div class="ccp-container"><div class="stats-grid"><div class="stat"><p class="stat-value text-gold">90%</p><p class="stat-label">Practice Confidence</p></div><div class="stat"><p class="stat-value text-gold">4 Weeks</p><p class="stat-label">Course Duration</p></div></div></div></section>

        <section class="curriculum">
            <div class="ccp-container">
                <div class="section-header">
                    <h2>What You Will <span class="text-gold">Master</span></h2>
                    <p>A structured crash course designed to take you from curiosity to practical application and confidence.</p>
                </div>
                <div class="modules" id="modules"></div>
            </div>
        </section>

        <section class="what-you-get">
            <div class="ccp-container">
                <div class="wyg-grid">
                    <div class="wyg-img-wrap"><div class="wyg-img-glow"></div><img src="{data["image_src"]}" alt="{data["course_title"]} Visual" class="wyg-img"></div>
                    <div>
                        <h2>Everything You Get for <span class="text-gold">Just ₹{data["offer_price"]}</span></h2>
                        <p style="margin-top:1rem;color:var(--muted)">Total value worth ₹{data["total_value"]} — but you pay only a fraction of that.</p>
                        <div class="wyg-items" id="wyg-items"></div>
                    </div>
                </div>
            </div>
        </section>

        <section class="expert"><div class="ccp-container"><div class="expert-card"><div class="expert-inner"><div class="expert-img-wrap"><img src="../circle faculty images.jpg.jpeg" alt="Expert Faculty Panel" class="expert-img"></div><div><h2>Guided by an Elite Panel of Experts</h2><p style="font-size:0.875rem;font-weight:600;color:var(--gold-dark);margin-top:0.25rem">Unmatched Mentorship & Support</p><p style="margin-top:1rem;color:var(--muted);line-height:1.7">This crash course is designed and delivered by a curated group of seasoned professionals. Every module is taught with practical examples and real guidance.</p><div class="expert-tags"><span class="expert-tag"><span class="expert-dot" style="background:hsl(40,80%,55%)"></span> Active Practitioners</span><span class="expert-tag"><span class="expert-dot" style="background:var(--gold)"></span> Proven Methods</span><span class="expert-tag"><span class="expert-dot" style="background:var(--primary)"></span> Guided Practice Focus</span></div></div></div></div></div></section>

        <section class="testimonials"><div class="ccp-container"><div class="section-header"><h2>Student <span class="text-gold">Transformations</span></h2><p>Real experiences from learners who took this course</p></div><div class="test-grid" id="testimonials"></div></div></section>

        <section class="pricing" id="pricing">
            <div class="ccp-container">
                <div class="section-header"><h2>Enroll Now & Start Your Journey</h2><p>Join learners building practical confidence with structured training</p></div>
                <div class="pricing-card-wrap">
                    <div class="pricing-glow"></div>
                    <div class="pricing-card">
                        <div class="pricing-header"><small>CRASH COURSE</small><h3>{data["course_title"]}</h3><span>4 weeks • Complete Program</span></div>
                        <div class="pricing-body"><span class="pricing-old">₹{data["total_value"]}</span><span class="pricing-off">Limited Offer</span><p class="pricing-amount text-gold">₹{data["offer_price"]}</p><p class="pricing-note">One-time payment • No hidden charges</p><button class="btn-enroll" onclick="window.location.href='../register.html'">🎓 Enroll Now — Start Learning Today</button><p class="pricing-secure">🔒 100% Secure Payment • Instant Access</p></div>
                        <div class="pricing-includes"><p>Everything included:</p><ul><li><span class="check">✓</span> Structured modules and practice topics</li><li><span class="check">✓</span> Session recordings and notes</li><li><span class="check">✓</span> Private support and doubt handling</li><li><span class="check">✓</span> Institute completion certificate</li><li><span class="check">✓</span> Bonus learning resources</li></ul></div>
                    </div>
                </div>
                <div class="trust-signals"><span>🛡️ Govt. Approved</span><span>🔒 Secure Payment</span></div>
            </div>
        </section>

        <section class="faq"><div class="ccp-container"><div class="section-header"><h2>Frequently Asked <span class="text-gold">Questions</span></h2></div><div class="faq-list" id="faq-list"></div></div></section>
        <section class="final-cta" aria-label="Final call to action"><div class="ccp-container"><div class="final-cta-inner"><h2>Still Thinking? Your Future Self Will Thank You.</h2><p>This is a practical skill-building course designed for real implementation.</p><div class="final-cta-actions"><button class="btn-cta" onclick="document.getElementById('pricing').scrollIntoView({{behavior:'smooth'}})">⚡ Enroll Now for ₹{data["offer_price"]}</button></div></div></div></section>

        <script>
            (function () {{ var c = document.getElementById('particles'); if (!c) return; for (var i = 0; i < 20; i++) {{ var d = document.createElement('div'); d.className = 'particle'; var s = Math.random() * 6 + 2; d.style.width = s + 'px'; d.style.height = s + 'px'; d.style.left = Math.random() * 100 + '%'; d.style.top = Math.random() * 100 + '%'; d.style.animation = 'ccp-float ' + (Math.random() * 4 + 4) + 's ease-in-out ' + (Math.random() * 2) + 's infinite'; c.appendChild(d); }} }})();
            (function () {{ var h = 23, m = 45, s = 12; setInterval(function () {{ s--; if (s < 0) {{ s = 59; m--; }} if (m < 0) {{ m = 59; h--; }} if (h < 0) {{ h = 23; m = 59; s = 59; }} var eh = document.getElementById('cd-h'), em = document.getElementById('cd-m'), es = document.getElementById('cd-s'); if (!eh || !em || !es) return; eh.textContent = String(h).padStart(2, '0') + 'H'; em.textContent = String(m).padStart(2, '0') + 'M'; es.textContent = String(s).padStart(2, '0') + 'S'; }}, 1000); }})();
            (function () {{ var modules = {modules_json}; var el = document.getElementById('modules'); if (!el) return; el.innerHTML = modules.map(function (mod) {{ return '<div class="module' + (mod.id === 1 ? ' open' : '') + '" id="mod-' + mod.id + '"><button class="module-header" onclick="toggleModule(' + mod.id + ')"><div style="display:flex;align-items:center"><span class="module-num">M' + mod.id + '</span><span class="module-title">' + mod.title + '</span></div><svg class="module-chevron chevron-svg" viewBox="0 0 24 24" width="20" height="20"><polyline points="6 9 12 15 18 9"/></svg></button><div class="module-body"><div class="module-body-inner">' + mod.topics.map(function (t) {{ return '<div class="topic"><span class="topic-check">✓</span><span>' + t + '</span></div>'; }}).join('') + '</div></div></div>'; }}).join(''); }})();
            function toggleModule(id) {{ document.querySelectorAll('.cc-palmistry-landing .module').forEach(function (m) {{ var mid = parseInt(m.id.split('-')[1]); if (mid === id) m.classList.toggle('open'); else m.classList.remove('open'); }}); }}
            (function () {{ var items = [{{icon:"🎥",title:"Guided Sessions",desc:"Structured topic-by-topic training",value:"<span class='wyg-inc'>Included</span>"}},{{icon:"📚",title:"Study Materials",desc:"Notes, references, and handouts",value:"<span class='wyg-inc'>Included</span>"}},{{icon:"🧠",title:"Practical Training",desc:"Implementation-focused approach",value:"<span class='wyg-inc'>Included</span>"}},{{icon:"👥",title:"Support Community",desc:"Doubt support and group assistance",value:"<span class='wyg-inc'>Included</span>"}},{{icon:"🏆",title:"Completion Certificate",desc:"Institute-recognized certification",value:"<span class='wyg-inc'>Included</span>"}}]; var target = document.getElementById('wyg-items'); if (!target) return; target.innerHTML = items.map(function (i) {{ return '<div class="wyg-item"><div class="wyg-icon">' + i.icon + '</div><div class="wyg-text"><strong>' + i.title + '</strong><small>' + i.desc + '</small></div><span class="wyg-value">' + i.value + '</span></div>'; }}).join(''); }})();
            (function () {{ var t = {testimonials_json}; var target = document.getElementById('testimonials'); if (!target) return; target.innerHTML = t.map(function (r) {{ return '<div class="test-card"><div class="test-stars">★★★★★</div><p class="test-text">"' + r.text + '"</p><p class="test-name">— ' + r.name + '</p></div>'; }}).join(''); }})();
            (function () {{ var faqs = {faqs_json}; var target = document.getElementById('faq-list'); if (!target) return; target.innerHTML = faqs.map(function (f, i) {{ return '<div class="faq-item' + (i === 0 ? ' open' : '') + '" id="faq-' + i + '"><button class="faq-q" onclick="toggleFaq(' + i + ')"><span>' + f.q + '</span><svg class="faq-chevron chevron-svg" viewBox="0 0 24 24" width="20" height="20"><polyline points="6 9 12 15 18 9"/></svg></button><div class="faq-a"><p>' + f.a + '</p></div></div>'; }}).join(''); }})();
            function toggleFaq(i) {{ document.querySelectorAll('.cc-palmistry-landing .faq-item').forEach(function (el) {{ var fid = parseInt(el.id.split('-')[1]); if (fid === i) el.classList.toggle('open'); else el.classList.remove('open'); }}); }}
        </script>
    </main>"""


def main() -> None:
    template_html = TEMPLATE_FILE.read_text(encoding="utf-8")
    style_block = extract_between(template_html, r"<style>", r"</style>")
    if not style_block:
        raise RuntimeError("Could not extract template style block.")

    target_files = sorted([p.name for p in ROOT.glob("cc-*.html")])
    for fname in target_files:
        path = ROOT / fname
        source_html = path.read_text(encoding="utf-8", errors="ignore")
        data = extract_course_data(source_html)
        html = source_html

        html = re.sub(
            r"<style>.*?</style>",
            "<style>\n" + style_block.strip() + "\n    </style>",
            html,
            flags=re.S,
            count=1,
        )

        replacement_main = build_main_block(data)
        html = re.sub(
            r"<!-- PREMIUM HERO & HOOK -->.*?<!-- FOOTER -->",
            replacement_main + "\n\n    <!-- FOOTER -->",
            html,
            flags=re.S,
            count=1,
        )

        html = re.sub(
            r"\n\s*<script>\s*// Accordion functionality for Syllabus & FAQs.*?</script>\s*</body>",
            "\n</body>",
            html,
            flags=re.S,
            count=1,
        )

        path.write_text(html, encoding="utf-8")
        print(f"Migrated: {fname} | title={data['course_title']} | modules={len(data['modules'])} | faqs={len(data['faqs'])}")


if __name__ == "__main__":
    main()

