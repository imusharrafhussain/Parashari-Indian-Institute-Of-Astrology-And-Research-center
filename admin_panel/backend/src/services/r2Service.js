import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize S3 client for Cloudflare R2
const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    }
});

/**
 * Generate pre-signed upload URL for admin
 * Admin uploads directly to R2 using this URL
 */
export async function generateUploadUrl({ r2Path, fileType, expiresIn = 900 }) {
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: r2Path,
        ContentType: fileType,
        Metadata: {
            uploadedAt: new Date().toISOString()
        }
    });

    // 15 minute expiry for uploads
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return uploadUrl;
}

/**
 * Generate signed download URL for students
 * Short-lived URLs with enrollment verification
 */
export async function generateSignedUrl({ r2Path, expiresIn = 3600 }) {
    const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: r2Path,
        ResponseContentDisposition: 'inline', // Force streaming, not download
        ResponseCacheControl: 'no-cache, no-store, must-revalidate'
    });

    // 1 hour expiry for viewing
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
    return signedUrl;
}

/**
 * Delete object from R2
 */
export async function deleteFromR2(r2Path) {
    const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: r2Path
    });

    await s3Client.send(command);
    return true;
}

/**
 * Check if object exists in R2
 */
export async function checkR2ObjectExists(r2Path) {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: r2Path
        });
        await s3Client.send(command);
        return true;
    } catch (error) {
        if (error.name === 'NoSuchKey') {
            return false;
        }
        throw error;
    }
}
