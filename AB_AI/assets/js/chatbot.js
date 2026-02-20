/* ============================================
   ULTIMATE ASTRO SUPPORT ASSISTANT - NLP RESTORED
   ============================================ */

(function () {
    // Prevent multiple initializations (Singleton)
    if (window.AstroChatbotInitialized) return;
    window.AstroChatbotInitialized = true;

    const STATES = {
        CHOOSE_LANG: 'CHOOSE_LANG',
        ASK_NAME: 'ASK_NAME',
        MAIN_MENU: 'MAIN_MENU',
        ISSUE_FORM: 'ISSUE_FORM',
        COURSE_SEARCH: 'COURSE_SEARCH',
        IDLE: 'IDLE',
        REDIRECTING: 'REDIRECTING'
    };

    const CONFIG = {
        emailRecipient: 'musharraf.codes@gmail.com',
        typingSpeed: 600,
        maxHistory: 150,
        courseMap: {
            'bnn': 'bnn-astrology.html',
            'lal kitab': 'lal-kitab.html',
            'kp': 'kp-astrology.html',
            'medical': 'medical-astrology.html',
            'palmistry': 'palmistry.html',
            'vastu': 'vastu.html',
            'numerology': 'numerology.html'
        },
        hinglishKeywords: [
            'jaise', 'kya', 'mujhe', 'kaise', 'kaha', 'madad', 'help', 'problem', 'hai',
            'ji', 'batao', 'kar', 'do', 'naam', 'kripya', 'shukriya', 'theek', 'hai', 'namaste', 'halo',
            'han', 'nahi', 'dikhao', 'batayein', 'batayiye', 'bhai', 'yaar', 'please', 'aap', 'pucho', 'karna'
        ]
    };

    // Load persisted state (Position only, fresh start for conversation)
    let chatData = {
        history: [],
        name: '',
        lang: '',
        state: STATES.CHOOSE_LANG,
        pos: JSON.parse(sessionStorage.getItem('astroChat_pos_v2')) || null,
        isOpen: false
    };

    // --- DOM Injection ---
    const injectHTML = `
        <div class="astro-chat-toggle" id="astroChatToggle" role="button" aria-label="Toggle Support Assistant">
            <div class="astro-toggle-badge">
                <i class="fas fa-comment-dots"></i>
            </div>
            <img src="assets/images/bot-namaste.png" class="bot-img-default" alt="Support Robot">
            <img src="assets/images/bot-reading.png" class="bot-img-active" alt="Active Chat">
        </div>
        <div class="astro-chat-container" id="astroChatContainer" role="dialog" aria-labelledby="chatHeaderTitle">
            <div class="astro-chat-header" id="astroChatHeader">
                <div class="astro-chat-header-info">
                    <img src="assets/images/parashari-header-logo.png" alt="Parashari Logo">
                    <h4 id="chatHeaderTitle">Parashari Support Assistant</h4>
                </div>
                <div class="astro-chat-header-actions">
                    <button id="astroChatNew" class="astro-btn-new" aria-label="New Chat" title="Start New Chat">New Chat +</button>
                    <button id="astroChatClose" class="astro-chat-close-btn" aria-label="Minimize Chat" title="Minimize">&times;</button>
                </div>
            </div>
            <div class="astro-chat-messages" id="astroChatMessages"></div>
            <div class="astro-chat-input-wrapper" id="astroChatInputWrapper">
                <input type="text" id="astroChatInput" placeholder="Type your message..." aria-label="Message Input">
                <button id="astroChatSend" class="astro-chat-send" aria-label="Send Message"><i class="fas fa-paper-plane"></i></button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', injectHTML);

    // --- DOM Elements ---
    const toggle = document.getElementById('astroChatToggle');
    const container = document.getElementById('astroChatContainer');
    const header = document.getElementById('astroChatHeader');
    const messages = document.getElementById('astroChatMessages');
    const inputWrapper = document.getElementById('astroChatInputWrapper');
    const inputField = document.getElementById('astroChatInput');
    const sendBtn = document.getElementById('astroChatSend');
    const closeBtn = document.getElementById('astroChatClose');
    const newChatBtn = document.getElementById('astroChatNew');

    // --- Core Logic & Helpers ---

    function save() {
        sessionStorage.setItem('astroChat_pos_v2', JSON.stringify(chatData.pos));
    }

    function detectLanguage(text) {
        const lower = text.toLowerCase();
        let score = 0;
        CONFIG.hinglishKeywords.forEach(kw => {
            if (lower.includes(kw)) score++;
        });
        if (score > 0) chatData.lang = 'hinglish';
        else chatData.lang = 'english';
        save();
    }

    function addMessage(text, isBot = true, options = null) {
        chatData.history.push({ text, isBot, options });
        renderMessage(text, isBot, options);
        save();
    }

    function renderMessage(text, isBot = true, options = null) {
        const div = document.createElement('div');
        div.className = `chat-bubble ${isBot ? 'bot-bubble' : 'user-bubble'}`;
        div.innerHTML = text;
        messages.appendChild(div);

        if (options && isBot && chatData.isOpen) {
            const btnGroup = document.createElement('div');
            btnGroup.className = 'chat-btn-group';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'chat-btn';
                btn.innerText = opt.label;
                btn.onclick = (e) => { e.stopPropagation(); opt.action(); };
                btnGroup.appendChild(btn);
            });
            messages.appendChild(btnGroup);
        }
        messages.scrollTop = messages.scrollHeight;
    }

    function rebuildHistory() {
        messages.innerHTML = '';
        chatData.history.forEach((m, index) => {
            const isLast = (index === chatData.history.length - 1);
            renderMessage(m.text, m.isBot, isLast ? m.options : null);
        });

        if ([STATES.ASK_NAME, STATES.COURSE_SEARCH].includes(chatData.state)) {
            inputWrapper.classList.add('active');
        } else {
            inputWrapper.classList.remove('active');
        }
    }

    // --- State Logic ---

    const T = {
        welcome: {
            en: "You are warmly welcomed to Parashari Indian Institute of Astrology and Research Center. We are delighted to assist you.",
            hi: "Parashari Indian Institute mein aapka swagat hai. Humein aapki sahayata karke khushi hogi."
        },
        askName: {
            en: "May I please know your good name?",
            hi: "Kripya aapka shubh naam batayein?"
        },
        menuText: (n) => ({
            en: `Thank you dear ${n}. How may I assist you today? Please choose an option below.`,
            hi: `Dhanyavaad dear ${n}. Main aapki kaise sahayata kar sakta hoon? Kripya niche diye gaye options mein se ek choose karein.`
        }),
        issueApology: (n) => ({
            en: `We are truly sorry to hear that you are facing difficulty on our platform, dear ${n}. Kindly fill the form below so we may assist you.`,
            hi: `Humein khed hai ki aap platform par problem face kar rahe hain, dear ${n}. Kripya niche diya gaya form fill karein.`
        }),
        successMsg: (n) => ({
            en: `Thank you dear ${n}. Your issue has been successfully submitted. Our support team will contact you very soon. We truly appreciate your patience.`,
            hi: `Dhanyavaad dear ${n}. Aapka issue successfully submit ho chuka hai. Hamari team jaldi hi aapse sampark karegi.`
        })
    };

    const getT = (key, arg = null) => {
        const obj = typeof T[key] === 'function' ? T[key](arg) : T[key];
        return chatData.lang === 'hinglish' ? obj.hi : obj.en;
    };

    async function botSay(text, options = null) {
        if (!chatData.isOpen) {
            chatData.history.push({ text, isBot: true, options });
            save();
            return;
        }

        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
        messages.appendChild(typing);
        messages.scrollTop = messages.scrollHeight;

        await new Promise(r => setTimeout(r, CONFIG.typingSpeed));
        typing.remove();
        addMessage(text, true, options);
    }

    async function startWelcomeFlow() {
        if (chatData.history.length > 0) return;

        await botSay(T.welcome.en); // Universal welcome

        const langOptions = [
            { label: "English", action: () => selectLanguage('english') },
            { label: "Hinglish", action: () => selectLanguage('hinglish') }
        ];

        await botSay("Please choose your preferred language:", langOptions);
        chatData.state = STATES.CHOOSE_LANG;
        save();
    }

    async function selectLanguage(l) {
        chatData.lang = l;
        chatData.state = STATES.ASK_NAME;
        save();
        await botSay(getT('askName'));
        inputWrapper.classList.add('active');
        inputField.focus();
    }

    async function handleInput(val) {
        if (!val || chatData.state === STATES.IDLE) return;
        addMessage(val, false);
        inputField.value = '';

        if (chatData.state === STATES.ASK_NAME) {
            const name = val.replace(/[^a-zA-Z\s]/g, '').trim().split(' ').pop();
            chatData.name = name.length >= 2 ? name.substring(0, 30) : val.substring(0, 30);
            chatData.state = STATES.MAIN_MENU;
            save();
            inputWrapper.classList.remove('active');
            await botSay(getT('menuText', chatData.name));
            showMainMenu();
        } else if (chatData.state === STATES.COURSE_SEARCH) {
            const q = val.toLowerCase();
            let match = null;
            for (let k in CONFIG.courseMap) if (q.includes(k)) match = CONFIG.courseMap[k];

            if (match) {
                await botSay(chatData.lang === 'hinglish' ? "Redirect kar rahe hain..." : "Redirecting you now...");
                setTimeout(() => window.location.href = match, 1500);
            } else {
                await botSay(chatData.lang === 'hinglish' ? `Sorry dear ${chatData.name}, humein yeh course nahi mila. Kripya check karein.` : `Sorry dear ${chatData.name}, we could not find that course. Kindly check.`);
                showMainMenu();
            }
        }
    }

    function showMainMenu() {
        inputWrapper.classList.remove('active');
        const options = [
            { label: chatData.lang === 'hinglish' ? 'Platform Samasya' : 'Platform Issue', action: startIssueForm },
            {
                label: chatData.lang === 'hinglish' ? 'Course Khojein' : 'Course Search',
                action: async () => {
                    chatData.state = STATES.COURSE_SEARCH;
                    save();
                    await botSay(chatData.lang === 'hinglish' ? "Kripya course ka naam type karein..." : "Please type the course name...");
                    inputWrapper.classList.add('active');
                    inputField.focus();
                }
            },
            { label: chatData.lang === 'hinglish' ? 'Sabhi Courses' : 'Show All Courses', action: () => window.location.href = 'courses.html' },
            {
                label: chatData.lang === 'hinglish' ? 'Support Karein' : 'Contact Support', action: () => {
                    botSay(chatData.lang === 'hinglish' ? "Contact page par le ja rahe hain..." : "Taking you to our contact page...");
                    setTimeout(() => window.location.href = 'contact.html', 1500);
                }
            }
        ];
        botSay(chatData.lang === 'hinglish' ? "Kripya ek option choose karein:" : "Kindly choose an option:", options);
    }

    async function startIssueForm() {
        chatData.state = STATES.ISSUE_FORM;
        save();
        await botSay(getT('issueApology', chatData.name));

        const countries = [
            { n: "India", c: "+91" }, { n: "USA", c: "+1" }, { n: "UK", c: "+44" },
            { n: "Australia", c: "+61" }, { n: "Canada", c: "+1" }, { n: "Germany", c: "+49" },
            { n: "France", c: "+33" }, { n: "UAE", c: "+971" }, { n: "Singapore", c: "+65" },
            { n: "Nepal", c: "+977" }, { n: "Sri Lanka", c: "+94" }, { n: "Bangladesh", c: "+880" },
            { n: "Pakistan", c: "+92" }, { n: "Saudi Arabia", c: "+966" }, { n: "Qatar", c: "+974" },
            { n: "Kuwait", c: "+965" }, { n: "Oman", c: "+968" }, { n: "Bahrain", c: "+973" },
            { n: "Malaysia", c: "+60" }, { n: "Thailand", c: "+66" }, { n: "Japan", c: "+81" },
            { n: "China", c: "+86" }, { n: "Russia", c: "+7" }, { n: "Brazil", c: "+55" },
            { n: "South Africa", c: "+27" }, { n: "Netherlands", c: "+31" }, { n: "Italy", c: "+39" },
            { n: "Spain", c: "+34" }, { n: "Sweden", c: "+46" }, { n: "Norway", c: "+47" }
        ].sort((a, b) => a.n.localeCompare(b.n));

        const optionsHtml = countries.map(ctry =>
            `<option value="${ctry.c}" ${ctry.c === '+91' ? 'selected' : ''}>${ctry.n} (${ctry.c})</option>`
        ).join('');

        const formDiv = document.createElement('div');
        formDiv.className = 'chat-bubble bot-bubble';
        formDiv.style.width = '100%';
        formDiv.innerHTML = `
            <form id="astroIssueForm" class="chat-form">
                <textarea name="description" class="form-textarea" placeholder="Describe issue (Max 200 chars)" maxlength="200" required></textarea>
                <div class="form-row">
                    <select name="code" class="form-select">
                        ${optionsHtml}
                    </select>
                    <input type="tel" name="phone" class="form-input" placeholder="Phone" required>
                </div>
                <input type="email" name="email" class="form-input" placeholder="Email" required>
                <button type="submit" id="issueSubmitBtn" class="form-btn">Submit Issue</button>
            </form>
        `;
        messages.appendChild(formDiv);
        messages.scrollTop = messages.scrollHeight;

        document.getElementById('astroIssueForm').onsubmit = async (e) => {
            e.preventDefault();
            const btn = document.getElementById('issueSubmitBtn');
            const formData = new FormData(e.target);

            btn.disabled = true;
            btn.innerText = 'Sending...';

            const payload = {
                Name: chatData.name,
                Email: formData.get('email'),
                Phone: formData.get('code') + " " + formData.get('phone'),
                Message: formData.get('description'),
                _subject: "New Platform Issue - AB_AI Chatbot",
                _captcha: "false"
            };

            try {
                const res = await fetch(`https://formsubmit.co/ajax/${CONFIG.emailRecipient}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (res.ok) {
                    await botSay(getT('successMsg', chatData.name));
                    setTimeout(() => { formDiv.remove(); showMainMenu(); }, 2000);
                } else throw new Error();
            } catch {
                btn.disabled = false;
                btn.innerText = 'Error! Try Again';
            }
        };
    }

    // --- Floating & Drag Logic ---

    // --- Floating & Drag Logic ---
    function updateContainerPosition() {
        const tRect = toggle.getBoundingClientRect();
        const cRect = container.getBoundingClientRect();
        const gap = 20;
        const padding = 20;
        const headerClearance = 280; // Clearance for header + search bar

        // Default: Bottom aligned, side based on toggle position
        // If toggle is on right half: Container to left
        // If toggle is on left half: Container to right

        const isRightConfig = (tRect.left + tRect.width / 2) > window.innerWidth / 2;

        let targetLeft;
        if (isRightConfig) {
            targetLeft = tRect.left - cRect.width - gap;
            // Prevent going off-screen left
            if (targetLeft < padding) targetLeft = padding;
        } else {
            targetLeft = tRect.right + gap;
            // Prevent going off-screen right
            if (targetLeft + cRect.width > window.innerWidth - padding) {
                targetLeft = window.innerWidth - cRect.width - padding;
            }
        }

        // Align bottoms
        let targetTop = tRect.bottom - cRect.height;
        // Prevent going off-screen top
        if (targetTop < headerClearance) targetTop = headerClearance;
        // Prevent going off-screen bottom
        if (targetTop + cRect.height > window.innerHeight - padding) {
            targetTop = window.innerHeight - cRect.height - padding;
        }

        container.style.left = `${targetLeft}px`;
        container.style.top = `${targetTop}px`;
        container.style.right = 'auto';
        container.style.bottom = 'auto';
    }

    function setupDraggable(el, handle, storageKey, onUpdate) {
        let isDragging = false;
        let startX, startY, initialX, initialY;

        handle.style.cursor = 'move';

        const onStart = (e) => {
            if (window.innerWidth <= 600) return;
            isDragging = true;
            const event = e.type.includes('touch') ? e.touches[0] : e;
            startX = event.clientX;
            startY = event.clientY;
            initialX = el.offsetLeft;
            initialY = el.offsetTop;
            el.style.transition = 'none';
            if (el === toggle) {
                // When dragging toggle, update container too (smooth)
                container.style.transition = 'none';
            }
            el.style.bottom = 'auto';
            el.style.right = 'auto';
            if (!e.type.includes('touch')) e.preventDefault();
        };

        const onMove = (e) => {
            if (!isDragging) return;
            const event = e.type.includes('touch') ? e.touches[0] : e;
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;

            let x = initialX + dx;
            let y = initialY + dy;

            // Strict Vertical Constraints (Below Header, Above Footer)
            const minTop = 280;
            const maxTop = window.innerHeight - el.offsetHeight - 50;

            y = Math.max(minTop, Math.min(y, maxTop));
            x = Math.max(0, Math.min(x, window.innerWidth - el.offsetWidth));

            el.style.left = x + 'px';
            el.style.top = y + 'px';

            if (onUpdate) onUpdate();
        };

        const onEnd = () => {
            if (!isDragging) return;
            isDragging = false;

            const centerX = window.innerWidth / 2;
            const currentX = el.offsetLeft + (el.offsetWidth / 2);

            // Snap logic for Toggle
            if (el === toggle) {
                const padding = 40;
                let finalSide = currentX < centerX ? 'left' : 'right';
                let finalX = finalSide === 'left' ? padding : window.innerWidth - el.offsetWidth - padding;

                el.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                container.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; /* Sync transition */

                el.style.left = finalX + 'px';

                // Save side and y position
                chatData[storageKey] = { side: finalSide, y: el.offsetTop };
                sessionStorage.setItem(`astroChat_${storageKey}_v2`, JSON.stringify(chatData[storageKey]));

                if (finalSide === 'left') {
                    toggle.classList.add('left-side');
                } else {
                    toggle.classList.remove('left-side');
                }

                // Update container final pos after snap
                // We need to wait for transition or just set it?
                // Setting it here might conflict with transition unless we calc target.
                // Let's use a timeout or requestAnimationFrame to keep updating?
                // Or simple: Set it once. 

                // Re-calibrating container position based on SNAP target
                // But updateContainerPosition uses getBoundingClientRect which is current.
                // So we need to wait for the snap to finish? 
                // Actually, if we set transition on both, and set target left/top on both, they animate together.

                // Let's manually invoke updateContainerPosition() but we need to know the FUTURE rect of toggle?
                // That's hard. 
                // Simpler: Just save, and let the loop handle it? 
                // Or: The updateContainerPosition relies on current toggle pos.
                // If toggle animates, container should animate to its target.

                // Hack: Trigger updateContainerPosition repeatedly during transition?
                // Better: Just let them be independent for the snap? 
                // No, they must move together.

                // If I set `container.style.left` NOW based on `finalX`, it will animate to it.
                // We can simulate the toggle rect.
                setTimeout(updateContainerPosition, 50); // Initial 
                setTimeout(updateContainerPosition, 500); // After transition
            }
        };

        handle.addEventListener('mousedown', onStart);
        handle.addEventListener('touchstart', onStart, { passive: true });
        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, { passive: false });
        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);
    }

    function restorePositions() {
        if (window.innerWidth <= 600) return;

        // Disable transitions to prevent layout thrashing and ensure getBoundingClientRect is correct immediately
        toggle.style.transition = 'none';
        container.style.transition = 'none';

        // Restore Toggle Position
        const data = JSON.parse(sessionStorage.getItem('astroChat_toggle_pos_v2'));
        if (data) {
            const sidePadding = 40;
            const x = data.side === 'left' ? sidePadding : window.innerWidth - toggle.offsetWidth - sidePadding;
            const y = Math.max(280, Math.min(data.y, window.innerHeight - toggle.offsetHeight - 100));

            toggle.style.left = x + 'px';
            toggle.style.top = y + 'px';
            toggle.style.right = 'auto';
            toggle.style.bottom = 'auto';

            if (data.side === 'left') {
                toggle.classList.add('left-side');
            } else {
                toggle.classList.remove('left-side');
            }
        }


        // Force reflow to ensure toggle position is applied before calculating container
        toggle.offsetHeight;

        // Update Container Position based on restored toggle
        updateContainerPosition();

        // Re-enable transitions after a short delay (optional, or let CSS handle subsequent interactions)
        // We don't necessarily need to re-enable inline transitions because CSS has default transitions.
        // However, if we drag again, setupDraggable handles transitions.
        // If we want smooth resize updates later, we might want them back.
        // But resize event fires continuously.

        // Let's clear the inline transition property so it reverts to CSS stylesheet (if any)
        setTimeout(() => {
            toggle.style.transition = '';
            container.style.transition = '';
        }, 50);
    }

    // Setup dragging for Toggle Only -> moving it updates container
    setupDraggable(toggle, toggle, 'toggle_pos', updateContainerPosition);

    // Listen for window resize
    window.addEventListener('resize', () => {
        restorePositions();
        updateContainerPosition();
    });

    // Initial positioning
    // We need to wait for layout? 
    // updateContainerPosition uses offsetWidth/Height which might be 0 if hidden?
    // Container is display:flex but opacity:0 and scale:0.8. Dimensions should be correct.
    // If display:none (mobile?), dimensions are 0.
    // But this script runs on load.

    // Ensure container has dimensions before calculating
    // It has fixed width/height in CSS.

    restorePositions();

    // --- Interactions ---

    function toggleChat() {
        chatData.isOpen = !chatData.isOpen;
        container.classList.toggle('open', chatData.isOpen);
        toggle.classList.toggle('active', chatData.isOpen);

        // Hide/Show badge
        const badge = document.querySelector('.astro-toggle-badge');
        if (badge) badge.style.display = chatData.isOpen ? 'none' : 'flex';

        if (chatData.isOpen) {
            rebuildHistory();
            restorePositions();
            if (chatData.history.length === 0) startWelcomeFlow();
            inputField.focus();
        }
    }

    toggle.onclick = (e) => {
        // Toggle if not dragged
        toggleChat();
    };
    closeBtn.onclick = toggleChat;
    sendBtn.onclick = () => handleInput(inputField.value.trim());
    inputField.onkeypress = (e) => { if (e.key === 'Enter') sendBtn.click(); };
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && chatData.isOpen) toggleChat(); });

    newChatBtn.onclick = () => {
        chatData.history = [];
        chatData.name = '';
        chatData.lang = '';
        chatData.state = STATES.CHOOSE_LANG;
        rebuildHistory();
        startWelcomeFlow();
    };

    restorePositions();
})();
