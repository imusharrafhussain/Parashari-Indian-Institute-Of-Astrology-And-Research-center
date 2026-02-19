// Authentication Logic - OTP Inline Flow

let otpVerified = false;
let verificationToken = '';

// Send OTP Button Handler
document.addEventListener('DOMContentLoaded', () => {
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const emailInput = document.getElementById('emailInput');
    const otpInput = document.getElementById('otpInput');
    const registerForm = document.getElementById('registerForm');

    if (sendOtpBtn) {
        sendOtpBtn.addEventListener('click', async () => {
            const email = emailInput.value.trim();

            if (!email) {
                alert('Please enter your email address');
                emailInput.focus();
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            await sendOTP(email);
        });
    }

    // Auto-verify OTP when 6 digits entered
    if (otpInput) {
        otpInput.addEventListener('input', async (e) => {
            const code = e.target.value;
            if (code.length === 6) {
                await verifyOTP(emailInput.value, code);
            }
        });
    }

    // Form submission
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
});

async function sendOTP(email) {
    const sendOtpBtn = document.getElementById('sendOtpBtn');
    const otpInput = document.getElementById('otpInput');
    const emailHint = document.getElementById('emailHint');

    try {
        sendOtpBtn.disabled = true;
        sendOtpBtn.textContent = 'Sending...';

        const res = await fetch('/api/auth/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                purpose: 'signup'
            })
        });

        const result = await res.json();

        if (res.ok) {
            // Enable OTP input
            otpInput.disabled = false;
            otpInput.focus();

            // Show success message
            emailHint.textContent = `✓ Verification code sent to ${email}`;
            emailHint.style.display = 'block';
            emailHint.style.color = '#28a745';

            // Update button
            sendOtpBtn.textContent = 'Resend OTP';
            sendOtpBtn.disabled = false;

            alert(`Verification code sent to ${email}! Please check your email.`);
        } else {
            alert(result.message || "Failed to send OTP");
            sendOtpBtn.textContent = 'Send OTP';
            sendOtpBtn.disabled = false;
        }
    } catch (error) {
        console.error("Send OTP Error:", error);
        alert("Server error. Please try again.");
        sendOtpBtn.textContent = 'Send OTP';
        sendOtpBtn.disabled = false;
    }
}

async function verifyOTP(email, code) {
    const otpInput = document.getElementById('otpInput');

    try {
        const res = await fetch('/api/auth/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, code })
        });

        const result = await res.json();

        if (res.ok) {
            otpVerified = true;
            verificationToken = result.verificationToken;

            // Visual feedback
            otpInput.style.borderColor = '#28a745';
            otpInput.style.backgroundColor = '#d4edda';
            otpInput.readOnly = true;

            // Show success message
            const successMsg = otpInput.nextElementSibling;
            successMsg.textContent = '✓ Email verified successfully!';
            successMsg.style.color = '#28a745';

            alert('Email verified successfully! You can now complete your registration.');
        } else {
            otpVerified = false;
            otpInput.style.borderColor = '#dc3545';
            otpInput.style.backgroundColor = '#f8d7da';

            const errorMsg = otpInput.nextElementSibling;
            errorMsg.textContent = '✗ ' + (result.message || 'Invalid OTP code');
            errorMsg.style.color = '#dc3545';

            alert(result.message || 'Invalid OTP code. Please try again.');
        }
    } catch (error) {
        console.error("Verify OTP Error:", error);
        alert("Failed to verify OTP. Please try again.");
    }
}

async function handleRegistration(event) {
    event.preventDefault();

    // Check if OTP is verified
    if (!otpVerified) {
        alert('Please verify your email with OTP first!');
        document.getElementById('otpInput').focus();
        return;
    }

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Password validation
    if (data.password !== data.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    if (data.password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
    }

    try {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating Account...';

        const res = await fetch('/api/auth/signup-with-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
                program: data.program,
                password: data.password,
                verificationToken: verificationToken
            })
        });

        const result = await res.json();

        if (res.ok) {
            alert("Account created successfully! Redirecting to dashboard...");
            // Redirect to learning portal with auto-login token
            window.location.href = `http://localhost:5173/login?token=${result.token}`;
        } else {
            alert(result.message || "Signup failed");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Create Account';
        }
    } catch (error) {
        console.error("Registration Error:", error);
        alert("Server error during registration.");
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
    }
}

async function loginUser(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const errorContainer = document.getElementById('loginError');

    // Reset error
    if (errorContainer) {
        errorContainer.style.display = 'none';
        errorContainer.textContent = '';
    }

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const result = await res.json();

        if (res.ok) {
            // Store JWT token and user data
            if (result.token) {
                localStorage.setItem('token', result.token);
            }
            localStorage.setItem('userId', result.userId);
            localStorage.setItem('userName', result.name);
            localStorage.setItem('userEmail', result.email);

            if (errorContainer) {
                errorContainer.style.display = 'block';
                errorContainer.style.color = '#155724';
                errorContainer.style.backgroundColor = '#d4edda';
                errorContainer.style.borderColor = '#c3e6cb';
                errorContainer.textContent = "Login successful! Redirecting to Learning Portal...";
            }

            // Redirect to Learning Portal with JWT token
            setTimeout(() => {
                window.location.href = `http://localhost:5173/login?token=${encodeURIComponent(result.token)}`;
            }, 800);
        } else {
            // Show error message
            const message = result.message || "Login failed";
            if (errorContainer) {
                errorContainer.style.display = 'block';
                errorContainer.style.color = '#721c24';
                errorContainer.style.backgroundColor = '#f8d7da';
                errorContainer.style.borderColor = '#f5c6cb';
                errorContainer.textContent = message;
            } else {
                alert(message);
            }
        }
    } catch (error) {
        console.error("Login Error:", error);
        if (errorContainer) {
            errorContainer.style.display = 'block';
            errorContainer.textContent = "Server error. Please try again.";
        } else {
            alert("Server error during login.");
        }
    }
}

// Bind events if elements exist
const loginForm = document.querySelector(".auth-form-wrapper form") || document.querySelector(".auth-container form");
if (loginForm) {
    loginForm.addEventListener("submit", loginUser);
}
