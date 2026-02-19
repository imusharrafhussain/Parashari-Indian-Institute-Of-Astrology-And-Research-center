# Local Development Setup Guide

## Overview

This repository contains a private monorepo for **Parashari Indian Institute** web application. After cloning this repository, you will have the complete source code but will need to configure environment-specific settings manually to run the application locally.

---

## What You Get After `git clone`

When you clone this repository, you receive:

### ✓ Included in Repository
- **Source Code**: Complete frontend and backend application code
  - `AB_AI/` - Marketing website (Node.js + Express + Vanilla JS)
  - `learningPortal/client/` - Student portal frontend (React + Vite)
  - `learningPortal/server/` - Student portal backend (Node.js + Express)
  - `cloudflare-worker/` - Cloudflare Worker scripts for video delivery
- **Configuration Templates**: `.env.example` files for all services
- **Package Definitions**: `package.json` files with dependencies
- **Documentation**: README files and API documentation
- **Build Scripts**: Development and production scripts

### ✗ NOT Included in Repository (Security)
- `.env` files with actual credentials
- MongoDB connection strings
- API keys (Stripe, Razorpay, Cloudflare)
- JWT secrets
- Email service credentials
- Third-party service tokens

---

## Why Configuration Files Are Excluded

The `.env` files contain sensitive credentials and are intentionally excluded from version control to prevent:
- Accidental exposure of production credentials
- Security breaches through leaked API keys
- Unauthorized access to databases and services
- Credential conflicts between team members

This is standard security practice for all web applications.

---

## Local Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (Local installation OR access to shared DEV database)
- Git

### Step 1: Clone the Repository

```bash
git clone https://github.com/imusharrafhussain/Parashari-Indian-Institute-Of-Astrology-And-Research-center-.git
cd Parashari-Indian-Institute-Of-Astrology-And-Research-center-
```

### Step 2: Create Environment Files

You must create `.env` files from the provided templates. **NEVER commit `.env` files to Git.**

#### For AB_AI Backend

```bash
cd AB_AI
cp .env.example .env
```

Edit `AB_AI/.env` and fill in the values (obtain from team lead).

#### For Learning Portal Server

```bash
cd learningPortal/server
cp .env.example .env
```

Edit `learningPortal/server/.env` and fill in the values.

#### For Learning Portal Client

```bash
cd learningPortal/client
cp .env.example .env
```

Edit `learningPortal/client/.env` and fill in the values.

### Step 3: Configure MongoDB

You have two options for database configuration:

#### Option A: Local MongoDB (Recommended for Development)

1. Install MongoDB Community Edition locally
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```
3. Use connection string in `.env`:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/parashari_dev
   ```

#### Option B: Shared DEV MongoDB Atlas

1. Request DEV database credentials from team lead
2. Use the provided connection string (format):
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>
   ```

**Important**: 
- Use ONLY development database credentials
- NEVER use production database credentials locally
- Each team member should have their own limited-permission MongoDB user

### Step 4: Install Dependencies

Install dependencies for all projects:

```bash
# Root dependencies
npm install

# AB_AI dependencies
cd AB_AI
npm install
cd ..

# Learning Portal Server dependencies
cd learningPortal/server
npm install
cd ../..

# Learning Portal Client dependencies
cd learningPortal/client
npm install
cd ../..
```

### Step 5: Start Development Servers

Open **three separate terminal windows** and run:

**Terminal 1 - AB_AI (Marketing Website)**
```bash
cd AB_AI
npm run dev
```
Runs on: `http://localhost:3000`

**Terminal 2 - Learning Portal Server (API)**
```bash
cd learningPortal/server
npm run dev
```
Runs on: `http://localhost:5000`

**Terminal 3 - Learning Portal Client (Frontend)**
```bash
cd learningPortal/client
npm run dev
```
Runs on: `http://localhost:5173`

### Step 6: Verify Setup

1. Open `http://localhost:3000` - Should load AB_AI website
2. Open `http://localhost:5173` - Should load Learning Portal
3. Test login functionality - Should connect to MongoDB
4. Check browser console for errors

---

## Required Environment Variables

### AB_AI/.env

| Variable | Description | Example (Placeholder) |
|----------|-------------|----------------------|
| `PORT` | Server port | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/parashari_dev` |
| `JWT_SECRET` | Secret for JWT tokens | Obtain from team lead |
| `STRIPE_SECRET_KEY` | Stripe API key | Obtain from team lead |
| `EMAIL_USER` | Gmail SMTP username | Obtain from team lead |
| `EMAIL_PASSWORD` | Gmail app password | Obtain from team lead |
| `LEARNING_API_URL` | Learning Portal API URL | `http://localhost:5000` |
| `LEARNING_PORTAL_URL` | Learning Portal frontend URL | `http://localhost:5173` |

### learningPortal/server/.env

| Variable | Description | Example (Placeholder) |
|----------|-------------|----------------------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | Learning Portal database | `mongodb://127.0.0.1:27017/parashari_learning_dev` |
| `USER_DB_URI` | Shared user database (AB_AI) | Same as AB_AI `MONGODB_URI` |
| `JWT_SECRET` | **MUST match AB_AI JWT_SECRET** | Obtain from team lead |
| `CLOUDFLARE_WORKER_URL` | Video worker URL | Obtain from team lead |
| `VIDEO_SIGNING_SECRET` | Cloudflare signing key | Obtain from team lead |
| `CLIENT_URL` | Frontend URL | `http://localhost:5173` |

### learningPortal/client/.env

| Variable | Description | Example (Placeholder) |
|----------|-------------|----------------------|
| `VITE_R2_INTRO_VIDEO_URL` | Cloudflare intro video URL | Obtain from team lead or leave empty |
| `VITE_AB_AI_PRODUCTION_URL` | AB_AI website URL | `http://localhost:3000` |

---

## Obtaining Credentials

### How to Get Required Credentials

Credentials must be shared privately by the project owner through:
- **Secure password manager** (1Password, LastPass, Bitwarden)
- **Encrypted communication channel**
- **In-person or verified video call**

**NEVER share credentials via:**
- ❌ Email
- ❌ Slack/Discord/Teams messages
- ❌ SMS
- ❌ Unencrypted files
- ❌ GitHub issues or pull requests

### What You Need to Request

Ask the team lead for:
1. MongoDB DEV database connection string
2. JWT secret key
3. Email service credentials (if working on auth features)
4. Cloudflare Worker URL and signing secret (if working on video features)
5. Payment gateway test credentials (if working on payments)

---

## Security Rules

### FORBIDDEN Actions

1. **NEVER commit `.env` files** to version control
2. **NEVER use production credentials** in local development
3. **NEVER share `.env` files** directly (even with team members)
4. **NEVER hardcode secrets** in source code
5. **NEVER commit API keys or tokens** to Git

### Best Practices

1. ✓ Always use `.env.example` templates
2. ✓ Use local MongoDB for development when possible
3. ✓ Use separate DEV database (never production)
4. ✓ Use test mode for payment gateways
5. ✓ Keep `.env` files in `.gitignore`
6. ✓ Rotate credentials if exposed
7. ✓ Use limited-permission service accounts

---

## Cloudflare Configuration

### Video Delivery (Optional for Local Development)

The application uses Cloudflare R2 and Workers for video delivery. For local development:

#### Option A: Disable Video Features
Set in `learningPortal/client/.env`:
```
VITE_R2_INTRO_VIDEO_URL=
```

#### Option B: Use DEV Cloudflare Worker
1. Request DEV worker URL from team lead
2. Use DEV-only signing secrets (NOT production)
3. Configure in `.env`:
   ```
   CLOUDFLARE_WORKER_URL=https://dev-worker-url.workers.dev
   VIDEO_SIGNING_SECRET=<dev-secret>
   ```

**Never use production Cloudflare credentials locally.**

---

## Troubleshooting

### Common Issues

#### Issue: "Cannot connect to MongoDB"
**Solution**: 
- Verify MongoDB is running: `mongosh` or `mongo`
- Check connection string format in `.env`
- Ensure firewall allows MongoDB port 27017

#### Issue: "JWT token invalid" or "Authentication failed"
**Solution**:
- Ensure `JWT_SECRET` is **identical** in both `AB_AI/.env` and `learningPortal/server/.env`
- Clear browser cookies and localStorage
- Restart all servers

#### Issue: "Port already in use"
**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <process_id> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9
```

#### Issue: "Videos not loading"
**Solution**:
- Verify Cloudflare Worker URL in `.env`
- Check VIDEO_SIGNING_SECRET is correct
- OR disable video features for local development

#### Issue: "Module not found" errors
**Solution**:
```bash
# Delete all node_modules
rm -rf node_modules AB_AI/node_modules learningPortal/*/node_modules

# Reinstall dependencies
npm install
cd AB_AI && npm install && cd ..
cd learningPortal/server && npm install && cd ../..
cd learningPortal/client && npm install && cd ../..
```

---

## Project Structure

```
Parashari-Indian-Institute/
│
├── AB_AI/                          # Marketing Website
│   ├── .env.example               ✓ Tracked in Git
│   ├── .env                       ✗ NOT in Git (create locally)
│   ├── server.js                  # Express server
│   ├── routes/                    # API routes
│   ├── models/                    # Mongoose models
│   └── package.json
│
├── learningPortal/
│   ├── server/                    # Backend API
│   │   ├── .env.example          ✓ Tracked in Git
│   │   ├── .env                  ✗ NOT in Git (create locally)
│   │   ├── server.js             # Express server
│   │   ├── routes/               # API endpoints
│   │   └── models/               # Database schemas
│   │
│   └── client/                    # React Frontend
│       ├── .env.example          ✓ Tracked in Git
│       ├── .env                  ✗ NOT in Git (create locally)
│       ├── src/                  # React components
│       └── package.json
│
├── cloudflare-worker/             # Video delivery worker
├── .gitignore                     # Excludes .env files
└── README-LOCAL-SETUP.md          # This file
```

---

## Final Checklist

Before you can run the application, verify:

- [ ] Repository cloned successfully
- [ ] `.env` files created from `.env.example` templates
- [ ] All environment variables filled in (obtained from team lead)
- [ ] MongoDB running (local or access to DEV Atlas)
- [ ] `JWT_SECRET` matches in AB_AI and learningPortal server
- [ ] Dependencies installed in all 4 directories (root, AB_AI, learningPortal/server, learningPortal/client)
- [ ] All three servers start without errors
- [ ] Can access `localhost:3000`, `localhost:5000`, `localhost:5173`
- [ ] Login functionality works (connects to database)

---

## Support

If you encounter issues:
1. Check this guide thoroughly
2. Review the terminal error messages
3. Verify all `.env` variables are configured
4. Contact the team lead for credentials or technical support

**Remember**: Never share credentials through insecure channels.
