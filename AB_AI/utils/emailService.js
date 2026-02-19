const nodemailer = require('nodemailer');
require('dotenv').config();

/**
 * Create email transporter
 * Using Gmail SMTP for production email delivery
 */
const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });
};

/**
 * Send OTP email for signup verification
 */
async function sendSignupOTP(email, otp, name = 'User') {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"AstroBharat AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Verify Your Email - AstroBharat AI',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #FFF5E6 0%, #FFE8D1 100%);">
                <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #8B0000; margin: 0; font-size: 28px;">🌟 AstroBharat AI</h1>
                        <p style="color: #666; margin-top: 10px;">Complete Your Registration</p>
                    </div>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        Hello <strong>${name}</strong>,
                    </p>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        Thank you for joining AstroBharat AI! To complete your registration, please verify your email address using the OTP code below:
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #8B0000, #a52a2a); color: white; padding: 20px 40px; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 8px;">
                            ${otp}
                        </div>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; line-height: 1.6; text-align: center;">
                        This code will expire in <strong>5 minutes</strong>
                    </p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #FFE8D1;">
                        <p style="color: #999; font-size: 12px; line-height: 1.6;">
                            If you did not request this verification code, please ignore this email.
                        </p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Signup OTP sent to:', email);
        console.log('📧 Message ID:', info.messageId);

        return {
            success: true,
            messageId: info.messageId
        };
    } catch (error) {
        console.error('❌ Error sending signup OTP:', error.message);
        throw new Error('Failed to send verification email');
    }
}

/**
 * Send OTP email for password reset
 */
async function sendResetOTP(email, otp, name = 'User') {
    const transporter = createTransporter();

    const mailOptions = {
        from: `"AstroBharat AI" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Password - AstroBharat AI',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #FFF5E6 0%, #FFE8D1 100%);">
                <div style="background: white; border-radius: 15px; padding: 30px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #8B0000; margin: 0; font-size: 28px;">🔐 AstroBharat AI</h1>
                        <p style="color: #666; margin-top: 10px;">Password Reset Request</p>
                    </div>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        Hello <strong>${name}</strong>,
                    </p>
                    
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        We received a request to reset your password. Use the OTP code below to proceed:
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <div style="display: inline-block; background: linear-gradient(135deg, #8B0000, #a52a2a); color: white; padding: 20px 40px; border-radius: 10px; font-size: 32px; font-weight: bold; letter-spacing: 8px;">
                            ${otp}
                        </div>
                    </div>
                    
                    <p style="color: #666; font-size: 14px; line-height: 1.6; text-align: center;">
                        This code will expire in <strong>5 minutes</strong>
                    </p>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #FFE8D1;">
                        <p style="color: #999; font-size: 12px; line-height: 1.6;">
                            If you did not request a password reset, please ignore this email or contact support if you have concerns.
                        </p>
                    </div>
                </div>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Reset OTP sent to:', email);
        console.log('📧 Message ID:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending reset OTP:', error.message);
        throw new Error('Failed to send password reset email');
    }
}

module.exports = {
    sendSignupOTP,
    sendResetOTP
};
