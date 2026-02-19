# Learning Portal - Admin Panel

## Overview

This is a **completely separate** admin system for managing the Learning Portal educational platform. It provides full CRUD operations over courses, modules, lessons, users, and media assets.

**Key Principle:** The admin panel is architecturally isolated from the main Learning Portal frontend and backend.

---

## Architecture

```
admin_panel/
├── docs/              # Documentation
├── backend/           # Admin API server (Node.js + Express)
├── frontend/          # Admin UI (React + Vite)
└── deployment/        # Production deployment configs
```

### Separation from Main System

| Aspect | Main Learning Portal | Admin Panel |
|--------|---------------------|-------------|
| **Purpose** | Student-facing learning platform | Admin content management |
| **Auth** | `JWT_SECRET` |`ADMIN_JWT_SECRET` |
| **API Prefix** | `/api/v2/*` | `/api/admin/*` |
| **Port** | Client: 5173, Server: 5002 | Client: 5174, Server: 5001 |
| **Database** | Shared MongoDB | Shared MongoDB (different collections) |
| **R2 Access** | Signed URLs (read-only) | Pre-signed URLs (read/write) |

---

## Features

✅ **User & Role Management** - Super Admin, Admin, Student roles with granular permissions  
✅ **Course Management** - Full CRUD with free/paid toggle  
✅ **Module & Lesson Management** - Hierarchical content organization  
✅ **Media Upload** - Direct R2 upload via pre-signed URLs  
✅ **Automated Path Generation** - Zero manual path entry required  
✅ **Audit Logging** - Complete trail of all admin actions  
✅ **Security** - RBAC, signed URLs, rate limiting  

---

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB running
- Cloudflare R2 account

### 1. Backend Setup

```bash
cd admin_panel/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, R2 credentials, etc.

# Run backend
npm run dev
```

Backend will run on `http://localhost:5001`

### 2. Frontend Setup

```bash
cd admin_panel/frontend

# Install dependencies
npm install

# Run frontend
npm run dev
```

Frontend will run on `http://localhost:5174`

### 3. Access Admin Panel

1. Open `http://localhost:5174`
2. Login with admin credentials
3. Start managing content!

---

## Environment Variables

### Backend `.env`

```bash
# MongoDB
MONGODB_URI=mongodb://localhost:27017/webinar_parashari

# Admin JWT (MUST BE DIFFERENT from main portal)
ADMIN_JWT_SECRET=your-super-secret-admin-key
ADMIN_JWT_EXPIRY=4h

# Cloudflare R2
R2_ACCOUNT_ID=your-cloudflare-account-id
R2_ACCESS_KEY_ID=your-r2-access-key
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=parashari-learning-portal
R2_ENDPOINT=https://<account_id>.r2.cloudflarestorage.com
R2_PUBLIC_URL=https://cdn.parashari.com

# Server
PORT=5001
NODE_ENV=development
```

### Frontend `.env`

```bash
VITE_API_URL=http://localhost:5001/api/admin
```

---

## Key Concepts

### 1. Automated Path Generation

Admin **never** manually enters R2 storage paths. When uploading content:

**Admin enters:**
- Course: "Vedic Astrology"
- Module: "Core Concepts"
- Lesson Title: "Introduction to Houses"

**System auto-generates:**
```
videoPath: resources/vedic-astrology/core-concepts/lesson-1-videos/index.m3u8
pdfPath: resources/vedic-astrology/core-concepts/lesson-1-pdf/
```

### 2. Free vs Paid Content

Single toggle changes course visibility:

```javascript
// Set course as free
{ accessType: "free", price: 0 }
→ Appears in "Free Courses" section

// Set course as paid
{ accessType: "paid", price: 299 }
→ Appears in "Paid Courses" (Categories page)
```

### 3. Role-Based Access Control

```javascript
// Super Admin: All permissions
role: "super-admin"

// Admin: Specific permissions
role: "admin"
permissions: ["courses.create", "courses.edit", "media.upload"]

// Student: No admin access
role: "student"
permissions: []
```

---

## Directory Structure

### Backend

```
backend/
├── src/
│   ├── models/          # MongoDB schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Module.js
│   │   ├── Lesson.js
│   │   ├── MediaAsset.js
│   │   └── AdminLog.js
│   │
│   ├── routes/          # API endpoints
│   │   ├── auth.routes.js
│   │   ├── courses.routes.js
│   │   ├── modules.routes.js
│   │   ├── lessons.routes.js
│   │   ├── media.routes.js
│   │   ├── users.routes.js
│   │   └── dashboard.routes.js
│   │
│   ├── controllers/     # Business logic
│   ├── middleware/      # Auth, permissions, rate limiting
│   ├── services/        # R2, path generation, audit logging
│   ├── utils/           # Helpers
│   └── app.js           # Express app
│
├── .env.example
└── package.json
```

### Frontend

```
frontend/
├── src/
│   ├── components/
│   │   ├── common/      # Button, Input, Modal, Toast
│   │   ├── layout/      # AdminLayout, Sidebar, Header
│   │   ├── courses/     # Course management components
│   │   ├── modules/     # Module management
│   │   ├── lessons/     # Lesson management
│   │   ├── media/       # Media uploader, library
│   │   └── users/       # User management
│   │
│   ├── pages/           # Page components
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Courses/
│   │   ├── Users/
│   │   ├── Media/
│   │   └── Logs/
│   │
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API client layer
│   ├── context/         # AuthContext, ToastContext
│   └── utils/           # Helpers
│
├── public/
├── package.json
└── vite.config.js
```

---

## API Endpoints

All admin APIs are prefixed with `/api/admin/`

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `POST /api/admin/auth/logout` - Logout
- `GET /api/admin/auth/me` - Get current admin user

### Users
- `GET /api/admin/users` - List users (with filters)
- `POST /api/admin/users` - Create user
- `PUT /api/admin/users/:id` - Update user
- `DELETE /api/admin/users/:id` - Delete user
- `PATCH /api/admin/users/:id/toggle-status` - Activate/deactivate

### Courses
- `GET /api/admin/courses` - List courses
- `POST /api/admin/courses` - Create course
- `PUT /api/admin/courses/:id` - Update course
- `DELETE /api/admin/courses/:id` - Delete course
- `PATCH /api/admin/courses/:id/publish` - Publish/unpublish
- `PATCH /api/admin/courses/:id/access-type` - Toggle free/paid

### Modules
- `POST /api/admin/courses/:courseId/modules` - Add module to course
- `PUT /api/admin/modules/:id` - Update module
- `DELETE /api/admin/modules/:id` - Delete module

### Lessons
- `POST /api/admin/modules/:moduleId/lessons` - Add lesson to module
- `PUT /api/admin/lessons/:id` - Update lesson
- `DELETE /api/admin/lessons/:id` - Delete lesson

### Media
- `POST /api/admin/media/upload-url` - Generate R2 pre-signed upload URL
- `POST /api/admin/media/upload-complete` - Confirm upload completion
- `GET /api/admin/media/assets` - List media assets
- `DELETE /api/admin/media/assets/:id` - Delete media asset

### Dashboard
- `GET /api/admin/dashboard/stats` - Get overview statistics

### Logs
- `GET /api/admin/logs` - Get audit logs (with filters)

---

## Security

### 1. Authentication
- JWT tokens with separate `ADMIN_JWT_SECRET`
- 4-hour token expiry
- Role verification on every request

### 2. Authorization
- Role-based access control (RBAC)
- Permission checking at route level
- Super-admin bypasses permission checks

### 3. R2 Security
- Pre-signed upload URLs (15-minute expiry)
- Signed download URLs (1-hour expiry for students)
- No public bucket access
- Enrollment verification before serving content

### 4. Audit Trail
- All admin actions logged to database
- IP address and user-agent tracking
- Before/after change tracking

### 5. Rate Limiting
- Protects against brute-force attacks
- Configurable limits per endpoint

---

## Development Workflow

### Creating a New Course with Video

1. **Login to Admin Panel** (`http://localhost:5174`)
2. **Navigate to Courses** → Click "Add Course"
3. **Fill Basic Info:**
   - Title: "Advanced Nadi Astrology"
   - Description: "Deep dive into Nadi techniques..."
   - Category: Master
   - Access Type: Paid
   - Price: 499
4. **Click Save** - System auto-generates slug: `advanced-nadi-astrology`
5. **Add Module:**
   - Title: "Introduction & Basics"
   - System auto-generates slug: `introduction-basics`
6. **Add Lesson to Module:**
   - Title: "Lesson 1 - Fundamentals"
7. **Upload Video:**
   - Click "Upload Video" button
   - Select MP4 file
   - System auto-generates path: `resources/advanced-nadi-astrology/introduction-basics/lesson-1-videos/index.m3u8`
   - Upload progress shown
8. **Attach PDF Notes (optional):**
   - Click "Attach Resource"
   - Select PDF
   - System auto-generates path: `resources/advanced-nadi-astrology/introduction-basics/lesson-1-pdf/notes.pdf`
9. **Publish Course** - Now visible to students!

---

## Deployment

### Production Checklist

- [ ] Set strong `ADMIN_JWT_SECRET`
- [ ] Configure R2 credentials
- [ ] Set `NODE_ENV=production`
- [ ] Enable HTTPS
- [ ] Configure CORS for admin domain
- [ ] Set up admin subdomain (e.g., `admin.parashari.com`)
- [ ] Configure nginx reverse proxy
- [ ] Set up firewall rules
- [ ] Enable rate limiting
- [ ] Configure backup strategy
- [ ] Set up monitoring & logging

### Deployment Configs

See `deployment/` folder for:
- `nginx.admin.conf` - Nginx reverse proxy config
- `dockerfile.admin` - Docker container setup
- `env.production.example` - Production environment template

---

## Documentation

- **`docs/admin_system_roadmap.md`** - Comprehensive 68-page roadmap covering architecture, schemas, security, and implementation timeline
- **`docs/admin_implementation.md`** - Production-ready implementation guide with complete code examples

---

## Support & Maintenance

### Common Issues

**Issue:** "No token provided" error  
**Solution:** Check `Authorization: Bearer {token}` header is set

**Issue:** "Insufficient permissions" error  
**Solution:** Verify user role and permissions in database

**Issue:** R2 upload fails  
**Solution:** Check R2 credentials and bucket permissions

**Issue:** Video not playing  
**Solution:** Verify R2 path format and check signed URL generation

### Logs

- **Backend logs:** Check console output or log files
- **Audit logs:** Query via `/api/admin/logs` endpoint
- **Database logs:** Check MongoDB logs for connection issues

---

## Contributing

This admin panel follows strict architectural principles:

1. **Separation of Concerns** - Keep admin code isolated
2. **No Manual Paths** - Always auto-generate R2 paths
3. **Security First** - RBAC, signed URLs, audit logging
4. **Production Quality** - No shortcuts, clean code, proper error handling

---

## License

© 2024 Parashari Learning Portal - All Rights Reserved

---

**Status:** 🚧 Under Development  
**Version:** 1.0.0-alpha  
**Last Updated:** 2024-02-10
