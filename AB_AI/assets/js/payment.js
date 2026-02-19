
// Payment Integration Script

// Helper to get current user ID (Placeholder logic - replace with actual auth)
// In a real scenario, this would come from a cookie, local storage token, or session check endpoint
function getCurrentUserId() {
    // Placeholder: Return a dummy ID or handle redirect if not logged in
    // For demo: prompting or checking a global variable
    return localStorage.getItem('userId') || null;
}

async function subscribe(couponCode) {
    const userId = getCurrentUserId();

    if (!userId) {
        alert("Please login to subscribe.");
        window.location.href = "login.html";
        return;
    }

    try {
        const res = await fetch("/api/payment/create-subscription-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: userId,
                couponCode: couponCode || null
            })
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || "Payment initiation failed");
        }

        const data = await res.json();
        if (data.url) {
            window.location.href = data.url;
        } else {
            alert("Something went wrong initializing payment.");
        }

    } catch (error) {
        console.error("Payment Error:", error);
        alert("Failed to start payment process. Please try again.");
    }
}
