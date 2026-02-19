/**
 * SECURE MEDIA GATEKEEPER (Cloudflare Worker)
 * Enforces HMAC-SHA256 Signature Verification
 */

export default {
    async fetch(request, env) {
        // 1. CORS Configuration (Strict - Frontend Only)
        // Adjust these origins to match your actual production domains
        const ALLOWED_ORIGINS = [
            "http://localhost:5173",
            "http://localhost:3000",
            env.CLIENT_URL // Allow dynamic config from secrets
        ];

        const origin = request.headers.get("Origin");
        const corsHeaders = {
            "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization, Range",
            "Access-Control-Max-Age": "86400",
        };

        if (ALLOWED_ORIGINS.includes(origin)) {
            corsHeaders["Access-Control-Allow-Origin"] = origin;
            corsHeaders["Vary"] = "Origin";
        }

        // Handle CORS Preflight
        if (request.method === "OPTIONS") {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // 2. Parse Request & Validation
            const url = new URL(request.url);

            // Normalize Method
            const method = request.method.toUpperCase() === 'HEAD' ? 'GET' : request.method.toUpperCase();

            // 🔥 THIS IS THE REAL FILE PATH from URL Pathname
            let requestedPath = url.pathname.replace(/^\/+/, "").replace(/\/{2,}/g, "/");

            if (!requestedPath) {
                return new Response("Missing path", { status: 400, headers: corsHeaders });
            }

            // Safe Decode
            try {
                requestedPath = decodeURIComponent(requestedPath);
            } catch (e) {
                console.error("Path decode failed:", e);
                return new Response("Invalid Path Encoding", { status: 400, headers: corsHeaders });
            }

            // 3. Extract Security Params
            const signature = url.searchParams.get('sig');
            const expiresAt = url.searchParams.get('expires');
            const userId = url.searchParams.get('user');
            const courseId = url.searchParams.get('course') || '';
            const contentId = url.searchParams.get('content') || '';
            // Decode signedPrefix safely
            const signedPrefix = decodeURIComponent(url.searchParams.get('signedPrefix') || "");

            // 4. Security Checks - Params & Prefix
            if (!signature || !expiresAt || !userId || !signedPrefix) {
                console.error("Missing params:", { signature, expiresAt, userId, signedPrefix });
                return new Response("Forbidden: Missing Security Parameters", { status: 403, headers: corsHeaders });
            }

            // Path Enforcement (Must happen before expensive crypto)
            if (!requestedPath.startsWith(signedPrefix)) {
                console.error("Path Traversal Attempt:", { requestedPath, signedPrefix });
                return new Response("Forbidden: Path Traversal", { status: 403, headers: corsHeaders });
            }

            // 5. Expiry Check
            const expiryTime = Number(expiresAt);
            if (isNaN(expiryTime) || Date.now() >= expiryTime) {
                console.error("Expired link:", { now: Date.now(), expiryTime });
                return new Response("Forbidden: Link Expired", { status: 403, headers: corsHeaders });
            }

            // 6. Signature Verification
            const payload = [
                method,
                signedPrefix,
                userId,
                courseId,
                contentId,
                expiresAt
            ].join('\n');

            const encoder = new TextEncoder();
            const keyData = encoder.encode(env.VIDEO_SIGNING_SECRET);
            const key = await crypto.subtle.importKey(
                "raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["verify"]
            );

            if (!signature.match(/^[0-9a-fA-F]{64}$/)) {
                return new Response("Forbidden: Invalid Signature Format", { status: 403, headers: corsHeaders });
            }
            const signatureBytes = new Uint8Array(signature.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

            const isValid = await crypto.subtle.verify(
                "HMAC", key, signatureBytes, encoder.encode(payload)
            );

            if (!isValid) {
                console.error("Sig Mismatch for Prefix:", signedPrefix);
                return new Response("Forbidden: Invalid Signature", { status: 403, headers: corsHeaders });
            }

            // 7. Fetch from R2
            const object = await env.VIDEO_BUCKET.get(requestedPath, {
                range: request.headers,
                onlyIf: request.headers,
            });

            if (!object) {
                return new Response("File not found", { status: 404, headers: corsHeaders });
            }

            // 8. Headers
            const headers = new Headers();
            object.writeHttpMetadata(headers);
            headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
            headers.set("Pragma", "no-cache");
            headers.set("Expires", "0");
            Object.keys(corsHeaders).forEach(k => headers.set(k, corsHeaders[k]));

            if (requestedPath.endsWith('.m3u8')) headers.set("Content-Type", "application/vnd.apple.mpegurl");
            else if (requestedPath.endsWith('.ts')) headers.set("Content-Type", "video/mp2t");
            else if (requestedPath.endsWith('.mp4')) headers.set("Content-Type", "video/mp4");


            // 9. HLS Rewrite
            if (requestedPath.endsWith('.m3u8')) {
                console.log("RETURNING REWRITTEN PLAYLIST");
                let playlist = await object.text();
                const query = url.search;
                // Regex: Find lines ending in .ts and append query
                playlist = playlist.replace(
                    /^([^#][^\r\n]+\.ts)(\?.*)?$/gm,
                    (_, file) => `${file.trim()}${query}`
                );
                return new Response(playlist, { headers, status: 200 });
            }

            return new Response(object.body, {
                headers,
                status: object.body ? (request.headers.get("Range") ? 206 : 200) : 304,
            });

        } catch (err) {
            console.error("WORKER RUNTIME ERROR:", err.stack);
            // Fail safe -> 500 (or 403 if prefer to mask errors in prod, but 500 helps debugging now)
            // User requested conversion to 403 for security.
            return new Response("Forbidden (Internal Error)", { status: 403, headers: corsHeaders });
        }
    },
};
