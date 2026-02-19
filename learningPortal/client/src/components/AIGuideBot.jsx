import { useEffect, useState } from 'react';
import { categoryDescriptions } from '../data/categoryDescriptions';
import './AIGuideBot.css';

export default function AIGuideBot({ activeCategory, onClose }) {
    const [isVisible, setIsVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        if (activeCategory) {
            setCurrentCategory(activeCategory);
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [activeCategory]);

    if (!activeCategory && !isVisible) return null;

    const categoryInfo = currentCategory ? categoryDescriptions[currentCategory] : null;

    return (
        <div className={`ai-guide-bot ${isVisible ? 'visible' : ''}`}>
            {/* Speech Bubble */}
            {categoryInfo && (
                <div className="speech-bubble">
                    <div className="speech-content">
                        <h4 className="speech-title">{categoryInfo.title}</h4>
                        <p className="speech-text">{categoryInfo.description}</p>
                    </div>
                    <div className="speech-arrow"></div>
                </div>
            )}

            {/* AI Mentor Bot SVG */}
            <div className="bot-avatar">
                <svg viewBox="0 0 100 100" className="bot-svg">
                    {/* Bot Head Circle */}
                    <circle cx="50" cy="50" r="35" fill="#8B1A1A" opacity="0.9" />

                    {/* Inner Circle */}
                    <circle cx="50" cy="50" r="28" fill="#fff" opacity="0.2" />

                    {/* AI Brain Pattern */}
                    <g className="brain-pattern">
                        <circle cx="40" cy="45" r="3" fill="#fff" opacity="0.6" />
                        <circle cx="50" cy="42" r="3" fill="#fff" opacity="0.6" />
                        <circle cx="60" cy="45" r="3" fill="#fff" opacity="0.6" />
                        <circle cx="45" cy="52" r="2.5" fill="#fff" opacity="0.6" />
                        <circle cx="55" cy="52" r="2.5" fill="#fff" opacity="0.6" />
                        <circle cx="50" cy="58" r="2" fill="#fff" opacity="0.6" />
                    </g>

                    {/* Academic Cap Line */}
                    <line x1="30" y1="35" x2="70" y2="35" stroke="#fff" strokeWidth="2" opacity="0.7" />

                    {/* Subtle Glow Effect */}
                    <circle cx="50" cy="50" r="37" fill="none" stroke="#8B1A1A" strokeWidth="1" opacity="0.3" className="bot-glow" />
                </svg>

                {/* Idle Animation Indicator */}
                <div className="bot-pulse"></div>
            </div>
        </div>
    );
}
