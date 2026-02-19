import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../src/models/User.js';
import { generateUploadUrl, generateSignedUrl } from '../src/services/r2Service.js';

dotenv.config();

/**
 * Backend Validation Test Suite
 * Tests all core functionality of the admin backend
 */

async function runValidationTests() {
    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    console.log('🧪 Admin Panel Backend Validation\n');
    console.log('═'.repeat(60));

    try {
        // Test 1: MongoDB Connection
        console.log('\n📊 Test 1: MongoDB Connection');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ PASSED - MongoDB connected successfully');
        results.passed++;
        results.tests.push({ name: 'MongoDB Connection', status: 'PASSED' });

        // Test 2: User Model & Password Hashing
        console.log('\n📊 Test 2: User Model & Password Hashing');
        const testUser = await User.findOne({ role: 'super-admin' });
        if (testUser) {
            const isPasswordValid = await testUser.comparePassword('SuperAdmin123!');
            if (isPasswordValid) {
                console.log('✅ PASSED - Password hashing and comparison works');
                results.passed++;
                results.tests.push({ name: 'Password Hashing', status: 'PASSED' });
            } else {
                console.log('❌ FAILED - Password comparison failed');
                results.failed++;
                results.tests.push({ name: 'Password Hashing', status: 'FAILED' });
            }
        } else {
            console.log('⚠️  SKIPPED - No super-admin user found. Run createSuperAdmin.js first.');
            results.tests.push({ name: 'Password Hashing', status: 'SKIPPED' });
        }

        // Test 3: JWT Token Generation
        console.log('\n📊 Test 3: JWT Token Generation');
        if (testUser) {
            const token = jwt.sign(
                { userId: testUser._id, role: testUser.role },
                process.env.ADMIN_JWT_SECRET,
                { expiresIn: '4h' }
            );
            const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);
            if (decoded.userId.toString() === testUser._id.toString()) {
                console.log('✅ PASSED - JWT token generation and verification works');
                console.log('   Token:', token.substring(0, 50) + '...');
                results.passed++;
                results.tests.push({ name: 'JWT Token', status: 'PASSED' });
            } else {
                console.log('❌ FAILED - JWT token verification failed');
                results.failed++;
                results.tests.push({ name: 'JWT Token', status: 'FAILED' });
            }
        } else {
            console.log('⚠️  SKIPPED - No user for JWT test');
            results.tests.push({ name: 'JWT Token', status: 'SKIPPED' });
        }

        // Test 4: Permission System
        console.log('\n📊 Test 4: Permission System');
        if (testUser) {
            const hasPermission = testUser.hasPermission('courses.create');
            const lacksPermission = !testUser.hasPermission('nonexistent.permission');
            if (hasPermission && lacksPermission) {
                console.log('✅ PASSED - Permission checking works correctly');
                results.passed++;
                results.tests.push({ name: 'Permission System', status: 'PASSED' });
            } else {
                console.log('❌ FAILED - Permission checking logic error');
                results.failed++;
                results.tests.push({ name: 'Permission System', status: 'FAILED' });
            }
        } else {
            console.log('⚠️  SKIPPED - No user for permission test');
            results.tests.push({ name: 'Permission System', status: 'SKIPPED' });
        }

        // Test 5: R2 Service Configuration
        console.log('\n📊 Test 5: R2 Service Configuration');
        try {
            // Check if R2 credentials are set
            if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_ENDPOINT) {
                console.log('✅ PASSED - R2 credentials configured');

                // Try generating a signed URL (won't actually upload, just tests signing)
                const testPath = 'test/validation/test.txt';
                const uploadUrl = await generateUploadUrl({
                    r2Path: testPath,
                    fileType: 'text/plain',
                    expiresIn: 60
                });

                if (uploadUrl && uploadUrl.includes(process.env.R2_BUCKET_NAME)) {
                    console.log('✅ PASSED - R2 pre-signed URL generation works');
                    console.log('   URL:', uploadUrl.substring(0, 80) + '...');
                    results.passed++;
                    results.tests.push({ name: 'R2 Service', status: 'PASSED' });
                } else {
                    console.log('❌ FAILED - R2 URL generation issue');
                    results.failed++;
                    results.tests.push({ name: 'R2 Service', status: 'FAILED' });
                }
            } else {
                console.log('⚠️  SKIPPED - R2 credentials not configured in .env');
                results.tests.push({ name: 'R2 Service', status: 'SKIPPED' });
            }
        } catch (error) {
            console.log('❌ FAILED - R2 service error:', error.message);
            results.failed++;
            results.tests.push({ name: 'R2 Service', status: 'FAILED', error: error.message });
        }

        // Test 6: Environment Variables
        console.log('\n📊 Test 6: Environment Variables');
        const requiredEnvVars = [
            'MONGODB_URI',
            'ADMIN_JWT_SECRET',
            'PORT'
        ];
        const optionalEnvVars = [
            'R2_ACCESS_KEY_ID',
            'R2_SECRET_ACCESS_KEY',
            'R2_BUCKET_NAME',
            'R2_ENDPOINT'
        ];

        const missingRequired = requiredEnvVars.filter(v => !process.env[v]);
        const missingOptional = optionalEnvVars.filter(v => !process.env[v]);

        if (missingRequired.length === 0) {
            console.log('✅ PASSED - All required environment variables set');
            results.passed++;
            results.tests.push({ name: 'Environment Variables', status: 'PASSED' });
        } else {
            console.log('❌ FAILED - Missing required variables:', missingRequired.join(', '));
            results.failed++;
            results.tests.push({ name: 'Environment Variables', status: 'FAILED' });
        }

        if (missingOptional.length > 0) {
            console.log('⚠️  Optional variables not set:', missingOptional.join(', '));
        }

        await mongoose.disconnect();

    } catch (error) {
        console.error('\n❌ Test Suite Error:', error);
        results.failed++;
    }

    // Print Summary
    console.log('\n' + '═'.repeat(60));
    console.log('📊 Test Results Summary');
    console.log('═'.repeat(60));

    results.tests.forEach((test, index) => {
        const icon = test.status === 'PASSED' ? '✅' : test.status === 'FAILED' ? '❌' : '⚠️';
        console.log(`${index + 1}. ${icon} ${test.name}: ${test.status}`);
        if (test.error) {
            console.log(`   Error: ${test.error}`);
        }
    });

    console.log('\n' + '═'.repeat(60));
    console.log(`✅ Passed: ${results.passed}`);
    console.log(`❌ Failed: ${results.failed}`);
    console.log(`⚠️  Skipped: ${results.tests.filter(t => t.status === 'SKIPPED').length}`);
    console.log('═'.repeat(60));

    if (results.failed === 0) {
        console.log('\n🎉 All tests passed! Backend is ready for development.');
    } else {
        console.log('\n⚠️  Some tests failed. Please fix issues before proceeding.');
    }

    process.exit(results.failed === 0 ? 0 : 1);
}

runValidationTests();
