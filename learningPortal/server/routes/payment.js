import express from 'express';
import { authMiddleware } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Dummy Create Order
router.post('/create-order', authMiddleware, async (req, res) => {
    try {
        const { amount, courseId } = req.body;

        // In a real Razorpay implementation, you'd call razorpay.orders.create()
        // Here we just return a dummy order ID.
        const dummyOrderId = `order_${Math.random().toString(36).substring(2, 12)}`;

        res.json({
            id: dummyOrderId,
            amount: amount,
            currency: 'INR',
            courseId: courseId,
            message: 'Dummy order created successfully'
        });
    } catch (error) {
        console.error('Create Order Error:', error);
        res.status(500).json({ error: 'Failed to create payment order' });
    }
});

// Dummy Verify Payment
router.post('/verify', authMiddleware, async (req, res) => {
    try {
        const { orderId, paymentId, signature } = req.body;
        const PAYMENT_MODE = process.env.PAYMENT_MODE || 'DUMMY';

        if (PAYMENT_MODE === 'DUMMY') {
            // Simulate successful verification
            const user = await User.findById(req.userId);
            if (!user) return res.status(404).json({ error: 'User not found' });

            user.isPremium = true;
            user.premiumActivatedAt = new Date();
            await user.save();

            return res.json({
                success: true,
                message: 'Dummy payment verified. Account upgraded to Premium!',
                isPremium: user.isPremium
            });
        }

        if (PAYMENT_MODE === 'LIVE') {
            // Placeholder for real Razorpay signature verification logic
            // const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
            // ... logic to verify ...
            return res.status(501).json({ error: 'Live payment verification not implemented yet' });
        }

        res.status(400).json({ error: 'Invalid payment mode' });
    } catch (error) {
        console.error('Verify Payment Error:', error);
        res.status(500).json({ error: 'Payment verification failed' });
    }
});

export default router;
