import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Login() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = params.get("token");

        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        // Save token FIRST
        localStorage.setItem("token", token);

        // Set explicit entry flag for StrictProtectedRoute
        sessionStorage.setItem('ab_ai_entry', 'true');

        // Redirect AFTER saving
        navigate("/dashboard", { replace: true });
    }, [navigate, params]);

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            Logging you in…
        </div>
    );
}
