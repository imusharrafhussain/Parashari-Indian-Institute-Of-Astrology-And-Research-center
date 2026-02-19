/**
 * Cloudflare Worker Client (Proxy Mode)
 * Constructs URLs for the Cloudflare Worker which now acts as a direct proxy to R2.
 */

const WORKER_URL = process.env.CLOUDFLARE_WORKER_URL;

/**
 * Generate a Public Proxy URL
 * @param {string} r2Path - R2 object path (e.g., 'courses/123/module1/video1/index.m3u8')
 * @returns {Object} - { signedUrl, expiresAt } (Structure kept for compatibility)
 */
import crypto from 'crypto';

/**
 * Generate a Signed Access URL for Cloudflare Worker
 * 
 * Implements strict Canonical Signing:
 * Signature = HMAC-SHA256(
 *   HTTP_METHOD + "\n" +
 *   r2Path + "\n" +
 *   userId + "\n" +
 *   courseId + "\n" +
 *   contentId + "\n" +
 *   expiresAt
 * )
 */
export async function getSignedUrl({
    r2Path, // The specific file (e.g., courses/intro/index.m3u8)
    userId,
    courseId = '',
    contentId = '',
    method = 'GET',
    expiresInSeconds = 300 // Default 5 mins
}) {
    const workerUrl = process.env.CLOUDFLARE_WORKER_URL;
    const secret = process.env.VIDEO_SIGNING_SECRET;

    if (!workerUrl || !secret) {
        console.error('❌ Missing media configuration (URL or SECRET) in .env');
        throw new Error('Media service configuration missing');
    }

    // 1. Normalize Path (File)
    let normalizedPath = r2Path
        .replace(/^\/+/, '')
        .replace(/\/+/g, '/')
        .replace(/\.\./g, '');

    // 2. Derive Signed Prefix (Directory)
    // HLS Logic: We sign the directory so all segments (.ts) are covered
    const lastSlash = normalizedPath.lastIndexOf('/');
    const signedPrefix = lastSlash !== -1
        ? normalizedPath.substring(0, lastSlash + 1) // "courses/intro/"
        : normalizedPath + '/'; // Fallback

    // 3. Set Expiry
    const expiresAt = Date.now() + (expiresInSeconds * 1000);

    // 4. Construct Canonical Payload (using PREFIX)
    const payload = [
        method.toUpperCase(),
        signedPrefix,      // <--- Signing the Directory
        userId.toString(),
        courseId.toString(),
        contentId.toString(),
        expiresAt.toString()
    ].join('\n');

    // 5. Generate Signature
    const signature = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    // 6. Build URL (Targeting the File, but carrying prefix auth)
    const url = new URL(`${workerUrl}/${normalizedPath}`);
    url.searchParams.set('user', userId);
    url.searchParams.set('course', courseId);
    url.searchParams.set('content', contentId);
    url.searchParams.set('expires', expiresAt);
    url.searchParams.set('signedPrefix', signedPrefix); // Exact param Worker needs
    url.searchParams.set('sig', signature);

    return {
        signedUrl: url.toString(),
        expiresAt: new Date(expiresAt).toISOString()
    };
}

