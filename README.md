# Parashari Web Application System

This repository contains the complete source code for the Parashari Institute platform, consisting of two major integrated applications.

## Project Overview

The system is split into two distinct but connected applications:

1.  **AB_AI (Marketing Website)**: The public-facing educational website. It handles course listings, informational pages, student registration, and serves as the entry point for users. It uses a lightweight Node.js/Express server with Vanilla JS frontend for maximum SEO and performance.
2.  **learningPortal (Learning Management System)**: The authenticated student portal. It handles course delivery, video playback, progress tracking, and secure resource access. It is built as a Single Page Application (SPA) using React (Vite) and a robust Express/Node.js REST API.

**Why two websites?**
- **AB_AI** focuses on **SEO, speed, and conversion** (marketing).
- **learningPortal** focuses on **interactivity, state management, and security** (application).

**Connection**:
- Both apps share the same **MongoDB database** (Users, Courses).
- Authentication handoff occurs via token exchange; users login on `AB_AI` (or AutoLogin via `learningPortal`) and are seamlessly authenticated.

---

## System Architecture

```mermaid
graph TD
    subgraph Client_Side
        A[User Browser]
        B[AB_AI Frontend<br/>(HTML/Vanilla JS)]
        C[learningPortal Frontend<br/>(React/Vite)]
    end

    subgraph Cloudflare_Infra
        D[Cloudflare Worker<br/>(Video Signer/Proxy)]
        E[R2 Bucket<br/>(Video Storage)]
        F[Cloudflare Stream<br/>(Video Delivery)]
    end

    subgraph Backend_Services
        G[AB_AI Server<br/>(Node/Express)]
        H[learningPortal Server<br/>(Node/Express)]
    end

    subgraph Database
        I[(MongoDB Atlas)]
    end

    A --> B
    A --> C
    B -- Login/Register --> G
    C -- API Requests --> H
    C -- Video Request --> H
    H -- Auth/Enrollment Check --> I
    H -- Get Signed URL --> D
    D -- Fetch Content --> E
    D -- Return Media --> C
    G -- Auth/Data --> I
    G -- Stream URL --> F
```

**Flow Overview**:
1.  **Frontend**: Users land on `AB_AI`. Login/Signup creates a session/token.
2.  **Transition**: Authenticated users are redirected to `learningPortal`.
3.  **Backend**: Separate servers handle distinct logic but read from the same `User` and `Course` collections.
4.  **Media**: Videos and PDFs are stored in Cloudflare R2 or Stream. Access is gated by the backend which generates signed URLs or proxies via Cloudflare Workers.

---

## Folder Structure & Responsibilities

### Root Folder
| Path | Purpose |
| :--- | :--- |
| `AB_AI/` | Source code for the marketing website (Server + Client). |
| `learningPortal/` | Source code for the LMS (Client + Server). |
| `cloudflare-worker/` | Worker scripts for signing and serving secure video content from R2. |
| `package.json` | Root configuration (may define workspaces). |

### AB_AI (Advertisement Website)
A Multi-Page Application (MPA) serving static HTML files via Express.

| Folder/File | Purpose |
| :--- | :--- |
| **`server.js`** | Main entry point. Serves static files and API routes. |
| **`routes/`** | API route definitions (`auth.js`, `video.js`). |
| **`models/`** | Mongoose models (`User`, `OTP`, `Course`). |
| **`utils/`** | Helper functions (OTP generation, Email service). |
| **`assets/`** | Static images, icons, and public resources. |
| **`scripts/`** | Client-side JavaScript logic. |
| `index.html` | **Home Page**. Landing page with hero section and course highlights. |
| `courses.html` | **Course Listing**. Shows available courses. |
| `login.html` | **Login Page**. Handles user authentication and redirects to portal. |
| `register.html` | **Registration**. OTP-based signup flow. |
| `profile.html` | User profile management. |
| `contact.html` | Contact form. |
| `*.html` | Various static content pages (astrology, vastu, etc.). |

### learningPortal (Learning Platform)
A MERN stack application organized into Client and Server.

#### `learningPortal/server`
| Folder | Purpose |
| :--- | :--- |
| **`server.js`** | API entry point. Configures Middleware, CORS, and Routes. |
| **`routes/`** | REST API endpoints (`auth`, `courses`, `video`, `resource`). Has `v2/` for newer internal APIs. |
| **`models/`** | Rich Mongoose schemas (`Category`, `Module`, `ContentItem`, `ProgressV2`, `User`). |
| **`middleware/`** | Auth verification and request handling middleware. |
| **`utils/`** | Wrapper for Worker client interactions. |

#### `learningPortal/client`
| Folder | Purpose | Data Source |
| :--- | :--- | :--- |
| **`src/pages/`** | Application screens. | |
| `Dashboard.jsx` | **Home Screen**. User's enrolled courses. | `/api/courses/my-courses` |
| `Courses.jsx` | **Catalog**. All available courses. | `/api/courses` |
| `CourseModules.jsx` | **Course Player**. Video player + Module list. | `/api/courses/:id`, `/api/video` |
| **`src/components/`** | Reusable UI widgets. | |
| `HLSPlayer.jsx` | Video player using `hls.js`. | Cloudflare Worker (via API) |
| `HeaderLogo.jsx` | Consistent branding header. | Static |

---

## Frontend Documentation

### Routing & Navigation
- **AB_AI**: Uses standard HTML `<a>` links. Each page is a separate file load.
- **learningPortal**: Uses `react-router-dom`.
    - **Guard**: `StrictProtectedRoute` (in `App.jsx`).
    - **Logic**: Checks `sessionStorage` for `ab_ai_entry` flag AND valid JWT. Redirects to `AB_AI/login.html` if missing.

### Key Components
- **Auth Guard (`StrictProtectedRoute`)**: Ensures users cannot deep-link into the portal without passing through the main authentication flow.
- **Video Player (`HLSPlayer.jsx`)**: Handles HLS stream playback. Manages authentication headers and error states for media playback.
- **AutoLogin (`AutoLogin.jsx`)**: Handles the token handoff from `AB_AI` URL parameters to local storage.

---

## Backend & API Documentation

### API Inventory

| Method | Endpoint | App (Source) | Purpose | Auth |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | | | | |
| `POST` | `/api/auth/send-otp` | AB_AI | Generate and email OTP for signup/reset. | No |
| `POST` | `/api/auth/verify-otp` | AB_AI | Verify OTP code. | No |
| `POST` | `/api/auth/signup-with-otp` | AB_AI | Complete registration with verified token. | No |
| `POST` | `/api/auth/login` | AB_AI | Authenticate user & issue JWT. | No |
| **Content** | | | | |
| `GET` | `/api/courses` | Both | List all available courses. | No |
| `GET` | `/api/courses/:id` | learningPortal | Get full course hierarchy (Modules, videos). | Yes |
| `GET` | `/api/video/access/:videoId` | learningPortal | Get **Signed URL** for video playback. | Yes |
| `GET` | `/api/resource/access/:resourceId`| learningPortal | Get secure URL for PDF/Files. | Yes |
| **User** | | | | |
| `GET` | `/api/courses/my-courses` | learningPortal | Get list of purchased courses. | Yes |
| `POST` | `/api/v2/progress/update` | learningPortal | Update video completion status. | Yes |

---

## Database (MongoDB)

**Database Name**: Shared `webinar_parashari` (or configured via ENV).

### Collections

| Collection | Purpose | Key Fields |
| :--- | :--- | :--- |
| **users** | Central user registry. | `email`, `password` (hashed), `role`, `purchasedCourses` |
| **courses** | Course metadata. | `title`, `price`, `videoKey`, `isSubscriptionBased` |
| **otps** | Temporary OTP storage. | `email`, `code`, `expiresAt`, `purpose` |
| **modules** | Course sections. | `title`, `courseId`, `order` |
| **videos** | Video metadata. | `title`, `r2Path`, `duration`, `moduleId` |
| **enrollments**| User access tracking. | `userId`, `courseId`, `status`, `validUntil` |
| **progressv2**| User progress. | `userId`, `videoId`, `percentComplete`, `completed` |

---

## Cloudflare Media Delivery

The system uses a **Broker Pattern** for media security.

1.  **Storage**:
    - Videos are converted to HLS (`.m3u8` + `.ts`) and stored in a **Cloudflare R2 Bucket**.
    - Original files or Stream-ready inputs are backed by Cloudflare Stream (in `AB_AI` context).
2.  **Worker (`cloudflare-worker/video-signer.js`)**:
    - Acts as a gateway to R2.
    - Validates **Signed Tokens** (HMAC/JWT).
    - Serves content with correct MIME types (`application/vnd.apple.mpegurl`).
3.  **Playback Flow**:
    - User requests video on Frontend.
    - Backend (`/api/video/access/:id`) validates User/Enrollment.
    - Backend generates a **Signed URL** pointing to the Cloudflare Worker.
    - Frontend (`HLSPlayer`) loads this URL.
    - Worker stays in the loop to stream chunks from R2.

---

## Authentication & User Flow

1.  **Registration**:
    - User enters Email on `AB_AI`.
    - System emails OTP (`/send-otp`).
    - User enters OTP -> Verification Token issued.
    - User submits Password + Details -> Account created in `users` collection.
2.  **Login**:
    - User enters Credentials on `AB_AI`.
    - Server verifies hash, issues **JWT**.
    - Frontend redirects to `learningPortal/login?token=xyz`.
3.  **Session**:
    - `learningPortal` validates token.
    - Sets `sessionStorage` flag.
    - JWT sent in `Authorization: Bearer` header for all API calls.

---

## Deployment & Environment

### Environment Variables (.env)
**Server (AB_AI & learningPortal)**:
- `MONGODB_URI`: Connection string.
- `JWT_SECRET`: Shared secret for token generation/validation.
- `CF_STREAM_SECRET`: Cloudflare signing key.
- `VIDEO_BUCKET_URL`: Public/Worker URL for R2.
- `CLIENT_URL`: CORS allowed origin.

### Build & Run
- **AB_AI**:
    - Run: `node server.js`
    - Port: `3000` (Default)
- **learningPortal Server**:
    - Run: `node server.js`
    - Port: `5000` (Default)
- **learningPortal Client**:
    - Build: `npm run build` (Vite build)
    - Serve: `npm run preview` or serve `dist/` folder via Nginx/Node.

---

## Maintenance Notes

- **Safe to Modify**:
    - `AB_AI` HTML/CSS files for content updates.
    - `learningPortal/client` UI components.
- **Critical / Dangerous**:
    - `AB_AI/routes/auth.js`: Core auth logic. Changes here break login for BOTH apps.
    - `cloudflare-worker/`: Modifying signing logic will break ALL video playback immediately.
- **Technical Debt**:
    - User model in `AB_AI` is a subset of `learningPortal`. Always use `learningPortal` schemas as the source of truth.
    - Auth token handoff via URL query parameter is functional but should be short-lived (currently implemented).
