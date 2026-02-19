
// Verification Script for Progress Logic
// Run with: node scripts/verify_progress_logic.js

const fetch = require('node-fetch');

// CONFIG
const BASE_URL = 'http://localhost:5000/api/v2/progress';
const LOGIN_URL = 'http://localhost:5000/api/auth/login';
// Replace with valid credentials or create a test user
const TEST_USER = {
    email: 'newuser@example.com', // Ensure this user exists or register them
    password: 'password123'
};

// MOCK DATA
const COURSE_ID = '65c23b1f9f1b2c001f8e4d1a'; // Iterate depending on your DB
const CONTENT_ID = '65c23b1f9f1b2c001f8e4d1b';

async function runTest() {
    console.log('🚀 Starting Progress Logic Verification...');

    // 1. Login
    console.log('1. Logging in...');
    let token;
    try {
        const loginRes = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_USER)
        });
        const loginData = await loginRes.json();
        if (!loginData.token) throw new Error('Login failed: ' + JSON.stringify(loginData));
        token = loginData.token;
        console.log('✅ Login successful');
    } catch (e) {
        console.error('❌ Login Error:', e.message);
        console.log('⚠️ Please ensure TEST_USER exists in your DB.');
        return;
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };

    // 2. Clear Progress (Optional / Manual - assuming fresh start for simplicity or just overwriting)
    // We can't clear easily without direct DB access, so we'll just test the transitions.

    // 3. Test Heartbeat (Status: STARTED)
    console.log('3. Testing Heartbeat (STARTED)...');
    const update1 = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            courseId: COURSE_ID,
            contentId: CONTENT_ID,
            status: 'STARTED',
            progressPercent: 50,
            lastPosition: 120,
            clientTimestamp: new Date().toISOString()
        })
    });
    const res1 = await update1.json();
    if (res1.itemProgress.status === 'STARTED' && res1.itemProgress.progressPercent === 50) {
        console.log('✅ Heartbeat updated correctly');
    } else {
        console.error('❌ Heartbeat failed', res1);
    }

    // 4. Test Completion Lock (Mark COMPLETED)
    console.log('4. Testing Completion (COMPLETED)...');
    const update2 = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            courseId: COURSE_ID,
            contentId: CONTENT_ID,
            status: 'COMPLETED',
            progressPercent: 100,
            lastPosition: 240,
            clientTimestamp: new Date().toISOString()
        })
    });
    const res2 = await update2.json();
    if (res2.itemProgress.status === 'COMPLETED') {
        console.log('✅ Status set to COMPLETED');
    } else {
        console.error('❌ Completion failed', res2);
    }

    // 5. Test status regression (Attempt to revert to STARTED)
    console.log('5. Testing Completion Lock (Regression Attempt)...');
    const update3 = await fetch(BASE_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            courseId: COURSE_ID,
            contentId: CONTENT_ID,
            status: 'STARTED', // Rogue update
            progressPercent: 10,
            lastPosition: 250, // Position should still update
            clientTimestamp: new Date().toISOString()
        })
    });
    const res3 = await update3.json();

    // VERIFICATION RULES
    if (res3.itemProgress.status === 'COMPLETED') {
        console.log('✅ Completion Lock passed (Status remained COMPLETED)');
    } else {
        console.error('❌ Completion Lock FAILED (Status reverted to STARTED)');
    }

    if (res3.itemProgress.lastPosition === 250) {
        console.log('✅ Position updated despite lock (Correct)');
    } else {
        console.error('❌ Position update blocked incorrectly');
    }

    console.log('🏁 Verification Complete');
}

runTest();
