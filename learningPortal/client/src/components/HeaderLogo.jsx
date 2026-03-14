
import '../styles/HeaderLogo.css';

export default function HeaderLogo() {
    return (
        <div className="brand-header-container">
            <img
                src={`${import.meta.env.BASE_URL}parashari-header-logo.png`}
                alt="Parashari Indian Institute of Astrology and Research Centre"
                className="brand-header-logo"
            />
        </div>
    );
}
