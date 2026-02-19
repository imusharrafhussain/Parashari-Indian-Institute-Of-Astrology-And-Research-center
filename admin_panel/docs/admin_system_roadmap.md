# Learning Portal Admin System - Complete Roadmap

## Executive Summary

A secure, role-based admin panel for managing all Learning Portal content with Cloudflare R2 integration for media storage and delivery.

---

## 1. Database Schema Design

### 1.1 Enhanced User Model (Admin Roles)

```javascript
// User.js (Enhanced)
{
  email: String,
  password: String (hashed),
  name: String,
  role: {
    type: String,
    enum: ['student', 'admin', 'super-admin'],
    default: 'student'
  },
  permissions: [{
    type: String,
    enum: ['courses.create', 'courses.edit', 'courses.delete', 
           'content.upload', 'users.manage', 'settings.manage']
  }],
  createdAt: Date,
  lastLogin: Date,
  isActive: Boolean
}
```

### 1.2 Course Model (With Free/Paid Flag)

```javascript
// Course.js (Enhanced)
{
  title: String,
  slug: String (unique, indexed),
  description: String,
  thumbnail: String, // R2 path
  category: {
    type: String,
    enum: ['beginner', 'foundation', 'master', 'phd', 'crash-course']
  },
  
  // NEW: Free/Paid Management
  accessType: {
    type: String,
    enum: ['free', 'paid'],
    default: 'paid'
  },
  price: Number, // 0 for free courses
  
  level: String,
  totalDuration: Number, // minutes
  isPublished: Boolean,
  publishedAt: Date,
  
  // Ordering & Display
  orderIndex: Number,
  isFeatured: Boolean,
  
  // SEO
  metaTitle: String,
  metaDescription: String,
  
  // Admin tracking
  createdBy: ObjectId (ref: 'User'),
  updatedBy: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

### 1.3 Module Model

```javascript
// Module.js (Enhanced)
{
  courseId: ObjectId (ref: 'Course', indexed),
  title: String,
  description: String,
  orderIndex: Number,
  active: Boolean,
  
  // NEW: Module-level access control
  isPreview: Boolean, // Allow free preview even in paid course
  
  createdBy: ObjectId (ref: 'User'),
  updatedAt: Date
}
```

### 1.4 Video Model (Core Content)

```javascript
// Video.js (Enhanced)
{
  moduleId: ObjectId (ref: 'Module', indexed),
  title: String,
  description: String,
  
  // Cloudflare R2 Integration
  r2Path: String, // resources/{course-slug}/{module-slug}/lesson-{N}-videos/index.m3u8
  cloudflareVideoId: String, // Stream video ID (if using Cloudflare Stream)
  
  // Metadata
  duration: Number, // seconds
  thumbnail: String, // R2 path or auto-generated
  orderIndex: Number,
  
  // Access Control
  isFreePreview: Boolean,
  active: Boolean,
  
  // Resources attached to this video
  resources: [{
    title: String,
    type: { type: String, enum: ['pdf', 'ebook', 'notes', 'slides'] },
    r2Path: String, // resources/{course-slug}/{module-slug}/lesson-{N}-{type}/file.pdf
    size: Number, // bytes
    pages: Number, // for PDFs
    isDownloadable: Boolean
  }],
  
  // Multi-part video support
  parts: [{
    title: String,
    r2Path: String,
    duration: Number,
    orderIndex: Number
  }],
  
  // Admin tracking
  uploadedBy: ObjectId (ref: 'User'),
  uploadedAt: Date,
  updatedAt: Date
}
```

### 1.5 NEW: MediaAsset Model (R2 Upload Tracking)

```javascript
// MediaAsset.js (NEW)
{
  fileName: String,
  originalName: String,
  r2Path: String (unique, indexed),
  r2Bucket: String,
  
  assetType: {
    type: String,
    enum: ['video', 'pdf', 'ebook', 'image', 'thumbnail']
  },
  
  mimeType: String,
  size: Number, // bytes
  
  // Cloudflare metadata
  cloudflareId: String,
  signedUrlExpiry: Number, // seconds (default: 3600)
  
  // References (what content uses this asset)
  usedIn: [{
    model: String, // 'Video', 'Course', etc.
    documentId: ObjectId
  }],
  
  // Status
  uploadStatus: {
    type: String,
    enum: ['uploading', 'processing', 'ready', 'failed'],
    default: 'uploading'
  },
  
  uploadedBy: ObjectId (ref: 'User'),
  uploadedAt: Date,
  lastAccessedAt: Date
}
```

---

## 2. Cloudflare R2 Storage Structure

### 2.1 Directory Structure

```
r2://parashari-learning-portal/
│
├── resources/
│   ├── {course-slug}/
│   │   ├── {module-slug}/
│   │   │   ├── lesson-1-videos/
│   │   │   │   ├── index.m3u8 (HLS manifest)
│   │   │   │   ├── segment-001.ts
│   │   │   │   ├── segment-002.ts
│   │   │   │   └── ...
│   │   │   ├── lesson-1-pdf/
│   │   │   │   └── notes.pdf
│   │   │   ├── lesson-1-ebook/
│   │   │   │   └── book.pdf
│   │   │   ├── lesson-2-videos/
│   │   │   └── ...
│   │   └── ...
│   └── ...
│
├── thumbnails/
│   ├── courses/
│   │   └── {course-slug}.jpg
│   └── videos/
│       └── {video-id}.jpg
│
└── temp-uploads/
    └── {upload-session-id}/
        └── {original-filename}
```

### 2.2 Path Generation Rules

**Videos:**
```
resources/{course-slug}/{module-slug}/lesson-{N}-videos/index.m3u8
```

**PDFs/Notes:**
```
resources/{course-slug}/{module-slug}/lesson-{N}-pdf/{filename}.pdf
```

**eBooks:**
```
resources/{course-slug}/{module-slug}/lesson-{N}-ebook/{filename}.pdf
```

**Thumbnails:**
```
thumbnails/courses/{course-slug}.jpg
thumbnails/videos/{video-id}.jpg
```

---

## 3. Admin Workflow for Content Upload

### 3.1 Video Upload Process

**Step 1: Admin Uploads to R2**
1. Admin selects video file in admin panel
2. Frontend generates pre-signed upload URL from backend
3. Direct upload to R2 (client → R2)
4. Backend receives upload completion webhook
5. Video processing begins (if using Cloudflare Stream)

**Step 2: Admin Enters Metadata**
- Course selection (dropdown)
- Module selection (dropdown, filtered by course)
- Lesson number (auto-incremented or manual)
- Title & description
- Duration (auto-detected or manual)
- Free preview checkbox
- Active/Published toggle

**Step 3: System Generates R2 Path**
```javascript
// Auto-generated based on metadata
r2Path = `resources/${courseSlug}/${moduleSlug}/lesson-${lessonNumber}-videos/index.m3u8`
```

**Step 4: Database Entry Created**
- Video document saved with all metadata
- MediaAsset document created for tracking
- Course/Module references updated

### 3.2 PDF/Notes Upload Process

**Admin Panel Form:**
```
Associated Video: [Dropdown - select video]
Resource Type: [PDF Notes | eBook | Slides]
File: [Upload button]
Title: [Text input]
Allow Download: [Checkbox]
```

**Backend Processing:**
1. Upload to R2: `resources/{course}/{module}/lesson-{N}-pdf/notes.pdf`
2. Extract metadata (pages count, file size)
3. Add to Video.resources array
4. Create MediaAsset entry

### 3.3 Course Thumbnail Upload

**Simple Upload:**
- Admin uploads image
- Stored at: `thumbnails/courses/{course-slug}.jpg`
- Path saved in Course.thumbnail field

---

## 4. Admin Panel Interface Design

### 4.1 Page Structure

```
Admin Dashboard
├── Dashboard (Overview Stats)
├── Courses Management
│   ├── All Courses (List View)
│   ├── Add New Course
│   └── Edit Course
│       ├── Basic Info
│       ├── Modules (Nested)
│       │   └── Videos (Nested)
│       │       └── Resources (Nested)
│       └── Publishing Settings
├── Content Library
│   ├── Videos (All videos across courses)
│   ├── PDFs & Documents
│   └── Media Assets (R2 uploads)
├── Free vs Paid Management
│   ├── Free Courses Assignment
│   └── Paid Courses Settings
├── Users Management
│   ├── Students
│   └── Admins
└── Settings
    ├── R2 Configuration
    └── Security Settings
```

### 4.2 Course Management Screen

**List View:**
```
┌─────────────────────────────────────────────────────────────┐
│ Courses                                      [+ Add Course]  │
├─────────────────────────────────────────────────────────────┤
│ Search: [_____________]  Category: [All ▼]  Type: [All ▼]   │
├─────────────────────────────────────────────────────────────┤
│ Title         | Category  | Type | Modules | Status | Actions│
├─────────────────────────────────────────────────────────────┤
│ 🌱 Beginner   | Beginner  | Paid | 3       | ✓ Live | ⚙️ 🗑️  │
│ 🏛️ Foundation | Foundation| Free | 2       | ✓ Live | ⚙️ 🗑️  │
│ 🎓 Master     | Master    | Paid | 5       | Draft  | ⚙️ 🗑️  │
└─────────────────────────────────────────────────────────────┘
```

**Edit Course Screen:**
```
┌─────────────────────────────────────────────────────────────┐
│ Edit Course: Vedic Astrology                                │
├─────────────────────────────────────────────────────────────┤
│ Basic Information                                           │
│ Title: [Vedic Astrology_________________________]           │
│ Slug: vedic-astrology (auto-generated)                      │
│ Description: [Rich text editor]                             │
│ Thumbnail: [Upload] vedic-astrology.jpg [View]              │
│ Category: [Beginner ▼]                                      │
│                                                             │
│ Access & Pricing                                            │
│ Access Type: ( ) Free  (•) Paid                             │
│ Price: [$__299__]                                           │
│                                                             │
│ Publishing                                                  │
│ Status: [Published ▼]  Featured: [✓]                        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Modules                                      [+ Add Module]  │
├─────────────────────────────────────────────────────────────┤
│ ▼ 1. Introduction & Basics          [⚙️ Edit] [🗑️ Delete]   │
│   │                                                          │
│   ├─ 📹 Lesson 1 - Introduction     [⚙️] [📎 3 resources]   │
│   ├─ 📹 Lesson 2 - Fundamentals     [⚙️] [📎 1 resource]    │
│   └─ 📹 Lesson 3 - Practice         [⚙️] [📎 0 resources]   │
│                                                              │
│ ▼ 2. Core Concepts                  [⚙️ Edit] [🗑️ Delete]   │
│   ├─ 📹 Lesson 4 - Houses           [⚙️] [📎 2 resources]   │
│   └─ ...                                                     │
└──────────────────────────────────────────────────────────────┘
                        [Save Changes]  [Cancel]
```

### 4.3 Video Upload Modal

```
┌─────────────────────────────────────────────────────────────┐
│ Add Video to Module: Introduction & Basics                  │
├─────────────────────────────────────────────────────────────┤
│ Video File                                                  │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │  Drag & drop video here or click to browse              │ │
│ │  Accepted: MP4, MOV, AVI (Max: 2GB)                      │ │
│ └─────────────────────────────────────────────────────────┘ │
│ Status: ⬆️ Uploading... 45% (234 MB / 520 MB)               │
│                                                             │
│ Video Details                                               │
│ Title: [Lesson 1 - Introduction to Vedic Wisdom__]          │
│ Description: [Rich text editor]                             │
│ Duration: [00:55:30] (auto-detected)                        │
│ Order: [1]                                                  │
│                                                             │
│ Access Control                                              │
│ [✓] Active (published)                                      │
│ [  ] Free Preview (accessible without purchase)             │
│                                                             │
│ R2 Path (Auto-generated)                                    │
│ resources/vedic-astrology/introduction-basics/lesson-1-videos/index.m3u8 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ Attach Resources (Optional)                                 │
│ PDF Notes:   [Upload PDF]  or  [Select from library ▼]     │
│ eBook:       [Upload PDF]  or  [Select from library ▼]     │
│ Slides:      [Upload PDF]  or  [Select from library ▼]     │
└─────────────────────────────────────────────────────────────┘
                    [Save & Publish]  [Save as Draft]
```

---

## 5. Backend API Endpoints

### 5.1 Course Management APIs

```javascript
// Courses
POST   /api/admin/courses              // Create course
GET    /api/admin/courses              // List all courses
GET    /api/admin/courses/:id          // Get course details
PUT    /api/admin/courses/:id          // Update course
DELETE /api/admin/courses/:id          // Delete course
PATCH  /api/admin/courses/:id/publish  // Publish/unpublish

// Modules
POST   /api/admin/courses/:id/modules         // Add module
PUT    /api/admin/modules/:id                 // Update module
DELETE /api/admin/modules/:id                 // Delete module
POST   /api/admin/modules/:id/reorder         // Reorder modules

// Videos
POST   /api/admin/modules/:id/videos          // Add video
PUT    /api/admin/videos/:id                  // Update video
DELETE /api/admin/videos/:id                  // Delete video
POST   /api/admin/videos/:id/resources        // Attach resource
DELETE /api/admin/videos/:id/resources/:resId // Remove resource
```

### 5.2 R2 Upload APIs

```javascript
// Generate pre-signed upload URL
POST   /api/admin/r2/upload-url
Body: {
  fileName: "lesson1.mp4",
  fileType: "video/mp4",
  assetType: "video",
  metadata: {
    courseId: "...",
    moduleId: "...",
    lessonNumber: 1
  }
}
Response: {
  uploadUrl: "https://r2.cloudflarestorage.com/...",
  uploadId: "uuid",
  r2Path: "resources/vedic-astrology/intro/lesson-1-videos/index.m3u8"
}

// Confirm upload completion
POST   /api/admin/r2/upload-complete
Body: {
  uploadId: "uuid",
  r2Path: "resources/...",
  metadata: { ... }
}

// List R2 assets
GET    /api/admin/r2/assets?type=video&courseId=...

// Delete R2 asset
DELETE /api/admin/r2/assets/:id
```

### 5.3 Free vs Paid Management APIs

```javascript
// Set course access type
PATCH  /api/admin/courses/:id/access-type
Body: {
  accessType: "free",  // or "paid"
  price: 0             // or amount
}

// Bulk update
POST   /api/admin/courses/bulk-access
Body: {
  courseIds: ["id1", "id2"],
  accessType: "free"
}

// Get free courses list
GET    /api/admin/courses/free

// Get paid courses list
GET    /api/admin/courses/paid
```

---

## 6. Security Implementation

### 6.1 Admin Authentication

**Multi-Layer Security:**

```javascript
// middleware/adminAuth.js
export const requireAdmin = async (req, res, next) => {
  try {
    // 1. Verify JWT token
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) throw new Error('No token');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Fetch user and check role
    const user = await User.findById(decoded.userId);
    if (!user || !['admin', 'super-admin'].includes(user.role)) {
      throw new Error('Insufficient permissions');
    }
    
    // 3. Check specific permissions for action
    const requiredPermission = req.route.path; // e.g., 'courses.delete'
    if (!user.permissions.includes(requiredPermission)) {
      throw new Error('Permission denied');
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

// Usage
router.delete('/courses/:id', requireAdmin, deleteCourse);
```

### 6.2 R2 Signed URLs (Student Access)

**Server-side signing for student content access:**

```javascript
// routes/resource.js (Student-facing)
router.get('/stream/:resourceId', authenticate, async (req, res) => {
  const { resourceId } = req.params;
  
  // 1. Verify user enrollment
  const isEnrolled = await checkEnrollment(req.user.id, resourceId);
  if (!isEnrolled) {
    return res.status(403).json({ error: 'Not enrolled' });
  }
  
  // 2. Get resource path
  const resource = await Video.findById(resourceId);
  
  // 3. Generate short-lived signed URL (1 hour expiry)
  const signedUrl = await generateR2SignedUrl({
    r2Path: resource.r2Path,
    expiresIn: 3600, // 1 hour
    responseContentDisposition: 'inline' // Force streaming, not download
  });
  
  // 4. Rate limiting check
  await rateLimiter.consume(req.user.id);
  
  // 5. Log access for security audit
  await logAccess({
    userId: req.user.id,
    resourceId,
    timestamp: new Date()
  });
  
  res.json({ signedUrl });
});
```

**Cloudflare R2 Signing Function:**

```javascript
// utils/r2Signer.js
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

export async function generateR2SignedUrl({ r2Path, expiresIn = 3600, responseContentDisposition = 'inline' }) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Path,
    ResponseContentDisposition: responseContentDisposition,
    ResponseCacheControl: 'no-cache, no-store, must-revalidate'
  });
  
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn
  });
  
  return signedUrl;
}
```

### 6.3 Admin R2 Upload Pre-signed URLs

```javascript
// Admin uploads directly to R2 using pre-signed POST URL
import { PutObjectCommand } from '@aws-sdk/client-s3';

export async function generateUploadUrl({ fileName, fileType, r2Path }) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Path,
    ContentType: fileType,
    Metadata: {
      uploadedBy: req.user.id,
      uploadedAt: new Date().toISOString()
    }
  });
  
  // 15 minute expiry for uploads
  const uploadUrl = await getSignedUrl(s3Client, command, {
    expiresIn: 900
  });
  
  return uploadUrl;
}
```

### 6.4 Content Protection Layers

**Layer 1: Database Access Control**
- Course.accessType = 'free' | 'paid'
- Video.isFreePreview = true/false
- User enrollment verification

**Layer 2: Signed URLs**
- 1-hour expiry
- User-specific (cannot share URLs)
- IP binding (optional)

**Layer 3: Rate Limiting**
```javascript
// 10 video access requests per minute per user
const videoAccessLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  keyGenerator: (req) => req.user.id
});
```

**Layer 4: Watermarking (Future Enhancement)**
- Dynamic watermark with user email on PDFs
- Video watermark overlay

**Layer 5: R2 Access Logs**
- Monitor unusual access patterns
- Detect URL sharing abuse

---

## 7. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

**Database:**
- [ ] Enhance User model with admin roles
- [ ] Add accessType field to Course model
- [ ] Create MediaAsset model
- [ ] Database migrations

**Backend:**
- [ ] Admin authentication middleware
- [ ] Permission system implementation
- [ ] R2 client configuration
- [ ] Signed URL generation utilities

**Admin Frontend:**
- [ ] Admin login page
- [ ] Dashboard layout (header, sidebar)
- [ ] Protected routes setup

### Phase 2: Course Management (Week 3-4)

**Backend APIs:**
- [ ] Course CRUD endpoints
- [ ] Module CRUD endpoints
- [ ] Free/Paid toggle endpoints

**Admin UI:**
- [ ] Course list page
- [ ] Course create/edit form
- [ ] Module management interface
- [ ] Free/Paid assignment UI

### Phase 3: Content Upload System (Week 5-6)

**Backend:**
- [ ] R2 pre-signed upload URL generation
- [ ] Upload completion webhook
- [ ] MediaAsset tracking

**Admin UI:**
- [ ] Video upload modal with progress
- [ ] PDF/document upload
- [ ] Thumbnail upload
- [ ] Media library browser

### Phase 4: Video & Resource Management (Week 7-8)

**Backend:**
- [ ] Video CRUD endpoints
- [ ] Resource attachment APIs
- [ ] Path auto-generation logic

**Admin UI:**
- [ ] Video list/edit interface
- [ ] Resource attachment UI
- [ ] Bulk operations (delete, reorder)

### Phase 5: Security Hardening (Week 9-10)

- [ ] Implement rate limiting
- [ ] Add access logging
- [ ] Security audit trail
- [ ] IP whitelisting for admin
- [ ] 2FA for admin accounts (optional)

### Phase 6: Testing & Deployment (Week 11-12)

- [ ] Unit tests for APIs
- [ ] Integration tests for upload flow
- [ ] Security penetration testing
- [ ] Performance optimization
- [ ] Production deployment

---

## 8. Admin Panel Technology Stack

**Frontend:**
```
- React.js (consistency with Learning Portal)
- React Router (routing)
- Axios (API calls)
- React Dropzone (file uploads)
- TinyMCE / Quill (rich text editor)
- Recharts (analytics dashboard)
```

**Backend:**
```
- Node.js + Express (existing)
- MongoDB (existing)
- AWS SDK for Cloudflare R2
- Multer (optional, for temp file handling)
- JWT (authentication)
```

**DevOps:**
```
- Separate admin subdomain: admin.parashari.com
- SSL certificate
- Cloudflare for CDN & DDoS protection
```

---

## 9. Admin Data Entry Checklist

### When Uploading a New Video Lesson:

**Required Fields:**
1. ✅ Select Course (dropdown)
2. ✅ Select Module (dropdown, filtered by course)
3. ✅ Lesson Number (auto-suggest next available)
4. ✅ Video Title (e.g., "Lesson 1 - Introduction")
5. ✅ Upload Video File (MP4/MOV, direct to R2)

**System Auto-Generates:**
- ✅ R2 Path: `resources/{course-slug}/{module-slug}/lesson-{N}-videos/index.m3u8`
- ✅ Slug: Auto from title
- ✅ Thumbnail: Auto-extracted from video (frame at 00:05)

**Optional Fields:**
- Description (rich text)
- Duration (auto-detected)
- Free Preview checkbox
- Active/Published toggle
- Order index (for custom ordering)

### When Uploading PDF/Notes:

**Required:**
1. ✅ Select Associated Video (dropdown)
2. ✅ Resource Type (PDF Notes | eBook | Slides)
3. ✅ Upload PDF File

**System Auto-Generates:**
- ✅ R2 Path: `resources/{course}/{module}/lesson-{N}-{type}/file.pdf`
- ✅ File metadata (pages, size)

**Optional:**
- Custom title
- Allow download checkbox

### Result in Learning Portal:

**Student View:**
1. If Course.accessType = 'free' → Shows in "Free Courses" section
2. If Course.accessType = 'paid' → Shows in "Paid Courses" (Categories page)
3. If Video.isFreePreview = true → Accessible even if not enrolled
4. Resources appear as clickable items below video player
5. PDFs open in ResourceReader component
6. Videos stream via HLSPlayer with signed URLs

---

## 10. Security Best Practices

### 10.1 Admin Access

✅ **Enforce:**
- Strong password policy (min 12 chars, symbols, numbers)
- JWT token expiry (4 hours)
- Refresh token rotation
- HTTPS only
- IP whitelisting (optional: restrict to office IP)

### 10.2 R2 Signed URLs

✅ **Configuration:**
```javascript
{
  expiresIn: 3600,           // 1 hour
  ipWhitelist: req.ip,       // Optional: bind to IP
  maxDownloads: 1,           // Optional: one-time use
  requireAuth: true          // Must be logged in
}
```

### 10.3 Content Leakage Prevention

❌ **Never expose:**
- Direct R2 URLs in HTML source
- Permanent public URLs
- R2 access keys in frontend

✅ **Always use:**
- Server-side signed URL generation
- Enrollment verification before signing
- Access logging and anomaly detection

---

## 11. Environment Variables (.env)

```bash
# Existing
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key

# NEW: Cloudflare R2
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-key
R2_BUCKET_NAME=parashari-learning-portal
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://cdn.parashari.com (if using custom domain)

# Admin
ADMIN_JWT_SECRET=different-secret-for-admin
ADMIN_TOKEN_EXPIRY=4h
```

---

## Summary

This roadmap provides:
✅ Complete database schema with free/paid support  
✅ R2 directory structure and path generation  
✅ Admin UI mockups and workflows  
✅ Secure upload and delivery system  
✅ 12-week implementation timeline  
✅ Security best practices  
✅ Admin data entry checklist  

**Next Steps:**
1. Review and approve this architecture
2. Set up Cloudflare R2 bucket
3. Begin Phase 1 implementation
4. Design admin UI mockups in Figma (optional)
5. Create database migration scripts
