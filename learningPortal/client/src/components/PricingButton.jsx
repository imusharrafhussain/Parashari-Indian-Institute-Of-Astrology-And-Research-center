import React from 'react';
import '../styles/PricingButton.css';

const PricingButton = () => {
    const handlePricingClick = () => {
        alert('Pricing plans coming soon!');
    };

    return (
        <div className="pricing-btn-wrapper">
            <button className="pricing-btn" onClick={handlePricingClick}>
                Pricing
            </button>
        </div>
    );
};

export default PricingButton;
