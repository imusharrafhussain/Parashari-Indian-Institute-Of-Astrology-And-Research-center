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
            const desktopWidth = 1600;
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
                    marginBottom: `-${450 * (1 - scaleFactor)}px`
                }}
            >
                <footer className="portal-footer">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>About Parashari</h4>
                            <p>Preserving and promoting authentic Vedic wisdom since 1998.</p>
                            <ul className="social-wrapper">
                                <li className="icon facebook">
                                    <span className="tooltip">Facebook</span>
                                    <a href="#" aria-label="Facebook">
                                        <svg viewBox="0 0 320 512" className="social-icon-svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                                    </a>
                                </li>
                                <li className="icon twitter">
                                    <span className="tooltip">Twitter</span>
                                    <a href="#" aria-label="Twitter">
                                        <svg viewBox="0 0 512 512" className="social-icon-svg"><path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.792 29.89 12.667 46.791 13.317-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" /></svg>
                                    </a>
                                </li>
                                <li className="icon instagram">
                                    <span className="tooltip">Instagram</span>
                                    <a href="#" aria-label="Instagram">
                                        <svg viewBox="0 0 448 512" className="social-icon-svg"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                                    </a>
                                </li>
                                <li className="icon youtube">
                                    <span className="tooltip">YouTube</span>
                                    <a href="#" aria-label="YouTube">
                                        <svg viewBox="0 0 576 512" className="social-icon-svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.781 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
                                    </a>
                                </li>
                                <li className="icon linkedin">
                                    <span className="tooltip">LinkedIn</span>
                                    <a href="#" aria-label="LinkedIn">
                                        <svg viewBox="0 0 448 512" className="social-icon-svg"><path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul className="footer-links">
                                <li><a href={`${externalSiteRoot}/index.html`}>Home</a></li>
                                <li><a href={`${externalSiteRoot}/profile.html`}>About Us</a></li>
                                <li><a href={`${externalSiteRoot}/courses.html`}>All Courses</a></li>
                                <li><a href={`${externalSiteRoot}/contact.html`}>Contact Us</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Programs</h4>
                            <ul className="footer-links">
                                <li><a href="#">Free courses</a></li>
                                <li><a href="#">Intro courses</a></li>
                                <li><a href="#">Diploma</a></li>
                                <li><a href="#">Bachelor Degree</a></li>
                                <li><a href="#">Master Degree</a></li>
                                <li><a href="#">Grand Master (Phd)</a></li>
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
                            <div className="developer-credit">Designed and developed by : Musharraf Hussain</div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
