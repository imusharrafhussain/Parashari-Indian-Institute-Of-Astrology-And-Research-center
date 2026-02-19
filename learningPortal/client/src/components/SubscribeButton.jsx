import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Subscribe.css';

export default function SubscribeButton({ onSuccess, customText }) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubscribe = async () => {
        try {
            setLoading(true);

            // Step 1: Create subscription on backend
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/create-subscription`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.id })
            });

            const data = await response.json();

            if (!response.ok) {
                // Check if it's the specific "keys missing" error or similar
                if (response.status === 500 || data.error) {
                    alert('⚠️ Payment System Not Configured Yet\n\nSince Razorpay keys are missing (Video KYC pending), please use the manual activation method.\n\nRead "TEST_WITHOUT_RAZORPAY.md" for the simple 1-step activation code!');
                    return;
                }
                throw new Error(data.error || 'Failed to create subscription');
            }

            // Step 2: Open Razorpay Checkout (Only if keys exist)
            const options = {
                key: data.keyId,
                // ... rest of options
                subscription_id: data.subscriptionId,
                name: 'Parashari Institute',
                description: 'Premium Course Access',
                image: '/logo.png', // Your logo
                handler: async function (response) {
                    // Step 3: Verify payment on backend
                    const verifyResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/verify-payment`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_subscription_id: response.razorpay_subscription_id,
                            razorpay_signature: response.razorpay_signature,
                            userId: user.id
                        })
                    });

                    const verifyData = await verifyResponse.json();

                    if (verifyData.success) {
                        alert('Subscription activated! 🎉');
                        if (onSuccess) onSuccess();
                        window.location.reload();
                    } else {
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email
                },
                theme: {
                    color: '#8B0000'
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error('Subscription error:', error);
            alert('Failed to initiate subscription. Please try again.');
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleSubscribe}
            disabled={loading}
            className="btn-subscribe"
        >
            {loading ? 'Opening payment...' : (customText || 'Subscribe Now - ₹499/month')}
        </button>
    );
}
