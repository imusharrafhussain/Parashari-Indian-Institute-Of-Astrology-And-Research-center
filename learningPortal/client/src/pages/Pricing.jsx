import React from 'react';
import PricingCard from '../components/PricingCard';
import '../styles/Pricing.css';

const Pricing = () => {
    const pricingData = [
        {
            title: "Beginner",
            price: "4,999",
            description: "Perfect for those starting their journey into the world of Vedic Astrology.",
            features: ["Intro to Planets", "Basic Chart Reading", "Zodiac Fundamentals", "Standard Support"],
            isPopular: false
        },
        {
            title: "Foundation",
            price: "9,999",
            description: "Deepen your knowledge with core principles and predictive techniques.",
            features: ["Nakshatra Study", "Dasha Systems", "Transits Explained", "Q&A Sessions"],
            isPopular: false
        },
        {
            title: "Master",
            price: "19,999",
            description: "Advanced concepts for becoming a professional astrological consultant.",
            features: ["Advanced Prediction", "Varshphal Mastery", "Medical Astrology", "Priority Support"],
            isPopular: true
        },
        {
            title: "PhD",
            price: "34,999",
            description: "The ultimate level of scholarly expertise and research-based learning.",
            features: ["Research Methods", "Nadi Astrology", "Remedial Measures", "Lifetime Access"],
            isPopular: false
        },
        {
            title: "Crash Course",
            price: "2,499",
            description: "Quick-start guide to the essentials of practical astrology applications.",
            features: ["Fast-Track Learning", "Hands-on Workshop", "Essential Cheat-sheets", "Digital Certificate"],
            isPopular: false
        }
    ];

    return (
        <main className="pricing-page-container">
            <div className="pricing-header">
                <h1>Pricing in each categories</h1>
                <div className="underline"></div>
            </div>

            <div className="pricing-grid">
                {pricingData.map((pkg, index) => (
                    <PricingCard key={index} {...pkg} />
                ))}
            </div>
        </main>
    );
};

export default Pricing;
