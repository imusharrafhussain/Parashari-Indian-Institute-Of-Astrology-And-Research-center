import React from 'react';
import PricingCard from '../components/PricingCard';
import '../styles/Pricing.css';

// Import assets for Spiritual Stairs
import yantraImg from '../assets/pricing/yantra.png';
import mantraImg from '../assets/pricing/mantra.png';
import tantraImg from '../assets/pricing/tantra.png';
import chakraImg from '../assets/pricing/chakra.png';
import remediesImg from '../assets/pricing/remedies.png';
import regressionImg from '../assets/pricing/regression.png';

const Pricing = () => {
    const courseCategories = [
        {
            title: "Crash Course",
            price: "2,499",
            description: "Perfect for those starting their journey into the world of Vedic Astrology.",
            features: [],
            isPopular: false
        },
        {
            title: "Diploma",
            price: "4,199",
            description: "Deepen your knowledge with core principles and predictive techniques.",
            features: [],
            isPopular: false
        },
        {
            title: "Bachelor",
            price: "8,999",
            description: "Advanced concepts for becoming a professional astrological consultant.",
            features: [],
            isPopular: true
        },
        {
            title: "Master",
            price: "18,699",
            description: "The ultimate level of scholarly expertise and research-based learning.",
            features: [],
            isPopular: false
        },
        {
            title: "Grand Master",
            price: "24,999",
            description: "Quick-start guide to the essentials of practical astrology applications.",
            features: [],
            isPopular: false
        }
    ];

    const spiritualStairs = [
        {
            title: "Yantra",
            price: "2,999",
            originalPrice: "3,999",
            description: "Master sacred geometrical diagrams used for worship, meditation, and balancing cosmic energies.",
            features: ["6 Stairs", "Certification"],
            image: yantraImg,
            badge: "25% DISCOUNT",
            buttonText: "LEARN MORE"
        },
        {
            title: "Mantra",
            price: "2,999",
            originalPrice: "3,999",
            description: "Learn the science of sacred sounds and vibrations to manifest desires and achieve spiritual elevation.",
            features: ["6 Stairs", "Certification"],
            image: mantraImg,
            badge: "25% DISCOUNT",
            buttonText: "LEARN MORE"
        },
        {
            title: "Tantra",
            price: "2,999",
            originalPrice: "3,999",
            description: "Explore the ancient esoteric practices for expanding consciousness and channeling divine energy.",
            features: ["6 Stairs", "Certification"],
            image: tantraImg,
            badge: "25% DISCOUNT",
            buttonText: "LEARN MORE"
        },
        {
            title: "Chakra Balancing",
            price: "2,999",
            originalPrice: "3,999",
            description: "Understand the 7 vital energy centers of the body and techniques to cleanse and align them.",
            features: ["6 Stairs", "Certification"],
            image: chakraImg,
            badge: "25% DISCOUNT",
            buttonText: "LEARN MORE"
        },
        {
            title: "Remedies",
            price: "2,999",
            originalPrice: "3,999",
            description: "Discover practical astrological and spiritual remedies (Upay) for solving complex life problems.",
            features: ["6 Stairs", "Certification"],
            image: remediesImg,
            badge: "25% DISCOUNT",
            buttonText: "LEARN MORE"
        },
        {
            title: "Past Life Regression Theory",
            price: "2,999",
            originalPrice: "3,999",
            description: "Delve into the science of past lives to heal present traumas and uncover karmic patterns.",
            features: ["6 Stairs", "Certification"],
            image: regressionImg,
            badge: "25% DISCOUNT",
            buttonText: "LEARN MORE"
        }
    ];

    return (
        <main className="pricing-page-container">
            <section className="pricing-section">
                <div className="pricing-header">
                    <h1>Pricing in each Course Categories</h1>
                    <div className="underline"></div>
                </div>

                <div className="pricing-grid">
                    {courseCategories.map((pkg, index) => (
                        <PricingCard key={index} {...pkg} />
                    ))}
                </div>
            </section>

            <section className="pricing-section spiritual-section">
                <div className="pricing-header">
                    <h1>Pricing in each 6 Spiritual Stairs</h1>
                    <div className="underline"></div>
                </div>

                <div className="pricing-grid stairs-grid">
                    {spiritualStairs.map((pkg, index) => (
                        <PricingCard key={index} {...pkg} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Pricing;
