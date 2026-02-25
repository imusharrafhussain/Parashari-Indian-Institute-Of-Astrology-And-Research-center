import React, { useState, useEffect } from 'react';
import '../styles/Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [scaleFactor, setScaleFactor] = useState(1);

    // Dynamically calculate the scale factor for the rigid 1200px container
    // to perfectly fit smaller screens without wrapping.
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            const desktopWidth = 1200;
            if (screenWidth < desktopWidth) {
                setScaleFactor(screenWidth / desktopWidth);
            } else {
                setScaleFactor(1);
            }
        };

        // Initial call
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Determine actual height taken up by the scaled footer to push the page up properly
    // Since transform: scale() leaves empty space behind, we dynamically adjust the height.
    // We use a React ref or a fixed presumed height, but let's use a simpler zoom padding trick.

    const externalSiteRoot = import.meta.env.VITE_AB_AI_PRODUCTION_URL || 'http://localhost:3000';

    return (
        <div className="footer-scaler-outer">
            <div
                className="footer-inner-content"
                style={{
                    transform: `scale(${scaleFactor})`,
                    transformOrigin: 'top center',
                    // To prevent huge white space below when scaled down, we adjust margin-bottom programmatically
                    // Actual height = originalHeight * scaleFactor. We compensate the difference.
                    // Since we don't know the exact px height, 400px is typical for this footer.
                    marginBottom: `-${400 * (1 - scaleFactor)}px`
                }}
            >
                <footer className="portal-footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>About Parashari</h4>
                            <p>Preserving and promoting authentic Vedic wisdom since 1998.</p>
                            <div className="social-links">
                                {/* We use external links for socials */}
                                <a href="#" className="social-link" title="Visit our Facebook"><i className="fab fa-facebook-f">f</i></a>
                                <a href="#" className="social-link" title="Visit our Twitter"><i className="fab fa-twitter">t</i></a>
                                <a href="#" className="social-link" title="Visit our Instagram"><i className="fab fa-instagram">ig</i></a>
                                <a href="#" className="social-link" title="Visit our YouTube"><i className="fab fa-youtube">y</i></a>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href={`${externalSiteRoot}/index.html`}>Home</a></li>
                                <li><a href={`${externalSiteRoot}/profile.html`}>About</a></li>
                                <li><a href={`${externalSiteRoot}/courses.html`}>Courses</a></li>
                                <li><a href={`${externalSiteRoot}/contact.html`}>Contact</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Programs</h4>
                            <ul className="footer-links">
                                <li><a href={`${externalSiteRoot}/astrology.html`}>Astrology</a></li>
                                <li><a href={`${externalSiteRoot}/palmistry.html`}>Palmistry</a></li>
                                <li><a href={`${externalSiteRoot}/vastu.html`}>Vastu</a></li>
                                <li><a href={`${externalSiteRoot}/fee-structure.html`}>Fee Structure</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Contact</h4>
                            <div className="contact-info">
                                <div className="contact-icon">📍</div>
                                <div className="contact-text">
                                    <p className="p-reset">123 Vedic Street, Delhi</p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="contact-icon">📞</div>
                                <div className="contact-text">
                                    <p className="p-reset"><a href="tel:+919999999999">+91 9999-999-999</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-content">
                            <div className="copyright">
                                <p className="p-reset">&copy; 2024 Parashari Institute.</p>
                            </div>
                            <div className="developer-credit">Designed by <a href="#">Our Team</a></div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
