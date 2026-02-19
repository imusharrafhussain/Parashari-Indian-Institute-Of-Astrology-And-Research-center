# Admin Panel Backend - Test Scripts

This directory contains validation and testing scripts for the admin panel backend.

## Scripts

### 1. createSuperAdmin.js
Creates a super-admin user in the database for testing.

**Run:**
```bash
node scripts/createSuperAdmin.js
```

**Creates:**
- Email: `superadmin@parashari.com`
- Password: `SuperAdmin123!`
- Role: `super-admin`
- All permissions granted

### 2. validateBackend.js
Runs comprehensive validation tests on the backend.

**Run:**
```bash
node scripts/validateBackend.js
```

**Tests:**
- MongoDB connection
- User model & password hashing
- JWT token generation & verification
- Permission system
- R2 service configuration
- Environment variables

## Usage

1. **First Time Setup:**
   ```bash
   # Create super admin user
   node scripts/createSuperAdmin.js
   ```

2. **Run Validation:**
   ```bash
   # Validate entire backend
   node scripts/validateBackend.js
   ```

3. **Test Login API:**
   ```bash
   # Using curl
   curl -X POST http://localhost:5001/api/admin/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"superadmin@parashari.com","password":"SuperAdmin123!"}'
   ```

4. **Test Authenticated Endpoint:**
   ```bash
   # Get your JWT token from login response, then:
   curl http://localhost:5001/api/admin/auth/me \
     -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
   ```

## Expected Outputs

### createSuperAdmin.js Success:
```
✅ Super Admin Created Successfully!
📧 Email: superadmin@parashari.com
🔐 Password: SuperAdmin123!
```

### validateBackend.js Success:
```
✅ Passed: 6
❌ Failed: 0
⚠️  Skipped: 0
🎉 All tests passed!
```

## Troubleshooting

**Error: User already exists**
- Delete the existing user from MongoDB or use a different email

**Error: MongoDB connection failed**
- Check your MONGODB_URI in `.env`
- Ensure MongoDB is running

**Error: R2 tests skipped**
- Add R2 credentials to `.env` file
- See `.env.example` for required variables
