document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.premium-gold-card');
    
    cards.forEach(card => {
        const category = card.getAttribute('data-category');
        let durationText = "";
        
        if (category === "Crash Course") {
            durationText = "4 Weeks Live + 4 Weeks Bonus Recording Access";
        } else if (category === "Diploma") {
            durationText = "8 Weeks Live + 8 Weeks Bonus Recording Access";
        } else if (category === "Bachelor") {
            durationText = "12 Weeks Live + 12 Weeks Bonus Recording Access";
        } else if (category === "Master") {
            durationText = "16 Weeks Live + 16 Weeks Bonus Recording Access";
        }
        
        if (durationText) {
            const mb1 = card.querySelector('.mb-1');
            if (mb1) {
                const durationBadge = document.createElement('div');
                durationBadge.className = 'duration-access-badge';
                // Positive framing: "Bonus Recording Access" sounds better than "deleted after X weeks"
                // The tooltip clarifies the urgency/focus aspect.
                durationBadge.style.cssText = "margin-top: 8px; font-size: 0.8rem; font-weight: 600; color: #fff; background: linear-gradient(135deg, #10b981, #059669); padding: 5px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); width: 100%; justify-content: center; border: 1px solid rgba(255,255,255,0.2);";
                durationBadge.innerHTML = `<i class="fa-solid fa-clock"></i> ${durationText}`;
                durationBadge.title = "Recordings are available for this bonus period to encourage focused learning and completion!";
                
                mb1.appendChild(durationBadge);
            }
        }
    });
});
