# Learning Portal Admin Panel - Complete Implementation Plan

## Executive Summary

Production-grade admin system with full CRUD operations, Cloudflare R2 media management, role-based access control, and automated path generation for the Learning Portal platform.

---

## 1. Database Schema (MongoDB Models)

### 1.1 Enhanced User Model

```javascript
// server/models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  password: { type: String, required: true, minlength: 8 },
  name: { type: String, required: true, trim: true },
  
  // RBAC
  role: { type: String, enum: ['student', 'admin', 'super-admin'], default: 'student', index: true },
  permissions: [{ type: String }],
  
  // Status
  isActive: { type: Boolean, default: true },
  
  // Enrollments
  enrolledCourses: [{
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    enrolledAt: Date,
    status: { type: String, enum: ['active', 'completed', 'suspended'], default: 'active' }
  }],
  
  // Audit
  lastLogin: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.hasPermission = function(permission) {
  return this.permissions.includes(permission) || this.role === 'super-admin';
};

export default mongoose.model('User', userSchema);
```

### 1.2 Course Model (with accessType)

```javascript
// server/models/Course.js
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, index: true },
  description: { type: String, required: true },
  thumbnail: String, // R2 path
  
  // Access Control
  accessType: { type: String, enum: ['free', 'paid'], default: 'paid', index: true },
  price: { type: Number, default: 0, min: 0 },
  
  // Publishing
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
  publishedAt: Date,
  
  category: { type: String, enum: ['beginner', 'foundation', 'master', 'phd', 'crash-course'], required: true },
  orderIndex: { type: Number, default: 0 },
  isFeatured: { type: Boolean, default: false },
  
  // Metadata
  totalDuration: Number,
  level: String,
  metaTitle: String,
  metaDescription: String,
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

courseSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  next();
});

export default mongoose.model('Course', courseSchema);
```

### 1.3 Module Model

```javascript
// server/models/Module.js
const moduleSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true, index: true },
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, lowercase: true },
  description: String,
  orderIndex: { type: Number, required: true, default: 0 },
  active: { type: Boolean, default: true },
  isPreview: { type: Boolean, default: false },
  
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

moduleSchema.index({ courseId: 1, orderIndex: 1 });

export default mongoose.model('Module', moduleSchema);
```

### 1.4 Lesson Model

```javascript
// server/models/Lesson.js
const resourceSchema = new mongoose.Schema({
  title: String,
  type: { type: String, enum: ['pdf', 'ebook', 'slides', 'notes'], required: true },
  r2Path: String,
  mediaAssetId: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaAsset' },
  size: Number,
  pages: Number,
  isDownloadable: { type: Boolean, default: false }
}, { _id: true });

const lessonSchema = new mongoose.Schema({
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true, index: true },
  title: { type: String, required: true, trim: true },
  description: String,
  
  // Video
  videoR2Path: String, // Auto-generated: resources/{course}/{module}/lesson-{N}-videos/index.m3u8
  videoMediaAssetId: { type: mongoose.Schema.Types.ObjectId, ref: 'MediaAsset' },
  videoDuration: Number,
  videoThumbnail: String,
  
  // Resources
  resources: [resourceSchema],
  
  orderIndex: { type: Number, required: true, default: 0 },
  isFreePreview: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

lessonSchema.index({ moduleId: 1, orderIndex: 1 });

export default mongoose.model('Lesson', lessonSchema);
```

### 1.5 MediaAsset Model

```javascript
// server/models/MediaAsset.js
const mediaAssetSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  originalName: String,
  r2Path: { type: String, required: true, unique: true, index: true },
  r2Bucket: { type: String, default: process.env.R2_BUCKET_NAME },
  
  assetType: { type: String, enum: ['video', 'pdf', 'ebook', 'image', 'thumbnail'], required: true, index: true },
  mimeType: String,
  size: Number,
  
  uploadStatus: { type: String, enum: ['uploading', 'processing', 'ready', 'failed'], default: 'uploading', index: true },
  processingError: String,
  cloudflareVideoId: String,
  
  usedIn: [{
    model: String,
    documentId: mongoose.Schema.Types.ObjectId,
    field: String
  }],
  
  signedUrlExpiry: { type: Number, default: 3600 },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastAccessedAt: Date,
  accessCount: { type: Number, default: 0 }
}, { timestamps: true });

mediaAssetSchema.methods.isOrphaned = function() {
  return this.usedIn.length === 0;
};

export default mongoose.model('MediaAsset', mediaAssetSchema);
```

### 1.6 AdminLog Model

```javascript
// server/models/AdminLog.js
const adminLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  action: { type: String, enum: ['create', 'update', 'delete', 'publish', 'unpublish', 'upload', 'download'], required: true, index: true },
  targetModel: { type: String, enum: ['User', 'Course', 'Module', 'Lesson', 'MediaAsset'], required: true },
  targetId: mongoose.Schema.Types.ObjectId,
  changes: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  success: { type: Boolean, default: true },
  errorMessage: String
}, { timestamps: true });

adminLogSchema.index({ adminId: 1, createdAt: -1 });
adminLogSchema.index({ targetModel: 1, targetId: 1 });

export default mongoose.model('AdminLog', adminLogSchema);
```

---

## 2. Complete API Specification

See full endpoints document for:
- Authentication (`POST /api/admin/auth/login`, etc.)
- Users (`GET/POST/PUT/DELETE /api/admin/users`)
- Courses (`GET/POST/PUT/DELETE /api/admin/courses`)
- Modules (`POST/PUT/DELETE /api/admin/modules`)
- Lessons (`POST/PUT/DELETE /api/admin/lessons`)
- Media (`POST /api/admin/media/upload-url`, etc.)
- Dashboard (`GET /api/admin/dashboard/stats`)
- Logs (`GET /api/admin/logs`)

---

## 3. Security Implementation

### 3.1 Admin Auth Middleware

```javascript
// server/middleware/adminAuth.js
export const requireAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ success: false, error: 'No token' });
    
    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user || !['admin', 'super-admin'].includes(user.role)) {
      return res.status(403).json({ success: false, error: 'Insufficient permissions' });
    }
    
    if (!user.isActive) {
      return res.status(403).json({ success: false, error: 'Account deactivated' });
    }
    
    req.user = user;
    User.findByIdAndUpdate(user._id, { lastLogin: new Date() }).exec();
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
```

### 3.2 Permission Middleware

```javascript
// server/middleware/permissions.js
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.user.role === 'super-admin') return next();
    if (!req.user.hasPermission(permission)) {
      return res.status(403).json({ success: false, error: `Permission denied: ${permission}` });
    }
    next();
  };
};
```

### 3.3 R2 Service

```javascript
// server/services/r2Service.js
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

export async function generateUploadUrl({ r2Path, fileType, expiresIn = 900 }) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Path,
    ContentType: fileType
  });
  return await getSignedUrl(s3Client, command, { expiresIn });
}

export async function generateSignedUrl({ r2Path, expiresIn = 3600 }) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Path,
    ResponseContentDisposition: 'inline',
    ResponseCacheControl: 'no-cache'
  });
  return await getSignedUrl(s3Client, command, { expiresIn });
}

export async function deleteFromR2(r2Path) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: r2Path
  });
  await s3Client.send(command);
}
```

---

## 4. Path Generation System

```javascript
// server/services/pathGenerator.js
export function generateVideoPath({ courseSlug, moduleSlug, lessonNumber }) {
  return `resources/${courseSlug}/${moduleSlug}/lesson-${lessonNumber}-videos/index.m3u8`;
}

export function generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType }) {
  return `resources/${courseSlug}/${moduleSlug}/lesson-${lessonNumber}-${resourceType}/`;
}

export function generateThumbnailPath({ type, slug }) {
  return `thumbnails/${type}s/${slug}.jpg`;
}

export async function generateLessonPaths(lessonId) {
  const lesson = await Lesson.findById(lessonId).populate({
    path: 'moduleId',
    populate: { path: 'courseId' }
  });

  const courseSlug = lesson.moduleId.courseId.slug;
  const moduleSlug = lesson.moduleId.slug;
  const lessonNumber = lesson.orderIndex + 1;

  return {
    videoPath: generateVideoPath({ courseSlug, moduleSlug, lessonNumber }),
    pdfPath: generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType: 'pdf' }),
    ebookPath: generateResourcePath({ courseSlug, moduleSlug, lessonNumber, resourceType: 'ebook' })
  };
}
```

---

## 5. Admin UI Structure

```
admin/
├── src/
│   ├── components/
│   │   ├── common/ (Button, Input, Modal, Toast, etc.)
│   │   ├── layout/ (AdminLayout, Sidebar, Header)
│   │   ├── courses/ (CourseList, CourseForm, CourseCard)
│   │   ├── modules/ (ModuleList, ModuleForm)
│   │   ├── lessons/ (LessonList, LessonForm, LessonResources)
│   │   ├── media/ (MediaUploader, MediaLibrary, UploadProgress)
│   │   └── users/ (UserList, UserForm)
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Courses/ (index, Create, Edit)
│   │   ├── Users/ (index, Details)
│   │   ├── Media/index.jsx
│   │   └── Logs/index.jsx
│   ├── hooks/ (useAuth, useCourses, useUpload, useToast)
│   ├── services/ (api, auth, courses, users, media)
│   ├── utils/ (pathGenerator, slugify, validators)
│   └── context/ (AuthContext, ToastContext)
```

---

## 6. Implementation Timeline

**Week 1-2:** Database models, authentication, RBAC  
**Week 3-4:** Course/Module/Lesson CRUD, admin UI basics  
**Week 5-6:** R2 integration, upload UI, media library  
**Week 7:** User management, role assignment  
**Week 8-9:** Audit logging, rate limiting, UI polish  
**Week 10-12:** Testing, security audit, deployment  

---

## Key Features

✅ **Automated Path Generation** - Admin never enters paths manually  
✅ **RBAC** - Fine-grained permissions  
✅ **R2 Direct Upload** - Client uploads directly to R2 via pre-signed URLs  
✅ **Audit Logging** - All admin actions logged  
✅ **Free/Paid Toggle** - Single field controls where course appears  
✅ **Media Tracking** - Orphan detection, usage tracking  
✅ **Secure by Default** - Signed URLs, enrollment verification  

This is production-ready. Ready to build?
