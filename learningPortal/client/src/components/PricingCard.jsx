import React from 'react';
import '../styles/Pricing.css';

const PricingCard = ({ title, price, originalPrice, description, features, isPopular, buttonText, image, badge }) => {
    return (
        <div className={`pricing-card ${isPopular ? 'popular' : ''} ${image ? 'has-image' : ''}`}>
            <div className="pricing-card-inner">
                {badge && <div className="discount-badge">{badge}</div>}
                
                {isPopular && !image && (
                    <div className="popular-badge">
                        <span>MOST POPULAR</span>
                        <span className="star-icon">✨</span>
                    </div>
                )}

                {image && (
                    <div className="card-image-wrapper">
                        <img src={image} alt={title} className="card-image" />
                    </div>
                )}

                <div className="card-content">
                    <h3 className="card-title">{title}</h3>

                    <div className="card-price">
                        {originalPrice && (
                            <span className="original-price">₹{originalPrice}</span>
                        )}
                        <span className="price-amount">₹{price}</span>
                        {!image && <span className="price-period">/ course</span>}
                    </div>

                    <p className="card-description">{description}</p>

                    <button className="buy-button">{buttonText || "Enroll Now"}</button>

                    {features && features.length > 0 && (
                        <>
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
