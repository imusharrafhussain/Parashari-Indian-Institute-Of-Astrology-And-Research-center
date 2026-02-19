# Cloudflare Worker Deployment Guide

## Overview

This Cloudflare Worker generates signed URLs for R2 bucket objects. It's a stateless service that accepts R2 paths and returns time-limited signed URLs.

## Prerequisites

1. **Cloudflare Account** with Workers enabled
2. **R2 Storage** enabled in your account
3. **R2 Bucket** created (e.g., `astrobharat-videos`)
4. **Wrangler CLI** installed globally

## Installation

### 1. Install Wrangler CLI

```bash
npm install -g wrangler
```

### 2. Login to Cloudflare

```bash
wrangler login
```

This will open your browser to authenticate.

### 3. Configure wrangler.toml

Update `wrangler.toml` with your actual R2 bucket name:

```toml
[[r2_buckets]]
binding = "VIDEO_BUCKET"
bucket_name = "your-actual-bucket-name"  # Change this!
```

### 4. Set API Key (Optional but Recommended)

To secure the Worker endpoint, set an API key:

```bash
wrangler secret put WORKER_API_KEY
```

Enter a secure random key when prompted. This prevents unauthorized access to your Worker.

## Deployment

### Deploy to Production

```bash
wrangler deploy
```

After deployment, Wrangler will show you the Worker URL:
```
Published video-url-signer (X.XX sec)
  https://video-url-signer.<your-subdomain>.workers.dev
```

Save this URL - you'll need it for the backend `.env` file.

### Deploy to Development

For testing:

```bash
wrangler dev
```

This starts a local development server.

## Testing

### Test with curl

```bash
curl -X POST https://video-url-signer.<your-subdomain>.workers.dev \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key-here" \
  -d '{
    "r2Path": "courses/test/module1/video1/index.m3u8",
    "expiryMinutes": 60
  }'
```

Expected response:
```json
{
  "signedUrl": "https://...",
  "expiresAt": "2024-01-30T12:00:00.000Z"
}
```

## Environment Variables

After deployment, update your backend `.env` file:

```env
CLOUDFLARE_WORKER_URL=https://video-url-signer.<your-subdomain>.workers.dev
WORKER_API_KEY=your-secure-api-key-here
```

## R2 Bucket Setup

### 1. Create R2 Bucket

Go to Cloudflare Dashboard → R2 → Create Bucket
- Name: `astrobharat-videos` (or your preferred name)
- Location: Choose closest to your users

### 2. Upload Videos

Videos must be in HLS format:
```
courses/
  ├── {courseId}/
  │   ├── {moduleId}/
  │   │   ├── {videoId}/
  │   │   │   ├── index.m3u8  (master playlist)
  │   │   │   ├── 720p.m3u8
  │   │   │   ├── 480p.m3u8
  │   │   │   ├── segment-001.ts
  │   │   │   ├── segment-002.ts
  │   │   │   └── ...
```

### 3. Enable Public Access for CDN (Optional)

R2 buckets are private by default. The signed URLs will handle access control, so you don't need to make the bucket public.

## Transcoding Videos to HLS

Use FFmpeg to convert MP4 to HLS:

```bash
ffmpeg -i input.mp4 \
  -codec: copy \
  -start_number 0 \
  -hls_time 10 \
  -hls_list_size 0 \
  -f hls \
  output.m3u8
```

For adaptive bitrate streaming (recommended):

```bash
ffmpeg -i input.mp4 \
  -filter_complex \
  "[0:v]split=2[v1][v2]; \
   [v1]scale=w=1280:h=720[720p]; \
   [v2]scale=w=854:h=480[480p]" \
  -map "[720p]" -map "[480p]" -map 0:a \
  -c:v libx264 -c:a aac \
  -var_stream_map "v:0,a:0 v:1,a:1" \
  -master_pl_name index.m3u8 \
  -f hls -hls_time 10 -hls_list_size 0 \
  -hls_segment_filename "segment-%03d.ts" \
  output_%v.m3u8
```

## Troubleshooting

### Worker Returns 500 Error

- Check R2 bucket binding in `wrangler.toml`
- Ensure bucket name matches your actual R2 bucket
- Verify R2 path exists in bucket

### "Unauthorized" Error

- Check `X-API-Key` header matches Worker secret
- If not using API key, remove the check from `video-signer.js`

### CORS Errors

- Worker already includes CORS headers
- Check if frontend is sending correct Content-Type header

## Security Notes

1. **Never** expose this Worker URL publicly without API key
2. **Always** use HTTPS
3. **Set** reasonable expiry times (60 min for videos, 30 min for documents)
4. **Monitor** Worker usage to detect abuse
5. **Rotate** API keys periodically

## Monitoring

View Worker analytics:
```bash
wrangler tail
```

Or visit Cloudflare Dashboard → Workers → video-url-signer → Metrics

## Costs

- Workers: First 100,000 requests/day are free
- R2 Storage: $0.015/GB/month
- R2 Class A Operations (uploads): $4.50 per million
- R2 Class B Operations (downloads): $0.36 per million

Egress from R2 to internet: **FREE** (major cost savings!)

## Updating the Worker

After making code changes:

```bash
wrangler deploy
```

No downtime - Workers deploy instantly.
