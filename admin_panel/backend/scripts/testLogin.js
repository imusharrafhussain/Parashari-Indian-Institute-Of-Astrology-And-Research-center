import fetch from 'node-fetch';

/**
 * Test Admin Login Endpoint
 */

async function testLogin() {
    console.log('🧪 Testing Admin Login Endpoint\n');

    const loginUrl = 'http://localhost:5001/api/admin/auth/login';
    const credentials = {
        email: 'superadmin@parashari.com',
        password: 'SuperAdmin123!'
    };

    try {
        console.log('📤 Sending login request...');
        console.log('   URL:', loginUrl);
        console.log('   Credentials:', JSON.stringify(credentials, null, 2));

        const response = await fetch(loginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        const data = await response.json();

        console.log('\n📥 Response Status:', response.status);
        console.log('📥 Response Body:', JSON.stringify(data, null, 2));

        if (response.ok && data.success) {
            console.log('\n✅ LOGIN SUCCESSFUL!');
            console.log('\n🎫 JWT Token:', data.token);
            console.log('\n👤 User Info:');
            console.log('   ID:', data.user.id);
            console.log('   Email:', data.user.email);
            console.log('   Name:', data.user.name);
            console.log('   Role:', data.user.role);
            console.log('   Permissions:', data.user.permissions.length);

            // Test authenticated endpoint
            console.log('\n🧪 Testing authenticated endpoint /api/admin/auth/me');
            const meResponse = await fetch('http://localhost:5001/api/admin/auth/me', {
                headers: { 'Authorization': `Bearer ${data.token}` }
            });

            const meData = await meResponse.json();
            console.log('   Status:', meResponse.status);

            if (meResponse.ok) {
                console.log('   ✅ Authentication works! User:', meData.user.name);
            } else {
                console.log('   ❌ Authentication failed');
            }

            return { success: true, token: data.token };
        } else {
            console.log('\n❌ LOGIN FAILED');
            console.log('   Error:', data.error);
            return { success: false };
        }
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        return { success: false, error: error.message };
    }
}

testLogin();
