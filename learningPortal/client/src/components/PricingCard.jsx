import React from 'react';
import '../styles/Pricing.css';

const PricingCard = ({ title, price, description, features, isPopular, buttonText }) => {
    return (
        <div className={`pricing-card ${isPopular ? 'popular' : ''}`}>
            <div className="pricing-card-inner">
                {isPopular && (
                    <div className="popular-badge">
                        <span>MOST POPULAR</span>
                        <span className="star-icon">✨</span>
                    </div>
                )}

                <h3 className="card-title">{title}</h3>

                <div className="card-price">
                    <span className="price-amount">₹{price}</span>
                    <span className="price-period">/ course</span>
                </div>

                <p className="card-description">{description}</p>

                <button className="buy-button">{buttonText || "Enroll Now"}</button>

                <div className="features-divider">
                    <span>FEATURES</span>
                </div>

                <ul className="features-list">
                    {features.map((feature, index) => (
                        <li key={index} className="feature-item">
                            <span className="check-icon">
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 6L9 17L4 12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                            </span>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PricingCard;
